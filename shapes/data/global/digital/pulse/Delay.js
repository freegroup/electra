// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_pulse_Delay = CircuitFigure.extend({

   NAME: "digital_pulse_Delay",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:84,height:69},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.59523809523809, y: 52.11524637681209 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.1904761904761905, y: 52.11524637681209 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
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
       shape = this.canvas.paper.path('M3.502237499998955 18.776879999997618L7.155837499998597,18.776879999997618L10.809437499999149,18.776879999997618L10.80943749999824,5.006239999996978L40.60790533999989,5.1582835199978945L40.7756774999998,17.992499999997563L74.82772149999892,17.533747999996194');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M2.7763174999963667 60.522479999995994L35.81032965999748,60.698116479995406L35.642557499997565,47.40719999999601L50.62567749999744,47.243359999995846L65.60879749999731,47.07951999999568L65.60879749999731,60.249280799996086L78.49271349999617,60.00024399999529');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M9.586228750001283 30.218550000001414L9.91390875000252,46.930230000002666');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M32.75262875000226 38.50094999999965L28.574708750000354,45.873749999997926');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M9.171028750002733 38.167670000003454L32.763988749999044,38.495350000001054');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M26.418204481202338 30.914574268800607L32.574708750000354,37.373749999997926');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M10.916348593882503 20.631087969915825L10.654204593882241,28.347951969915812');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(168,168,168,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.63980459388222 45.23755196991533L35.80781268348346,27.62475196991545');
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