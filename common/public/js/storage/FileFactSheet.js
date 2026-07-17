// FileFactSheet — a Figma-style card ("fact sheet") for ONE document in a flex
// grid: thumbnail on top, title + workspace below, badges and actions in the
// footer. Subclasses override overlayBadge(), badges(), and actions().
//
// Usage:
//   $grid.append(new SomeFactSheet(item, {
//     onOpen: (item, $sheet) => {},
//     ...subclass-specific action callbacks
//   }).render())
//
// `item`: { id, title, providedBy, version, thumbnailUrl, ... }
export default class FileFactSheet {

  constructor(item, opts = {}) {
    this.item = item
    this.opts = opts
  }

  // -> { cls, text, title? } | null  — small pill overlaid top-right on the thumb.
  overlayBadge() { return null }

  // -> [{ cls, text, title? }]  — pills in the footer.
  badges() { return [] }

  // -> [{ label, primary?, onClick }]  — ghost-button actions in the footer.
  actions() { return [] }

  render() {
    let it = this.item
    let $sheet = $(`
      <div class="factSheet">
        <div class="factSheetThumb">
          <img>
          <span class="factSheetOverlay"></span>
        </div>
        <div class="factSheetBody">
          <div class="factSheetTitle"></div>
          <div class="factSheetWorkspace"></div>
          <div class="factSheetBadges"></div>
        </div>
        <div class="factSheetButtonBar"></div>
      </div>
    `)

    $sheet.attr("data-id", it.id)
    $sheet.find(".factSheetThumb img").attr("src", it.thumbnailUrl)
    $sheet.find(".factSheetTitle").text(it.title).attr("title", it.title)
    $sheet.find(".factSheetWorkspace").text(it.providedBy || "").attr("title", it.providedBy || "")

    // top-right overlay pill (e.g. "in review")
    let overlay = this.overlayBadge()
    if (overlay) {
      $sheet.find(".factSheetOverlay").addClass(overlay.cls).text(overlay.text)
      if (overlay.title) $sheet.find(".factSheetOverlay").attr("title", overlay.title)
    }

    // footer badges (below title/workspace in body)
    let $badges = $sheet.find(".factSheetBadges")
    for (let b of this.badges()) {
      let $b = $(`<span class="factSheetBadge"></span>`).addClass(b.cls).text(b.text)
      if (b.title) $b.attr("title", b.title)
      $badges.append($b)
    }

    // button bar — always pinned to the card bottom
    let $bar = $sheet.find(".factSheetButtonBar")
    let acts = this.actions()
    if (acts.length === 0) $bar.addClass("factSheetButtonBarEmpty")
    for (let a of acts) {
      let $btn = $(`<button class="factSheetBtn"></button>`).text(a.label)
      if (a.primary) $btn.addClass("factSheetBtnPrimary")
      $btn.on("click", (event) => {
        event.stopPropagation()
        a.onClick(it)
      })
      $bar.append($btn)
    }

    $sheet.on("click", () => {
      if (typeof this.opts.onOpen === "function") this.opts.onOpen(it, $sheet)
    })

    return $sheet
  }
}
