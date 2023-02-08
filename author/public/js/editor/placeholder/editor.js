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
  inject(section) {
    super.inject(section)

    return this
  }

  /* public interface */
  commit() {
    return new Promise((resolve, reject) => {
      resolve(this.section)
    })
  }

  /* public interface */
  cancel() {
    return new Promise((resolve, reject) => {
      resolve(this.section)
    })
  }

  /* public interface */
  render(section, mode){
    return `${section.content} <br> <br> <div data-id="${section.id}" data-type="markdown" class='placeholderMenuInsertSection material-button' >&#8853; Text</div>`
  }

  defaultContent(){
    return null
  }
}
