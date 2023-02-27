import editorByType from "../editorByType"
const shortid = require('short-uuid')
import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="placeholder") {
    super(type)

    $(document)
      .on("click", ".placeholderMenuInsertSection", (event) => {
        let button = $(event.target)
        let type = button.data("type")
        let sectionId = button.data("id")
        let section = app.view.getPage().get(sectionId)
        section.type=type
        section.content = editorByType(type).defaultContent()
        let parent = app.view.getPage().parent(section)
        app.view.onSelect(parent)
        app.view.onEdit(parent)
      })
  }

  /* public interface */
  render(section, mode){
    return `
    <div class="placeholderContainer">
      <div class="placeholderText">  
        <img src="../common/images/pencil.svg">
        <h1>It's a little empty in here!</h1>
        <h2>Add your flashcard <b>${section.content}</b> content here</h2>
      </div>
      <div class="placeholderButtons">
        <button data-id="${section.id}" data-type="wysiwyg" class='placeholderMenuInsertSection electra-button' >&#8853; Text</button>
        <button data-id="${section.id}" data-type="brain"   class='placeholderMenuInsertSection electra-button' >&#8853; Diagram</button>
        <button data-id="${section.id}" data-type="timing"  class='placeholderMenuInsertSection electra-button' >&#8853; Timing</button>
        <button data-id="${section.id}" data-type="image"   class='placeholderMenuInsertSection electra-button' >&#8853; Image</button>
        <button data-id="${section.id}" data-type="cloze"   class='placeholderMenuInsertSection electra-button' >&#8853; Cloze</button>
      </div>
    </div>
    `
  }

  defaultContent(){
    return null
  }
}
