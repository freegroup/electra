import AbstractToolPolicy from "./AbstractToolPolicy"

import cursor from "../../images/cursors/cursor_circle.png"

export default AbstractToolPolicy.extend({

  TITLE: "Circle",

  init: function () {
    this._super()

    this.center = null
    this.boundingBoxFigure1 = null
    this.boundingBoxFigure2 = null
  },


  onInstall: function (canvas) {
    this._super(canvas)
    canvas.setCursor(cursor)
  },

  onUninstall: function (canvas) {
    this._super(canvas)
    if (this.boundingBoxFigure1 !== null) {
      this.boundingBoxFigure1.setCanvas(null)
      this.boundingBoxFigure1 = null
      this.boundingBoxFigure2.setCanvas(null)
      this.boundingBoxFigure2 = null
    }
    canvas.setCursor(null)
  },


  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   */
  onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
    this.center = new draw2d.geo.Point(x, y)
  },


  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} dx The x diff between start of dragging and this event
   * @param {Number} dy The y diff between start of dragging and this event
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   * @template
   */
  onMouseDrag: function (canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
    let r = Math.sqrt(dx * dx + dy * dy)
    if (this.boundingBoxFigure1 !== null) {
      this.boundingBoxFigure1.setRadius(Math.abs(r))
      this.boundingBoxFigure2.setRadius(Math.abs(r))
    }
    else {
      this.boundingBoxFigure1 = new draw2d.shape.basic.Circle({radius: 1})
      this.boundingBoxFigure1.setCenter(this.center)
      this.boundingBoxFigure1.setCanvas(canvas)
      this.boundingBoxFigure1.setBackgroundColor("#333333")
      this.boundingBoxFigure1.setAlpha(0.1)

      this.boundingBoxFigure2 = new draw2d.shape.basic.Circle({radius: 1})
      this.boundingBoxFigure2.setCenter(this.center)
      this.boundingBoxFigure2.setCanvas(canvas)
      this.boundingBoxFigure2.setStroke(1)
      this.boundingBoxFigure2.setColor(new draw2d.util.Color("#333333"))
      this.boundingBoxFigure2.setBackgroundColor(null)
    }
  },

  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @template
   */
  onMouseUp: function (canvas, x, y) {
    let dx = Math.abs(this.center.x - x)
    let dy = Math.abs(this.center.y - y)
    let r = Math.sqrt(dx * dx + dy * dy)
    if (r > 3) {
      let circle = new shape_designer.figure.PolyCircle(this.center, r)
      let command = new draw2d.command.CommandAdd(canvas, circle, circle.getX(), circle.getY())
      canvas.getCommandStack().execute(command)
      canvas.setCurrentSelection(circle)
    }

    this.center = null
    if (this.boundingBoxFigure1 !== null) {
      this.boundingBoxFigure1.setCanvas(null)
      this.boundingBoxFigure1 = null
      this.boundingBoxFigure2.setCanvas(null)
      this.boundingBoxFigure2 = null
    }
    this.executed()
  }
})




