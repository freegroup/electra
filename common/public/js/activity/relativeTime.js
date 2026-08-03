// Relative time for the activity feed: "gerade eben" / "vor 5 Min" / "vor 3 Std"
// / "vor 2 Tagen", falling back to an absolute local date once something is more
// than ~6 days old (a "vor 3 Wochen" is less useful there than the actual date).
//
// Localisation comes from Intl.RelativeTimeFormat, keyed off the active i18next
// language, so there are no DE/EN strings to hand-maintain. i18next is a global
// in these apps (see AuthorPage.js); fall back to the browser locale if absent.

const STEPS = [
  { limit: 60,        div: 1,     unit: "second" },
  { limit: 3600,      div: 60,    unit: "minute" },
  { limit: 86400,     div: 3600,  unit: "hour" },
  { limit: 7 * 86400, div: 86400, unit: "day" },
]

function locale() {
  return (typeof i18next !== "undefined" && i18next.language) || undefined
}

// iso: ISO timestamp string. Returns a localised relative string, or "" if the
// input is unparseable.
export function relativeTime(iso) {
  if (!iso) return ""
  let then = new Date(iso).getTime()
  if (isNaN(then)) return ""

  let diffSec = (Date.now() - then) / 1000
  // Clock skew / "just now": treat anything under a minute as just now.
  if (diffSec < 60) {
    let rtf = new Intl.RelativeTimeFormat(locale(), { numeric: "auto" })
    return rtf.format(0, "second") // "jetzt" / "now"
  }

  // Older than the last step -> absolute local date, no relative label.
  if (diffSec >= STEPS[STEPS.length - 1].limit) {
    return new Date(then).toLocaleDateString(locale())
  }

  let rtf = new Intl.RelativeTimeFormat(locale(), { numeric: "always" })
  for (let step of STEPS) {
    if (diffSec < step.limit) {
      let value = -Math.floor(diffSec / step.div)
      return rtf.format(value, step.unit)
    }
  }
  return ""
}
