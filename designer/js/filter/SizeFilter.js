import Filter from "./Filter"

export default shape_designer.filter.SizeFilter = class SizeFilter extends Filter {

  constructor() {
    super("shape_designer.filter.SizeFilter")
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#size_width_panel">' +
      '     Size' +
      ' </div>' +
      ' <div class="panel-body  collapse in" id="size_width_panel">' +
      '   <div class="form-group">' +
      '       <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '       <input id="filter_width"  type="text" value="' + figure.getWidth() + '"  name="filter_width"  class="mousetrap-pause form-control" />' +
      '       <input id="filter_height" type="text" value="' + figure.getHeight() + '" name="filter_height" class="mousetrap-pause form-control" />' +
      '   </div>' +
      ' </div>' +
      '</div>')
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $("#filter_width").TouchSpin({
      min: 0,
      max: 600,
      step: 1,
      maxboostedstep: 10,
      postfix: 'width'
    })

    $("#filter_height").TouchSpin({
      min: 0,
      max: 600,
      step: 1,
      maxboostedstep: 10,
      postfix: 'height'
    })

    $("input[name='filter_width']").on("change", () => {
      try {
        this.block = true
        figure.setWidth(parseInt($("input[name='filter_width']").val()))
      }
      finally {
        this.block = false
      }
    })

    $("input[name='filter_height']").on("change", () => {
      try {
        this.block = true
        figure.setHeight(parseInt($("input[name='filter_height']").val()))
      }
      finally {
        this.block = false
      }
    })
  }

  apply(figure, attributes) {
    if (this.block === true) {
      return
    }

    $("input[name='filter_width']").val(figure.getWidth())
    $("input[name='filter_height']").val(figure.getHeight())
  }

  removePane() {
  }

  onInstall(figure) {
  }

}




