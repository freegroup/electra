const shortid = require('short-uuid')
import editorByType from "../editorByType"
import renderMode from "../../renderMode"

import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="flashcard") {
    super(type)
  }

  /* public interface */
  inject(section) {
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
   * @param {String} mode Either "worksheet", "solution", "flashcard"
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

            <div class='flip_box${flippedClass}'>
              <div class='front'>
                ${frontContent}
              </div>
              <div class='back'>
                ${backContent}
              </div>
            </div>
            <button data-id='${section.id}' class="sectionMenuFlip"><span><svg viewBox="0 0 24 24" style="width: 24px; height: 24px;"><path d="M15.332 4.045a.75.75 0 0 0-1.091 1.028l.693.736-5.33-.173H9.6c-3.63-.107-6.683 2.772-6.79 6.401a6.58 6.58 0 0 0 1.799 4.716.75.75 0 0 0 1.091-1.03 5.08 5.08 0 0 1-1.391-3.642c.083-2.8 2.445-5.028 5.246-4.946h.001l5.343.173-.746.704a.75.75 0 1 0 1.029 1.091l2.056-1.939.014-.013a.747.747 0 0 0 .02-1.048l-1.941-2.058ZM19.434 8.167a.75.75 0 0 1 1.06.032 6.58 6.58 0 0 1 1.8 4.715c-.108 3.63-3.162 6.509-6.792 6.402H15.5l-5.33-.173.693.735a.75.75 0 0 1-1.091 1.029l-1.94-2.058a.748.748 0 0 1 .033-1.063l2.056-1.938a.75.75 0 0 1 1.029 1.092l-.746.703 5.343.173c2.802.082 5.164-2.145 5.247-4.946a5.08 5.08 0 0 0-1.392-3.643.75.75 0 0 1 .032-1.06Z"></path></svg></span></button>`
  }

  onUnselect(section){
    let card = $(".flipped-back")
    if (card.length >0) {
      // Restart animaton, See: https://css-tricks.com/restart-css-animation/
      card.removeClass('flipped-back');
      void card[0].offsetWidth;
    }
  }


  hasLearningContent(){
    return true
  }
  
  startEditAfterInsert(section){
    // start editing if the user insert a new section
    return false;
  }

  defaultContent(){
    return {
      front : {
        id: shortid.generate(),
        type: "placeholder",
        content: 
        `frontside`
      },
      back: {
        id: shortid.generate(),
        type: "placeholder",
        content: "backside"
      }
    }
  }
}
