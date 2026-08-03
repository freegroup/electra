import clientFactory from "./ActivityClient"
import CountBadge from "../CountBadge"
import { categoryFor } from "./activityIcons"
import { relativeTime } from "./relativeTime"

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

// Chevron (Lucide "chevron-down") for the expand toggle; rotates via CSS when the
// row is expanded. See THIRD-PARTY-NOTICES.md.
const CHEVRON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
  `stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`

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
      // Mark only the rows actually shown as read (not any unread beyond this
      // page), then drop the badge by however many of them were unread.
      let unreadShown = items.filter((it) => !it.seen)
      if (unreadShown.length > 0) {
        this.client.seen(unreadShown.map((it) => it.id))
          .then(() => this.countBadge.set(Math.max(0, unread - unreadShown.length)))
          .catch(() => {})
      }
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
    let $item = $(`<div class="activityItem"></div>`)
    if (!it.seen) $item.addClass("activityUnread")

    // A row is a header (icon + text + time + chevron) plus a detail panel that
    // expands below it. Two separate gestures: clicking the header opens the
    // document/workspace as before; the chevron only toggles the details.
    let $row = $(`<div class="activityRow"></div>`)

    // Category badge: a coloured icon that tells the event kind at a glance.
    // .cat-<key> drives the colour (see tabpane_activity.less), the SVG is a
    // vendored Lucide icon.
    let cat = categoryFor(it.eventType)
    $row.append($(`<span class="activityIcon cat-${cat.key}"></span>`).html(cat.svg))

    $row.append($(`<span class="activityText"></span>`).html(text))
    // Relative time in the row ("vor 5 Min"), full local timestamp on hover.
    $row.append($(`<span class="activityTime"></span>`)
      .text(relativeTime(it.createdAt))
      .attr("title", this.formatTime(it.createdAt)))

    // Chevron: toggles the detail panel. Its own click must not bubble up to the
    // header's open handler.
    let $chevron = $(`<span class="activityChevron"></span>`).html(CHEVRON_SVG)
    $row.append($chevron)

    if (this.canOpen(it)) {
      $row.addClass("activityClickable").on("click", () => this.open(it))
    }

    let $detail = this.renderDetail(it).addClass("activityDetailHidden")
    $chevron.on("click", (e) => {
      e.stopPropagation()
      $item.toggleClass("activityExpanded")
      $detail.toggleClass("activityDetailHidden")
    })

    $item.append($row).append($detail)
    return $item
  }

  // The expandable detail panel: a small definition list of the fields we have.
  // Rows are omitted when their value is empty, so a plain "committed" event
  // shows fewer rows than a rejected one with a reason.
  renderDetail(it) {
    let $d = $(`<div class="activityDetail"></div>`)
    let comment = (it.meta && it.meta._review && it.meta._review.description) || ""
    let rows = [
      [t("pane.activity.detail.file"), it.subjectLabel],
      [t("pane.activity.detail.workspace"), it.scopeLabel],
      [t("pane.activity.detail.when"), this.formatTime(it.createdAt)],
      [t("pane.activity.detail.status"),
        t(`pane.activity.status.${it.eventType}`, { defaultValue: it.eventType })],
      [t("pane.activity.detail.actor"), it.actor],
      [t("pane.activity.detail.version"), it.meta && it.meta.version],
      [t("pane.activity.detail.reason"), it.reason],
      [t("pane.activity.detail.comment"), comment],
    ]
    for (let [label, value] of rows) {
      if (value === undefined || value === null || value === "") continue
      let $r = $(`<div class="activityDetailRow"></div>`)
      $r.append($(`<span class="activityDetailLabel"></span>`).text(label))
      $r.append($(`<span class="activityDetailValue"></span>`).text(value))
      $d.append($r)
    }
    // An explicit Open action inside the panel, mirroring the header click.
    if (this.canOpen(it)) {
      $(`<button class="activityDetailOpen"></button>`)
        .text(t("pane.activity.detail.open"))
        .on("click", (e) => { e.stopPropagation(); this.open(it) })
        .appendTo($d)
    }
    return $d
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
