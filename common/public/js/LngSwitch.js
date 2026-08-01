// The language switcher - ONE component for every page of the site.
//
// It is used in two very different environments and must look identical in
// both, so it carries no hard dependency on jQuery, Bootstrap, i18next or the
// socket:
//
//   - the apps and the start page: the full stack is loaded, the switcher calls
//     i18next.changeLanguage() and relabels everything in place
//   - the static content pages (/home/de/…, /home/en/…): no jQuery, no i18next.
//     Their text is baked into the HTML, so switching language is a NAVIGATION,
//     not a relabelling
//
// Which of the two applies is decided by the page itself: if it declares
// <link rel="alternate" hreflang="…"> for the target language, the switcher
// goes there. That markup is already in those pages for search engines, so
// nothing new has to be wired up and this file needs to know nothing about the
// page structure of any app.

const lngs = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
}

// The apps mount this next to a bar that lives at different depths, so the icon
// is referenced absolutely.
const ICON = "/common/images/toolbar_language.svg"

export default class LngSwitch {

  constructor(permissions) {
    const bar = document.querySelector(".appbar")
    if (!bar) return

    const items = Object.keys(lngs)
      .map((lng) => `<li data-name="${lngs[lng].nativeName}" data-lng="${lng}">${lngs[lng].nativeName}</li>`)
      .join("")

    const group = document.createElement("span")
    group.className = "group"
    group.innerHTML = `
      <div class="dropdown" id="languageSwitcher">
        <span class="image-button" data-toggle="dropdown">
          <img src="${ICON}" alt="Language"/>
        </span>
        <ul class="dropdown-menu dropdown-menu-right" role="menu">${items}</ul>
      </div>
    `
    bar.appendChild(group)

    this.root = group.querySelector("#languageSwitcher")
    this.root.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => this.select(li.getAttribute("data-lng")))
    })

    this.installFallbackToggle()

    // Another browser window switched the language - follow it. Only relevant
    // where a socket exists; the static pages have none.
    if (typeof socket !== "undefined" && socket && typeof socket.on === "function") {
      socket.on("i18n", (locale) => this.apply(locale, false))
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

  select(locale) {
    this.root.classList.remove("open")
    this.apply(locale, true)
  }

  // `broadcast` is false when we are reacting to another window, so the two do
  // not bounce the event back and forth.
  apply(locale, broadcast) {
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
  }
}
