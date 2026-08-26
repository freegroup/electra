// UploadDialog - pick a backup file, or drop one onto the dialog.
//
// Resolves with the chosen File, rejects when the user closes it. The raw
// <input type="file"> stays hidden in here, so no pane has to carry that noise
// in its toolbar.
class Dialog {

  constructor() {
    $("body").append(`
      <div id="uploadDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 data-i18n="common:dialog.upload" class="media-heading"></h4>
            </div>
            <div class="modal-body">
              <div class="uploadDropZone">
                <div data-i18n="common:dialog.upload_explain" class="uploadDropText"></div>
                <button data-i18n="common:button.choose_file" class="electra-button uploadPickButton"></button>
              </div>
              <input type="file" class="uploadFileInput" accept=".electra,.json,application/json" hidden>
            </div>
            <div class="modal-footer">
              <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal"></button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  show() {
    return new Promise((resolve, reject) => {
      let settled = false
      let $dlg = $("#uploadDialog")
      let $zone = $dlg.find(".uploadDropZone")
      let $input = $dlg.find(".uploadFileInput")

      let done = (file) => {
        if (settled) return
        settled = true
        $dlg.modal("hide")
        resolve(file)
      }

      $dlg.off("hide.bs.modal").on("hide.bs.modal", () => {
        $zone.removeClass("dragOver")
        if (!settled) {
          settled = true
          reject(false)
        }
      })

      $dlg.find(".uploadPickButton").off("click").on("click", () => $input.trigger("click"))
      $input.off("change").on("change", (event) => {
        let file = event.target.files?.[0]
        // Reset, or picking the same file twice fires no change event.
        event.target.value = ""
        if (file) done(file)
      })

      // dragover must be cancelled, otherwise the browser just opens the file.
      $zone.off("dragover dragleave drop")
        .on("dragover", (event) => {
          event.preventDefault()
          $zone.addClass("dragOver")
        })
        .on("dragleave", () => $zone.removeClass("dragOver"))
        .on("drop", (event) => {
          event.preventDefault()
          $zone.removeClass("dragOver")
          let file = event.originalEvent.dataTransfer?.files?.[0]
          if (file) done(file)
        })

      $dlg.modal("show")
    })
  }
}

let dialog = new Dialog()
export default dialog
