const shortid = require('short-uuid')
import editorByType from "../editorByType"
import renderMode from "../../renderMode"

import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="flipcard") {
    super(type)
  }

  /* public interface */
  inject(section) {
    super.inject(section)

    let activeSection = section.content.front
    this.editor = editorByType(activeSection.type).inject(activeSection)

    return this
  }

  /* public interface */
  commit(){
    return this.editor.commit()
  }

  /**
   * 
   * @param {*} whereToAppend 
   * @param {*} section 
   * @param {String} mode Either "worksheet", "solution", "flipcard"
   */
  render(section, mode){
    let frontSection = section.content.front
    let backSection = section.content.back

    let frontContent = editorByType(frontSection.type).render(frontSection, mode) 
    let backContent  = editorByType(backSection.type).render(backSection, mode) 

    switch (mode){
      case renderMode.WORKSHEET:
        return frontContent
      case renderMode.SOLUTION:
        return backContent
    }

    return `
        <div class="sectionContent" data-type="${this.type}">
            <div class='flip_box'>
              <div class='front'>
                ${frontContent}
              </div>
              <div class='back'>
                ${backContent}
              </div>
            </div>
        </div>`
  }

  onUnselect(section){
    $(".flipped").removeClass("flipped")
  }


  getMenu(section){
    return `<div data-id='${section.id}' id='sectionMenuFlip'>&nbsp;&#127137;&nbsp;</div>`
  }

  defaultContent(){
    return {
      front : {
        id: shortid.generate(),
        type: "markdown",
        content: "## Front"
      },
      back: {
        id: shortid.generate(),
        type: "markdown",
        content: "## Back"
      }
    }
  }
}
