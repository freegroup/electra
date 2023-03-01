import Filter from "./Filter"

export default shape_designer.filter.PositionFilter = class PositionFilter extends Filter {

  constructor() {
    super("shape_designer.filter.PositionFilter")
  }

  insertPane(figure, $parent) {

    $parent.append(`
      <div id="${this.containerId}" class="panel panel-default">

        <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#position_width_panel">
           <span data-i18n="filter.position" >${t("filter.position")}</span>
          <span class="spacer"></span>
        </div>

        <div class="panel-body collapse in" id="position_width_panel">
          <div class="form-group">
            <div class="input-group" ></div>
             <input id="filter_position_x" type="text" value="${parseFloat(figure.getPosition().x)}" name="filter_position_x" class="mousetrap-pause" />
             <input id="filter_position_y" type="text" value="${parseFloat(figure.getPosition().y)}" name="filter_position_y" class="mousetrap-pause" />
          </div>
        </div>

      </div>`)
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $("#filter_position_x").TouchSpin({
      min: 0,
      max: 10000,
      step: 1,
      mousewheel: false,
      maxboostedstep: 10,
      postfix: 'X'
    })

    $("#filter_position_y").TouchSpin({
      min: 0,
      max: 10000,
      step: 1,
      maxboostedstep: 10,
      mousewheel: false,
      postfix: 'Y'
    })

    $("input[name='filter_position_x']").on("change", () => {
      try {
        this.block = true
        let pos = figure.getPosition()
        figure.setPosition(parseFloat($("input[name='filter_position_x']").val()).toFixedNumber(2), pos.y.toFixedNumber(2))
      }
      finally {
        this.block = false
      }
    })

    $("input[name='filter_position_y']").on("change", (event) => {
      try {
        this.block = true
        let pos = figure.getPosition()
        figure.setPosition(pos.x.toFixedNumber(2), parseFloat($("input[name='filter_position_y']").val()).toFixedNumber(2))
      }
      catch(e){
        console.log(e)
      }
      finally {
        this.block = false
      }
    })
  }

  apply(figure, attributes, lastAttributes) {
    if (this.block === true) {
      return
    }
    let pos = figure.getPosition()
    $("input[name='filter_position_y']").val(pos.y.toFixedNumber(2))
    $("input[name='filter_position_x']").val(pos.x.toFixedNumber(2))
  }

  removePane() {
  }

  onInstall(figure) {
  }

}




