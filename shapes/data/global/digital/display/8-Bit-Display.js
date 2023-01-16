// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_display_8_Bit_Display = CircuitFigure.extend({

   NAME: "digital_display_8_Bit_Display",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:189,height:137},attr), setter, getter);
     var port;
     // input_bit1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 6.204379562043796 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit1");
     port.setMaxFanOut(1);
     // input_bit2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 20.43795620437956 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit2");
     port.setMaxFanOut(1);
     // input_bit3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 35.03649635036496 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit3");
     port.setMaxFanOut(1);
     // input_bit4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit4");
     port.setMaxFanOut(1);
     // input_bit5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 64.5985401459854 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit5");
     port.setMaxFanOut(1);
     // input_bit6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 79.1970802919708 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit6");
     port.setMaxFanOut(1);
     // input_bit7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 93.7956204379562 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit7");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 189;
      this.originalHeight= 137;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L189,0 L189,137 L0,137");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L187,0Q189,0 189, 2L189,135Q189,137 187, 137L2,137Q0,137 0, 135L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // digit
       shape = this.canvas.paper.text(0,0,'255');
       shape.attr({"x":15.890625,"y":68.75,"text-anchor":"start","text":"255","font-family":"\"Arial\"","font-size":100,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","digit");
       

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
digital_display_8_Bit_Display = digital_display_8_Bit_Display.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

    },
    
    calculate:function(context)
    {
        let val = this.getInputPort("input_a1").getBooleanValue()?1:0;
        val    += this.getInputPort("input_a2").getBooleanValue()?2:0;
        val    += this.getInputPort("input_a3").getBooleanValue()?4:0;
        val    += this.getInputPort("input_a4").getBooleanValue()?8:0;

    }

});