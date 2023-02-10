// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_signal_8_SignalTarget = CircuitFigure.extend({

   NAME: "digital_signal_8_SignalTarget",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:60.03125,height:199.0789906250002},attr), setter, getter);
     var port;
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 23.871878777012395 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     // in2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.962999383865612, y: 33.92451931415344 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(1);
     // in3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 43.97078282855586 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in3");
     port.setMaxFanOut(1);
     // in4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 54.01704634295828 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in4");
     port.setMaxFanOut(1);
     // in5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 64.0633098573607 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in5");
     port.setMaxFanOut(1);
     // in6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 74.1095733717631 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in6");
     port.setMaxFanOut(1);
     // in7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 84.15583688616553 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in7");
     port.setMaxFanOut(1);
     // in8
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 5.802791158977219, y: 94.20210040056794 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in8");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 60.03125;
      this.originalHeight= 199.0789906250002;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L60.03125,0 L60.03125,199.0789906250002 L0,199.0789906250002");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M3.908863067626953 19.078990625000188L53.90886306762695 19.078990625000188L53.90886306762695 199.0789906250002L3.908863067626953 199.0789906250002Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":4,"y":10.7626953125,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Signal Bus');
       shape.attr({"x":4.011533737182617,"y":26.331190944672016,"text-anchor":"start","text":"Signal Bus","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M30.97008806762733 64.52949531250033L30.97008806763006,169.61909531250058');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M37.33488806762671 102.96709531249871L23.686888067632026,125.48629531250208');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Label
       shape = this.canvas.paper.text(0,0,'8 Bit');
       shape.attr({"x":20.011533737182617,"y":39.107990944671656,"text-anchor":"start","text":"8 Bit","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":10.483488067623512,"y":46.64748656845131,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'2');
       shape.attr({"x":10.483488067623512,"y":67.64748656845131,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'3');
       shape.attr({"x":10.483488067623512,"y":87.64748656845131,"text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4');
       shape.attr({"x":10.483488067623512,"y":107.64748656845131,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'5');
       shape.attr({"x":10.483488067623512,"y":127.64748656845131,"text-anchor":"start","text":"5","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'6');
       shape.attr({"x":10.483488067623512,"y":147.6474865684513,"text-anchor":"start","text":"6","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'7');
       shape.attr({"x":10.483488067623512,"y":167.6474865684513,"text-anchor":"start","text":"7","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'8');
       shape.attr({"x":10.483488067623512,"y":187.6474865684513,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_signal_8_SignalTarget = digital_signal_8_SignalTarget.extend({

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
        
        this.getInputPort("in5").on("connect",    (emitter, event)=>{ this.signalSourcePort[4] = event.connection.getSource() })
        this.getInputPort("in5").on("disconnect", (emitter, event)=>{ this.signalSourcePort[4] = null })
        
        this.getInputPort("in6").on("connect",    (emitter, event)=>{ this.signalSourcePort[5] = event.connection.getSource() })
        this.getInputPort("in6").on("disconnect", (emitter, event)=>{ this.signalSourcePort[5] = null })
        
        this.getInputPort("in7").on("connect",    (emitter, event)=>{ this.signalSourcePort[6] = event.connection.getSource() })
        this.getInputPort("in7").on("disconnect", (emitter, event)=>{ this.signalSourcePort[6] = null })
        
        this.getInputPort("in8").on("connect",    (emitter, event)=>{ this.signalSourcePort[7] = event.connection.getSource() })
        this.getInputPort("in8").on("disconnect", (emitter, event)=>{ this.signalSourcePort[7] = null })
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
        for (var i = 0; i<8; i++){
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