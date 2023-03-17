import ProbeWindow from "./ProbeWindow"
import ConnectionRouter from "./ConnectionRouter"
import DropInterceptorPolicy from "./DropInterceptorPolicy"
import EditEditPolicy from "./EditEditPolicy"
import ProbeFigure from "./figures/ProbeFigure"
import conf from "./Configuration"
import Connection from "./figures/Connection"
import SimulationEditPolicy from "./SimulationEditPolicy"
import markdownDialog from "./dialog/MarkdownDialog"
import inputPrompt from "../../common/js/InputPrompt"
import colors from "../../common/js/Colors"
import figureConfigDialog from "./dialog/FigureConfigDialog"

import hardware from "./hardware"

import imgConnectionStatusNeutral from "../images/status_index.svg"
import imgConnectionStatusTrue from "../images/status_index_true.svg"
import imgConnectionStatusFalse from "../images/status_index_false.svg"

require("bootstrap-toggle/css/bootstrap-toggle.min.css")
require("bootstrap-toggle/js/bootstrap-toggle.min")


export default draw2d.Canvas.extend({

  init: function (id, permissions) {
    this._super(id, 6000, 6000)

    this.probeWindow = new ProbeWindow(this)

    // global context where objects can store data during different simulation steps.
    // OTHER object can read them. Useful for signal handover
    this.simulationContext = {}

    this.permissions = permissions
    this.simulate = false
    this.animationFrameFunc = this._calculate.bind(this)
    this.timerBase = 10 // ms calculate every 10ms all elements

    this.setScrollArea("#draw2dCanvasWrapper")

    // register this class as event listener for the canvas
    // CommandStack. This is required to update the state of
    // the Undo/Redo Buttons.
    //
    this.getCommandStack().on("change", this)

    let router = new ConnectionRouter()
    router.abortRoutingOnFirstVertexNode = false
    let createConnection = this.createConnection = (sourcePort, targetPort) => {
      let c = new Connection({
        color: "#000000",
        router: router,
        stroke: 1.5,
        radius: 2
      })
      if (sourcePort) {
        c.setSource(sourcePort)
        c.setTarget(targetPort)
      }
      c.on("connect", (emitter, event)=>{
        emitter.attr("stroke", event.port.getSemanticGroup()==="Image"?4:1.5)
      })
      return c
    }

    this.installEditPolicy(new DropInterceptorPolicy())

    // install a Connection create policy which matches to a "circuit like"
    // connections
    //
    this.connectionPolicy = new draw2d.policy.connection.ComposedConnectionCreatePolicy(
      [
        // create a connection via Drag&Drop of ports
        //
        new draw2d.policy.connection.DragConnectionCreatePolicy({
          createConnection: createConnection
        })
      ])
    this.installEditPolicy(this.connectionPolicy)

    // show the ports of the elements only if the mouse cursor is close to the shape.
    //
    this.coronaFeedback = new draw2d.policy.canvas.CoronaDecorationPolicy({diameterToBeVisible: 50})
    this.installEditPolicy(this.coronaFeedback)

    // nice grid decoration for the canvas paint area
    //
    //this.grid = new draw2d.policy.canvas.ShowGridEditPolicy(20)
    this.grid = new draw2d.policy.canvas.ShowDotEditPolicy(15)
    // HACK
    this.grid.dotColor.rgba = ()=> "rgba(var(--border-color))"
    this.installEditPolicy(this.grid)

    // add some SnapTo policy for better shape/figure alignment
    //
    this.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy())
    this.installEditPolicy(new EditEditPolicy())

    // Enable Copy&Paste for figures
    //
    Mousetrap.bindGlobal(['ctrl+c', 'command+c'], () => {
      // ctrl+c and ctrl+v works just for normal figures and not connections
      //
      this.getSelection().each( (i, figure)=>{
        if (figure instanceof CircuitFigure) {
          this.clippboardFigure = figure.clone({excludePorts: true})
          this.clippboardFigure.translate(5, 5)
          return false
        }
      })
      return false
    })
    Mousetrap.bindGlobal(['ctrl+v', 'command+v'], () => {
      if (this.clippboardFigure !== null) {
        let cloneToAdd = this.clippboardFigure.clone({excludePorts: true})
        let command = new draw2d.command.CommandAdd(this, cloneToAdd, cloneToAdd.getPosition())
        this.getCommandStack().execute(command)
        this.setCurrentSelection(cloneToAdd)
      }
      return false
    })
    Mousetrap.bindGlobal(['left'], (event) => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(-diff, 0)
      })
      return false
    })
    Mousetrap.bindGlobal(['up'], (event) => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(0, -diff)
      })
      return false
    })
    Mousetrap.bindGlobal(['right'], (event) => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(diff, 0)
      })
      return false
    })
    Mousetrap.bindGlobal(['down'], (event) => {
      let diff = this.getZoom(8) < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(0, diff)
      })
      return false
    })
    Mousetrap.bindGlobal(['h'], (event) => {
      this.getLines().each( (i,line)=>{
        line.setAlpha(0.1)
      })
      this.getSelection().each((i, f) => {
        f.getPorts().each((i, port) =>{
          port.getConnections().each( (i,con)=>{
            con.setAlpha(1)
          })
        })
      })
      return false
    },"keydown")
    Mousetrap.bindGlobal(['h'], (event) => {
      this.getLines().each( (i,line)=>{
        line.setAlpha(1)
      })
      return false
    },"keyup")

    let setZoom = (newZoom) => {
      let bb = this.getBoundingBox().getCenter()
      let c = $("#draw2dCanvasWrapper")
      this.setZoom(newZoom)
      this.scrollTo((bb.y / newZoom - c.height() / 2), (bb.x / newZoom - c.width() / 2))
    }

    // ZoomIn Button and the callbacks
    //
    $("#canvas_zoom_in").on("click", () => {
      setZoom(this.getZoom() * 1.2)
    })

    // OneToOne Button
    //
    $("#canvas_zoom_normal").on("click", () => {
      setZoom(1.0)
    })

    //ZoomOut Button and the callback
    //
    $("#canvas_zoom_out").on("click", () => { 
      setZoom(this.getZoom() * 0.8)
    })

    hardware.arduino.on("disconnect", this.hardwareChanged.bind(this))
    hardware.arduino.on("connect", this.hardwareChanged.bind(this))

    this.on("contextmenu", (emitter, event) => {
      let figure = this.getBestFigure(event.x, event.y)

      // a connection provides its own context menu
      //
      if (figure instanceof draw2d.Connection) {
        return
      }
      if (figure instanceof ProbeFigure) {
        return
      }

      if (figure !== null) {
        let {x,y} = event
        let items = {}

        if (figure instanceof CircuitFigure) {
          if(this.permissions.shapes.global.update) {
            items = {
              "label": {name: t("contextmenu.add_label")},
              "delete": {name: t("contextmenu.delete")},
              "sep1": "---------",
              "design": {name: t("contextmenu.open_designer")},
              "help": {name: t("contextmenu.description")}
            }
          }
          else {
            items = {
              "label": {name: t("contextmenu.add_label")},
              "delete": {name: t("contextmenu.delete")},
              "sep1": "---------",
              "design": {name: t("contextmenu.open_designer")},
              "help": {name: t("contextmenu.description")}
            }
          }

          let figureEntries = figure.getContextMenuEntries()
          if(figureEntries){
            items = {...items, "sep3": "---------", ...figureEntries}
          }
        } else if (figure instanceof draw2d.shape.basic.Label) {
          items = {
            "delete": {name: t("contextmenu.delete")}
          }
        } else if (figure instanceof draw2d.Port) {
          return
        } else {
          items = {
            "label": {name: t("contextmenu.add_label")},
            "help": {name: t("contextmenu.description")},
            "sep1": "---------",
            "delete": {name: t("contextmenu.delete")}
          }
        }

        $.contextMenu({
          selector: 'body',
          events: {
            hide: () => {
              $.contextMenu('destroy')
            }
          },
          callback: (key, options) => {
            switch (key) {
              case "label":
                inputPrompt.show(t("dialog.add_label"), t("label.label"))
                .then( value => {
                  let label = new draw2d.shape.basic.Label({text: value, stroke: 0, x: -20, y: -40})
                  let locator = new draw2d.layout.locator.SmartDraggableLocator()
                  label.installEditor(new LabelInplaceEditor())
                  figure.add(label, locator)
                })
                break
              case "design":
                let scope = figure.attr("userData.scope")
                let shapeName = figure.attr("userData.file")
                window.open(`../designer?${scope}=${shapeName}`, "designer")
                break
              case "help":
                markdownDialog.show(figure)
                break
              case "delete":
                this.getCommandStack().execute(new draw2d.command.CommandDelete(figure))
                break
              default:
                figure.executeContextMenuEntry(key, x, y)
                break
            }
          },
          x: x,
          y: y,
          items: items
        })
      }
    })

    // close the figure configuration dialog if the user clicks inside the canvas
    //
    this.on("click", figureConfigDialog.close )

    // only responsible to reload the code and the current document
    // (the palette.js did its own job and refresh palette entry if required)
    socket.on("shape/generated", msg => {
      $.getScript(conf.shapes[msg.scope].file(msg.jsPath),
        this.reloadFromCache.bind(this)
      )
    })

    this.slider = $('#simulationBaseTimer')
      .slider({id: "simulationBaseTimerSlider"})
      .on("slide", (event) => {
        //       Slider   timerBase
        //        A,B       a,b
        // min = 50     => 100ms
        // norm= 100    => 10ms ticks
        // max = 500    =>  2ms ticks
        //
        // To map between the different intervals
        // [A, B] --> [a, b]
        // use this formula
        //                   (val - A)*(b-a)
        // timerbase = b -  ----------------
        //                      (B-A) + a
        //
        if (event.value < 100) {
          this.timerBase = parseInt(100 - ((event.value - 50) * (100 - 10) / (100 - 50) + 10))
        } else {
          this.timerBase = parseInt(11 - ((event.value - 100) * (10 - 2) / (500 - 100) + 2))
        }
      })
  },

  isSimulationRunning: function () {
    return this.simulate
  },


  getTimerBase: function () {
    return this.timerBase
  },

  setTimerBase: function (timerBase) {
    this.timerBase = timerBase

    if (this.timerBase > 10)
      this.slider.slider("setValue", -((timerBase - 100) * ((100 - 50) + 10)) / (100 - 10) + 50)
    else
      this.slider.slider("setValue", (((-(timerBase - 11) - 2) * (500 - 100)) / (10 - 2)) + 100)
  },

  deleteSelection: function(){
    this.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape)
    let selection = this.getSelection()
    selection.each((index, figure) => {

      // Don't delete the connection if the source or target node part of the
      // selection. In this case the nodes deletes all connections by itself.
      //
      if (figure instanceof draw2d.Connection) {
        if (selection.contains(figure.getSource().getRoot()) || selection.contains(figure.getTarget().getRoot())) {
          return
        }
      }

      let cmd = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE))
      if (cmd !== null) {
        this.getCommandStack().execute(cmd)
      }
    })
    // execute all single commands at once.
    this.getCommandStack().commitTransaction()
  },

  /**
   * @method
   * Clear the canvas and stop the simulation. Be ready for the next clean circuit
   * load. Start from the beginning
   */
  clear: function () {
    this.simulationStop()
    this.probeWindow.resetProbes()
    this._super()

    this.centerDocument()
  },

  /**
   * Disable snapTo GRID if we have select more than one element
   * @param figure
   * @param pos
   */
  snapToHelper: function (figure, pos) {
    if (this.getSelection().getSize() > 1) {
      return pos
    }
    return this._super(figure, pos)
  },

  /**
   * @method
   * Called if the user drop the droppedDomNode onto the canvas.<br>
   * <br>
   * Draw2D use the jQuery draggable/droppable lib. Please inspect
   * http://jqueryui.com/demos/droppable/ for further information.
   *
   * @param {HTMLElement} droppedDomNode The dropped DOM element.
   * @param {Number} x the x coordinate of the drop
   * @param {Number} y the y coordinate of the drop
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @private
   **/
  onDrop: function (droppedDomNode, x, y, shiftKey, ctrlKey) {

    let displayName = $(droppedDomNode).data("displayname")
    let name = $(droppedDomNode).data("name")
    let file = $(droppedDomNode).data("file")
    let scope = $(droppedDomNode).data("scope")

    // Track the drop event using GTM
    if(dataLayer){
      dataLayer?.push({ 'event': 'dropped_figure', 'droppedData': name})
    }

    let figure = null
    try {
      figure = eval(`new ${name}();`) // jshint ignore:line
      // required to calculate the filepath for markdown/js/shape
      //
      figure.attr("userData.displayName", displayName)
      figure.attr("userData.file", file)
      figure.attr("userData.scope", scope)
    }
    catch(exc){
      console.log(exc)
      figure = new draw2d.shape.basic.Label({
        text: t("message.unable_to_load_element", {name}),
        color: "#ff0000"
      })
    }
    this.getCommandStack().execute(new draw2d.command.CommandAdd(this, figure, x, y))
  },
  
  simulationToggle: function () {
    if (this.simulate === true) {
      this.simulationStop()
    } else {
      this.simulationStart()
    }
  },

  simulationStart: function () {
    if (this.simulate === true) {
      return // silently
    }

    this.simulate = true

    this.installEditPolicy(new SimulationEditPolicy())
    this.uninstallEditPolicy(this.connectionPolicy)
    this.uninstallEditPolicy(this.coronaFeedback)
    this.commonPorts.each((i, p) => {
      p.setVisible(false)
    })

    this.getFigures().each( (index, shape) => {
      shape.onPreStart?.(this.simulationContext)
    })

    this.getFigures().each( (index, shape) => {
      shape.onStart?.(this.simulationContext)
    })

    this.probeWindow.update()
    this._calculate()
    
    $("#simulationStartStop")
      .addClass("pause")
      .removeClass("play")

    $("#editConnections")
      .addClass("disabled")

    $(".simulationBase").fadeIn("fast")

    $("#paletteElementsOverlay")
      .fadeIn("fast")
      .height($("#paletteElements").height())
  },

  simulationStop: function () {
    this.simulate = false
    this.commonPorts.each( (i, p) => {
      p.setVisible(true)
    })
    this.installEditPolicy(new EditEditPolicy())
    this.installEditPolicy(this.connectionPolicy)
    this.installEditPolicy(this.coronaFeedback)

    this.getFigures().each( (index, shape) =>{
      shape.onStop?.(this.simulationContext)
    })

    this.getFigures().each( (index, shape) =>{
      shape.onPostStop?.(this.simulationContext)
    })
    
    $("#simulationStartStop")
      .addClass("play")
      .removeClass("pause")

    $("#editConnections")
      .removeClass("disabled")

    $(".simulationBase").fadeOut("fast")
    $("#paletteElementsOverlay").fadeOut("fast")
  },

  _calculate: function () {
    // transport the value from outputPort to inputPort
    //
    this.getLines().each( (i, line) => {
      line.value = line.getSource().getValue()
      if(line.value === undefined ||  line.value === null){
        // do not transfer the value if the source is "disconnected"
        line.setColor(colors.draw2d.unconnected)
      }
      else {
        line.setColor(line.value ? colors.draw2d.high : colors.draw2d.low)
      }
    })

    // call the "calculate" method if given to calculate the output-port values
    //
    this.getFigures().each((i, figure) => {
      try{
        figure.calculate?.(this.simulationContext)
      } catch(exc){
        console.log(exc)
        console.log(figure, this.simulationContext)
      }
    })

    // transport the value from outputPort to inputPort
    //
    this.getLines().each( (i, line) => {
      line.getTarget().setValue(line.value)
    })

    this.probeWindow.tick(this.timerBase)

    if (this.simulate === true) {
      //     setImmediate(this.animationFrameFunc);
      setTimeout(this.animationFrameFunc, this.timerBase)
    }
  },

  /**
   * @method
   * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
   * can be used to identify the type of event which has occurred.
   *
   * @template
   *
   * @param {draw2d.command.CommandStackEvent} event
   **/
  stackChanged: function (event) {
    if (event.isPreChangeEvent()) {
      return // silently
    }

    $("#editUndo").addClass("disabled")
    $("#editRedo").addClass("disabled")

    if (event.getStack().canUndo()) {
      $("#editUndo").removeClass("disabled")
    }

    if (event.getStack().canRedo()) {
      $("#editRedo").removeClass("disabled")
    }

    this.hardwareChanged()
  },

  hardwareChanged: function () {
    // check if a new element is added which requires or provides special hardware
    // support. In this case we can update the UI with some status indicator
    //
    let elements = this.getFigures().clone().asArray()
    elements = elements.filter(element => element.getRequiredHardware)
    let arduinoRequired = elements.reduce((sum, cur) => sum || cur.getRequiredHardware().arduino, false)
    let arduinoConnected = hardware.arduino.connected

    // Set the status of top button for the pulldown menu.
    //
    if (arduinoRequired === false) {
      $("#editConnections").attr("src", imgConnectionStatusNeutral)
    } else {
      let error = (arduinoRequired === true && arduinoConnected === false)
      $("#editConnections").attr("src", error ? imgConnectionStatusFalse : imgConnectionStatusTrue)
    }

    // set the status indicator for the arduino webusb connections
    //
    if (arduinoConnected) {
      $("#statusWebUSB").removeClass("error")
    } else {
      $("#statusWebUSB").addClass("error")
    }
  },

  getBoundingBox: function () {
    let xCoords = []
    let yCoords = []
    this.getFigures().each( (i, f) => {
      let b = f.getBoundingBox()
      xCoords.push(b.x, b.x + b.w)
      yCoords.push(b.y, b.y + b.h)
    })
    this.getLines().each((i, f) => {
      let b = f.getBoundingBox()
      xCoords.push(b.x, b.x + b.w)
      yCoords.push(b.y, b.y + b.h)
    })
    let minX = Math.min.apply(Math, xCoords)
    let minY = Math.min.apply(Math, yCoords)
    let width = Math.max(100, Math.max.apply(Math, xCoords) - minX)
    let height = Math.max(100, Math.max.apply(Math, yCoords) - minY)

    return new draw2d.geo.Rectangle(minX, minY, width, height)
  },

  showDecoration: function(){
    this._super()

    // update the colors of the connections to the real state of the outputPorts.
    // This is required after loading a brain. In this case an unpredictable state of the connections is visible.
    // Fix this by using the real values of the ports.
    this.getLines().each( (i, line) => {
      let outPort = line.getSource()
      let value = outPort.getValue()
      if(value === undefined ||  value === null){
        line.setColor(colors.draw2d.unconnected)
      }
      else {
        line.setColor(value ? colors.draw2d.high : colors.draw2d.low)
      }
    })
  },

  /**
   * Reload the canvas. This is required when a shapes has changed by the designer.
   * Implementation or representation must be reloaded
   */
  reloadFromCache: function () {
    new draw2d.io.json.Writer().marshal(this, json => {
      draw2d.Canvas.prototype.clear.call(this)
      new draw2d.io.json.Reader().unmarshal(this, json)
      // update the probeWindow with the ne serialized objects
      //
      this.probeWindow.update()
    })
  },


  centerDocument: function () {
    this.setZoom(1.0)

    let c = $("#draw2dCanvasWrapper")
    if (this.getFigures().getSize() > 0) {
      // get the bounding box of the document and translate the complete document
      // into the center of the canvas. Scroll to the top left corner after them
      //
      let bb = this.getBoundingBox()
      this.scrollTo(bb.y - c.height() / 2 + bb.h / 2, bb.x - c.width() / 2 + bb.w / 2)
    } else {
      let bb = {
        x: this.getWidth() / 2,
        y: this.getHeight() / 2
      }
      this.scrollTo(bb.y - c.height() / 2, bb.x - c.width() / 2)
    }
  },

  toggleFullScreen: function() {
    var doc = window.document;
    var docEl = doc.documentElement;
  
    var requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    var cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;
  
    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  },

  calculateConnectionIntersection : function(){
    this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList()
  },
  
  /**
   * @method
   * Transforms a document coordinate to canvas coordinate.
   *
   * @param {Number} x the x coordinate relative to the window
   * @param {Number} y the y coordinate relative to the window
   *
   * @returns {draw2d.geo.Point} The coordinate in relation to the canvas [0,0] position
   */
  fromDocumentToCanvasCoordinate: function (x, y) {
    return new draw2d.geo.Point(
      (x - this.getAbsoluteX()) * this.zoomFactor,
      (y - this.getAbsoluteY()) * this.zoomFactor)
  },

  /**
   * @method
   * Transforms a canvas coordinate to document coordinate.
   *
   * @param {Number} x the x coordinate in the canvas
   * @param {Number} y the y coordinate in the canvas
   *
   * @returns {draw2d.geo.Point} the coordinate in relation to the document [0,0] position
   */
  fromCanvasToDocumentCoordinate: function (x, y) {
    return new draw2d.geo.Point(
      ((x * (1 / this.zoomFactor)) + this.getAbsoluteX()),
      ((y * (1 / this.zoomFactor)) + this.getAbsoluteY()))
  }
})
