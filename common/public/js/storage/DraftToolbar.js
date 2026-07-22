// DraftToolbar — the "My Files" pane toolbar: a search box on the left and the
// "New" button on the right, laid out with flex. Self-contained so the pane only
// wires callbacks.
//
// opts:
//   newLabel  — label for the New button (defaults to button.create_file)
//   onNew()   — the New button was clicked
//   onFilter(text) — the search text changed (already trimmed)
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

    return $bar
  }
}
