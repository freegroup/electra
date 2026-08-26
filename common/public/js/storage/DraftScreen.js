import storageFactory from "./StorageClient"
import reviewClientFactory from "../review/ReviewClient"
import DraftFactSheet from "./DraftFactSheet"
import DraftToolbar from "./DraftToolbar"
import toast from "../toast"

// The "Draft" pane of the finder: the documents the caller currently has in
// their OWN personal leaf — instanceType "personal" (a doc only they have) or
// "personalCopy" (their edit shadowing a shared original). This is where
// Promote makes sense ("make my draft the official version"), alongside Revert
// (drop the copy, fall back to the original) and Delete (throw away a purely
// personal doc).
//
// Sibling of StorageScreen (the "Files"/originals pane). Both render the uniform
// items from storage.files() but filter and act differently; kept as two plain
// classes rather than one branch-heavy screen. Opening a draft row always loads
// the caller's own version directly (no conflict — this IS the personal copy).
export default class DraftScreen {

  constructor(app, conf) {
    this.app = app
    this.conf = conf
    this.storage = storageFactory(conf)
    this.review = reviewClientFactory()
    this.dirty = false // set on save/promote/revert; reloaded lazily on show
    this.items = []    // loaded draft cards (pre-filter)
    this.filter = ""   // current search text; filters by document path/name
    this.selection = new Set() // ids picked for backup
    this.lastPicked = null     // anchor for shift-click ranges

    // Reload the list whenever the draft tab becomes visible AND something
    // changed — by user click OR a programmatic navigate() (.tab('show')).
    // shown.bs.tab covers both; a plain click handler misses deep-link nav.
    $("#draft_tab a").off("shown.bs.tab.draft").on("shown.bs.tab.draft", this.onShow.bind(this))

    this.render()
  }

  // The draft tab just became visible — reload if something changed since the
  // last view (e.g. a document was created/promoted/reverted meanwhile).
  onShow() {
    if (this.dirty) {
      this.dirty = false
      this.loadDocs()
    }
  }

  // Refresh the list. If the pane is currently visible, reload immediately;
  // otherwise just mark it stale so it reloads the next time it's shown (via
  // onShow). One entry point for both "the user is looking now" (row actions)
  // and "something changed in the background" (save/promote/revert elsewhere).
  reload() {
    if ($("#draft").hasClass("active")) {
      this.dirty = false
      this.loadDocs()
    } else {
      this.dirty = true
    }
  }

  render() {
    let $pane = $("#draft .draftFinder").addClass("finderCard").empty()

    this.toolbar = new DraftToolbar({
      onNew: () => this.app.fileCreateNew(),
      // Filtering hides cards; keeping them selected would back up documents
      // the user can no longer see.
      onFilter: (text) => { this.filter = text; this.selection.clear(); this.renderGrid() },
      onBackup: () => this.backupSelection(),
      onImport: (file) => this.importPackage(file),
    })
    $pane.append(this.toolbar.render())
    $pane.append(`<div class="storageList"></div>`)

    this.loadDocs()
  }

  loadDocs() {
    let _this = this
    let $host = $("#draft .draftFinder .storageList")
    $host.addClass("spinner")

    // The review status comes from the caller's own open promotions (author
    // view) and is matched onto the draft rows by document path. Best-effort:
    // a failing review lookup must not break the Draft pane.
    let mineP = this.review.mine().catch(() => [])

    Promise.all([this.storage.files(), mineP]).then(([items, mine]) => {
      let reviewByPath = new Map(mine.map((m) => [m.path, m]))
      items = items
        // Draft = documents living in the caller's own leaf.
        .filter((it) => it.instanceType === "personal" || it.instanceType === "personalCopy")
        .filter((it) => it.path && (!_this.conf.fileSuffix || it.path.endsWith(_this.conf.fileSuffix)))
        .map((it) => ({
          id: it.id,
          title: it.path.replace(_this.conf.fileSuffix, ""),
          providedBy: it.providedBy,
          version: it.version,
          author: it.author,
          isPersonal: it.instanceType === "personal",
          isPersonalCopy: it.instanceType === "personalCopy",
          // Revert only makes sense when an original exists to fall back to; a
          // purely personal doc has nothing to revert to — delete instead.
          canRevert: it.instanceType === "personalCopy",
          canDelete: it.instanceType === "personal",
          // A personal copy always promotes — it lands on the shared scope above
          // (e.g. apps), becoming the group's version, even if that scope is a
          // promote ceiling (the ceiling only stops content rising ABOVE it, not
          // landing ON it). A purely private doc promotes only when its scope
          // isn't a ceiling: in the personal workspace there is nobody to share
          // with, so it is distribute-only.
          canPromote: it.instanceType === "personalCopy"
            || (it.instanceType === "personal" && !it.promoteCeiling),
          // Distribute (horizontal) is available for every draft — it is the
          // caller's own leaf version and can be shared into any scope they are
          // a member of. Unlike promote it is not gated by the ceiling.
          canDistribute: true,
          thumbnailUrl: it.thumbnailUrl,
          // Promote already sent, approval still open → show the progress.
          inReview: reviewByPath.has(it.path),
          reviewHave: reviewByPath.get(it.path)?.approvedScore,
          reviewNeed: reviewByPath.get(it.path)?.requiredScore,
          reviewDescription: reviewByPath.get(it.path)?.description || "",
        }))

      _this.items = items
      // A reload can drop documents; a stale selection would point at nothing.
      _this.selection.clear()
      _this.lastPicked = null
      $host.removeClass("spinner")
      _this.renderGrid()
    }).catch((exc) => {
      console.log(exc)
      $host.removeClass("spinner").html(
        `<div class="fileListEmpty" data-i18n="common:message.error">${t("common:message.error")}</div>`)
    })
  }

  // Render the cards for the current filter. Called after a load and on every
  // keystroke in the toolbar search — no refetch, just re-filter this.items.
  renderGrid() {
    let _this = this
    let $host = $("#draft .draftFinder .storageList")
    let needle = this.filter.toLowerCase()
    let items = needle
      ? this.items.filter((it) => it.title.toLowerCase().includes(needle))
      : this.items

    let $grid = $(`<div class="factSheetGrid"></div>`)
    if (items.length === 0) {
      $grid.append(`<div class="fileListEmpty" data-i18n="common:message.no_files">${t("common:message.no_files")}</div>`)
    }
    // The visible order is what shift-click ranges are measured against.
    this.visibleIds = items.map((it) => it.id)

    for (let it of items) {
      let $card = new DraftFactSheet(it, {
        onOpen: (item, $sheet) => {
          $sheet.addClass("spinner")
          _this.app.openDoc(item.id).then(() => $sheet.removeClass("spinner"))
        },
        onSelect: (item, mod) => _this.onSelect(item, mod),
        onPromote: (item) => _this.app.promoteById(item.id),
        onDistribute: (item) => _this.app.distributeById(item),
        onRevert: (item) => _this.app.revertById(item.id),
        onDelete: (item) => _this.app.deleteById(item.id),
      }).render()
      if (this.selection.has(it.id)) $card.addClass("selected")
      $grid.append($card)
    }
    $host.empty().append($grid)
    this.syncSelection()
  }

  // Drive-style picking: plain click keeps one, Cmd/Ctrl toggles a single card,
  // Shift takes the range from the last pick.
  onSelect(item, { meta, shift }) {
    if (shift && this.lastPicked) {
      let from = this.visibleIds.indexOf(this.lastPicked)
      let to = this.visibleIds.indexOf(item.id)
      if (from >= 0 && to >= 0) {
        let [lo, hi] = from < to ? [from, to] : [to, from]
        this.visibleIds.slice(lo, hi + 1).forEach((id) => this.selection.add(id))
      }
    } else if (meta) {
      if (this.selection.has(item.id)) this.selection.delete(item.id)
      else this.selection.add(item.id)
      this.lastPicked = item.id
    } else {
      // Plain click on the only selected card clears it - otherwise there would
      // be no way back to "nothing selected" without the bar.
      let onlyThis = this.selection.size === 1 && this.selection.has(item.id)
      this.selection = new Set(onlyThis ? [] : [item.id])
      this.lastPicked = onlyThis ? null : item.id
    }
    this.syncSelection()
  }

  clearSelection() {
    this.selection.clear()
    this.lastPicked = null
    this.syncSelection()
  }

  // Reflect the selection without re-rendering the grid - a rebuild would lose
  // scroll position and flicker on every click.
  syncSelection() {
    let $grid = $("#draft .draftFinder .factSheetGrid")
    $grid.find(".factSheet").each((_i, el) => {
      $(el).toggleClass("selected", this.selection.has($(el).attr("data-id")))
    })
    // The Backup button lives in the toolbar next to "New" and simply switches
    // on once something is picked - no extra selection bar to appear and shift
    // the grid down.
    this.toolbar?.setSelectionCount(this.selection.size)
  }

  // --- backup / import ------------------------------------------------------
  //
  // Both directions are the server's job: it assembles and compresses the
  // package, and it unpacks and writes it back. This screen only moves bytes and
  // never parses the format - so the format can change without touching here.

  backupSelection() {
    if (!this.app.requireLogin()) return Promise.resolve()
    let $host = $("#draft .draftFinder .storageList").addClass("spinner")
    return this.storage.backupFiles([...this.selection])
      .then(({ blob, filename }) => {
        this.download(filename, blob)
        this.clearSelection()
      })
      .catch((err) => {
        console.log(err)
        toast(t("common:message.backup_failed"))
      })
      .finally(() => $host.removeClass("spinner"))
  }

  download(filename, blob) {
    let url = URL.createObjectURL(blob)
    let a = Object.assign(document.createElement("a"), { href: url, download: filename })
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  importPackage(file) {
    if (!this.app.requireLogin()) return Promise.resolve()
    let $host = $("#draft .draftFinder .storageList").addClass("spinner")
    return this.storage.importPackage(file)
      .then(({ imported }) => {
        toast(t("common:message.import_done", { count: imported }))
        this.reload()
      })
      .catch((err) => {
        console.log(err)
        toast(t("common:message.import_failed"))
      })
      .finally(() => $host.removeClass("spinner"))
  }
}
