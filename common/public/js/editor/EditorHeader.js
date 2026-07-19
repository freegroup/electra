// EditorHeader — base for the bar shown across the top of the editor.
// Renders the shared filename + version; subclasses add their own content
// (DefaultEditorHeader = just that; ReviewEditorHeader = review controls).
// Only one header is present at a time — showing one removes any other.
export default class EditorHeader {

  // Remove whatever header is currently mounted (and any review styling).
  static clear() {
    $("#editor .editorHeader").remove()
    $("#editor").removeClass("reviewMode")
  }

  // Build the header shell with the filename + version filled in. Subclasses
  // call this, then inject their extra pieces into `.editorHeaderMain` /
  // append below it, and finally prepend the returned element to #editor.
  buildShell({ name, version, modifier }) {
    let $header = $(`
      <div class="editorHeader ${modifier || ""}">
        <div class="editorHeaderMain">
          <span class="editorHeaderName"></span>
          <span class="editorHeaderVersion"></span>
        </div>
      </div>
    `)
    $header.find(".editorHeaderName").text(name || "")
    if (version != null && version !== undefined && version !== "") {
      $header.find(".editorHeaderVersion").text("· v" + Number(version))
    }
    return $header
  }
}
