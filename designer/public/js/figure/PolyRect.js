import ExtPolygon from "./ExtPolygon"

export default shape_designer.figure.PolyRect = ExtPolygon.extend({

  NAME: "shape_designer.figure.PolyRect",

  init: function (topLeft, bottomRight) {
    this._super()
    if (typeof topLeft === "undefined") {
      this.vertices = new draw2d.util.ArrayList()
      this.addVertex(new draw2d.geo.Point(100, 100))
      this.addVertex(new draw2d.geo.Point(140, 100))
      this.addVertex(new draw2d.geo.Point(140, 140))
      this.addVertex(new draw2d.geo.Point(100, 140))
    }
    else {
      this.vertices = new draw2d.util.ArrayList()
      this.addVertex(new draw2d.geo.Point(topLeft.x, topLeft.y))
      this.addVertex(new draw2d.geo.Point(bottomRight.x, topLeft.y))
      this.addVertex(new draw2d.geo.Point(bottomRight.x, bottomRight.y))
      this.addVertex(new draw2d.geo.Point(topLeft.x, bottomRight.y))
    }

    this.setUserData({name: "Rectangle"})
  }
})
