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
                        <h4 data-i18n="dialog.save_component" class="media-heading">${t("dialog.save_component")}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="media">
                            <div class="media-left">
                                <img class="filePreview" src="">
                            </div>
                            <div class="media-body">
                              <div class="controlWithHeader">
                                  <label data-i18n="label.folder">${t("label.folder")}</label>
                                  <input type="text" class="directoryName" value="">
                              </div>
                              <div class="controlWithHeader">
                                <label data-i18n="label.name">${t("label.name")}</label>
                                <input type="text"  class="fileName" autofocus value="">
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal">${t("common:button.cancel")}</button>
                        <button data-i18n="common:button.save" class="electra-button electra-primary okButton">${t("common:button.save")}</button>
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
  show(currentFile, canvas) {
    return new Promise( (resolve, reject) => {
      new draw2d.io.png.Writer().marshal(canvas, imageDataUrl => {
        let promiseAlreadyHandled = false
        Mousetrap.pause()

        $("#fileSaveDialog .filePreview").attr("src", imageDataUrl)
        $("#fileSaveDialog .directoryName").val(fs.dirname(currentFile.name))
        $("#fileSaveDialog .fileName").val(fs.basename(currentFile.name, conf.fileSuffix))
 
        $('#fileSaveDialog').on('shown.bs.modal', (event) => {
          $(event.currentTarget).find('input:first').focus()
        })

        $("#fileSaveDialog").one("hide.bs.modal", ()=>{
          Mousetrap.unpause()
          // hide event comes even if the dialog is closed with the "ok" button or "ESC". Catch this
          if (!promiseAlreadyHandled) {
            reject(false)
          }
        })
  
        $('#fileSaveDialog .fileName').off("keypress").on('keypress', function (e) {
          let key = e.charCode || e.keyCode || 0;
          if (key === 13) {
            $("#fileSaveDialog .okButton").click()
          }
        })

        $("#fileSaveDialog").modal("show")
        setTimeout( ()=> $("#fileSaveDialog .fileName")[0].focus(), 500)

        // Save Button
        //
        $("#fileSaveDialog .okButton").off('click').on("click", () => {
          let writer = new draw2d.io.json.Writer()
          writer.marshal(canvas, json => {
            // get the directory of the current file
            let dir =  $("#fileSaveDialog .directoryName").val()
  
            // get the user input and replace all unneeded stuff.
            // It is not an seccurity issue, but we remove all entered directorie paths from the filename
            // This happens on the server-side as well.
            let name = $("#fileSaveDialog .fileName").val()
            name = fs.basename(name, conf.fileSuffix) // remove any directories
  
            // generate the current filename. This gets an update after the "save" request comes back.
            // The new reals filename is in the "save" response
            currentFile.name = fs.join(dir, name + conf.fileSuffix)
            promiseAlreadyHandled = true
            $('#fileSaveDialog').modal('hide')

            storage.saveFile( { draw2d: json }, currentFile.name , currentFile.scope)
              .then((response) => {
                let data = response.data
                currentFile.name = data.filePath
                history.pushState({
                  id: 'editor',
                  scope: currentFile.scope,
                  file: currentFile.name
                }, conf.appName+' | ' + name, window.location.href.split('?')[0] + '?'+currentFile.scope+'=' + currentFile.name)
                resolve(currentFile.name)
              })
              .catch( (exc)=>{
                console.log(exc)
              });
          })
        })
      }, canvas.getBoundingBox().scale(20, 20))
    })
  }
}

let dialog = new Dialog()
export default dialog
