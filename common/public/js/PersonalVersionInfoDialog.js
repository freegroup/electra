// PersonalVersionInfoDialog — read-only modal shown from the editor header when
// the open document is the caller's personal copy (the "/…/Entwurf" marker).
// Explains what a personal version is and how to share it (promote), including
// the review note. Text is per-app via i18n (nav.draft names the drafts pane —
// "Meine Dateien" / "Meine Bauteile"); the scope is substituted in.
//
// Usage:
//   PersonalVersionInfoDialog.show({ scope })   // scope = the workspace path

class PersonalVersionInfoDialog {
  constructor() {
    $("body").append(`
      <div id="personalVersionInfoDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="media-heading personalVersionInfoTitle"></h4>
            </div>
            <div class="modal-body">
              <p class="personalVersionInfoBody"></p>
            </div>
            <div class="modal-footer">
              <button class="electra-button electra-primary personalVersionInfoClose" data-dismiss="modal"></button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  show({ scope } = {}) {
    $("#personalVersionInfoDialog .personalVersionInfoTitle").text(t("common:header.draft_title"))
    // The copy carries <p>/<b> and the scope may contain "/", so render as HTML
    // and turn OFF i18next's value escaping — otherwise "/" comes through as the
    // literal entity "&#x2F;" and the markup shows as text.
    $("#personalVersionInfoDialog .personalVersionInfoBody").html(
      t("common:header.draft_explain", {
        scope: scope || "",
        draft: t("nav.draft"),
        interpolation: { escapeValue: false },
      })
    )
    $("#personalVersionInfoDialog .personalVersionInfoClose").text(t("common:button.close"))
    $("#personalVersionInfoDialog").modal("show")
  }
}

let dialog = new PersonalVersionInfoDialog()
export default dialog
