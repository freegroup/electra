export default shape_designer.figure.TestSwitch = draw2d.shape.basic.Label.extend({

  NAME: "shape_designer.figure.TestSwitch",

  init: function (attr, setter, getter) {
    this._super({text: "Low"}, setter, getter)

    this.addPort(new DecoratedOutputPort())

    this.value = false
    this.on("click",  ()=> {
      this.toggleValue()
      this.getOutputPort(0).setValue(this.value)
      this.getOutputPort(0).getConnections().each( (i, c) =>{
        c.getTarget().setValue(this.value)
      })
    })
  },

  toggleValue: function () {
    this.value = !this.value
    this.attr({text: this.value ? "High" : "Low"})
  }
})

