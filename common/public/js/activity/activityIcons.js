// Category + icon mapping for the activity feed. Maps each notification
// eventType to a semantic category (drives the badge colour via a .cat-<key>
// CSS class) and a Lucide icon.
//
// Icons are inline SVG strings from Lucide (https://lucide.dev), ISC licence -
// vendored as strings so there is no icon font, no CDN and no build step. Each
// path uses stroke="currentColor" / fill="none", so the badge colour set in CSS
// flows straight through (light/dark handled by the tokens in theme_light.less).
// See THIRD-PARTY-NOTICES.md.

// 24x24, stroke-based - the wrapper below adds the shared svg attributes.
const PATHS = {
  check:      `<path d="M20 6 9 17l-5-5"/>`,
  clock:      `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  x:          `<path d="M18 6 6 18"/><path d="M6 6l12 12"/>`,
  trash:      `<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
  undo:       `<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>`,
  userPlus:   `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>`,
  bell:       `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
}

function svg(pathKey) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
         `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
         PATHS[pathKey] + `</svg>`
}

// eventType -> category. Keys mirror the pane.activity.event.* i18n keys.
const CATEGORY = {
  // positive / went live
  committed:          { key: "success", icon: "check" },
  i_approved:         { key: "success", icon: "check" },
  i_accepted:         { key: "success", icon: "check" },
  // pending / awaiting a decision
  review_requested:   { key: "pending", icon: "clock" },
  i_submitted:        { key: "pending", icon: "clock" },
  delete_requested:   { key: "pending", icon: "clock" },
  i_delete_requested: { key: "pending", icon: "clock" },
  // negative
  rejected:           { key: "danger",  icon: "x" },
  i_rejected:         { key: "danger",  icon: "x" },
  deleted:            { key: "danger",  icon: "trash" },
  // neutral (a request taken back)
  i_withdrew:         { key: "neutral", icon: "undo" },
  withdrawn:          { key: "neutral", icon: "undo" },
  // informational
  member_added:       { key: "info",    icon: "userPlus" },
}

const FALLBACK = { key: "neutral", icon: "bell" }

// Returns { key, svg } for an eventType. key -> CSS class .cat-<key>, svg -> markup.
export function categoryFor(eventType) {
  let cat = CATEGORY[eventType] || FALLBACK
  return { key: cat.key, svg: svg(cat.icon) }
}
