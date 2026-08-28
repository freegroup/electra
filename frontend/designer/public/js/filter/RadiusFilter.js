import Filter from "./Filter"

export default shape_designer.filter.RadiusFilter = class RadiusFilter extends Filter {

  constructor() {
    super("shape_designer.filter.RadiusFilter", "filter.radius")
  }

  insertPane(figure, $parent) {

    $parent.append(`
      <div id="${this.containerId}" class="panel panel-default">
        <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#${this.cssScope}_panel">
          <span data-i18n="${this.LABEL}" >${t(this.LABEL)}</span>
          <span class="spacer"></span>
          <span id="button_remove_${this.cssScope}">&#8855;</span>
        </div>
        <div class="panel-body collapse in" id="${this.cssScope}_panel">
         <div class="form-group">
            <div class="input-group" ></div>
            <div class="input-group">
               <input class="mousetrap-pause" id="filter_radius" type="text" value="${figure.getRadius()}" />
            </div>
         </div>
        </div>
      </div>`)

    $("#filter_radius").TouchSpin({
      min: 0,
      max: 200,
      step: 1,
      maxboostedstep: 10,
      mousewheel: false,
      postfix: 'px'
    })
    $("#filter_radius").on("change", $.proxy(function () {
      this.setRadius(parseInt($("#filter_radius").val()))
    }, figure))

    $("#button_remove_" + this.cssScope).on("click", () => {
      figure.removeFilter(this)
      figure.setRadius(0)
      $("#"+this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#'+this.containerId).remove()
      })
    })
  }

  removePane() {
  }
}




