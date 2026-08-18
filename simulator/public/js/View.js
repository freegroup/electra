import ProbeWindow from "./ProbeWindow"
import ConnectionRouter from "./ConnectionRouter"
import DropInterceptorPolicy from "./DropInterceptorPolicy"
import EditEditPolicy from "./EditEditPolicy"
import ProbeFigure from "./figures/ProbeFigure"
import componentIndex from "../../common/js/ComponentIndex"
import Connection from "./figures/Connection"
import SimulationEditPolicy from "./SimulationEditPolicy"
import markdownDialog from "./dialog/MarkdownDialog"
import inputPrompt from "../../common/js/InputPrompt"
import colors from "../../common/js/Colors"
import toast from "../../common/js/toast"
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
    // OTHER object can read them. Useful for signal handover.
    // Replaced by a fresh object on every simulationStart - this one only exists
    // so that code touching it outside a run never sees undefined.
    this.simulationContext = {}

    this.permissions = permissions
    this.simulate = false
    // read-only viewing mode (set when a document is opened for review):
    // the canvas can be panned/simulated but not edited. Decided at each
    // edit-policy install site (initial below + simulationStop).
    this.readOnly = false
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
    // Selection policy depends on the document: read-only for review, editable
    // otherwise. Same decision is repeated in simulationStop.
    this.installEditPolicy(this.readOnly
      ? new draw2d.policy.canvas.ReadOnlySelectionPolicy()
      : new EditEditPolicy())

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
              case "design": {
                // Edit the variant that applies HERE. The server resolves the
                // component name against the open circuit's scope and hands back
                // a handle (a class's override resolves to itself, the global
                // original elsewhere); then open the designer on that handle.
                // Saving there lands in the caller's own leaf automatically, so
                // this never mutates the shared original in place. Needs no
                // per-figure data, so existing circuits work too.
                let shapeName = figure.attr("userData.file")
                let circuitId = (typeof app !== "undefined" && app.currentFile) ? app.currentFile.id : null
                let params = new URLSearchParams({ name: shapeName })
                if (circuitId) params.set("inScope", circuitId)
                fetch(`../shapes/file/resolve?${params.toString()}`)
                  .then((r) => r.json())
                  .then((res) => {
                    if (res && res.id) {
                      window.open(`../designer?doc=${encodeURIComponent(res.id)}`, "designer")
                    }
                  })
                  .catch((err) => console.log(err))
                break
              }
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

    // Hot-replace: a save in the designer broadcasts "component X changed" to
    // every client (globally). It is only a signal - which version applies to ME
    // is the walk-up for MY open document, not whatever someone else saved.
    //
    // Two guards keep this from disrupting the canvas needlessly:
    //  1) ignore a component this circuit does not use at all,
    //  2) after re-resolving MY context, re-instantiate ONLY if MY winning
    //     version actually changed. A raw scope compare cannot decide this: a
    //     change in a higher-priority scope must still win, so only the walk-up
    //     (via reload) knows. Comparing the entry's uuid before/after is that
    //     answer - unchanged uuid means the save did not affect me, leave the
    //     canvas (and the user's selection) alone.
    socket.on("shape/generated", msg => {
      let name = msg && msg.name
      let before = name ? componentIndex.catalog.find((e) => e.name === name) : null
      if (name && !before) return
      componentIndex.reload()
        .then(() => {
          let after = componentIndex.catalog.find((e) => e.name === name)
          if (before && after && before.uuid === after.uuid) return
          this.reloadFromCache()
        })
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

    // A run starts from an empty context. It is the handover area between
    // shapes - the signal bus and the wireless SignalSource/SignalTarget pairs
    // register their ports in here - and it used to be created once in init()
    // and never cleared again. A second run therefore started with the ports of
    // figures that had been deleted in the meantime, and kept reading values
    // from shapes that were no longer on the canvas.
    this.simulationContext = {}

    this.installEditPolicy(new SimulationEditPolicy())
    this.uninstallEditPolicy(this.connectionPolicy)
    this.uninstallEditPolicy(this.coronaFeedback)
    this.commonPorts.each((i, p) => {
      p.setVisible(false)
    })

    // onPreStart/onStart is shape code and can throw just like calculate().
    // Unguarded, the exception escaped simulationStart and left the canvas
    // stranded halfway into simulation mode: policies swapped, ports hidden,
    // `simulate` still true, and no loop ever started.
    this.getFigures().each( (index, shape) => {
      try {
        shape.onPreStart?.(this.simulationContext)
      } catch(exc){
        this._simulationError(exc, shape)
        return false
      }
    })

    this.getFigures().each( (index, shape) => {
      try {
        shape.onStart?.(this.simulationContext)
      } catch(exc){
        this._simulationError(exc, shape)
        return false
      }
    })

    // _simulationError sets this and has already scheduled the stop, which puts
    // the toolbar back into its "stopped" state. Don't start ticking on top of
    // a run that is already over.
    if (this.simulate === false) {
      return
    }

    this._settle()
    if (this.simulate === false) {
      return
    }

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
    // Restore the edit policy that matches the document: a read-only document
    // (opened for review) must stay read-only after simulation, not become
    // editable.
    if (this.readOnly) {
      
      this.installEditPolicy(new draw2d.policy.canvas.ReadOnlySelectionPolicy())
    } else {
      this.installEditPolicy(new EditEditPolicy())
      this.installEditPolicy(this.connectionPolicy)
      this.installEditPolicy(this.coronaFeedback)
    }

    // Guarded for the same reason as the start hooks. A throw here used to skip
    // the toolbar reset below, leaving the button on "pause" for a simulation
    // that had already stopped. _simulationError only logs in this direction:
    // `simulate` is false by now, so it does not schedule a second stop.
    this.getFigures().each( (index, shape) =>{
      try {
        shape.onStop?.(this.simulationContext)
      } catch(exc){
        this._simulationError(exc, shape)
      }
    })

    this.getFigures().each( (index, shape) =>{
      try {
        shape.onPostStop?.(this.simulationContext)
      } catch(exc){
        this._simulationError(exc, shape)
      }
    })

    $("#simulationStartStop")
      .addClass("play")
      .removeClass("pause")

    $("#editConnections")
      .removeClass("disabled")

    $(".simulationBase").fadeOut("fast")
    $("#paletteElementsOverlay").fadeOut("fast")
  },

  /**
   * Report a failure that happened during a simulation run, and end the run.
   *
   * A tick is driven by a timer, so an escaping exception used to skip the
   * re-arm at the end of _calculate: the simulation was dead, but `simulate`
   * stayed true and the toolbar still showed "pause" - from the outside it just
   * looked like the values had frozen. Every step is guarded now and says so.
   *
   * Stopping beats limping on: a shape that throws feeds garbage into
   * everything downstream, and half-calculated values are harder to make sense
   * of than an honest stop. The console keeps the details, the user gets the
   * NAME of the element that caused it - every figure and connection has one.
   *
   * `simulate` goes false immediately so the tick cannot re-arm; that also
   * marks the run as already-failing, which keeps the later steps of the same
   * tick from stacking up a second stop. The stop itself is deferred by one
   * turn of the event loop so it never runs re-entrantly - neither out of
   * simulationStart nor halfway through a tick.
   */
  _simulationError: function (exc, figure) {
    console.error("simulation error", exc, figure, this.simulationContext)

    if (this.simulate === false) {
      return // already ending this run because of an earlier error
    }
    this.simulate = false

    setTimeout(() => {
      this.simulationStop()
      toast(t("message.simulation_error", {name: figure?.NAME ?? "?"}))
    }, 0)
  },

  /**
   * Let the combinational network find its resting state before the sequential
   * elements start watching for clock edges.
   *
   * Every output port starts at LOW, which is a lie for anything whose resting
   * level is HIGH - a NAND fed from two LOW inputs, for example. That port only
   * publishes its real value once its figure has calculated, one tick later, and
   * a wire adds another tick. Downstream, a flip flop watching that pin sees a
   * genuine LOW->HIGH transition and clocks on it: a two-digit counter whose
   * carry runs through a NAND jumped to 10 the moment it was started.
   *
   * That transition is an artefact of the initial values, not a circuit event.
   * Real hardware has the same moment - the gates settle in nanoseconds after
   * power-up - which is why real designs hold a reset until they have. This is
   * that reset: run transport and calculate until no line changes value any
   * more, with `settling` set on the context so the sequential shapes track
   * levels without acting on them. Runs synchronously, so nothing is painted in
   * between and the user sees no flicker.
   *
   * The fixpoint is normally reached in as many rounds as the longest chain of
   * gates. MAX_ROUNDS caps a circuit that never settles - a ring oscillator is
   * meant to keep changing - and simply hands over to the regular tick.
   */
  _settle: function () {
    let MAX_ROUNDS = 25

    this.simulationContext.settling = true
    try {
      for (let round = 0; round < MAX_ROUNDS; round++) {
        let stable = true

        // read and deliver in one pass, same as the regular tick - so the round
        // that settles the network also leaves every hasChanged flag false
        this.getLines().each( (i, line) => {
          if (!(line instanceof draw2d.Connection)) return
          try {
            let value = line.getSource().getValue()
            if (value !== line.value) {
              stable = false
            }
            line.value = value
            line.getTarget().setValue(value)
          } catch(exc){
            this._simulationError(exc, line)
            return false
          }
        })

        this.getFigures().each( (i, figure) => {
          try {
            figure.calculate?.(this.simulationContext)
          } catch(exc){
            this._simulationError(exc, figure)
            return false
          }
        })

        if (this.simulate === false) {
          return // an error ended the run
        }
        // round 0 has nothing to compare against - line.value is still whatever
        // the previous run left behind.
        if (stable === true && round > 0) {
          break
        }
      }
    }
    finally {
      this.simulationContext.settling = false
    }
  },

  _calculate: function () {
    try {
      // Read every wire from its source port and hand it to the target port, in
      // one pass, BEFORE the shapes calculate.
      //
      // Delivery used to happen in a second pass after calculate, which tore a
      // port's state in half: getValue() answers from the wire (read here),
      // while hasChanged is worked out in setValue (delivered there). A shape
      // calling hasChangedValue() during calculate got a flag describing the
      // PREVIOUS tick's transition next to the CURRENT tick's level. A pulse
      // only one tick wide came out as two falling edges and no rising one.
      // Doing both in the same pass keeps level and flag on the same tick.
      //
      // Propagation is unchanged: the read still happens before calculate, so a
      // shape still sees the outputs of the previous tick and a wire still
      // costs exactly one tick.
      this.getLines().each( (i, line) => {
        // getLines() also returns hand-drawn draw2d.shape.basic.Line figures,
        // which have no ports - skip them, they carry no signal value.
        if (!(line instanceof draw2d.Connection)) return
        try {
          line.value = line.getSource().getValue()
          line.getTarget().setValue(line.value)
          if(line.value === undefined ||  line.value === null){
            // an undriven source paints the wire as "disconnected"
            line.setColor(colors.draw2d.unconnected)
          }
          else {
            line.setColor(line.value ? colors.draw2d.high : colors.draw2d.low)
          }
        } catch(exc){
          // e.g. a shape that replaced getValue() on its port (the signal bus
          // does) and throws, or a connection whose source is gone. Report and
          // break off the tick - `false` ends the each().
          this._simulationError(exc, line)
          return false
        }
      })

      // call the "calculate" method if given to calculate the output-port values
      //
      this.getFigures().each((i, figure) => {
        try{
          figure.calculate?.(this.simulationContext)
        } catch(exc){
          this._simulationError(exc, figure)
          return false
        }
      })

      this.probeWindow.tick(this.timerBase)
    }
    catch(exc){
      // nothing above should reach this - but if it does, it must not take the
      // canvas down with it.
      this._simulationError(exc, null)
    }
    finally {
      // Re-arm. This sits in a finally so that no throw above can skip it and
      // leave the simulation dead while the toolbar still claims it is running.
      // _simulationError sets `simulate` to false, so a failed tick ends here.
      if (this.simulate === true) {
        //     setImmediate(this.animationFrameFunc);
        setTimeout(this.animationFrameFunc, this.timerBase)
      }
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
      // Only signal-carrying Connections have a source port; plain hand-drawn
      // Lines (draw2d.shape.basic.Line) have none - leave their color alone.
      if (!(line instanceof draw2d.Connection)) return
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
