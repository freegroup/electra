// The site footer - ONE source, used on the start page and on every content
// sub-page. Since all of them load the full bundle now, i18next is always
// present, so the labels are data-i18n keys like everywhere else on the site
// rather than a private table here. The switcher relabels them in place on a
// language change; there is one document per page and the language lives in
// i18next, not in the URL.
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
            <p class="tagline" data-i18n="footer.tagline"></p>
          </div>

          <nav class="column">
            <div class="heading" data-i18n="footer.about"></div>
            <a href="/home/about.html"   data-i18n="footer.about_us"></a>
            <a href="/home/imprint.html" data-i18n="footer.imprint"></a>
            <a href="/home/privacy.html" data-i18n="footer.privacy"></a>
            <a href="/home/cookies.html" data-i18n="footer.cookies"></a>
            <a href="/home/terms.html"   data-i18n="footer.terms"></a>
          </nav>

          <nav class="column">
            <div class="heading" data-i18n="footer.resources"></div>
            <a href="${GITHUB}" ${ext} data-i18n="footer.code"></a>
            <a href="/simulator">Simulator</a>
            <a href="/author">Author</a>
            <a href="/designer">Designer</a>
            <a href="/gallery" data-i18n="footer.gallery"></a>
          </nav>

          <nav class="column">
            <div class="heading" data-i18n="footer.interact"></div>
            <a href="${GITHUB}/issues" ${ext} data-i18n="footer.bugtracker"></a>
            <a href="${GITHUB}/discussions" ${ext} data-i18n="footer.forum"></a>
            <a href="mailto:${CONTACT_MAIL}" data-i18n="footer.contact"></a>
          </nav>

        </div>

        <div class="bottom">
          <span class="copyright">&copy; ${FOUNDED} - ${year} Andreas Herz</span>
          <a class="license" href="${GITHUB}/blob/main/LICENSING.md" ${ext} data-i18n="footer.license"></a>
        </div>
      </footer>
    `
  }
}
