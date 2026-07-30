const axios = require("axios")

import mdFactory  from "./markdown"
let md = mdFactory()

// Every document this pane renders is a .sheet, whatever app hosts the pane —
// so the backend is always the sheets one, regardless of the host's own storage.
const SHEETS_BASE = "../sheets"
const FALLBACK_LNG = "en"

// The instance that most recently painted a given container. The legal page
// points three tabs at ONE container, so on a language change only the tab that
// is actually visible — the one that painted last — may repaint itself.
const activeByContainer = new Map()

// One languageChanged subscription shared by all instances, installed on first
// use. Panes that were never shown never enter activeByContainer, so the lazy
// first-render behaviour survives a language switch untouched.
let languageHookInstalled = false
function installLanguageHook() {
  if (languageHookInstalled) return
  if (typeof i18next === "undefined" || typeof i18next.on !== "function") return
  languageHookInstalled = true
  i18next.on("languageChanged", () => {
    activeByContainer.forEach((page) => page.render())
  })
}

// i18next may report a region variant ("de-DE"); document paths carry the base
// tag only ("de").
function currentLng() {
  let lng = (typeof i18next !== "undefined" && i18next.language) || FALLBACK_LNG
  return String(lng).split("-")[0]
}

export default class AuthorPage {

  // `file` is a document path that may carry a {{lng}} placeholder, e.g.
  // "readme/{{lng}}/legal/terms.sheet" — resolved per render, so switching the
  // language switches the document. A path without the placeholder still works.
  constructor(containerId, file, tabSelector) {
    this.file = file
    this.containerId = containerId
    this.rendered = false
    installLanguageHook()

    // Every pane implements onShow() (called when its tab is shown). The help
    // page renders lazily on first show; a later change could re-render here to
    // pick up an updated help document from the backend.
    if (tabSelector) {
      $(tabSelector).off("click.readme").on("click.readme", this.onShow.bind(this))
    }
  }

  // The pane was shown — render on first view. (Future: re-render to refresh.)
  onShow() {
    if (!this.rendered) {
      this.rendered = true
      this.render()
    }
  }

  // Open this document in ONE language. Two steps since the finder migration:
  // resolve the public document path to an opaque handle, then open that handle.
  // The handle names the shared app scope, which is anonymous-readable — so this
  // works without a login (the legal pages rely on that).
  openFor(lng) {
    let path = this.file.replace(/\{\{lng\}\}/g, lng)
    return axios.get(`${SHEETS_BASE}/file/global`, { params: { path } })
      .then((response) => axios.get(`${SHEETS_BASE}/file`, { params: { id: response.data.id } }))
  }

  // Open in the active language, falling back to English. A document need not
  // exist in every language, and /file/global mints a handle for ANY path (it
  // only encodes one) — so a missing translation surfaces as a 404 on the open,
  // not on the resolve. Without this fallback the pane would just go blank.
  fetchDoc() {
    let lng = currentLng()
    return this.openFor(lng)
      .catch((err) => {
        if (lng === FALLBACK_LNG) throw err
        return this.openFor(FALLBACK_LNG)
      })
  }

  render( ) {
    // Claim the container, so a later language switch repaints THIS document
    // rather than a sibling tab's.
    activeByContainer.set(this.containerId, this)
    this.rendered = true
    this.fetchDoc()
      .then((response => {
        $(this.containerId).html("")
        let pages = (response.data.content || {}).pages || []
        pages.forEach( (page, index) => {
          let container = $("<div class='authorPage section'></div>")
          $(this.containerId).append(container)
          let sections = page.sections
          sections.forEach( (section) => {
            switch(section.type){
              case "brain":
                this.renderBrain(container, section)
                break
              case "wysiwyg":
                  this.renderMarkdown(container, section)
                  break
              case "markdown":
                this.renderMarkdown(container, section)
                break
              default:
                break
            }
          })
          if(index < (pages.length-1))
            container.append("<div style='page-break-before: always;'></div>")
        })
      }))
      .catch( err => {
        console.log(err)
      })
  }


  renderMarkdown(container, section){
    let markdown = md.render(section.content)
    container.append(`<div class="sectionContent" data-type="wysiwyg">${markdown}</div>`)
  }

  renderBrain(container, section){
    container.append(`<div class="imageRendering" data-type="image"><img src="${section.content.image}"></div>` )
  }
}

