import mdFactory from "../../../../common/js/markdown"
let md = mdFactory()

import ToastEditor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="wysiwyg") {
    super(type)
    this.md = md
  }

  /* public interface */
  inject(section) {
    super.inject(section)
    $(".sections .activeSection .sectionContent").html(`
              <div class="editorContainerSelector" id="editor-wysiwyg">
              </div>
                `)

    this.editor = new ToastEditor({
      el: document.querySelector('#editor-wysiwyg'),
      height: '500px',
      usageStatistics: false,
      initialEditType: 'wysiwyg',
      initialValue: section.content,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'indent', 'outdent'],
        ['table', 'link'],
        ['code', 'codeblock'],
      ]
    });
    return this
  }

  /* public interface */
  commit(){
    return super.commit()
    .then(() => {
      this.section.content = this.editor.getMarkdown().tuiMarkdownFix()
      return this.section
    })
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
      markdown = this.md.render(markdown)
    } catch (error) {
      console.log(error)
      errorCSS = " error"
    }
    return markdown
  }

  append(whereToAppend, content){
    whereToAppend.append(`<div class="sectionContent markdownRendering" data-type="${this.type}">${content}</div>`)
  }

  defaultContent(){
    return `
**Welcome to the text Editor!**

The Editor allows you to edit your documents using text or visual mode.
You the toolbar above to format your text...

`
  }

}
