import AbstractToolPolicy from "./AbstractToolPolicy"

import cursor from "../../images/cursors/cursor_text.png"

export default AbstractToolPolicy.extend({


  init: function () {
    this._super()

    this.newFigure = null
  },


  onInstall: function (canvas) {
    this._super(canvas)
    canvas.setCursor(cursor)
  },

  onUninstall: function (canvas) {
    this._super(canvas)
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

  },

  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @template
   */
  onMouseMove: function (canvas, x, y) {
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
  onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
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

      this.newFigure = new shape_designer.figure.ExtLabel({
        text :"Text",
        stroke: 0,
        padding: 5,
        fontSize: 16,
        x: x|0,
        y: y|0
      })

      let command = new draw2d.command.CommandAdd(canvas, this.newFigure, parseInt(x), parseInt(y))
      canvas.getCommandStack().execute(command)
      canvas.setCurrentSelection(this.newFigure)

      // start inplace editing
      //
      setTimeout($.proxy(function () {
        this.newFigure.onDoubleClick()
      }, this), 100)

      this.executed()
  }
})




