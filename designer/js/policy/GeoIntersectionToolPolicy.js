import AbstractGeoToolPolicy from "./AbstractGeoToolPolicy"


export default AbstractGeoToolPolicy.extend({

  init: function () {
    this._super()
    this.operation = "intersection"
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

    var figure = canvas.getBestFigure(x, y)

    // check if the user click on a child shape. DragDrop and movement must redirect
    // to the parent
    // Exception: Port's
    while ((figure !== null && figure.getParent() !== null) && !(figure instanceof draw2d.Port)) {
      figure = figure.getParent()
    }

    if (figure !== canvas.getSelection().getPrimary() && figure !== null && figure.isSelectable() === true) {
      if (this.firstFigure === null) {
        this.firstFigure = figure
        this.select(canvas, figure)
        this.setToolText("Select polygon to intersect")
      }
      else {
        this.execute(canvas, this.firstFigure, figure)
        this.firstFigure = null
        this.setToolText("Select polygon to intersect with")
      }
    }
  }


})




