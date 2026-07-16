import Hogan from "hogan.js"

import storageFactory from "./StorageClient"

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
    this.dirty = false // set on save/promote/revert; reloaded lazily on show

    // Reload the list only when the draft tab is (re)opened AND something
    // changed — not on every save.
    $("#draft_tab a").off("click.draft").on("click.draft", this.onShow.bind(this))

    $("body").append(`
      <script id="draftListTemplate" type="text/x-jsrender">
        <table class="storageTable">
          <thead>
            <tr>
              <th class="colName" data-i18n="pane.draft.col_name">${t("pane.draft.col_name")}</th>
              <th class="colProvider" data-i18n="pane.draft.col_provider">${t("pane.draft.col_provider")}</th>
              <th class="colKind" data-i18n="pane.draft.col_kind">${t("pane.draft.col_kind")}</th>
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
              </td>
              <td class="colKind">
                {{#isPersonal}}<span class="kindBadge kindPersonal" data-i18n="pane.draft.kind_personal">${t("pane.draft.kind_personal")}</span>{{/isPersonal}}
                {{#isPersonalCopy}}<span class="kindBadge kindPersonalCopy" data-i18n="pane.draft.kind_personal_copy">${t("pane.draft.kind_personal_copy")}</span>{{/isPersonalCopy}}
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
            <tr><td colspan="4" class="fileListEmpty" data-i18n="common:message.no_files">${t("common:message.no_files")}</td></tr>
          {{/items}}
          </tbody>
        </table>
      </script>
    `)

    this.render()
  }

  // The pane is being shown — reload now if something changed since last view.
  // Called from the tab click, where the pane is about to become active, so it
  // loads directly (the .active class isn't set yet at click time).
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
    let $pane = $("#draft .draftFinder")
    $pane.html(`
      <header class="storageHeader">
        <button class="storageNewButton electra-button electra-primary" data-i18n="button.create_file">${t("button.create_file")}</button>
      </header>
      <div class="storageList"></div>
    `)

    $pane.off("click", ".storageNewButton").on("click", ".storageNewButton", () => {
      this.app.fileCreateNew()
    })

    this.loadDocs()
  }

  loadDocs() {
    let _this = this
    let $host = $("#draft .draftFinder .storageList")
    $host.addClass("spinner")

    this.storage.files().then((items) => {
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
          thumbnailUrl: it.thumbnailUrl
        }))

      let compiled = Hogan.compile($("#draftListTemplate").html())
      $host.removeClass("spinner").html(compiled.render({ items }))

      // A draft row always opens the caller's own version directly.
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
