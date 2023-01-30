import 'codemirror/lib/codemirror.css'
import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm.js'
import 'codemirror/addon/selection/active-line.js'
let md = require('markdown-it')()
import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor() {
    super()
  }

  inject(section) {
    super.inject(section)
    let content = section.content
    $(".sections .activeSection .sectionContent").html(`
              <div class="editorContainerSelector" id="editor-container">
                <div class="left">
                  <textarea id="markdownEditor"></textarea>
                </div>
                <div class="right">
                  <article class="markdown-body" id="htmlPreview"></article>
                </div>
              </div>
                `)

    this.editorId = "markdownEditor"
    this.previewId = "htmlPreview"

    this.editor = CodeMirror.fromTextArea(document.getElementById(this.editorId), {
      lineNumbers: true,
      mode: 'gfm',
      theme: 'default',
      viewportMargin: Infinity,
      autofocus: true,
      lineWrapping: true,
      styleActiveLine: {nonEmpty: true},
    })

    this.editor.setValue(content)
    this.editor.on('changes', this.debounce(() => {
      this.updatePreview()
    }, 500, false))
    this.updatePreview()

    return this
  }

  /* public interface */
  commit(){
    return new Promise((resolve, reject) => {
      this.section.content = this.editor.getValue()
      resolve(this.section)
    })
  }

  /* public interface */
  cancel(){
    return new Promise((resolve, reject) => {
      resolve(this.section)
    })
  }

  /* public interface */
  render(whereToAppend, section){
    let errorCSS = ""
    let markdown = section.content
    try {
      markdown = md.render(markdown)
    } catch (error) {
      console.log(error)
      errorCSS = "error"
    }
    whereToAppend.append(`
        <div data-id="${section.id}" class='section ${errorCSS}'>
           <div class="sectionContent markdownRendering" data-type="cloze">${markdown}</div>
        </div>
      `)
  }

  defaultContent(){
    return null
  }

  updatePreview(){
    let markdown = this.editor.getValue()
    let preview = md.render(markdown)
    document.getElementById(this.previewId).innerHTML = preview
  }

  getValue(){
    return this.editor.getValue()
  }

  render(content){
    return md.render(content)
  }

  debounce(func, wait, immediate) {
    let timeout
    return function () {
      let context = this
      let args = arguments
      let later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      let callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
}
