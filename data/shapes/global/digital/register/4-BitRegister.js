// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_register_4_BitRegister = CircuitFigure.extend({

   NAME: "digital_register_4_BitRegister",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:59,height:151.38850000000002},attr), setter, getter);
     var port;
     // input_clk
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 31.735567761091403 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_clk");
     port.setMaxFanOut(1);
     // output_q4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 90.4733516746645 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q4");
     port.setMaxFanOut(20);
     // output_q3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 77.54829461947229 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q3");
     port.setMaxFanOut(20);
     // output_q2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 64.1513060767494 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q2");
     port.setMaxFanOut(20);
     // output_q1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 50.84022234185521 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q1");
     port.setMaxFanOut(20);
     // input_enable
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 7.0835548935354185 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_enable");
     port.setMaxFanOut(1);
     // input_d1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 50.84022234185521 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d1");
     port.setMaxFanOut(1);
     // input_d2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 64.1513060767494 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d2");
     port.setMaxFanOut(1);
     // input_d3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 77.54829461947229 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d3");
     port.setMaxFanOut(1);
     // input_d4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 90.4733516746645 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d4");
     port.setMaxFanOut(1);
     // input_reset
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 19.303769771151615 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_reset");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 59;
      this.originalHeight= 151.38850000000002;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L59,0 L59,151.38850000000002 L0,151.38850000000002");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M53.099999999997635 53.2606397649497L59 53.2606397649497L59 0.738999999999578L0 0.738999999999578L0 53.2606397649497L5.900000000002365 53.2606397649497L5.900000000002365 69.73899999999958L53.099999999997635 69.73899999999958L53.099999999997635 53.2606397649497Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 61.38850000000002L59 61.38850000000002L59 151.38850000000002L0 151.38850000000002Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.5 43.04399999999987L12.5 47.826608695650975L0.5 53.04399999999987Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // enable
       shape = this.canvas.paper.text(0,0,'load');
       shape.attr({"x":6.44140625,"y":10.6796875,"text-anchor":"start","text":"load","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","enable");
       
       // q4
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":39.05494616699252,"y":137.6459374999995,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q4");
       
       // q3
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":39.05494616699252,"y":117.47707499999979,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q3");
       
       // q2
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":39.05494616699252,"y":97.64593749999949,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q2");
       
       // q1
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":39.05494616699252,"y":77.64593749999949,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q1");
       
       // d1
       shape = this.canvas.paper.text(0,0,'D1');
       shape.attr({"x":7,"y":77.72368749999987,"text-anchor":"start","text":"D1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d1");
       
       // d2
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":7,"y":97.64593749999949,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d2");
       
       // d3
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":7,"y":117.64593749999949,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d3");
       
       // d4
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":7,"y":137.6459374999995,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d4");
       
       // enable
       shape = this.canvas.paper.text(0,0,'reset');
       shape.attr({"x":6,"y":28.926190055846746,"text-anchor":"start","text":"reset","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","enable");
       

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
digital_register_4_BitRegister = digital_register_4_BitRegister.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.last_clk = false;
    },
    
    calculate:function()
    {
        var enable = this.getInputPort("input_enable").getBooleanValue();
        var reset = this.getInputPort("input_reset").getBooleanValue();
        var clk = this.getInputPort("input_clk").getBooleanValue();
        
        var rising = this.last_clk===false && clk===true; 
        if(reset){
            this.getOutputPort("output_q1").setValue(0)
            this.getOutputPort("output_q2").setValue(0)
            this.getOutputPort("output_q3").setValue(0)
            this.getOutputPort("output_q4").setValue(0)
        }
        else if(rising===true && enable===true){
            this.getOutputPort("output_q1").setValue(this.getInputPort("input_d1").getValue())
            this.getOutputPort("output_q2").setValue(this.getInputPort("input_d2").getValue())
            this.getOutputPort("output_q3").setValue(this.getInputPort("input_d3").getValue())
            this.getOutputPort("output_q4").setValue(this.getInputPort("input_d4").getValue())
        }
        this.last_clk = clk;
    }
});