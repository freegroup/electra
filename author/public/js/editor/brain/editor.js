import Split from "split.js";
import reader from "./io/reader"
import writer from "./io/writer"

import View from "./view"
import Palette from "./palette"

export default class Editor {

  constructor() {
  }

  inject(section) {
    this.section = section
    let menu = $(".activeSection .tinyFlyoverMenu")
    $(".workspace").append(`
          <div class="content editorContainerSelector" " id="draw2dCanvasWrapper">
               <div class="canvas" id="draw2dCanvas" oncontextmenu="return false;">
          </div>
       `)
    menu.prepend(`
          <a href="#" class="morph_btn play" id="simulationStartStop">
            <span>
              <span class="s1"></span>
              <span class="s2"></span>
              <span class="s3"></span>
            </span>
          </a>
    ` )

    $("#draw2dCanvasWrapper").append(menu)

    this.view = new View("draw2dCanvas")
    this.palette = new Palette(this.view, "#paletteElements")

    reader.unmarshal(this.view, section.content)

    this.splitter = Split(['#paletteHeader', '#paletteElementsScroll'], {
                    gutterSize: 10,
                    sizes: [40, 60],
                    minSize: 200,
                    cursor: 'row-resize',
                    direction: 'vertical'
                  })

    this.view.centerDocument()

    $("#simulationStartStop").on("click", () => { this.view.simulationToggle()})
    return this
  }

  commit(){
    this.view.simulationStop()
    return new Promise((resolve, reject) => {
      this._resetDOM()
      this.view.getSelection().each((index, item)=>{
         item.unselect()
      })
      writer.marshal(this.view, (content)=>{
        this.section.content = content
        resolve(this.section)
      })
    })
  }

  cancel(){
    this.view.simulationStop()
    return new Promise((resolve, reject) => {
      this._resetDOM()
      resolve(this.section)
    })
  }

  _resetDOM(){
    this.view.simulationStop()
    this.splitter.destroy()
    $("#paletteElements").shuffle("destroy")
    $("#paletteElements").html("")
    $("#paletteFilter").html("")
  }

}
