var digital_display_4_Bit_Hex_Display = CircuitFigure.extend({

   NAME: "digital_display_4_Bit_Hex_Display",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:62,height:97.5 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // input_bit1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 19.323487179487223 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit1");
     port.setMaxFanOut(1);
     this.read["input_bit1"] = port.getValue.bind(port)
     this.write["input_bit1"]= port.setValue.bind(port)

     // input_bit2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 39.836307692307734 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit2");
     port.setMaxFanOut(1);
     this.read["input_bit2"] = port.getValue.bind(port)
     this.write["input_bit2"]= port.setValue.bind(port)

     // input_bit3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 60.349128205128245 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit3");
     port.setMaxFanOut(1);
     this.read["input_bit3"] = port.getValue.bind(port)
     this.write["input_bit3"]= port.setValue.bind(port)

     // input_bit4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 80.86194871794876 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit4");
     port.setMaxFanOut(1);
     this.read["input_bit4"] = port.getValue.bind(port)
     this.write["input_bit4"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 62;
      this.originalHeight= 97.5;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L62,0 L62,97.5 L0,97.5");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M0,6.840400000000045Q0,4.840400000000045 2, 4.840400000000045L60,4.840400000000045Q62,4.840400000000045 62, 6.840400000000045L62,89.84040000000005Q62,91.84040000000005 60, 91.84040000000005L2,91.84040000000005Q0,91.84040000000005 0, 89.84040000000005L0,6.840400000000045');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // digit
       shape = this.canvas.paper.text(0,0,'F');
       shape.attr({"x":6,"y":48.75,"text-anchor":"start","text":"F","font-family":"\"Arial\"","font-size":80,"stroke":"#000000","fill":"#D11131","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_display_4_Bit_Hex_Display = digital_display_4_Bit_Hex_Display.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

    },
    
    calculate:function(context)
    {
        let val = this.getInputPort("input_bit1").getBooleanValue()?1:0;
        val    += this.getInputPort("input_bit2").getBooleanValue()?2:0;
        val    += this.getInputPort("input_bit3").getBooleanValue()?4:0;
        val    += this.getInputPort("input_bit4").getBooleanValue()?8:0;
        this.layerAttr("digit", {text: val.toString(16).toUpperCase()});
    }

});