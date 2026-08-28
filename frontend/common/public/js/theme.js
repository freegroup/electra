// The chosen look - "classic" or "modern".
//
// A theme is a `data-theme` attribute on <html>. The tokens of the classic look
// live on :root, a theme overrides them from html[data-theme="…"], and an
// attribute selector on the same element outranks :root - so the switch is one
// attribute and needs no import order, no class juggling and no !important.
//
// Classic owns :root and therefore has no attribute value: switching to it means
// REMOVING the attribute. That is deliberate - it makes the look the app has
// always had the state everything falls back into when anything goes wrong.
//
// This module has no dependencies, not jQuery and not i18next. It also runs on
// the static content pages, where neither exists.
//
// Note it does not apply the stored theme on load. That would be far too late:
// the bundle arrives long after the first paint, and the content pages load no
// bundle at all. Each index.html carries a two-line inline script in <head> that
// does it before anything renders. Keep the two in sync - the storage key and the
// attribute name are the contract between them.

const STORAGE_KEY = "electra.theme"
const ATTRIBUTE = "data-theme"

// "classic" maps to no attribute value: it is the :root base, not an override.
const THEMES = {
  classic: null,
  modern: "modern",
}

const DEFAULT = "classic"

class Theme {

  // Private browsing and hardened settings can make localStorage throw on
  // access, not just on write. Broken storage must cost the user the
  // preference, never the page.
  read() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return THEMES.hasOwnProperty(stored) ? stored : DEFAULT
    } catch (e) {
      return DEFAULT
    }
  }

  // What is actually on the document right now, which is what the inline script
  // in <head> put there. Falls back to the stored value if the attribute is
  // missing for any reason.
  current() {
    const attribute = document.documentElement.getAttribute(ATTRIBUTE)
    const match = Object.keys(THEMES).find((name) => THEMES[name] === attribute)
    return match || this.read()
  }

  apply(name) {
    if (!THEMES.hasOwnProperty(name)) return

    if (THEMES[name] === null) {
      document.documentElement.removeAttribute(ATTRIBUTE)
    } else {
      document.documentElement.setAttribute(ATTRIBUTE, THEMES[name])
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, name)
    } catch (e) {
      // Preference is lost on reload, the current page is still correct.
    }
  }

  names() {
    return Object.keys(THEMES)
  }
}

export default new Theme()
