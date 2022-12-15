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
                  <h4 class="media-heading">Share with Others</h4>
                </div>
                <div class="modal-body">
                  <div class="media">
                    <div class="promptValueLabel">Public Link:</div>
                    <fieldset>
                      <div class="form-group">
                        <div class="col-lg-12">
                          <input id="sharedLinkInput" type="text" class="form-control floating-label" value="" > <button class="clipboardButton" style="float:right">copy</button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn" data-dismiss="modal">Close</button>
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
