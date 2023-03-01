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
                  <button data-i18n="common:button.save" class="electra-button electra-primary okButton"></button>
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
      $("#inputPromptDialog .media-heading").html(title)
      $("#inputPromptDialog .promptValueLabel").html(label)
      $('#inputPromptDialog .inputPromptValue').val(defaultValue)

      $('#inputPromptDialog').on('shown.bs.modal', (event) => {
        $(event.currentTarget).find('input:first').focus()
      })
      $("#inputPromptDialog").modal("show")
      Mousetrap.pause()

      $('#inputPromptDialog .inputPromptValue').on('keypress', function (e) {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
          $("#inputPromptDialog .okButton").click()
        }
      })

      // Save Button
      //
      $("#inputPromptDialog .okButton").off('click').on("click", () => {
        Mousetrap.unpause()
        $('#inputPromptDialog').modal('hide')
        let value = $("#inputPromptDialog .inputPromptValue").val()
        resolve(value)
      })
    })
  }
}


let dialog = new Dialog()
export default dialog
