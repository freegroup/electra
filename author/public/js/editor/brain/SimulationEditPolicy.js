export default draw2d.policy.canvas.ReadOnlySelectionPolicy.extend({


  init: function () {
    this._super();
    this.mouseDownElement = null;
  },


  onInstall: function (canvas) {
    canvas.getFigures().each(function (index, shape) {
      shape.onStart();
    });
  },


  onUninstall: function (canvas) {
    canvas.getFigures().each(function (index, shape) {
      shape.onStop();
    });
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
    var figure = canvas.getBestFigure(x, y);

    // may the figure is assigned to a composite. In this case the composite can
    // override the event receiver
    while (figure !== null) {
      var delegated = figure.getSelectionAdapter()();
      if (delegated === figure) {
        break;
      }
      figure = delegated;
    }

    // ignore ports since version 6.1.0. This is handled by the ConnectionCreatePolicy
    //
    if (figure instanceof draw2d.Port) {
      return;// silently
    }

    this.mouseDownElement = figure;

    if (this.mouseDownElement !== null) {
      this.mouseDownElement.fireEvent("mousedown", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey});
    }
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
  onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {
    if (this.mouseDownElement !== null) {
      this.mouseDownElement.fireEvent("mouseup", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey});
    }
    this.mouseDownElement = null;
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
    if (figure !== null) {
      figure.fireEvent("click", {
        figure: figure,
        x: mouseX,
        y: mouseY,
        relX: mouseX - figure.getAbsoluteX(),
        relY: mouseY - figure.getAbsoluteY(),
        shiftKey: shiftKey,
        ctrlKey: ctrlKey
      });

      figure.onClick();
    }
  }
});
