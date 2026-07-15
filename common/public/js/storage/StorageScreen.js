import Hogan from "hogan.js"

import storageFactory from "./StorageClient"

// The document finder for the scope model. Generic and app-agnostic: it renders
// the uniform items returned by storage.files() and never knows it shows
// circuits. Two-column OSX-Finder layout inside `.filesFinder`:
//
//   ------------------------------------------------  [ + New ]
//   Name                         | Provided by
//   my-circuit                   | electra/apps/brains  v3
//   ...
//
// Each item carries display fields (name/path/providedBy/version) AND an opaque
// `id` used to drive operations. Opening a document hands its id to the app.
//
// Kept in the shape of the old `Files` class (constructor(app, conf, permissions),
// render(), refresh()) so the common Application base can swap it in unchanged.
export default class StorageScreen {

  constructor(app, conf, permissions) {
    this.app = app
    this.conf = conf
    this.permissions = permissions
    this.storage = storageFactory(conf)
    this.dirty = false // set on save/promote/revert; reloaded lazily on show

    // Reload the list only when the finder tab is (re)opened AND something
    // changed — not on every save.
    $("#files_tab a").off("click.storage").on("click.storage", this.onShow.bind(this))

    $("body").append(`
      <script id="storageListTemplate" type="text/x-jsrender">
        <table class="storageTable">
          <thead>
            <tr>
              <th class="colName" data-i18n="pane.files.col_name">${t("pane.files.col_name")}</th>
              <th class="colProvider" data-i18n="pane.files.col_provider">${t("pane.files.col_provider")}</th>
              <th class="colActions" data-i18n="pane.files.col_actions">${t("pane.files.col_actions")}</th>
            </tr>
          </thead>
          <tbody>
          {{#items}}
            <tr class="storageRow" data-id="{{id}}">
              <td class="colName">
                <img class="storageThumb" src="{{thumbnailUrl}}">
                <span class="storageTitle">{{title}}</span>
              </td>
              <td class="colProvider">
                <span class="providerScope">{{providedBy}}</span>
                <span class="providerVersion">v{{version}}</span>
                {{#isPersonal}}<span class="providerMine" data-i18n="pane.files.personal">${t("pane.files.personal")}</span>{{/isPersonal}}
                {{#isPersonalCopy}}<span class="providerMine" data-i18n="pane.files.my_copy">${t("pane.files.my_copy")}</span>{{/isPersonalCopy}}
              </td>
              <td class="colActions">
                {{#canRevert}}
                  <button class="electra-button storageRevertButton" data-id="{{id}}" data-i18n="button.revert">${t("button.revert")}</button>
                {{/canRevert}}
                {{#canDelete}}
                  <button class="electra-button storageDeleteButton" data-id="{{id}}" data-i18n="common:button.delete">${t("common:button.delete")}</button>
                {{/canDelete}}
                {{#canPromote}}
                  <button class="electra-button electra-primary storagePromoteButton" data-id="{{id}}" data-i18n="button.promote">${t("button.promote")}</button>
                {{/canPromote}}
              </td>
            </tr>
          {{/items}}
          {{^items}}
            <tr><td colspan="3" class="fileListEmpty" data-i18n="common:message.no_files">${t("common:message.no_files")}</td></tr>
          {{/items}}
          </tbody>
        </table>
      </script>
    `)

    this.render(conf, permissions)
  }

  // The finder tab was opened — reload only if something changed since last view.
  onShow() {
    if (this.dirty) {
      this.dirty = false
      this.loadDocs()
    }
  }

  // Called by the app after a save/promote/revert. Marks the list stale; the
  // actual reload happens lazily the next time the finder is shown.
  refresh() {
    this.dirty = true
  }

  // Force an immediate reload — used for actions triggered from within the
  // finder itself (row buttons), where the user is looking at the list now.
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
        .filter((it) => it.path && (!_this.conf.fileSuffix || it.path.endsWith(_this.conf.fileSuffix)))
        .map((it) => ({
          id: it.id,
          title: it.path.replace(_this.conf.fileSuffix, ""),
          providedBy: it.providedBy,
          version: it.version,
          // instanceType: "personal" | "personalCopy" | "inherit"
          isPersonal: it.instanceType === "personal",
          isPersonalCopy: it.instanceType === "personalCopy",
          // Revert only makes sense when a shared version exists to fall back
          // to; a purely personal doc has nothing to revert to — delete instead.
          canRevert: it.instanceType === "personalCopy",
          canDelete: it.instanceType === "personal",
          // Promote any of my own leaf versions (personal or personal copy).
          canPromote: it.instanceType === "personal" || it.instanceType === "personalCopy",
          thumbnailUrl: it.thumbnailUrl
        }))

      let compiled = Hogan.compile($("#storageListTemplate").html())
      $host.removeClass("spinner").html(compiled.render({ items }))

      $host.find(".storageRow").off("click").on("click", (event) => {
        let $el = $(event.currentTarget)
        let id = $el.data("id")
        $el.addClass("spinner")
        _this.app.open(id).then(() => $el.removeClass("spinner"))
      })

      // Action buttons must not also open the document.
      $host.find(".storagePromoteButton").off("click").on("click", (event) => {
        event.stopPropagation()
        _this.app.promoteById($(event.currentTarget).data("id"))
      })
      $host.find(".storageRevertButton").off("click").on("click", (event) => {
        event.stopPropagation()
        _this.app.revertById($(event.currentTarget).data("id"))
      })
      $host.find(".storageDeleteButton").off("click").on("click", (event) => {
        event.stopPropagation()
        _this.app.deleteById($(event.currentTarget).data("id"))
      })
    }).catch((exc) => {
      console.log(exc)
      $host.removeClass("spinner").html(
        `<div class="fileListEmpty" data-i18n="common:message.error">${t("common:message.error")}</div>`)
    })
  }
}
