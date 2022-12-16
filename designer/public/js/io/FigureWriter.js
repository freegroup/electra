import Hogan from "hogan.js"

export default shape_designer.FigureWriter = draw2d.io.Writer.extend({

  init: function () {
    this._super()
  },

  /**
   * @method
   * Export the content to the implemented data format. Inherit class implements
   * content specific writer.
   * <br>
   * <br>
   *
   * Method signature has been changed from version 2.10.1 to version 3.0.0.<br>
   * The parameter <b>resultCallback</b> is required and new. The method calls
   * the callback instead of return the result.
   *
   * @param {draw2d.Canvas} canvas
   * @parma {String} className
   * @param {Function} resultCallback the method to call on success. The first argument is the result object, the second the base64 representation of the file content
   */
  marshal: function (canvas, className, resultCallback) {
    let baseClass = shape_designer.app.getConfiguration("baseClass")
    let customCode =  shape_designer.app.getConfiguration("code")
    customCode = customCode.replace(/testShape/g, className);

    let figures = canvas.getExtFigures()
    let b = canvas.getBoundingBox()

    let x = b.x
    let y = b.y

    let ports = []
    let shapes = []

    shapes.push({
      constructor: 'this.canvas.paper.path("M0,0 L' + (b.w) + ',0 L' + (b.w) + ',' + (b.h) + ' L0,' + (b.h) + '")',
      attr: '{"stroke":"none","stroke-width":0,"fill":"none"}',
      name: "BoundingBox"
    })

    figures.each(function (i, figure) {
      figure.uninstallEditPolicy("draw2d.policy.figure.RegionEditPolicy")
      let attr = {}
      figure.svgPathString = null
      figure.translate(-x, -y)
      // paint the element and fill the "attr" object with the current
      // settings
      figure.repaint(attr)
      delete attr.path
      delete attr.x
      delete attr.y
      if ((figure instanceof shape_designer.figure.ExtPolygon)) {
        shapes.push({
          constructor: "this.canvas.paper.path('" + figure.svgPathString + "')",
          attr: JSON.stringify(attr),
          extra: figure.getBlur() === 0 ? "" : "shape.blur(" + figure.getBlur() + ");\n",
          name: figure.getUserData().name
        })
      } else if ((figure instanceof shape_designer.figure.PolyCircle)) {
        shapes.push({
          constructor: "this.canvas.paper.ellipse()",
          attr: JSON.stringify(attr),
          extra: figure.getBlur() === 0 ? "" : "shape.blur(" + figure.getBlur() + ");\n",
          name: figure.getUserData().name
        })
      } else if ((figure instanceof shape_designer.figure.ExtLine)) {
        // the line itself
        shapes.push({
          constructor: "this.canvas.paper.path('" + figure.svgPathString + "')",
          attr: JSON.stringify(attr),
          extra: figure.getBlur() === 0 ? "" : "shape.blur(" + figure.getBlur() + ");\n",
          name: figure.getUserData().name
        })
      } else if (figure instanceof shape_designer.figure.ExtLabel) {
        attr = figure.svgNodes[0].attr()
        attr.x = attr.x + figure.getAbsoluteX()
        attr.y = attr.y + figure.getAbsoluteY()
        delete attr.transform
        shapes.push({
          constructor: "this.canvas.paper.text(0,0,'" + figure.getText() + "')",
          attr: JSON.stringify(attr),
          extra: "",
          name: figure.getUserData().name
        })
      } else if (figure instanceof shape_designer.figure.ExtPort) {
        let typeMapping ={
          "Input": "new DecoratedInputPort()",
          "Output": "new DecoratedOutputPort()",
          "Hybrid": "new DecoratedHybridPort()"
        }
        let methodMapping = {
          "Input": "addPort",
          "Output": "addPort",
          "Hybrid": "addPort"
        }
        ports.push({
          type: typeMapping[figure.getInputType()],
          method: methodMapping[figure.getInputType()],
          direction: figure.getConnectionDirection(),
          x: 100 / b.w * figure.getCenter().x,
          y: 100 / b.h * figure.getCenter().y,
          color: figure.getBackgroundColor().hash(),
          name: figure.getUserData().name,
          fanout: figure.getMaxFanOut()
        })
      }
      figure.translate(x, y)
    })

    let template = $("#shape-base-template").text().trim()

    let tags = className.split("_")
    let compiled = Hogan.compile(template)
    let tooltip= tags.length>0?tags.slice(-1)[0]:name;
    tooltip = tooltip.split(/\s*(?=[A-Z][a-z])/).join(" ")
    let output = compiled.render({
      tooltip: tooltip,
      className: className,
      baseClass: baseClass,
      figures: shapes,
      ports: ports,
      width: b.w,
      height: b.h
    })

    output = output + "\n\n" + customCode
    resultCallback(output, draw2d.util.Base64.encode(output))
  }
})
