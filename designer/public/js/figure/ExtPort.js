export default shape_designer.figure.ExtPort = draw2d.shape.basic.Circle.extend({

  NAME: "shape_designer.figure.ExtPort",


  init: function () {
    this.isExtFigure = true
    this.decoration = null
    this.normalStyle = {
      bgColor: "#37B1DE",
      diameter: 10
    }
    this.hiddenStyle = {
      bgColor: "#000000",
      diameter: 3
    }

    this._super(this.normalStyle)


    this.setUserData({
      name: "Port",
      type: "Hybrid",
      direction: null,
      fanout: 20
    })

    this.filters = new draw2d.util.ArrayList()
    this.filters.add(new shape_designer.filter.PositionFilter())
    this.filters.add(new shape_designer.filter.FanoutFilter())
    this.filters.add(new shape_designer.filter.PortDirectionFilter())
    this.filters.add(new shape_designer.filter.PortTypeFilter())

    this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy())
  },


  setInputType: function (type) {
    this.getUserData().type = type
  },

  getInputType: function () {
    return this.getUserData().type
  },

  setMaxFanOut: function (count) {
    this.getUserData().fanout = parseInt(count)
  },

  getMaxFanOut: function () {
    return this.getUserData().fanout ? this.getUserData().fanout : 20
  },


  setConnectionDirection: function (direction) {
    this.getUserData().direction = direction
    this.updateDecoration()
  },

  getConnectionDirection: function () {
    return this.getUserData().direction
  },


  updateDecoration: function () {
    if (this.decoration !== null) {
      this.remove(this.decoration)
      this.decoration = null
    }
    let figure = null
    let locator = null
    switch (this.getConnectionDirection()) {
      case 0:
        figure = new draw2d.shape.icon.ArrowUp({width: 8, height: 8, opacity: 0.5})
        locator = new draw2d.layout.locator.TopLocator()
        break
      case 1:
        figure = new draw2d.shape.icon.ArrowRight({width: 8, height: 8, opacity: 0.5})
        locator = new draw2d.layout.locator.RightLocator()
        break
      case 2:
        figure = new draw2d.shape.icon.ArrowDown({width: 8, height: 8, opacity: 0.5})
        locator = new draw2d.layout.locator.BottomLocator()
        break
      case 3:
        figure = new draw2d.shape.icon.ArrowLeft({width: 8, height: 8, opacity: 0.5})
        locator = new draw2d.layout.locator.LeftLocator()
        break
    }
    if (figure !== null) {
      this.add(figure, locator)
      this.decoration = figure
      locator.relocate(0,figure)

    }
  },

  hideDecoration: function () {
    this.attr(this.hiddenStyle)
    if( this.decoration ){
      this.decoration.setVisible(false)
    }
  },

  showDecoration: function () {
    this.attr(this.normalStyle)
    if( this.decoration ){
      this.decoration.setVisible(true)
    }
  },


  getPotentialFilters: function () {
    return [
      {label: "Port Type",      impl: "shape_designer.filter.PortTypeFilter"},
      {label: "Port Direction", impl: "shape_designer.filter.PortDirectionFilter"},
      {label: "Color",          impl: "shape_designer.filter.FillColorFilter"}
    ]
  },

  removeFilter: function (filter) {
    this.filters.remove(filter)
  },

  addFilter: function (filter) {
    let alreadyIn = false

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

    this.filters.each( (i, filter) => {
      filter.apply(this, attributes)
    })

    this._super(attributes)
  },

  getPersistentAttributes: function () {
    let memento = this._super()

    memento.filters = []
    this.filters.each( (i, e) => {
      let filterMemento = e.getPersistentAttributes(this)
      memento.filters.push(filterMemento)
    })
    return memento
  },

  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.filters !== "undefined") {
      this.filters = new draw2d.util.ArrayList()
      let fanoutFilterAdded = false
      $.each(memento.filters, (i, e) => {
        let filter = eval("new " + e.name + "()")
        if (filter instanceof shape_designer.filter.FanoutFilter) {
          fanoutFilterAdded = true
        }
        filter.setPersistentAttributes(this, e)
        this.filters.add(filter)
      })
      if (!fanoutFilterAdded) {
        this.filters.insertElementAt(new shape_designer.filter.FanoutFilter(), 1)
      }

    }
    this.updateDecoration()
  }
})
