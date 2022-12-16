import MarkerFigure from "../../../../common/js/MarkerFigure"
import FigureConfigDialog from "./dialog/FigureConfigDialog"

export default draw2d.policy.canvas.BoundingboxSelectionPolicy.extend({

  init: function () {
    this._super()
    this.mouseMoveProxy = this._onMouseMoveCallback.bind(this)
    this.configIcon = null
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
  },

  onUninstall: function (canvas) {
    this._super(canvas)

    canvas.off(this.mouseMoveProxy)
  },

  onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {
    if (shiftKey === true && this.mouseDownElement === null) {
      let rx = Math.min(x, this.x)
      let ry = Math.min(y, this.y)
      let rh = Math.abs(y - this.y)
      let rw = Math.abs(x - this.x)
      let raftFigure = new Raft()
      raftFigure.attr({
        x: rx,
        y: ry,
        width: rw,
        height: rh,
        color: "#1c9bab"
      })
      canvas.add(raftFigure)
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
      if (this.configIcon !== null) {
        this.configIcon.remove()
        this.configIcon = null
      }
      return
    }

    let hit = null

    emitter.getFigures().each( (index, figure) =>{
      if (figure.hitTest(event.x, event.y, 40)) {

        hit = figure
        return false
      }
    })

    if (hit !== null && hit.getParameterSettings && hit.getParameterSettings().length > 0) {
      let pos = hit.getBoundingBox().getTopLeft()
      pos = emitter.fromCanvasToDocumentCoordinate(pos.x, pos.y)
      pos.y -= 30

      if (this.configIcon === null) {
        this.configIcon = $("<div class='fa fa-cog' id='configMenuIcon'></div>")
        $("body").append(this.configIcon)
        this.configIcon.on("click",  () => {
          FigureConfigDialog.show(hit, pos)
          this.configFigure = hit
          if (this.configIcon !== null) {
            this.configIcon.remove()
            this.configIcon = null
          }
        })
      }
      this.configIcon.css({top: pos.y, left: pos.x, position: 'absolute'})
    }
    else {
      if (this.configIcon !== null) {
        let x = this.configIcon
        this.configIcon = null
        x.fadeOut(500, () => x.remove())
      }
    }
  }
})
