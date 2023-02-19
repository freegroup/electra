import Hogan from "hogan.js"
import fs from "path-browserify"

let currentFigure = null

class Dialog {
  constructor(){
  }

  show(figure, pos) {
    Mousetrap.pause()
    currentFigure = figure

    let figureName = fs.basename(figure.attr("userData.file"), ".shape")
    $("#figureConfigDialog .media-heading").html(figureName +" Settings")

    let settings = figure.getParameterSettings().slice(0)
    settings.forEach((el) => {
      el.value = currentFigure.attr("userData." + el.name)
      el.input = el.property.type === "string"
      el.number = el.property.type === "integer"
      el.select = el.property.type === "enum"
      el.textarea = el.property.type === "longtext"
    })
    let compiled = Hogan.compile(`
        {{#settings}}
               <div class="form-group">
                 <label for="figure_property_{{name}}">{{label}}</label>
                  {{#textarea}}
                  <p>
                    <textarea class="lineNumbering"   id="linenumber_{{name}}"  wrap='off' readonly>1.</textarea>
                    <textarea class="figureAttribute" id="figure_property_{{name}}" data-name="{{name}}" placeholder="{{label}}"  wrap='off'>{{value}}</textarea>
                  </p>
                  {{/textarea}}
                 {{#input}}
                   <input type="text" class="figureAttribute" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}" placeholder="{{label}}">
                 {{/input}}
                 {{#number}}
                   <input type="number" class="figureAttribute" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}" placeholder="{{label}}">
                 {{/number}}
                 {{#select}}
                   <select class="figureAttribute" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}">
                        {{#property.values}}
                        <option value="{{.}}">{{.}}</option>
                        {{/property.values}}             
                   </select>
                 {{/select}}
               </div>
        {{/settings}}
      `
    )
    let output = compiled.render({ settings: settings})

    $("#figureConfigDialog .modal-body").html(output)
    $('#figureConfigDialog').modal('show')

    $("#figureConfigDialog .okBtn").off("click").on("click", () => {
        this.hide()
    })

    $("#figureConfigDialog input").keypress((e) => {
      if (e.which == 13) {
        this.hide()
      }
    })

    settings.forEach((setting) =>{
      let figureValue = currentFigure.attr("userData." + setting.name)
      $('#figureConfigDialog select[data-name="' + setting.name + '"] option[value="' + figureValue + '"]').attr('selected', 'selected')
    })

    function lineCounterUpdate(codeEditor, lineCounter) {
      var lineCount = codeEditor.value.split('\n').length
      var outarr = new Array()
      for (var x = 0; x < lineCount; x++) {
          outarr[x] = (x + 1) + '.'
      }
      lineCounter.value = outarr.join('\n')
    }

    $( "#figureConfigDialog" ).off("shown.bs.modal").on('shown.bs.modal', () => {
      $("#figureConfigDialog input").focus();
      $("#figureConfigDialog textarea.figureAttribute").each((index, codeEditor )=> {
        codeEditor.addEventListener('scroll', event => {
          let codeEditor  = event.target
          let lineCounter = codeEditor.previousElementSibling
          lineCounter.scrollTop = codeEditor.scrollTop
          lineCounter.scrollLeft = codeEditor.scrollLeft
        })
  
        codeEditor.addEventListener('input', event => {
          let codeEditor  = event.target
          let lineCounter = codeEditor.previousElementSibling
          lineCounterUpdate(codeEditor, lineCounter)
        })
  
        codeEditor.addEventListener('keydown', event => {
          let codeEditor  = event.target
          let { keyCode } = event
          let { value, selectionStart, selectionEnd } = codeEditor
  
          if (keyCode === 9) {  // TAB = 9
            event.preventDefault()
            codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd)
            codeEditor.setSelectionRange(selectionStart+2, selectionStart+1)
          }
        })
        lineCounterUpdate(codeEditor, codeEditor.previousElementSibling)
      })
    })
  }

  hide() {
    Mousetrap.unpause()
    if (currentFigure !== null) {
      $("#figureConfigDialog textarea.figureAttribute, #figureConfigDialog input.figureAttribute, #figureConfigDialog select.figureAttribute").each(function (i, element) {
        element = $(element)
        let value = element.val()
        let name = element.data("name")
        currentFigure.attr("userData." + name, value)
      })
    }
    $('#figureConfigDialog').modal('hide')
    $("#figureConfigDialog .modal-body").html("")

    currentFigure = null
  }
}

let dialog = new Dialog()
export default dialog

