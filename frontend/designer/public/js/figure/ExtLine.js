require ("../filter/index")

export default shape_designer.figure.ExtLine = draw2d.shape.basic.PolyLine.extend({

  NAME: "shape_designer.figure.ExtLine",


  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    this.blur = 0
    this.isExtFigure = true

    this.setUserData({name: "Line"})

    this.filters = new draw2d.util.ArrayList()
    this.filters.add(new shape_designer.filter.StrokeFilter())

    this.setRouter(new draw2d.layout.connection.VertexRouter())
    this.installEditPolicy(new draw2d.policy.line.VertexSelectionFeedbackPolicy())
  },

  setBlur: function (value) {
    this.blur = parseInt(value)
    this.repaint()
  },

  getBlur: function () {
    return this.blur
  },

  getPotentialFilters: function () {
    return [
      new shape_designer.filter.OpacityFilter(),
      new shape_designer.filter.BlurFilter(),
      new shape_designer.filter.OutlineStrokeFilter(),
      new shape_designer.filter.RadiusFilter(),
      new shape_designer.filter.StrokeFilter()
    ]
  },

  removeFilter: function (filter) {
    this.filters.remove(filter)

    return this
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

    if (typeof attributes === "undefined") {
      attributes = {}
    }

    this.filters.each((i, filter) => {
      filter.apply(this, attributes)
    })

    this._super(attributes)
  },

  getPersistentAttributes: function () {
    var memento = this._super()

    memento.filters = []
    this.filters.each($.proxy(function (i, e) {
      var filterMemento = e.getPersistentAttributes(this)
      memento.filters.push(filterMemento)
    }, this))

    return memento
  },

  setPersistentAttributes: function (memento) {
    this._super(memento)


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
