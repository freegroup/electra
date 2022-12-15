import Filter from "./Filter"


export default shape_designer.filter.BlurFilter = class BlurFilter extends Filter {

  constructor() {
    super("shape_designer.filter.BlurFilter")
  }

  insertPane(figure, $parent) {
    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_panel">' +
      '     Blur' +
      '    <span id="button_remove_' + this.cssScope + '"><i class="pull-right fa fa-trash"></i></span>' +
      '</div>' +

      ' <div class="panel-body collapse in" id="' + this.cssScope + '_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '       <input id="filter_blur" type="text" value="' + figure.getBlur() + '"  name="filter_blur" class="mousetrap-pause form-control" />' +
      '   </div>' +
      ' </div>' +
      '</div>')

    $("#filter_blur").TouchSpin({
      min: 1,
      max: 5,
      step: 1
    })

    $("#filter_blur").on("change", () => { 
      console.log("set blur")
      figure.setBlur(parseInt($("#filter_blur").val()))
    })


    $("#button_remove_" + this.cssScope).on("click", () => {
      figure.removeFilter(this)
      figure.setBlur(-1)
      $('#' + this.containerId).animate({
        "height": "0",
        "opacity": 0,
        "margin-bottom": 0
      }, 500, () => 
      {
        $('#' + this.containerId).remove()
      })
    })
  }

  apply(figure, attributes) {
    console.log("apply")
    figure.shape.blur(Math.max(1,figure.blur))
  }

}




