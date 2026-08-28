// FolderCard — a compact tile for a virtual folder in the Files grid: a folder
// icon, the folder's name, and how many documents it holds. Clicking descends
// into the folder. Sits in the same .factSheetGrid as the FileFactSheet cards.
//
// The folders are virtual — derived from the document paths, not a real scope.
//
//   $grid.append(new FolderCard({ name, count }, { onOpen: (name) => {} }).render())
export default class FolderCard {

  constructor(item, opts = {}) {
    this.item = item   // { name, count }
    this.opts = opts   // { onOpen(name) }
  }

  render() {
    let it = this.item
    // `back` renders the ".." tile that climbs one level up (Finder-style),
    // with the back-folder icon and no document count.
    let icon = it.back ? "files_folder_back.svg" : "files_folder.svg"
    let $card = $(`
      <div class="folderCard">
        <img class="folderCardIcon" src="../common/images/${icon}">
        <div class="folderCardBody">
          <div class="folderCardName"></div>
          <div class="folderCardCount"></div>
        </div>
      </div>
    `)
    if (it.back) $card.addClass("folderCardBack")
    $card.find(".folderCardName").text(it.name).attr("title", it.name)
    if (it.count != null) $card.find(".folderCardCount").text(t("pane.files.count", { n: it.count }))
    $card.on("click", () => {
      if (typeof this.opts.onOpen === "function") this.opts.onOpen(it.name)
    })
    return $card
  }
}
