
import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="flipcard") {
    super(type)
    /*
    $(s_round).hover(function() {
      $('.b_round').toggleClass('b_round_hover');
      return false;
    });
    */

    // add generic event handler to flip the cards
    //
    $(document)
    .off("mouseover", ".s_round")
    .on("mouseover", ".s_round", (e) => {
      $(e.currentTarget.previousElementSibling).addClass('b_round_hover');
    })
    .off("mouseout", ".s_round")
    .on("mouseout", ".s_round", (e) => {
      $(e.currentTarget.previousElementSibling).removeClass('b_round_hover');
    })
    .off("click", ".s_round")
    .on("click", ".s_round", (e) => {
      let button  = $(e.target)
      let parent  = $(button.closest(".container")[0])
      let flipbox = $(parent.find(".flip_box")[0])
      flipbox.toggleClass('flipped');
      //$(this).addClass('s_round_click');
      //$('.s_arrow').toggleClass('s_arrow_rotate');
      //$('.b_round').toggleClass('b_round_back_hover');
    });
  }

  /* public interface */
  inject(section) {
    super.inject(section)

    $(".sections .activeSection .sectionContent").html(`
              <div class="editorContainerSelector" id="editor-container">
                Blah Blah Blah
              </div>
                `)

    return this
  }

  /* public interface */
  commit(){
    return new Promise((resolve, reject) => {
      //this.section.content = this.editor.getValue()
      resolve(this.section)
    })
  }

  /* public interface */
  render(whereToAppend, section){
    whereToAppend.append(`
      <div data-id="${section.id}" class='section' data-type="${this.type}">
        <div class="sectionContent markdownRendering" data-type="${this.type}">
          <div class='container'>
            <div class='flip_box'>
              <div class='front'>
                <p class='f_title'>Answer field</p>
              </div>

              <div class='back'>
                <h1 class='b_headline'>Solution Side</h1>
              </div>
            </div>

            <div class='r_wrap'>
              <div class='b_round'></div>
              <div class='s_round'>
                <div class='s_arrow'>-&gt;</div>
              </div>
            </div>

            <div class='r_wrap'>
              <div class='b_round'></div>
              <div class='s_round'>
                <div class='s_arrow'>-&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>`)
  }

  onUnselect(section){
    $(".flipped").removeClass("flipped")
  }


  getMenu(section){
    return `<div data-id='${section.id}' id='sectionMenuFlipcard'>&#127137;</div>`
  }

  defaultContent(){
    return "FlipCard"
  }

}
