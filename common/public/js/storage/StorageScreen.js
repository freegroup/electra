import Hogan from "hogan.js"

import storageFactory from "./StorageClient"

// The "Files" pane of the finder: the shared ORIGINALS, without any personal
// overlay. Each path shows the official version:
//   inherit       — the doc as provided by a group (no personal copy exists)
//   personalCopy  — the ORIGINAL beneath the caller's draft (shown, not the copy)
// Purely personal docs (no original) do NOT appear here — they live only in the
// Draft pane.
//
// Opening a row whose path also has a personal draft (personalCopy) asks the
// user: open the private copy or the original? Otherwise the original opens
// directly. Sibling of DraftScreen; no Promote/Revert/Delete here — those act on
// drafts and live in the Draft pane.
export default class StorageScreen {

  constructor(app, conf, permissions) {
    this.app = app
    this.conf = conf
    this.permissions = permissions
    this.storage = storageFactory(conf)
    this.dirty = false // set on save/promote/revert; reloaded lazily on show

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

  // The files tab was opened — reload only if something changed since last view.
  onShow() {
    if (this.dirty) {
      this.dirty = false
      this.loadDocs()
    }
  }

  // Marks the list stale; the actual reload happens lazily the next time the
  // pane is shown.
  refresh() {
    this.dirty = true
  }

  // Force an immediate reload — used for actions triggered elsewhere (e.g. a
  // promote in the Draft pane changes what "Files" shows).
  reload() {
    this.dirty = false
    this.loadDocs()
  }

  render() {
    let $finder = $(".filesFinder")
    $finder.html(`
      <header class="storageHeader">
        <button class="storageNewButton electra-button electra-primary" data-i18n="button.create_file">${t("button.create_file")}</button>
      </header>
      <div class="storageList"></div>
    `)

    $(".filesFinder").off("click", ".storageNewButton").on("click", ".storageNewButton", () => {
      this.app.fileCreateNew()
    })

    this.loadDocs()
  }

  loadDocs() {
    let _this = this
    let $host = $(".filesFinder .storageList")
    $host.addClass("spinner")

    this.storage.files().then((items) => {
      items = items
        // Files = originals: inherited docs, plus the original beneath a draft.
        // Purely personal docs (no original) are Draft-only.
        .filter((it) => it.instanceType === "inherit" || it.instanceType === "personalCopy")
        .filter((it) => it.path && (!_this.conf.fileSuffix || it.path.endsWith(_this.conf.fileSuffix)))
        .map((it) => {
          // personalCopy → show the ORIGINAL (its own handle/provider) and
          // remember a draft exists (conflict on open). inherit → the row itself
          // is the original.
          //
          // Only pin a version for a personalCopy's original: there `original.id`
          // (origin scope) and `original.version` refer to the same scope, so a
          // version-pinned read hits the right place. For inherit, `id` is the
          // operating scope but the version lives in the PROVIDER scope — pinning
          // it would read the wrong version. Leave version null → walk-up
          // resolves the provider correctly.
          let hasDraft = it.instanceType === "personalCopy" && !!it.original
          let orig = hasDraft ? it.original : it
          return {
            id: orig.id,
            title: it.path.replace(_this.conf.fileSuffix, ""),
            providedBy: orig.providedBy,
            version: orig.version,
            // version to actually open with (null for inherit → walk-up)
            openVersion: hasDraft ? orig.version : null,
            hasDraft,
            // the caller's own draft handle, used if they choose "open my copy"
            draftId: hasDraft ? it.id : null,
            thumbnailUrl: orig.thumbnailUrl
          }
        })

      let compiled = Hogan.compile($("#storageListTemplate").html())
      $host.removeClass("spinner").html(compiled.render({ items }))

      // Map original id -> { draftId, openVersion } for rows with a conflict.
      let meta = {}
      items.forEach((it) => { meta[it.id] = { draftId: it.draftId, openVersion: it.openVersion } })

      $host.find(".storageRow").off("click").on("click", (event) => {
        let $el = $(event.currentTarget)
        let originalId = $el.data("id")
        let m = meta[originalId] || {}
        $el.addClass("spinner")
        let done = () => $el.removeClass("spinner")
        if (m.draftId) {
          // A personal draft exists for this path — ask which to open.
          _this.app.openWithConflict({ originalId, version: m.openVersion, draftId: m.draftId }).then(done, done)
        } else {
          _this.app.open(originalId, m.openVersion).then(done, done)
        }
      })
    }).catch((exc) => {
      console.log(exc)
      $host.removeClass("spinner").html(
        `<div class="fileListEmpty" data-i18n="common:message.error">${t("common:message.error")}</div>`)
    })
  }
}
