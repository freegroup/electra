import conf from "../Configuration"
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
                        <h4 class="media-heading">Save Component </h4>
                    </div>
                    <div class="modal-body">
                        <div class="media">
                            <div class="media-left media-middle">
                                <img class="media-object filePreview" src="">
                            </div>
                            <div class="media-body">
        
                                <div class="form-horizontal">
                                    <fieldset>
                                        Library:
                                        <div class="form-group">
                                            <div class="col-lg-12">
                                                <input type="text" class="directoryName" value="">
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                       
                                        <div class="form-group">
                                            <div class="col-lg-12">
                                              <label>Name</label>
                                              <input type="text"  class="fileName" autofocus value="">
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="electra-button" data-dismiss="modal">Abort</button>
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
  show(currentFile, storage, canvas, callback) {
    return new Promise( (resolve, reject) => {
      new draw2d.io.png.Writer().marshal(canvas, imageDataUrl => {
        $("#fileSaveDialog .filePreview").attr("src", imageDataUrl)
        $("#fileSaveDialog .directoryName").val(fs.dirname(currentFile.name))
        $("#fileSaveDialog .fileName").val(fs.basename(currentFile.name, conf.fileSuffix))
 
        $('#fileSaveDialog').on('shown.bs.modal', (event) => {
          $(event.currentTarget).find('input:first').focus()
        })
        $("#fileSaveDialog").modal("show")
        setTimeout( ()=> $("#fileSaveDialog .fileName")[0].focus(), 500)
        Mousetrap.pause()
  
        // Save Button
        //
        $("#fileSaveDialog .okButton").off('click').on("click", () => {
          Mousetrap.unpause()
          let writer = new draw2d.io.json.Writer()
          writer.marshal(canvas, json => {
            // get the directory of the current file
            let dir =  $("#fileSaveDialog .directoryName").val()
  
            // get the user input and replace all unneeded stuff.
            // It is not an seccurity issue, but we remove all entered directorie paths from the filename
            // This happens on the server-side as well.
            let name = $("#fileSaveDialog .fileName").val()
            name = fs.basename(name,conf.fileSuffix) // remove any directories
  
            // generate the current filename. This gets an update after the "save" request comes back.
            // The new reals filename is in the "save" response
            currentFile.name = fs.join(dir, name + conf.fileSuffix)
  
            storage.saveFile( { draw2d: json }, currentFile.name , currentFile.scope)
              .then((response) => {
                $('#fileSaveDialog').modal('hide')
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
  
        $('#fileSaveDialog .fileName').off("keypress").on('keypress', function (e) {
          let key = e.charCode || e.keyCode || 0;
          if (key === 13) {
            $("#fileSaveDialog .okButton").click()
          }
        })
  
      }, canvas.getBoundingBox().scale(20, 20))
    })
  }
}

let dialog = new Dialog()
export default dialog
