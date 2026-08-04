import EditorHeader from "./EditorHeader"

// DefaultEditorHeader — the quiet header shown while editing normally: just the
// current document's filename and version. Updated whenever the open document
// changes (open / new / save). Its review-mode sibling is ReviewEditorHeader.
class DefaultEditorHeader extends EditorHeader {

  // Show / refresh the header for the current file. Pass null to clear it
  // (e.g. the welcome screen with no open document).
  update(currentFile) {
    EditorHeader.clear()
    if (!currentFile || !currentFile.name) return
    let $header = this.buildShell({
      scope: currentFile.scope,
      personal: currentFile.personal,
      name: currentFile.name,
      version: currentFile.version,
      modifier: "editorHeaderDefault",
    })
    $("#editor").prepend($header)
  }
}

let header = new DefaultEditorHeader()
export default header
