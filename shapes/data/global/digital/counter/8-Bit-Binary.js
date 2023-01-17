// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_counter_8_Bit_Binary = CircuitFigure.extend({

   NAME: "digital_counter_8_Bit_Binary",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:81.51953125,height:264.0488999999998},attr), setter, getter);
     var port;
     // input_clk
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9509798624753654, y: 33.516519099303224 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_clk");
     port.setMaxFanOut(1);
     // output_q1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 96.70238918970902, y: 42.53075850723096 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q1");
     port.setMaxFanOut(20);
     // output_q2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 97.9290890794977, y: 50.10511310594356 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q2");
     port.setMaxFanOut(20);
     // output_q3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 97.9290890794977, y: 57.679467704656155 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q3");
     port.setMaxFanOut(20);
     // output_q4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.06799559154727, y: 65.15796884592207 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q4");
     port.setMaxFanOut(25);
     // input_d1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5044668527485416, y: 42.53075850723096 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d1");
     port.setMaxFanOut(1);
     // input_d2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5044668527485416, y: 50.10511310594356 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d2");
     port.setMaxFanOut(1);
     // input_d3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5044668527485416, y: 57.679467704656155 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d3");
     port.setMaxFanOut(1);
     // input_d4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.54535435334707, y: 65.23670426197582 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d4");
     port.setMaxFanOut(1);
     // input_reset
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9918673630738936, y: 25.942164500590632 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_reset");
     port.setMaxFanOut(1);
     // input_enable
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.23483252671478821, y: 10.604096438197631 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_enable");
     port.setMaxFanOut(1);
     // input_load
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9918673630738936, y: 18.178451036910225 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_load");
     port.setMaxFanOut(1);
     // input_d5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.54535435334707, y: 72.73232344463467 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d5");
     port.setMaxFanOut(1);
     // input_d6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.54535435334707, y: 80.30667804334726 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d6");
     port.setMaxFanOut(1);
     // input_d7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5213953711246346, y: 87.88103264205985 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d7");
     port.setMaxFanOut(1);
     // input_d8
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5213953711246346, y: 95.6437614396425 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d8");
     port.setMaxFanOut(1);
     // output_q5
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.06799559154727, y: 72.82817690208134 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q5");
     port.setMaxFanOut(25);
     // output_q6
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.15578896928638, y: 80.30667804334726 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q6");
     port.setMaxFanOut(25);
     // output_q7
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.15578896928638, y: 87.88103264205985 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q7");
     port.setMaxFanOut(25);
     // output_q8
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.06799559154727, y: 95.45538724077245 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q8");
     port.setMaxFanOut(25);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 81.51953125;
      this.originalHeight= 264.0488999999998;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L81.51953125,0 L81.51953125,264.0488999999998 L0,264.0488999999998");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.759765625,5.097800000000461Q0.759765625,3.0978000000004613 2.759765625, 3.0978000000004613L78.759765625,3.0978000000004613Q80.759765625,3.0978000000004613 80.759765625, 5.097800000000461L80.759765625,261.09780000000046Q80.759765625,263.09780000000046 78.759765625, 263.09780000000046L2.759765625,263.09780000000046Q0.759765625,263.09780000000046 0.759765625, 261.09780000000046L0.759765625,5.097800000000461');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Binary Counter');
       shape.attr({"x":4,"y":11,"text-anchor":"start","text":"Binary Counter","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.6914343750004264 80.214226060486L13.691434375000426 88.95708320333961L0.6914343750004264 97.214226060486Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":60.66904067382802,"y":113.30199999999968,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":60.66904067382802,"y":132.80199999999968,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":60.66904067382802,"y":152.80199999999968,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":60.66904067382802,"y":171.80199999999968,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D1');
       shape.attr({"x":6.240234375,"y":113.30199999999968,"text-anchor":"start","text":"D1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":6.740234375,"y":132.80199999999968,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":7.240234375,"y":152.80199999999968,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":6.188141337585876,"y":171.54889999999978,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'load');
       shape.attr({"x":7.224765673828188,"y":49,"text-anchor":"start","text":"load","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'enable');
       shape.attr({"x":6.691434375000426,"y":27.889000000000124,"text-anchor":"start","text":"enable","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'reset');
       shape.attr({"x":6.691434375000426,"y":68.714226060486,"text-anchor":"start","text":"reset","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D5');
       shape.attr({"x":7.191434375000426,"y":191.80199999999968,"text-anchor":"start","text":"D5","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D6');
       shape.attr({"x":7.191434375000426,"y":211.80199999999968,"text-anchor":"start","text":"D6","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D7');
       shape.attr({"x":7.191434375000426,"y":231.80199999999968,"text-anchor":"start","text":"D7","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D8');
       shape.attr({"x":7.191434375000426,"y":251.80199999999968,"text-anchor":"start","text":"D8","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q5');
       shape.attr({"x":60.66904067382802,"y":192.04889999999978,"text-anchor":"start","text":"Q5","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q6');
       shape.attr({"x":60.66904067382802,"y":212.04889999999978,"text-anchor":"start","text":"Q6","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q7');
       shape.attr({"x":60.66904067382802,"y":232.04889999999978,"text-anchor":"start","text":"Q7","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q8');
       shape.attr({"x":60.66904067382802,"y":253.04889999999978,"text-anchor":"start","text":"Q8","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_counter_8_Bit_Binary = digital_counter_8_Bit_Binary.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

         // your special code here
         this.last_clk=false;
         this.counter=0;
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function()
    {
        var clk    = this.getInputPort("input_clk").getBooleanValue();
        var load   = this.getInputPort("input_load").getBooleanValue();
        var enable = this.getInputPort("input_enable").getBooleanValue();
        var reset  = this.getInputPort("input_reset").getBooleanValue();
        
        var rising = this.last_clk===false && clk===true;
        
        if(reset ){
            this.counter= 0;
            this.getOutputPort("output_q1").setValue(0);
            this.getOutputPort("output_q2").setValue(0);
            this.getOutputPort("output_q3").setValue(0);
            this.getOutputPort("output_q4").setValue(0);
            this.getOutputPort("output_q5").setValue(0);
            this.getOutputPort("output_q6").setValue(0);
            this.getOutputPort("output_q7").setValue(0);
            this.getOutputPort("output_q8").setValue(0);
        }

        // Load the new data from the input if we have a RISING clock and ENABLE is set
        //
        else if(rising && load) {
           this.counter  = this.getInputPort("input_d1").getBooleanValue()?1:0;
           this.counter += this.getInputPort("input_d2").getBooleanValue()?2:0;
           this.counter += this.getInputPort("input_d3").getBooleanValue()?4:0;
           this.counter += this.getInputPort("input_d4").getBooleanValue()?8:0;
           this.counter += this.getInputPort("input_d5").getBooleanValue()?16:0;
           this.counter += this.getInputPort("input_d6").getBooleanValue()?32:0;
           this.counter += this.getInputPort("input_d7").getBooleanValue()?64:0;
           this.counter += this.getInputPort("input_d8").getBooleanValue()?128:0;
           this.getOutputPort("output_q1").setValue(!!(this.counter & 1));
           this.getOutputPort("output_q2").setValue(!!(this.counter & 2));
           this.getOutputPort("output_q3").setValue(!!(this.counter & 4));
           this.getOutputPort("output_q4").setValue(!!(this.counter & 8));
           this.getOutputPort("output_q5").setValue(!!(this.counter & 16));
           this.getOutputPort("output_q6").setValue(!!(this.counter & 32));
           this.getOutputPort("output_q7").setValue(!!(this.counter & 64));
           this.getOutputPort("output_q8").setValue(!!(this.counter & 128));
        }
        
        else if(enable && rising && clk ){
            this.counter= (this.counter+1)%16;
            this.getOutputPort("output_q1").setValue(!!(this.counter & 1));
            this.getOutputPort("output_q2").setValue(!!(this.counter & 2));
            this.getOutputPort("output_q3").setValue(!!(this.counter & 4));
            this.getOutputPort("output_q4").setValue(!!(this.counter & 8));
            this.getOutputPort("output_q5").setValue(!!(this.counter & 16));
            this.getOutputPort("output_q6").setValue(!!(this.counter & 32));
            this.getOutputPort("output_q7").setValue(!!(this.counter & 64));
            this.getOutputPort("output_q8").setValue(!!(this.counter & 128));
        }
        this.last_clk = clk;
    }
});