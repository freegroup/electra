import Filter from "./Filter"

export default shape_designer.filter.PortTypeFilter = class PortTypeFilter extends Filter {

  constructor() {
    super("shape_designer.filter.PortTypeFilter")
  }

  insertPane(figure, $parent) {
    let _this = this
    let type = figure.getInputType()
    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_panel">' +
      '     Port Type' +
      '</div>' +

      ' <div class="panel-body collapse in" id="' + this.cssScope + '_panel">' +
      '   <div class="form-group portTypeOption">' +

      '<label>' +
      '  <input ' + (type == 'Input' ? ' checked="checked"' : '') + 'type="radio" value="" name="' + this.cssScope + '_label" name="' + this.cssScope + '_label" data-type="Input" />' +
      '  <span  title="down" class="icon ion-log-in">input</span>' +
      '</label>' +
      '<br>' +
      '<label>' +
      '  <input ' + (type == 'Output' ? ' checked="checked"' : '') + 'type="radio" value="" name="' + this.cssScope + '_label" name="' + this.cssScope + '_label" data-type="Output" />' +
      '  <span  title="down" class="icon ion-log-out">output</span>' +
      '</label>' +
      '<br>' +
      '<label>' +
      '  <input ' + (type == 'Hybrid' ? ' checked="checked"' : '') + 'type="radio" value="" name="' + this.cssScope + '_label" name="' + this.cssScope + '_label" data-type="Hybrid" />' +
      '  <span  title="down" class="icon ion-ios-circle-outline">unspecified</span>' +
      '</label>' +

      '       </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $("#" + _this.cssScope + "_panel .portTypeOption input").on("change", (event) => {
      figure.setInputType($(event.currentTarget).data("type"))
    })
  }

  removePane() {
  }

  onInstall(figure) {
  }

}




