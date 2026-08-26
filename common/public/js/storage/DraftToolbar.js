import uploadDialog from "./UploadDialog"

// DraftToolbar — the "My Files" pane toolbar: a search box on the left and the
// "New" button on the right, laid out with flex. Self-contained so the pane only
// wires callbacks.
//
// opts:
//   newLabel  — label for the New button (defaults to button.create_file)
//   onNew()   — the New button was clicked
//   onFilter(text) — the search text changed (already trimmed)
//   onImport(file) — a backup file was picked (optional; no button without it)
export default class DraftToolbar {

  constructor(opts = {}) {
    this.opts = opts
  }

  render() {
    let $bar = $(`
      <header class="finderToolbar">
        <div class="finderToolbarMain">
          <div class="draftToolbarFilter">
            <input type="text" class="draftToolbarInput" placeholder="${t("pane.files.filter")}">
            <button type="button" class="draftToolbarClear" aria-label="clear">×</button>
          </div>
        </div>
        <div class="finderToolbarActions">
          ${this.opts.onBackup ? `
          <button class="draftToolbarBackup electra-button" disabled>${t("common:button.backup")}</button>` : ""}
          ${this.opts.onImport ? `
          <button class="draftToolbarImport electra-button" data-i18n="common:button.import">${t("common:button.import")}</button>` : ""}
          <button class="draftToolbarNew electra-button electra-primary" data-i18n="button.create_file">${this.opts.newLabel || t("button.create_file")}</button>
        </div>
      </header>
    `)

    let $input = $bar.find(".draftToolbarInput")
    let $filter = $bar.find(".draftToolbarFilter")
    let apply = (val) => {
      let text = (val || "").trim()
      $filter.toggleClass("hasText", text.length > 0)
      this.opts.onFilter?.(text)
    }

    $input.on("input", (event) => apply(event.target.value))
    $bar.find(".draftToolbarClear").on("click", () => {
      $input.val("")
      apply("")
      $input.focus()
    })
    $bar.find(".draftToolbarNew").on("click", () => this.opts.onNew?.())
    this.$backup = $bar.find(".draftToolbarBackup")
    this.$backup.on("click", () => this.opts.onBackup?.())

    // The picker and the drop zone live in UploadDialog - the toolbar only opens
    // it. A rejected promise just means the user closed the dialog.
    $bar.find(".draftToolbarImport").on("click", () => {
      uploadDialog.show()
        .then((file) => this.opts.onImport?.(file))
        .catch(() => {})
    })

    return $bar
  }

  // Backup acts on the picked documents, so it stays dead until there is a
  // pick; the count in the label says what would be written.
  setSelectionCount(count) {
    if (!this.$backup) return
    this.$backup.prop("disabled", count === 0)
      .text(count === 0 ? t("common:button.backup") : `${t("common:button.backup")} (${count})`)
  }
}
