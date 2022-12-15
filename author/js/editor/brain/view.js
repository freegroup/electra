/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Andreas Herz
 */
import ConnectionRouter from "./ConnectionRouter"
import DropInterceptorPolicy from "./DropInterceptorPolicy"
import EditEditPolicy from "./EditEditPolicy"
import conf from "../../configuration"
import Connection from "./figures/Connection"
import SimulationEditPolicy from "./SimulationEditPolicy"

export default draw2d.Canvas.extend({

  init: function (id, permissions) {
    let _this = this

    this._super(id, 6000, 6000)

    this.permissions = permissions
    this.simulate = false
    this.animationFrameFunc = this._calculate.bind(this)

    this.timerBase = 10 // ms calculate every 10ms all elements

    // global context where objects can store data during different simulation steps.
    // OTHER object can read them. Useful for signal handover
    this.simulationContext = {}

    this.setScrollArea("#draw2dCanvasWrapper")

    // register this class as event listener for the canvas
    // CommandStack. This is required to update the state of
    // the Undo/Redo Buttons.
    //
    this.getCommandStack().addEventListener(this)

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
        }),
        // or via click and point
        //
        new draw2d.policy.connection.OrthogonalConnectionCreatePolicy({
          createConnection: createConnection
        })
      ])
    this.installEditPolicy(this.connectionPolicy)

    // show the ports of the elements only if the mouse cursor is close to the shape.
    //
    this.coronaFeedback = new draw2d.policy.canvas.CoronaDecorationPolicy({diameterToBeVisible: 50})
    this.installEditPolicy(this.coronaFeedback)

    // add some SnapTo policy for better shape/figure alignment
    //
    this.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy())
    this.installEditPolicy(new EditEditPolicy())

    // Enable Copy&Paste for figures
    //
    Mousetrap.bindGlobal(['ctrl+c', 'command+c'], () => {
      let primarySelection = this.getSelection().getPrimary()
      if (primarySelection !== null) {
        this.clippboardFigure = primarySelection.clone({excludePorts: true})
        this.clippboardFigure.translate(5, 5)
      }
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


    this.deleteSelectionCallback = () => {
      let selection = this.getSelection()
      this.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape)
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
    }
    Mousetrap.bindGlobal(['del', 'backspace'], this.deleteSelectionCallback)

    this.on("contextmenu", function (emitter, event) {
      let figure = _this.getBestFigure(event.x, event.y)

      // a connection provides its own context menu
      //
      if (figure instanceof draw2d.Connection) {
        return
      }

      if (figure !== null) {
        let x = event.x
        let y = event.y

        let items = {}

        if (figure instanceof CircuitFigure) {
            items = {
              "label": {name: "Attach Label", icon: "x ion-ios-pricetag-outline"},
              "delete": {name: "Delete", icon: "x ion-ios-close-outline"},
            }
        }
        else if (figure instanceof draw2d.shape.basic.Label) {
          items = {
            "delete": {name: "Delete", icon: "x ion-ios-close-outline"}
          }
        }
        else if (figure instanceof draw2d.Port) {
          return
        }
        else {
          items = {
            "label": {name: "Attach Label", icon: "x ion-ios-pricetag-outline"},
            "delete": {name: "Delete", icon: "x ion-ios-close-outline"}
          }
        }

        $.contextMenu({
          selector: 'body',
          events: {
            hide: () => {
              $.contextMenu('destroy')
            }
          },
          callback: $.proxy(function (key, options) {
            switch (key) {
              case "label":
                let text = prompt("Label")
                if (text) {
                  let label = new draw2d.shape.basic.Label({text: text, stroke: 0, x: -20, y: -40})
                  let locator = new draw2d.layout.locator.SmartDraggableLocator()
                  label.installEditor(new LabelInplaceEditor())
                  figure.add(label, locator)
                  Object.defineProperty(figure, "canvas", {configurable: false, writable: false})
                }
                break
              case "delete":
                _this.getCommandStack().execute(new draw2d.command.CommandDelete(figure))
                break
              default:
                break
            }

          }, this),
          x: x,
          y: y,
          items: items
        })
      }
    })

    // hide the figure configuration dialog if the user clicks inside the canvas
    //
    this.on("click", () => {
      $("#figureConfigDialog").hide()
    })
  },

  isSimulationRunning: function () {
    return this.simulate
  },


  /**
   * @method
   * Clear the canvas and stop the simulation. Be ready for the next clean circuit
   * load. Start from the beginning
   */
  clear: function () {
    this.simulationStop()

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
    let type = $(droppedDomNode).data("shape")
    let file = $(droppedDomNode).data("file")
    let figure = new draw2d.shape.basic.Label({
      text: `Unable to load shape '${type}'`,
      color: "#ff0000"
    })
    try {
      figure = eval("new " + type + "();") // jshint ignore:line
      // required to calculate the filepath for markdown/js/shape
      //
      figure.attr("userData.file", file)
    }
    catch(exc){
      console.log(exc)
    }

    // create a command for the undo/redo support
    let command = new draw2d.command.CommandAdd(this, figure, x, y)
    this.getCommandStack().execute(command)
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
    this.commonPorts.each( (i, p) =>{
      p.setVisible(false)
    })

    this.getFigures().each( (index, shape) => {
      shape.onStart(this.simulationContext)
    })

    this._calculate()

    $("#simulationStartStop")
      .addClass("pause")
      .removeClass("play")

    $("#paletteElementsOverlay")
      .fadeIn("fast")
      .height($("#paletteElements").height())
  },

  simulationStop: function () {
    this.simulate = false
    this.commonPorts.each(function (i, p) {
      p.setVisible(true)
    })
    this.installEditPolicy(new EditEditPolicy())
    this.installEditPolicy(this.connectionPolicy)
    this.installEditPolicy(this.coronaFeedback)

    this.getFigures().each( (index, shape) =>{
      shape.onStop(this.simulationContext)
    })

    $("#simulationStartStop")
      .addClass("play")
      .removeClass("pause")
    $("#paletteElementsOverlay").fadeOut("fast")
  },

  _calculate: function () {
    // call the "calculate" method if given to calculate the output-port values
    //
    this.getFigures().each( (i, figure)=> {
      figure.calculate(this.simulationContext)
    })

    // transport the value from outputPort to inputPort
    //
    this.getLines().each( (i, line) => {
      let outPort = line.getSource()
      let inPort = line.getTarget()
      inPort.setValue(outPort.getValue())
      line.setColor(outPort.getValue() ? conf.color.high : conf.color.low)
    })

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
  },

  getBoundingBox: function () {
    let xCoords = []
    let yCoords = []
    this.getFigures().each(function (i, f) {
      let b = f.getOuterBoundingBox()
      xCoords.push(b.x, b.x + b.w)
      yCoords.push(b.y, b.y + b.h)
    })
    this.getLines().each(function (i, f) {
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
