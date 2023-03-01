import Filter from "./Filter"


export default shape_designer.filter.BlurFilter = class BlurFilter extends Filter {

  constructor() {
    super("shape_designer.filter.BlurFilter")
  }

  insertPane(figure, $parent) {
    $parent.append(`<div id="${this.containerId}" class="panel panel-default">
       <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#${this.cssScope}_panel">
          <span data-i18n="filter.blur" >${t("filter.blur")}</span>
          <span class="spacer"></span>
          <span id="button_remove_${this.cssScope}">&#8855;/span>
      </div>

       <div class="panel-body collapse in" id="${this.cssScope}_panel">
        <div class="form-group">
          <div class="input-group" ></div>
          <input id="filter_blur" type="text" value="${figure.getBlur()}"  name="filter_blur" class="mousetrap-pause" />
        </div>
       </div>
      </div>`)

    $("#filter_blur").TouchSpin({
      min: 1,
      max: 5,
      mousewheel: false,
      step: 1
    })

    $("#filter_blur").on("change", () => { 
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
    figure.shape.blur(Math.max(1,figure.blur))
  }

}




