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
   * @param {String} mode Either "worksheet" or "solution"
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

  // Cloze splits worksheet/solution inside the cell itself, so it always
  // produces a per-sheet difference.
  hasSheetVariants(){
    return true
  }

  // Cloze splits worksheet/solution inside the cell itself, so the sheet
  // combobox would be a second, conflicting control - it stays hidden.
  hasVisibilityControl(){
    return false
  }

  defaultContent() {
    return t("editor.cloze.template")
  }
}
