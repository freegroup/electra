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
    // Admins delete the shared file outright; members raise a deletion review.
    // Same action either way — the label just sets the right expectation.
    let label = it.deleteImmediate ? t("common:button.delete") : t("button.request_delete")
    return [{ label, onClick: (item) => this.opts.onDelete(item) }]
  }
}
