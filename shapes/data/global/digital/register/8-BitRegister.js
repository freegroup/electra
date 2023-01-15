// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_register_8_BitRegister = CircuitFigure.extend({

   NAME: "digital_register_8_BitRegister",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:59,height:229.14950000000044},attr), setter, getter);
     var port;
     // input_clk
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 20.861926384303786 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_clk");
     port.setMaxFanOut(1);
     // output_q4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 58.79447696809273 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q4");
     port.setMaxFanOut(20);
     // output_q3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 50.255488229300106 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q3");
     port.setMaxFanOut(20);
     // output_q2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 41.404716135099584 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q2");
     port.setMaxFanOut(20);
     // output_q1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 32.61069738314933 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q1");
     port.setMaxFanOut(20);
     // input_enable
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 12.648811147307866 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_enable");
     port.setMaxFanOut(1);
     // input_d1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 32.61069738314933 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d1");
     port.setMaxFanOut(1);
     // input_d2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 41.404716135099584 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d2");
     port.setMaxFanOut(1);
     // input_d3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 50.255488229300106 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d3");
     port.setMaxFanOut(1);
     // input_d4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 58.79447696809273 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d4");
     port.setMaxFanOut(1);
     // input_d5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.847457627118644, y: 67.52240349640721 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d5");
     port.setMaxFanOut(1);
     // input_d6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 76.25033002472166 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d6");
     port.setMaxFanOut(1);
     // input_d7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 84.97825655303613 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d7");
     port.setMaxFanOut(1);
     // input_d8
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.694915254237288, y: 93.7061830813506 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d8");
     port.setMaxFanOut(1);
     // output_q5
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 67.52240349640721 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q5");
     port.setMaxFanOut(20);
     // output_q6
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 76.25033002472166 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q6");
     port.setMaxFanOut(20);
     // output_q7
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 84.97825655303613 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q7");
     port.setMaxFanOut(20);
     // output_q8
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.82118644067853, y: 93.7061830813506 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q8");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 59;
      this.originalHeight= 229.14950000000044;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L59,0 L59,229.14950000000044 L0,229.14950000000044");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M53.099999999997635 52.7157238399559L59 52.7157238399559L59 4L0 4L0 52.7157238399559L5.900000000002365 52.7157238399559L5.900000000002365 68L53.099999999997635 68L53.099999999997635 52.7157238399559Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 59.149500000000444L59 59.149500000000444L59 229.14950000000044L0 229.14950000000044Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.5 42.40551249999953L12.541999999999462 47.31151249999857L0.5 52.66351249999934Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // enable
       shape = this.canvas.paper.text(0,0,'load');
       shape.attr({"x":14.5,"y":29.98468750000029,"text-anchor":"start","text":"load","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","enable");
       
       // q4
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":39.05494616699252,"y":135.4069374999999,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q4");
       
       // q3
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":39.05494616699252,"y":115.23807500000021,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q3");
       
       // q2
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":39.05494616699252,"y":95.40693749999991,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q2");
       
       // q1
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":39.05494616699252,"y":75.40693749999991,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q1");
       
       // d1
       shape = this.canvas.paper.text(0,0,'D1');
       shape.attr({"x":7,"y":75.48468750000029,"text-anchor":"start","text":"D1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d1");
       
       // d2
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":7,"y":95.40693749999991,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d2");
       
       // d3
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":7,"y":115.40693749999991,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d3");
       
       // d4
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":7,"y":135.4069374999999,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d4");
       
       // q5
       shape = this.canvas.paper.text(0,0,'Q5');
       shape.attr({"x":39.05494616699252,"y":155.4069374999999,"text-anchor":"start","text":"Q5","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q5");
       
       // q6
       shape = this.canvas.paper.text(0,0,'Q6');
       shape.attr({"x":39.05494616699252,"y":175.4069374999999,"text-anchor":"start","text":"Q6","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q6");
       
       // q7
       shape = this.canvas.paper.text(0,0,'Q7');
       shape.attr({"x":39.05494616699252,"y":195.4069374999999,"text-anchor":"start","text":"Q7","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q7");
       
       // q8
       shape = this.canvas.paper.text(0,0,'Q8');
       shape.attr({"x":39.05494616699252,"y":215.4069374999999,"text-anchor":"start","text":"Q8","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","q8");
       
       // d4
       shape = this.canvas.paper.text(0,0,'D5');
       shape.attr({"x":7.5,"y":155.2272499999999,"text-anchor":"start","text":"D5","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d4");
       
       // d4
       shape = this.canvas.paper.text(0,0,'D6');
       shape.attr({"x":8,"y":175.4069374999999,"text-anchor":"start","text":"D6","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d4");
       
       // d4
       shape = this.canvas.paper.text(0,0,'D7');
       shape.attr({"x":7,"y":195.4069374999999,"text-anchor":"start","text":"D7","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d4");
       
       // d4
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":7,"y":215.4069374999999,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d4");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Register');
       shape.attr({"x":7.5,"y":10.503751277923584,"text-anchor":"start","text":"Register","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // enable
       shape = this.canvas.paper.text(0,0,'clk');
       shape.attr({"x":14.541999999999462,"y":46.66437500000029,"text-anchor":"start","text":"clk","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_register_8_BitRegister = digital_register_8_BitRegister.extend({

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
        if(rising===true && enable===true){
            this.getOutputPort("output_q1").setValue(this.getInputPort("input_d1").getValue())
            this.getOutputPort("output_q2").setValue(this.getInputPort("input_d2").getValue())
            this.getOutputPort("output_q3").setValue(this.getInputPort("input_d3").getValue())
            this.getOutputPort("output_q4").setValue(this.getInputPort("input_d4").getValue())
            this.getOutputPort("output_q5").setValue(this.getInputPort("input_d5").getValue())
            this.getOutputPort("output_q6").setValue(this.getInputPort("input_d6").getValue())
            this.getOutputPort("output_q7").setValue(this.getInputPort("input_d7").getValue())
            this.getOutputPort("output_q8").setValue(this.getInputPort("input_d8").getValue())
        }
        this.last_clk = clk;
    }
});