import jscolor from "../widget/jscolor/jscolor"

import Filter from "./Filter"

export default shape_designer.filter.FontColorFilter = class FontColorFilter extends Filter {

  constructor() {
    super("shape_designer.filter.FontColorFilter", "filter.fontcolor")
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

    let picker = this.colorPicker = new jscolor.color(document.getElementById('filter_color_fill'), {})
    this.colorPicker.fromString(figure.getFontColor().hash())
    this.colorPicker.onImmediateChange = $.proxy(function () {
      this.setFontColor("#" + picker.toString())
    }, figure)

    $('#button_remove_' + this.cssScope ).on("click", () => {
      figure.removeFilter(this)
      figure.setFontColor(null)
      $("#"+this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#'+this.containerId).remove()
      })
    })
  }

  onInstall(figure) {
    figure.setFontColor("#000000")
  }

  removePane() {
    if (this.colorPicker !== null) {
      this.colorPicker.hidePicker()
    }
  }
}




