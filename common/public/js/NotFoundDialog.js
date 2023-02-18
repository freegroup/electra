class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    $("body").append(`
            <div id="notFoundDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
              <div class="modal-content">
                <div class="modal-body">
                  <div style="display: flex;flex-direction: row; align-content: center;align-items: center;justify-content: center;gap: 39px;">
                    <img src="../common/images/object_not_found.svg" style="height:200px"/>
                    <div style="font-size:110%" >Apparently something went wrong here. Possibly the link is wrong or 
                    completely crazy - I make a mistake. Anyway, I can not load and display the object <b class="textPromptValue" ></b>.</div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="electra-button" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    `)
  }

  /**
   */
  show(text) {
    $("#notFoundDialog .textPromptValue").html(text)
    $("#notFoundDialog").modal("show")
  }
}


let dialog = new Dialog()
export default dialog
