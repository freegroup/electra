class Dialog {

  constructor() {
    $("body").append(`
            <div id="confirmDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 data-i18n="common:dialog.confirm" class="media-heading"></h4>
                </div>
                <div class="modal-body">
                   
                </div>
                <div class="modal-footer">
                  <button data-i18n="common:button.cancel" class="electra-button" data-dismiss="modal"></button>
                  <button data-i18n="common:button.confirm" class="electra-button electra-primary okButton"></button>
                </div>
              </div>
            </div>
          </div>
    `)
  }

  /**
   */
  show(title,) {
    return new Promise (( resolve, reject) => {
      let promiseAlreadyHandled = false
      $("#confirmDialog .modal-body").html(title)
     
      $("#confirmDialog").off("hide.bs.modal").on("hide.bs.modal", ()=>{
        // hide event comes even if the dialog is closed with the "ok" button. Catch this
        if (!promiseAlreadyHandled) {
          promiseAlreadyHandled=true
          reject(false)
        }
      })

      // Ok Button
      $("#confirmDialog .okButton").off('click').on("click", () => {
        resolve(true)
        promiseAlreadyHandled = true
        $('#confirmDialog').modal('hide')
      })

      $("#confirmDialog").modal("show")
 
    })
  }
}


let dialog = new Dialog()
export default dialog
