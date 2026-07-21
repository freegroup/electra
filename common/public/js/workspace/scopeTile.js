import Hogan from "hogan.js"

// scopeTile — a FactSheet-style card for one scope/workspace, rendered into a
// container element. Matches the .factSheet dimensions and structure used by
// Files/Review so all card grids feel like one system.
//
// Usage:
//   renderScopeTiles($container, items, {
//     onOpen:       (item) => {},   // tile body clicked → drill in
//     onAddMember:  (item) => {},   // "Add member" button (admin only)
//     emptyHtml:    "<div>…</div>", // shown when items is empty
//   })
//
// Each `item`:
//   { scopeRef, name, description, isAdmin, isMember, isPersonal, memberCount }

const TILE_TEMPLATE = `
  {{#items}}
    <div class="factSheet scopeCard" data-ref="{{scopeRef}}">
      <div class="factSheetThumb scopeCardPreview">
        {{#description}}
          <p class="scopeCardDescription">{{description}}</p>
        {{/description}}
        {{^description}}
          <p class="scopeCardDescriptionEmpty">{{emptyHint}}</p>
        {{/description}}
      </div>
      <div class="factSheetBody">
        <div class="factSheetTitle scopeCardName">{{name}}</div>
        <div class="factSheetWorkspace scopeCardMeta">{{memberLabel}}</div>
        <div class="factSheetBadges">
          {{#isAdmin}}<span class="factSheetBadge scopeBadge scopeBadgeAdmin">{{adminLabel}}</span>{{/isAdmin}}
        </div>
      </div>
      <div class="factSheetButtonBar{{^showActions}} factSheetButtonBarEmpty{{/showActions}}">
        {{#showActions}}
          <button class="factSheetBtn scopeCardAddMember" data-ref="{{scopeRef}}">{{addMemberLabel}}</button>
        {{/showActions}}
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
    description: it.description || null,
    isAdmin: !!it.isAdmin,
    showActions: !!it.isAdmin && typeof opts.onAddMember === "function",
    memberLabel: memberCountLabel(it.memberCount),
    adminLabel: label("pane.workspaces.role_admin", "admin"),
    addMemberLabel: label("pane.workspaces.add_member", "Add member"),
    emptyHint: label("pane.workspaces.description_empty", ""),
  }))

  $container.html(template().render({
    items: view,
    emptyHtml: opts.emptyHtml || "",
  }))

  const byRef = (ref) => (items || []).find((v) => String(v.scopeRef) === String(ref))

  $container.find(".scopeCard").off("click").on("click", (e) => {
    if ($(e.target).closest(".scopeCardAddMember").length) return
    if (typeof opts.onOpen === "function") {
      opts.onOpen(byRef($(e.currentTarget).data("ref")))
    }
  })

  $container.find(".scopeCardAddMember").off("click").on("click", (e) => {
    e.stopPropagation()
    if (typeof opts.onAddMember === "function") {
      opts.onAddMember(byRef($(e.currentTarget).data("ref")))
    }
  })
}

export default renderScopeTiles
