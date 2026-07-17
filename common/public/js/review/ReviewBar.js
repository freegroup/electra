import clientFactory from "./ReviewClient"
import inputPrompt from "../InputPrompt"
import toast from "../toast"

// The banner shown across the top of the editor while a pending version is
// loaded for review (?review=<scopeRef>:<version>&path=…). Shows the score
// situation and carries the Approve/Reject actions; the caller's points are
// resolved server-side on approve.
class ReviewBar {

  constructor() {
    this.client = clientFactory()
    this.current = null
  }

  // Show the bar for one pending version. The queue is consulted to display
  // the score situation; when the entry is gone (already decided) or the
  // caller isn't a reviewer, the vote buttons stay hidden.
  show({ scopeRef, path, version, onDone }) {
    this.current = { scopeRef, path, version, onDone }
    this.hide()

    $("#editor").prepend(`
      <div class="reviewBar">
        <div class="reviewBarMain">
          <span class="reviewBarBadge" data-i18n="pane.review.badge">${t("pane.review.badge")}</span>
          <span class="reviewBarTitle">${$("<span>").text(path).html()} · v${Number(version)}</span>
          <span class="reviewBarScore"></span>
          <span class="reviewBarActions">
            <button class="reviewBarApprove electra-button electra-primary" data-i18n="pane.review.approve" style="display:none">${t("pane.review.approve")}</button>
            <button class="reviewBarReject electra-button" data-i18n="pane.review.reject" style="display:none">${t("pane.review.reject")}</button>
            <button class="reviewBarClose electra-button" data-i18n="pane.review.back">${t("pane.review.back")}</button>
          </span>
        </div>
        <div class="reviewBarDescription" style="display:none"></div>
      </div>
    `)

    $("#editor .reviewBarApprove").on("click", () => this.approve())
    $("#editor .reviewBarReject").on("click", () => this.reject())
    $("#editor .reviewBarClose").on("click", () => this.done())

    this.client.queue().then((entries) => {
      let entry = entries.find((e) =>
        String(e.scopeRef) === String(scopeRef) && e.path === path && e.version === Number(version))
      if (!entry) {
        $("#editor .reviewBarScore").text(t("pane.review.not_open"))
        return
      }
      $("#editor .reviewBarScore").text(
        t("pane.review.score_status", { have: entry.approvedScore, need: entry.requiredScore, mine: entry.myScore }))
      if (!entry.alreadyVoted) $("#editor .reviewBarApprove").show()
      $("#editor .reviewBarReject").show()
      // The author's note ("what changed and why"), attached at promote time.
      if (entry.description) {
        $("#editor .reviewBarDescription").text(entry.description).show()
      }
    }).catch((err) => console.log(err))
  }

  hide() {
    $("#editor .reviewBar").remove()
  }

  approve() {
    let { scopeRef, path, version } = this.current
    this.client.approve(scopeRef, path, version)
      .then((res) => {
        toast(res && res.committed ? t("pane.review.approved_committed") : t("pane.review.approved_pending"))
        this.done()
      })
      .catch((err) => { console.log(err); toast(t("common:message.error")) })
  }

  reject() {
    let { scopeRef, path, version } = this.current
    inputPrompt.show(t("pane.review.reject"), t("pane.review.reject_reason"))
      .then((reason) => this.client.reject(scopeRef, path, version, (reason || "").trim())
        .then(() => { toast(t("pane.review.rejected")); this.done() }))
      .catch((err) => { if (err) { console.log(err); toast(t("common:message.error")) } })
  }

  // Leave review mode: drop the bar, clean the URL, hand control back to the
  // app (which switches to the Review pane and refreshes it).
  done() {
    let onDone = this.current && this.current.onDone
    this.hide()
    history.replaceState({}, document.title, window.location.href.split("?")[0])
    this.current = null
    if (typeof onDone === "function") onDone()
  }
}

let bar = new ReviewBar()
export default bar
