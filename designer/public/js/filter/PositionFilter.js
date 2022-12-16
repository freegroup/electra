import Filter from "./Filter"

export default shape_designer.filter.PositionFilter = class PositionFilter extends Filter {

  constructor() {
    super("shape_designer.filter.PositionFilter")
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#position_width_panel">' +
      '     Position' +
      '</div>' +
      ' <div class="panel-body  collapse in" id="position_width_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '       <input id="filter_position_x" type="text" value="' + parseFloat(figure.getPosition().x) + '" name="filter_position_x" class="mousetrap-pause form-control" />' +
      '       <input id="filter_position_y" type="text" value="' + parseFloat(figure.getPosition().y) + '" name="filter_position_y" class="mousetrap-pause form-control" />' +
      '   </div>' +
      ' </div>' +
      '</div>')
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $("#filter_position_x").TouchSpin({
      min: 0,
      max: 10000,
      step: 1,
      maxboostedstep: 10,
      postfix: 'X'
    })

    $("#filter_position_y").TouchSpin({
      min: 0,
      max: 10000,
      step: 1,
      maxboostedstep: 10,
      postfix: 'Y'
    })

    $("input[name='filter_position_x']").on("change", () => {
      try {
        this.block = true
        let pos = figure.getPosition()
        figure.setPosition(parseFloat($("input[name='filter_position_x']").val()), pos.y)
      }
      finally {
        this.block = false
      }
    })

    $("input[name='filter_position_y']").on("change", () => {
      try {
        this.block = true
        let pos = figure.getPosition()
        figure.setPosition(pos.x, parseFloat($("input[name='filter_position_y']").val()))
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
    let pos = figure.getPosition()
    $("input[name='filter_position_y']").val(pos.y)
    $("input[name='filter_position_x']").val(pos.x)
  }

  removePane() {
  }

  onInstall(figure) {
  }

}




