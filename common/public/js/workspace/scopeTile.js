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
        <div class="factSheetWorkspace scopeCardMeta">
          {{#hasMembers}}
            <span class="wsAvatarStack" title="{{memberLabel}}" aria-label="{{memberLabel}}">
              {{#dots}}<span class="wsAvatarDot {{cls}}">{{{icon}}}</span>{{/dots}}
              {{#hasOverflow}}<span class="wsAvatarMore">{{overflowLabel}}</span>{{/hasOverflow}}
            </span>
          {{/hasMembers}}
        </div>
        <div class="factSheetBadges">
          {{#isAdmin}}<span class="factSheetBadge scopeBadge scopeBadgeAdmin">{{adminLabel}}</span>{{/isAdmin}}
        </div>
      </div>
      <div class="factSheetButtonBar">
        {{#showAddMember}}
          <button class="ghostButton scopeCardAddMember" data-ref="{{scopeRef}}">{{addMemberLabel}}</button>
        {{/showAddMember}}
        {{#showFiles}}
          <button class="ghostButton scopeCardFiles" data-ref="{{scopeRef}}">{{filesLabel}}</button>
        {{/showFiles}}
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

// Presence dots — how many people are in this workspace, without saying who.
// The roster endpoint stays admin-only (routes/scopes.js), so the card carries
// no identity at all: the stack is a density signal that the eye reads before
// the text would have been read, nothing more. The count still reaches screen
// readers and the tooltip through the unchanged member label.
const MAX_DOTS = 4
const DOT_VARIANTS = 6

// Lucide "user" (https://lucide.dev, ISC - see THIRD-PARTY-NOTICES.md), same
// vendoring approach as activityIcons.js: an inline string, stroked in
// currentColor so the colour comes from CSS. Kept local rather than imported
// from the activity feed - if a third place needs Lucide glyphs, that is the
// moment to lift PATHS/svg() into a shared module.
const USER_ICON =
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
  `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
  `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>` +
  `</svg>`

// Colour index for one dot. Seeded by the scope so a workspace keeps its
// colours across reloads instead of reshuffling on every render.
function dotVariant(seed, index) {
  const s = `${seed}:${index}`
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return (Math.abs(h) % DOT_VARIANTS) + 1
}

function memberDots(count, seed) {
  const n = Number.isFinite(count) && count > 0 ? count : 0
  const shown = Math.min(n, MAX_DOTS)
  return {
    hasMembers: n > 0,
    dots: Array.from({ length: shown }, (_, i) => ({
      cls: `wsAvatarDot${dotVariant(seed, i)}`,
      icon: USER_ICON,
    })),
    hasOverflow: n > MAX_DOTS,
    overflowLabel: `+${n - MAX_DOTS}`,
  }
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
    showAddMember: !!it.isAdmin && typeof opts.onAddMember === "function",
    showFiles: typeof opts.onFiles === "function",
    memberLabel: memberCountLabel(it.memberCount),
    ...memberDots(it.memberCount, it.scopeRef),
    adminLabel: label("pane.workspaces.role_admin", "admin"),
    addMemberLabel: label("pane.workspaces.add_member", "Add member"),
    filesLabel: label("nav.files", "Files"),
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

  $container.find(".scopeCardFiles").off("click").on("click", (e) => {
    e.stopPropagation()
    if (typeof opts.onFiles === "function") {
      opts.onFiles(byRef($(e.currentTarget).data("ref")))
    }
  })
}

export default renderScopeTiles
