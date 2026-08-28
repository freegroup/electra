import Filter from "./Filter"
import jscolor from "../widget/jscolor/jscolor"

export default shape_designer.filter.FillColorFilter = class FillColorFilter extends Filter {

  constructor() {
    super("shape_designer.filter.FillColorFilter", "filter.fillcolor")
    this.colorPicker = null
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
                <span class="input-group-addon">#</span>
                <input id="filter_color_fill" type="text" value="" name="filter_color_fill" class="mousetrap-pause color"/>
             </div>
          </div>
       </div>
      </div>`)

    this.colorPicker = new jscolor.color(document.getElementById('filter_color_fill'), {})
    this.colorPicker.fromString(figure.getBackgroundColor().hash())
    this.colorPicker.onImmediateChange = () => {
      figure.setBackgroundColor("#" + this.colorPicker.toString())
    }

    $("#button_remove_" + this.cssScope).on("click", () => {
      figure.removeFilter(this)
      figure.setBackgroundColor(null)
      $("#"+this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#'+this.containerId).remove()
      })
    })
  }

  onInstall(figure) {
    figure.setBackgroundColor("#f0f3f3")
  }

  removePane() {
    this.colorPicker?.hidePicker()
  }
}




