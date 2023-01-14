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

     this._super( $.extend({stroke:0, bgColor:null, width:59,height:138.84450000000015},attr), setter, getter);
     var port;
     // input_clk
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 21.901623758953377 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_clk");
     port.setMaxFanOut(1);
     // output_q4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 89.61266020620154 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q4");
     port.setMaxFanOut(20);
     // output_q3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 75.51988015369702 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q3");
     port.setMaxFanOut(20);
     // output_q2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 60.91253164511365 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q2");
     port.setMaxFanOut(20);
     // output_q1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 46.398849072163145 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q1");
     port.setMaxFanOut(20);
     // input_enable
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 7.691833309925844 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_enable");
     port.setMaxFanOut(1);
     // input_d1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 46.398849072163145 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d1");
     port.setMaxFanOut(1);
     // input_d2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 60.91253164511365 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d2");
     port.setMaxFanOut(1);
     // input_d3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 75.51988015369702 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d3");
     port.setMaxFanOut(1);
     // input_d4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 89.61266020620154 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d4");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 59;
      this.originalHeight= 138.84450000000015;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L59,0 L59,138.84450000000015 L0,138.84450000000015");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M53.099999999997635 40.34270880496297L59 40.34270880496297L59 0L0 0L0 40.34270880496297L5.900000000002365 40.34270880496297L5.900000000002365 53L53.099999999997635 53L53.099999999997635 40.34270880496297Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 48.84450000000015L59 48.84450000000015L59 138.84450000000015L0 138.84450000000015Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.5 25.10051249999924L12.541999999999462 30.00651249999828L0.5 35.35851249999905Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // enable
       shape = this.canvas.paper.text(0,0,'load');
       shape.attr({"x":8.5,"y":10.6796875,"text-anchor":"start","text":"load","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","enable");
       
       // q4
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":39.05494616699252,"y":125.10193749999962,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q4");
       
       // q3
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":39.05494616699252,"y":104.93307499999992,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q3");
       
       // q2
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":39.05494616699252,"y":85.10193749999962,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q2");
       
       // q1
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":39.05494616699252,"y":65.10193749999962,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q1");
       
       // d1
       shape = this.canvas.paper.text(0,0,'D1');
       shape.attr({"x":7,"y":65.1796875,"text-anchor":"start","text":"D1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d1");
       
       // d2
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":7,"y":85.10193749999962,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d2");
       
       // d3
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":7,"y":105.10193749999962,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d3");
       
       // d4
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":7,"y":125.10193749999962,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d4");
       

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
        var clk = this.getInputPort("input_clk").getBooleanValue();
        
        var rising = this.last_clk===false && clk===true; 
        console.log(enable, clk, rising)
        if(rising===true && enable===true){
            console.log("rising flag")
            this.getOutputPort("output_q1").setValue(this.getInputPort("input_d1").getValue())
            this.getOutputPort("output_q2").setValue(this.getInputPort("input_d2").getValue())
            this.getOutputPort("output_q3").setValue(this.getInputPort("input_d3").getValue())
            this.getOutputPort("output_q4").setValue(this.getInputPort("input_d4").getValue())
        }
        this.last_clk = clk;
    }
});