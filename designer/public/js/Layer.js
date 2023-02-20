import inlineSVG from "../../common/js/inlineSVG"
import inputPrompt from "../../common/js/InputPrompt"

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
        `<div class="layerElement ${this.figureToCSS(figure)}" data-figure="${figure.id}" data-visibility="${figure.isVisible()}" id="layerElement_${figure.id}" >
          <img class="layer_decoration" src="${this.figureToImage(figure)}"/>
          <span class="layer_label" >
            ${figure.getUserData().name}
          </span>
          <span data-figure="${figure.id}" class="layer_visibility pull-right">
            <img class="icon svg" src="${(figure.isVisible() ? './images/layer_visible.svg' : './images/layer_hidden.svg')}"/>
          </span>
          <span data-figure="${figure.id}" class="layer_edit pull-right" >
            <img class="icon svg" src="./images/layer_edit.svg"/>
          </span>
        </div>`)
    }, true)
    inlineSVG.init()

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

      inputPrompt.show("Rename Layer", "Name", figure.attr("userData.name"))
      .then( value => {
          let cmd = new draw2d.command.CommandAttr(figure, {"userData.name": value})
          this.view.getCommandStack().execute(cmd)
      })
      .finally(()=>{
        Mousetrap.unpause()
      })

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


  figureToImage(figure){
    switch(this.figureToCSS(figure)){
      case "ExtLine": return "./images/layer_line.svg"
      case "PolyRect": return "./images/layer_rect.svg"
      case "PolyCircle": return "./images/layer_circle.svg"
      case "ExtLabel": return "./images/layer_text.svg"
      case "ExtPort": return "./images/layer_port.svg"
      default: return "./images/layer_rect.svg"
    }
  }

  figureToCSS(figure){
    return figure.NAME.split(".").slice(-1)[0]
  }
}
