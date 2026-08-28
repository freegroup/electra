// InfoDialog — read-only modal: optional intro banner + body text.
// Body may be long; genericDialog .modal-body handles scrolling.
//
// Usage:
//   InfoDialog.show({ title, intro, body })
//   InfoDialog.show({ title, body })          // intro optional

class ReviewInfoDialog {
  constructor() {
    $("body").append(`
      <div id="infoDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="media-heading infoDialogTitle"></h4>
            </div>
            <div class="modal-body">
              <p class="infoDialogIntro"></p>
              <p class="infoDialogBody"></p>
            </div>
            <div class="modal-footer">
              <button class="electra-button electra-primary infoDialogClose" data-dismiss="modal"></button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  show({ title, intro, body }) {
    $("#infoDialog .infoDialogTitle").text(title || "")
    const $intro = $("#infoDialog .infoDialogIntro")
    if (intro) { $intro.text(intro).show() } else { $intro.hide() }
    $("#infoDialog .infoDialogBody").text(body || "")
    const closeLabel = (typeof t === "function") ? t("common:button.close") : "Close"
    $("#infoDialog .infoDialogClose").text(closeLabel)
    $("#infoDialog").modal("show")
  }
}

let dialog = new ReviewInfoDialog()
export default dialog
