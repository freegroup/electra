import 'codemirror/lib/codemirror.css'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/active-line.js'

let WaveDrom = require('wavedrom');
let WaveSkin = require('wavedrom/skins/default.js')

const renderAny = require('wavedrom/lib/render-any');
const createElement = require('wavedrom/lib/create-element');

import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="timing") {
    super(type)
  }

  /* public interface */
  inject(section) {
    super.inject(section)
    let content = section.content
    $(".sections .activeSection .sectionContent").html(`
              <div class="editorContainerSelector" id="editor-timing">
                <div class="top">
                  <textarea id="timingEditor"></textarea>
                </div>
                <div class="bottom" id="timingPreview">
                </div>
              </div>
                `)

    this.editorId = "timingEditor"
    this.previewId = "timingPreview"

    this.editor = CodeMirror.fromTextArea(document.getElementById(this.editorId), {
      lineNumbers: true,
      mode: 'javascript',
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
    .then(() => {
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
    let svg = ""
    try { svg = createElement(renderAny("1", JSON.parse(section.content), WaveSkin)).outerHTML }
    catch(exc ){
      console.log(exc)
    }
    return `
    <div class="sectionContent" data-type="${section.type}">
    ${svg}
    </div>`
  }

  defaultContent(){
    return `

{ "signal" : [
    { "name": "clk1",  "wave": "P.....H......" },
    { "name": "clk2",  "wave": "d............" },
    { "name": "bus1",  "wave": "x....=..=.=x.",   "data": "head body tail" },
    { "name": "bus1",  "wave": "x.3..4.5x....",   "data": "head body tail" },
    { "name": "wire",  "wave": "0....1..0..1." },
    { "name": "wire",  "wave": "l....h...L.H." }
  ],
  "config": { 
    "hscale": 2 
  }
}
  
`
  }

  updatePreview(){
    try{
      let value = this.editor.getValue()
      let json = JSON.parse(value)
      let svg = createElement(renderAny("1",json, WaveSkin)).outerHTML
      document.getElementById(this.previewId).innerHTML = svg
    }
    catch(exc){
      console.log(exc)
    }
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
