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
                <h4 class="media-heading">${t("dialog.save")}</h4>
              </div>
              <div class="modal-body">

                <div class="media">
                  <div class="media-left">
                    <img class="filePreview" src="../common/images/files_simulator.svg">
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
                <button class="electra-button" data-dismiss="modal">${t("common:button.cancel")}</button>
                <button class="electra-button electra-primary okButton">${t("common:button.save")}</button>
              </div>
            </div>
          </div>
        </div>
    `)
  }

  /**
   */
  show(currentFile, canvas, callback) {
    Mousetrap.pause()
    $("#fileSaveDialog .fileName").val(fs.basename(currentFile.name,conf.fileSuffix))

    $('#fileSaveDialog').off('shown.bs.modal').on('shown.bs.modal', (event) => {
      $(event.currentTarget).find('input:first').focus()
    })
    $("#fileSaveDialog").modal("show")

    //
    $("#fileSaveDialog .okButton").off("click").on("click", () => {
      Mousetrap.unpause()
      let name = $("#fileSaveDialog .fileName").val()
      name = name.replace(conf.fileSuffix, "")
      name = fs.basename(name) // remove any directories
      currentFile.name = fs.join(fs.dirname(currentFile.name), name + conf.fileSuffix)
      this.save(currentFile, canvas, (response)=>{
        $('#fileSaveDialog').modal('hide')
        if(callback) {
          callback(response)
        }
      })
    })

    $('#fileSaveDialog .fileName').off("keypress").on('keypress', function (e) {
      let key = e.charCode || e.keyCode || 0;
      if (key === 13) {
        $("#fileSaveDialog .okButton").click()
      }
    })

  }

  save(currentFile, canvas, callback){
    canvas.setCurrentSelection(null)
    writer.marshal(canvas, json => {
      storage.saveFile(json, currentFile.name, currentFile.scope)
        .then(function (response) {
          let data = response.data
          currentFile.name = data.filePath

          history.pushState({
            id: 'editor',
            scope: currentFile.scope,
            file: currentFile.name
          }, conf.appName+' | ' + name, window.location.href.split('?')[0] + '?'+currentFile.scope+'=' + currentFile.name)

          if(callback) {
            callback(response)
          }
        })
    })
  }
}

let dialog = new Dialog()
export default dialog
