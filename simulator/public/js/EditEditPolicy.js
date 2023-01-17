import MarkerFigure from "../../common/js/MarkerFigure"
import FigureConfigDialog from "./dialog/FigureConfigDialog"

export default draw2d.policy.canvas.BoundingboxSelectionPolicy.extend({

  init: function () {
    this._super()
    this.mouseMoveProxy = this._onMouseMoveCallback.bind(this)
    this.deleteFigureProxy = this._onDeleteFigureCallback.bind(this)

    this.configIcon  = null
    this.configFigure = null
  },

  /**
   * @method
   * Called by the canvas if the user click on a figure.
   *
   * @param {draw2d.Figure} the figure under the click event. Can be null
   * @param {Number} mouseX the x coordinate of the mouse during the click event
   * @param {Number} mouseY the y coordinate of the mouse during the click event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @since 3.0.0
   */
  onClick: function (figure, mouseX, mouseY, shiftKey, ctrlKey) {
    // we only forward the click-event to the MarkerFigure which the user can show hide per
    // default
    // lt in the edit mode as well.
    if (figure instanceof MarkerFigure) {
      this._super(figure, mouseX, mouseY, shiftKey, ctrlKey)
    }
  },

  onInstall: function (canvas) {
    this._super(canvas)

    // provide configuration menu if the mouse is close to a shape
    //
    canvas.on("mousemove", this.mouseMoveProxy)

    // check whenever the deleted figure is currently in the "config" mode. In this case
    // the config icon must be deleted instantly
    //
    canvas.on("figure:remove", this.deleteFigureProxy)
  },

  onUninstall: function (canvas) {
    this._super(canvas)

    canvas.off(this.mouseMoveProxy)
    canvas.off(this.deleteFigureProxy)
  },

  onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {
    if (shiftKey === true && this.mouseDownElement === null) {
      let rx = Math.min(x, this.x)
      let ry = Math.min(y, this.y)
      let rh = Math.max(30, Math.abs(y - this.y))
      let rw = Math.max(30, Math.abs(x - this.x))
      let raftFigure = new Raft()
      raftFigure.attr({
        x: rx,
        y: ry,
        width: rw,
        height: rh,
        color: "#1c9bab"
      })
      canvas.getCommandStack().execute(new draw2d.command.CommandAdd(canvas, raftFigure, rx, ry))
      this.boundingBoxFigure1.setCanvas(null)
      this.boundingBoxFigure1 = null
      this.boundingBoxFigure2.setCanvas(null)
      this.boundingBoxFigure2 = null
    }
    else {
      this._super(canvas, x, y, shiftKey, ctrlKey)
    }
  },

  _onMouseMoveCallback: function (emitter, event) {
    // there is no benefit to show decorations during Drag&Drop of an shape
    //
    if (this.mouseMovedDuringMouseDown === true) {
      this.configIcon?.remove()
      this.configIcon = null
      this.configFigure = null
      return
    }

    let hit =  emitter.getFigures().find( (figure) => {
      // "cast" undefined to false
      return false || (figure.getParameterSettings?.().length>0 && figure.hitTest(event.x, event.y, 40))
    })

    if (hit) {
      let pos = hit.getBoundingBox().getTopLeft()
      pos = emitter.fromCanvasToDocumentCoordinate(pos.x, pos.y)
      pos.y -= 30
      this.configFigure = hit
      if (this.configIcon === null) {
        this.configIcon = $("<div id='configMenuIcon'>&#9881;</div>")
        $("body").append(this.configIcon)
        this.configIcon.on("click",  () => {
          FigureConfigDialog.show(this.configFigure, pos)
          this.configIcon?.remove()
          this.configIcon = null
        })
      }
      this.configIcon.css({top: pos.y, left: pos.x, position: 'absolute'})
    }
    else {
      if (this.configIcon !== null) {
        let x = this.configIcon
        this.configIcon = null
        this.configFigure = null
        x.fadeOut(500, () => x.remove())
      }
    }
  },

  _onDeleteFigureCallback: function(emitter, event){
    if(event.figure === this.configFigure){
      this.configFigure = null
      this.configIcon?.remove()
    }
  }
})
