import FigureWriter from "./../io/FigureWriter"
import toast from "../../common/js/toast";

export default class FigureTest {

  constructor() {
    this.simulationContext = {}
  }

  show() {
    let _this = this
    this.animationFrameFunc = this._calculate.bind(this)

    this.simulationContext = {}

    let writer = new FigureWriter()
    let testShape = null
    writer.marshal(shape_designer.app.view, "testShape", function (js) {
      try {
        js = /*$("#decoratedport-template").text().trim() +*/ js
        console.log(js)
        testShape = eval(js)
      }
      catch (exc) {
        toast("Error in shape code.<br>Remove error and try it again")
        throw exc
      }
      let splash = $(` 
        <div class="overlay-scale" id="testDialog">
          <div id="testCanvas">
          </div>
          <div  class="testInfo" >Test page for your designed and coded draw2d shape.</div>
          <div class="tinyFlyoverMenu">
            <div id="test_close" class='fa fa-close' ></div>
          </div>
        <div>
        `)

      // fadeTo MUSS leider sein. Man kann mit raphael keine paper.text elemente einfügen
      // wenn das canvas nicht sichtbar ist. In diesen Fall mach ich das Canvas "leicht" sichtbar und raphael ist
      // zufrieden.
      $("body").append(splash)

      let canvas = new draw2d.Canvas("testCanvas")
      _this.canvas = canvas
      canvas.installEditPolicy(new draw2d.policy.canvas.ShowDotEditPolicy(20, 1, "#FF4981"))
      let router = new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
      canvas.installEditPolicy(new draw2d.policy.connection.ComposedConnectionCreatePolicy(
        [
          // create a connection via Drag&Drop of ports
          //
          new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function () {
              return new draw2d.Connection({
                radius: 3,
                stroke: 2,
                color: "#129CE4",
                outlineStroke: 1,
                outlineColor: "#ffffff",
                router: router
              })
            }
          }),
          // or via click and point
          //
          new draw2d.policy.connection.OrthogonalConnectionCreatePolicy({
            createConnection: function () {
              return new draw2d.Connection({
                radius: 3,
                stroke: 2,
                color: "#129CE4",
                outlineStroke: 1,
                outlineColor: "#ffffff",
                router: router
              })
            }
          })
        ])
      )
      let test = new testShape()
      canvas.add(test, 400, 160)

      // create and add two nodes which contains Ports (In and OUT)
      //
      let start = new draw2d.shape.node.Start()
      let toggle1 = new shape_designer.figure.TestSwitch()
      let toggle2 = new shape_designer.figure.TestSwitch()
      let end = new draw2d.shape.node.End()

      // ...add it to the canvas
      canvas.add(toggle1, 50, 150)
      canvas.add(toggle2, 50, 200)
      canvas.add(start, 50, 250)
      canvas.add(end, 630, 250)

      canvas.setCurrentSelection(test)
      let removeDialog = function () {

        _this.simulate = false
        splash.removeClass("open")
        setTimeout(function () {
          splash.remove()
          test.onStop(_this.simulationContext)
        }, 400)
      }

      $(".tinyFlyoverMenu").on("click", "#test_close", removeDialog)
      splash.addClass("open")

      test.onStart(_this.simulationContext)

      _this.simulate = true
      requestAnimationFrame(_this.animationFrameFunc)
    })
  }

  _calculate() {
    // call the "calculate" method if given to calculate the output-port values
    //
    let figures = this.canvas.getFigures().clone().grep( (f) => {
      return f.calculate
    })
    figures.each( (i, figure) => {
      figure.calculate(this.simulationContext)
    })

    // transport the value from oututPort to inputPort
    //
    this.canvas.getLines().each( (i, line) => {
      let outPort = line.getSource()
      let inPort = line.getTarget()
      inPort.setValue(outPort.getValue())
      line.setColor(outPort.getValue() ? "#ff5252" : "#0000ff")
    })

    if (this.simulate === true) {
      requestAnimationFrame(this.animationFrameFunc)
    }
  }
}
