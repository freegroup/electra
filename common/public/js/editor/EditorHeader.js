// EditorHeader — base for the bar shown across the top of the editor.
// Renders the shared filename + version; subclasses add their own content
// (DefaultEditorHeader = just that; ReviewEditorHeader = review controls).
// Only one header is present at a time — showing one removes any other.
import personalVersionInfoDialog from "../PersonalVersionInfoDialog"

export default class EditorHeader {

  // Remove whatever header is currently mounted (and any review styling).
  static clear() {
    $("#editor .editorHeader").remove()
    $("#editor").removeClass("reviewMode")
  }

  // Build the header shell: a display-only scope line (labelled "Workspace" for
  // the user) above the file line (name · version). The scope tells the author
  // which workspace this document lives in — the same scope its components
  // resolve against — and is read-only here; it changes only through
  // save/promote/distribute. `personal` marks the caller's own copy. The scope
  // row is dropped when there is no scope yet (a brand-new, unsaved document).
  buildShell({ scope, personal, name, version, modifier }) {
    let asPath = (s) => (s ? (s.startsWith("/") ? s : "/" + s) : "")
    let $header = $(`
      <div class="editorHeader ${modifier || ""}">
        <div class="editorHeaderScopeRow">
          <span class="editorHeaderLabel">${t("common:header.workspace")}</span>
          <span class="editorHeaderScope"></span>
        </div>
        <div class="editorHeaderMain">
          <span class="editorHeaderLabel">${t("common:header.file")}</span>
          <span class="editorHeaderName"></span>
          <span class="editorHeaderVersion"></span>
          <a class="editorHeaderDraftLink" href="#">${t("common:header.draft")}</a>
        </div>
      </div>
    `)
    if (scope) {
      $header.find(".editorHeaderScope").text(asPath(scope)).attr("title", asPath(scope))
    } else {
      $header.find(".editorHeaderScopeRow").hide()
    }
    if (personal) {
      // Personal copy: show DRAFT link instead of version number.
      $header.find(".editorHeaderVersion").hide()
      $header.find(".editorHeaderDraftLink").on("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        personalVersionInfoDialog.show({ scope })
      })
    } else {
      $header.find(".editorHeaderDraftLink").hide()
      if (version != null && version !== undefined && version !== "") {
        $header.find(".editorHeaderVersion").text("· v" + Number(version))
      }
    }
    $header.find(".editorHeaderName").text(asPath(name)).attr("title", asPath(name))
    return $header
  }
}
