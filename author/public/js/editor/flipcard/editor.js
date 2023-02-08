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

    section.flippedStateDuringInject  = $(`.section[data-id='${section.id}'] .flip_box`).hasClass("flipped-back")
    let activeSection = section.flippedStateDuringInject  ? section.content.back : section.content.front
    
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

    let flippedClass =  section.flippedStateDuringInject ? " flipped-back" :""

    switch (mode){
      case renderMode.WORKSHEET:
        return frontContent
      case renderMode.SOLUTION:
        return backContent
    }
    return `
        <div class="sectionContent" data-type="${section.type}">
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
    if (card.length >0) {
      // Restart animaton, See: https://css-tricks.com/restart-css-animation/
      card.removeClass('flipped-back');
      void card[0].offsetWidth;
    }
  }


  getMenu(section){
    return `<div data-id='${section.id}' id='sectionMenuFlip'>&nbsp;&#8635;&nbsp;</div>`
  }

  hasLearningContent(){
    return true
  }
  
  defaultContent(){
    return {
      front : {
        id: shortid.generate(),
        type: "placeholder",
        content: 
        `<h1>Front Side</h1>
        This is the front side of the flashcard where the user can enter their solution 
        to a given question is typically a dedicated space on the screen that allows the 
        user to input their response. It can be a empty text field where the user can type in their answer, a cloze or
        a partly drawn circuit where the user shold complete them. 
        <br>
        <br>
        The purpose of this area is to provide a place for the user 
        to enter their solution, so that it can be evaluated and compared with the correct 
        answer - which yo shold place on the backside of this flashcard.
        <br>
        <br>
        The design of this area will vary depending on the system, but it typically 
        consists of a clear and intuitive interface that allows the user to input their 
        answer with ease.`
      },
      back: {
        id: shortid.generate(),
        type: "placeholder",
        content: "back"
      }
    }
  }
}
