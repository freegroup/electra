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

    this.flippedStateDuringInject  = $(`.section[data-id='${section.id}'] .flip_box`).hasClass("flipped")
    let activeSection = this.flippedStateDuringInject  ? section.content.back : section.content.front
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
    let flippedClass =  this.flippedStateDuringInject ? " flipped" :""
    this.flippedStateDuringInject  = false
    return `
        <div class="sectionContent" data-type="${this.type}">
            <div class='flip_box${flippedClass}'>
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
    let card = $(".flipped-back")
    console.log(card)
    if (card.length >0) {
      // Restart animaton, See: https://css-tricks.com/restart-css-animation/
      card.removeClass('flipped-back');
      void card[0].offsetWidth;

      card.addClass('flipped-front');
    }
  }


  getMenu(section){
    return `<div data-id='${section.id}' id='sectionMenuFlip'>&nbsp; 	
    &#8635; &nbsp;</div>`
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
