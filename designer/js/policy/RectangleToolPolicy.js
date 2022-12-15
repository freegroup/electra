import PolyRect from "../figure/PolyRect"
import AbstractToolPolicy from "./AbstractToolPolicy"
import cursor from "../../images/cursors/cursor_rectangle.png"

export default AbstractToolPolicy.extend({

  init: function () {
    this._super()

    this.topLeftPoint = null
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
    this.topLeftPoint = new draw2d.geo.Point(x, y)
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

    if (this.boundingBoxFigure1 === null) {
      this.boundingBoxFigure1 = new draw2d.shape.basic.Rectangle({
        width: 1,
        height: 1,
        x: this.topLeftPoint.x,
        y: this.topLeftPoint.y,
        bgColor: "#d4d1d4",
        alpha: 0.1
      });
      this.boundingBoxFigure1.setCanvas(canvas);

      this.boundingBoxFigure2 = new draw2d.shape.basic.Rectangle({
        width: 1,
        height: 1,
        x: this.topLeftPoint.x,
        y: this.topLeftPoint.y,
        dash: "--..",
        stroke: 0.5,
        color: "#37a8ff",
        bgColor: null
      });
      this.boundingBoxFigure2.setCanvas(canvas);
    }

    if (this.boundingBoxFigure1 !== null) {
      this.boundingBoxFigure1.setDimension(Math.abs(dx), Math.abs(dy));
      this.boundingBoxFigure1.setPosition(this.topLeftPoint.x + Math.min(0, dx), this.topLeftPoint.y + Math.min(0, dy));
      this.boundingBoxFigure2.setDimension(Math.abs(dx), Math.abs(dy));
      this.boundingBoxFigure2.setPosition(this.topLeftPoint.x + Math.min(0, dx), this.topLeftPoint.y + Math.min(0, dy));
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
    if (this.boundingBoxFigure1 !== null) {
      this.boundingBoxFigure1.setCanvas(null);
      this.boundingBoxFigure1 = null;
      this.boundingBoxFigure2.setCanvas(null);
      this.boundingBoxFigure2 = null;
    }

    let bottomRight = new draw2d.geo.Point(x, y)
    if (this.topLeftPoint.distance(bottomRight) > 3) {
      let rect = new PolyRect(this.topLeftPoint, bottomRight)
      let command = new draw2d.command.CommandAdd(canvas, rect, rect.getX(), rect.getY())
      canvas.getCommandStack().execute(command)
      canvas.setCurrentSelection(rect)
    }
    this.executed()
    this.topLeftPoint = null
  }
})




