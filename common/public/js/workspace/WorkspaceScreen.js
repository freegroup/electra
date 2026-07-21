import Hogan from "hogan.js"

import clientFactory from "./WorkspaceClient"
import { renderScopeTiles } from "./scopeTile"
import inputPrompt from "../InputPrompt"
import confirmDialog from "../ConfirmDialog"
import toast from "../toast"

// The Workspaces pane — a drill-down browser over the scope tree (Figma-style):
// breadcrumb on top, sub-workspace tiles in the middle, and a members/admins
// side panel (shown when the caller is admin of the current workspace).
//
// A member of a workspace sees ALL its direct children (name/existence). Any
// member may create a sub-workspace (they become its admin). Admins may add
// members and see the roster. "Request membership" for workspaces one only sees
// is a future feature.
//
// Named *Screen to match DraftScreen/StorageScreen, though it is a navigator
// rather than a document list. App-agnostic — talks to the userinfo account BFF.
export default class WorkspaceScreen {

  constructor(app, conf) {
    this.app = app
    this.conf = conf
    this.client = clientFactory()
    this.dirty = false

    // Breadcrumb stack of { scopeRef, name }. Root (null scopeRef) = "my
    // workspaces" — the caller's own memberships.
    this.stack = [{ scopeRef: null, name: t("pane.workspaces.root") }]

    $("#workspaces_tab a").off("click.workspaces").on("click.workspaces", this.onShow.bind(this))

    $("body").append(`
      <script id="workspaceMembersTemplate" type="text/x-jsrender">
        {{#members}}
          <div class="wsMember" data-ref="{{personRef}}">
            <span class="wsMemberName">{{personRef}}</span>
            {{#isAdmin}}<span class="wsBadge wsBadgeAdmin" data-i18n="pane.workspaces.role_admin">${t("pane.workspaces.role_admin")}</span>{{/isAdmin}}
            {{#removable}}<button class="wsRemoveMemberButton" title="${t("pane.workspaces.remove_member")}" data-ref="{{personRef}}">✕</button>{{/removable}}
          </div>
        {{/members}}
      </script>
    `)

    this.render()
  }

  onShow() {
    if (this.dirty) {
      this.dirty = false
      this.reload()
    }
  }

  refresh() {
    this.dirty = true
  }

  render() {
    $("#workspaces .workspacesFinder").html(`
      <header class="workspacesHeader">
        <nav class="workspaceBreadcrumb"></nav>
        <button class="workspaceCreateButton electra-button electra-primary" data-i18n="pane.workspaces.create">${t("pane.workspaces.create")}</button>
      </header>
      <div class="workspacesBody">
        <div class="workspaceTiles"></div>
        <aside class="workspaceSidePanel"></aside>
      </div>
    `)

    $("#workspaces .workspacesFinder").off("click", ".workspaceCreateButton")
      .on("click", ".workspaceCreateButton", () => this.promptCreate())

    this.reload()
  }

  // Load the current level (top of the stack) and paint breadcrumb + tiles +
  // side panel.
  reload() {
    let _this = this
    let current = this.stack[this.stack.length - 1]
    this.renderBreadcrumb()

    let $tiles = $("#workspaces .workspaceTiles").addClass("spinner")
    let $panel = $("#workspaces .workspaceSidePanel").empty()

    // Root level: the server decides the fixed entry points (app root +
    // personal workspace) — no client-side filtering. Deeper levels: the
    // scope's direct children. Both are single REST calls returning the visible
    // scopes with their properties.
    let childrenP = current.scopeRef === null
      ? this.client.roots().then((rows) => rows.map((r) => ({
          scopeRef: r.scopeRef,
          name: r.kind === "personal" ? (r.label || t("pane.workspaces.personal")) : (r.label || r.name),
          description: r.description || null,
          isMember: !!r.isMember,
          isAdmin: !!r.isAdmin,
          isPersonal: r.kind === "personal",
          memberCount: r.memberCount,
        })))
      : this.client.children(current.scopeRef).then((rows) => rows.map((r) => ({
          scopeRef: r.scopeRef,
          name: r.label || r.name,
          description: r.description || null,
          isMember: !!r.isMember,
          isAdmin: !!r.isAdmin,
          memberCount: r.memberCount,
        })))

    childrenP.then((items) => {
      let view = items.map((it) => ({
        scopeRef: it.scopeRef,
        name: it.name,
        description: it.description || null,
        isMember: !!it.isMember,
        isAdmin: !!it.isAdmin,
        isPersonal: !!it.isPersonal,
        memberCount: it.memberCount,
      }))
      $tiles.removeClass("spinner")
      renderScopeTiles($tiles, view, {
        emptyHtml: `<div class="workspaceEmpty" data-i18n="pane.workspaces.empty">${t("pane.workspaces.empty")}</div>`,
        onOpen: (item) => {
          if (!item) return
          _this.stack.push({
            scopeRef: String(item.scopeRef),
            name: item.name,
            isMember: !!item.isMember,
            isAdmin: !!item.isAdmin,
            isPersonal: !!item.isPersonal,
          })
          _this.reload()
        },
        onAddMember: (item) => {
          if (item) _this.promptAddMember(String(item.scopeRef))
        },
      })
    }).catch((exc) => {
      console.log(exc)
      $tiles.removeClass("spinner").html(
        `<div class="workspaceEmpty" data-i18n="common:message.error">${t("common:message.error")}</div>`)
    })

    // Any MEMBER of the current workspace may create a sub-workspace (matches the
    // backend guard). Not on the aggregate root (no single scope), and not in a
    // space the caller only sees but isn't a member of.
    let canCreate = current.scopeRef !== null && current.isMember === true
    $("#workspaces .workspaceCreateButton").toggle(canCreate)

    // Side panel: review settings (every member) + member roster (admins).
    // Root level has no single scope, so no panel there. Personal workspaces
    // are single-owner: no members, no review, no panel at all.
    if (current.scopeRef !== null && !current.isPersonal) {
      // Two fixed slots so the async loads below can't clobber each other.
      $panel.html(`<div class="wsInfoBlock"></div><div class="wsReviewSettings"></div><div class="wsMembersBlock"></div>`)

      // Review threshold — visible to everyone who can see the workspace;
      // the edit pencil only for admins (backend enforces admin on PATCH).
      this.client.scope(current.scopeRef).then((meta) => {
        let score = meta.requiredApprovalScore ?? 0
        let $sec = $panel.find(".wsReviewSettings")
        $sec.html(`
          <h4 class="wsPanelTitle">${t("pane.workspaces.review_settings")}</h4>
          <div class="wsReviewScore" title="${t("pane.workspaces.required_score_hint")}">
            <span class="wsReviewScoreValue">${t("pane.workspaces.required_score", { count: score })}</span>
            ${current.isAdmin ? `<button class="wsEditScoreButton" title="${t("pane.workspaces.edit_required_score")}">✎</button>` : ""}
          </div>
        `)
        $sec.find(".wsEditScoreButton").off("click").on("click", () => {
          _this.promptRequiredScore(current.scopeRef, score)
        })

        if (current.isAdmin) {
          let $info = $panel.find(".wsInfoBlock")
          $info.html(`
            <h4 class="wsPanelTitle">${t("pane.workspaces.info_settings")}</h4>
            <div class="wsInfoRow">
              <span class="wsInfoValue wsInfoLabel">${meta.label || ""}</span>
              <button class="wsEditInfoButton" data-field="label" title="${t("pane.workspaces.rename")}">✎</button>
            </div>
            <div class="wsInfoRow">
              <span class="wsInfoValue wsInfoDescription">${meta.description || ""}</span>
              <button class="wsEditInfoButton" data-field="description" title="${t("pane.workspaces.edit_description")}">✎</button>
            </div>
          `)
          $info.find(".wsEditInfoButton[data-field='label']").off("click").on("click", () => {
            _this.promptRename(current.scopeRef, meta.label || "")
          })
          $info.find(".wsEditInfoButton[data-field='description']").off("click").on("click", () => {
            _this.promptDescription(current.scopeRef, meta.description || "")
          })
        }
      }).catch((err) => console.log(err))

      // The roster is admin-only: members() returns 403 for non-admins, so if it
      // resolves the caller is an admin and may manage members. Everyone but the
      // caller themselves is removable.
      this.client.members(current.scopeRef).then((members) => {
        let me = (this.app && this.app.userinfo && this.app.userinfo.user && this.app.userinfo.user.email) || null
        let view = members.map((m) => ({ ...m, removable: !me || m.personRef !== me }))
        let compiled = Hogan.compile($("#workspaceMembersTemplate").html())
        let $block = $panel.find(".wsMembersBlock")
        $block.html(`
          <h4 class="wsPanelTitle" data-i18n="pane.workspaces.members">${t("pane.workspaces.members")}</h4>
          <div class="wsMemberList">${compiled.render({ members: view })}</div>
          <button class="wsAddMemberButton electra-button" data-i18n="pane.workspaces.add_member">${t("pane.workspaces.add_member")}</button>
        `)
        $block.find(".wsAddMemberButton").off("click").on("click", () => _this.promptAddMember(current.scopeRef))
        $block.find(".wsRemoveMemberButton").off("click").on("click", (e) => {
          _this.promptRemoveMember(current.scopeRef, $(e.currentTarget).data("ref"))
        })
      }).catch(() => {
        // Non-admins get 403 — simply show no roster/manage actions.
        $panel.find(".wsMembersBlock").empty()
      })
    }
  }

  // Edit the review threshold (admin only): how many approval points a pending
  // document needs before it commits in this workspace. 0 = no review.
  promptRequiredScore(scopeRef, currentScore) {
    inputPrompt.show(t("pane.workspaces.edit_required_score"), t("pane.workspaces.required_score_label"), String(currentScore))
      .then((value) => {
        let score = parseInt((value || "").trim(), 10)
        if (!Number.isFinite(score) || score < 0 || score === currentScore) return
        return this.client.setRequiredScore(scopeRef, score)
          .then(() => { toast(t("pane.workspaces.required_score_saved")); this.reload() })
      })
      .catch((err) => { if (err) console.log(err) })
  }

  renderBreadcrumb() {
    let _this = this
    let $bc = $("#workspaces .workspaceBreadcrumb").empty()
    this.stack.forEach((entry, i) => {
      let last = i === this.stack.length - 1
      // Ancestors render as links (clickable affordance); the current level is
      // plain text.
      let $crumb = last
        ? $(`<span class="wsCrumb wsCrumbCurrent"></span>`).text(entry.name)
        : $(`<a class="wsCrumb wsCrumbLink" href="#"></a>`).text(entry.name)
      if (!last) {
        $crumb.on("click", (e) => {
          e.preventDefault()
          _this.stack = _this.stack.slice(0, i + 1)
          _this.reload()
        })
      }
      $bc.append($crumb)
      if (!last) $bc.append(`<span class="wsCrumbSep">/</span>`)
    })
  }

  // Create a sub-workspace under the current scope (any member may). Only makes
  // sense below the root level, where there is a concrete parent scope. The
  // user types a display label; the server derives the identity name.
  promptCreate() {
    let current = this.stack[this.stack.length - 1]
    if (current.scopeRef === null) {
      toast(t("pane.workspaces.create_needs_parent"))
      return
    }
    inputPrompt.show(t("pane.workspaces.create"), t("pane.workspaces.name_label"))
      .then((label) => {
        label = (label || "").trim()
        if (!label) return
        return this.client.createChild(current.scopeRef, label)
          .then(() => { toast(t("pane.workspaces.created")); this.reload() })
      })
      .catch((err) => { if (err) console.log(err) })
  }

  // Rename a workspace's display label (admin only). Reloads to reflect it.
  promptRename(scopeRef, currentLabel) {
    inputPrompt.show(t("pane.workspaces.rename"), t("pane.workspaces.name_label"), currentLabel || "")
      .then((label) => {
        label = (label || "").trim()
        if (!label || label === currentLabel) return
        return this.client.rename(scopeRef, label)
          .then(() => { toast(t("pane.workspaces.renamed")); this.reload() })
      })
      .catch((err) => { if (err) console.log(err) })
  }

  // Edit the description (admin only). Empty string clears it.
  promptDescription(scopeRef, currentDescription) {
    inputPrompt.show(t("pane.workspaces.edit_description"), t("pane.workspaces.description_label"), currentDescription || "")
      .then((value) => {
        if (value === null || value === undefined) return
        value = String(value).trim()
        if (value === (currentDescription || "").trim()) return
        return this.client.setDescription(scopeRef, value)
          .then(() => { toast(t("pane.workspaces.renamed")); this.reload() })
      })
      .catch((err) => { if (err) console.log(err) })
  }

  promptAddMember(scopeRef) {
    inputPrompt.show(t("pane.workspaces.add_member"), t("pane.workspaces.member_label"))
      .then((personRef) => {
        personRef = (personRef || "").trim()
        if (!personRef) return
        return this.client.addMember(scopeRef, personRef)
          .then(() => { toast(t("pane.workspaces.member_added")); this.reload() })
      })
      .catch((err) => { if (err) console.log(err) })
  }

  // Remove a member (admin only — the button is only rendered in the admin
  // roster; the backend also enforces requireAdmin). Confirms first.
  promptRemoveMember(scopeRef, personRef) {
    confirmDialog.show(t("pane.workspaces.remove_member_explain", { person: personRef }))
      .then(() => this.client.removeMember(scopeRef, personRef))
      .then(() => { toast(t("pane.workspaces.member_removed")); this.reload() })
      .catch((err) => { if (err) console.log(err) })
  }
}
