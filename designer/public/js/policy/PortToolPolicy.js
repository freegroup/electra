import AbstractToolPolicy from "./AbstractToolPolicy"

import cursor from "../../images/cursors/cursor_port.png"

export default AbstractToolPolicy.extend({

  init: function () {
    this._super()
  },


  onInstall: function (canvas) {
    this._super(canvas)
    canvas.setCursor(cursor)
  },

  onUninstall: function (canvas) {
    this._super(canvas)
    canvas.setCursor(null)
  },


  select: function (canvas, figure) {
    //
    if (!(figure instanceof shape_designer.figure.ExtPort)) {
      return
    }

    this._super(canvas, figure)
  },

  onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
    let figure = canvas.getBestFigure(x, y)

    if (figure === null || figure instanceof shape_designer.figure.ExtPort) {
      this._super(canvas, x, y, shiftKey, ctrlKey)
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

    if (this.mouseDownElement === null || !(this.mouseDownElement instanceof shape_designer.figure.ExtPort)) {
      let command = new draw2d.command.CommandAdd(canvas, new shape_designer.figure.ExtPort(), x, y)
      canvas.getCommandStack().execute(command)
      canvas.setCurrentSelection(command.figure)
      this.executed()
    }
    else {
      this._super(canvas, x, y)
    }
  }
})




