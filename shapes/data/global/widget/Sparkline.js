
var widget_Sparkline = draw2d.shape.diagram.Sparkline.extend({

    NAME : "widget_Sparkline",

    init : function(attr)
    {
        this._super(attr)
        this.maxValues = 100
        this.min = 0
        this.max = 5
        this.padding=4
        this.persistPorts = false

        this.inputPort = new DecoratedInputPort()
        this.inputPort.setName("input")
        this.inputPort.setMaxFanOut(1)

        this.outputPort = new DecoratedOutputPort()
        this.outputPort.setName("output")

        this.setBackgroundColor("#FF765E")
        this.setRadius(5)
        this.addPort(this.inputPort)
        this.addPort(this.outputPort)
        this.setDimension(250,50)

        // get the connected port and forward the port to the related party ( SignalSource shape)
        // The Sparkline forwards the original signal without any delay. The signal runtime is the same if the
        // Sparkline in between a connect or not
        this.inputPort.on("connect", (emitter, event)=>{
            let signalPort = event.connection.getSource()
            this.outputPort.originalGetValue = this.outputPort.getValue
            this.outputPort.originalGetBooleanValue = this.outputPort.getBooleanValue
            this.outputPort.getValue = ()=>{
                return signalPort.getValue()
            }
            this.outputPort.getBooleanValue = ()=>{
                return signalPort.getBooleanValue()
            }
        })
        this.inputPort.on("disconnect", (emitter, event)=>{
            this.outputPort.getValue = this.outputPort.originalGetValue
            this.outputPort.getBooleanValue = this.outputPort.originalGetBooleanValue
        })
    },

    setData:function( data)
    {
        this._super(data)
        this.cache= {}
        this.min = 0
        this.max = 5
        this.repaint()
    },


    /**
     * @method
     *
     * Update the chart with the current value of the input port.
     *
     */
    calculate:function(context)
    {
        let port = this.getInputPort(0)
        let value=port.getValue() || 0.0
        this.data.push(value===null?0:value)
        if(this.data.length>this.maxValues) {
            this.data.shift()
        }
        this.setData(this.data)
    },

    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
        return {
            arduino: false
        }
    }
});
