// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_timer_Delay = CircuitFigure.extend({

   NAME: "digital_timer_Delay",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:84,height:69},attr), setter, getter);
     var port;
     // output_0
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.59523809523809, y: 52.11524637681209 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_0");
     port.setMaxFanOut(20);
     // input_0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.357142857142857, y: 52.11524637681209 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_0");
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
       shape = this.canvas.paper.path('M84,67Q84,69 82, 69L2,69Q0,69 0, 67L0,2Q0,0 2, 0L82,0Q84,0 84, 2L84,67');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Delay');
       shape.attr({"x":39,"y":37.1796875,"text-anchor":"start","text":"Delay","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#D9D9D9","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M9.916348593882503 20.631087969915825L9.981884593883478,48.33643196991761');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(168,168,168,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.98444459388338 57.68939196991232L35.41100459388326,27.297071969915123');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(201,201,201,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // pulseline_top
       shape = this.canvas.paper.path('M4.002237499998955 19.776879999997618L9.309437499999149,19.776879999997618Q11.309437499999149,19.776879999997618 11.309437499999017, 17.776879999997618L11.30943749999837,8.006239999996978Q11.30943749999824,6.006239999996978 13.30931793710452, 6.0281086368907495L39.27579706289352,6.312051363103535Q41.2756774999998,6.333919999997306 41.2756774999998, 8.333919999997306L41.2756774999998,16.992499999997563Q41.2756774999998,18.992499999997563 43.275583463722825, 19.011894232776932L75.06557749999865,19.32017999999698');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","pulseline_top");
       
       // pulseline_bottom
       shape = this.canvas.paper.path('M3.1039974999966944 59.194799999995666L33.642557499997565,59.194799999995666Q35.642557499997565,59.194799999995666 35.642557499997565, 57.194799999995666L35.642557499997565,48.40719999999601Q35.642557499997565,46.40719999999601 37.64243793710385, 46.38533136310224L63.608917062891024,46.10138863688945Q65.60879749999731,46.07951999999568 65.60879749999731, 48.07951999999568L65.60879749999731,56.73809999999594Q65.60879749999731,58.73809999999594 67.60879749999731, 58.738099999995804L78.75485749999643,58.73809999999503');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","pulseline_bottom");
       
       // Line
       shape = this.canvas.paper.path('M11.086228750001283 33.84501399999499L11.41390875000252,42.430230000002666');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M33.25262875000226 38.00094999999965L30.385428749999846,42.22802200000024');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M29.60130075000143 34.49864599999819L33.074708750000354,37.873749999997926');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M11.171028750002733 38.167670000003454L33.12558875000104,38.495350000001054');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
digital_timer_Delay = digital_timer_Delay.extend({

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
            "userData.delay":500
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    /**
     * called every '10 [ms]' from the application.
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

    getParameterSettings:function()
    {
        return [
        {
            name:"delay",
            label:"Delay [ms]",
            property:{
                type: "integer",
                min: 10,
                max: 15000,
                increment:10
        }
        
        }];
    }

});