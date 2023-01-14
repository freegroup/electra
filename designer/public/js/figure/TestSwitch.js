import colors from "../../../common/js/Colors"

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
    switch(this.value){
      case true:
        this.value = false
        break
      case false:
        this.value = null
        break
      case null:
        this.value = true
        break
    }
    if(this.value === undefined ||  this.value === null){
      this.attr({text: "NC"})
    }
    else {
      this.attr({text: this.value ? "High": "Low"})
    }
  }
})

