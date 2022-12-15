// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_alu_FullAdder = CircuitFigure.extend({

   NAME: "digital_alu_FullAdder",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:70,height:78.125},attr), setter, getter);
     var port;
     // output_s
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.17942857142874, y: 23.12 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_s");
     port.setMaxFanOut(20);
     // output_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.60800000000017, y: 77.27910399999935 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_c");
     port.setMaxFanOut(20);
     // input_a
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3188571428573985, y: 16.72 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a");
     port.setMaxFanOut(20);
     // input_b
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3188571428573985, y: 51.28966400000034 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b");
     port.setMaxFanOut(20);
     // input_c
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3188571428573985, y: 81.11910399999935 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_c");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 70;
      this.originalHeight= 78.125;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L70,0 L70,78.125 L0,78.125");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,5.14010000000053Q0,4.14010000000053 1, 4.14010000000053L69,4.14010000000053Q70,4.14010000000053 70, 5.14010000000053L70,73.14010000000053Q70,74.14010000000053 69, 74.14010000000053L1,74.14010000000053Q0,74.14010000000053 0, 73.14010000000053L0,5.14010000000053');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Full');
       shape.attr({"x":24.65625,"y":32.625,"text-anchor":"start","text":"Full","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Adder');
       shape.attr({"x":21.717000000000553,"y":45.874299999999494,"text-anchor":"start","text":"Adder","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":5,"y":12.5,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":6,"y":40.625,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'S');
       shape.attr({"x":52.34375,"y":18.5,"text-anchor":"start","text":"S","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":52.34375,"y":59.625,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":6,"y":62.874299999999494,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'in');
       shape.attr({"x":16.717000000000553,"y":67.125,"text-anchor":"start","text":"in","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_alu_FullAdder = digital_alu_FullAdder.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
        var a = this.getInputPort("input_a").getBooleanValue();
        var b = this.getInputPort("input_b").getBooleanValue();
        var c = this.getInputPort("input_c").getBooleanValue();
        
        // s = a XOR b XOR  c
        this.getOutputPort("output_s").setValue(a ^ b ^ c);
        
        // c = (at least two bits are set)
        this.getOutputPort("output_c").setValue((a+b+c)>1);
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function(context)
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function(context)
    {
    }
});