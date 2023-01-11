//"private" variables
import Hogan from "hogan.js"

let currentFigure = null

class Dialog {
  constructor(){
    $("body").append(`
          <div id="figureConfigDialog">
             Please configure me
          </div>
      `)
  }

  show(figure, pos) {
    Mousetrap.pause()
    currentFigure = figure

    let settings = figure.getParameterSettings().slice(0)
    settings.forEach((el) => {
      el.value = currentFigure.attr("userData." + el.name)
      el.input = el.property.type === "string"
      el.number = el.property.type === "integer"
      el.select = el.property.type === "enum"
      el.textarea = el.property.type === "longtext"
    })
    let compiled = Hogan.compile(`
        <div class="header">Object Configuration</div>
        {{#settings}}
               <div class="form-group">
                 <label for="figure_property_{{name}}">{{label}}</label>
                 {{#textarea}}
                   <textarea type="text" class="form-control" id="figure_property_{{name}}" data-name="{{name}}" placeholder="{{label}}">{{value}}</textarea>
                 {{/textarea}}
                 {{#input}}
                   <input type="text" class="form-control" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}" placeholder="{{label}}">
                 {{/input}}
                 {{#number}}
                   <input type="number" class="form-control" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}" placeholder="{{label}}">
                 {{/number}}
                 {{#select}}
                   <select class="form-control" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}">
                        {{#property.values}}
                        <option value="{{.}}">{{.}}</option>
                        {{/property.values}}             
                   </select>
                 {{/select}}
               </div>
        {{/settings}}
        <button class="submit">Ok</button>
      `
    )
    let output = compiled.render({ settings: settings})

    $("#figureConfigDialog").html(output)
    $("#figureConfigDialog").show().css({top: pos.y, left: pos.x, position: 'absolute'})
    $("#figureConfigDialog input, #figureConfigDialog select").focus()

    $("#figureConfigDialog input").keypress((e) => {
      if (e.which == 13) {
        this.hide()
      }
    })
    $("#figureConfigDialog .submit").on("click",  () => {
      this.hide()
    })

    settings.forEach((setting) =>{
      let figureValue = currentFigure.attr("userData." + setting.name)
      $('#figureConfigDialog select[data-name="' + setting.name + '"] option[value="' + figureValue + '"]').attr('selected', 'selected')
    })
  }

  hide() {
    Mousetrap.unpause()
    if (currentFigure !== null) {
      $("#figureConfigDialog textarea, #figureConfigDialog input, #figureConfigDialog select").each(function (i, element) {
        element = $(element)
        let value = element.val()
        let name = element.data("name")

        currentFigure.attr("userData." + name, value)
      })
    }
    $("#figureConfigDialog").hide()
    $("#figureConfigDialog").html("")

    currentFigure = null
  }
}

let dialog = new Dialog()
export default dialog

