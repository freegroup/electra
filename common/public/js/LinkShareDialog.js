import toast from "./toast"

class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    $("body").append(`
            <div id="linkShareDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 data-i18n="dialog.share" class="media-heading">Share with Others</h4>
                </div>
                <div class="modal-body">
                  <div class="controlWithHeader">
                        <label data-i18n="common:label.public_link" class="promptValueLabel">Public Link</label>
                        <div class="inputWithButton">
                          <input id="sharedLinkInput" type="text" class="" value="" > 
                          <button class="clipboardButton" style="float:right"><img src="../common/images/clipboard.svg"></button>
                        </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button data-i18n="common:button.close" class="electra-button" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    `)
  }

  /**
   */
  show(file) {

      let url = window.location.href.split('?')[0] + '?shared=' + file
      $("#sharedLinkInput").val(url)

      $('#linkShareDialog').on('shown.bs.modal', (event) => {
        $(event.currentTarget).find('input:first').focus()
      })
      $("#linkShareDialog").modal("show")

      $("#linkShareDialog .clipboardButton").on("click", () => {
        let copyText = document.getElementById("sharedLinkInput")
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy")
        $('#linkShareDialog').modal('hide')
        toast("Link copied")
      })
  }
}


let dialog = new Dialog()
export default dialog
