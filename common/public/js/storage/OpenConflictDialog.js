// A two-choice dialog shown when opening a document from the "Files" pane whose
// path also has the caller's personal draft: open the private copy or the
// shared original? Resolves with "draft" or "original"; rejects on cancel.
//
// Modeled on ConfirmDialog, but with two positive buttons instead of one.
class OpenConflictDialog {

  constructor() {
    $("body").append(`
      <div id="openConflictDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 data-i18n="dialog.open_conflict" class="media-heading">${t("dialog.open_conflict")}</h4>
            </div>
            <div class="modal-body" data-i18n="dialog.open_conflict_explain">${t("dialog.open_conflict_explain")}</div>
            <div class="modal-footer">
              <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal">${t("common:button.cancel")}</button>
              <button data-i18n="button.open_draft" class="electra-button openDraftButton">${t("button.open_draft")}</button>
              <button data-i18n="button.open_original" class="electra-button electra-primary openOriginalButton">${t("button.open_original")}</button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  // -> Promise resolving "draft" | "original"; rejects (false) on cancel/close.
  show() {
    return new Promise((resolve, reject) => {
      let handled = false

      $("#openConflictDialog").off("hide.bs.modal").on("hide.bs.modal", () => {
        if (!handled) { handled = true; reject(false) }
      })

      $("#openConflictDialog .openDraftButton").off("click").on("click", () => {
        handled = true
        resolve("draft")
        $("#openConflictDialog").modal("hide")
      })

      $("#openConflictDialog .openOriginalButton").off("click").on("click", () => {
        handled = true
        resolve("original")
        $("#openConflictDialog").modal("hide")
      })

      $("#openConflictDialog").modal("show")
    })
  }
}

let dialog = new OpenConflictDialog()
export default dialog
