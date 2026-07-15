import fs from "path-browserify"

// New document — collects just a name. The backend decides which group a new
// document lands in (the app's default group under its root scope), so the
// frontend no longer picks a scope.
//
// show(defaultName) -> Promise<{ name }>   (name includes the file suffix)
export default class NewDocumentDialog {

  constructor(storage, conf) {
    this.storage = storage
    this.conf = conf

    $("body").append(`
      <div id="newDocumentDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="media-heading" data-i18n="dialog.new_document">${t("dialog.new_document")}</h4>
            </div>
            <div class="modal-body">
              <div class="controlWithHeader">
                <label data-i18n="label.name">${t("label.name")}</label>
                <input type="text" class="fileName" autofocus value="">
              </div>
            </div>
            <div class="modal-footer">
              <button class="electra-button" data-dismiss="modal" data-i18n="common:button.cancel">${t("common:button.cancel")}</button>
              <button class="electra-button electra-primary okButton" data-i18n="common:button.create">${t("common:button.create")}</button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  show(defaultName) {
    return new Promise((resolve, reject) => {
      let handled = false
      Mousetrap.pause()
      $("#newDocumentDialog .fileName").val(fs.basename(defaultName || this.conf.fileNew, this.conf.fileSuffix))
      $("#newDocumentDialog").one("shown.bs.modal", (event) => $(event.currentTarget).find("input:first").focus())
      $("#newDocumentDialog").modal("show")

      $("#newDocumentDialog").one("hide.bs.modal", () => {
        Mousetrap.unpause()
        if (!handled) reject(false)
      })

      $("#newDocumentDialog .okButton").off("click").on("click", () => {
        let name = this.storage.sanitize($("#newDocumentDialog .fileName").val())
        if (!name) return
        handled = true
        $("#newDocumentDialog").modal("hide")
        resolve({ name: name + this.conf.fileSuffix })
      })

      $("#newDocumentDialog .fileName").off("keypress").on("keypress", (e) => {
        if ((e.charCode || e.keyCode) === 13) $("#newDocumentDialog .okButton").click()
      })
    })
  }
}
