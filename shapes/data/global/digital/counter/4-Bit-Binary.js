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

     this._super( $.extend({stroke:0, bgColor:null, width:81.7674446105957,height:165},attr), setter, getter);
     var port;
     // input_clk
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8790238511176329, y: 30.976363636363562 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_clk");
     port.setMaxFanOut(1);
     // output_q1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 97.0300756473881, y: 55.24618181818148 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q1");
     port.setMaxFanOut(20);
     // output_q2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.25305626609563, y: 67.36739393939361 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q2");
     port.setMaxFanOut(20);
     // output_q3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.25305626609563, y: 79.48860606060573 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q3");
     port.setMaxFanOut(20);
     // output_q4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.47603688480315, y: 91.60981818181784 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q4");
     port.setMaxFanOut(25);
     // input_d1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8790238511176329, y: 55.24618181818148 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d1");
     port.setMaxFanOut(1);
     // input_d2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8790238511176329, y: 67.36739393939361 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d2");
     port.setMaxFanOut(1);
     // input_d3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8790238511176329, y: 79.48860606060573 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d3");
     port.setMaxFanOut(1);
     // input_d4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9197873835803339, y: 91.58242424242417 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d4");
     port.setMaxFanOut(1);
     // input_load
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9197873835803339, y: 18.85515151515144 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_load");
     port.setMaxFanOut(1);
     // input_enable
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.303193235127196, y: 6.733939393939319 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_enable");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 81.7674446105957;
      this.originalHeight= 165;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L81.7674446105957,0 L81.7674446105957,165 L0,165");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L78,0Q80,0 80, 2L80,163Q80,165 78, 165L2,165Q0,165 0, 163L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Binary Counter');
       shape.attr({"x":4.247913360595703,"y":69.11099999999988,"text-anchor":"start","text":"Binary Counter","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.24791336059570312 43.325226060485875L13.247913360595703 52.068083203339484L0.24791336059570312 60.325226060485875Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":59.676719659423725,"y":92.15619999999944,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":59.676719659423725,"y":111.65619999999944,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":60.676719659423725,"y":131.65619999999944,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":60.676719659423725,"y":150.65619999999944,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D1');
       shape.attr({"x":6.247913360595703,"y":92.15619999999944,"text-anchor":"start","text":"D1","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":7.247913360595703,"y":111.65619999999944,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":6.247913360595703,"y":131.65619999999944,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":7.247913360595703,"y":150.65619999999944,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'load');
       shape.attr({"x":6.281244659423464,"y":32.110999999999876,"text-anchor":"start","text":"load","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'enable');
       shape.attr({"x":7.247913360595703,"y":11,"text-anchor":"start","text":"enable","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'clk');
       shape.attr({"x":16.247913360595703,"y":51.325226060485875,"text-anchor":"start","text":"clk","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
        
        var rising = this.last_clk===false && clk===true;
        if(enable) {
            // Load the new data from the input if we have a RISING clock and ENABLE is set
            //
            if(rising && load) {
               this.counter  =   this.getInputPort("input_d1").getBooleanValue();
               this.counter += 2*this.getInputPort("input_d2").getBooleanValue();
               this.counter += 4*this.getInputPort("input_d3").getBooleanValue();
               this.counter += 8*this.getInputPort("input_d4").getBooleanValue();
               this.getOutputPort("output_q1").setValue(!!(this.counter & 1));
               this.getOutputPort("output_q2").setValue(!!(this.counter & 2));
               this.getOutputPort("output_q3").setValue(!!(this.counter & 4));
               this.getOutputPort("output_q4").setValue(!!(this.counter & 8));
            }
            
            if(rising && clk ){
                this.counter= (this.counter+1)%16;
                this.getOutputPort("output_q1").setValue(!!(this.counter & 1));
                this.getOutputPort("output_q2").setValue(!!(this.counter & 2));
                this.getOutputPort("output_q3").setValue(!!(this.counter & 4));
                this.getOutputPort("output_q4").setValue(!!(this.counter & 8));
            }
        }
        this.last_clk = clk;
    }
});