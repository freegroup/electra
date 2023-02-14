import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="empty-chapter") {
    super(type)
  }

  /* public interface */
  render(section, mode){
    return `
    <div class="sectionContent markdownRendering" >
    <div class="placeholderContainer">
      <div class="placeholderText">  
        <img src="../common/images/pencil.svg">
        <h1>Welcome to our page!</h1>
        <h2>Start by adding your first content to make it feel more alive in here!</h2>
      </div>
      <div class="placeholderButtons">
        <div data-index="0" data-type="wysiwyg"   class='sectionMenuInsertSection material-button' >&#8853; Text</div>
        <div data-index="0" data-type="cloze"     class='sectionMenuInsertSection material-button' >&#8853; Cloze</div>
        <div data-index="0" data-type="flashcard" class='sectionMenuInsertSection material-button' >&#8853; FlashCard</div>
        <div data-index="0" data-type="brain"     class='sectionMenuInsertSection material-button' >&#8853; Diagram</div>
        <div data-index="0" data-type="image"     class='sectionMenuInsertSection material-button' >&#8853; Picture</div>
      </div>
    </div>
    </div>
    `
  }

  defaultContent(){
    return null
  }
}
