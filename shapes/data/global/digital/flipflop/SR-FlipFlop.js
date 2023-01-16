// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_flipflop_SR_FlipFlop = CircuitFigure.extend({

   NAME: "digital_flipflop_SR_FlipFlop",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40.02111999999852,height:63.065120000000206},attr), setter, getter);
     var port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.51898247725282, y: 18.286748681362393 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.49868069659229, y: 81.71325131863617 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     // input_s
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -4.997361393184583, y: 81.65908508538081 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_s");
     port.setMaxFanOut(1);
     // input_r
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -4.997361393184583, y: 18.286748681362393 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_r");
     port.setMaxFanOut(1);
     // input_clk
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -4.997361393184583, y: 49.99999999999928 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_clk");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40.02111999999852;
      this.originalHeight= 63.065120000000206;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40.02111999999852,0 L40.02111999999852,63.065120000000206 L0,63.065120000000206");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.021119999998518324,1.0651200000002063Q0.021119999998518324,0.06512000000020635 1.0211199999985183, 0.06512000000020635L39.02111999999852,0.06512000000020635Q40.02111999999852,0.06512000000020635 40.02111999999852, 1.0651200000002063L40.02111999999852,62.065120000000206Q40.02111999999852,63.065120000000206 39.02111999999852, 63.065120000000206L1.0211199999985183,63.065120000000206Q0.021119999998518324,63.065120000000206 0.021119999998518324, 62.065120000000206L0.021119999998518324,1.0651200000002063');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.30236999999852,"y":51.373287500000515,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 25.53255999999965L19 31.467342608694707L0 38.53255999999965Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.30236999999852,"y":10.6796875,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'S');
       shape.attr({"x":6,"y":50.373287500000515,"text-anchor":"start","text":"S","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'R');
       shape.attr({"x":5.72265625,"y":11.122407500001827,"text-anchor":"start","text":"R","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M26.369119999998475 45.49839999999767L33.895919999998114,45.49839999999767');
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
digital_flipflop_SR_FlipFlop = digital_flipflop_SR_FlipFlop.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.last_clk = false;
    },
    
    calculate:function(context)
    {
        let s   = this.getInputPort("input_s").getBooleanValue();
        let r   = this.getInputPort("input_r").getBooleanValue();
        let clk = this.getInputPort("input_clk").getBooleanValue();

        let rising = this.last_clk===false && clk===true; 
    
        if(rising){
            let q = this.getOutputPort("output_q");
            let q_ = this.getOutputPort("output_q_not");
            if(r===true && s===false){
                q.setValue(false);
                q_.setValue(true);
            }
            // set
            else if(r===false && s===true){
                q.setValue(true);
                q_.setValue(false);
            }
            // invalid
            else if(r===true && s===true){
                q.setValue( false);
                q_.setValue( false);
            }
        }
        this.last_clk = clk;
    }
});