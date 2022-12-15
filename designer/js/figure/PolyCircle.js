export default shape_designer.figure.PolyCircle = draw2d.shape.basic.Oval.extend({

  NAME: "shape_designer.figure.PolyCircle",


  init: function (center, radius) {
    this.blur = 0
    this.isExtFigure = true

    // set some good defaults
    if (typeof radius === "undefined") {
      radius = 10
    }

    this._super({stroke: 0, bgColor: "95C06A", width: radius * 2, height: radius * 2})

    // center must be set after the width/height...bug
    if (typeof center !== "undefined") {
      this.setCenter(center)
    }

    this.setUserData({name: "Circle"})

    this.filters = new draw2d.util.ArrayList()
    this.filters.add(new shape_designer.filter.PositionFilter())
    this.filters.add(new shape_designer.filter.SizeFilter())
    this.filters.add(new shape_designer.filter.FillColorFilter())
  },

  getPotentialFilters: function () {
    return [
      {label: "Stroke", impl: "shape_designer.filter.StrokeFilter"},
      {label: "Opacity", impl: "shape_designer.filter.OpacityFilter"},
      {label: "Blur", impl: "shape_designer.filter.BlurFilter"},
      {label: "Linear Gradient", impl: "shape_designer.filter.LinearGradientFilter"},
      {label: "Fill Color", impl: "shape_designer.filter.FillColorFilter"}
    ]
  },

  removeFilter: function (filter) {
    this.filters.remove(filter)
  },

  addFilter: function (filter) {
    var alreadyIn = false

    this.filters.each($.proxy(function (i, e) {
      alreadyIn = alreadyIn || (e.NAME === filter.NAME)
    }, this))

    if (alreadyIn === true) {
      return // silently
    }

    this.filters.add(filter)
    filter.onInstall(this)
    this.repaint()
  },


  setBlur: function (value) {
    this.blur = parseInt(value)
    this.repaint()
  },

  getBlur: function () {
    return this.blur
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

    this.filters.each($.proxy(function (i, filter) {
      filter.apply(this, attributes)
    }, this))

//        this.shape.blur(this.blur);
    this._super(attributes)
  },

  getVertices: function () {

    var w2 = this.getWidth() / 2
    var h2 = this.getHeight() / 2
    var center = this.getCenter()
    var sides = 36

    var vertices = new draw2d.util.ArrayList()
    for (var i = 0; i < sides; i++) {
      var radian = 2 * Math.PI * i / sides
      var x = Math.cos(radian) * w2 + center.x
      var y = Math.sin(radian) * h2 + center.y
      vertices.add(new draw2d.geo.Point(x, y))
    }
    return vertices
  },

  getPersistentAttributes: function () {
    var memento = this._super()

    memento.blur = this.blur
    memento.filters = []
    this.filters.each($.proxy(function (i, e) {
      var filterMemento = e.getPersistentAttributes(this)
      memento.filters.push(filterMemento)
    }, this))

    return memento
  },

  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.blur !== "undefined")
      this.setBlur(memento.blur)

    if (typeof memento.filters !== "undefined") {
      this.filters = new draw2d.util.ArrayList()
      $.each(memento.filters, $.proxy(function (i, e) {
        var filter = eval("new " + e.name + "()")
        filter.setPersistentAttributes(this, e)
        this.filters.add(filter)
      }, this))
    }
  }
})
