// The settings menu - ONE component for every page of the site. Holds the two
// choices a reader can make about the shell: language and appearance.
//
// It is used in two very different environments and must look identical in
// both, so it carries no hard dependency on jQuery, Bootstrap, i18next or the
// socket:
//
//   - the apps and the start page: the full stack is loaded, the switcher calls
//     i18next.changeLanguage() and relabels everything in place
//   - the static content pages (about, terms, privacy, cookies, imprint): no
//     jQuery, no i18next. Their text is baked into the HTML, so switching
//     language is a NAVIGATION, not a relabelling
//
// Which of the two applies is decided by the page itself: if it declares
// <link rel="alternate" hreflang="…"> for the target language, the switcher
// goes there. That markup is already in those pages for search engines, so
// nothing new has to be wired up and this file needs to know nothing about the
// page structure of any app.
//
// The German labels in the markup are the fallback for the static pages, where
// i18next never runs - the same pattern the page bodies use. Language names are
// deliberately NOT translated: someone hunting for English needs to read
// "English", whatever the interface currently speaks.

import theme from "./theme"

const lngs = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
}

// The apps mount this next to a bar that lives at different depths, so the icon
// is referenced absolutely.
//
// It carries class="svg" so inlineSVG swaps the <img> for a real inline <svg>.
// That is not cosmetic: this file has #4A4A4A baked in, and the appbar rule that
// paints its icons white (.svgTint in theme_light.less) can only reach the
// shapes once they are actual child elements. As an <img> the gear stayed dark
// grey on the dark blue bar. The neighbouring waffle and the old globe get away
// without the class only because they happen to have #FFFFFF baked in - which
// also means they would not follow a theme that changes the bar.
const ICON = "/common/images/canvas_configure.svg"

export default class SettingsSwitch {

  constructor(permissions) {
    // In DIE Gruppe, die die Leiste schon hat - nicht in eine zweite eigene.
    // Frueher haengte sich dieser Schalter ein weiteres <span class="group">
    // an die Leiste, weil es zu seiner Entstehungszeit keinen vorgesehenen
    // Platz gab. Zwei Gruppen sind zwei eigenstaendige Flex-Elemente, die
    // einzeln ausgerichtet werden: waren sie nicht auf das Pixel gleich hoch,
    // stand "Einstellungen" ein paar Pixel tiefer als "Apps" und "Benutzer".
    // Eine Reihe, ein Bezugspunkt.
    const bar = document.querySelector(".appbar .applicationSwitch")
    if (!bar) return

    const languages = Object.keys(lngs)
      .map((lng) => `<li class="settingsOption" data-lng="${lng}">${lngs[lng].nativeName}</li>`)
      .join("")

    const group = document.createElement("template")
    group.innerHTML = `
      <div class="dropdown settingsMenu" id="settingsMenu">
        <span class="image-button" data-toggle="dropdown">
          <img class="svg" src="${ICON}" alt="Einstellungen"/>
          <div data-i18n="common:header.settings">Einstellungen</div>
        </span>
        <ul class="dropdown-menu dropdown-menu-right" role="menu">
          <li class="settingsHeader" data-i18n="common:settings.language">Sprache</li>
          ${languages}
          <li class="settingsSeparator"></li>
          <li class="settingsHeader" data-i18n="common:settings.appearance">Darstellung</li>
          <li class="settingsOption" data-theme="classic" data-i18n="common:settings.theme_classic">Klassisch</li>
          <li class="settingsOption" data-theme="modern" data-i18n="common:settings.theme_modern">Modern</li>
        </ul>
      </div>
    `
    // Das Menue selbst haengt in die Reihe, ohne eigene Huelle drumherum -
    // eine Ebene weniger, die anders hoch sein koennte als die Nachbarn.
    this.root = group.content.querySelector("#settingsMenu")
    bar.appendChild(this.root)

    this.root.querySelectorAll("[data-lng]").forEach((li) => {
      li.addEventListener("click", () => this.selectLanguage(li.getAttribute("data-lng")))
    })

    this.root.querySelectorAll("[data-theme]").forEach((li) => {
      li.addEventListener("click", () => this.selectTheme(li.getAttribute("data-theme")))
    })

    this.installFallbackToggle()
    this.markActive()

    // Another browser window switched the language - follow it. Only relevant
    // where a socket exists; the static pages have none.
    if (typeof socket !== "undefined" && socket && typeof socket.on === "function") {
      socket.on("i18n", (locale) => this.applyLanguage(locale, false))
    }
  }

  // Bootstrap opens the dropdown via data-toggle. Where Bootstrap is not loaded
  // (the static pages) the menu would never open, so attach a minimal toggle -
  // but only then, or the two would cancel each other out.
  installFallbackToggle() {
    const bootstrapPresent = typeof $ !== "undefined" && $.fn && $.fn.dropdown
    if (bootstrapPresent) return

    const button = this.root.querySelector('[data-toggle="dropdown"]')
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      this.root.classList.toggle("open")
    })
    document.addEventListener("click", () => this.root.classList.remove("open"))
  }

  // Which entries carry the tick. Runs again after every change, and after a
  // relabelling - i18next rewrites the text of an item but leaves its classes.
  markActive() {
    const current = theme.current()
    this.root.querySelectorAll("[data-theme]").forEach((li) => {
      li.classList.toggle("active", li.getAttribute("data-theme") === current)
    })

    // i18next reports regional variants ("de-DE"), the menu only knows bases.
    const spoken = (typeof i18next !== "undefined" && i18next.language)
      ? i18next.language
      : document.documentElement.lang
    this.root.querySelectorAll("[data-lng]").forEach((li) => {
      const lng = li.getAttribute("data-lng")
      li.classList.toggle("active", !!spoken && spoken.split("-")[0] === lng)
    })
  }

  selectLanguage(locale) {
    this.root.classList.remove("open")
    this.applyLanguage(locale, true)
  }

  selectTheme(name) {
    this.root.classList.remove("open")
    theme.apply(name)
    this.markActive()
  }

  // `broadcast` is false when we are reacting to another window, so the two do
  // not bounce the event back and forth.
  applyLanguage(locale, broadcast) {
    // A page that offers a translated document wins: relabelling would leave
    // the reader with a German text under an English shell.
    const alternate = document.querySelector(`link[rel="alternate"][hreflang="${locale}"]`)
    if (alternate && alternate.getAttribute("href")) {
      // replace, not assign: switching language is not a step the reader should
      // have to walk back through.
      window.location.replace(alternate.getAttribute("href"))
      return
    }

    if (typeof i18next !== "undefined" && typeof i18next.changeLanguage === "function") {
      i18next.changeLanguage(locale, () => this.rerender())
    }

    if (broadcast && typeof socket !== "undefined" && socket && typeof socket.emit === "function") {
      // let the backend tell other open windows of this user
      socket.emit("i18n", locale)
    }
  }

  rerender() {
    if (typeof $ !== "undefined" && $.fn && $.fn.localize) {
      $("body").localize()
    }
    this.markActive()
  }
}
