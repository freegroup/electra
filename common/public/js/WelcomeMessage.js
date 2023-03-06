class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
  }

  /**
   */
  show(exampleDocument) {
    let tmpl =`
            <div class="welcomeMessage">
            <div class="left">
              <div class="teaser">
                <h2 data-i18n="[html]app.title">${t("app.title")}</h2>
                <p  data-i18n="[html]app.slogan">${t("app.slogan")}</p>
              </div>
              <div class="description">
                <p data-i18n="[html]app.description">${t("")}</p>
                <button data-i18n="button.new_document" class="electra-button" id="welcomeNewDocument">${t("button.new_document")}</button> 
                <button data-i18n="button.open_example" class="electra-button" id="welcomeOpenExample">${t("button.open_example")}</button>
              </div>
            </div>
            <div class="right">
              <img class="svg" src="${t("app.icon")}">
            </div>
          </div>           
        `
    $("#editor .workspace").append(tmpl)

    $("#welcomeNewDocument").on("click", ()=>{
      app.fileNew("NewDocument", "user")
      this.hide()
    })

    $("#welcomeOpenExample").on("click", ()=>{
      app.load(exampleDocument, "global")
      this.hide()
    })
  }

  hide() {
    $(".welcomeMessage").remove()
  }
}

const dialog = new Dialog()

export default dialog
