var digital_signal_4_SignalTarget = CircuitFigure.extend({

   NAME: "digital_signal_4_SignalTarget",
   VERSION: "${VERSION}",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:60.03125,height:119.07899062500019 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 39.90955504666702 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     this.read["in1"] = port.getValue.bind(port)
     this.write["in1"]= port.setValue.bind(port)

     // in2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.962999383865612, y: 56.715790309042866 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(1);
     this.read["in2"] = port.getValue.bind(port)
     this.write["in2"]= port.setValue.bind(port)

     // in3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 73.51136431838543 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in3");
     port.setMaxFanOut(1);
     this.read["in3"] = port.getValue.bind(port)
     this.write["in3"]= port.setValue.bind(port)

     // in4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 90.30693832772799 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in4");
     port.setMaxFanOut(1);
     this.read["in4"] = port.getValue.bind(port)
     this.write["in4"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 60.03125;
      this.originalHeight= 119.07899062500019;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L60.03125,0 L60.03125,119.07899062500019 L0,119.07899062500019");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M3.908863067626953 19.078990625000188L53.90886306762695 19.078990625000188L53.90886306762695 119.07899062500019L3.908863067626953 119.07899062500019Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":4,"y":10.76,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Signal Bus');
       shape.attr({"x":4.011533737182617,"y":26.331390625000388,"text-anchor":"start","text":"Signal Bus","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M30.97 49.03L30.97,111.44');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M37.33 66.47L23.69,88.99');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4 Bit');
       shape.attr({"x":20.011533737182617,"y":39.10819062500003,"text-anchor":"start","text":"4 Bit","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":10.483488067623512,"y":46.647686248779685,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'2');
       shape.attr({"x":10.483488067623512,"y":67.64768624877968,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'3');
       shape.attr({"x":10.483488067623512,"y":87.64768624877968,"text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4');
       shape.attr({"x":10.483488067623512,"y":107.64768624877968,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
digital_signal_4_SignalTarget = digital_signal_4_SignalTarget.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        

        this.on("change:userData.busId",(emitter, event)=>{
            this.layerAttr("label", {text: event.value})
        });
        
        this.on("added", ()=>{
            this.busId = this.attr("userData.busId")
            if(!this.busId){
                this.busId = "Bus_Id"
                this.attr("userData.busId", this.busId)
            }            
            this.layerAttr("label", {text: this.busId})
        })
        
        // get the connected port and forward the port to the related party ( SignalSource shape)
        //
        this.signalSourcePort = []
        this.getInputPort("in1").on("connect",    (emitter, event)=>{ this.signalSourcePort[0] = event.connection.getSource() })
        this.getInputPort("in1").on("disconnect", (emitter, event)=>{ this.signalSourcePort[0] = null })
        
        this.getInputPort("in2").on("connect",    (emitter, event)=>{ this.signalSourcePort[1] = event.connection.getSource() })
        this.getInputPort("in2").on("disconnect", (emitter, event)=>{ this.signalSourcePort[1] = null })
        
        this.getInputPort("in3").on("connect",    (emitter, event)=>{ this.signalSourcePort[2] = event.connection.getSource() })
        this.getInputPort("in3").on("disconnect", (emitter, event)=>{ this.signalSourcePort[2] = null })
        
        this.getInputPort("in4").on("connect",    (emitter, event)=>{ this.signalSourcePort[3] = event.connection.getSource() })
        this.getInputPort("in4").on("disconnect", (emitter, event)=>{ this.signalSourcePort[3] = null })
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    onPreStart:function(context)
    {
        // first check if any object already create the signal context
        context.signalPorts ??= {}
    },

    calculate:function(context)
    {
        for (var i = 0; i<4; i++){
            // either signalPort can be undefined of the result of getValue...
            let value = this.signalSourcePort[i]?.getValue()
            // override the source of the signal if we have a "connected" source. 
            // This is the semantic of a "bus". Only connected (tri state sources) ports can transfer data
            // to the bus.
            
            if(value !==null && value!==undefined ){
                if(context.signalPorts[this.busId+":"+(i+1)] !== this.signalSourcePort[i]){
                    context.signalPorts[this.busId+":"+(i+1)] = this.signalSourcePort[i];
                }
            }
            // it is "undefined". In this case remove it from the bus
            else if (context.signalPorts[this.busId+":"+(i+1)] === this.signalSourcePort[i]){
                context.signalPorts[this.busId+":"+(i+1)] = null
            }            
        }
    },
    
    getParameterSettings: function()
    {
        return [
        {
            name:"busId",
            label:"Bus Id",
            property:{
                type: "string"
            }
        }];
    }
});