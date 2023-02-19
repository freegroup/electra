var digital_signal_8_TriStateGate = CircuitFigure.extend({

   NAME: "digital_signal_8_TriStateGate",
   VERSION: "${VERSION}",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:80,height:193.4889749999984 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // enable
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 5.77323591692931 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("enable");
     port.setMaxFanOut(20);
     this.read["enable"] = port.getValue.bind(port)
     this.write["enable"]= port.setValue.bind(port)

     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 19.95917338442648 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
     this.read["input1"] = port.getValue.bind(port)
     this.write["input1"]= port.setValue.bind(port)

     // input2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 30.295679637560628 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input2");
     port.setMaxFanOut(20);
     this.read["input2"] = port.getValue.bind(port)
     this.write["input2"]= port.setValue.bind(port)

     // input3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 40.63218589069478 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input3");
     port.setMaxFanOut(20);
     this.read["input3"] = port.getValue.bind(port)
     this.write["input3"]= port.setValue.bind(port)

     // input4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 50.968692143828925 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input4");
     port.setMaxFanOut(20);
     this.read["input4"] = port.getValue.bind(port)
     this.write["input4"]= port.setValue.bind(port)

     // input5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 61.30519839696307 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input5");
     port.setMaxFanOut(20);
     this.read["input5"] = port.getValue.bind(port)
     this.write["input5"]= port.setValue.bind(port)

     // input6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 71.64170465009722 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input6");
     port.setMaxFanOut(20);
     this.read["input6"] = port.getValue.bind(port)
     this.write["input6"]= port.setValue.bind(port)

     // input7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 81.97821090323137 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input7");
     port.setMaxFanOut(20);
     this.read["input7"] = port.getValue.bind(port)
     this.write["input7"]= port.setValue.bind(port)

     // input8
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.5772499999991396, y: 92.31471715636552 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input8");
     port.setMaxFanOut(20);
     this.read["input8"] = port.getValue.bind(port)
     this.write["input8"]= port.setValue.bind(port)

     // output1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.26662500000157, y: 19.95917338442648 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output1");
     port.setMaxFanOut(20);
     this.read["output1"] = port.getValue.bind(port)
     this.write["output1"]= port.setValue.bind(port)

     // output2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.26662500000157, y: 30.295679637560628 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output2");
     port.setMaxFanOut(20);
     this.read["output2"] = port.getValue.bind(port)
     this.write["output2"]= port.setValue.bind(port)

     // output3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.26662500000157, y: 40.63218589069478 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output3");
     port.setMaxFanOut(20);
     this.read["output3"] = port.getValue.bind(port)
     this.write["output3"]= port.setValue.bind(port)

     // output4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.26662500000157, y: 51.24910863784337 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output4");
     port.setMaxFanOut(20);
     this.read["output4"] = port.getValue.bind(port)
     this.write["output4"]= port.setValue.bind(port)

     // output5
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.26662500000157, y: 61.30519839696307 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output5");
     port.setMaxFanOut(20);
     this.read["output5"] = port.getValue.bind(port)
     this.write["output5"]= port.setValue.bind(port)

     // output6
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.26662500000157, y: 71.64170465009722 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output6");
     port.setMaxFanOut(20);
     this.read["output6"] = port.getValue.bind(port)
     this.write["output6"]= port.setValue.bind(port)

     // output7
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.26662500000157, y: 81.97821090323137 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output7");
     port.setMaxFanOut(20);
     this.read["output7"] = port.getValue.bind(port)
     this.write["output7"]= port.setValue.bind(port)

     // output8
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.26662500000157, y: 92.31471715636552 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output8");
     port.setMaxFanOut(20);
     this.read["output8"] = port.getValue.bind(port)
     this.write["output8"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 193.4889749999984;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,193.4889749999984 L0,193.4889749999984");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M70.0550000000012 22L80 22L80 0L0 0L0 22L9.225000000001273 22L9.225000000001273 32.641999999999825L70.0550000000012 32.641999999999825L70.0550000000012 22Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 28.48897499999839L80 28.48897499999839L80 193.4889749999984L0 193.4889749999984Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Line
       shape = this.canvas.paper.path('M32.55 11.00L39.29,11.06L38.51,96.43');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M69.34 98.47L14.07,99.51');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Rectangle
       shape = this.canvas.paper.path('M25.23820000000069 84.61879999999928L61.23820000000069 98.45481942622973L25.23820000000069 111.61879999999928Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'enable');
       shape.attr({"x":6.238200000000688,"y":10.56,"text-anchor":"start","text":"enable","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
digital_signal_8_TriStateGate = digital_signal_8_TriStateGate.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
    },


    calculate:function(context)
    {
        let enable = this.getInputPort("enable")
        if(enable.getBooleanValue()){
            this.getOutputPort("output1").setValue(this.getInputPort("input1").getValue())
            this.getOutputPort("output2").setValue(this.getInputPort("input2").getValue())
            this.getOutputPort("output3").setValue(this.getInputPort("input3").getValue())
            this.getOutputPort("output4").setValue(this.getInputPort("input4").getValue())
            this.getOutputPort("output5").setValue(this.getInputPort("input5").getValue())
            this.getOutputPort("output6").setValue(this.getInputPort("input6").getValue())
            this.getOutputPort("output7").setValue(this.getInputPort("input7").getValue())
            this.getOutputPort("output8").setValue(this.getInputPort("input8").getValue())
        }
        else {
            this.getOutputPort("output1").setValue(null)
            this.getOutputPort("output2").setValue(null)
            this.getOutputPort("output3").setValue(null)
            this.getOutputPort("output4").setValue(null)
            this.getOutputPort("output5").setValue(null)
            this.getOutputPort("output6").setValue(null)
            this.getOutputPort("output7").setValue(null)
            this.getOutputPort("output8").setValue(null)
        }
    }
});