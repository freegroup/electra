class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    this.tmpl =`
            <div class="welcomeMessage">
            <div class="left">
              <div class="teaser">
                <h2 data-i18n="[html]app.title">Documentation Author</h2>
                <p  data-i18n="[html]app.slogan">Create exciting educational content using Electra Academy</p>
              </div>
              <div class="description">
                <p data-i18n="[html]app.description">
                  With <i>Documentation Author</i>, you can easily create and share documents, worksheets, and course 
                  materials online. You can add circuits, math formulas, cloze, pictures, and more to your documents, making them more 
                  engaging and informative. Sharing your work with others has never been easier. <b>I hope you'll give it a try!</b>
                </p>
                <button data-i18n="button.new_document" class="electra-button" id="welcomeNewDocument">New Document</button> 
                <button data-i18n="button.open_example" class="electra-button" id="welcomeOpenExample">Open Example</button>
              </div>
            </div>
            <div class="right">
              <img class="svg" src="../common/images/app_lessons.svg">
            </div>
          </div>           
        `
  }

  /**
   */
  show(exampleDocument) {
    $("#editor .workspace").append(this.tmpl)
    $('.welcomeMessage').localize(); 

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
