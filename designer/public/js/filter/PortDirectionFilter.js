import Filter from "./Filter"

export default shape_designer.filter.PortDirectionFilter = class PortDirectionFilter extends Filter {

  constructor() {
    super("shape_designer.filter.PortDirectionFilter")
  }

  insertPane(figure, $parent) {
    var _this = this
    var dir = figure.getConnectionDirection()
    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_panel">' +
      '     Connection Direction' +
      '</div>' +

      ' <div class="panel-body collapse in" id="' + this.cssScope + '_panel">' +
      '   <div class="form-group portDirectionOption">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings

      '<label>' +
      '  <input ' + (dir === 0 ? ' checked="checked"' : '') + ' type="radio" value="" name="' + this.cssScope + '_label" name="' + this.cssScope + '_label" data-dir="0" />' +
      '  <span  title="up" class="glyphicon glyphicon-arrow-up"></span>' +
      '</label>' +

      '<br>' +

      '<label>' +
      '  <input ' + (dir === 3 ? ' checked="checked"' : '') + 'type="radio" value="" name="' + this.cssScope + '_label" name="' + this.cssScope + '_label" data-dir="3" />' +
      '  <span  title="left" class="glyphicon glyphicon-arrow-left"></span>' +
      '</label>' +

      '<label>' +
      '  <input ' + (dir === null ? ' checked="checked"' : '') + 'type="radio" value="" name="' + this.cssScope + '_label" name="' + this.cssScope + '_label" data-dir="null" />' +
      '  <span title="automatic" class="glyphicon glyphicon-screenshot"></span>' +
      '</label>' +

      '<label>' +
      '  <input ' + (dir === 1 ? ' checked="checked"' : '') + 'type="radio" value="" name="' + this.cssScope + '_label" name="' + this.cssScope + '_label" data-dir="1" />' +
      '  <span title="right"  class="glyphicon glyphicon-arrow-right"></span>' +
      '</label>' +

      '<br>' +

      '<label>' +
      '  <input ' + (dir === 2 ? ' checked="checked"' : '') + 'type="radio" value="" name="' + this.cssScope + '_label" name="' + this.cssScope + '_label" data-dir="2" />' +
      '  <span  title="down" class="glyphicon glyphicon-arrow-down"></span>' +
      '</label>' +


      '       </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $("#" + _this.cssScope + "_panel .portDirectionOption input").on("change", (event) => {
      figure.setConnectionDirection($(event.currentTarget).data("dir"))
    })
  }

  removePane() {
  }

  onInstall(figure) {
  }

}




