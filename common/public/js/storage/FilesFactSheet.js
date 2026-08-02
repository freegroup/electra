import FileFactSheet from "./FileFactSheet"

// The Files-pane card: a shared original circuit/document. Reuses the common
// FileFactSheet look (thumbnail + title + workspace) and adds a "has personal
// draft" badge, so the caller can see a private copy exists before opening
// (opening then asks which one to open — see openWithConflict).
export default class FilesFactSheet extends FileFactSheet {

  badges() {
    if (!this.item.hasDraft) return []
    return [{ cls: "factSheetBadgeDraft", text: t("pane.files.has_draft") }]
  }

  actions() {
    let it = this.item
    if (!it.canDelete) return []
    // Always "request deletion": whether it commits at once or opens a review is
    // the owning scope's call, and having a personal copy must not change what
    // the button says (the action targets the shared version by uuid regardless).
    return [{ label: t("button.request_delete"), onClick: (item) => this.opts.onDelete(item) }]
  }
}
