import Hogan from "hogan.js"

import clientFactory from "./ReviewClient"
import inputPrompt from "../InputPrompt"
import toast from "../toast"

// The Review pane — the caller's aggregated review inbox: every document
// version waiting for approval in any workspace where the caller holds
// reviewer points. Each row shows the score situation (approved / required /
// what my vote adds) and offers: open in the matching editor, approve, reject.
//
// App-agnostic — talks to the userinfo account BFF. Which editor a document
// opens in is decided by its file suffix.
const APP_BY_SUFFIX = {
  ".brain": "simulator",
  ".sheet": "author",
}

export default class ReviewScreen {

  constructor(app, conf) {
    this.app = app
    this.conf = conf
    this.client = clientFactory()
    this.dirty = false

    $("#review_tab a").off("click.review").on("click.review", this.onShow.bind(this))

    $("body").append(`
      <script id="reviewListTemplate" type="text/x-jsrender">
        <table class="storageTable reviewTable">
          <thead>
            <tr>
              <th class="colName" data-i18n="pane.review.col_doc">${t("pane.review.col_doc")}</th>
              <th class="colWorkspace" data-i18n="pane.review.col_workspace">${t("pane.review.col_workspace")}</th>
              <th class="colAuthor" data-i18n="pane.review.col_author">${t("pane.review.col_author")}</th>
              <th class="colScore" data-i18n="pane.review.col_score">${t("pane.review.col_score")}</th>
              <th class="colActions"></th>
            </tr>
          </thead>
          <tbody>
          {{#items}}
            <tr class="reviewRow" data-key="{{key}}">
              <td class="colName">
                <span class="reviewTitle">{{title}}</span>
                {{#isDeletion}}<span class="reviewDeletionBadge" data-i18n="pane.review.deletion">${t("pane.review.deletion")}</span>{{/isDeletion}}
                <span class="reviewVersion">v{{version}}</span>
              </td>
              <td class="colWorkspace"><span title="{{scopePath}}">{{workspace}}</span></td>
              <td class="colAuthor">{{author}}</td>
              <td class="colScore">
                <span class="reviewScore">{{approvedScore}} / {{requiredScore}}</span>
                <span class="reviewMyScore" title="${t("pane.review.my_points_hint")}">+{{myScore}}</span>
              </td>
              <td class="colActions">
                {{#canOpen}}<button class="reviewOpenButton electra-button" data-key="{{key}}" data-i18n="pane.review.open">${t("pane.review.open")}</button>{{/canOpen}}
                {{^alreadyVoted}}<button class="reviewApproveButton electra-button electra-primary" data-key="{{key}}" data-i18n="pane.review.approve">${t("pane.review.approve")}</button>{{/alreadyVoted}}
                {{#alreadyVoted}}<span class="reviewVoted" data-i18n="pane.review.voted">${t("pane.review.voted")}</span>{{/alreadyVoted}}
                <button class="reviewRejectButton electra-button" data-key="{{key}}" data-i18n="pane.review.reject">${t("pane.review.reject")}</button>
              </td>
            </tr>
          {{/items}}
          {{^items}}
            <tr><td colspan="5" class="fileListEmpty" data-i18n="pane.review.empty">${t("pane.review.empty")}</td></tr>
          {{/items}}
          </tbody>
        </table>
      </script>
    `)

    this.render()
  }

  onShow() {
    // The queue changes behind the caller's back (new promotes, other voters),
    // so unlike the file panes it reloads on every show.
    this.loadQueue()
  }

  refresh() {
    this.dirty = true
  }

  reload() {
    if ($("#review").hasClass("active")) {
      this.loadQueue()
    } else {
      this.dirty = true
    }
  }

  render() {
    $(".reviewFinder").html(`
      <header class="storageHeader"></header>
      <div class="storageList"></div>
    `)
    this.loadQueue()
  }

  loadQueue() {
    let _this = this
    let $host = $(".reviewFinder .storageList")
    $host.addClass("spinner")

    this.client.queue().then((entries) => {
      // Index by a stable key so row actions find their entry again.
      this.entries = new Map(entries.map((e) => [`${e.scopeRef}:${e.version}:${e.path}`, e]))

      let items = entries.map((e) => {
        let dot = e.path.lastIndexOf(".")
        let suffix = dot === -1 ? "" : e.path.slice(dot)
        let base = e.path.split("/").pop()
        return {
          key: `${e.scopeRef}:${e.version}:${e.path}`,
          title: suffix && base.endsWith(suffix) ? base.slice(0, -suffix.length) : base,
          version: e.version,
          isDeletion: !!e.isDeletion,
          workspace: e.scopeLabel || e.scopePath.split("/").pop(),
          scopePath: e.scopePath,
          author: e.author,
          requiredScore: e.requiredScore,
          approvedScore: e.approvedScore,
          myScore: e.myScore,
          alreadyVoted: !!e.alreadyVoted,
          // A deletion has no content to inspect; other docs open in the app
          // that owns their suffix.
          canOpen: !e.isDeletion && !!APP_BY_SUFFIX[suffix],
        }
      })

      let compiled = Hogan.compile($("#reviewListTemplate").html())
      $host.removeClass("spinner").html(compiled.render({ items }))

      $host.find(".reviewOpenButton").off("click").on("click", (e) => {
        _this.openEntry(_this.entries.get($(e.currentTarget).data("key")))
      })
      $host.find(".reviewApproveButton").off("click").on("click", (e) => {
        _this.approveEntry(_this.entries.get($(e.currentTarget).data("key")))
      })
      $host.find(".reviewRejectButton").off("click").on("click", (e) => {
        _this.rejectEntry(_this.entries.get($(e.currentTarget).data("key")))
      })
    }).catch((exc) => {
      console.log(exc)
      $host.removeClass("spinner").html(
        `<div class="fileListEmpty" data-i18n="common:message.error">${t("common:message.error")}</div>`)
    })
  }

  // Open the pending version read-only. Same app → in-place review mode; other
  // app → navigate there with the same ?review URL scheme.
  openEntry(entry) {
    if (!entry) return
    let dot = entry.path.lastIndexOf(".")
    let suffix = dot === -1 ? "" : entry.path.slice(dot)
    let params = `review=${encodeURIComponent(entry.scopeRef + ":" + entry.version)}&path=${encodeURIComponent(entry.path)}`
    if (suffix === this.conf.fileSuffix && typeof this.app.openReview === "function") {
      this.app.openReview(entry.scopeRef, entry.path, entry.version)
      return
    }
    let target = APP_BY_SUFFIX[suffix]
    if (target) window.location.href = `../${target}/?${params}`
  }

  approveEntry(entry) {
    if (!entry) return
    this.client.approve(entry.scopeRef, entry.path, entry.version)
      .then((res) => {
        toast(res && res.committed ? t("pane.review.approved_committed") : t("pane.review.approved_pending"))
        this.loadQueue()
        // A commit changes what the file panes show.
        if (res && res.committed) this.app.refreshFinders?.()
      })
      .catch((err) => { console.log(err); toast(t("common:message.error")) })
  }

  rejectEntry(entry) {
    if (!entry) return
    inputPrompt.show(t("pane.review.reject"), t("pane.review.reject_reason"))
      .then((reason) => {
        return this.client.reject(entry.scopeRef, entry.path, entry.version, (reason || "").trim())
          .then(() => {
            toast(t("pane.review.rejected"))
            this.loadQueue()
          })
      })
      .catch((err) => { if (err) { console.log(err); toast(t("common:message.error")) } })
  }
}
