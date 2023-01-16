// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_counter_4_Bit_Binary = CircuitFigure.extend({

   NAME: "digital_counter_4_Bit_Binary",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:163.3674000000001},attr), setter, getter);
     var port;
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.2083358764652985, y: 32.33337863000849 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(1);
     // out_a
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.86387500000183, y: 56.8457354404857 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_a");
     port.setMaxFanOut(20);
     // out_b
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.11387500000183, y: 69.08807999637628 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_b");
     port.setMaxFanOut(20);
     // out_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.11387500000183, y: 81.33042455226686 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_c");
     port.setMaxFanOut(20);
     // out_d
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.36387500000183, y: 93.57276910815744 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_d");
     port.setMaxFanOut(25);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.2083358764652985, y: 56.8457354404857 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(1);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.2083358764652985, y: 69.08807999637628 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(1);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.2083358764652985, y: 81.33042455226686 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(1);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.25, y: 93.5451014094614 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(1);
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.25, y: 20.09103407411791 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(1);
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 7.848689518227329 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 163.3674000000001;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,163.3674000000001 L0,163.3674000000001");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L78,0Q80,0 80, 2L80,160Q80,162 78, 162L2,162Q0,162 0, 160L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Binary');
       shape.attr({"x":21.400231298827748,"y":52.48280000000068,"text-anchor":"start","text":"Binary","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 45.03642606048652L13 53.77928320334013L0 62.03642606048652Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":59.42880629882802,"y":93.86740000000009,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":59.42880629882802,"y":113.36740000000009,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":60.42880629882802,"y":133.3674000000001,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":60.42880629882802,"y":152.3674000000001,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Counter');
       shape.attr({"x":19.400231298827748,"y":67.08280000000104,"text-anchor":"start","text":"Counter","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_counter_4_Bit_Binary = digital_counter_4_Bit_Binary.extend({

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
            a.setValue(!!(this.counter & 1));
            b.setValue(!!(this.counter & 2));
            c.setValue(!!(this.counter & 4));
            d.setValue(!!(this.counter & 8));
            this.counter= (this.counter+1)%10;
        }
        this.last_t = t;
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function()
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function()
    {
    }
});