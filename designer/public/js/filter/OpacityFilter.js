import Filter from "./Filter"

export default shape_designer.filter.OpacityFilter = class OpacityFilter extends Filter {

  constructor() {
    super("shape_designer.filter.OpacityFilter")
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_panel">' +
      '    Opacity' +
      '    <span id="button_remove_' + this.cssScope + '"><i class="pull-right fa fa-trash"></i></span>' +
      '</div>' +
      ' <div class="panel-body collapse in" id="' + this.cssScope + '_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '      <div class="input-group">' +
      '         <input class="mousetrap-pause form-control" id="filter_opacity" type="text" value="' + parseInt(figure.getAlpha() * 100) + '" />' +
      '      </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')

    $("#filter_opacity").TouchSpin({
      min: 0,
      max: 100,
      step: 5,
      boostat: parseInt(figure.getAlpha() * 100),
      maxboostedstep: 10,
      postfix: '%'
    })
    $("#filter_opacity").on("change", $.proxy(function () {
      this.setAlpha(parseInt($("#filter_opacity").val()) / 100.0)
    }, figure))

    $("#button_remove_" + this.cssScope ).on("click", () => {
      figure.removeFilter(this)
      figure.setAlpha(1)
      $("#"+this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#'+this.containerId).remove()
      })
    })
  }

  removePane() {
  }
}




