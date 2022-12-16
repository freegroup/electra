import Filter from "./Filter"

export default shape_designer.filter.FontSizeFilter = class FontSizeFilter extends Filter {

  constructor() {
    super("shape_designer.filter.FontSizeFilter")
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_panel">' +
      '     Font Size' +
      '    <span id="button_remove_' + this.cssScope + '"><i class="pull-right fa fa-trash"></i></span>' +
      '</div>' +

      ' <div class="panel-body collapse in" id="' + this.cssScope + '_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '       <input id="filter_fontsize" type="text" value="' + figure.getFontSize() + '" name="filter_fontsize" class="mousetrap-pause form-control" />' +
      '   </div>' +
      ' </div>' +
      '</div>')

    $("#filter_fontsize").TouchSpin({
      min: 4,
      max: 300,
      step: 1,
      boostat: figure.getFontSize(),
      maxboostedstep: 10,
      postfix: 'px'
    })

    $("input[name='filter_fontsize']").on("change", $.proxy(function () {
      this.setFontSize(parseInt($("input[name='filter_fontsize']").val()))
    }, figure))


    $("#button_remove_" + this.cssScope).on("click", () => {
      figure.removeFilter(this)
      figure.setFontSize(12)
      $("#"+this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#'+this.containerId).remove()
      })
    })
  }

  removePane() {
  }

  onInstall(figure) {
    //   figure.setFontSize(1);
  }
}




