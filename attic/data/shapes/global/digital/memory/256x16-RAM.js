var digital_memory_256x16_RAM = CircuitFigure.extend({

   NAME: "digital_memory_256x16_RAM",
   VERSION: "${VERSION}",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:164.91427187499994,height:376 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // input_a1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 92.47228773237431, y: -1.0638297872340425 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a1");
     port.setMaxFanOut(1);
     this.read["input_a1"] = port.getValue.bind(port)
     this.write["input_a1"]= port.setValue.bind(port)

     // input_a2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 80.3447745871449, y: -1.0638297872340425 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a2");
     port.setMaxFanOut(1);
     this.read["input_a2"] = port.getValue.bind(port)
     this.write["input_a2"]= port.setValue.bind(port)

     // input_a3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 68.21726144191548, y: -1.0638297872340425 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a3");
     port.setMaxFanOut(1);
     this.read["input_a3"] = port.getValue.bind(port)
     this.write["input_a3"]= port.setValue.bind(port)

     // input_a4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 56.08974829668606, y: -1.0638297872340425 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a4");
     port.setMaxFanOut(1);
     this.read["input_a4"] = port.getValue.bind(port)
     this.write["input_a4"]= port.setValue.bind(port)

     // input_d1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9421827064051947, y: 16.11659574468081 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d1");
     port.setMaxFanOut(1);
     this.read["input_d1"] = port.getValue.bind(port)
     this.write["input_d1"]= port.setValue.bind(port)

     // input_d2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9441231085084959, y: 21.435744680851027 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d2");
     port.setMaxFanOut(1);
     this.read["input_d2"] = port.getValue.bind(port)
     this.write["input_d2"]= port.setValue.bind(port)

     // input_d3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9441231085084959, y: 26.75489361702124 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d3");
     port.setMaxFanOut(1);
     this.read["input_d3"] = port.getValue.bind(port)
     this.write["input_d3"]= port.setValue.bind(port)

     // input_d4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9441231085084959, y: 32.074042553191454 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d4");
     port.setMaxFanOut(1);
     this.read["input_d4"] = port.getValue.bind(port)
     this.write["input_d4"]= port.setValue.bind(port)

     // output_q1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.2610384103544, y: 16.116595744681053 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q1");
     port.setMaxFanOut(20);
     this.read["output_q1"] = port.getValue.bind(port)
     this.write["output_q1"]= port.setValue.bind(port)

     // output_q2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 21.43574468085127 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q2");
     port.setMaxFanOut(20);
     this.read["output_q2"] = port.getValue.bind(port)
     this.write["output_q2"]= port.setValue.bind(port)

     // output_q3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 26.75489361702148 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q3");
     port.setMaxFanOut(20);
     this.read["output_q3"] = port.getValue.bind(port)
     this.write["output_q3"]= port.setValue.bind(port)

     // output_q4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 32.074042553191696 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q4");
     port.setMaxFanOut(20);
     this.read["output_q4"] = port.getValue.bind(port)
     this.write["output_q4"]= port.setValue.bind(port)

     // input_rw
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.6063756572614709, y: 8.24468085106383 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_rw");
     port.setMaxFanOut(1);
     this.read["input_rw"] = port.getValue.bind(port)
     this.write["input_rw"]= port.setValue.bind(port)

     // input_a5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 43.96223515145664, y: -1.0638297872340425 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a5");
     port.setMaxFanOut(1);
     this.read["input_a5"] = port.getValue.bind(port)
     this.write["input_a5"]= port.setValue.bind(port)

     // input_a6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 31.834722006227224, y: -1.0638297872340425 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a6");
     port.setMaxFanOut(1);
     this.read["input_a6"] = port.getValue.bind(port)
     this.write["input_a6"]= port.setValue.bind(port)

     // input_a7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 19.707208860997806, y: -1.0638297872340425 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a7");
     port.setMaxFanOut(1);
     this.read["input_a7"] = port.getValue.bind(port)
     this.write["input_a7"]= port.setValue.bind(port)

     // input_a8
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 7.579695715768386, y: -1.0638297872340425 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a8");
     port.setMaxFanOut(1);
     this.read["input_a8"] = port.getValue.bind(port)
     this.write["input_a8"]= port.setValue.bind(port)

     // input_d5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 37.5 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d5");
     port.setMaxFanOut(1);
     this.read["input_d5"] = port.getValue.bind(port)
     this.write["input_d5"]= port.setValue.bind(port)

     // input_d6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 42.71234042553188 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d6");
     port.setMaxFanOut(1);
     this.read["input_d6"] = port.getValue.bind(port)
     this.write["input_d6"]= port.setValue.bind(port)

     // input_d7
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9441231085084959, y: 48.138297872340424 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d7");
     port.setMaxFanOut(1);
     this.read["input_d7"] = port.getValue.bind(port)
     this.write["input_d7"]= port.setValue.bind(port)

     // input_d8
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 53.45744680851064 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d8");
     port.setMaxFanOut(1);
     this.read["input_d8"] = port.getValue.bind(port)
     this.write["input_d8"]= port.setValue.bind(port)

     // input_d9
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 58.669787234042516 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d9");
     port.setMaxFanOut(1);
     this.read["input_d9"] = port.getValue.bind(port)
     this.write["input_d9"]= port.setValue.bind(port)

     // input_d10
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 63.988936170212725 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d10");
     port.setMaxFanOut(1);
     this.read["input_d10"] = port.getValue.bind(port)
     this.write["input_d10"]= port.setValue.bind(port)

     // input_d11
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9441231085084959, y: 69.41489361702128 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d11");
     port.setMaxFanOut(1);
     this.read["input_d11"] = port.getValue.bind(port)
     this.write["input_d11"]= port.setValue.bind(port)

     // input_d12
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 74.62723404255316 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d12");
     port.setMaxFanOut(1);
     this.read["input_d12"] = port.getValue.bind(port)
     this.write["input_d12"]= port.setValue.bind(port)

     // input_d13
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 80.0531914893617 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d13");
     port.setMaxFanOut(1);
     this.read["input_d13"] = port.getValue.bind(port)
     this.write["input_d13"]= port.setValue.bind(port)

     // input_d14
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 85.26553191489357 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d14");
     port.setMaxFanOut(1);
     this.read["input_d14"] = port.getValue.bind(port)
     this.write["input_d14"]= port.setValue.bind(port)

     // input_d15
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9095634858922064, y: 90.69148936170212 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d15");
     port.setMaxFanOut(1);
     this.read["input_d15"] = port.getValue.bind(port)
     this.write["input_d15"]= port.setValue.bind(port)

     // input_d16
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9441231085084959, y: 96.01063829787233 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d16");
     port.setMaxFanOut(1);
     this.read["input_d16"] = port.getValue.bind(port)
     this.write["input_d16"]= port.setValue.bind(port)

     // output_q5
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 37.234042553191486 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q5");
     port.setMaxFanOut(20);
     this.read["output_q5"] = port.getValue.bind(port)
     this.write["output_q5"]= port.setValue.bind(port)

     // output_q6
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.1424199622505, y: 42.71234042553188 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q6");
     port.setMaxFanOut(20);
     this.read["output_q6"] = port.getValue.bind(port)
     this.write["output_q6"]= port.setValue.bind(port)

     // output_q7
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 48.138297872340424 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q7");
     port.setMaxFanOut(20);
     this.read["output_q7"] = port.getValue.bind(port)
     this.write["output_q7"]= port.setValue.bind(port)

     // output_q8
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 53.45744680851064 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q8");
     port.setMaxFanOut(20);
     this.read["output_q8"] = port.getValue.bind(port)
     this.write["output_q8"]= port.setValue.bind(port)

     // output_q9
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.2610384103544, y: 58.669787234042516 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q9");
     port.setMaxFanOut(20);
     this.read["output_q9"] = port.getValue.bind(port)
     this.write["output_q9"]= port.setValue.bind(port)

     // output_q10
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.1424199622505, y: 63.988936170212725 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q10");
     port.setMaxFanOut(20);
     this.read["output_q10"] = port.getValue.bind(port)
     this.write["output_q10"]= port.setValue.bind(port)

     // output_q11
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 69.41489361702128 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q11");
     port.setMaxFanOut(20);
     this.read["output_q11"] = port.getValue.bind(port)
     this.write["output_q11"]= port.setValue.bind(port)

     // output_q12
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 74.62723404255316 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q12");
     port.setMaxFanOut(20);
     this.read["output_q12"] = port.getValue.bind(port)
     this.write["output_q12"]= port.setValue.bind(port)

     // output_q13
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 80.0531914893617 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q13");
     port.setMaxFanOut(20);
     this.read["output_q13"] = port.getValue.bind(port)
     this.write["output_q13"]= port.setValue.bind(port)

     // output_q14
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 85.26553191489357 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q14");
     port.setMaxFanOut(20);
     this.read["output_q14"] = port.getValue.bind(port)
     this.write["output_q14"]= port.setValue.bind(port)

     // output_q15
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 90.69148936170212 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q15");
     port.setMaxFanOut(20);
     this.read["output_q15"] = port.getValue.bind(port)
     this.write["output_q15"]= port.setValue.bind(port)

     // output_q16
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.95785058172368, y: 96.01063829787233 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q16");
     port.setMaxFanOut(20);
     this.read["output_q16"] = port.getValue.bind(port)
     this.write["output_q16"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 164.91427187499994;
      this.originalHeight= 376;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L164.91427187499994,0 L164.91427187499994,376 L0,376");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1Q0,0 1, 0L163,0Q164,0 164, 1L164,375Q164,376 163, 376L1,376Q0,376 0, 375L0,1');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A1');
       shape.attr({"x":146.21700624999994,"y":12.75,"text-anchor":"start","text":"A1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A2');
       shape.attr({"x":125,"y":12.75,"text-anchor":"start","text":"A2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":141.65090624999993,"y":60.512462500000765,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A3');
       shape.attr({"x":105.5,"y":12.75,"text-anchor":"start","text":"A3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":141.65090624999993,"y":100.68363750000026,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":141.65090624999993,"y":80.55933750000077,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":6.446206249999705,"y":80.55933749999986,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D1');
       shape.attr({"x":6.446206249999705,"y":60.012462499999856,"text-anchor":"start","text":"D1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A4');
       shape.attr({"x":85.06856874999994,"y":12.75,"text-anchor":"start","text":"A4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":6.446206249999705,"y":100.68363749999935,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":6.523006249999526,"y":120.21558749999986,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":141.80715624999993,"y":120.03890000000138,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'RAM');
       shape.attr({"x":65.1513671875,"y":61.512462499999856,"text-anchor":"start","text":"RAM","font-family":"\"Arial\"","font-size":15,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'write');
       shape.attr({"x":8.713806249999834,"y":29.75,"text-anchor":"start","text":"write","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A5');
       shape.attr({"x":65.1513671875,"y":12.75,"text-anchor":"start","text":"A5","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A6');
       shape.attr({"x":45.302734375,"y":12.75,"text-anchor":"start","text":"A6","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A7');
       shape.attr({"x":25,"y":12.75,"text-anchor":"start","text":"A7","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A8');
       shape.attr({"x":5.21700624999994,"y":12.75,"text-anchor":"start","text":"A8","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D5');
       shape.attr({"x":6.523006249999526,"y":141.21558749999986,"text-anchor":"start","text":"D5","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D6');
       shape.attr({"x":6.523006249999526,"y":160.71558749999986,"text-anchor":"start","text":"D6","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D7');
       shape.attr({"x":6.023006249999526,"y":181.21558749999986,"text-anchor":"start","text":"D7","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D8');
       shape.attr({"x":6.023006249999526,"y":200.71558749999986,"text-anchor":"start","text":"D8","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D9');
       shape.attr({"x":6.523006249999526,"y":220.71558749999986,"text-anchor":"start","text":"D9","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D10');
       shape.attr({"x":6.023006249999526,"y":240.71558749999986,"text-anchor":"start","text":"D10","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D11');
       shape.attr({"x":6.023006249999526,"y":261.71558749999986,"text-anchor":"start","text":"D11","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D12');
       shape.attr({"x":6.023006249999526,"y":280.71558749999986,"text-anchor":"start","text":"D12","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D13');
       shape.attr({"x":6.523006249999526,"y":301.21558749999986,"text-anchor":"start","text":"D13","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D14');
       shape.attr({"x":6.023006249999526,"y":321.21558749999986,"text-anchor":"start","text":"D14","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D15');
       shape.attr({"x":6.023006249999526,"y":341.21558749999986,"text-anchor":"start","text":"D15","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D16');
       shape.attr({"x":6.523006249999526,"y":361.21558749999986,"text-anchor":"start","text":"D16","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_memory_256x16_RAM = digital_memory_256x16_RAM.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.wordLength    = 16;
        this.addressLength = 8;
        this.lineCount = Math.pow(2, this.addressLength)
        
        this.ram = new Uint16Array(this.lineCount)

        // change the ram if the user change them in the config dialog
        //
        this.on("change:userData.ram",(emitter, event)=>{
            let a = event.value
            a = a.trim().replace(/[^0-1]/g, "")
            for(let i = 0; i< a.length; i+=this.wordLength) {
                this.ram[i/this.wordLength] = parseInt(a.substring(i,i+this.wordLength),2)
            }
        });
        this.on("added", ()=>{
            let serializedRAM = this.attr("userData.ram")
            if(!serializedRAM){
                serializedRAM = new Array(this.lineCount+1).join("".padStart(this.wordLength, "0")+"\n")
                this.attr("userData.ram", serializedRAM)
            }
            serializedRAM = serializedRAM.trim().replace(/[^0-1]/g, "").substring(0, this.wordLength*this.lineCount)
            for(let i = 0; i< serializedRAM.length; i+=this.wordLength) {
                this.ram[i/this.wordLength] = parseInt(serializedRAM.substring(i,i+this.wordLength),2)
            }
        })
    },

    onStop: function(){
        let a = []
        this.ram.forEach( (val) => {
            // 17   => 1001
            //  9.  => 0101
            // ....
            a.push(val.toString(2).padStart(this.wordLength, "0").substring(0,this.wordLength))
        })
        this.attr("userData.ram", a.join("\n"))
    },
    
    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function()
    {
        let rw = this.getInputPort("input_rw").getBooleanValue();
        let addr = 0;
        
        for(let i = 0; i<this.addressLength; i++){
            addr += this.getInputPort("input_a"+(i+1)).getBooleanValue()?(1<<i):0;
        }

        if(rw){
            let data = 0;
            for(let i = 0; i<this.wordLength; i++){
                data += this.getInputPort("input_d"+(i+1)).getBooleanValue()?(1<<i):0;
            }
            this.ram[addr] = data
        } else {
            let data = this.ram[addr]
            for(let i = 0; i<this.wordLength; i++){
                this.getOutputPort("output_q"+(i+1)).setValue(data&(1<<i)?true:false);
            }
        }
    },
    
    getParameterSettings: function()
    {
        return [
        {
            name:"ram",
            label:`${Math.pow(2,this.addressLength)}x${this.wordLength} Bit RAM`,
            property:{
                type: "longtext"
            }
        }];
    }
});