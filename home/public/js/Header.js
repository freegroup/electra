// The app bar - ONE source, used on the start page and on every content
// sub-page. Emits exactly the .appbar markup that theme_light.less and
// layout/appbar.less style, so both get the same bar from the same CSS.
// Hand-rebuilding it for the sub-pages is what made the two look different.
//
// The right-hand side is an empty .applicationSwitch container that AppSwitch
// prepends its buttons into, and LngSwitch appends its own group next to it -
// the same widgets the apps use. No user menu here on purpose: the landing
// page and the legal pages run no Userinfo, so a sign-in button would either do
// nothing or pull in the Google sign-in client.

export default class Header {

  // opts.subtitle    - literal text for the line under the wordmark
  // opts.subtitleKey - i18n key for it (wins over subtitle; localized in place)
  constructor(mountSelector = ".appbarMount", opts = {}) {
    this.mount = document.querySelector(mountSelector)
    if (!this.mount) return
    this.opts = opts
    this.render()
  }

  render() {
    const { subtitle = "", subtitleKey = null } = this.opts
    const h2 = subtitleKey
      ? `<h2 data-i18n="${subtitleKey}"></h2>`
      : `<h2>${subtitle}</h2>`
    this.mount.innerHTML = `
      <div class="appbar">
        <a class="brandLink" href="/home/index.html">
          <img class="icon svg" src="/common/images/favicon_64x64.svg" alt="Electra.Academy"/>
        </a>
        <div class="title">
          <h1>Electra.Academy</h1>
          ${h2}
        </div>
        <span class="spacer"></span>
        <span class="group applicationSwitch"></span>
      </div>
    `
    if (subtitleKey && typeof $ !== "undefined" && $.fn && $.fn.localize) {
      $(this.mount).localize()
    }
  }
}
