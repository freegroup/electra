// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var arduino_Arduino = CircuitFigure.extend({

   NAME: "arduino_Arduino",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:104.51462500000162,height:240.2584999999999},attr), setter, getter);
     var port;
     // port_d2
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 30.383940630612457 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d2");
     port.setMaxFanOut(20);
     // port_d3
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 35.744521005500324 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d3");
     port.setMaxFanOut(20);
     // port_d4
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 41.20561811548813 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d4");
     port.setMaxFanOut(20);
     // port_d5
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 46.61645685792596 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d5");
     port.setMaxFanOut(20);
     // port_d6
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 52.41179812576779 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d6");
     port.setMaxFanOut(20);
     // port_d7
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 57.43813434280163 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d7");
     port.setMaxFanOut(20);
     // port_d8
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 62.848973085239464 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d8");
     port.setMaxFanOut(20);
     // port_d9
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 68.2598118276773 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d9");
     port.setMaxFanOut(20);
     // port_d10
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 73.67065057011513 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d10");
     port.setMaxFanOut(20);
     // port_d11
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 79.031230945003 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d11");
     port.setMaxFanOut(20);
     // port_d12
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 4.784019461391095, y: 84.49232805499081 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d12");
     port.setMaxFanOut(20);
     // port_d13
     port = this.addPort(new DecoratedHybridPort(), new draw2d.layout.locator.XYRelPortLocator({x: 95.2159805386089, y: 84.49232805499081 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d13");
     port.setMaxFanOut(20);
     // port_a0
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 95.2159805386089, y: 67.8435934628744 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_a0");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 104.51462500000162;
      this.originalHeight= 240.2584999999999;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L104.51462500000162,0 L104.51462500000162,240.2584999999999 L0,240.2584999999999");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M4.499200000000201,7.5Q4.499200000000201,1.5 10.4992000000002, 1.5L93.4992000000002,1.5Q99.4992000000002,1.5 99.4992000000002, 7.5L99.4992000000002,216.5Q99.4992000000002,222.5 93.4992000000002, 222.5L10.4992000000002,222.5Q4.499200000000201,222.5 4.499200000000201, 216.5L4.499200000000201,7.5');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M50.11580719501342,123.72605905170875Q52.97016249999979,120.92379999999775 55.85751646216846, 123.6920462132434L80.77500853783516,147.58165378675815Q83.66236250000384,150.3499000000038 80.8134682223531, 153.15771078329544L55.77105677765258,177.8389892167088Q52.92216250000183,180.64680000000044 50.05715809483484, 177.8554294122114L25.278766905167295,153.7138705877887Q22.413762500000303,150.92249999999967 25.268117804986673, 148.12024094828868L50.11580719501342,123.72605905170875');
       shape.attr({"stroke":"rgba(161,161,161,1)","stroke-width":1,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.4});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M26.37539999999808,29.002800000000207Q26.37539999999808,22.002800000000207 33.37539999999808, 22.002800000000207L72.37539999999808,22.002800000000207Q79.37539999999808,22.002800000000207 79.37539999999808, 29.002800000000207L79.37539999999808,46.00280000000021Q79.37539999999808,53.00280000000021 72.37539999999808, 53.00280000000021L33.37539999999808,53.00280000000021Q26.37539999999808,53.00280000000021 26.37539999999808, 46.00280000000021L26.37539999999808,29.002800000000207');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M33.99059999999827,29.123599999999897Q33.99059999999827,27.123599999999897 35.99059999999827, 27.123599999999897L38.99059999999827,27.123599999999897Q40.99059999999827,27.123599999999897 40.99059999999827, 29.123599999999897L40.99059999999827,33.1235999999999Q40.99059999999827,35.1235999999999 38.99059999999827, 35.1235999999999L35.99059999999827,35.1235999999999Q33.99059999999827,35.1235999999999 33.99059999999827, 33.1235999999999L33.99059999999827,29.123599999999897');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M50.4457999999986,29.123599999999897Q50.4457999999986,27.123599999999897 52.4457999999986, 27.123599999999897L55.4457999999986,27.123599999999897Q57.4457999999986,27.123599999999897 57.4457999999986, 29.123599999999897L57.4457999999986,33.1235999999999Q57.4457999999986,35.1235999999999 55.4457999999986, 35.1235999999999L52.4457999999986,35.1235999999999Q50.4457999999986,35.1235999999999 50.4457999999986, 33.1235999999999L50.4457999999986,29.123599999999897');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M66.40659999999843,29.123599999999897Q66.40659999999843,27.123599999999897 68.40659999999843, 27.123599999999897L71.40659999999843,27.123599999999897Q73.40659999999843,27.123599999999897 73.40659999999843, 29.123599999999897L73.40659999999843,33.1235999999999Q73.40659999999843,35.1235999999999 71.40659999999843, 35.1235999999999L68.40659999999843,35.1235999999999Q66.40659999999843,35.1235999999999 66.40659999999843, 33.1235999999999L66.40659999999843,29.123599999999897');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M66.40659999999843,41.969199999999546Q66.40659999999843,39.969199999999546 68.40659999999843, 39.969199999999546L71.40659999999843,39.969199999999546Q73.40659999999843,39.969199999999546 73.40659999999843, 41.969199999999546L73.40659999999843,45.969199999999546Q73.40659999999843,47.969199999999546 71.40659999999843, 47.969199999999546L68.40659999999843,47.969199999999546Q66.40659999999843,47.969199999999546 66.40659999999843, 45.969199999999546L66.40659999999843,41.969199999999546');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M50.4997000000003,41.969199999999546Q50.4997000000003,39.969199999999546 52.4997000000003, 39.969199999999546L55.4997000000003,39.969199999999546Q57.4997000000003,39.969199999999546 57.4997000000003, 41.969199999999546L57.4997000000003,45.969199999999546Q57.4997000000003,47.969199999999546 55.4997000000003, 47.969199999999546L52.4997000000003,47.969199999999546Q50.4997000000003,47.969199999999546 50.4997000000003, 45.969199999999546L50.4997000000003,41.969199999999546');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M33.99059999999827,41.969199999999546Q33.99059999999827,39.969199999999546 35.99059999999827, 39.969199999999546L38.99059999999827,39.969199999999546Q40.99059999999827,39.969199999999546 40.99059999999827, 41.969199999999546L40.99059999999827,45.969199999999546Q40.99059999999827,47.969199999999546 38.99059999999827, 47.969199999999546L35.99059999999827,47.969199999999546Q33.99059999999827,47.969199999999546 33.99059999999827, 45.969199999999546L33.99059999999827,41.969199999999546');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M37.4992000000002,205.2584999999999Q37.4992000000002,202.2584999999999 40.4992000000002, 202.2584999999999L63.4992000000002,202.2584999999999Q66.4992000000002,202.2584999999999 66.4992000000002, 205.2584999999999L66.4992000000002,237.2584999999999Q66.4992000000002,240.2584999999999 63.4992000000002, 240.2584999999999L40.4992000000002,240.2584999999999Q37.4992000000002,240.2584999999999 37.4992000000002, 237.2584999999999L37.4992000000002,205.2584999999999');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Arduino');
       shape.attr({"x":26.913762500000303,"y":12.5,"text-anchor":"start","text":"Arduino","font-family":"\"Arial\"","font-size":15,"stroke":"#000000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":21,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":34,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":47,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":60,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":73,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":86,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":99,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":112,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":125,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":138,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":151,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":177,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":190,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":99.51462500000162,"cy":203,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":203,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":190,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":177,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":164,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":151,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":138,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":125.92379999999775,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":112,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":99,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":86,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":73,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":60,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":47,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":34,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":21,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(242,242,242,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D12');
       shape.attr({"x":11.5,"y":203.6171875,"text-anchor":"start","text":"D12","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D10');
       shape.attr({"x":12,"y":177.29081250000036,"text-anchor":"start","text":"D10","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D9');
       shape.attr({"x":11.663762500000303,"y":164,"text-anchor":"start","text":"D9","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D8');
       shape.attr({"x":12,"y":151.33881250000104,"text-anchor":"start","text":"D8","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D7');
       shape.attr({"x":12,"y":138.36281250000138,"text-anchor":"start","text":"D7","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D6');
       shape.attr({"x":12,"y":126.1171875,"text-anchor":"start","text":"D6","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D5');
       shape.attr({"x":12,"y":112.6171875,"text-anchor":"start","text":"D5","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":12,"y":99.6199875000002,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":12,"y":86.52048749999994,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":12,"y":73.54448750000029,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D11');
       shape.attr({"x":12,"y":190.234375,"text-anchor":"start","text":"D11","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D13');
       shape.attr({"x":77.90659999999843,"y":202.6171875,"text-anchor":"start","text":"D13","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // led_power
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":79.99709999999777,"cy":65.26980000000003,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(255,60,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led_power");
       
       // led_d13
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":64.59019999999964,"cy":65.26980000000003,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(51,222,9,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","led_d13");
       

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
arduino_Arduino = arduino_Arduino.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         this.attr({resizeable:false});
         this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
         

         this.onChangeCallback = (emitter, event)=>{
            this.layerAttr("led_d13",{fill: event.value?"#33DE09":"#f0f0f0"});
         }

         this.onConnectedCallback = (emitter, event)=>{
            this.layerAttr("led_power",{fill: hardware.arduino.connected?"#FF3C00":"#f0f0f0"});
         }
    },
    
    calculate:function(){
        this.propagate(2,  this.getPort("port_d2"));
        this.propagate(3,  this.getPort("port_d3"));
        this.propagate(4,  this.getPort("port_d4"));
        this.propagate(5,  this.getPort("port_d5"));
        this.propagate(6,  this.getPort("port_d6"));
        this.propagate(7,  this.getPort("port_d7"));
        this.propagate(8,  this.getPort("port_d8"));
        this.propagate(9,  this.getPort("port_d9"));
        this.propagate(10, this.getPort("port_d10"));
        this.propagate(11, this.getPort("port_d11"));
        this.propagate(12, this.getPort("port_d12"));
        this.propagate(13, this.getPort("port_d13"));
        this.propagate(14, this.getPort("port_a0"));
    },

    // eiter read or write....depends on the other side port of the connection
    propagate: function(index, port){
        if(!port.getConnections().isEmpty()){
            var con = port.getConnections().first();
            var other = con.getSource()===port?con.getTarget():con.getSource()
            if(other instanceof draw2d.InputPort){
                port.setValue(hardware.arduino.get(index))
            }
            else {
                hardware.arduino.set(index,other.getBooleanValue())
            }
        }
    },
    
   /**
     *  Called if the simulation mode is starting
     **/
    onStart:function(){
        this.getPort("port_d13").on("change:value", this.onChangeCallback);
    },

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop:function(){
        this.getPort("port_d13").off("change:value", this.onChangeCallback);
    },
    
    setCanvas: function(canvas)
    {
        // deregister old listerener ...if exists
        if(this.canvas !==null) {
            hardware.arduino.off("connect", this.onConnectedCallback);
            hardware.arduino.off("disconnect", this.onConnectedCallback);
        }
        
        this._super(canvas);
        
        // register new listener...if requried
        if(this.canvas !==null) {
            hardware.arduino.on("connect", this.onConnectedCallback);
            hardware.arduino.on("disconnect", this.onConnectedCallback);
            
            this.onConnectedCallback();
            if(this.getPort("port_d13").getValue() && !this.getPort("port_d13").getConnections().isEmpty()) {
                 this.onChangeCallback(this, {value:true})
            }
            else{
                 this.onChangeCallback(this, {value:false})
            }
        }
    },
    
    getRequiredHardware: function(){
      return {
        arduino: true
      }
    }
    
});