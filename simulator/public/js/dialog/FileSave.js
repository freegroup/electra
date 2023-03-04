import fs from "path-browserify"

import conf from "../Configuration"
import writer from '../io/Writer'

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
                <h4 data-i18n="dialog.save" class="media-heading">${t("dialog.save")}</h4>
              </div>
              <div class="modal-body">

                <div class="media">
                  <div class="media-left">
                    <img class="filePreview" src="../common/images/toolbar_save.svg">
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
                <button data-i18n="common:btton.save"    class="electra-button electra-primary okButton">${t("common:button.save")}</button>
              </div>
            </div>
          </div>
        </div>
    `)
  }

  /**
   */
  show(currentFile, canvas) {
    return new Promise( (resolve, reject)=>{ 
      let promiseAlreadyHandled = false
      Mousetrap.pause()
      $("#fileSaveDialog .fileName").val(fs.basename(currentFile.name,conf.fileSuffix))
      $('#fileSaveDialog').one('shown.bs.modal', (event) => { $(event.currentTarget).find('input:first').focus() })
      $("#fileSaveDialog").modal("show")
  
      $("#fileSaveDialog").one("hide.bs.modal", ()=>{
        Mousetrap.unpause()
        // hide event comes even if the dialog is closed with the "ok" button or "ESC". Catch this
        if (!promiseAlreadyHandled) {
          reject(false)
        }
      })

      $("#fileSaveDialog .okButton").off("click").on("click", () => {
        Mousetrap.unpause()
        let name = $("#fileSaveDialog .fileName").val()
        name = fs.basename(name, conf.fileSuffix) // remove any directories
        currentFile.name = fs.join(fs.dirname(currentFile.name), name + conf.fileSuffix)
        promiseAlreadyHandled = true;
        $('#fileSaveDialog').modal('hide')
        this.save(currentFile, canvas).then(resolve, reject)
      })
  
      $('#fileSaveDialog .fileName').off("keypress").on('keypress', (e) => {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
          $("#fileSaveDialog .okButton").click()
        }
      })
    })
  }

  save(currentFile, canvas){
    canvas.setCurrentSelection(null)
    writer.marshal(canvas)
    .then( json => {
      return storage.saveFile(json, currentFile.name, currentFile.scope)
    })
    .then( response =>{
      let data = response.data
      currentFile.name = data.filePath

      history.pushState({
        id: 'editor',
        scope: currentFile.scope,
        file: currentFile.name
      }, conf.appName+' | ' + currentFile.name, window.location.href.split('?')[0] + '?'+currentFile.scope+'=' + currentFile.name)

      return response
    })
  }
}

let dialog = new Dialog()
export default dialog
