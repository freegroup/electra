let signal_VerticalBusLocator = draw2d.layout.locator.Locator.extend({
  NAME: "signal_VerticalBusLocator",

  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  relocate: function (index, target) {
    let parent = target.getParent()
    let boundingBox = parent.getBoundingBox()

    let targetBoundingBox = target.getBoundingBox()
    target.setPosition(boundingBox.w / 2 - (targetBoundingBox.w / 2), (targetBoundingBox.h + 2))
  }
})


var signal_VerticalBus = draw2d.shape.node.VerticalBus.extend({
    NAME: "signal_VerticalBus",
    VERSION: "1.0.0",

    init: function (attr) {
        this._super({width:15, height:300, text:"Vertical Bus",...attr});

        // remove the "circle decoration" of the hybrid port.
        let port = this.getHybridPort(0)
        port.remove(port.getChildren().first())

        // no Input connection is allowd for the circuit simulator.
        // it is working as a signal bus consuming fro the global signal context
        port.setMaxFanIn(0)

        this.persistPorts = false

        this.on("change:userData.signalId",(emitter, event)=>{
            this.setLabel(event.value)
            // reset the getValue method
            this.getHybridPort(0).getValue = ()=> 0
        });
        this.on("added", ()=>{
            var signalId = this.attr("userData.signalId")
            if(!signalId){
                signalId = "Signal_Id"
                this.attr("userData.signalId", signalId)
            }            
            this.setLabel(signalId)
        })
    },

    setLabel: function (label) {
        // Create any Draw2D figure as decoration for the connection
        //
        if (this.label === null) {
          this.label = new draw2d.shape.basic.Label({angle: 90, text: label, color: "#0d0d0d", fontColor: "#0d0d0d", stroke: 0})
          // add the new decoration to the connection with a position locator.
          //
          this.add(this.label, new signal_VerticalBusLocator())
          this.label.setSelectionAdapter( () => this )
          this.label.delegateTarget = () => this.port
        } else {
          this.label.setText(label)
        }
    },
  

    onPreStart:function(context) {
        context.signalPorts &&= {}
    },

    onStart:function(context)
    {
        var signalId = this.attr("userData.signalId")
        this.getHybridPort(0).getValue = () => context.signalPorts[signalId]?.getValue()
  },
    
    getParameterSettings: function () {
        return [
            {
                name:"signalId",
                label:"Signal Id",
                property:{
                    type: "string"
                }
            }];
    }

});

