import storageFactory from "./StorageClient"
import reviewClientFactory from "../review/ReviewClient"
import DraftFactSheet from "./DraftFactSheet"
import DraftToolbar from "./DraftToolbar"

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

    let toolbar = new DraftToolbar({
      onNew: () => this.app.fileCreateNew(),
      onFilter: (text) => { this.filter = text; this.renderGrid() },
    })
    $pane.append(toolbar.render())
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
    for (let it of items) {
      $grid.append(new DraftFactSheet(it, {
        onOpen: (item, $sheet) => {
          $sheet.addClass("spinner")
          _this.app.open(item.id).then(() => $sheet.removeClass("spinner"))
        },
        onPromote: (item) => _this.app.promoteById(item.id),
        onDistribute: (item) => _this.app.distributeById(item),
        onRevert: (item) => _this.app.revertById(item.id),
        onDelete: (item) => _this.app.deleteById(item.id),
      }).render())
    }
    $host.empty().append($grid)
  }
}
