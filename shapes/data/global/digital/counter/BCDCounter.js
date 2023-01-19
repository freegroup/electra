// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_counter_BCDCounter = CircuitFigure.extend({

   NAME: "digital_counter_BCDCounter",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80.025390625,height:113.5},attr), setter, getter);
     var port;
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.2079524931056702, y: 37.44493392070484 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(1);
     // out_a
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.81638737705423, y: 37.05594713656396 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_a");
     port.setMaxFanOut(20);
     // out_b
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.06599077441346, y: 54.6770925110133 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_b");
     port.setMaxFanOut(20);
     // out_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.06599077441346, y: 72.29823788546264 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_c");
     port.setMaxFanOut(20);
     // out_d
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.81638737705423, y: 89.91938325991197 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_d");
     port.setMaxFanOut(25);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80.025390625;
      this.originalHeight= 113.5;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80.025390625,0 L80.025390625,113.5 L0,113.5");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,4.350000000000364Q0,2.350000000000364 2, 2.350000000000364L78,2.350000000000364Q80,2.350000000000364 80, 4.350000000000364L80,108.35000000000036Q80,110.35000000000036 78, 110.35000000000036L2,110.35000000000036Q0,110.35000000000036 0, 108.35000000000036L0,4.350000000000364');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'BCD Counter');
       shape.attr({"x":4.5,"y":11,"text-anchor":"start","text":"BCD Counter","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 34L18 42.74285714285361L0 51Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":60.51770629882776,"y":42,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":60.51770629882776,"y":62,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":60.01770629882776,"y":82,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":60.01770629882776,"y":102.5,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

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
digital_counter_BCDCounter = digital_counter_BCDCounter.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

         // your special code here
         this.last_t=false;
         this.counter=0;
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function()
    {
        var t = this.getInputPort(0).getBooleanValue();

        var rising = this.last_t===false && t===true; 
        if(rising===true){
            var a = this.getOutputPort("out_a");
            var b = this.getOutputPort("out_b");
            var c = this.getOutputPort("out_c");
            var d = this.getOutputPort("out_d");
            a.setValue(this.counter&1?true:false);
            b.setValue(this.counter&2?true:false);
            c.setValue(this.counter&4?true:false);
            d.setValue(this.counter&8?true:false);
            this.counter= (this.counter+1)%10;
        }
        this.last_t = t;
    }
});