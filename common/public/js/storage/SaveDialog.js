// Save the current document. This dialog only confirms/adjusts the name; the
// caller owns canvas serialization and the actual save. Saving is never a scope
// decision — the backend writes into the caller's leaf for the document's group.
//
// show(currentFile) -> Promise<{ name }>   (currentFile: { id, name })
export default class SaveDialog {

  constructor(storage, conf) {
    this.storage = storage
    this.conf = conf

    $("body").append(`
      <div id="storageSaveDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="media-heading" data-i18n="dialog.save">${t("dialog.save")}</h4>
            </div>
            <div class="modal-body">
              <div class="media">
                <div class="media-left">
                  <img class="filePreview" src="../common/images/toolbar_save.svg">
                </div>
                <div class="media-body">
                  <div class="controlWithHeader">
                    <label data-i18n="label.name">${t("label.name")}</label>
                    <input type="text" class="fileName" autofocus value="">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="electra-button" data-dismiss="modal" data-i18n="common:button.cancel">${t("common:button.cancel")}</button>
              <button class="electra-button electra-primary okButton" data-i18n="common:button.save">${t("common:button.save")}</button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  show(currentFile) {
    return new Promise((resolve, reject) => {
      let handled = false
      Mousetrap.pause()
      // The whole document path is editable — doc_path is just a virtual DB key,
      // not a filesystem path. Show it without the app suffix; sanitize() cleans
      // each path segment before save.
      let full = currentFile.name || ""
      if (full.endsWith(this.conf.fileSuffix)) full = full.slice(0, -this.conf.fileSuffix.length)
      $("#storageSaveDialog .fileName").val(full)
      $("#storageSaveDialog").one("shown.bs.modal", (event) => $(event.currentTarget).find("input:first").focus())
      $("#storageSaveDialog").modal("show")

      $("#storageSaveDialog").one("hide.bs.modal", () => {
        Mousetrap.unpause()
        if (!handled) reject(false)
      })

      $("#storageSaveDialog .okButton").off("click").on("click", () => {
        let name = this.storage.sanitize($("#storageSaveDialog .fileName").val())
        if (!name) return
        handled = true
        $("#storageSaveDialog").modal("hide")
        resolve({ name: name + this.conf.fileSuffix })
      })

      $("#storageSaveDialog .fileName").off("keypress").on("keypress", (e) => {
        if ((e.charCode || e.keyCode) === 13) $("#storageSaveDialog .okButton").click()
      })
    })
  }
}
