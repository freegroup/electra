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
                <h4 class="media-heading">Save your circuit</h4>
              </div>
              <div class="modal-body">
                <div class="media">
                  <div class="media-left media-middle">
                    <a href="#">
                      <div class="media-object filePreview ion-ios-upload-outline"></div>
                    </a>
                  </div>
                  <div class="media-body">
        
        
                    <br>
                    <br>
                    <fieldset>
                      <div class="form-group">
                        <div class="col-lg-12">
                          <input type="text"
                                 class="form-control floating-label githubFileName"
                                 value=""
                          >
                        </div>
                      </div>
                    </fieldset>
                    <div class="row"></div>
        
        
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn" data-dismiss="modal">Abort</button>
                <button class="btn btn-primary okButton"><span>Save</span></button>
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
    $("#fileSaveDialog .githubFileName").val(fs.basename(currentFile.name,conf.fileSuffix))

    $('#fileSaveDialog').off('shown.bs.modal').on('shown.bs.modal', (event) => {
      $(event.currentTarget).find('input:first').focus()
    })
    $("#fileSaveDialog").modal("show")

    // Button: Commit to GitHub
    //
    $("#fileSaveDialog .okButton").off("click").on("click", () => {
      Mousetrap.unpause()
      let name = $("#fileSaveDialog .githubFileName").val()
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

    $('#fileSaveDialog .githubFileName').off("keypress").on('keypress', function (e) {
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
