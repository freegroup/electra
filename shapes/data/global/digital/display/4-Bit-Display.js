// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_display_4_Bit_Display = CircuitFigure.extend({

   NAME: "digital_display_4_Bit_Display",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:96.984375,height:97.5},attr), setter, getter);
     var port;
     // input_bit1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 20.34912820512825 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit1");
     port.setMaxFanOut(1);
     // input_bit2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 40.86194871794876 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit2");
     port.setMaxFanOut(1);
     // input_bit3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 61.374769230769274 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit3");
     port.setMaxFanOut(1);
     // input_bit4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 81.88758974358979 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit4");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 96.984375;
      this.originalHeight= 97.5;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L96.984375,0 L96.984375,97.5 L0,97.5");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M0,7.840400000000045Q0,5.840400000000045 2, 5.840400000000045L94,5.840400000000045Q96,5.840400000000045 96, 7.840400000000045L96,90.84040000000005Q96,92.84040000000005 94, 92.84040000000005L2,92.84040000000005Q0,92.84040000000005 0, 90.84040000000005L0,7.840400000000045');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // digit
       shape = this.canvas.paper.text(0,0,'16');
       shape.attr({"x":4,"y":48.75,"text-anchor":"start","text":"16","font-family":"\"Arial\"","font-size":80,"stroke":"#000000","fill":"#D11131","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_display_4_Bit_Display = digital_display_4_Bit_Display.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

    },
    
    calculate:function(context)
    {
        let val = this.getInputPort("input_bit1").getBooleanValue()?1:0;
        val    += this.getInputPort("input_bit2").getBooleanValue()?2:0;
        val    += this.getInputPort("input_bit3").getBooleanValue()?4:0;
        val    += this.getInputPort("input_bit4").getBooleanValue()?8:0;
        this.layerAttr("digit", {text: val.toString(10).padStart(3, '0')});
    }

});