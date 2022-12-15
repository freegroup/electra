class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    $("body").append(`
            <div id="textPromptDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="media">
                    <fieldset>
                      <div class="form-group">
                        <div class="col-lg-12">
                          <div type="text" class="textPromptValue" style="font-size: 5vw;text-align: center;"></div>
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
  show(text) {
    $("#textPromptDialog .textPromptValue").html(text)
    $("#textPromptDialog").modal("show")
  }
}


let dialog = new Dialog()
export default dialog
