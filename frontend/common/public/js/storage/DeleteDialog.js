// The shared-delete confirmation. Like the promote dialog it collects an
// optional note, but stands on its own so its wording and icon can evolve
// independently. Two flavours via show()'s opts: an admin "Delete" (commits
// at once) and a member "Request Deletion" (opens a deletion review). The note
// travels to the reviewers as the review entry's description.
//
// Resolves with the (possibly empty) description string; rejects with false
// when dismissed — same contract as ConfirmDialog / PromoteDialog.
class Dialog {

  constructor() {
    $("body").append(`
      <div id="deleteDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img class="deleteDialogIcon" src="../common/images/toolbar_delete.svg">
              <h4 class="media-heading deleteTitle"></h4>
            </div>
            <div class="modal-body">
              <p class="deleteExplain"></p>
              <div class="controlWithHeader">
                <label class="deleteDescriptionLabel" data-i18n="dialog.delete_description_label">${t("dialog.delete_description_label")}</label>
                <textarea class="deleteDescription" rows="3" maxlength="2000"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal">${t("common:button.cancel")}</button>
              <button class="electra-button electra-primary okButton"></button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  // explainText — the sentence shown in the body.
  // opts.title / opts.okLabel — the action label ("Delete" vs "Request
  // Deletion"); set every call so one flavour never leaks into the next.
  show(explainText, opts = {}) {
    let title = opts.title || t("common:button.delete")
    let okLabel = opts.okLabel || title
    return new Promise((resolve, reject) => {
      let promiseAlreadyHandled = false
      $("#deleteDialog .deleteTitle").text(title)
      $("#deleteDialog .okButton").text(okLabel)
      $("#deleteDialog .deleteExplain").text(explainText)
      $("#deleteDialog .deleteDescription").val("")

      $("#deleteDialog").off("hide.bs.modal").on("hide.bs.modal", () => {
        // hide fires for OK, cancel and ESC alike — only reject when the
        // promise wasn't resolved by the OK button.
        if (!promiseAlreadyHandled) {
          promiseAlreadyHandled = true
          reject(false)
        }
      })

      $("#deleteDialog .okButton").off("click").on("click", () => {
        promiseAlreadyHandled = true
        resolve($("#deleteDialog .deleteDescription").val().trim())
        $("#deleteDialog").modal("hide")
      })

      $("#deleteDialog").modal("show")
    })
  }
}

let dialog = new Dialog()
export default dialog
