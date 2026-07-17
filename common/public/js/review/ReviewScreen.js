import clientFactory from "./ReviewClient"
import ReviewFactSheet from "./ReviewFactSheet"
import inputPrompt from "../InputPrompt"
import toast from "../toast"
import thumbUrl from "../thumbUrl"

// The Review pane — the caller's aggregated review inbox: every document
// version waiting for approval in any workspace where the caller holds
// reviewer points. Each card shows the score situation and offers:
// open in the matching editor, approve, reject.
//
// App-agnostic — talks to the userinfo account BFF.
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
    this.render()
  }

  onShow() {
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
      this.entries = new Map(entries.map((e) => [`${e.scopeRef}:${e.version}:${e.path}`, e]))

      let $grid = $(`<div class="factSheetGrid"></div>`)

      if (entries.length === 0) {
        $grid.append(`<div class="fileListEmpty" data-i18n="pane.review.empty">${t("pane.review.empty")}</div>`)
      }

      for (let e of entries) {
        let dot = e.path.lastIndexOf(".")
        let suffix = dot === -1 ? "" : e.path.slice(dot)
        let base = e.path.split("/").pop()
        let thumbnail = thumbUrl(this.conf, e.scopeRef, e.path, e.version)
        let item = {
          id: `${e.scopeRef}:${e.version}:${e.path}`,
          title: suffix && base.endsWith(suffix) ? base.slice(0, -suffix.length) : base,
          version: e.version,
          providedBy: e.scopeLabel || e.scopePath.split("/").pop(),
          thumbnailUrl: thumbnail,
          description: e.description || null,
          isDeletion: !!e.isDeletion,
          author: e.author,
          requiredScore: e.requiredScore,
          approvedScore: e.approvedScore,
          myScore: e.myScore,
          alreadyVoted: !!e.alreadyVoted,
          canOpen: !e.isDeletion && !!APP_BY_SUFFIX[suffix],
          _entry: e,
        }

        $grid.append(new ReviewFactSheet(item, {
          onOpen: () => _this.openEntry(e),
          onApprove: () => _this.approveEntry(e),
          onReject: () => _this.rejectEntry(e),
        }).render())
      }

      $host.removeClass("spinner").empty().append($grid)
    }).catch((exc) => {
      console.log(exc)
      $host.removeClass("spinner").html(
        `<div class="fileListEmpty" data-i18n="common:message.error">${t("common:message.error")}</div>`)
    })
  }

  openEntry(entry) {
    if (!entry) return
    let dot = entry.path.lastIndexOf(".")
    let suffix = dot === -1 ? "" : entry.path.slice(dot)
    if (suffix === this.conf.fileSuffix && typeof this.app.openReview === "function") {
      this.app.openReview(entry.scopeRef, entry.path, entry.version)
      return
    }
    let params = `review=${encodeURIComponent(entry.scopeRef + ":" + entry.version)}&path=${encodeURIComponent(entry.path)}`
    let target = APP_BY_SUFFIX[suffix]
    if (target) window.location.href = `../${target}/?${params}`
  }

  approveEntry(entry) {
    if (!entry) return
    this.client.approve(entry.scopeRef, entry.path, entry.version)
      .then((res) => {
        toast(res && res.committed ? t("pane.review.approved_committed") : t("pane.review.approved_pending"))
        this.loadQueue()
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
