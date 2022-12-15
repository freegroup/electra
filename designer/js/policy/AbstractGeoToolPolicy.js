import AbstractToolPolicy from "./AbstractToolPolicy"

const jsts = require("jsts/dist/jsts")

/* jshint evil: true */
export default AbstractToolPolicy.extend({

  init: function () {
    this._super()
    this.firstFigure = null
    this.operation = null
  },

  select: function (canvas, figure) {

    if (canvas.getSelection().getAll().contains(figure)) {
      return // nothing to to
    }

    // check if the element an valid polygon. otherwise an boolean operation
    // isn't possible
    if (!(figure instanceof shape_designer.figure.ExtPolygon)) {
      return
    }

    if (canvas.getSelection().getPrimary() !== null) {
      this.unselect(canvas, canvas.getSelection().getPrimary())
    }

    if (figure !== null) {
      figure.select(true) // primary selection
    }

    canvas.getSelection().setPrimary(figure)

    // inform all selection listeners about the new selection.
    //
    canvas.fireEvent("select", {figure: figure})
  },


  execute: function (canvas, firstFigure, figure) {
    if (firstFigure instanceof draw2d.util.ArrayList) {
      if (firstFigure.getSize() < 2) {
        return // silently
      }
      figure = firstFigure.get(1)
      firstFigure = firstFigure.get(0)
    }
    this.executeGeometryOperation(canvas, firstFigure, figure, this.operation)
  },

  executeGeometryOperation: function (canvas, figure1, figure2, operationFunc) {
    // must be "var" and not "let"....see the eval method.
    var p1 = this.getGeometry(figure1)
    var p2 = this.getGeometry(figure2)
    let union = eval("p1." + operationFunc + "(p2)")

    let geo = new jsts.io.GeoJSONWriter().write(union)
    let memento = figure1.getPersistentAttributes()
    let cmd = new draw2d.command.CommandCollection()
    cmd.add(new draw2d.command.CommandDelete(figure1))
    cmd.add(new draw2d.command.CommandDelete(figure2))
    $.each(geo.coordinates, $.proxy(function (i, poly) {
      let figure = new shape_designer.figure.ExtPolygon()
      figure.setPersistentAttributes(memento)
      figure.vertices = new draw2d.util.ArrayList()
      $.each(poly, function (i, vertex) {
        figure.addVertex(vertex[0], vertex[1])
      })
      let command = new draw2d.command.CommandAdd(canvas, figure, figure.getX(), figure.getY())
      cmd.add(command)
    }, this))
    canvas.getCommandStack().execute(cmd)
    this.executed()
  },

  getGeometry: function (figure) {
    let reader = new jsts.io.WKTReader()
    let v = figure.getVertices().clone().asArray()
    v.push(v[0])
    return reader.read("POLYGON((" + $.map(v, function (e) {
      return e.x + " " + e.y
    }).join(", ") + "))")
  }

})




