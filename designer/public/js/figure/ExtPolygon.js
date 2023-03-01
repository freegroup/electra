require ("../filter/index")
import PositionFilter from "../filter/PositionFilter"
import SizeFilter from "../filter/SizeFilter"
import StrokeFilter from "../filter/StrokeFilter"
import FillColorFilter from "../filter/FillColorFilter"

/* jshint evil:true */
// required for serialie/deserialize of JSON
export default shape_designer.figure.ExtPolygon = draw2d.shape.basic.Polygon.extend({

  NAME: "shape_designer.figure.ExtPolygon",


  init: function (attr, setter, getter) {
    this.blur = 0

    this.isExtFigure = true

    this._super(attr, setter, getter)

    this.setUserData({name: "Polygon"})

    this.filters = new draw2d.util.ArrayList()
    this.filters.add(new PositionFilter())
    this.filters.add(new SizeFilter())
    this.filters.add(new StrokeFilter())
    this.filters.add(new FillColorFilter())

    this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
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
      new shape_designer.filter.StrokeFilter(),
      new shape_designer.filter.OpacityFilter(),
      new shape_designer.filter.BlurFilter(),
      new shape_designer.filter.RadiusFilter(),
      new shape_designer.filter.LinearGradientFilter(),
      new shape_designer.filter.FillColorFilter()
    ]
  },

  removeFilter: function (filter) {
    this.filters.remove(filter)
  },

  addFilter: function (filter) {
    var alreadyIn = false

    this.filters.each((i, e) => {
      alreadyIn = alreadyIn || (e.NAME === filter.NAME)
    })

    if (alreadyIn === true) {
      return // silently
    }

    this.filters.add(filter)
    filter.onInstall(this)
    this.repaint()
  },

  onDoubleClick: function () {
    this.installEditPolicy(new draw2d.policy.figure.VertexSelectionFeedbackPolicy())
  },

  /**
   * @method
   * Unselect the figure and propagete this event to all edit policies.
   *
   * @final
   * @private
   **/
  unselect: function () {
    this._super()

    this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
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

    if (this.svgPathString === null) {
      this.calculatePath()
    }

    // It is important, that we keep the original "attributes" object and mutating them
    // if possible. The caller needs the modified 'attributes' object
    // Won't work: attributes = {...attributes ,  path: this.svgPathString})
    //
    attributes ??={}
    Object.assign(attributes, { path: this.svgPathString})

    this.filters.each( (i, filter) => {
      filter.apply(this, attributes)
    })

    this._super(attributes)
  },

  getPersistentAttributes: function () {
    var memento = this._super()

    memento.blur = this.blur
    memento.filters = []
    this.filters.each( (i, e)=> {
      var filterMemento = e.getPersistentAttributes(this)
      memento.filters.push(filterMemento)
    })

    return memento
  },

  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.blur !== "undefined")
      this.setBlur(memento.blur)

    if (typeof memento.filters !== "undefined") {
      this.filters = new draw2d.util.ArrayList()
      var sizeFilterAdded = false
      $.each(memento.filters, $.proxy(function (i, e) {

        var filter = eval("new " + e.name + "()")
        if (filter instanceof shape_designer.filter.SizeFilter) {
          sizeFilterAdded = true
        }
        filter.setPersistentAttributes(this, e)
        this.filters.add(filter)
      }, this))
      if (!sizeFilterAdded) {
        this.filters.insertElementAt(new shape_designer.filter.SizeFilter(), 1)
      }
    }
  }
})
