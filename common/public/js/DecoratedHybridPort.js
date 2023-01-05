import Values from "./Values"

let locator = require("./PortDecorationCenterLocator").default
let growPolicy = new draw2d.policy.port.IntrusivePortsFeedbackPolicy()
growPolicy.growFactor = 1.5

export default draw2d.HybridPort.extend({

  NAME: "DecoratedHybridPort",

  init: function (attr, setter, getter) {
    this._super({...attr, coronaWidth: 2}, setter, getter)

    this.installEditPolicy(growPolicy)


    let circle = new draw2d.shape.basic.Circle({radius:2, stroke:0, bgColor: "#909090"})
    circle.hitTest = () => false
    this.add(circle, locator)

    this.setValue(Values.DIGITAL_LOW)
  },

  setValue: function (value = Values.DIGITAL_LOW) {
    // convert boolean values to 5volt TTL pegel logic
    //
    if (typeof value === "boolean"){
      value = value ? 5.0: 0.0
    }
    this._super(value)
  },

  /**
   * Converts power values (0-5 volt) to boolean logic (TRUE/FALSE)
   * v <= 1.5volt  => FALSE
   * v >  1.5volt  => TRUE
   *
   * normally v must be greater to 2.2v to be HIGH. But the software can'T handle undefined values right now.
   */
  getBooleanValue: function(){
    return this.getValue()>1.5
  },

  /**
   *
   * Set Canvas must be overridden because all "children" must be painted BEHIND the main figures.
   * This behaviour is different to the base implementation.
   *
   * If the port fades out - the little circle stays visible. This is the wanted effect.
   *
   * @param {draw2d.Canvas} canvas the new parent of the figure or null
   */
  setCanvas: function (canvas) {
    // remove the shape if we reset the canvas and the element
    // was already drawn
    if (canvas === null && this.shape !== null) {
      if (this.isSelected()) {
        this.unselect()
      }
      this.shape.remove()
      this.shape = null
    }


    // child must be init BEFORE the main shape. Now the child is behind the main shape and
    // this is exact the behaviour we want.
    //
    this.children.each( (i, e) => {
      e.figure.setCanvas(canvas)
    })

    this.canvas = canvas

    if (this.canvas !== null) {
      this.getShapeElement()
    }

    // reset the attribute cache. We must start by paint all attributes
    //
    this.lastAppliedAttributes = {}


    if (canvas === null) {
      this.stopTimer()
    } else {
      if (this.timerInterval >= this.MIN_TIMER_INTERVAL) {
        this.startTimer(this.timerInterval)
      }
    }
    return this
  }
})


