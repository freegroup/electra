import Hogan from "hogan.js"

import storageFactory from "./StorageClient"
import FilesFactSheet from "./FilesFactSheet"
import FolderCard from "./FolderCard"

// The "Files" pane of the finder: the shared ORIGINALS, without any personal
// overlay. Each path shows the official version:
//   inherit       — the doc as provided by a group (no personal copy exists)
//   personalCopy  — the ORIGINAL beneath the caller's draft (shown, not the copy)
// Purely personal docs (no original) do NOT appear here — they live only in the
// Draft pane.
//
// The library grows large, so the pane works like a file browser (Finder-style):
//   - BROWSE (no filter): a card grid at the current folder — FolderCard tiles
//     for sub-folders + FilesFactSheet cards for the documents at this level.
//     Folders are VIRTUAL, derived from the document paths ("a/b/c.brain").
//   - SEARCH (filter typed): the grid collapses into a flat list of every match
//     across all folders, each with its full path.
//
// Opening a card/row whose path also has a personal draft (personalCopy) asks
// the user: open the private copy or the original? Otherwise the original opens
// directly.
export default class StorageScreen {

  constructor(app, conf, permissions) {
    this.app = app
    this.conf = conf
    this.permissions = permissions
    this.storage = storageFactory(conf)
    this.dirty = false   // set on save/promote/revert; reloaded lazily on show

    this.files = null    // the loaded originals (flat)
    this.stack = []       // current folder path segments (breadcrumb)
    this.filter = ""      // current search text; non-empty => flat list mode

    // Reload the list only when the files tab is (re)opened AND something
    // changed — not on every save.
    $("#files_tab a").off("click.storage").on("click.storage", this.onShow.bind(this))

    $("body").append(`
      <script id="storageListTemplate" type="text/x-jsrender">
        <table class="storageTable">
          <thead>
            <tr>
              <th class="colName" data-i18n="pane.files.col_name">${t("pane.files.col_name")}</th>
              <th class="colVersion" data-i18n="pane.files.col_version">${t("pane.files.col_version")}</th>
              <th class="colDraft" data-i18n="pane.files.col_draft">${t("pane.files.col_draft")}</th>
              <th class="colProvider" data-i18n="pane.files.col_provider">${t("pane.files.col_provider")}</th>
            </tr>
          </thead>
          <tbody>
          {{#items}}
            <tr class="storageRow" data-id="{{id}}" data-version="{{version}}" data-conflict="{{hasDraft}}">
              <td class="colName">
                <img class="storageThumb" src="{{thumbnailUrl}}">
                <span class="storageTitle">{{title}}</span>
              </td>
              <td class="colVersion">
                <span class="providerVersion">v{{version}}</span>
              </td>
              <td class="colDraft">
                {{#hasDraft}}<span class="providerMine" data-i18n="pane.files.has_draft">${t("pane.files.has_draft")}</span>{{/hasDraft}}
              </td>
              <td class="colProvider">
                <span class="providerScope">{{providedBy}}</span>
              </td>
            </tr>
          {{/items}}
          {{^items}}
            <tr><td colspan="4" class="fileListEmpty" data-i18n="common:message.no_files">${t("common:message.no_files")}</td></tr>
          {{/items}}
          </tbody>
        </table>
      </script>
    `)

    this.render()
  }

  // The pane is being shown — reload now if something changed since last view.
  onShow() {
    if (this.dirty) {
      this.dirty = false
      this.loadDocs()
    }
  }

  // Refresh the list. If the pane is currently visible, reload immediately;
  // otherwise mark it stale so it reloads the next time it's shown.
  reload() {
    if ($("#files").hasClass("active")) {
      this.dirty = false
      this.loadDocs()
    } else {
      this.dirty = true
    }
  }

  render() {
    let _this = this
    let $finder = $(".filesFinder")
    // No "New" button here: the Library shows shared documents only. Creating a
    // new document always lands in the caller's own Drafts.
    $finder.html(`
      <header class="storageHeader">
        <nav class="filesBreadcrumb"></nav>
        <div class="filesFilter">
          <input type="text" class="filesFilterInput" placeholder="${t("pane.files.filter")}">
          <button type="button" class="filesFilterClear" aria-label="clear">×</button>
        </div>
      </header>
      <div class="storageList"></div>
    `)

    let $input = $finder.find(".filesFilterInput")
    let $filter = $finder.find(".filesFilter")
    let apply = (val) => {
      _this.filter = val.trim()
      $filter.toggleClass("hasText", _this.filter.length > 0)
      _this.renderBody()
    }
    $input.off("input").on("input", (event) => apply(event.target.value))
    $finder.find(".filesFilterClear").off("click").on("click", () => {
      $input.val("")
      apply("")
      $input.focus()
    })

    this.loadDocs()
  }

  loadDocs() {
    let _this = this
    let $host = $(".filesFinder .storageList")
    $host.addClass("spinner")

    this.storage.files().then((items) => {
      _this.files = items
        // Files = originals: inherited docs, plus the original beneath a draft.
        // Purely personal docs (no original) are Draft-only.
        .filter((it) => it.instanceType === "inherit" || it.instanceType === "personalCopy")
        .filter((it) => it.path && (!_this.conf.fileSuffix || it.path.endsWith(_this.conf.fileSuffix)))
        .map((it) => {
          // personalCopy → show the ORIGINAL (its own handle/provider) and
          // remember a draft exists (conflict on open). inherit → the row itself
          // is the original. Only pin a version for a personalCopy's original;
          // for inherit leave it null so the walk-up resolves the provider.
          let hasDraft = it.instanceType === "personalCopy" && !!it.original
          let orig = hasDraft ? it.original : it
          return {
            id: orig.id,
            // Full path (minus suffix) — used for the folder tree, search, and
            // the flat-list title. The grid shows only the leaf name.
            title: it.path.replace(_this.conf.fileSuffix, ""),
            providedBy: orig.providedBy,
            version: orig.version,
            openVersion: hasDraft ? orig.version : null,
            hasDraft,
            draftId: hasDraft ? it.id : null,
            thumbnailUrl: orig.thumbnailUrl,
          }
        })
      $host.removeClass("spinner")
      _this.renderBody()
    }).catch((exc) => {
      console.log(exc)
      $host.removeClass("spinner").html(
        `<div class="fileListEmpty" data-i18n="common:message.error">${t("common:message.error")}</div>`)
    })
  }

  // Render the body for the current state: empty note, flat search list, or the
  // folder grid. The header (filter + breadcrumb) is left intact so typing keeps
  // focus. Called on load, on every keystroke, and on every folder navigation.
  renderBody() {
    let $host = $(".filesFinder .storageList")
    if (!this.files) return

    if (this.files.length === 0) {
      $host.html(`<div class="fileListEmpty" data-i18n="pane.files.empty">${t("pane.files.empty")}</div>`)
      $("#files .filesBreadcrumb").empty().hide()
      return
    }

    if (this.filter) this.renderList($host)
    else this.renderGrid($host)
    this.renderBreadcrumb()
  }

  // SEARCH mode: a flat list of every document whose path matches the filter,
  // across all folders, each shown with its full path.
  renderList($host) {
    let _this = this
    let needle = this.filter.toLowerCase()
    let items = this.files
      .filter((it) => it.title.toLowerCase().includes(needle))
      .sort((a, b) => a.title.localeCompare(b.title))

    let compiled = Hogan.compile($("#storageListTemplate").html())
    $host.empty().html(compiled.render({ items }))
    this.wireRows($host, items)
  }

  // BROWSE mode: the card grid at the current folder — sub-folder tiles first,
  // then the documents that live directly at this level.
  renderGrid($host) {
    let _this = this
    let prefix = this.stack.length ? this.stack.join("/") + "/" : ""

    let folderCounts = {}   // sub-folder name -> number of docs beneath it
    let here = []           // docs directly at this level
    for (let f of this.files) {
      if (prefix && !f.title.startsWith(prefix)) continue
      let rest = f.title.slice(prefix.length)
      let slash = rest.indexOf("/")
      if (slash === -1) here.push(f)
      else {
        let folder = rest.slice(0, slash)
        folderCounts[folder] = (folderCounts[folder] || 0) + 1
      }
    }

    let $grid = $(`<div class="factSheetGrid"></div>`)

    // A ".." tile first when inside a folder — climbs one level up.
    if (this.stack.length > 0) {
      $grid.append(new FolderCard({ name: "..", back: true }, {
        onOpen: () => { _this.stack.pop(); _this.renderBody() },
      }).render())
    }

    Object.keys(folderCounts).sort().forEach((name) => {
      $grid.append(new FolderCard({ name, count: folderCounts[name] }, {
        onOpen: (n) => { _this.stack.push(n); _this.renderBody() },
      }).render())
    })

    here.sort((a, b) => a.title.localeCompare(b.title)).forEach((f) => {
      $grid.append(new FilesFactSheet({
        id: f.id,
        title: f.title.slice(prefix.length),   // leaf name at this level
        providedBy: f.providedBy,
        version: f.version,
        thumbnailUrl: f.thumbnailUrl,
        hasDraft: f.hasDraft,
      }, {
        onOpen: () => _this.openFile(f),
      }).render())
    })

    $host.empty().append($grid)
  }

  // The breadcrumb — root + one crumb per folder segment. Hidden while searching
  // (the flat list is not tied to a folder). Ancestors are clickable.
  renderBreadcrumb() {
    let _this = this
    let $bc = $("#files .filesBreadcrumb").empty()
    if (this.filter) { $bc.hide(); return }
    $bc.show()

    let crumbs = [{ name: t("pane.files.root"), index: -1 }]
      .concat(this.stack.map((seg, i) => ({ name: seg, index: i })))

    crumbs.forEach((c, i) => {
      let last = i === crumbs.length - 1
      let $c = last
        ? $(`<span class="filesCrumb filesCrumbCurrent"></span>`).text(c.name)
        : $(`<a class="filesCrumb filesCrumbLink" href="#"></a>`).text(c.name).on("click", (event) => {
            event.preventDefault()
            _this.stack = _this.stack.slice(0, c.index + 1)
            _this.renderBody()
          })
      $bc.append($c)
      if (!last) $bc.append(`<span class="filesCrumbSep">/</span>`)
    })
  }

  // Attach open-on-click to the flat-list rows (search mode).
  wireRows($host, items) {
    let _this = this
    let meta = {}
    items.forEach((it) => { meta[it.id] = it })
    $host.find(".storageRow").off("click").on("click", (event) => {
      let $el = $(event.currentTarget)
      let f = meta[$el.data("id")]
      if (!f) return
      $el.addClass("spinner")
      let done = () => $el.removeClass("spinner")
      _this.openFile(f, done)
    })
  }

  // Open a file — its private draft (ask which) or the shared original.
  openFile(f, done) {
    done = done || (() => {})
    if (f.draftId) {
      this.app.openWithConflict({ originalId: f.id, version: f.openVersion, draftId: f.draftId }).then(done, done)
    } else {
      this.app.open(f.id, f.openVersion).then(done, done)
    }
  }
}
