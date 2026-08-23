// Die Leiste am oberen Rand - EINE Quelle fuer alle Anwendungen.
//
// Vorher stand dasselbe Markup fuenfmal im Baum: einmal hier fuer Startseite
// und Inhaltsseiten, einmal je Editor als Handarbeit in der index.html. Der
// Vergleich ergab zwei Varianten, die sich in genau drei Stuecken
// unterschieden - Marke als Link, Slogan, Benutzermenue. Daraus sind zwei
// Schalter und ein Text geworden.
//
// Das Buch bleibt bewusst aussen vor: seine Seiten muessen ohne JavaScript
// lesbar sein, sonst findet eine Suchmaschine den Text nicht. Dort erzeugt
// tools/convert-book.js dasselbe Markup statisch.
//
// Der Mount wird ERSETZT, nicht gefuellt. Dadurch steht .appbar an genau der
// Stelle im Baum, an der es vorher von Hand stand, und der erzeugte Baum ist
// derselbe wie der des Buches - ein CSS bedient beide, ohne Sonderfall.

export default class Header {

  // opts.subtitle    - Text unter der Wortmarke. Fehlt er, kommt er aus
  //                    data-subtitle am Mount: die Seite sagt selbst, was sie ist.
  // opts.subtitleKey - i18n-Schluessel dafuer, sticht subtitle
  // opts.slogan      - die uebersetzte Zeile neben dem Titel (nur Editoren)
  // opts.userinfo    - die Huelle fuers Benutzermenue, die Userinfo.js fuellt
  //                    oder entfernt. Sie MUSS im Markup stehen, Userinfo legt
  //                    sie nicht selbst an.
  constructor(mountSelector = ".appbarMount", opts = {}) {
    const mount = document.querySelector(mountSelector)
    if (!mount) return
    this.opts = opts
    this.render(mount)
  }

  render(mount) {
    const { subtitleKey = null, slogan = false, userinfo = false } = this.opts
    const subtitle = this.opts.subtitle ?? mount.dataset.subtitle ?? ""

    const h2 = subtitleKey
      ? `<h2 data-i18n="${subtitleKey}"></h2>`
      : `<h2>${subtitle}</h2>`

    // Deutscher Text im Markup UND der i18n-Schluessel, wie in Footer.js: der
    // Schluessel beschriftet um, wo i18next laeuft, der Text ist das, was steht,
    // wo es das nicht tut. Leer war er sonst genau dort unsichtbar, wo er als
    // einziger sagt, worum es hier ueberhaupt geht.
    const sloganMarkup = slogan
      ? `<div class="slogan" data-i18n="common:header.slogan">macht digitale Elektronik für jeden zugänglich</div>`
      : ""

    const userinfoMarkup = userinfo
      ? `<label class="dropdown userinfo_toggler">
          <span class="image-button" data-toggle="dropdown">
            <img crossorigin="anonymous" src="/common/images/toolbar_user.svg"/>
          </span>
          <div class="dropdown-menu" role="menu"></div>
        </label>`
      : ""

    // Absolute Bildpfade, nicht relative: die Inhaltsseiten liegen unter
    // /home/de/… und /home/en/…, wo "../common" auf /home/common zeigen wuerde.
    const template = document.createElement("template")
    template.innerHTML = `
      <div class="appbar">
        <a class="brandLink" href="/home/index.html">
          <img class="icon svg" src="/common/images/favicon_64x64.svg" alt="Electra.Academy"/>
        </a>
        <div class="title">
          <h1>Electra.Academy</h1>
          ${h2}
        </div>
        ${sloganMarkup}
        <span class="spacer"></span>
        <span class="group applicationSwitch">${userinfoMarkup}</span>
      </div>`.trim()

    this.element = template.content.firstElementChild
    mount.replaceWith(this.element)

    // Nur fuer die Inhaltsseiten: dort ist $().localize() schon gelaufen, bevor
    // es diese Leiste gab. Die Editoren rufen es nach app.init() ueber den
    // ganzen Body auf und brauchen das hier nicht.
    if (subtitleKey && typeof $ !== "undefined" && $.fn && $.fn.localize) {
      $(this.element).localize()
    }
  }
}
