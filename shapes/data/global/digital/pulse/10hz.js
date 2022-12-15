// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_pulse_10hz = CircuitFigure.extend({

   NAME: "digital_pulse_10hz",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:31.6640625,height:48.60950000000048},attr), setter, getter);
     var port;
     // outputPort
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.15815445349125, y: 69.87543587158933 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("outputPort");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 31.6640625;
      this.originalHeight= 48.60950000000048;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L31.6640625,0 L31.6640625,48.60950000000048 L0,48.60950000000048");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.6640625 18.60950000000048L31.6640625 18.60950000000048L31.6640625 48.60950000000048L1.6640625 48.60950000000048Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'10Hz');
       shape.attr({"x":4,"y":10.578125,"text-anchor":"start","text":"10Hz","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M3.393662499999664 41.239300000000185L10.575662499999453,41.239300000000185L10.575662499999453,30.979299999999967L22.066862499999843,30.979299999999967L22.066862499999843,40.82889999999952L28.633262499999546,40.82889999999952');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
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
digital_pulse_10hz = digital_pulse_10hz.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.currentTimer=0;
        this.value = 0.0
    },
    
    calculate:function()
    {
       // 2  ticks => 50Hz   
       // 10 ticks => 10Hz 
       this.currentTimer = (this.currentTimer+1)%10; 
       if(this.currentTimer===0){
           this.value = 5.0-this.value;
           this.getOutputPort(0).setValue(this.value);
       }
    },
    
    onStart:function()
    {
         this.currentTimer=0;
    },
    
    onStop:function()
    {
    }

});