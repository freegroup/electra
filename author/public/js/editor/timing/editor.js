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
   * @param {String} mode Either "worksheet" or "solution"
   */
  render(section, mode){
    let svg = ""
    try { svg = createElement(renderAny("1", JSON.parse(section.content), WaveSkin)).outerHTML }
    catch(exc ){
      console.log(exc)
    }
    return svg
  }

  /**
   * The Editor can append the content in a special way. Maybe working with shadow DOM to hide CSS stuff.
   * 
   */
  append(whereToAppend, content){
    const sectionContent = $(`<div class="sectionContent" data-type="${this.type}"></div>`)
    const host = document.createElement("div")
    const shadowRoot = host.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = content
    sectionContent.append(host)
    whereToAppend.append(sectionContent)
  }


  defaultContent(){
    return `
{ "signal": [
    ["RS-Latch",
      { "name": "S", "wave": "010..10." },
      { "name": "R", "wave": "0..10..1" },
      { "name": "Q", "wave": "01.0.1.0" },
      { "name": "Q̅", "wave": "10.1.0.1" }
    ],
    {},
    ["D-Flipflop",
      { "name": "CLK",  "wave": "P.......", "node": "...a...." },
      { "name": "D",    "wave": "0.1.010." , "phase": -0.2},
      { "name": "Q",    "wave": "0..1.010", "node": "...b...." },
      { "name": "Q̅",    "wave": "1..0.101" }
    ],
      {},
     { "name": "Signal","wave": "l.H.LHLH" },
    {},
    { "name": "DATA[7:0]", "wave": "3.4.5.3.", "data": ["0x0F", "0xA0", "0x55", "0x0F"] }
  ],
  "edge": [ "a~>b t_CO" ],
  "config": { "hscale": 2 },
  "head": { "text": "Flipflops / Latch" }
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
