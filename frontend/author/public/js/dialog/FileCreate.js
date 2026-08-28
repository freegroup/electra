import fs from "path-browserify"
import conf from "../Configuration"
import storageFactory from '../../../common/js/BackendStorage'

let storage = storageFactory(conf)

class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    $("body").append(`
        <div id="fileCreateDialog" class="modal fade genericDialog" tabindex="-1">
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <h4 data-i18n="dialog.create" class="media-heading">${t("dialog.create")}</h4>
              </div>
              <div class="modal-body">
              
                <div class="media">
                  <div class="media-left">
                    <img class="filePreview" src="../common/images/toolbar_new_file.svg">
                  </div>
                  <div class="media-body">
                    <div class="controlWithHeader">
                      <label>${t("label.name")}</label>
                      <input type="text"  class="fileName" autofocus value="">
                    </div>
                  </div>
                </div>

              </div>
              <div class="modal-footer">
                <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal">${t("common:button.cancel")}</button>
                <button data-i18n="common:button.create" class="electra-button electra-primary okButton">${t("common:button.create")}</button>
              </div>
            </div>
          </div>
        </div>
    `)
  }

  /**
   */
  show(currentFile, document) {
    return new Promise (( resolve, reject) => {
      let promiseAlreadyHandled = false
      Mousetrap.pause()
      $("#fileCreateDialog .fileName").val(fs.basename(currentFile.name,conf.fileSuffix))
      $('#fileCreateDialog').one('shown.bs.modal', (event) => { $(event.currentTarget).find('input:first').focus() })
      $("#fileCreateDialog").one("hide.bs.modal", ()=>{
        Mousetrap.unpause()
        // hide event comes even if the dialog is closed with the "ok" button or "ESC". Catch this
        if (!promiseAlreadyHandled) {
          reject(false)
        }
      })

      $('#fileCreateDialog .fileName').off("keypress").on('keypress', function (e) {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
          $("#fileCreateDialog .okButton").click()
        }
      })

      // we need off/on instead of "one". Because it is not clear if the user presses "ok" or just hit "ESC"
      $("#fileCreateDialog .okButton").off("click").on("click", () => {
        promiseAlreadyHandled = true
        let name = $("#fileCreateDialog .fileName").val()
        name = fs.basename(name, conf.fileSuffix)
        currentFile.name = fs.join(fs.dirname(currentFile.name), name + conf.fileSuffix)
        $('#fileCreateDialog').modal('hide')
        return storage.saveFile(document.toJSON(), currentFile.name, currentFile.scope)
          .then(( response) => {
            let data = response.data
            currentFile.name = data.filePath
            history.pushState({
              id: 'editor',
              scope: currentFile.scope,
              file: currentFile.name
            }, conf.appName+' | ' + currentFile.name, window.location.href.split('?')[0] + '?'+currentFile.scope+'=' + currentFile.name)
          })
          .then(resolve, reject)
      })

      $("#fileCreateDialog").modal("show")
    })
  }

}

let dialog = new Dialog()
export default dialog
