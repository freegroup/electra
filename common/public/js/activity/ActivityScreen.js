import clientFactory from "./ActivityClient"
import CountBadge from "../CountBadge"

// The Activity pane — the caller's account-scoped, cross-app notification feed:
// what happened to their drafts (committed / rejected + reason), review requests
// they should act on, withdrawals, their own approvals, and non-document events
// (e.g. being added to a workspace). Read-only; opening a row routes to the
// right app for a document, or the Workspaces tab for a workspace.
//
// Row text is built client-side from `eventType` + interpolated fields, so the
// DB stores data, not prose (i18n stays switchable).
const APP_BY_SUFFIX = {
  ".brain": "simulator",
  ".sheet": "author",
}

// Mint the opaque document handle the editors open with (?doc=<handle>), matching
// the backend db.encodeId: base64url(JSON.stringify({ s: scopeRef, p: docPath })).
function encodeDocId(scopeRef, docPath) {
  let json = JSON.stringify({ s: String(scopeRef), p: docPath })
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export default class ActivityScreen {

  constructor(app, conf) {
    this.app = app
    this.conf = conf
    this.client = clientFactory()

    // Unread badge on the Activity nav tab.
    this.countBadge = new CountBadge("#activity_tab", { variant: "onTint" })

    // Reload when the tab becomes visible — by click OR programmatic navigate.
    $("#activity_tab a").off("shown.bs.tab.activity").on("shown.bs.tab.activity", this.onShow.bind(this))
    this.render()
    this.refreshCount()
  }

  // Cheap unread-only refresh for the tab badge (app start, after actions).
  refreshCount() {
    this.client.list({ limit: 1 })
      .then((res) => this.countBadge.set(res && res.unread))
      .catch(() => {})
  }

  onShow() {
    this.loadFeed()
  }

  render() {
    $(".activityFinder").addClass("finderCard").html(`<div class="activityList"></div>`)
    this.loadFeed()
  }

  loadFeed() {
    let $host = $(".activityFinder .activityList")
    $host.addClass("spinner")
    this.client.list().then((res) => {
      let items = (res && res.items) || []
      let unread = (res && res.unread) || 0
      this.countBadge.set(unread)
      $host.removeClass("spinner").empty()
      if (items.length === 0) {
        $host.html(`<div class="fileListEmpty" data-i18n="pane.activity.empty">${t("pane.activity.empty")}</div>`)
        return
      }
      for (let it of items) $host.append(this.renderItem(it))
      // Everything shown is now read — clear the badge.
      if (unread > 0) this.client.seen([]).then(() => this.countBadge.set(0)).catch(() => {})
    }).catch((exc) => {
      console.log(exc)
      $host.removeClass("spinner").html(
        `<div class="fileListEmpty" data-i18n="common:message.error">${t("common:message.error")}</div>`)
    })
  }

  renderItem(it) {
    // Templates emphasise the subject with <b>…</b>, so render as HTML. i18next
    // still escapes the interpolated values by default (subject/scope/reason),
    // so only the template's own markup renders — no injection, and "/" in a
    // path decodes correctly on insert.
    let text = t(`pane.activity.event.${it.eventType}`, {
      actor: it.actor,
      subject: it.subjectLabel || "",
      scope: it.scopeLabel || "",
      reason: it.reason || "",
      defaultValue: it.eventType,
    })
    let $row = $(`<div class="activityItem"></div>`)
    if (!it.seen) $row.addClass("activityUnread")
    $row.append($(`<span class="activityText"></span>`).html(text))
    $row.append($(`<span class="activityTime"></span>`).text(this.formatTime(it.createdAt)))
    if (this.canOpen(it)) {
      $row.addClass("activityClickable").on("click", () => this.open(it))
    }
    return $row
  }

  canOpen(it) {
    if (it.subjectKind === "document") return !!APP_BY_SUFFIX[it.meta && it.meta.docType]
    if (it.subjectKind === "workspace") return true
    return false
  }

  open(it) {
    if (it.subjectKind === "workspace") {
      $('a[href="#workspaces"][data-toggle="tab"]').tab("show")
      return
    }
    if (it.subjectKind !== "document") return
    let app = APP_BY_SUFFIX[it.meta && it.meta.docType]
    if (!app) return
    let uuid = it.meta && it.meta.uuid
    // A still-pending request opens read-only for review; anything else opens
    // the document itself.
    if (it.eventType === "review_requested" && uuid) {
      window.location.href = `../${app}/?review=${encodeURIComponent(uuid)}`
      return
    }
    let handle = encodeDocId(it.meta.scopeRef, it.meta.docPath)
    window.location.href = `../${app}/?doc=${encodeURIComponent(handle)}`
  }

  formatTime(iso) {
    if (!iso) return ""
    let d = new Date(iso)
    return isNaN(d.getTime()) ? "" : d.toLocaleString()
  }
}
