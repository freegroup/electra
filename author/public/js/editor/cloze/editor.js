import renderMode from "../../renderMode"

import mdFactory from "../../../../common/js/markdown"

let md_q = mdFactory()
md_q.use(require('./question_plugin'))

let md_s  = mdFactory()
md_s.use(require('./solution_plugin'))

import MarkdownEditor from '../markdown/editor'

export default class Editor extends MarkdownEditor {

  constructor(type="cloze") {
    super(type)
    this.md = md_q
  }


  /**
   * 
   * @param {*} whereToAppend 
   * @param {*} section 
   * @param {String} mode Either "worksheet", "solution", "flashcard"
   */
  render(section, mode){
    let errorCSS = ""
    let markdown = section.content
    try {
      switch (mode){
        case renderMode.WORKSHEET:
          markdown = md_q.render(markdown)
          break
        case renderMode.SOLUTION:
          markdown = md_s.render(markdown)
          break
        case renderMode.EDITOR:
          markdown = md_s.render(markdown)
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
      errorCSS = " error"
    }

    return markdown
  }

  append(whereToAppend, content){
    whereToAppend.append(`<div class="sectionContent" data-type="${this.type}">${content}</div>`)
  }

  hasLearningContent(){
    return true
  }
  
  defaultContent() {
    return  `### Lückentext
Erstellen Sie weitere [[Lücken]] mit Hilfe von doppelten eckigen 
Klammern (*Mac:* \`Alt + 5\` und \`6\`. *Windows:* \`AltGr + 7\` und \`8\`). 

Texte der Lücken werden nur im Editor und auf dem Lösungsblatt angezeigt. Das *Arbeitsblatt* PDF enthält die Lösung nicht`
  }
}
