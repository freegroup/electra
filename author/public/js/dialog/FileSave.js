import conf from "./../configuration"
import fs from "path-browserify"

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
                        <h4 class="media-heading">Save Document</h4>
                        <div class="description"></div>
                    </div>
                    <div class="modal-body">
                      <div class="media">
                        <div class="media-left">
                          <img class="filePreview" src="../common/images/files_author.svg">
                        </div>
                        <div class="media-body">
                          <div class="controlWithHeader">
                            <label>Name</label>
                            <input type="text"  class="fileName" autofocus value="">
                          </div>
                        </div>
                      </div>

                    </div>
                    <div class="modal-footer">
                        <button class="electra-button" data-dismiss="modal">Cancel</button>
                        <button class="electra-button electra-primary okButton"><span>Save</span></button>
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
  show(currentFile, storage, document, description="") {
    return new Promise( (resolve, reject) => {
      $("#fileSaveDialog .description").html(description)
      $("#fileSaveDialog .fileName").val(fs.basename(currentFile.name, conf.fileSuffix))

      $('#fileSaveDialog').on('shown.bs.modal', (event) => {
        $(event.currentTarget).find('input:first').focus()
      })
      $("#fileSaveDialog").modal("show")
      Mousetrap.pause()

      $('#fileSaveDialog .fileName').on('keypress', function (e) {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
          $("#fileSaveDialog .okButton").click()
        }
      })

      // Save Button
      //
      $("#fileSaveDialog .okButton").off('click').on("click", () => {
        Mousetrap.unpause()
        let name = $("#fileSaveDialog .fileName").val()
        name = fs.basename(name,conf.fileSuffix) // remove any directories
        currentFile.name = fs.join(fs.dirname(currentFile.name), name + conf.fileSuffix)
        this.save(currentFile, storage, document)
          .then( () => {
            $('#fileSaveDialog').modal('hide')
            resolve()
          })
          .catch( ()=>{
            reject()
          })
      })
    })
  }

  save(currentFile, storage, document){
    return storage.saveFile(document.toJSON(), currentFile.name, currentFile.scope)
      .then(( response) => {
        let data = response.data
        currentFile.name = data.filePath
        history.pushState({
          id: 'editor',
          scope: currentFile.scope,
          file: currentFile.name
        }, conf.appName+' | ' + name, window.location.href.split('?')[0] + '?'+currentFile.scope+'=' + currentFile.name)
      });
  }
}

let dialog = new Dialog()
export default dialog
