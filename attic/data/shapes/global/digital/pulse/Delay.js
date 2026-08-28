var digital_pulse_Delay = CircuitFigure.extend({

   NAME: "digital_pulse_Delay",
   VERSION: "${VERSION}",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:84,height:69 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.59523809523809, y: 52.11524637681209 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
     this.read["Port"] = port.getValue.bind(port)
     this.write["Port"]= port.setValue.bind(port)

     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.1904761904761905, y: 52.11524637681209 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(1);
     this.read["Port"] = port.getValue.bind(port)
     this.write["Port"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 84;
      this.originalHeight= 69;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L84,0 L84,69 L0,69");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M84 69L0 69L0 0L84 0Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'delay');
       shape.attr({"x":40.265625,"y":34.7265625,"text-anchor":"start","text":"delay","font-family":"\"Arial\"","font-size":13,"stroke":"#000000","fill":"#D4D4D4","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M3.50 18.78L7.16,18.78L10.81,18.78L10.81,5.01L40.61,5.16L40.78,17.99L74.83,17.53');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M2.78 60.52L35.81,60.70L35.64,47.41L50.63,47.24L65.61,47.08L65.61,60.25L78.49,60.00');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M9.59 30.22L9.91,46.93');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M32.75 38.50L28.57,45.87');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M9.17 38.17L32.76,38.50');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M26.42 30.91L32.57,37.37');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M10.92 20.63L10.65,28.35');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(168,168,168,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.64 45.24L35.81,27.62');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(201,201,201,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custome code and event handler here.
 *
 *
 */
digital_pulse_Delay = digital_pulse_Delay.extend({

    init: function(attr, setter, getter){
     
        this._super(attr, setter, getter);

        this.on("change:userData.delay",(emitter, event)=>{
            var value = event.value;
            this.delayedValues = []; 
            this.delayedValues.length = parseInt(parseInt(value)/10);
            this.pointer=0;
            
        });
        this.attr({
            resizeable:false,
            "userData.delay":1500
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    /**
     * called every '10 [ms]' from the application. do a little bit calculation
     * to change the state every 100ms (10Hz)
     * 
     **/
    calculate:function(context)
    {
       this.getOutputPort(0).setValue(this.delayedValues[this.pointer]);
       this.delayedValues[this.pointer] = this.getInputPort(0).getBooleanValue();
       this.pointer = (this.pointer+1)%this.delayedValues.length; 
    },
    
    onStart:function(context)
    {
        this.currentTimer=0;
    },
    
    onStop:function(context)
    {
    },

    getParameterSettings: function()
    {
        return [
        {
            name:"delay",
            label:"Delay [ms]",
            property:{
                type: "integer",
                min: 10,
                max: 100,
                increment:10
        }
        
        }];
    }

});