import Hogan from "hogan.js"

// scopeTile — a reusable Figma-style tile for one scope/workspace, rendered into
// a container element. Encapsulates the markup, the member-count line, the
// role badges, and the (admin-only) rename pencil so both the Workspaces browser
// and any future scope picker share one look.
//
// Usage:
//   renderScopeTiles($container, items, {
//     onOpen:   (item) => {},   // tile body clicked → drill in
//     onRename: (item) => {},   // pencil clicked (only shown when item.isAdmin)
//     emptyHtml: "<div>…</div>", // shown when items is empty
//   })
//
// Each `item`: { scopeRef, name, isAdmin, isMemberOnly, isPersonal, memberCount }
// `name` is already the display string (label) the caller wants shown.

const TILE_TEMPLATE = `
  {{#items}}
    <div class="scopeTile" data-ref="{{scopeRef}}">
      <div class="scopeTileName">{{name}}</div>
      {{#showRename}}<button class="scopeTileRename" title="{{renameTitle}}" data-ref="{{scopeRef}}">✎</button>{{/showRename}}
      <div class="scopeTileFoot">
        <span class="scopeTileMembers">{{memberLabel}}</span>
        <span class="scopeTileBadges">
          {{#isAdmin}}<span class="scopeBadge scopeBadgeAdmin">{{adminLabel}}</span>{{/isAdmin}}
        </span>
      </div>
    </div>
  {{/items}}
  {{^items}}
    {{{emptyHtml}}}
  {{/items}}
`

let compiled = null
function template() {
  if (!compiled) compiled = Hogan.compile(TILE_TEMPLATE)
  return compiled
}

// Human "N members" line. Uses i18n with an {{count}} placeholder when the
// global t() is available; falls back to a plain English string otherwise.
function memberCountLabel(count) {
  const n = Number.isFinite(count) ? count : 0
  if (typeof t === "function") {
    return t("pane.workspaces.member_count", { count: n })
  }
  return n === 1 ? "1 member" : `${n} members`
}

export function renderScopeTiles($container, items, opts = {}) {
  const label = (key, fallback) => (typeof t === "function" ? t(key) : fallback)
  const view = (items || []).map((it) => ({
    scopeRef: it.scopeRef,
    name: it.name,
    isAdmin: !!it.isAdmin,
    showRename: !!it.isAdmin && typeof opts.onRename === "function",
    memberLabel: memberCountLabel(it.memberCount),
    renameTitle: label("pane.workspaces.rename", "Rename"),
    adminLabel: label("pane.workspaces.role_admin", "admin"),
  }))

  $container.html(template().render({
    items: view,
    emptyHtml: opts.emptyHtml || "",
  }))

  const byRef = (ref) => (items || []).find((v) => String(v.scopeRef) === String(ref))

  $container.find(".scopeTile").off("click").on("click", (e) => {
    // The rename pencil is inside the tile — don't drill in when it's clicked.
    if ($(e.target).closest(".scopeTileRename").length) return
    if (typeof opts.onOpen === "function") {
      opts.onOpen(byRef($(e.currentTarget).data("ref")))
    }
  })

  $container.find(".scopeTileRename").off("click").on("click", (e) => {
    e.stopPropagation()
    if (typeof opts.onRename === "function") {
      opts.onRename(byRef($(e.currentTarget).data("ref")))
    }
  })
}

export default renderScopeTiles
