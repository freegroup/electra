import jscolor from "../widget/jscolor/jscolor"

import Filter from "./Filter"

export default shape_designer.filter.StrokeFilter = class StrokeFilter extends Filter {

  constructor() {
    super("shape_designer.filter.StrokeFilter")
  }

  insertPane(figure, $parent) {


    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_panel">' +
      '    <span>Stroke</span>' +
      '    <span class="spacer"></span>' +
      '    <span id="button_remove_' + this.cssScope + '">&#8855;</span>' +
      '</div>' +

      ' <div class="panel-body collapse in" id="' + this.cssScope + '_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div>' + // required to ensure the correct width of the siblings
      '       <input id="filter_' + this.cssScope + '_width" type="text" value="' + figure.getStroke() + '" class="mousetrap-pause" />' +
      '       <div class="input-group">' +
      '          <span class="input-group-addon">#</span>' +
      '          <input id="filter_' + this.cssScope + '_color" type="text" value="" class="mousetrap-pause color"/>' +
      '       </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')

    let filterWidth = $("#filter_" + this.cssScope + "_width")
    let filterColor = $("#filter_" + this.cssScope + "_color")
    filterWidth
      .TouchSpin({
        min: 0,
        max: 50,
        step: 1,
        maxboostedstep: 1,
        mousewheel: false,
        postfix: 'px'
      })
      .on("change", $.proxy(function () {
        this.setStroke(parseInt(filterWidth.val()))
      }, figure))

    let picker = this.colorPicker = new jscolor.color(filterColor.get(0), {})
    this.colorPicker.fromString(figure.getColor().hash())
    this.colorPicker.onImmediateChange = $.proxy(function () {
      this.setColor("#" + picker.toString())
    }, figure)

    $("#button_remove_" + this.cssScope).on("click", () => {
      figure.removeFilter(this)
      figure.setStroke(0)
      $("#" + this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#' + this.containerId).remove()
      })
    })
  }

  removePane() {
    if (this.colorPicker !== null) {
      this.colorPicker.hidePicker()
    }
  }

  onInstall(figure) {
    figure.setStroke(1)
  }

}




