import Split from "split.js";
import reader from "./io/reader"
import writer from "./io/writer"

import View from "./view"
import Palette from "./palette"

import GenericEditor from '../editor'
import { icon } from "../../../../common/js/icons"

export default class Editor extends GenericEditor{

  constructor(type = "brain") {
    super(type)
  }

  inject(section, toolbarHost) {
    super.inject(section, toolbarHost)
    $(".workspace").append(`
          <div class="content editorContainerSelector" " id="draw2dCanvasWrapper">
               <div class="canvas" id="draw2dCanvas" oncontextmenu="return false;">
          </div>
       `)
    // The Run/Stop control lives in the cell toolbar now, not the flyover.
    // Two buttons in one host: view.js flips .play/.pause, and CSS shows exactly
    // one - "Starten" while idle, "Stoppen" while the simulation runs - so the
    // state is obvious. The single click handler toggles either way.
    this.toolbarHost.append(`
          <span class="simulationToggle play" id="simulationStartStop">
            <span class="image-button sim-start">
              ${icon("play")}
              <div data-i18n="common:button.start">Starten</div>
            </span>
            <span class="image-button sim-stop">
              ${icon("square")}
              <div data-i18n="common:button.stop">Stoppen</div>
            </span>
          </span>
    ` )
    if ($.fn && $.fn.localize) this.toolbarHost.find("#simulationStartStop").localize()

    this.view = new View("draw2dCanvas")
    $("#paletteElements")[0].className = '';

    this.palette = new Palette(this.view, "#paletteElements")
    //this.palette.removeClass()

    reader.unmarshal(this.view, section.content)

    this.splitter = Split(['#paletteHeader', '#paletteElementsScroll'], {
                    gutterSize: 10,
                    sizes: [40, 60],
                    minSize: 200,
                    cursor: 'row-resize',
                    direction: 'vertical'
                  })

    this.view.centerDocument()

    $("#simulationStartStop").on("click", () => { this.view.simulationToggle() })
    return this
  }

  commit(){
    this.view.simulationStop()

    return super.commit()
    .then(() => {
      this.resetDOM()
      this.view.getSelection().each((index, item)=>{item.unselect() })
      return new Promise((resolve, reject) => {
        writer.marshal(this.view, (content)=>{
          this.section.content = content
          resolve(this.section)
        })
      })
    })
  }

  cancel(){
    this.view.simulationStop()
    return super.cancel()
    .then(() => {
      this.resetDOM()
      return this.section
    })
  }

  // The cell's flyover "Run": opens the circuit and starts the simulation at
  // once. view.js calls it after inject() via onSimulate.
  getMenu(section){
    return `<div data-id="${section.id}" class="sectionMenuSimulate">${icon("play", { strokeWidth: 2.2 })}</div>`
  }

  startSimulation(){
    this.view.simulationStart()
  }

  /**
   * 
   * @param {*} whereToAppend 
   * @param {*} section 
   * @param {String} mode Either "worksheet" or "solution"
   */
  render(section, mode){
    if (section.content) {
      return `<div style="text-align:center"><img src="${section.content.image}"></div>`
    }

    return `-double click to edit brain`
  }

  resetDOM(){
    this.view.simulationStop()
    this.splitter.destroy()
    $("#paletteElements").html("")
    $("#paletteFilter").html("")
  }
}


