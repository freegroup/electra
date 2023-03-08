class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    $("body").append(`
            <div id="coffeeDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
              <div class="modal-content">
                <div class="modal-body">
                  <div style="display: flex;flex-direction: row; align-content: center;align-items: center;justify-content: center;gap: 39px;">
                    <img src="../common/images/app_coffee.svg" style="height:200px"/>
                    <div style="font-size:110%" >
                    <h1 data-i18n="[html]common:message.coffee_1">If you enjoy my work</h1>
                    <h1 data-i18n="[html]common:message.coffee_2">Please consider buying me a coffee</h1>
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
  show() {
    $("#coffeeDialog").modal("show")
  }
}


let dialog = new Dialog()
export default dialog
