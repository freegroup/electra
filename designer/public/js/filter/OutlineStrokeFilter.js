import jscolor from "../widget/jscolor/jscolor"

import Filter from "./Filter"

export default shape_designer.filter.OutlineStrokeFilter = class OutlineStrokeFilter extends Filter {

  constructor() {
    super("shape_designer.filter.OutlineStrokeFilter")
    this.colorPicker = null
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_panel">' +
      '     Outline Stroke' +
      '    <span id="button_remove_' + this.cssScope + '"><i class="pull-right fa fa-trash"></i></span>' +
      '</div>' +

      ' <div class="panel-body collapse in" id="' + this.cssScope + '_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '       <input id="filter_outlinestroke" type="text" value="' + figure.getOutlineStroke() + '" name="filter_outlinestroke" class="mousetrap-pause form-control" />' +
      '       <div class="input-group">' +
      '          <span class="input-group-addon">#</span>' +
      '          <input id="filter_outlinestroke_color" type="text" value="" name="outlinestroke-color" class="mousetrap-pause form-control color"/>' +
      '       </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')

    $("input[name='filter_outlinestroke']")
      .TouchSpin({
        min: 0,
        max: 50,
        step: 1,
        boostat: figure.getOutlineStroke(),
        maxboostedstep: 10,
        postfix: 'px'
      })
      .on("change", $.proxy(function () {
        this.setOutlineStroke(parseFloat($("input[name='filter_outlinestroke']").val()))
      }, figure))


    let picker = this.colorPicker = new jscolor.color(document.getElementById('filter_outlinestroke_color'), {})
    this.colorPicker.fromString(figure.getOutlineColor().hash())
    this.colorPicker.onImmediateChange = $.proxy(function () {
      this.setOutlineColor("#" + picker.toString())
    }, figure)

    $("#button_remove_" + this.cssScope).on("click", () => {
      figure.removeFilter(this)
      figure.setOutlineStroke(0)
      $("#"+this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#'+this.containerId).remove()
      })
    })
  }

  removePane() {
    if (this.colorPicker !== null) {
      this.colorPicker.hidePicker()
    }
  }

  onInstall(figure) {
    figure.setOutlineStroke(1)
    figure.setOutlineColor("#ff0000")
  }
}




