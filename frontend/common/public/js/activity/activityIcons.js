// Category + icon mapping for the activity feed. Maps each notification
// eventType to a semantic category (drives the badge colour via a .cat-<key>
// CSS class) and a Lucide icon. The glyphs live in the shared icons module.
import { icon as svg } from "../icons"

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
