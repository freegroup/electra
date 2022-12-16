import Filter from "./Filter"

export default shape_designer.filter.FanoutFilter = class FanoutFilter extends Filter {

  constructor() {
    super("shape_designer.filter.FanoutFilter")
  }

  insertPane(figure, $parent) {
    $parent.append(` 
      <div id="${this.containerId}" class="panel panel-default">
       <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#${this.cssScope}_panel">
           Maximal fan out
      </div>

       <div class="panel-body collapse in" id="${this.cssScope }_panel">
         <div class="form-group">
            <div class="input-group" ></div>
             <input id="filter_${this.cssScope}_fanout" type="text" value="${figure.getMaxFanOut()}" name="filter_${this.cssScope}_fanout" class="mousetrap-pause form-control" />' +
         </div>
       </div>
      </div>
      `)
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $("input[name='filter_" + this.cssScope + "_fanout']").TouchSpin({
      min: 1,
      max: 50,
      step: 1,
      maxboostedstep: 1,
      postfix: 'px'
    })

    $("input[name='filter_" + this.cssScope + "_fanout']").off("change").on("change", () => {
      figure.setMaxFanOut(parseInt($("input[name='filter_" + this.cssScope + "_fanout']").val()))
    })
  }

  removePane() {
  }

  onInstall(figure) {
  }
}




