// The site footer - ONE source, used on the start page, on every content
// sub-page and in the book under /book/.
//
// It moved here from home/ when the book became the second user. That matters
// more than tidiness: this footer carries the Impressum and Datenschutz links,
// which German law wants reachable from every page, and a second hand-written
// copy is a copy that will fall out of step.
//
// Every label carries its German text in the markup AND a data-i18n key. The
// key relabels it wherever i18next runs; the text is what shows where it does
// not - the book loads no translations, and on the other pages an i18next that
// fails to arrive would otherwise leave a footer of blank links. Same pattern
// as SettingsSwitch, see the note there.
//
// Rule for the link list: only link what actually exists. A dead entry in a
// footer costs more trust than a missing one.

const GITHUB = "https://github.com/freegroup/electra"
const CONTACT_MAIL = "a.herz@freegroup.de"
const FOUNDED = 2016

export default class Footer {

  // `mountSelector` is an empty element the page places where the footer goes.
  constructor(mountSelector = ".footerMount") {
    this.mount = document.querySelector(mountSelector)
    if (!this.mount) return
    this.render()
    // Localize what we just injected, and again on every language change.
    if (typeof $ !== "undefined" && $.fn && $.fn.localize) $(this.mount).localize()
    if (typeof i18next !== "undefined" && typeof i18next.on === "function") {
      i18next.on("languageChanged", () => {
        if ($.fn && $.fn.localize) $(this.mount).localize()
      })
    }
  }

  render() {
    const year = new Date().getFullYear()
    const ext = 'target="_blank" rel="noopener"'

    this.mount.innerHTML = `
      <footer class="siteFooter">
        <div class="inner">

          <div class="brand">
            <img class="logo" src="/common/images/favicon_64x64.png" alt="Electra.Academy" width="48" height="48"/>
            <div class="name">Electra.Academy</div>
            <p class="tagline" data-i18n="footer.tagline">Digitale Schaltungen verstehen, indem man sie baut.</p>
          </div>

          <nav class="column">
            <div class="heading" data-i18n="footer.about">Über</div>
            <a href="/home/about.html"   data-i18n="footer.about_us">Über mich</a>
            <a href="/home/imprint.html" data-i18n="footer.imprint">Impressum</a>
            <a href="/home/privacy.html" data-i18n="footer.privacy">Datenschutz</a>
            <a href="/home/cookies.html" data-i18n="footer.cookies">Cookies</a>
            <a href="/home/terms.html"   data-i18n="footer.terms">Nutzungsbedingungen</a>
          </nav>

          <nav class="column">
            <div class="heading" data-i18n="footer.apps">Anwendungen</div>
            <a href="/simulator">Simulator</a>
            <a href="/author">Author</a>
            <a href="/designer">Designer</a>
            <a href="/book/">Grundkurs Digitaltechnik</a>
          </nav>

          <nav class="column">
            <div class="heading" data-i18n="footer.interact">Mitmachen</div>
            <a href="${GITHUB}" ${ext} data-i18n="footer.code">Quellcode</a>
            <a href="${GITHUB}/issues" ${ext} data-i18n="footer.bugtracker">Fehler melden</a>
            <a href="${GITHUB}/discussions" ${ext} data-i18n="footer.forum">Forum</a>
            <a href="mailto:${CONTACT_MAIL}" data-i18n="footer.contact">Kontakt</a>
          </nav>

        </div>

        <div class="bottom">
          <span class="copyright">&copy; ${FOUNDED} - ${year} Andreas Herz</span>
          <a class="license" href="${GITHUB}/blob/main/LICENSING.md" ${ext} data-i18n="footer.license">Quelloffen unter AGPL-3.0</a>
        </div>
      </footer>
    `
  }
}
