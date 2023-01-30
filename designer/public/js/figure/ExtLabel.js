
export default shape_designer.figure.ExtLabel = draw2d.shape.basic.Label.extend({

  NAME: "shape_designer.figure.ExtLabel",


  init: function (attr, setter, getter) {
    this.blur = 0
    this.isExtFigure = true

    this._super(attr, setter, getter)

    this.setUserData({name: "Label"})

    this.filters = new draw2d.util.ArrayList()
    this.filters.add(new shape_designer.filter.PositionFilter())
    this.filters.add(new shape_designer.filter.FontSizeFilter())
    this.filters.add(new shape_designer.filter.FontColorFilter())

    this.installEditor(new LabelInplaceEditor())
  },

  getPotentialFilters: function () {
    return [
      {label: "Opacity", impl: "shape_designer.filter.OpacityFilter"},
      {label: "Blur", impl: "shape_designer.filter.BlurFilter"},
      {label: "Outline", impl: "shape_designer.filter.OutlineStrokeFilter"},
      {label: "Gradient", impl: "shape_designer.filter.TextLinearGradientFilter"},
      {label: "Font Size", impl: "shape_designer.filter.FontSizeFilter"},
      {label: "Font Color", impl: "shape_designer.filter.FontColorFilter"}
    ]
  },

  setBlur: function (value) {
    this.blur = value
    this.repaint()
  },

  getBlur: function () {
    return this.blur
  },

  removeFilter: function (filter) {
    this.filters.remove(filter)

    return this
  },

  addFilter: function (filter) {
    var alreadyIn = false

    this.filters.each( (i, e) =>{
      alreadyIn = alreadyIn || (e.NAME === filter.NAME)
    })
    if (alreadyIn === true) {
      return // silently
    }

    this.filters.add(filter)
    filter.onInstall(this)
    this.repaint()

    return this
  },

  /**
   * @method
   * Trigger the repaint of the element.
   *
   */
  repaint: function (attributes) {
    if (this.shape === null) {
      return
    }

    attributes ??= {}

    // style the label
    var lattr = {}
    lattr.text = this.text
    lattr["font-weight"] = (this.bold === true) ? "bold" : "normal"
    lattr["text-anchor"] = "start"
    lattr["font-size"] = this.fontSize
    if (this.fontFamily !== null) {
      lattr["font-family"] = this.fontFamily
    }
    lattr.fill = this.fontColor.hash()
    lattr.stroke = this.outlineColor.hash()
    lattr["stroke-width"] = this.outlineStroke

    this.filters.each( (i, filter) => {
      filter.apply(this, attributes, lattr)
    })

    this.svgNodes.attr(lattr)
    // set of the x/y must be done AFTER the font-size and bold has been set.
    // Reason: the getHeight method needs the font-size for calculation because
    //         it redirects the calculation to the SVG element.

    this.svgNodes.attr({x: this.padding.left.toFixedNumber(2), y: (this.getHeight() / 2).toFixedNumber(2)})

    // jump over the normal Label implementation
    draw2d.SetFigure.prototype.repaint.call(this, attributes)
  },

  getPersistentAttributes: function () {
    var memento = this._super()
    memento.filters = []
    this.filters.each((i, e) => {
      var filterMemento = e.getPersistentAttributes(this)
      memento.filters.push(filterMemento)
    })
    return memento
  },

  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.filters !== "undefined") {
      this.filters = new draw2d.util.ArrayList()
      $.each(memento.filters, (i, e) => {
        var filter = eval("new " + e.name + "()")
        filter.setPersistentAttributes(this, e)
        this.filters.add(filter)
      })
    }
  }
})
