import conf from "../Configuration"
import fs from "path-browserify"
import storageFactory from '../../../common/js/BackendStorage'
let storage = storageFactory(conf)

class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    $("body").append(` 
          <div id="fileSaveDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 data-i18n="dialog.save" class="media-heading">Save Document</h4>
                        <div class="description"></div>
                    </div>
                    <div class="modal-body">
                      <div class="media">
                        <div class="media-left">
                          <img class="filePreview" src="../common/images/toolbar_save.svg">
                        </div>
                        <div class="media-body">
                          <div class="controlWithHeader">
                            <label data-i18n="common:label.name" >Name</label>
                            <input type="text"  class="fileName" autofocus value="">
                          </div>
                        </div>
                      </div>

                    </div>
                    <div class="modal-footer">
                        <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal">Cancel</button>
                        <button data-i18n="common:button.save"   class="electra-button electra-primary okButton"><span>Save</span></button>
                    </div>
                </div>
            </div>
        </div>
    `)
  }

  /**
   * @method
   *
   * Open the file picker and load the selected file.<br>
   *
   * @param {Function} successCallback callback method if the user select a file and the content is loaded
   * @param {Function} errorCallback method to call if any error happens
   *
   * @since 4.0.0
   */
  show(currentFile, document, description="") {
    return new Promise( (resolve, reject) => {
      let promiseAlreadyHandled = false
      Mousetrap.pause()
      $("#fileSaveDialog .description").html(description)
      $("#fileSaveDialog .fileName").val(fs.basename(currentFile.name, conf.fileSuffix))

      $('#fileSaveDialog').one('shown.bs.modal', (event) => {
        $(event.currentTarget).find('input:first').focus()
      })

      $("#fileSaveDialog").one("hide.bs.modal", ()=>{
        Mousetrap.unpause()
        // hide event comes even if the dialog is closed with the "ok" button or "ESC". Catch this
        if (!promiseAlreadyHandled) {
          reject(false)
        }
      })

      $("#fileSaveDialog").modal("show")

      $('#fileSaveDialog .fileName').on('keypress', function (e) {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
          $("#fileSaveDialog .okButton").click()
        }
      })

      // Save Button
      //
      $("#fileSaveDialog .okButton").off('click').on("click", () => {
        let name = $("#fileSaveDialog .fileName").val()
        name = fs.basename(name,conf.fileSuffix) // remove any directories
        currentFile.name = fs.join(fs.dirname(currentFile.name), name + conf.fileSuffix)
        promiseAlreadyHandled = true
        $('#fileSaveDialog').modal('hide')
        this.save(currentFile, document).then(resolve, reject )
      })
    })
  }

  save(currentFile, document){
    return storage.saveFile(document.toJSON(), currentFile.name, currentFile.scope)
      .then(( response) => {
        let data = response.data
        currentFile.name = data.filePath
        history.pushState({
          id: 'editor',
          scope: currentFile.scope,
          file: currentFile.name
        }, conf.appName+' | ' + currentFile.name, window.location.href.split('?')[0] + '?'+currentFile.scope+'=' + currentFile.name)
      });
  }
}

let dialog = new Dialog()
export default dialog
