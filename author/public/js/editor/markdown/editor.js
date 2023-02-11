import 'codemirror/lib/codemirror.css'
import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm.js'
import 'codemirror/addon/selection/active-line.js'
let md = require('markdown-it')()
md.use(require("markdown-it-asciimath"))
md.use(require('markdown-it-container'), "info")

import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="markdown") {
    super(type)
    this.md = md
  }

  /* public interface */
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
    this.editor.on('changes', this.debounce(()=>{this.updatePreview()}, 500, false))
    this.updatePreview()

    return this
  }

  /* public interface */
  commit(){
    return super.commit()
    .then((r) => {
      this.section.content = this.editor.getValue()
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
    return `<div class="sectionContent markdownRendering${errorCSS}" data-type="${section.type}">${markdown}</div>`
  }

  defaultContent(){
    return `
# Welcome to the Markdown Editor!

With this editor, you can format your text using simple syntax.

# Headings
## Subheadings

*Italic* and **Bold** text

- Bullet points

`
  }

  updatePreview(){
    let markdown = this.editor.getValue()
    let preview = this.md.render(markdown)
    document.getElementById(this.previewId).innerHTML = preview
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
