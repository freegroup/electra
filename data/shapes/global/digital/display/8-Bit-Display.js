var digital_display_8_Bit_Display = CircuitFigure.extend({

   NAME: "digital_display_8_Bit_Display",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:189,height:158 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // input_bit1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 5.063291139240507 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit1");
     port.setMaxFanOut(1);
     this.read["input_bit1"] = port.getValue.bind(port)
     this.write["input_bit1"]= port.setValue.bind(port)

     // input_bit2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 17.721518987341774 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit2");
     port.setMaxFanOut(1);
     this.read["input_bit2"] = port.getValue.bind(port)
     this.write["input_bit2"]= port.setValue.bind(port)

     // input_bit3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 30.37974683544304 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit3");
     port.setMaxFanOut(1);
     this.read["input_bit3"] = port.getValue.bind(port)
     this.write["input_bit3"]= port.setValue.bind(port)

     // input_bit4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 43.037974683544306 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit4");
     port.setMaxFanOut(1);
     this.read["input_bit4"] = port.getValue.bind(port)
     this.write["input_bit4"]= port.setValue.bind(port)

     // input_bit5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 55.696202531645575 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit5");
     port.setMaxFanOut(1);
     this.read["input_bit5"] = port.getValue.bind(port)
     this.write["input_bit5"]= port.setValue.bind(port)

     // input_bit6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 68.35443037974684 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit6");
     port.setMaxFanOut(1);
     this.read["input_bit6"] = port.getValue.bind(port)
     this.write["input_bit6"]= port.setValue.bind(port)

     // input_bit7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 81.0126582278481 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit7");
     port.setMaxFanOut(1);
     this.read["input_bit7"] = port.getValue.bind(port)
     this.write["input_bit7"]= port.setValue.bind(port)

     // input_bit8
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 93.67088607594937 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_bit8");
     port.setMaxFanOut(1);
     this.read["input_bit8"] = port.getValue.bind(port)
     this.write["input_bit8"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 189;
      this.originalHeight= 158;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L189,0 L189,158 L0,158");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L187,0Q189,0 189, 2L189,156Q189,158 187, 158L2,158Q0,158 0, 156L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // digit
       shape = this.canvas.paper.text(0,0,'255');
       shape.attr({"x":14.615625000000364,"y":79,"text-anchor":"start","text":"255","font-family":"\"Arial\"","font-size":100,"stroke":"#000000","fill":"#D11131","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
        let val = this.getInputPort("input_bit1").getBooleanValue()?1:0;
        val    += this.getInputPort("input_bit2").getBooleanValue()?2:0;
        val    += this.getInputPort("input_bit3").getBooleanValue()?4:0;
        val    += this.getInputPort("input_bit4").getBooleanValue()?8:0;
        val    += this.getInputPort("input_bit5").getBooleanValue()?16:0;
        val    += this.getInputPort("input_bit6").getBooleanValue()?32:0;
        val    += this.getInputPort("input_bit7").getBooleanValue()?64:0;
        val    += this.getInputPort("input_bit8").getBooleanValue()?128:0;
        this.layerAttr("digit", {text: val.toString(10).padStart(3, '0')});

    }

});