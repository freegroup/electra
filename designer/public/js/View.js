import conf from "./Configuration"

export default draw2d.Canvas.extend({

  init: function (app, id, permissions) {
    this._super(id, 16000, 16000)
    this.clippboardFigure = null
    this.app = app
    this.grid = new draw2d.policy.canvas.ShowGridEditPolicy(20)

    this.setScrollArea("#draw2dCanvasWrapper")

    this.installEditPolicy(this.grid)
    this.installEditPolicy(new draw2d.policy.canvas.FadeoutDecorationPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy())

    Mousetrap.bindGlobal(['left'], () => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(-diff, 0)
      })
      return false
    })
    Mousetrap.bindGlobal(['up'], () => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(0, -diff)
      })
      return false
    })
    Mousetrap.bindGlobal(['right'], () => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(diff, 0)
      })
      return false
    })
    Mousetrap.bindGlobal(['down'], () => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(0, diff)
      })
      return false
    })

    Mousetrap.bindGlobal(['ctrl+c', 'command+c'], () => {
      // ctrl+c and ctrl+v works just for normal figures and not connections
      //
      let primarySelection = this.getSelection().getPrimary()
      if (primarySelection !== null) {
        this.clippboardFigure = primarySelection.clone()
        this.clippboardFigure.translate(5, 5)
      }
      return false
    })

    Mousetrap.bindGlobal(['ctrl+v', 'command+v'], () => {
      if (this.clippboardFigure !== null) {
        let cloneToAdd = this.clippboardFigure.clone()
        let command = new draw2d.command.CommandAdd(this, cloneToAdd, cloneToAdd.getPosition())
        this.getCommandStack().execute(command)
        this.setCurrentSelection(cloneToAdd)
      }
      return false
    })

    // this.installEditPolicy(new draw2d.policy.canvas.WheelZoomPolicy())

    let setZoom = (newZoom) => {
      let bb = this.getBoundingBox().getCenter()
      let c = $("#draw2dCanvasWrapper")
      this.setZoom(newZoom)
      this.scrollTo((bb.y / newZoom - c.height() / 2), (bb.x / newZoom - c.width() / 2))
    }

    // Inject the ZoomIn Button and the callbacks
    //
    $("#canvas_zoom_in").on("click", () => {
      setZoom(this.getZoom() * 1.2)
    })

    // Inject the OneToOne Button
    //
    $("#canvas_zoom_normal").on("click", () => {
      setZoom(1.0)
    })

    // Inject the ZoomOut Button and the callback
    //
    $("#canvas_zoom_out").on("click", () => {
      setZoom(this.getZoom() * 0.8)
    })

    $('#canvas_config_grid').on('change', () => {
      if ($('#canvas_config_grid').prop('checked')) {
        this.installEditPolicy(this.grid)
      }
      else {
        this.uninstallEditPolicy(this.grid)
      }
    })

    $("#canvas_config_items").on("click", (e) => {
      e.stopPropagation()
    })

    this.reset()
  },

  setCursor: function (cursor) {
    if (cursor !== null) {
      this.html.css("cursor", "url(" + cursor + ") 0 0, default")
    }
    else {
      this.html.css("cursor", "default")
    }
  },

  /**
   * @method
   * Reset the view/canvas and starts with a clean and new document with default decorations
   *
   *
   */
  reset: function () {
    this.fireEvent("select")
    // remove the figure from a selection handler as well and cleanup the
    // selection feedback
    this.getSelection().each((i,figure) => {
      this.editPolicy.each((i, policy) => {
        if (typeof policy.unselect === "function") {
          policy.unselect(this, figure)
        }
      })
    })

    this.clear()
    this.hideWelcomeMessage()
  },


  showWelcomeMessage(){
    this.hideWelcomeMessage()
    let tmpl = $("#welcomeTemplate").html()
    $("#editor .workspace").append(tmpl)

    $("#welcomeNewDocument").on("click", ()=>{
      this.app.fileNew("NewDocument","user")
    })

    $("#welcomeOpenExample").on("click", ()=>{
      let file = "/digital/gate/IEC60617-12/AND.shape"
      let scope = "global"
      this.app.load(file, scope).then(() => {
        history.pushState({
          id: 'editor',
          scope: scope,
          file: file
        }, conf.appName+' | ' + file, window.location.href.split('?')[0] + '?'+scope+'=' + file)
      })
    })
  },
  
  hideWelcomeMessage() {
    $("#editor .welcomeMessage").remove()
  },

  /**
   * Override the "add" method of the normal canvas. In the Designer "lines" and normal "figures" are handled
   * in the very same way. Without that it is impossible to sort line in between of normal figures.
   * In the normal canvas LINE stays always on top. The reason for that is, that lines are in its own collection
   * to calculate crossing behaviour and other special gimicks.
   * NOT USED IN THE DESIGNER and in the designer the z-order of the elements are very important.
   * @param figure
   * @param x
   * @param y
   */
  add: function (figure, x, y) {
    if (figure.getCanvas() === this) {
      return
    }

    this.figures.add(figure)
    if (typeof y !== "undefined") {
      figure.setPosition(x, y)
    } else if (typeof x !== "undefined") {
      figure.setPosition(x)
    }

    figure.setCanvas(this)

    // to avoid drag&drop outside of this canvas
    figure.installEditPolicy(this.regionDragDropConstraint)

    // important initial call
    figure.getShapeElement()

    // init a repaint of the figure. This enforce that all properties
    // ( color, dim, stroke,...) will be set and pushed to SVG node.
    figure.repaint()

    // fire the figure:add event before the "move" event and after the figure.repaint() call!
    //   - the move event can only be fired if the figure part of the canvas.
    //     and in this case the notification event should be fired to the listener before
    this.fireEvent("figure:add", {figure: figure, canvas: this})

    // fire the event that the figure is part of the canvas
    figure.fireEvent("added", {figure: figure, canvas: this})

    // ...now we can fire the initial move event
    figure.fireEvent("move", {figure: figure, x: figure.getX(), y: figure.getY(), dx: 0, dy: 0})

    return this
  },

  remove: function (figure) {
    // don't fire events of calll callbacks if the fire isn'T part of this canvas
    //
    if (figure.getCanvas() !== this) {
      return this
    }

    // remove the figure from a selection handler as well and cleanup the
    // selection feedback
    if (this.getSelection().contains(figure)) {
      this.editPolicy.each((i, policy) => {
        if (typeof policy.unselect === "function") {
          policy.unselect(this, figure)
        }
      })
    }

    this.figures.remove(figure)

    figure.setCanvas(null)

    if (figure instanceof draw2d.Connection) {
      figure.disconnect()
    }

    this.fireEvent("figure:remove", {figure: figure})

    figure.fireEvent("removed", {figure: figure, canvas: this})

    return this
  },


  setZoom: function (newZoom) {
    $("#canvas_zoom_normal").text((parseInt((1.0 / newZoom) * 100)) + "%")
    this._super(newZoom)
  },


  getExtFigure: function (id) {
    let figure = null
    this.getExtFigures().each((i, e) => {
      if (e.id === id) {
        figure = e
        return false
      }
    })
    return figure
  },

  getExtFigures: function () {
    let figures = this.getFigures().clone()

    // the export rectangles are not part of the document itself. In this case we
    // filter them out
    //
    figures.grep((figure) => {
      return (typeof figure.isExtFigure !== "undefined")
    })

    let lines = this.getLines().clone()
    lines.grep((line) => {
      return (typeof line.isExtFigure !== "undefined")
    })

    figures.addAll(lines)

    return figures
  },


  getBoundingBox: function () {
    let xCoords = []
    let yCoords = []
    this.getExtFigures().each((i, f) => {
      if (f instanceof shape_designer.figure.ExtPort) {
        return
      }
      let b = f.getOuterBoundingBox()
      xCoords.push(b.x, b.x + b.w)
      yCoords.push(b.y, b.y + b.h)
    })
    let minX = xCoords.length===0?0:Math.min(...xCoords)
    let minY = yCoords.length===0?0:Math.min(...yCoords)
    let width = Math.max(10, Math.max(...xCoords) - minX)
    let height = Math.max(10, Math.max(...yCoords) - minY)

    return new draw2d.geo.Rectangle(minX, minY, width, height)
  },

  hideDecoration: function () {
    this.uninstallEditPolicy(this.grid)
    this.getFigures().each((index, figure) => {
      figure.unselect()
      // hide unwanted decorations for the screenshots
      if(figure.hideDecoration){
        figure.hideDecoration()
      }
    })
  },

  showDecoration: function () {
    this.installEditPolicy(this.grid)
    this.getFigures().each((index, figure) => {
      // show decorations again
      if(figure.showDecoration){
        figure.showDecoration()
      }
    })
  },

  /**
   * @method
   * Return the width of the canvas
   *
   * @return {Number}
   **/
  getWidth: function () {
    return this.html.find("svg").width()
  },


  /**
   * @method
   * Return the height of the canvas.
   *
   * @return {Number}
   **/
  getHeight: function () {
    return this.html.find("svg").height()
  },

  centerView: function(){
    let center = new draw2d.geo.Point(this.getWidth()/2, this.getHeight()/2)
    if (this.getExtFigures().getSize()>0){
      center = this.getBoundingBox().getCenter()
    }
    let c = $("#draw2dCanvasWrapper")
    c.scrollTop((center.y / this.getZoom() - c.height() / 2))
    c.scrollLeft((center.x /this.getZoom() - c.width() / 2))
  },

  centerDocument: function () {
    this.setZoom(1.0)
    // get the bounding box of the document and translate the complete document
    // into the center of the canvas. Scroll to the top left corner after them
    //
    let bb = this.getBoundingBox()

    let dx = (this.getWidth() / 2) - (bb.x + bb.w / 2)
    let dy = (this.getHeight() / 2) - (bb.y + bb.h / 2)

    this.getFigures().each((i, f) => {
      f.translate(dx, dy)
    })
    this.getLines().each((i, f) => {
      f.translate(dx, dy)
    })
    this.centerView()
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

