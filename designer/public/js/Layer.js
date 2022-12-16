export default class Layer {


  constructor(app, elementId, view) {
    this.html = $("#" + elementId)
    this.view = view

    // register this class as event listener for the canvas
    // CommandStack. This is required to update the state of
    // the Undo/Redo Buttons.
    //
    view.getCommandStack().on("change", this)

    // Register a Selection listener for the state handling
    // of the Delete Button
    //
    view.on("select", this.onSelectionChanged.bind(this))
  }

  /**
   * @method
   * Called if the selection in the cnavas has been changed. You must register this
   * class on the canvas to receive this event.
   *
   * @param {draw2d.Figure} emitter
   */
  onSelectionChanged(emitter, event) {
    this._updateSelection()
  }

  /**
   * @method
   * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
   * can be used to identify the type of event which has occurred.
   *
   * @template
   *
   * @param {draw2d.command.CommandStackEvent} event
   **/
  stackChanged(event) {
    this.html.html('')
    let figures = this.view.getExtFigures()
    figures.each((i, figure) => {
      this.html.append(
        '<div class="layerElement '+this.figureToCSS(figure)+'" data-figure="' + figure.id + '"  data-visibility="' + figure.isVisible() + '" id="layerElement_' + figure.id + '" >' +
        figure.getUserData().name +
        '<span data-figure="' + figure.id + '"  data-toggle="tooltip" title="Toggle Visibility of the Layer"  class="layer_visibility pull-right"><img class="icon svg" src="' + (figure.isVisible() ? './images/layer_visible.svg' : './images/layer_hidden.svg') + '"/></span>' +
        '<span data-figure="' + figure.id + '"  data-toggle="tooltip" title="Edit Name of Layer" class="layer_edit pull-right" ><img class="icon svg" src="./images/layer_edit.svg"/></span>' +
        '</div>')
    }, true)


    $('*[data-toggle="tooltip"]').tooltip({
      placement: "bottom",
      container: "body",
      delay: {show: 1000, hide: 100},
      html: true
    })

    this.html.sortable({
      axis: "y",
      update: () => {
        $(".layerElement").toArray().reverse().forEach((e) => {
          this.view.getExtFigure($(e).data("figure")).toFront()
        })
      }
    })

    $(".layerElement .layer_edit").on("click", (event) =>{
      let figure = this.view.getExtFigure($(event.currentTarget).data("figure"))
      Mousetrap.pause()
      bootbox.prompt({
        title: "Layer Name",
        className: "layer-name-prompt",
        value: figure.attr("userData.name"),
        callback: (result) => {
          Mousetrap.unpause()
          if (result !== null) {
            let cmd = new draw2d.command.CommandAttr(figure, {"userData.name": result})
            this.view.getCommandStack().execute(cmd)
          }
        }
      })

      // autoselect text for fast edit
      setTimeout(function () {
        $(".bootbox-input").focus().select()
      }, 200)
    })


    $(".layerElement .layer_visibility").on("click", (event) =>{
      let figure = this.view.getExtFigure($(event.currentTarget).data("figure"))
      figure.setVisible(!figure.isVisible())
      this.view.setCurrentSelection(null)
      $(event.currentTarget).html('<img class="icon svg" src="' + (figure.isVisible() ? './images/layer_visible.svg' : './images/layer_hidden.svg') + '"/>')
      inlineSVG.init()

      // set the "data" with attr and not with "data()". Otherwise the css selector won't work
      //
      $(event.currentTarget).parent().attr({"data-visibility": figure.isVisible()})

      this.ripple(figure)
      return false
    })

    $(".layerElement").on("click", (event) => {
      let figure = this.view.getExtFigure($(event.currentTarget).data("figure"))
      if (figure.isVisible()) {
        this.view.setCurrentSelection(figure)
        this.ripple(figure)
      }
    })

    this._updateSelection()
  }

  _updateSelection() {
    $(".layerElement").removeClass("layerSelectedElement")
    let selection = this.view.getSelection()
    selection.each(function (i, e) {
      $("#layerElement_" + e.id).addClass("layerSelectedElement")
    })
  }

  ripple(figure) {
    let rect = figure.getBoundingBox()
    let p = rect.getCenter()
    let circle = this.view.paper.circle(p.x, p.y, Math.max(3, rect.w / 4), Math.max(3, rect.h / 4)).attr({
      fill: null,
      stroke: "#d0d0ff"
    })
    let anim = Raphael.animation(
      {
        transform: "s6",
        opacity: 0.0,
        "stroke-width": 5
      },
      500,
      "linear",
      function () {
        circle.remove()
      }
    )
    circle.animate(anim)
  }

  figureToCSS(figure){
    return figure.NAME.split(".").slice(-1)[0]
  }
}
