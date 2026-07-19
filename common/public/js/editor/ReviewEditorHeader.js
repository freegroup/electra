import EditorHeader from "./EditorHeader"
import clientFactory from "../review/ReviewClient"
import inputPrompt from "../InputPrompt"
import confirmDialog from "../ConfirmDialog"
import toast from "../toast"
import ReviewInfoDialog from "../ReviewInfoDialog"

// ReviewEditorHeader — the editor header shown while a pending version is loaded
// for review. Requires only the document's UUID; all metadata (path, version,
// scopeRef, scores) is fetched from the review queue by matching uuid.
class ReviewEditorHeader extends EditorHeader {

  constructor() {
    super()
    this.client = clientFactory()
    this.current = null
  }

  show({ uuid, onDone }) {
    this.current = { uuid, onDone }
    EditorHeader.clear()
    $("#editor").addClass("reviewMode")

    // Placeholder header while we fetch queue metadata.
    let $header = $(`
      <div class="editorHeader editorHeaderReview">
        <div class="editorHeaderTag">${t("pane.review.requested")}</div>
        <div class="editorHeaderBody">
          <div class="editorHeaderMain">
            <span class="editorHeaderName"></span>
            <span class="editorHeaderVersion"></span>
            <img class="editorHeaderComment" src="../common/images/status_comment.svg" style="display:none">
            <span class="editorHeaderScore"></span>
            <span class="editorHeaderActions">
              <button class="editorHeaderAccept electra-button electra-primary" style="display:none">${t("pane.review.accept")}</button>
              <button class="editorHeaderApprove electra-button electra-primary" style="display:none">${t("pane.review.approve")}</button>
              <button class="editorHeaderReject electra-button" style="display:none">${t("pane.review.reject")}</button>
              <span class="editorHeaderVoted" style="display:none">✓ ${t("pane.review.voted")}</span>
            </span>
          </div>
          <div class="editorHeaderInstruction"></div>
        </div>
      </div>
    `)
    $("#editor").prepend($header)

    $("#editor .editorHeaderAccept").on("click", () => this.accept())
    $("#editor .editorHeaderApprove").on("click", () => this.approve())
    $("#editor .editorHeaderReject").on("click", () => this.reject())

    this.client.queue().then((entries) => {
      let entry = entries.find((e) => e.uuid === uuid)
      if (!entry) {
        $("#editor .editorHeaderScore").text(t("pane.review.not_open"))
        return
      }

      // Store the entry so approve/reject/accept can use scopeRef+path+version.
      this.current = { uuid, onDone, entry }

      $header.find(".editorHeaderName").text(entry.path.split("/").pop())
      $header.find(".editorHeaderVersion").text("· v" + entry.version)

      $("#editor .editorHeaderScore").text(
        t("pane.review.score_status", { have: entry.approvedScore, need: entry.requiredScore, mine: entry.myScore }))

      if (entry.isAdmin) {
        $("#editor .editorHeaderAccept").show()
      } else if (!entry.alreadyVoted) {
        $("#editor .editorHeaderApprove").show()
      }
      if (!entry.alreadyVoted) $("#editor .editorHeaderReject").show()
      if (entry.alreadyVoted && !entry.isAdmin) $("#editor .editorHeaderVoted").show()

      let parts = []
      parts.push(entry.alreadyVoted
        ? t("pane.review.instruction_voted")
        : t("pane.review.instruction_reviewer"))
      if (entry.isAdmin) parts.push(t("pane.review.instruction_admin"))
      $("#editor .editorHeaderInstruction").text(parts.join(" "))

      $("#editor .editorHeaderComment").show().off("click").on("click", () => {
        ReviewInfoDialog.show({
          title: t("pane.review.change_comment_title"),
          intro: t("pane.review.change_comment_intro", { author: entry.author, doc: entry.path.split("/").pop() }),
          body: entry.description || t("pane.review.no_change_comment"),
        })
      })
    }).catch((err) => console.log(err))
  }

  approve() {
    let { entry } = this.current
    this.client.approve(entry.scopeRef, entry.path, entry.version)
      .then((res) => {
        toast(res && res.committed ? t("pane.review.approved_committed") : t("pane.review.approved_pending"))
        this.done()
      })
      .catch((err) => { console.log(err); toast(t("common:message.error")) })
  }

  accept() {
    let { entry } = this.current
    confirmDialog.show(t("pane.review.accept_explain"))
      .then(() => this.client.accept(entry.scopeRef, entry.path, entry.version))
      .then(() => { toast(t("pane.review.approved_committed")); this.done() })
      .catch((err) => { if (err) { console.log(err); toast(t("common:message.error")) } })
  }

  reject() {
    let { entry } = this.current
    inputPrompt.show(
      t("pane.review.reject"),
      t("pane.review.reject_reason"),
      "",
      t("pane.review.reject_explain"))
      .then((reason) => this.client.reject(entry.scopeRef, entry.path, entry.version, (reason || "").trim())
        .then(() => { toast(t("pane.review.rejected")); this.done() }))
      .catch((err) => { if (err) { console.log(err); toast(t("common:message.error")) } })
  }

  done() {
    let onDone = this.current && this.current.onDone
    EditorHeader.clear()
    history.replaceState({}, document.title, window.location.href.split("?")[0])
    this.current = null
    if (typeof onDone === "function") onDone()
  }
}

let header = new ReviewEditorHeader()
export default header
