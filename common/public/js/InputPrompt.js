class Dialog {

  constructor() {
    $("body").append(`
            <div id="inputPromptDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="media-heading">Input Prompt</h4>
                </div>
                <div class="modal-body">
                    <div class="controlWithHeader">
                      <label class="promptValueLabel">Value</label>
                      <input type="text" class="inputPromptValue" value="" >
                    </div>
                </div>
                <div class="modal-footer">
                  <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal"></button>
                  <button data-i18n="common:button.save"   class="electra-button electra-primary okButton"></button>
                </div>
              </div>
            </div>
          </div>
    `)
  }

  /**
   */
  show(title, label, defaultValue="") {
    return new Promise (( resolve, reject) => {
      let promiseAlreadyHandled = false
      Mousetrap.pause()

      $("#inputPromptDialog .media-heading").html(title)
      $("#inputPromptDialog .promptValueLabel").html(label)
      $('#inputPromptDialog .inputPromptValue').val(defaultValue)

      $('#inputPromptDialog').one('shown.bs.modal', (event) => {
        $(event.currentTarget).find('input:first').focus()
      })
      
      $("#fileCreateDialog").one("hide.bs.modal", ()=>{
        Mousetrap.unpause()
        // hide event comes even if the dialog is closed with the "ok" button or "ESC". Catch this
        if (!promiseAlreadyHandled) {
          promiseAlreadyHandled = true
          reject(false)
        }
      })
      
      $("#inputPromptDialog").modal("show")

      $('#inputPromptDialog .inputPromptValue').on('keypress', function (e) {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
          $("#inputPromptDialog .okButton").click()
        }
      })

      // Save Button
      //
      $("#inputPromptDialog .okButton").off('click').on("click", () => {
        promiseAlreadyHandled = true
        $('#inputPromptDialog').modal('hide')
        resolve($("#inputPromptDialog .inputPromptValue").val())
      })
    })
  }
}


let dialog = new Dialog()
export default dialog
