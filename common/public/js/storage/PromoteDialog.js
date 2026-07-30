// The promote confirmation: explains what promoting means and lets the caller
// attach an optional note for the reviewers ("what changed and why") — shown
// in the review queue and the editor's review bar when the promote needs
// approval. Resolves with the (possibly empty) description string; rejects
// with false when the dialog is dismissed — same contract as ConfirmDialog.
class Dialog {

  constructor() {
    $("body").append(`
      <div id="promoteDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 data-i18n="button.promote" class="media-heading">${t("button.promote")}</h4>
            </div>
            <div class="modal-body">
              <p class="promoteExplain"></p>
              <div class="controlWithHeader">
                <label data-i18n="dialog.promote_description_label">${t("dialog.promote_description_label")}</label>
                <textarea class="promoteDescription" rows="3" maxlength="2000"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal">${t("common:button.cancel")}</button>
              <button data-i18n="button.promote" class="electra-button electra-primary okButton">${t("button.promote")}</button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  show(explainText) {
    return new Promise((resolve, reject) => {
      let promiseAlreadyHandled = false
      $("#promoteDialog .promoteExplain").text(explainText)
      $("#promoteDialog .promoteDescription").val("")

      $("#promoteDialog").off("hide.bs.modal").on("hide.bs.modal", () => {
        // hide fires for OK, cancel and ESC alike — only reject when the
        // promise wasn't resolved by the OK button.
        if (!promiseAlreadyHandled) {
          promiseAlreadyHandled = true
          reject(false)
        }
      })

      $("#promoteDialog .okButton").off("click").on("click", () => {
        promiseAlreadyHandled = true
        resolve($("#promoteDialog .promoteDescription").val().trim())
        $("#promoteDialog").modal("hide")
      })

      $("#promoteDialog").modal("show")
    })
  }
}

let dialog = new Dialog()
export default dialog
