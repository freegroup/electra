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


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var arduino_Signal = CircuitFigure.extend({

   NAME: "arduino_Signal",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:30,height:32},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.063333333334716, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 30;
      this.originalHeight= 32;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L30,0 L30,32 L0,32");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":15,"ry":16,"cx":15,"cy":16,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Line
       shape = this.canvas.paper.path('M25.94430000000102 5.062700000001314L5.283199999999852,27.963700000000244');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M5.3521000000100685 4.786000000009153L24.888199999999415,27.673900000004323');
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
arduino_Signal = arduino_Signal.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         this.attr({resizeable:false});
         this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
         
         this.onChangeCallback = (emitter, event)=>{
            this.layerAttr("circle",{fill: event.value?"#C21B7A":"#f0f0f0"});
            // set the LED on the Arduino on/off
            hardware.arduino.set(3, event.value);
         }
    },
    
    calculate:function(context){
    },
    
    /**
     *  Called if the simulation mode is starting
     **/
    onStart:function(context){
        this.getInputPort(0).on("change:value", this.onChangeCallback);
    },

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop:function(context){
        this.getInputPort(0).off("change:value", this.onChangeCallback);
    }
});


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


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_alu_FullAdder4Bit = CircuitFigure.extend({

   NAME: "digital_alu_FullAdder4Bit",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80.234375,height:200},attr), setter, getter);
     var port;
     // output_as
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.08036611489784, y: 9.43359375 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_as");
     port.setMaxFanOut(20);
     // output_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.95423563777995, y: 89.72807499999999 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_c");
     port.setMaxFanOut(20);
     // input_a1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9028549172347385, y: 9.78125 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a1");
     port.setMaxFanOut(20);
     // input_b1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8071353456672887, y: 19.785025000000132 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b1");
     port.setMaxFanOut(20);
     // input_c1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9028549172347385, y: 29.687149999999747 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_c1");
     port.setMaxFanOut(20);
     // input_d1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8071353456672887, y: 39.673375000000306 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d1");
     port.setMaxFanOut(20);
     // input_a2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9028549172347385, y: 49.61467499999981 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a2");
     port.setMaxFanOut(20);
     // input_b2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9068432327168573, y: 59.663724999999886 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b2");
     port.setMaxFanOut(20);
     // input_c2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9068432327168573, y: 69.671875 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_c2");
     port.setMaxFanOut(20);
     // input_d2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9068432327168573, y: 79.671875 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d2");
     port.setMaxFanOut(20);
     // input_cin
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9068432327168573, y: 89.72807499999999 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_cin");
     port.setMaxFanOut(20);
     // output_bs
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.08036611489784, y: 19.6171875 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_bs");
     port.setMaxFanOut(20);
     // output_cs
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.08036611489784, y: 29.687149999999747 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_cs");
     port.setMaxFanOut(20);
     // output_ds
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.08036611489784, y: 39.673375000000306 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_ds");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80.234375;
      this.originalHeight= 200;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80.234375,0 L80.234375,200 L0,200");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1Q0,0 1, 0L79,0Q80,0 80, 1L80,199Q80,200 79, 200L1,200Q0,200 0, 199L0,1');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'FA');
       shape.attr({"x":31.538024999999834,"y":81.72956250000061,"text-anchor":"start","text":"FA","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A1');
       shape.attr({"x":6.27559999999994,"y":21.5,"text-anchor":"start","text":"A1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B1');
       shape.attr({"x":7.77559999999994,"y":40.625,"text-anchor":"start","text":"B1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'As');
       shape.attr({"x":58.11934999999994,"y":19,"text-anchor":"start","text":"As","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":55.93184999999994,"y":182.34375,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C1');
       shape.attr({"x":7.77559999999994,"y":60.234375,"text-anchor":"start","text":"C1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4 Bit');
       shape.attr({"x":27.5,"y":97.34675000000061,"text-anchor":"start","text":"4 Bit","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D1');
       shape.attr({"x":7.27559999999994,"y":80.72956250000061,"text-anchor":"start","text":"D1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A2');
       shape.attr({"x":7.27559999999994,"y":100.203125,"text-anchor":"start","text":"A2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B2');
       shape.attr({"x":7.27559999999994,"y":120.4375,"text-anchor":"start","text":"B2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C2');
       shape.attr({"x":7.27559999999994,"y":140.671875,"text-anchor":"start","text":"C2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":8.352399999999761,"y":160.40625,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":8.27559999999994,"y":182.640625,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'in');
       shape.attr({"x":17.772399999999834,"y":185.7109375,"text-anchor":"start","text":"in","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'out');
       shape.attr({"x":62.109375,"y":189.6328125,"text-anchor":"start","text":"out","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Bs');
       shape.attr({"x":57.46309999999994,"y":38.5625,"text-anchor":"start","text":"Bs","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Cs');
       shape.attr({"x":57.46309999999994,"y":59.374299999999494,"text-anchor":"start","text":"Cs","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Ds');
       shape.attr({"x":58.11934999999994,"y":79.22956250000061,"text-anchor":"start","text":"Ds","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_alu_FullAdder4Bit = digital_alu_FullAdder4Bit.extend({

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
    calculate:function()
    {
        var input = [];
        var output = [];
        
        input.push(this.getInputPort("input_a1").getBooleanValue());
        input.push(this.getInputPort("input_b1").getBooleanValue());
        input.push(this.getInputPort("input_c1").getBooleanValue());
        input.push(this.getInputPort("input_d1").getBooleanValue());
        
        input.push(this.getInputPort("input_a2").getBooleanValue());
        input.push(this.getInputPort("input_b2").getBooleanValue());
        input.push(this.getInputPort("input_c2").getBooleanValue());
        input.push(this.getInputPort("input_d2").getBooleanValue());
 
        input.push(this.getInputPort("input_cin").getBooleanValue());
 
        var carry = input[8];
       
        for (var i=0; i<4 ; i++){
            // calculate with the carry
            if(carry){
                if(input[i] && input[i+4]){
                    output[i]=true;
                }
                else if(input[i] || input[i+4]){
                    output[i]=false;
                }
                else{
                    output[i]=true;
                    carry=false;
                }
            }
            else{
                if(input[i] && input[i+4]){
                    output[i]=false;
                    carry = true;
                }
                else if(input[i] || input[i+4]){
                    output[i]=true;
                }
                else{
                    output[i]=false;
                }
            }
        }
        output[4]=carry;
        
        this.getOutputPort("output_as").setValue(output[0]);
        this.getOutputPort("output_bs").setValue(output[1]);
        this.getOutputPort("output_cs").setValue(output[2]);
        this.getOutputPort("output_ds").setValue(output[3]);
        this.getOutputPort("output_c").setValue(output[4]);
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function()
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function()
    {
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_buttons_4_Bit_Switch = CircuitFigure.extend({

   NAME: "digital_buttons_4_Bit_Switch",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:20,height:80},attr), setter, getter);
     var port;
     // port01
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 11.86262499999998 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port01");
     port.setMaxFanOut(20);
     // port02
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 38.125 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port02");
     port.setMaxFanOut(20);
     // port03
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 62.5 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port03");
     port.setMaxFanOut(20);
     // port04
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 87.5 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port04");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 20;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L20,0 L20,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // rect01
       shape = this.canvas.paper.path('M20 20L0 20L0 0L20 0Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect01");
       
       // rect02
       shape = this.canvas.paper.path('M20 40L0 40L0 20L20 20Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect02");
       
       // rect03
       shape = this.canvas.paper.path('M20 60L0 60L0 40L20 40Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect03");
       
       // rect04
       shape = this.canvas.paper.path('M20 80L0 80L0 60L20 60Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect04");
       

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
digital_buttons_4_Bit_Switch = digital_buttons_4_Bit_Switch.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.bitCount = 4;
        
        this.setResizeable(false);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.on("click",(emitter, event) => {
            var h = emitter.getHeight();
            var modh = h/this.bitCount;
            var index = (event.relY/modh)|0;
            var port = emitter.getOutputPort(index);
            port.setValue(!port.getBooleanValue());
            emitter.layerAttr("rect0"+(index+1), {fill:port.getBooleanValue()?"#C21B7A":"#FFFFFF"});
        });
    },
    
    calculate: function()
    {
    
        
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_buttons_HighLow = CircuitFigure.extend({

   NAME: "digital_buttons_HighLow",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:42,height:42.5},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.80952380952381, y: 52.94117647058824 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 42;
      this.originalHeight= 42.5;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L42,0 L42,42.5 L0,42.5");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":4.5,"y":10.5,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#C21B7A","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'0');
       shape.attr({"x":4,"y":32,"text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":3,"ry":3.5,"cx":39,"cy":22.5,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // high
       shape = this.canvas.paper.path('M39.29830000000038 22.446912500003236L13.857399999998961,11.091512500001045');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       
       // low
       shape = this.canvas.paper.path('M38.75319999999738 22.70831250000083L13.644500000000335,32.35131249999904');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       

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
digital_buttons_HighLow = digital_buttons_HighLow.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.value = false;
        this.on("click",()=>{            
            this.value = !this.value;
            this.layerShow("low" , !this.value, 100);
            this.layerShow("high",  this.value, 100);
            this.getOutputPort(0).setValue(this.value);
        });

        this.on("added",()=>{
            this.layerShow("low" , !this.value);
            this.layerShow("high",  this.value);
            this.getOutputPort(0).setValue(this.value);
        });
    },
    
    calculate: function()
    {
        // do nothing per default;
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_buttons_HighLowArray = CircuitFigure.extend({

   NAME: "digital_buttons_HighLowArray",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:20,height:160},attr), setter, getter);
     var port;
     // port01
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 5.93131249999999 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port01");
     port.setMaxFanOut(20);
     // port02
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 19.0625 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port02");
     port.setMaxFanOut(20);
     // port03
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 31.25 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port03");
     port.setMaxFanOut(20);
     // port04
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 43.75 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port04");
     port.setMaxFanOut(20);
     // port05
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 56.434937500000046 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port05");
     port.setMaxFanOut(20);
     // port06
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 68.72787499999959 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port06");
     port.setMaxFanOut(20);
     // port07
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 81.1621875000003 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port07");
     port.setMaxFanOut(20);
     // port08
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 93.93256250000036 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("port08");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 20;
      this.originalHeight= 160;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L20,0 L20,160 L0,160");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // rect01
       shape = this.canvas.paper.path('M20 20L0 20L0 0L20 0Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect01");
       
       // rect02
       shape = this.canvas.paper.path('M20 40L0 40L0 20L20 20Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect02");
       
       // rect03
       shape = this.canvas.paper.path('M20 60L0 60L0 40L20 40Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect03");
       
       // rect04
       shape = this.canvas.paper.path('M20 80L0 80L0 60L20 60Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect04");
       
       // rect05
       shape = this.canvas.paper.path('M20 100L0 100L0 80L20 80Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect05");
       
       // rect06
       shape = this.canvas.paper.path('M20 120L0 120L0 100L20 100Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect06");
       
       // rect07
       shape = this.canvas.paper.path('M20 140L0 140L0 120L20 120Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect07");
       
       // rect08
       shape = this.canvas.paper.path('M20 160L0 160L0 140L20 140Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect08");
       

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
digital_buttons_HighLowArray = digital_buttons_HighLowArray.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);


        this.setResizeable(false);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.on("click",function(emitter, event){
            var h = emitter.getHeight();
            var modh = h/8;
            var index = (event.relY/modh)|0;
            var port = emitter.getOutputPort(index);
            port.setValue(!port.getBooleanValue());
            emitter.layerAttr("rect0"+(index+1), {fill:port.getBooleanValue()?"#C21B7A":null});
        });
    },
    
    calculate: function()
    {
    
        
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_buttons_PushButton = CircuitFigure.extend({

   NAME: "digital_buttons_PushButton",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:35.04322500000035,height:28.93699999999899},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 131.7741517796944, y: 82.88350554653319 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 35.04322500000035;
      this.originalHeight= 28.93699999999899;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L35.04322500000035,0 L35.04322500000035,28.93699999999899 L0,28.93699999999899");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Label
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4.5,"ry":4,"cx":4.5,"cy":22.98399999999947,"stroke":"none","stroke-width":0,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4.5,"ry":4,"cx":27.5,"cy":23.48399999999947,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // low
       shape = this.canvas.paper.path('M26.125825000000987,8.735999999999876Q24.125825000000987,8.735999999999876 24.125825000000987, 6.735999999999876L24.125825000000987,2Q24.125825000000987,0 22.125825000000987, 0L11.125825000000987,0Q9.125825000000987,0 9.125825000000987, 2L9.125825000000987,6.735999999999876Q9.125825000000987,8.735999999999876 7.125825000000987, 8.735999999999876L2.299425000001065,8.735999999999876Q0.2994250000010652,8.735999999999876 0.2994250000010652, 10.735999999999876L0.2994250000010652,11.735999999999876Q0.2994250000010652,13.735999999999876 2.299425000001065, 13.735999999999876L30.299425000001065,13.735999999999876Q32.299425000001065,13.735999999999876 32.299425000001065, 11.735999999999876L32.299425000001065,10.735999999999876Q32.299425000001065,8.735999999999876 30.299425000001065, 8.735999999999876L26.125825000000987,8.735999999999876');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       
       // high
       shape = this.canvas.paper.path('M22.31382500000109,16.235999999999876Q20.50182500000119,16.235999999999876 21.26817190867568, 14.388647187036133L23.359478091326498,9.347352812963743Q24.125825000000987,7.5 22.125825000000987, 7.5L11.125825000000987,7.5Q9.125825000000987,7.5 9.627772390073126, 9.4359878144244L10.888877609928265,14.300012185575476Q11.390825000000405,16.235999999999876 9.390825000000405, 16.235999999999876L2.299425000001065,16.235999999999876Q0.2994250000010652,16.235999999999876 0.2994250000010652, 18.235999999999876L0.2994250000010652,19.235999999999876Q0.2994250000010652,21.235999999999876 2.299425000001065, 21.235999999999876L30.299425000001065,21.235999999999876Q32.299425000001065,21.235999999999876 32.299425000001065, 19.235999999999876L32.299425000001065,18.235999999999876Q32.299425000001065,16.235999999999876 30.299425000001065, 16.235999999999876L26.125825000000987,16.235999999999876Q24.125825000000987,16.235999999999876 22.31382500000109, 16.235999999999876L22.31382500000109,16.235999999999876');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       
       // Line
       shape = this.canvas.paper.path('M30.043225000000348 23.93699999999899L37.699524999999994,23.93699999999899L45.35582500000055,23.93699999999899');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
digital_buttons_PushButton = digital_buttons_PushButton.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.setResizeable(false);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.value = false;
        this.on("mousedown",()=>{            
            this.layerShow("low" , false, 100);
            this.layerShow("high", true,  100);
            this.getOutputPort(0).setValue(true);
        });
        this.on("mouseup",()=>{            
            this.value = !this.value;
            this.layerShow("low" , true,  100);
            this.layerShow("high", false, 100);
            this.getOutputPort(0).setValue(false);
        });

        this.on("added",()=>{
            this.layerShow("low" , true);
            this.layerShow("high", false);
            this.getOutputPort(0).setValue(false);
        });
    },
    
    calculate: function()
    {
        // do nothing per default;
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_counter_BCDCounter = CircuitFigure.extend({

   NAME: "digital_counter_BCDCounter",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:108},attr), setter, getter);
     var port;
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.2083358764652985, y: 18.055555555555557 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(1);
     // out_a
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.6000000000015, y: 13.88888888888889 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_a");
     port.setMaxFanOut(20);
     // out_b
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.8500000000015, y: 37.03703703703704 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_b");
     port.setMaxFanOut(20);
     // out_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.8500000000015, y: 60.18518518518518 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_c");
     port.setMaxFanOut(20);
     // out_d
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.1000000000015, y: 83.33333333333333 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_d");
     port.setMaxFanOut(25);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 108;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,108 L0,108");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,105Q80,108 77, 108L3,108Q0,108 0, 105L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'BCD -');
       shape.attr({"x":8.033331298827761,"y":41,"text-anchor":"start","text":"BCD -","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Counter');
       shape.attr({"x":7.033331298827761,"y":55.600000000000364,"text-anchor":"start","text":"Counter","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 11L18 19.74285714285361L0 28Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":63.01770629882776,"y":16,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":63.01770629882776,"y":41.5,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":63.01770629882776,"y":65.5,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":63.01770629882776,"y":90.5,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M32.766524013312846 15.93724999999904L36 20.93724999999904L29 20.93724999999904Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(31,31,31,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Line
       shape = this.canvas.paper.path('M19.482999999999265 24.720499999999447L32.80199999999968,24.720499999999447L32.80199999999968,13.153999999999542L45.06949999999961,13.153999999999542');
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
digital_counter_BCDCounter = digital_counter_BCDCounter.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

         // your special code here
         this.last_t=false;
         this.counter=0;
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function()
    {
        var t = this.getInputPort(0).getBooleanValue();

        var rising = this.last_t===false && t===true; 
        if(rising===true){
            var a = this.getOutputPort("out_a");
            var b = this.getOutputPort("out_b");
            var c = this.getOutputPort("out_c");
            var d = this.getOutputPort("out_d");
            a.setValue(!!(this.counter & 1));
            b.setValue(!!(this.counter & 2));
            c.setValue(!!(this.counter & 4));
            d.setValue(!!(this.counter & 8));
            this.counter= (this.counter+1)%10;
        }
        this.last_t = t;
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function()
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function()
    {
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_decoder_BCDto7Seg = CircuitFigure.extend({

   NAME: "digital_decoder_BCDto7Seg",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:87,height:185},attr), setter, getter);
     var port;
     // out_a
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 8.108108108108109 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_a");
     port.setMaxFanOut(20);
     // out_b
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 21.62162162162162 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_b");
     port.setMaxFanOut(20);
     // out_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 35.13513513513514 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_c");
     port.setMaxFanOut(20);
     // out_d
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 48.64864864864865 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_d");
     port.setMaxFanOut(20);
     // out_e
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 62.16216216216217 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_e");
     port.setMaxFanOut(20);
     // out_f
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 75.67567567567568 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_f");
     port.setMaxFanOut(20);
     // in_a
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.7563218390786532, y: 8.108108108108109 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in_a");
     port.setMaxFanOut(20);
     // in_b
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.7563218390786532, y: 21.62162162162162 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in_b");
     port.setMaxFanOut(20);
     // in_c
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.7563218390786532, y: 35.13513513513514 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in_c");
     port.setMaxFanOut(20);
     // in_d
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2988505747126435, y: 48.64864864864865 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in_d");
     port.setMaxFanOut(20);
     // out_g
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.14942528735631, y: 89.00583783783766 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_g");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 87;
      this.originalHeight= 185;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L87,0 L87,185 L0,185");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L84,0Q87,0 87, 3L87,182Q87,185 84, 185L3,185Q0,185 0, 182L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'BCD');
       shape.attr({"x":29.3359375,"y":13.75,"text-anchor":"start","text":"BCD","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'7-Seg');
       shape.attr({"x":29.3359375,"y":44.25,"text-anchor":"start","text":"7-Seg","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":72,"y":15.5,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":73,"y":40.5,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":73,"y":66,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":73,"y":90,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'E');
       shape.attr({"x":73,"y":115,"text-anchor":"start","text":"E","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'F');
       shape.attr({"x":73,"y":140,"text-anchor":"start","text":"F","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":7.472000000001572,"y":14.5,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label B
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":7.472000000001572,"y":39.5,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label B");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":7,"y":65,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":6.472000000001572,"y":90,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'to');
       shape.attr({"x":38.3359375,"y":28.5,"text-anchor":"start","text":"to","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'G');
       shape.attr({"x":72,"y":165.0703999999996,"text-anchor":"start","text":"G","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_decoder_BCDto7Seg = digital_decoder_BCDto7Seg.extend({

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
        var e = (this.getInputPort("in_a").getBooleanValue()?1:0) +
                (this.getInputPort("in_b").getBooleanValue()?2:0) +
                (this.getInputPort("in_c").getBooleanValue()?4:0) +
                (this.getInputPort("in_d").getBooleanValue()?8:0);

       this.getOutputPort("out_a").setValue( ((e!=1) &&(e!=4)&&(e!=6)&& (e<10)));
       this.getOutputPort("out_b").setValue( ((e!=5) &&(e!=6)&& (e<10)));
       this.getOutputPort("out_c").setValue( ((e!=2) &&(e<10)));
       this.getOutputPort("out_d").setValue( (((e!==1)&&(e!==4)&&(e!==7))||(e>10)));
       this.getOutputPort("out_e").setValue( (((e===0)||(e===2)||(e===6)||(e===8))||(e>9)));
       this.getOutputPort("out_f").setValue( ((e!=1) &&(e!=2)&&(e!=3)&&(e!=7)&&(e<10)));
       this.getOutputPort("out_g").setValue( (((e!==0)&&(e!==1)&&(e!==7))||(e>9)));
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


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_display_7Segment = CircuitFigure.extend({

   NAME: "digital_display_7Segment",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:90,height:185},attr), setter, getter);
     var port;
     // port_a
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 7.837837837837839 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_a");
     port.setMaxFanOut(20);
     // port_b
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 21.891891891891895 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_b");
     port.setMaxFanOut(20);
     // port_c
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 34.86486486486487 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_c");
     port.setMaxFanOut(20);
     // port_d
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 48.37837837837838 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_d");
     port.setMaxFanOut(20);
     // port_e
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 61.891891891891895 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_e");
     port.setMaxFanOut(20);
     // port_f
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 75.4054054054054 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_f");
     port.setMaxFanOut(20);
     // port_g
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 1.050888888889353, y: 88.91891891891892 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_g");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 90;
      this.originalHeight= 185;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L90,0 L90,185 L0,185");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L88,0Q90,0 90, 2L90,183Q90,185 88, 185L2,185Q0,185 0, 183L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // seg_a
       shape = this.canvas.paper.path('M23.445800000000418,13.439400000000205Q23.445800000000418,10.439400000000205 26.445800000000418, 10.439400000000205L80.44580000000042,10.439400000000205Q83.44580000000042,10.439400000000205 83.44580000000042, 13.439400000000205L83.44580000000042,17.439400000000205Q83.44580000000042,20.439400000000205 80.44580000000042, 20.439400000000205L26.445800000000418,20.439400000000205Q23.445800000000418,20.439400000000205 23.445800000000418, 17.439400000000205L23.445800000000418,13.439400000000205');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_a");
       
       // seg_b
       shape = this.canvas.paper.path('M74.71072077107742,27.838439779342117Q74.93453192061952,24.846800000000258 77.93225340387478, 24.96370127813659L82.44807851674516,25.139803604681425Q85.44580000000042,25.256704882817758 85.22045796808241, 28.248229739584126L81.18241011129932,81.85527514323388Q80.95706807938132,84.84680000000026 77.95706807938132, 84.84680000000026L73.44580000000042,84.84680000000026Q70.44580000000042,84.84680000000026 70.66961114954252, 81.8551602206584L74.71072077107742,27.838439779342117');
       shape.attr({"stroke":"rgba(3,3,3,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_b");
       
       // seg_c
       shape = this.canvas.paper.path('M67.98722077107736,104.43103977934206Q68.21103192061946,101.4394000000002 71.2087534038747, 101.55630127813706L75.72457851674513,101.73240360468267Q78.72230000000036,101.84930488281952 78.49695796808236, 104.8408297395859L74.45891011129926,158.44787514323383Q74.23356807938126,161.4394000000002 71.23356807938126, 161.4394000000002L66.72230000000036,161.4394000000002Q63.72230000000036,161.4394000000002 63.94611114954245, 158.44776022065835L67.98722077107736,104.43103977934206');
       shape.attr({"stroke":"rgba(28,28,28,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_c");
       
       // seg_d
       shape = this.canvas.paper.path('M10.945800000000418,167.4394000000002Q10.945800000000418,164.4394000000002 13.945800000000418, 164.4394000000002L67.94580000000042,164.4394000000002Q70.94580000000042,164.4394000000002 70.94580000000042, 167.4394000000002L70.94580000000042,171.4394000000002Q70.94580000000042,174.4394000000002 67.94580000000042, 174.4394000000002L13.945800000000418,174.4394000000002Q10.945800000000418,174.4394000000002 10.945800000000418, 171.4394000000002L10.945800000000418,167.4394000000002');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_d");
       
       // seg_e
       shape = this.canvas.paper.path('M14.210720771077426,103.43103977934206Q14.43453192061952,100.4394000000002 17.432253403874775, 100.55630127813653L21.948078516745163,100.73240360468138Q24.945800000000418,100.8493048828177 24.72045796808242, 103.84082973958408L20.682410111299312,157.44787514323383Q20.457068079381315,160.4394000000002 17.457068079381315, 160.4394000000002L12.945800000000418,160.4394000000002Q9.945800000000418,160.4394000000002 10.169611149542511, 157.44776022065835L14.210720771077426,103.43103977934206');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_e");
       
       // seg_f
       shape = this.canvas.paper.path('M19.210720771077426,27.838439779342117Q19.43453192061952,24.846800000000258 22.432253403874817, 24.963701278135552L26.94807851674512,25.139803604678825Q29.945800000000418,25.25670488281412 29.720457968082435, 28.248229739580495L25.682410111299298,81.85527514323388Q25.457068079381315,84.84680000000026 22.457068079381315, 84.84680000000026L17.945800000000418,84.84680000000026Q14.945800000000418,84.84680000000026 15.169611149542511, 81.8551602206584L19.210720771077426,27.838439779342117');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_f");
       
       // seg_g
       shape = this.canvas.paper.path('M16.670600000000377,91.23220000000038Q16.670600000000377,88.23220000000038 19.670600000000377, 88.23220000000038L73.67060000000038,88.23220000000038Q76.67060000000038,88.23220000000038 76.67060000000038, 91.23220000000038L76.67060000000038,95.23220000000038Q76.67060000000038,98.23220000000038 73.67060000000038, 98.23220000000038L19.670600000000377,98.23220000000038Q16.670600000000377,98.23220000000038 16.670600000000377, 95.23220000000038L16.670600000000377,91.23220000000038');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","seg_g");
       

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
digital_display_7Segment = digital_display_7Segment.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        // ensure that the ports has the same order as the segments
        //
        this.portLockup = [];
        this.portLockup.push({ p:this.getPort("port_a"), s:"seg_a"});
        this.portLockup.push({ p:this.getPort("port_b"), s:"seg_b"});
        this.portLockup.push({ p:this.getPort("port_c"), s:"seg_c"});
        this.portLockup.push({ p:this.getPort("port_d"), s:"seg_d"});
        this.portLockup.push({ p:this.getPort("port_e"), s:"seg_e"});
        this.portLockup.push({ p:this.getPort("port_f"), s:"seg_f"});
        this.portLockup.push({ p:this.getPort("port_g"), s:"seg_g"});
    },
    
    calculate:function(context)
    {
        var _this = this;
        this.portLockup.forEach(function(element, index){
            _this.layerAttr(element.s, { 
                fill  : element.p.getBooleanValue()?"#C21B7A":null,
                stroke: element.p.getBooleanValue()?"#000000":"#f4f4f9"
            });
        });
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_display_Led = CircuitFigure.extend({

   NAME: "digital_display_Led",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:30,height:32},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.3333333333333335, y: 51.5625 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 30;
      this.originalHeight= 32;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L30,0 L30,32 L0,32");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":15,"ry":16,"cx":15,"cy":16,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Line
       shape = this.canvas.paper.path('M5.522100000000137 5.682400000001508L15.138100000001941,16.496800000000803L24.754100000001927,27.31119999999919');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M25.94430000000102 5.062700000001314L5.283199999999852,27.963700000000244');
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
digital_display_Led = digital_display_Led.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    calculate: function()
    {
        var port = this.getInputPort(0);
        if(port.hasChangedValue()){
            this.layerAttr("circle",{fill: port.getBooleanValue()?"#C21B7A":"#f0f0f0"});
        }
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_flipflop_DFlipFlop = CircuitFigure.extend({

   NAME: "digital_flipflop_DFlipFlop",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:41.5,height:53.052974999999606},attr), setter, getter);
     var port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.42921686747059, y: 20.526652840864077 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.42921686747059, y: 79.98738525030996 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     // input_d
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 20.526652840864077 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d");
     port.setMaxFanOut(20);
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 79.98738525030996 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 41.5;
      this.originalHeight= 53.052974999999606;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L41.5,0 L41.5,53.052974999999606 L0,53.052974999999606");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.5,2Q1.5,1 2.5, 1L40.5,1Q41.5,1 41.5, 2L41.5,50Q41.5,51 40.5, 51L2.5,51Q1.5,51 1.5, 50L1.5,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":4,"y":10.6796875,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":28.28125,"y":11.1796875,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":27.78125,"y":42.373287499999606,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.5 37.1269999999995L13.541999999999462 42.03299999999854L1.5 47.38499999999931Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Line
       shape = this.canvas.paper.path('M27.847999999999956 36.49839999999767L35.374799999999595,36.49839999999767');
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
digital_flipflop_DFlipFlop = digital_flipflop_DFlipFlop.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.last_t = false;
    },
    
    calculate:function()
    {
        var d = this.getInputPort("input_d").getBooleanValue();
        var t = this.getInputPort("input_t").getBooleanValue();
        
        var q = this.getOutputPort("output_q");
        var q_ = this.getOutputPort("output_q_not");
        
        var rising = this.last_t===false && t===true; 
        
        if(rising===true){
            q.setValue(d);
            q_.setValue(!d)
        }
        this.last_t = t;
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_flipflop_JKFlipFlop = CircuitFigure.extend({

   NAME: "digital_flipflop_JKFlipFlop",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:63.12239999999838},attr), setter, getter);
     var port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 16.919013694029815 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 81.57637779932148 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 48.8296626870959 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(1);
     // input_j
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.717999999996664, y: 16.919013694029815 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_j");
     port.setMaxFanOut(1);
     // input_k
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 81.57637779932148 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_k");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 63.12239999999838;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,63.12239999999838 L0,63.12239999999838");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1.122399999998379Q0,0.12239999999837892 1, 0.12239999999837892L39,0.12239999999837892Q40,0.12239999999837892 40, 1.122399999998379L40,62.12239999999838Q40,63.12239999999838 39, 63.12239999999838L1,63.12239999999838Q0,63.12239999999838 0, 62.12239999999838L0,1.122399999998379');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.28125,"y":51.43056749999869,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 25.69345499999781L12.041999999999462 30.59945499999685L0 35.95145499999762Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.28125,"y":10.736967499998173,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'J');
       shape.attr({"x":8.0078125,"y":10.6796875,"text-anchor":"start","text":"J","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'K');
       shape.attr({"x":7.978880000001482,"y":51.43056749999869,"text-anchor":"start","text":"K","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M26.347999999999956 45.555679999995846L33.874799999999595,45.555679999995846');
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
digital_flipflop_JKFlipFlop = digital_flipflop_JKFlipFlop.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.last_t = false;
    },
    
    calculate:function()
    {
        var j = this.getInputPort("input_j").getBooleanValue();
        var k = this.getInputPort("input_k").getBooleanValue();
        var t = this.getInputPort("input_t").getBooleanValue();
        
        var q = this.getOutputPort("output_q");
        var q_ = this.getOutputPort("output_q_not");
        
        var rising = this.last_t===false && t===true; 
        
        if(rising===true){
            // do nothing
            if(j===false && k ===false){
               
            }
            // reset
            else if(j===false && k===true){
                q.setValue(false);
                q_.setValue(true);
            }
            // set
            else if(j===true && k===false){
                q.setValue(true);
                q_.setValue(false);
            }
            // toggle
            else if(j===true && k===true){
                var v = q.getBooleanValue();
                q.setValue( !v);
                q_.setValue( v);
            }
        }
        this.last_t = t;
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_flipflop_JKRFlipFlop = CircuitFigure.extend({

   NAME: "digital_flipflop_JKRFlipFlop",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:69.67057499999919},attr), setter, getter);
     var port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 15.328835021097678 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 73.90920413675094 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 44.24027647252658 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(1);
     // input_j
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.717999999996664, y: 15.328835021097678 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_j");
     port.setMaxFanOut(1);
     // input_k
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 73.90920413675094 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_k");
     port.setMaxFanOut(1);
     // input_r
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 50, y: 97.69002193537226 }));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_r");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 69.67057499999919;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,69.67057499999919 L0,69.67057499999919");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1.122399999998379Q0,0.12239999999837892 1, 0.12239999999837892L39,0.12239999999837892Q40,0.12239999999837892 40, 1.122399999998379L40,62.12239999999838Q40,63.12239999999838 39, 63.12239999999838L1,63.12239999999838Q0,63.12239999999838 0, 62.12239999999838L0,1.122399999998379');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":27,"y":51.43056749999869,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 25.69345499999781L12.041999999999462 30.59945499999685L0 35.95145499999762Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":27,"y":10.736967499998173,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'J');
       shape.attr({"x":5,"y":10.6796875,"text-anchor":"start","text":"J","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'K');
       shape.attr({"x":5,"y":51.43056749999869,"text-anchor":"start","text":"K","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'CLR');
       shape.attr({"x":10,"y":59.11588749999919,"text-anchor":"start","text":"CLR","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M28.44800000000123 45.555679999995846L33.574799999999414,45.555679999995846');
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
digital_flipflop_JKRFlipFlop = digital_flipflop_JKRFlipFlop.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.last_t = false;
    },
    
    calculate:function(context)
    {
        var j = this.getInputPort("input_j").getBooleanValue();
        var k = this.getInputPort("input_k").getBooleanValue();
        var t = this.getInputPort("input_t").getBooleanValue();
        var r = this.getInputPort("input_r").getBooleanValue();
        
        var q = this.getOutputPort("output_q");
        var q_ = this.getOutputPort("output_q_not");
        
        var rising = this.last_t===false && t===true; 
        
        if(r === false){
            rising = true;
            j = false;
            k = true;
        }
        
        if(rising===true){
            // do nothing
            if(j===false && k ===false){
               
            }
            // reset
            else if(j===false && k===true){
                q.setValue(false);
                q_.setValue(true);
            }
            // set
            else if(j===true && k===false){
                q.setValue(true);
                q_.setValue(false);
            }
            // toggle
            else if(j===true && k===true){
                var v = q.getBooleanValue();
                q.setValue( !v);
                q_.setValue( v);
            }
        }
        this.last_t = t;
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_flipflop_SRFlipFlop = CircuitFigure.extend({

   NAME: "digital_flipflop_SRFlipFlop",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:63.12239999999838},attr), setter, getter);
     var port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 16.919013694029815 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 81.57637779932148 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     // input_s
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.717999999996664, y: 16.919013694029815 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_s");
     port.setMaxFanOut(1);
     // input_r
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.052799999996296, y: 81.57637779932148 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_r");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 63.12239999999838;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,63.12239999999838 L0,63.12239999999838");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1.122399999998379Q0,0.12239999999837892 1, 0.12239999999837892L39,0.12239999999837892Q40,0.12239999999837892 40, 1.122399999998379L40,62.12239999999838Q40,63.12239999999838 39, 63.12239999999838L1,63.12239999999838Q0,63.12239999999838 0, 62.12239999999838L0,1.122399999998379');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.28125,"y":51.43056749999869,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.28125,"y":10.736967499998173,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'S');
       shape.attr({"x":8.0078125,"y":10.6796875,"text-anchor":"start","text":"S","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'R');
       shape.attr({"x":7.978880000001482,"y":51.43056749999869,"text-anchor":"start","text":"R","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M26.347999999999956 45.555679999995846L33.874799999999595,45.555679999995846');
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
digital_flipflop_SRFlipFlop = digital_flipflop_SRFlipFlop.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    calculate:function(context)
    {
        var s = !!this.getInputPort("input_s").getBooleanValue();
        var r = !!this.getInputPort("input_r").getBooleanValue();

        var q = this.getOutputPort("output_q");
        var q_ = this.getOutputPort("output_q_not");
        // do nothing
        if(s===false && r===false){
           
        }
        // reset
        else if(s===false && r===true){
            q.setValue(false);
            q_.setValue(true);
        }
        // set
        else if(s===true && r===false){
            q.setValue(true);
            q_.setValue(false);
        }
        // invalid
        else if(s===true && r===true){
            q.setValue( false);
            q_.setValue( false);
        }
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_flipflop_TFlipFlop = CircuitFigure.extend({

   NAME: "digital_flipflop_TFlipFlop",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:52.552974999999606},attr), setter, getter);
     var port;
     // output_q
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 19.770526787494724 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q");
     port.setMaxFanOut(20);
     // output_q_not
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.52031250000073, y: 79.79698104626927 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q_not");
     port.setMaxFanOut(20);
     // input_t
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -6.207600000000184, y: 48.5224670915399 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_t");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 52.552974999999606;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,52.552974999999606 L0,52.552974999999606");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1.5Q0,0.5 1, 0.5L39,0.5Q40,0.5 40, 1.5L40,49.5Q40,50.5 39, 50.5L1,50.5Q0,50.5 0, 49.5L0,1.5');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.78125,"y":10.6796875,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q');
       shape.attr({"x":26.28125,"y":41.873287499999606,"text-anchor":"start","text":"Q","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.5 20.371000000000095L12.541999999999462 25.276999999999134L0.5 30.628999999999905Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Line
       shape = this.canvas.paper.path('M26.347999999999956 35.99839999999767L33.874799999999595,35.99839999999767');
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
digital_flipflop_TFlipFlop = digital_flipflop_TFlipFlop.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.last_t = false;
    },
    
    calculate:function(context)
    {
        var t = this.getInputPort("input_t").getBooleanValue();
        
        var q = this.getOutputPort("output_q");
        var q_ = this.getOutputPort("output_q_not");
        
        var rising = this.last_t===false && t===true; 
        
        if(rising===true){
            var v = q.getBooleanValue();
            q.setValue(!v);
            q_.setValue(v)
        }
        this.last_t = t;
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_DIN40700_AND = CircuitFigure.extend({

   NAME: "digital_gate_DIN40700_AND",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:25,height:40},attr), setter, getter);
     var port;
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.16960000000108, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
     // input0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4128000000018801, y: 21.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input0");
     port.setMaxFanOut(20);
     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4128000000018801, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 25;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L25,0 L25,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 39.99286614625362L0.10151153763490584 40L4.42508868578534 39.696155060244564L8.617296130125396 38.79385241571799L12.550755768816998 37.32050807568885L16.105951421166537 35.320888862379434L19.174860266291944 32.85575219373095L21.664235061876752 30L23.498437414442378 26.840402866513614L24.621736013657028 23.47296355333856L25 20L24.621736013657028 16.52703644666144L23.498437414442378 13.159597133486386L21.664235061876752 10L19.174860266291944 7.14424780626905L16.105951421166537 4.679111137620566L12.550755768816998 2.679491924311151L8.617296130125396 1.2061475842820073L4.42508868578534 0.3038449397554359L0.10151153763490584 0L0 0.0071338537463816465L0 39.99286614625362Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,252,252,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       

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
digital_gate_DIN40700_AND = digital_gate_DIN40700_AND.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(i1.getBooleanValue() && i2.getBooleanValue());
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
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_DIN40700_NAND = CircuitFigure.extend({

   NAME: "digital_gate_DIN40700_NAND",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:32.945672466727046,height:40},attr), setter, getter);
     var port;
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 84.82349994510001, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
     // input0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.3132429611345624, y: 21.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input0");
     port.setMaxFanOut(20);
     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.3132429611345624, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 32.945672466727046;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L32.945672466727046,0 L32.945672466727046,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // shape
       shape = this.canvas.paper.path('M0 39.99286614625362L0.10151153763490584 40L4.42508868578534 39.696155060244564L8.617296130125396 38.79385241571799L12.550755768816998 37.32050807568885L16.105951421166537 35.320888862379434L19.174860266291944 32.85575219373095L21.664235061876752 30L23.498437414442378 26.840402866513614L24.621736013657028 23.47296355333856L25 20L24.621736013657028 16.52703644666144L23.498437414442378 13.159597133486386L21.664235061876752 10L19.174860266291944 7.14424780626905L16.105951421166537 4.679111137620566L12.550755768816998 2.679491924311151L8.617296130125396 1.2061475842820073L4.42508868578534 0.3038449397554359L0.10151153763490584 0L0 0.0071338537463816465L0 39.99286614625362Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,252,252,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","shape");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":27.945672466727046,"cy":20,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       

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
digital_gate_DIN40700_NAND = digital_gate_DIN40700_NAND.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(!(i1.getBooleanValue() && i2.getBooleanValue()));
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
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_DIN40700_NOR = CircuitFigure.extend({

   NAME: "digital_gate_DIN40700_NOR",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:30.5,height:40},attr), setter, getter);
     var port;
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 88.52459016393443, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.338360655739246, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
     // input0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.338360655739246, y: 21.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input0");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 30.5;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L30.5,0 L30.5,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // shape
       shape = this.canvas.paper.path('M0 39.99286614625362L0.10151153763490584 40L4.42508868578534 39.696155060244564L8.617296130125396 38.79385241571799L12.550755768816998 37.32050807568885L16.105951421166537 35.320888862379434L19.174860266291944 32.85575219373095L21.664235061876752 30L23.498437414442378 26.840402866513614L24.621736013657028 23.47296355333856L25 20L24.621736013657028 16.52703644666144L23.498437414442378 13.159597133486386L21.664235061876752 10L19.174860266291944 7.14424780626905L16.105951421166537 4.679111137620566L12.550755768816998 2.679491924311151L8.617296130125396 1.2061475842820073L4.42508868578534 0.3038449397554359L0.10151153763490584 0L0 0.0071338537463816465L0 39.99286614625362Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,252,252,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","shape");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4.5,"ry":4.5,"cx":26,"cy":20,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M19.442399999998997 31.555299999987255L0.7473999999992884,31.555299999987255');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M19.70780000000468 8.13890000000356L1.0128000000049724,8.13890000000356');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
digital_gate_DIN40700_NOR = digital_gate_DIN40700_NOR.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(!(i1.getBooleanValue() || i2.getBooleanValue()));
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
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_DIN40700_OR = CircuitFigure.extend({

   NAME: "digital_gate_DIN40700_OR",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:25,height:40},attr), setter, getter);
     var port;
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.16960000000108, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4128000000018801, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
     // input0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4128000000018801, y: 21.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input0");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 25;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L25,0 L25,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // shape
       shape = this.canvas.paper.path('M0 39.99286614625362L0.10151153763490584 40L4.42508868578534 39.696155060244564L8.617296130125396 38.79385241571799L12.550755768816998 37.32050807568885L16.105951421166537 35.320888862379434L19.174860266291944 32.85575219373095L21.664235061876752 30L23.498437414442378 26.840402866513614L24.621736013657028 23.47296355333856L25 20L24.621736013657028 16.52703644666144L23.498437414442378 13.159597133486386L21.664235061876752 10L19.174860266291944 7.14424780626905L16.105951421166537 4.679111137620566L12.550755768816998 2.679491924311151L8.617296130125396 1.2061475842820073L4.42508868578534 0.3038449397554359L0.10151153763490584 0L0 0.0071338537463816465L0 39.99286614625362Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,252,252,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","shape");
       
       // Line
       shape = this.canvas.paper.path('M19.442399999998997 31.555299999987255L0.7473999999992884,31.555299999987255');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M19.70780000000468 8.13890000000356L1.0128000000049724,8.13890000000356');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
digital_gate_DIN40700_OR = digital_gate_DIN40700_OR.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(i1.getBooleanValue() || i2.getBooleanValue());
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
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_DIN40700_XNOR = CircuitFigure.extend({

   NAME: "digital_gate_DIN40700_XNOR",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:25,height:40},attr), setter, getter);
     var port;
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.16960000000108, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
     // input0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4128000000018801, y: 21.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input0");
     port.setMaxFanOut(20);
     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4128000000018801, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 25;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L25,0 L25,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // shape
       shape = this.canvas.paper.path('M0 39.99286614625362L0.10151153763490584 40L4.42508868578534 39.696155060244564L8.617296130125396 38.79385241571799L12.550755768816998 37.32050807568885L16.105951421166537 35.320888862379434L19.174860266291944 32.85575219373095L21.664235061876752 30L23.498437414442378 26.840402866513614L24.621736013657028 23.47296355333856L25 20L24.621736013657028 16.52703644666144L23.498437414442378 13.159597133486386L21.664235061876752 10L19.174860266291944 7.14424780626905L16.105951421166537 4.679111137620566L12.550755768816998 2.679491924311151L8.617296130125396 1.2061475842820073L4.42508868578534 0.3038449397554359L0.10151153763490584 0L0 0.0071338537463816465L0 39.99286614625362Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,252,252,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","shape");
       
       // Line
       shape = this.canvas.paper.path('M2.9285999999992782 15.418200000002798L18.521099999999933,15.210300000003372L18.313199999999597,15.210300000003372');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M2.9389999999948486 20.002400000002126L18.531499999995503,19.7945000000027L18.323599999995167,19.7945000000027');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M2.9493999999931475 24.79450000000179L18.541899999993802,24.586600000002363L18.333999999993466,24.586600000002363');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
digital_gate_DIN40700_XNOR = digital_gate_DIN40700_XNOR.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(!( (i1.getBooleanValue() && !i2.getBooleanValue() ) || ( !i1.getBooleanValue() && i2.getBooleanValue() )));
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
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_DIN40700_XOR = CircuitFigure.extend({

   NAME: "digital_gate_DIN40700_XOR",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:25,height:40},attr), setter, getter);
     var port;
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.16960000000108, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
     // input0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4128000000018801, y: 21.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input0");
     port.setMaxFanOut(20);
     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4128000000018801, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 25;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L25,0 L25,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // shape
       shape = this.canvas.paper.path('M0 39.99286614625362L0.10151153763490584 40L4.42508868578534 39.696155060244564L8.617296130125396 38.79385241571799L12.550755768816998 37.32050807568885L16.105951421166537 35.320888862379434L19.174860266291944 32.85575219373095L21.664235061876752 30L23.498437414442378 26.840402866513614L24.621736013657028 23.47296355333856L25 20L24.621736013657028 16.52703644666144L23.498437414442378 13.159597133486386L21.664235061876752 10L19.174860266291944 7.14424780626905L16.105951421166537 4.679111137620566L12.550755768816998 2.679491924311151L8.617296130125396 1.2061475842820073L4.42508868578534 0.3038449397554359L0.10151153763490584 0L0 0.0071338537463816465L0 39.99286614625362Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,252,252,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","shape");
       
       // Line
       shape = this.canvas.paper.path('M2.9285999999992782 15.418200000002798L18.521099999999933,15.210300000003372L18.313199999999597,15.210300000003372');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M2.9389999999948486 20.002400000002126L18.531499999995503,19.7945000000027L18.323599999995167,19.7945000000027');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M2.9493999999931475 24.79450000000179L18.541899999993802,24.586600000002363L18.333999999993466,24.586600000002363');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M9.789300000000367 10.220699999999852L9.58140000000003,28.100099999999657');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
digital_gate_DIN40700_XOR = digital_gate_DIN40700_XOR.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
       o1.setValue( (i1.getBooleanValue() && !i2.getBooleanValue() ) || ( !i1.getBooleanValue() && i2.getBooleanValue() ));
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
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_IEC60617_12_AND = CircuitFigure.extend({

   NAME: "digital_gate_IEC60617_12_AND",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:30,height:40},attr), setter, getter);
     var port;
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.6666666666666667, y: 77.5 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input02");
     port.setMaxFanOut(20);
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.6666666666666667, y: 22.5 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input01");
     port.setMaxFanOut(20);
     // out
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 104.42708333333334, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 30;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L30,0 L30,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L27,0Q30,0 30, 3L30,37Q30,40 27, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'&');
       shape.attr({"x":9.5,"y":19,"text-anchor":"start","text":"&","font-family":"\"Arial\"","font-size":20,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_gate_IEC60617_12_AND = digital_gate_IEC60617_12_AND.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function(context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(i1.getBooleanValue() && i2.getBooleanValue());
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_IEC60617_12_NAND = CircuitFigure.extend({

   NAME: "digital_gate_IEC60617_12_NAND",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:35,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 20 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input02");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 48.75 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 35;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L35,0 L35,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L27,0Q30,0 30, 3L30,37Q30,40 27, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'&');
       shape.attr({"x":9,"y":20,"text-anchor":"start","text":"&","font-family":"\"Arial\"","font-size":20,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4,"ry":4,"cx":31,"cy":19.5,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       

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
digital_gate_IEC60617_12_NAND = digital_gate_IEC60617_12_NAND.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function()
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(!(i1.getBooleanValue() && i2.getBooleanValue()));
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_IEC60617_12_NOR = CircuitFigure.extend({

   NAME: "digital_gate_IEC60617_12_NOR",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:37,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3513513513513513, y: 20 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.7027027027027026, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input02");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.64864864864865, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 37;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L37,0 L37,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L27,0Q30,0 30, 3L30,37Q30,40 27, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'>1');
       shape.attr({"x":4,"y":20,"text-anchor":"start","text":">1","font-family":"\"Arial\"","font-size":20,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4,"ry":4,"cx":33,"cy":20,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M5.158499999999549 26.21140000000014L9.793649999999616,26.09254999999939L14.428799999999683,25.973699999999553');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
digital_gate_IEC60617_12_NOR = digital_gate_IEC60617_12_NOR.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function()
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(!(i1.getBooleanValue() || i2.getBooleanValue()));
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_IEC60617_12_NOT = CircuitFigure.extend({

   NAME: "digital_gate_IEC60617_12_NOT",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:36,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 51.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input01");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 47.5 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 36;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L36,0 L36,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L27,0Q30,0 30, 3L30,37Q30,40 27, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":9.9453125,"y":19.8107200000004,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":20,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4,"ry":4,"cx":32,"cy":19,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(252,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       

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
digital_gate_IEC60617_12_NOT = digital_gate_IEC60617_12_NOT.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function()
    {
        var i1 = this.getInputPort(0);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(!i1.getBooleanValue());
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_IEC60617_12_OR = CircuitFigure.extend({

   NAME: "digital_gate_IEC60617_12_OR",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:30.8125,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.2454361054766734, y: 22.5 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.2454361054766734, y: 78.75 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input02");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.6815415821501, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 30.8125;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L30.8125,0 L30.8125,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L27,0Q30,0 30, 3L30,37Q30,40 27, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'>1');
       shape.attr({"x":4,"y":18.5,"text-anchor":"start","text":">1","font-family":"\"Arial\"","font-size":20,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M14.99265000000014 25.16859999999997L10.291849999999613,25.31550000000061L5.591049999999996,25.462400000000343');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
digital_gate_IEC60617_12_OR = digital_gate_IEC60617_12_OR.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function(context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(i1.getBooleanValue() || i2.getBooleanValue());
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_IEC60617_12_XNOR = CircuitFigure.extend({

   NAME: "digital_gate_IEC60617_12_XNOR",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40.5,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.2345679012345678, y: 22.5 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.2345679012345678, y: 78.75 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input02");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.33740740740832, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40.5;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40.5,0 L40.5,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.5,3Q0.5,0 3.5, 0L27.5,0Q30.5,0 30.5, 3L30.5,37Q30.5,40 27.5, 40L3.5,40Q0.5,40 0.5, 37L0.5,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'=1');
       shape.attr({"x":4,"y":20,"text-anchor":"start","text":"=1","font-family":"\"Arial\"","font-size":20,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":35.5,"cy":20,"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       

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
digital_gate_IEC60617_12_XNOR = digital_gate_IEC60617_12_XNOR.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function(context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(!( (i1.getBooleanValue() && !i2.getBooleanValue() ) || ( !i1.getBooleanValue() && i2.getBooleanValue() )));
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_gate_IEC60617_12_XOR = CircuitFigure.extend({

   NAME: "digital_gate_IEC60617_12_XOR",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:30.8125,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.6227180527383367, y: 22.5 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.6227180527383367, y: 78.75 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input02");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.42929006085313, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 30.8125;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L30.8125,0 L30.8125,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.5,3Q0.5,0 3.5, 0L27.5,0Q30.5,0 30.5, 3L30.5,37Q30.5,40 27.5, 40L3.5,40Q0.5,40 0.5, 37L0.5,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'=1');
       shape.attr({"x":4,"y":20,"text-anchor":"start","text":"=1","font-family":"\"Arial\"","font-size":20,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_gate_IEC60617_12_XOR = digital_gate_IEC60617_12_XOR.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function(context)
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue( (i1.getBooleanValue() && !i2.getBooleanValue() ) || ( !i1.getBooleanValue() && i2.getBooleanValue() ));
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_pulse_10hz = CircuitFigure.extend({

   NAME: "digital_pulse_10hz",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:31.6640625,height:48.60950000000048},attr), setter, getter);
     var port;
     // outputPort
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.15815445349125, y: 69.87543587158933 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("outputPort");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 31.6640625;
      this.originalHeight= 48.60950000000048;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L31.6640625,0 L31.6640625,48.60950000000048 L0,48.60950000000048");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.6640625 18.60950000000048L31.6640625 18.60950000000048L31.6640625 48.60950000000048L1.6640625 48.60950000000048Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'10Hz');
       shape.attr({"x":4,"y":10.578125,"text-anchor":"start","text":"10Hz","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M3.393662499999664 41.239300000000185L10.575662499999453,41.239300000000185L10.575662499999453,30.979299999999967L22.066862499999843,30.979299999999967L22.066862499999843,40.82889999999952L28.633262499999546,40.82889999999952');
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
digital_pulse_10hz = digital_pulse_10hz.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.currentTimer=0;
        this.value = 0.0
    },
    
    calculate:function()
    {
       // 2  ticks => 50Hz   
       // 10 ticks => 10Hz 
       this.currentTimer = (this.currentTimer+1)%10; 
       if(this.currentTimer===0){
           this.value = 5.0-this.value;
           this.getOutputPort(0).setValue(this.value);
       }
    },
    
    onStart:function()
    {
         this.currentTimer=0;
    },
    
    onStop:function()
    {
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_pulse_1hz = CircuitFigure.extend({

   NAME: "digital_pulse_1hz",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:31.6640625,height:48.60950000000048},attr), setter, getter);
     var port;
     // outputPort
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.15815445349125, y: 69.87543587158933 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("outputPort");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 31.6640625;
      this.originalHeight= 48.60950000000048;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L31.6640625,0 L31.6640625,48.60950000000048 L0,48.60950000000048");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.6640625 18.60950000000048L31.6640625 18.60950000000048L31.6640625 48.60950000000048L1.6640625 48.60950000000048Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1Hz');
       shape.attr({"x":4,"y":10.578125,"text-anchor":"start","text":"1Hz","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M3.393662499999664 41.239300000000185L10.575662499999453,41.239300000000185L10.575662499999453,30.979299999999967L22.066862499999843,30.979299999999967L22.066862499999843,40.82889999999952L28.633262499999546,40.82889999999952');
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
digital_pulse_1hz = digital_pulse_1hz.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.currentTimer=0;
    },
    
    calculate:function(context)
    {
       // 2   ticks => 50Hz   
       // 10  ticks => 10Hz 
       // 100 ticks => 1Hz
       this.currentTimer = (this.currentTimer+1)%100; 
       if(this.currentTimer===0){
           this.value = !this.value;
           this.getOutputPort(0).setValue(this.value);
       }
    },
    
    onStart:function(context)
    {
         this.currentTimer=0;
    },
    
    onStop:function(context)
    {
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_pulse_50hz = CircuitFigure.extend({

   NAME: "digital_pulse_50hz",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:31.6640625,height:48.60950000000048},attr), setter, getter);
     var port;
     // circle
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.15815445349125, y: 69.87543587158933 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("circle");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 31.6640625;
      this.originalHeight= 48.60950000000048;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L31.6640625,0 L31.6640625,48.60950000000048 L0,48.60950000000048");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M1.6640625 18.60950000000048L31.6640625 18.60950000000048L31.6640625 48.60950000000048L1.6640625 48.60950000000048Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'50Hz');
       shape.attr({"x":4,"y":10.578125,"text-anchor":"start","text":"50Hz","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M3.393662499999664 41.239300000000185L10.575662499999453,41.239300000000185L10.575662499999453,30.979299999999967L22.066862499999843,30.979299999999967L22.066862499999843,40.82889999999952L28.633262499999546,40.82889999999952');
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
digital_pulse_50hz = digital_pulse_50hz.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.currentTimer=0;
    },
    
    calculate:function()
    {
      // 2 ticks => 50Hz    
       this.currentTimer = (this.currentTimer+1)%2; 
       if(this.currentTimer===0){
           this.value = !this.value;
           this.getOutputPort(0).setValue(this.value);
       }
    },
    
    onStart:function()
    {
         this.currentTimer=0;
    },
    
    onStop:function()
    {
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_pulse_Delay = CircuitFigure.extend({

   NAME: "digital_pulse_Delay",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:84,height:69},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.59523809523809, y: 52.11524637681209 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.1904761904761905, y: 52.11524637681209 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 84;
      this.originalHeight= 69;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L84,0 L84,69 L0,69");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M84 69L0 69L0 0L84 0Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'delay');
       shape.attr({"x":40.265625,"y":34.7265625,"text-anchor":"start","text":"delay","font-family":"\"Arial\"","font-size":13,"stroke":"#000000","fill":"#D4D4D4","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M3.502237499998955 18.776879999997618L7.155837499998597,18.776879999997618L10.809437499999149,18.776879999997618L10.80943749999824,5.006239999996978L40.60790533999989,5.1582835199978945L40.7756774999998,17.992499999997563L74.82772149999892,17.533747999996194');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M2.7763174999963667 60.522479999995994L35.81032965999748,60.698116479995406L35.642557499997565,47.40719999999601L50.62567749999744,47.243359999995846L65.60879749999731,47.07951999999568L65.60879749999731,60.249280799996086L78.49271349999617,60.00024399999529');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M9.586228750001283 30.218550000001414L9.91390875000252,46.930230000002666');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M32.75262875000226 38.50094999999965L28.574708750000354,45.873749999997926');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M9.171028750002733 38.167670000003454L32.763988749999044,38.495350000001054');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M26.418204481202338 30.914574268800607L32.574708750000354,37.373749999997926');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M10.916348593882503 20.631087969915825L10.654204593882241,28.347951969915812');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(168,168,168,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.63980459388222 45.23755196991533L35.80781268348346,27.62475196991545');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(201,201,201,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
digital_pulse_Delay = digital_pulse_Delay.extend({

    init: function(attr, setter, getter){
     
        this._super(attr, setter, getter);

        this.on("change:userData.delay",(emitter, event)=>{
            var value = event.value;
            this.delayedValues = []; 
            this.delayedValues.length = parseInt(parseInt(value)/10);
            this.pointer=0;
            
        });
        this.attr({
            resizeable:false,
            "userData.delay":1500
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    /**
     * called every '10 [ms]' from the application. do a little bit calculation
     * to change the state every 100ms (10Hz)
     * 
     **/
    calculate:function(context)
    {
       this.getOutputPort(0).setValue(this.delayedValues[this.pointer]);
       this.delayedValues[this.pointer] = this.getInputPort(0).getBooleanValue();
       this.pointer = (this.pointer+1)%this.delayedValues.length; 
    },
    
    onStart:function(context)
    {
        this.currentTimer=0;
    },
    
    onStop:function(context)
    {
    },

    getParameterSettings: function()
    {
        return [
        {
            name:"delay",
            label:"Delay [ms]",
            property:{
                type: "integer",
                min: 10,
                max: 100,
                increment:10
        }
        
        }];
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_signal_High = CircuitFigure.extend({

   NAME: "digital_signal_High",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:22},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.69275000000107, y: 45.45454545454546 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 22;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,22 L0,22");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // outline
       shape = this.canvas.paper.path('M0 0L31.33889397811072 0L40 10L31.33889397811072 20L0 20Z');
       shape.attr({"stroke":"rgba(194,27,122,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","outline");
       
       // label
       shape = this.canvas.paper.text(0,0,'High');
       shape.attr({"x":4,"y":11,"text-anchor":"start","text":"High","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#C21B7A","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       

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
digital_signal_High = digital_signal_High.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
        this.getOutputPort(0).setValue(true)
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_signal_Low = CircuitFigure.extend({

   NAME: "digital_signal_Low",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:22},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.69275000000107, y: 45.45454545454546 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 22;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,22 L0,22");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // outline
       shape = this.canvas.paper.path('M0 0L31.33889397811072 0L40 10L31.33889397811072 20L0 20Z');
       shape.attr({"stroke":"rgba(0,120,242,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","outline");
       
       // label
       shape = this.canvas.paper.text(0,0,'LOW');
       shape.attr({"x":4,"y":11,"text-anchor":"start","text":"LOW","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       

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
digital_signal_Low = digital_signal_Low.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
        this.getOutputPort(0).setValue(false)
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_timer_Delay = CircuitFigure.extend({

   NAME: "digital_timer_Delay",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:84,height:69},attr), setter, getter);
     var port;
     // output_0
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.59523809523809, y: 52.11524637681209 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_0");
     port.setMaxFanOut(20);
     // input_0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -5.357142857142857, y: 52.11524637681209 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_0");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 84;
      this.originalHeight= 69;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L84,0 L84,69 L0,69");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M84,67Q84,69 82, 69L2,69Q0,69 0, 67L0,2Q0,0 2, 0L82,0Q84,0 84, 2L84,67');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Delay');
       shape.attr({"x":39,"y":37.1796875,"text-anchor":"start","text":"Delay","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#D9D9D9","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M9.916348593882503 20.631087969915825L9.981884593883478,48.33643196991761');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(168,168,168,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.98444459388338 57.68939196991232L35.41100459388326,27.297071969915123');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(201,201,201,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // pulseline_top
       shape = this.canvas.paper.path('M4.002237499998955 19.776879999997618L9.309437499999149,19.776879999997618Q11.309437499999149,19.776879999997618 11.309437499999017, 17.776879999997618L11.30943749999837,8.006239999996978Q11.30943749999824,6.006239999996978 13.30931793710452, 6.0281086368907495L39.27579706289352,6.312051363103535Q41.2756774999998,6.333919999997306 41.2756774999998, 8.333919999997306L41.2756774999998,16.992499999997563Q41.2756774999998,18.992499999997563 43.275583463722825, 19.011894232776932L75.06557749999865,19.32017999999698');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","pulseline_top");
       
       // pulseline_bottom
       shape = this.canvas.paper.path('M3.1039974999966944 59.194799999995666L33.642557499997565,59.194799999995666Q35.642557499997565,59.194799999995666 35.642557499997565, 57.194799999995666L35.642557499997565,48.40719999999601Q35.642557499997565,46.40719999999601 37.64243793710385, 46.38533136310224L63.608917062891024,46.10138863688945Q65.60879749999731,46.07951999999568 65.60879749999731, 48.07951999999568L65.60879749999731,56.73809999999594Q65.60879749999731,58.73809999999594 67.60879749999731, 58.738099999995804L78.75485749999643,58.73809999999503');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","pulseline_bottom");
       
       // Line
       shape = this.canvas.paper.path('M11.086228750001283 33.84501399999499L11.41390875000252,42.430230000002666');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M33.25262875000226 38.00094999999965L30.385428749999846,42.22802200000024');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M29.60130075000143 34.49864599999819L33.074708750000354,37.873749999997926');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M11.171028750002733 38.167670000003454L33.12558875000104,38.495350000001054');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,105,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
digital_timer_Delay = digital_timer_Delay.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.on("change:userData.delay",(emitter, event)=>{
            var value = event.value;
            this.delayedValues = []; 
            this.delayedValues.length = parseInt(parseInt(value)/10);
            this.pointer=0;
            
        });
        this.attr({
            resizeable:false,
            "userData.delay":500
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    /**
     * called every '10 [ms]' from the application.
     * 
     **/
    calculate:function(context)
    {
       this.getOutputPort(0).setValue(this.delayedValues[this.pointer]);
       this.delayedValues[this.pointer] = this.getInputPort(0).getBooleanValue();
       this.pointer = (this.pointer+1)%this.delayedValues.length; 
    },
    
    onStart:function(context)
    {
        this.currentTimer=0;
    },
    
    onStop:function(context)
    {
    },

    getParameterSettings:function()
    {
        return [
        {
            name:"delay",
            label:"Delay [ms]",
            property:{
                type: "integer",
                min: 10,
                max: 15000,
                increment:10
        }
        
        }];
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var math_Mean = CircuitFigure.extend({

   NAME: "math_Mean",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:40.390625},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.5, y: 52.44197292069633 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105, y: 51.992263056092845 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 40.390625;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,40.390625 L0,40.390625");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L38,0Q40,0 40, 2L40,38Q40,40 38, 40L2,40Q0,40 0, 38L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'X');
       shape.attr({"x":12,"y":23.390625,"text-anchor":"start","text":"X","font-family":"\"Arial\"","font-size":23,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M28.405000000001564 9.709000000001652L20.725000000002183,9.709000000001652L13.045000000001892,9.709000000001652L12.02100000000155,9.709000000001652');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
math_Mean = math_Mean.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.total   = 0;    // the running total
        this.average = 0;    // the average
        this.readings = []; 
        this.readIndex = 0;
        this.numReadings =0;
        
        this.on("change:userData.numReadings",(emitter, event)=>{
            this.numReadings = parseInt(event.value);
            this.readings = []; 
            this.total =0;
            this.average = 0;
            this.readings.length = this.numReadings;
            this.pointer=0;
            this.readIndex = 0;
            this.readings.fill(0)
        });
        
        this.attr({
            resizeable:false,
            "userData.numReadings":10
        });

        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        this.total = this.total - this.readings[this.readIndex];
        this.readings[this.readIndex] = this.getInputPort(0).getValue() || 0;
        this.total = this.total + this.readings[this.readIndex];
        this.readIndex = (this.readIndex+1)%this.readings.length;
        this.average = parseInt((this.total / this.readings.length)*1000)/1000;
        this.getOutputPort(0).setValue(this.average);
    },

    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },
    
    getParameterSettings:function()
    {
        return [
        {
            name:"numReadings",
            label:"Number of Readings for the average",
            property:{
                type: "integer",
                min: 10,
                max: 150,
                increment:1
        }
        }];
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var signal_SignalInverter = CircuitFigure.extend({

   NAME: "signal_SignalInverter",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:40},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -3.75, y: 49.77049046325682 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.80516287231444, y: 49.77049046325682 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L38,0Q40,0 40, 2L40,38Q40,40 38, 40L2,40Q0,40 0, 38L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'5-X');
       shape.attr({"x":6.8828125,"y":18.004896185302727,"text-anchor":"start","text":"5-X","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
signal_SignalInverter = signal_SignalInverter.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        let inValue = this.getInputPort("input_port1").getValue();
        this.getOutputPort("output_port1").setValue(5-inValue);
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var signal_SignalSource = CircuitFigure.extend({

   NAME: "signal_SignalSource",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:65.72720000000481,height:21.525390625},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.47855986562651, y: 47.58938027402321 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 65.72720000000481;
      this.originalHeight= 21.525390625;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L65.72720000000481,0 L65.72720000000481,21.525390625 L0,21.525390625");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // outline
       shape = this.canvas.paper.path('M0 0L53.81817921990478 0L65.72720000000481 10L53.81817921990478 20L0.24380000000201107 20.243800000000192Z');
       shape.attr({"stroke":"rgba(0,120,242,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","outline");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":4.773050000005242,"y":10.7626953125,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       

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
signal_SignalSource = signal_SignalSource.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        // calculate the outer frame/shape in the correct size in relation to the length of the text
        //
        var adjustWidth = ()=>{
            var width = this.layerGet("label").getBBox().width+15

            this.setWidth(width+5);
            this.layerAttr("BoundingBox", { path: `M0 0 L${width} 0 L${width} 20 L0 20 Z`})
            this.layerAttr("outline",     { path: `M0 0 L${width-13} 0 L${width} 10 L${width-13} 20 L0 20 Z`})
        }
        this.on("change:userData.signalId",(emitter, event)=>{
            this.layerAttr("label", {text: event.value})
            adjustWidth()
        });
        this.on("added", ()=>{
            var signalId = this.attr("userData.signalId")
            if(!signalId){
                signalId = "Signal_Id"
                this.attr("userData.signalId", signalId)
            }            
            this.layerAttr("label", {text: signalId})
            adjustWidth()
        })
        
        // override the "getValue" method of the port and delegate them to the related party (SourceTarget port)
        this.originalGetValue = this.getOutputPort(0).getValue
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
        var signalId = this.attr("userData.signalId")
        if(context.signalPorts && context.signalPorts[signalId]){
            this.getOutputPort(0).getValue = function(){ 
                if(context.signalPorts[signalId] instanceof draw2d.Port){
                    return context.signalPorts[signalId].getValue()
                }
                else {
                    return false
                }
            }
        }
    },


    getParameterSettings: function()
    {
        return [
        {
            name:"signalId",
            label:"Signal Id",
            property:{
                type: "string"
            }
        }];
    },
    
  /**
   * @private
   */
  applyTransformation: function () {
    let s =
      // override the base implementation and do not scale the internal SVG elements....this let the arrow looks a like streche...we
      // calculate the path in the event handler. A lot more code....but the result is much cleaner
      //"S" + this.scaleX + "," + this.scaleY + ",0,0 " +
      "R" + this.rotationAngle + "," + ((this.getWidth() / 2) | 0) + "," + ((this.getHeight() / 2) | 0) +
      "T" + this.getAbsoluteX() + "," + this.getAbsoluteY() +
      ""
    this.svgNodes.transform(s)
    if (this.rotationAngle === 90 || this.rotationAngle === 270) {
      let before = this.svgNodes.getBBox(true)
      let ratio = before.height / before.width
      let reverseRatio = before.width / before.height
      let rs = "...S" + ratio + "," + reverseRatio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2)
      this.svgNodes.transform(rs)
    }

    return this
  }


});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var signal_SignalSwitch = CircuitFigure.extend({

   NAME: "signal_SignalSwitch",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:84},attr), setter, getter);
     var port;
     // input_port3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.4395000000004075, y: 81.34154761904765 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port3");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.4395000000004075, y: 46.42857142857143 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.4395000000004075, y: 12.467376411074751 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.18416287231412, y: 30.457738095238017 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 84;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,84 L0,84");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L38,0Q40,0 40, 2L40,78Q40,80 38, 80L2,80Q0,80 0, 78L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Selector');
       shape.attr({"x":5,"y":73.3125,"text-anchor":"start","text":"Selector","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Signal');
       shape.attr({"x":6.5,"y":62.6875,"text-anchor":"start","text":"Signal","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // high
       shape = this.canvas.paper.path('M35.0014546875027 23.937916406248405L5.0260546874969805,12.308116406252338');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       
       // low
       shape = this.canvas.paper.path('M34.92365468750086 26.972316406244317L5.275854687495666,38.43831640625194');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       

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
signal_SignalSwitch = signal_SignalSwitch.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        let inValue1 = this.getInputPort("input_port1").getValue();
        let inValue2 = this.getInputPort("input_port2").getValue();
        let inValue3 = this.getInputPort("input_port3").getBooleanValue();
        if(inValue3 === true){
            this.getOutputPort("output_port1").setValue(inValue1);
        }
        else{
            this.getOutputPort("output_port1").setValue(inValue2);
        }
        
        if(this.getInputPort("input_port3").hasChangedValue()){
            this.layerShow("low" , !inValue3, 100);
            this.layerShow("high",  inValue3, 100);
        }
    },
    
    onStart:function(context){
        let inValue3 = this.getInputPort("input_port3").getBooleanValue();
        this.layerShow("low" , !inValue3, 100);
        this.layerShow("high",  inValue3, 100);
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var signal_SignalTarget = CircuitFigure.extend({

   NAME: "signal_SignalTarget",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:69.55780000000595,height:22},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.8643487861801238, y: 48.86363636363637 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 69.55780000000595;
      this.originalHeight= 22;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L69.55780000000595,0 L69.55780000000595,22 L0,22");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // outline
       shape = this.canvas.paper.path('M0 9.932800000005955L13.10158237711039 0.75L69 0.75L69 20.75L11.482077748871234 20.75Z');
       shape.attr({"stroke":"rgba(0,120,242,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","outline");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":13.182800000005955,"y":11,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       

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
signal_SignalTarget = signal_SignalTarget.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        // handle the size of the shape if the label has changed
        //
        var adjustWidth = ()=>{
            var width = this.layerGet("label").getBBox().width+15
            this.setWidth(width+5);
            this.layerAttr("BoundingBox", { path: `M0 0 L${width} 0 L${width} 20 L0 20 Z`})
            this.layerAttr("outline",     { path: `M0 10 L13 0 L${width} 0 L${width} 20 L13 20 Z`})
        }
        
        this.on("change:userData.signalId",(emitter, event)=>{
            this.layerAttr("label", {text: event.value})
            adjustWidth()
        });
        
        this.on("added", ()=>{
            var signalId = this.attr("userData.signalId")
            if(!signalId){
                signalId = "Signal_Id"
                this.attr("userData.signalId", signalId)
            }            
            this.layerAttr("label", {text: signalId})
            adjustWidth()
        })
        
        // get the connected port and forward the port to the related party ( SignalSource shape)
        //
        this.getInputPort(0).on("connect", (emitter, event)=>{
           this.signalPort = event.connection.getSource()
        })
        this.getInputPort(0).on("disconnect", (emitter, event)=>{
            delete this.signalPort
        })
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
        var signalId = this.attr("userData.signalId")
        // first check if any object already create the signal context
        if(!context.signalPorts){
            context.signalPorts = { };
        }
        
        // check if my signal port is set 
        if(this.signalPort){
            if(!(signalId in context.signalPorts)){
                context.signalPorts[signalId] = this.signalPort;
            }
        }
        else{
            delete context.signalPorts[signalId]
        }
    },

    getParameterSettings: function()
    {
        return [
        {
            name:"signalId",
            label:"Signal Id",
            property:{
                type: "string"
            }
        }];
    },
    
  /**
   * @private
   */
  applyTransformation: function () {
    let s =
      // override the base implementation and do not scale the internal SVG elements....this let the arrow looks a like streche...we
      // calculate the path in the event handler. A lot more code....but the result is much cleaner
      //"S" + this.scaleX + "," + this.scaleY + ",0,0 " +
      "R" + this.rotationAngle + "," + ((this.getWidth() / 2) | 0) + "," + ((this.getHeight() / 2) | 0) +
      "T" + this.getAbsoluteX() + "," + this.getAbsoluteY() +
      ""
    this.svgNodes.transform(s)
    if (this.rotationAngle === 90 || this.rotationAngle === 270) {
      let before = this.svgNodes.getBBox(true)
      let ratio = before.height / before.width
      let reverseRatio = before.width / before.height
      let rs = "...S" + ratio + "," + reverseRatio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2)
      this.svgNodes.transform(rs)
    }

    return this
  }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_assemble_Stencil = CircuitFigure.extend({

   NAME: "video_assemble_Stencil",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.24028371822806},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.480719999996154, y: 12.652793160957096 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 50.65206795799892 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.480719999996154, y: 58.06805702570291 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.24028371822806;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.24028371822806 L0,81.24028371822806");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,4.240283718228056Q0,1.2402837182280564 3, 1.2402837182280564L77,1.2402837182280564Q80,1.2402837182280564 80, 4.240283718228056L80,78.24028371822806Q80,81.24028371822806 77, 81.24028371822806L3,81.24028371822806Q0,81.24028371822806 0, 78.24028371822806L0,4.240283718228056');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Stencil Apply');
       shape.attr({"x":4.5,"y":68.28452314223341,"text-anchor":"start","text":"Stencil Apply","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":49.50000000000025,"cy":17.663696518230857,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M38.46256747221745,48.01705269317795Q37.81898911823282,51.96493907734384 41.81880873597436, 52.00292625320533L55.90091030048609,52.13666710148202Q59.900729918227626,52.17465427734351 59.01211395841982, 48.27460790890443L57.22418747803842,40.42757781689973Q56.33557151823061,36.52753144846065 56.27480253027943, 35.9577403454532L56.27480253027943,35.9577403454532Q56.21403354232825,35.38794924244576 56.03357301342339, 34.83547095377526L56.03357301342339,34.83547095377526Q55.85311248451853,34.28299266510476 55.558443616512704, 33.764613964003274L55.558443616512704,33.764613964003274Q55.263774748506876,33.24623526290179 54.86385090584463, 32.77770682389382L54.86385090584463,32.77770682389382Q54.46392706318238,32.309178384885854 53.97089972945241, 31.904736207498445L53.97089972945241,31.904736207498445Q53.47787239572244,31.500294030111036 52.906721956976526, 31.17222688525044L52.906721956976526,31.17222688525044Q52.33557151823061,30.84415974038984 51.70365209153351, 30.602435782241628L51.70365209153351,30.602435782241628Q51.07173266483642,30.360711824093414 50.39824480220159, 30.212675712810324L50.39824480220159,30.212675712810324Q49.72475693956676,30.064639601527233 49.03016422889914, 30.014789339435538L49.03016422889914,30.014789339435538Q48.33557151823152,29.964939077343843 47.64097880756344, 30.014789339435538L47.64097880756344,30.014789339435538Q46.94638609689537,30.064639601527233 46.27289823426054, 30.212675712810324L46.27289823426054,30.212675712810324Q45.59941037162571,30.360711824093414 44.96749094492861, 30.602435782241628L44.96749094492861,30.602435782241628Q44.33557151823152,30.84415974038984 43.7644210794856, 31.17222688525044L43.7644210794856,31.17222688525044Q43.193270640739684,31.500294030111036 42.700243307009714, 31.904736207498445L42.700243307009714,31.904736207498445Q42.207215973279745,32.309178384885854 41.8072921306175, 32.77770682389382L41.8072921306175,32.77770682389382Q41.40736828795525,33.24623526290179 41.11269941994942, 33.764613964003274L41.11269941994942,33.764613964003274Q40.81803055194359,34.28299266510476 40.637570023038734, 34.83547095377526L40.637570023038734,34.83547095377526Q40.457109494133874,35.38794924244576 40.396340506182696, 35.9577403454532L40.396340506182696,35.9577403454532Q40.33557151823152,36.52753144846065 39.69199316424689, 40.47541783262654L38.46256747221745,48.01705269317795');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M19.45664121093796 3.3588137291653766L49.211041210937765 3.3588137291653766L49.211041210937765 58.003913729166015L19.45664121093796 58.003913729166015Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Image');
       shape.attr({"x":6,"y":10.6015625,"text-anchor":"start","text":"Image","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Stencil');
       shape.attr({"x":7,"y":47.25144621822801,"text-anchor":"start","text":"Stencil","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M48.69640448001155 5.2791650622421L48.864176640010555,56.28452314223341');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(26,12,112,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_assemble_Stencil = video_assemble_Stencil.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getInputPort("input_port2").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img     = this.getInputPort("input_port1").getValue();
        var stencil = this.getInputPort("input_port2").getValue();
        if((img instanceof HTMLImageElement) &&  (stencil instanceof HTMLImageElement) && this.worker!==null){
            var imageData   = this.imageToData(img);
            var stencilData = this.imageToData(stencil);
            
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage({imageData, stencilData}, [imageData.data.buffer, stencilData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var stencilData = event.data.stencilData;

            var pixels = imageData.data;
            var mask   = stencilData.data;
            for (index=0; index < pixels.length; index+=4) {
              
                if(mask[index]!==0){
                    pixels[index]   = 255;
                    pixels[index+1] = 255;
                    pixels[index+2] = 255;
                    pixels[index+3] = 255;
                }
            }

            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_BlackWhite = CircuitFigure.extend({

   NAME: "video_color_BlackWhite",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:84.12910056640976},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 48.126034543826854 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 77.8389528672162 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.86500000000024, y: 48.14029833592497 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 84.12910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,84.12910056640976 L0,84.12910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.3799680000011Q4.5,4.379968000001099 8.5, 4.379968000001099L71.5,4.379968000001099Q75.5,4.379968000001099 75.5, 8.3799680000011L75.5,48.3799680000011Q75.5,52.3799680000011 71.5, 52.3799680000011L8.5,52.3799680000011Q4.5,52.3799680000011 4.5, 48.3799680000011L4.5,8.3799680000011');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'BlackWhite');
       shape.attr({"x":5.407552000004216,"y":72.12910056640976,"text-anchor":"start","text":"BlackWhite","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'threshold');
       shape.attr({"x":12,"y":57.59737500000119,"text-anchor":"start","text":"threshold","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.8799680000011L49.136293579453195 49.8799680000011L47.66478056057895 35.49000926909139L47.26481464287099 34.55069784112129L46.61172166499273 33.6693617814999L45.72534552659636 32.87278004043219L44.63261831811906 32.18515635102449L43.366742002848696 31.627383811124673L41.96617959205287 31.216410057117173L40.47348646586943 30.96472231855296L38.9340173495948 30.8799680000011L37.394548233321984 30.96472231855296L35.90185510713491 31.216410057117173L34.50129269633908 31.627383811124673L33.23541638106508 32.18515635102449L32.142689172593236 32.87278004043219L31.256313034195045 33.6693617814999L30.603220056320424 34.55069784112129L30.203254138608827 35.49000926909139Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.13421670400021,48.3799680000011Q39.13421670400021,52.3799680000011 43.13421670400021, 52.3799680000011L71.13421670400021,52.3799680000011Q75.13421670400021,52.3799680000011 75.13421670400021, 48.3799680000011L75.13421670400021,8.3799680000011Q75.13421670400021,4.379968000001099 71.13421670400021, 4.379968000001099L43.13421670400021,4.379968000001099Q39.13421670400021,4.379968000001099 39.13421670400021, 8.3799680000011L39.13421670400021,48.3799680000011');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.84867200000008 49.8799680000011L49.651728947199445 49.8799680000011L48.46050412239856 35.49000926909139L48.13672218901411 34.55069784112129L47.60802787358989 33.6693617814999L46.890485285362956 32.87278004043219L46.00589659279103 32.18515635102449L44.98113957566238 31.627383811124673L43.84735095739961 31.216410057117173L42.6389803314396 30.96472231855296L41.392743427790265 30.8799680000011L40.84867200000008 30.916969314093876L40.84867200000008 49.8799680000011Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M39.92918400000053 25.470542254553948L40.260442059450725 25.499523579457673L41.64962748078506 25.377985603554407L42.996603206054715 25.01706454574378L44.260442059450725 24.42772680973212L45.40274293694165 23.627879124409446L46.3887976044025 22.641824456950417L47.18864528972517 21.499523579457673L47.77798302573683 20.235684726063482L48.13890408354746 18.888709000792005L48.260442059450725 17.499523579457673L48.13890408354746 16.11033815812334L47.77798302573683 14.763362432851864L47.18864528972517 13.499523579457673L46.3887976044025 12.357222701964929L45.40274293694165 11.3711680345059L44.260442059450725 10.571320349183225L42.996603206054715 9.981982613171567L41.64962748078506 9.621061555360939L40.260442059450725 9.499523579457673L39.92918400000053 9.528504904361398L39.92918400000053 25.470542254553948Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M9.377490534403478 57.12910056640976L5.757806182406057,57.53049545921385L0.4075520000042161,64.0115340000084');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.586528000003455 5.1831660000025295L39.84867200000008,51.83221508800125');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_color_BlackWhite = video_color_BlackWhite.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        var threshold = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData: imageData,threshold: threshold}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var threshold = event.data.threshold;
            // map offset from 0-5 => 0-255
            threshold = 255/5*threshold;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {

                let lum = 0.2126 * pixels[x] + 0.7152 * pixels[x+1] + 0.0722 * pixels[x+2];
                let value= lum>threshold?0:255;
                pixels[x] = pixels[x+1] = pixels[x+2] = value;
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_Grayscale = CircuitFigure.extend({

   NAME: "video_color_Grayscale",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80.125,height:80.63839999999982},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9429953198129615, y: 49.49205341375826 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.18804992199671, y: 49.49205341375826 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80.125;
      this.originalHeight= 80.63839999999982;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80.125,0 L80.125,80.63839999999982 L0,80.63839999999982");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.015625,3Q0.015625,0 3.015625, 0L77.015625,0Q80.015625,0 80.015625, 3L80.015625,77Q80.015625,80 77.015625, 80L3.015625,80Q0.015625,80 0.015625, 77L0.015625,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Grayscale');
       shape.attr({"x":4,"y":68.13839999999982,"text-anchor":"start","text":"Grayscale","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M5.244424999999865,10.63839999999982Q5.244424999999865,5.63839999999982 10.244424999999865, 5.63839999999982L69.24442499999986,5.63839999999982Q74.24442499999986,5.63839999999982 74.24442499999986, 10.63839999999982L74.24442499999986,51.63839999999982Q74.24442499999986,56.63839999999982 69.24442499999986, 56.63839999999982L10.244424999999865,56.63839999999982Q5.244424999999865,56.63839999999982 5.244424999999865, 51.63839999999982L5.244424999999865,10.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(214,247,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Body
       shape = this.canvas.paper.path('M28.889806062430115,49.23713714420617Q27.95386041812526,53.12609661312672 31.95386041812526, 53.12609661312672L49.95386041812526,53.12609661312672Q53.95386041812526,53.12609661312672 52.928477872059354, 49.25975588393285L50.91922757615705,41.68361146446987Q49.89384503009114,37.817270735276 49.684272505307035, 37.033719425669005L49.684272505307035,37.033719425669005Q49.47469998052293,36.250168116062014 49.1324949619634, 35.51497848336794L49.1324949619634,35.51497848336794Q48.79028994340388,34.77978885067387 48.32585015739369, 34.11529925985769L48.32585015739369,34.11529925985769Q47.8614103713835,33.45080966904152 47.288847585802614, 32.877210300071965L47.288847585802614,32.877210300071965Q46.71628480022173,32.30361093110241 46.052996045579675, 31.8383303105511L46.052996045579675,31.8383303105511Q45.38970729093762,31.37304968999979 44.65584626040345, 31.03022513407859L44.65584626040345,31.03022513407859Q43.92198522986928,30.687400578157394 43.139849919504286, 30.477448637519956L43.139849919504286,30.477448637519956Q42.35771460913929,30.267496696882517 41.55106980456958, 30.19679665500462L41.55106980456958,30.19679665500462Q40.744424999999865,30.12609661312672 39.93778019543015, 30.19679665500462L39.93778019543015,30.19679665500462Q39.131135390860436,30.267496696882517 38.34900008049544, 30.477448637519956L38.34900008049544,30.477448637519956Q37.56686477013045,30.687400578157394 36.83300373959628, 31.03022513407859L36.83300373959628,31.03022513407859Q36.09914270906211,31.37304968999979 35.435853954420054, 31.8383303105511L35.435853954420054,31.8383303105511Q34.772565199778,32.30361093110241 34.200002414197115, 32.877210300071965L34.200002414197115,32.877210300071965Q33.62743962861623,33.45080966904152 33.16299984260604, 34.11529925985769L33.16299984260604,34.11529925985769Q32.69856005659585,34.77978885067387 32.35635503803633, 35.51497848336794L32.35635503803633,35.51497848336794Q32.0141500194768,36.250168116062014 31.79227831889102, 37.17455415865879L31.79227831889102,37.17455415865879Q31.570406618305242,38.09894020125557 30.634460974000387, 41.98789967017612L28.889806062430115,49.23713714420617');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Body");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":9.290564581874843,"ry":9.290564581874843,"cx":39.744425000000106,"cy":19.835532031251443,"stroke":"none","stroke-width":0,"fill":"rgba(26,177,232,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.06486093750391,9.63839999999982Q40.06486093750391,5.63839999999982 44.06486093750391, 5.63839999999982L70.06486093750391,5.63839999999982Q74.06486093750391,5.63839999999982 74.06486093750391, 9.63839999999982L74.06486093750391,52.63839999999982Q74.06486093750391,56.63839999999982 70.06486093750391, 56.63839999999982L44.06486093750391,56.63839999999982Q40.06486093750391,56.63839999999982 40.06486093750391, 52.63839999999982L40.06486093750391,9.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M39.40606093750375,49.06802542650166Q39.40606093750375,53.06802542650166 43.40606093750375, 53.06802542650166L48.4268250000041,53.06802542650166Q52.4268250000041,53.06802542650166 51.39970837135936, 49.20214500528304L49.393926240614725,41.65274540233118Q48.366809611969984,37.78686498111256 48.15723708718588, 37.004729670747565L48.15723708718588,37.004729670747565Q47.94766456240177,36.22259436038257 47.605459543842244, 35.4887333298484L47.605459543842244,35.4887333298484Q47.26325452528272,34.75487229931423 46.79881473927253, 34.091583544672176L46.79881473927253,34.091583544672176Q46.33437495326234,33.42829479003012 45.761812167681455, 32.85573200444924L45.761812167681455,32.85573200444924Q45.18924938210057,32.28316921886835 44.52596062745852, 31.818729432858163L44.52596062745852,31.818729432858163Q43.86267187281646,31.354289646847974 43.12881084228229, 31.01208462828845L43.12881084228229,31.01208462828845Q42.39494981174812,30.669879609728923 41.61281450138313, 30.460307084944816L41.61281450138313,30.460307084944816Q40.830679191018135,30.25073456016071 40.118370064260944, 30.188415586643714L40.118370064260944,30.188415586643714Q39.40606093750375,30.12609661312672 39.40606093750375, 34.12609661312672L39.40606093750375,49.06802542650166');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(179,179,179,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Head
       shape = this.canvas.paper.path('M40.06486093750391 29.11315439741429L41.60418544539334 28.978480953486724L43.168456066123326 28.55933590391851L44.63617812719167 27.874925866799458L45.96275563647578 26.94604629477908L47.10788120763755 25.80092072361731L48.036760779657925 24.474343214333203L48.721170816776976 23.00662115326486L49.14031586634519 21.442350532534874L49.28146041812852 19.829060923395446L49.14031586634519 18.215771314256017L48.721170816776976 16.65150069352603L48.036760779657925 15.183778632457688L47.10788120763755 13.857201123173581L45.96275563647578 12.712075552011811L44.63617812719167 11.783195979991433L43.168456066123326 11.098785942872382L41.60418544539334 10.679640893304168L40.06486093750391 10.5449674493766L40.06486093750391 29.11315439741429Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(105,106,107,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Head");
       
       // Line
       shape = this.canvas.paper.path('M39.72936093750377 7.1828968750005515L40.01586093750393,30.57539687499957L40.56486093750391,55.28039687499859L40.56486093750391,54.841196874998786');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_color_Grayscale = video_color_Grayscale.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");

        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                // normal grayscale conversion
                let average = 0.3*pixels[x] + 0.59*pixels[x+1] + 0.11*pixels[x+2];

                pixels[x]     = average;
                pixels[x + 1] = average;
                pixels[x + 2] = average;
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;
        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }
        
        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_GrayscaleAvg = CircuitFigure.extend({

   NAME: "video_color_GrayscaleAvg",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:82.484375,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.29632885016085125, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.53463155900722, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 82.484375;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L82.484375,0 L82.484375,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.015625,3Q1.015625,0 4.015625, 0L78.015625,0Q81.015625,0 81.015625, 3L81.015625,77Q81.015625,80 78.015625, 80L4.015625,80Q1.015625,80 1.015625, 77L1.015625,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'GrayscaleAvg');
       shape.attr({"x":4,"y":67.63839999999982,"text-anchor":"start","text":"GrayscaleAvg","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M6.244424999999865,10.63839999999982Q6.244424999999865,5.63839999999982 11.244424999999865, 5.63839999999982L70.24442499999986,5.63839999999982Q75.24442499999986,5.63839999999982 75.24442499999986, 10.63839999999982L75.24442499999986,51.63839999999982Q75.24442499999986,56.63839999999982 70.24442499999986, 56.63839999999982L11.244424999999865,56.63839999999982Q6.244424999999865,56.63839999999982 6.244424999999865, 51.63839999999982L6.244424999999865,10.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(214,247,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Body
       shape = this.canvas.paper.path('M29.889806062430115,49.23713714420617Q28.95386041812526,53.12609661312672 32.95386041812526, 53.12609661312672L50.95386041812526,53.12609661312672Q54.95386041812526,53.12609661312672 53.928477872059354, 49.25975588393285L51.91922757615705,41.68361146446987Q50.89384503009114,37.817270735276 50.684272505307035, 37.033719425669005L50.684272505307035,37.033719425669005Q50.47469998052293,36.250168116062014 50.1324949619634, 35.51497848336794L50.1324949619634,35.51497848336794Q49.79028994340388,34.77978885067387 49.32585015739369, 34.11529925985769L49.32585015739369,34.11529925985769Q48.8614103713835,33.45080966904152 48.288847585802614, 32.877210300071965L48.288847585802614,32.877210300071965Q47.71628480022173,32.30361093110241 47.052996045579675, 31.8383303105511L47.052996045579675,31.8383303105511Q46.38970729093762,31.37304968999979 45.65584626040345, 31.03022513407859L45.65584626040345,31.03022513407859Q44.92198522986928,30.687400578157394 44.139849919504286, 30.477448637519956L44.139849919504286,30.477448637519956Q43.35771460913929,30.267496696882517 42.55106980456958, 30.19679665500462L42.55106980456958,30.19679665500462Q41.744424999999865,30.12609661312672 40.93778019543015, 30.19679665500462L40.93778019543015,30.19679665500462Q40.131135390860436,30.267496696882517 39.34900008049544, 30.477448637519956L39.34900008049544,30.477448637519956Q38.56686477013045,30.687400578157394 37.83300373959628, 31.03022513407859L37.83300373959628,31.03022513407859Q37.09914270906211,31.37304968999979 36.435853954420054, 31.8383303105511L36.435853954420054,31.8383303105511Q35.772565199778,32.30361093110241 35.200002414197115, 32.877210300071965L35.200002414197115,32.877210300071965Q34.62743962861623,33.45080966904152 34.16299984260604, 34.11529925985769L34.16299984260604,34.11529925985769Q33.69856005659585,34.77978885067387 33.35635503803633, 35.51497848336794L33.35635503803633,35.51497848336794Q33.0141500194768,36.250168116062014 32.79227831889102, 37.17455415865879L32.79227831889102,37.17455415865879Q32.57040661830524,38.09894020125557 31.634460974000387, 41.98789967017612L29.889806062430115,49.23713714420617');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Body");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":9.290564581874843,"ry":9.290564581874843,"cx":40.744425000000106,"cy":19.835532031251443,"stroke":"none","stroke-width":0,"fill":"rgba(26,177,232,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // Rectangle
       shape = this.canvas.paper.path('M41.06486093750391,9.63839999999982Q41.06486093750391,5.63839999999982 45.06486093750391, 5.63839999999982L71.06486093750391,5.63839999999982Q75.06486093750391,5.63839999999982 75.06486093750391, 9.63839999999982L75.06486093750391,52.63839999999982Q75.06486093750391,56.63839999999982 71.06486093750391, 56.63839999999982L45.06486093750391,56.63839999999982Q41.06486093750391,56.63839999999982 41.06486093750391, 52.63839999999982L41.06486093750391,9.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M40.40606093750375,49.06802542650166Q40.40606093750375,53.06802542650166 44.40606093750375, 53.06802542650166L49.4268250000041,53.06802542650166Q53.4268250000041,53.06802542650166 52.39970837135936, 49.20214500528304L50.393926240614725,41.65274540233118Q49.366809611969984,37.78686498111256 49.15723708718588, 37.004729670747565L49.15723708718588,37.004729670747565Q48.94766456240177,36.22259436038257 48.605459543842244, 35.4887333298484L48.605459543842244,35.4887333298484Q48.26325452528272,34.75487229931423 47.79881473927253, 34.091583544672176L47.79881473927253,34.091583544672176Q47.33437495326234,33.42829479003012 46.761812167681455, 32.85573200444924L46.761812167681455,32.85573200444924Q46.18924938210057,32.28316921886835 45.52596062745852, 31.818729432858163L45.52596062745852,31.818729432858163Q44.86267187281646,31.354289646847974 44.12881084228229, 31.01208462828845L44.12881084228229,31.01208462828845Q43.39494981174812,30.669879609728923 42.61281450138313, 30.460307084944816L42.61281450138313,30.460307084944816Q41.830679191018135,30.25073456016071 41.118370064260944, 30.188415586643714L41.118370064260944,30.188415586643714Q40.40606093750375,30.12609661312672 40.40606093750375, 34.12609661312672L40.40606093750375,49.06802542650166');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(117,117,117,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Head
       shape = this.canvas.paper.path('M41.06486093750391 29.11315439741429L42.60418544539334 28.978480953486724L44.168456066123326 28.55933590391851L45.63617812719167 27.874925866799458L46.96275563647578 26.94604629477908L48.10788120763755 25.80092072361731L49.036760779657925 24.474343214333203L49.721170816776976 23.00662115326486L50.14031586634519 21.442350532534874L50.28146041812852 19.829060923395446L50.14031586634519 18.215771314256017L49.721170816776976 16.65150069352603L49.036760779657925 15.183778632457688L48.10788120763755 13.857201123173581L46.96275563647578 12.712075552011811L45.63617812719167 11.783195979991433L44.168456066123326 11.098785942872382L42.60418544539334 10.679640893304168L41.06486093750391 10.5449674493766L41.06486093750391 29.11315439741429Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(208,210,212,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Head");
       
       // Line
       shape = this.canvas.paper.path('M40.72936093750377 7.1828968750005515L41.01586093750393,30.57539687499957L41.56486093750391,55.28039687499859L41.56486093750391,54.841196874998786');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_color_GrayscaleAvg = video_color_GrayscaleAvg.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");

        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                // average grayscale conversion
                let average = (pixels[x] + pixels[x+1] + pixels[x+2])/3;

                pixels[x]     = average;
                pixels[x + 1] = average;
                pixels[x + 2] = average;
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_HSV_Colorspace = CircuitFigure.extend({

   NAME: "video_color_HSV_Colorspace",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80.40294399999675,height:84.62910056640976},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3644475505813487, y: 47.84169952063797 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3644475505813487, y: 78.1876804894442 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.8556534447299, y: 47.85587904035329 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80.40294399999675;
      this.originalHeight= 84.62910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80.40294399999675,0 L80.40294399999675,84.62910056640976 L0,84.62910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.4029439999967508,3Q0.4029439999967508,0 3.402943999996751, 0L77.40294399999675,0Q80.40294399999675,0 80.40294399999675, 3L80.40294399999675,77Q80.40294399999675,80 77.40294399999675, 80L3.402943999996751,80Q0.4029439999967508,80 0.4029439999967508, 77L0.4029439999967508,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.902943999996751,8.37996800000019Q4.902943999996751,4.37996800000019 8.90294399999675, 4.37996800000019L71.90294399999675,4.37996800000019Q75.90294399999675,4.37996800000019 75.90294399999675, 8.37996800000019L75.90294399999675,48.37996800000019Q75.90294399999675,52.37996800000019 71.90294399999675, 52.37996800000019L8.90294399999675,52.37996800000019Q4.902943999996751,52.37996800000019 4.902943999996751, 48.37996800000019L4.902943999996751,8.37996800000019');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'RGB -> HSV');
       shape.attr({"x":7.810496000000967,"y":73.62910056640976,"text-anchor":"start","text":"RGB -> HSV","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.539237579449946,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.539237579449946 49.87996800000019L49.539237579449946 49.87996800000019L48.06772456057661 35.49000926909048L47.66775864286774 34.55069784111947L47.01466566498948 33.6693617814999L46.12828952659402 32.87278004043128L45.03556231811672 32.18515635102358L43.76968600284545 31.627383811123764L42.36912359204962 31.216410057116263L40.87643046586618 30.96472231855114L39.33696134959246 30.87996800000019L37.797492233317826 30.96472231855114L36.30479910713257 31.216410057116263L34.90423669633583 31.627383811123764L33.63836038106183 32.18515635102358L32.54563317258908 32.87278004043128L31.659257034191796 33.6693617814999L31.006164056316265 34.55069784111947L30.606198138605578 35.49000926909048Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.33212799999728,47.87996800000019Q40.33212799999728,51.87996800000019 44.33212799999728, 51.87996800000019L71.33212799999728,51.87996800000019Q75.33212799999728,51.87996800000019 75.33212799999728, 47.87996800000019L75.33212799999728,8.87996800000019Q75.33212799999728,4.87996800000019 71.33212799999728, 4.87996800000019L44.33212799999728,4.87996800000019Q40.33212799999728,4.87996800000019 40.33212799999728, 8.87996800000019L40.33212799999728,47.87996800000019');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(34,61,199,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M41.25161599999592 49.87996800000019L50.054672947195286 49.87996800000019L48.86344812239349 35.49000926909048L48.53966618900904 34.55069784111947L48.01097187358573 33.6693617814999L47.29342928535789 32.87278004043128L46.40884059278687 32.18515635102358L45.384083575658224 31.627383811123764L44.250294957394544 31.216410057116263L43.04192433143544 30.96472231855114L41.795687427787016 30.87996800000019L41.25161599999592 30.916969314092967L41.25161599999592 49.87996800000019Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(51,255,207,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M40.33212799999728 25.470542254553948L40.663386059446566 25.499523579457673L42.05257148078181 25.377985603555317L43.399547206051466 25.017064545744688L44.663386059446566 24.42772680973303L45.80568693693931 23.627879124409446L46.79174160439834 22.641824456950417L47.591589289721924 21.499523579457673L48.18092702573358 20.235684726062573L48.54184808354421 18.888709000792915L48.663386059446566 17.499523579457673L48.54184808354421 16.11033815812243L48.18092702573358 14.763362432852773L47.591589289721924 13.499523579457673L46.79174160439834 12.357222701964929L45.80568693693931 11.3711680345059L44.663386059446566 10.571320349182315L43.399547206051466 9.981982613170658L42.05257148078181 9.62106155536003L40.663386059446566 9.499523579457673L40.33212799999728 9.528504904361398L40.33212799999728 25.470542254553948Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(51,255,207,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'hue');
       shape.attr({"x":9.121535999996922,"y":58.609375,"text-anchor":"start","text":"hue","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M8.936960000001818 58.87394028320887L0.024064000000180386,66.07112428320761L0,66.19042028320837');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M40.440896000001885 5.1831660000025295L40.650611199997,52.945802799990815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_color_HSV_Colorspace = video_color_HSV_Colorspace.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            var hue = this.getInputPort("input_port2").getValue();
            this.worker.postMessage( {imageData, hue}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var hue = event.data.hue;
            
            // mapping of [0..5] => [0..359]
            hue = 359/5*hue;
            
            var pixels = imageData.data;
            var nPixels = pixels.length,
              v = 2, // Math.pow(2, this.value()),
              s = 1.5, // Math.pow(2, this.saturation()),
              h = Math.abs(hue + 360) % 360,
              i;

            // Precompute the values in the matrix:
            var vsu = v * s * Math.cos((h * Math.PI) / 180),
                vsw = v * s * Math.sin((h * Math.PI) / 180);
            // (result spot)(source spot)
            var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
                rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw,
                rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
            var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
                gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
                gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
            var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw,
                bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw,
                bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;

            var r, g, b, a;

            for (i = 0; i < nPixels; i += 4) {
              r = pixels[i + 0];
              g = pixels[i + 1];
              b = pixels[i + 2];
              a = pixels[i + 3];

              pixels[i + 0] = rr * r + rg * g + rb * b;
              pixels[i + 1] = gr * r + gg * g + gb * b;
              pixels[i + 2] = br * r + bg * g + bb * b;
              pixels[i + 3] = a; // alpha
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_Invert = CircuitFigure.extend({

   NAME: "video_color_Invert",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:82.12910056640976},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 49.29799513299382 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.86500000000024, y: 49.31260627559365 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 82.12910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,82.12910056640976 L0,82.12910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.37996800000019Q4.5,4.37996800000019 8.5, 4.37996800000019L71.5,4.37996800000019Q75.5,4.37996800000019 75.5, 8.37996800000019L75.5,54.37996800000019Q75.5,58.37996800000019 71.5, 58.37996800000019L8.5,58.37996800000019Q4.5,58.37996800000019 4.5, 54.37996800000019L4.5,8.37996800000019');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Invert');
       shape.attr({"x":22.407552000004216,"y":70.12910056640976,"text-anchor":"start","text":"Invert","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.87996800000019L49.136293579453195 49.87996800000019L47.66478056057986 35.49000926909048L47.26481464287099 34.55069784111947L46.61172166499273 33.6693617814999L45.725345526597266 32.87278004043128L44.63261831811997 32.18515635102358L43.366742002848696 31.627383811123764L41.96617959205287 31.216410057116263L40.47348646586943 30.96472231855114L38.934017349595706 30.87996800000019L37.394548233321075 30.96472231855114L35.901855107135816 31.216410057116263L34.50129269633908 31.627383811123764L33.23541638106508 32.18515635102358L32.14268917259233 32.87278004043128L31.256313034195045 33.6693617814999L30.603220056319515 34.55069784111947L30.203254138608827 35.49000926909048Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.42918400000053,53.87996800000019Q39.42918400000053,57.87996800000019 43.42918400000053, 57.87996800000019L71,57.87996800000019Q75,57.87996800000019 75, 53.87996800000019L75,8.87996800000019Q75,4.87996800000019 71, 4.87996800000019L43.42918400000053,4.87996800000019Q39.42918400000053,4.87996800000019 39.42918400000053, 8.87996800000019L39.42918400000053,53.87996800000019');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.84867199999917 49.87996800000019L49.651728947198535 49.87996800000019L48.46050412239674 35.49000926909048L48.13672218901229 34.55069784111947L47.60802787358898 33.6693617814999L46.89048528536114 32.87278004043128L46.00589659279012 32.18515635102358L44.98113957566147 31.627383811123764L43.84735095739779 31.216410057116263L42.63898033143869 30.96472231855114L41.392743427790265 30.87996800000019L40.84867199999917 30.916969314092967L40.84867199999917 49.87996800000019Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M39.92918400000053 25.470542254553948L40.260442059449815 25.499523579457673L41.64962748078506 25.377985603555317L42.996603206054715 25.017064545744688L44.260442059449815 24.42772680973303L45.40274293694256 23.627879124409446L46.38879760440159 22.641824456950417L47.18864528972517 21.499523579457673L47.77798302573683 20.235684726062573L48.13890408354746 18.888709000792915L48.260442059449815 17.499523579457673L48.13890408354746 16.11033815812243L47.77798302573683 14.763362432852773L47.18864528972517 13.499523579457673L46.38879760440159 12.357222701964929L45.40274293694256 11.3711680345059L44.260442059449815 10.571320349182315L42.996603206054715 9.981982613170658L41.64962748078506 9.62106155536003L40.260442059449815 9.499523579457673L39.92918400000053 9.528504904361398L39.92918400000053 25.470542254553948Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(227,227,227,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M39.537952000005134 5.1831660000025295L40.00981120000051,58.45082679999632');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_color_Invert = video_color_Invert.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing ===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage( imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                pixels[x]   = 255-pixels[x];
                pixels[x+1] = 255-pixels[x+1];
                pixels[x+2] = 255-pixels[x+2];
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_JustBlack = CircuitFigure.extend({

   NAME: "video_color_JustBlack",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:84.12910056640976},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 48.126034543826854 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 77.8389528672162 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.86500000000024, y: 48.14029833592497 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 84.12910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,84.12910056640976 L0,84.12910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.3799680000011Q4.5,4.379968000001099 8.5, 4.379968000001099L71.5,4.379968000001099Q75.5,4.379968000001099 75.5, 8.3799680000011L75.5,48.3799680000011Q75.5,52.3799680000011 71.5, 52.3799680000011L8.5,52.3799680000011Q4.5,52.3799680000011 4.5, 48.3799680000011L4.5,8.3799680000011');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Just Black');
       shape.attr({"x":7.907552000004216,"y":72.12910056640976,"text-anchor":"start","text":"Just Black","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'threshold');
       shape.attr({"x":12,"y":57.59737500000119,"text-anchor":"start","text":"threshold","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 47.3799680000011L49.136293579453195 47.3799680000011L47.66478056057895 32.99000926909139L47.26481464287099 32.05069784112129L46.61172166499273 31.1693617814999L45.72534552659636 30.37278004043219L44.63261831811906 29.68515635102449L43.366742002848696 29.127383811124673L41.96617959205287 28.716410057117173L40.47348646586943 28.46472231855296L38.9340173495948 28.3799680000011L37.394548233321984 28.46472231855296L35.90185510713491 28.716410057117173L34.50129269633908 29.127383811124673L33.23541638106508 29.68515635102449L32.142689172593236 30.37278004043219L31.256313034195045 31.1693617814999L30.603220056320424 32.05069784112129L30.203254138608827 32.99000926909139Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.92918400000053,47.3799680000011Q39.92918400000053,51.3799680000011 43.92918400000053, 51.3799680000011L70.92918400000053,51.3799680000011Q74.92918400000053,51.3799680000011 74.92918400000053, 47.3799680000011L74.92918400000053,9.3799680000011Q74.92918400000053,5.379968000001099 70.92918400000053, 5.379968000001099L43.92918400000053,5.379968000001099Q39.92918400000053,5.379968000001099 39.92918400000053, 9.3799680000011L39.92918400000053,47.3799680000011');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M34.208593749999636,9.296581533205426Q34.208593749999636,7.296581533205426 36.208593749999636, 7.296581533205426L44.208593749999636,7.296581533205426Q46.208593749999636,7.296581533205426 46.208593749999636, 9.296581533205426L46.208593749999636,10.296581533205426Q46.208593749999636,12.296581533205426 44.208593749999636, 12.296581533205426L36.208593749999636,12.296581533205426Q34.208593749999636,12.296581533205426 34.208593749999636, 10.296581533205426L34.208593749999636,9.296581533205426');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(32,32,32,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":2.5,"ry":2.5,"cx":35.136293579453195,"cy":16.796581533205426,"stroke":"none","stroke-width":0,"fill":"rgba(48,48,48,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":2.5,"ry":2.5,"cx":43.84867200000008,"cy":16.796581533205426,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M9.377490534403478 57.12910056640976L5.757806182406057,57.53049545921385L0.4075520000042161,64.0115340000084');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M40.086528000003455 5.1831660000025295L40.34867200000008,52.369086000002426');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M52.00859375000255 12.296581533203607L29.208593750002365,12.09658153320379');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(32,32,32,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M41.317968750000546 16.760644033205608L38.017968750000364,16.760644033205608');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_color_JustBlack = video_color_JustBlack.extend({


    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        var threshold = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData: imageData,threshold: threshold}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var threshold = event.data.threshold;
            // map offset from 0-5 => 0-255
            threshold = 255/5*threshold;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                if(pixels[x]<threshold && pixels[x+1]<threshold && pixels[x+2]<threshold){
                    pixels[x] = pixels[x+1] = pixels[x+2] = 0;
                }
                else{
                    pixels[x] = pixels[x+1] = pixels[x+2] = 255;
                }
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_Luminance = CircuitFigure.extend({

   NAME: "video_color_Luminance",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:86.375,height:80.63839999999982},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 2.5984659913167754, y: 49.49205341375826 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 96.4117800289434, y: 49.49205341375826 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 86.375;
      this.originalHeight= 80.63839999999982;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L86.375,0 L86.375,80.63839999999982 L0,80.63839999999982");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M3.015625,3Q3.015625,0 6.015625, 0L80.015625,0Q83.015625,0 83.015625, 3L83.015625,77Q83.015625,80 80.015625, 80L6.015625,80Q3.015625,80 3.015625, 77L3.015625,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Luminance');
       shape.attr({"x":4,"y":68.13839999999982,"text-anchor":"start","text":"Luminance","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M8.244424999999865,10.63839999999982Q8.244424999999865,5.63839999999982 13.244424999999865, 5.63839999999982L72.24442499999986,5.63839999999982Q77.24442499999986,5.63839999999982 77.24442499999986, 10.63839999999982L77.24442499999986,51.63839999999982Q77.24442499999986,56.63839999999982 72.24442499999986, 56.63839999999982L13.244424999999865,56.63839999999982Q8.244424999999865,56.63839999999982 8.244424999999865, 51.63839999999982L8.244424999999865,10.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(214,247,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Body
       shape = this.canvas.paper.path('M31.889806062430115,49.23713714420617Q30.95386041812526,53.12609661312672 34.95386041812526, 53.12609661312672L52.95386041812526,53.12609661312672Q56.95386041812526,53.12609661312672 55.928477872059354, 49.25975588393285L53.91922757615705,41.68361146446987Q52.89384503009114,37.817270735276 52.684272505307035, 37.033719425669005L52.684272505307035,37.033719425669005Q52.47469998052293,36.250168116062014 52.1324949619634, 35.51497848336794L52.1324949619634,35.51497848336794Q51.79028994340388,34.77978885067387 51.32585015739369, 34.11529925985769L51.32585015739369,34.11529925985769Q50.8614103713835,33.45080966904152 50.288847585802614, 32.877210300071965L50.288847585802614,32.877210300071965Q49.71628480022173,32.30361093110241 49.052996045579675, 31.8383303105511L49.052996045579675,31.8383303105511Q48.38970729093762,31.37304968999979 47.65584626040345, 31.03022513407859L47.65584626040345,31.03022513407859Q46.92198522986928,30.687400578157394 46.139849919504286, 30.477448637519956L46.139849919504286,30.477448637519956Q45.35771460913929,30.267496696882517 44.55106980456958, 30.19679665500462L44.55106980456958,30.19679665500462Q43.744424999999865,30.12609661312672 42.93778019543015, 30.19679665500462L42.93778019543015,30.19679665500462Q42.131135390860436,30.267496696882517 41.34900008049544, 30.477448637519956L41.34900008049544,30.477448637519956Q40.56686477013045,30.687400578157394 39.83300373959628, 31.03022513407859L39.83300373959628,31.03022513407859Q39.09914270906211,31.37304968999979 38.435853954420054, 31.8383303105511L38.435853954420054,31.8383303105511Q37.772565199778,32.30361093110241 37.200002414197115, 32.877210300071965L37.200002414197115,32.877210300071965Q36.62743962861623,33.45080966904152 36.16299984260604, 34.11529925985769L36.16299984260604,34.11529925985769Q35.69856005659585,34.77978885067387 35.35635503803633, 35.51497848336794L35.35635503803633,35.51497848336794Q35.0141500194768,36.250168116062014 34.79227831889102, 37.17455415865879L34.79227831889102,37.17455415865879Q34.57040661830524,38.09894020125557 33.63446097400039, 41.98789967017612L31.889806062430115,49.23713714420617');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Body");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":9.290564581874843,"ry":9.290564581874843,"cx":42.744425000000106,"cy":19.835532031251443,"stroke":"none","stroke-width":0,"fill":"rgba(26,177,232,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // Rectangle
       shape = this.canvas.paper.path('M43.06486093750391,9.63839999999982Q43.06486093750391,5.63839999999982 47.06486093750391, 5.63839999999982L73.06486093750391,5.63839999999982Q77.06486093750391,5.63839999999982 77.06486093750391, 9.63839999999982L77.06486093750391,52.63839999999982Q77.06486093750391,56.63839999999982 73.06486093750391, 56.63839999999982L47.06486093750391,56.63839999999982Q43.06486093750391,56.63839999999982 43.06486093750391, 52.63839999999982L43.06486093750391,9.63839999999982');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M42.40606093750375,49.06802542650166Q42.40606093750375,53.06802542650166 46.40606093750375, 53.06802542650166L51.4268250000041,53.06802542650166Q55.4268250000041,53.06802542650166 54.39970837135936, 49.20214500528304L52.393926240614725,41.65274540233118Q51.366809611969984,37.78686498111256 51.15723708718588, 37.004729670747565L51.15723708718588,37.004729670747565Q50.94766456240177,36.22259436038257 50.605459543842244, 35.4887333298484L50.605459543842244,35.4887333298484Q50.26325452528272,34.75487229931423 49.79881473927253, 34.091583544672176L49.79881473927253,34.091583544672176Q49.33437495326234,33.42829479003012 48.761812167681455, 32.85573200444924L48.761812167681455,32.85573200444924Q48.18924938210057,32.28316921886835 47.52596062745852, 31.818729432858163L47.52596062745852,31.818729432858163Q46.86267187281646,31.354289646847974 46.12881084228229, 31.01208462828845L46.12881084228229,31.01208462828845Q45.39494981174812,30.669879609728923 44.61281450138313, 30.460307084944816L44.61281450138313,30.460307084944816Q43.830679191018135,30.25073456016071 43.118370064260944, 30.188415586643714L43.118370064260944,30.188415586643714Q42.40606093750375,30.12609661312672 42.40606093750375, 34.12609661312672L42.40606093750375,49.06802542650166');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(92,92,92,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Head
       shape = this.canvas.paper.path('M43.06486093750391 29.11315439741429L44.60418544539334 28.978480953486724L46.168456066123326 28.55933590391851L47.63617812719167 27.874925866799458L48.96275563647578 26.94604629477908L50.10788120763755 25.80092072361731L51.036760779657925 24.474343214333203L51.721170816776976 23.00662115326486L52.14031586634519 21.442350532534874L52.28146041812852 19.829060923395446L52.14031586634519 18.215771314256017L51.721170816776976 16.65150069352603L51.036760779657925 15.183778632457688L50.10788120763755 13.857201123173581L48.96275563647578 12.712075552011811L47.63617812719167 11.783195979991433L46.168456066123326 11.098785942872382L44.60418544539334 10.679640893304168L43.06486093750391 10.5449674493766L43.06486093750391 29.11315439741429Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(210,212,214,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Head");
       
       // Line
       shape = this.canvas.paper.path('M42.72936093750377 7.1828968750005515L43.01586093750393,30.57539687499957L43.56486093750391,55.28039687499859L43.56486093750391,54.841196874998786');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_color_Luminance = video_color_Luminance.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");

        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                // CIE luminance for the RGB
                let average = 0.2126*pixels[x] + 0.7152*pixels[x+1] + 0.0722*pixels[x+2];
              
                pixels[x]     = average;
                pixels[x + 1] = average;
                pixels[x + 2] = average;
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_RGBSplitter = CircuitFigure.extend({

   NAME: "video_color_RGBSplitter",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.12910056640976},attr), setter, getter);
     var port;
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 88.6738137133109 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 50.528459340992306 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(1);
     // output_port3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 64.88029895819727 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port3");
     port.setMaxFanOut(20);
     // output_port2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 38.062980070742384 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 7.716504935529654 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.12910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.12910056640976 L0,80.12910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.3799680000011Q4.5,4.379968000001099 8.5, 4.379968000001099L71.5,4.379968000001099Q75.5,4.379968000001099 75.5, 8.3799680000011L75.5,48.3799680000011Q75.5,52.3799680000011 71.5, 52.3799680000011L8.5,52.3799680000011Q4.5,52.3799680000011 4.5, 48.3799680000011L4.5,8.3799680000011');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'RGB Splitter');
       shape.attr({"x":6.407552000004216,"y":69.12910056640976,"text-anchor":"start","text":"RGB Splitter","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.8799680000011L49.136293579453195 49.8799680000011L47.66478056057895 35.49000926909139L47.26481464287099 34.55069784112129L46.61172166499273 33.6693617814999L45.72534552659636 32.87278004043219L44.63261831811906 32.18515635102449L43.366742002848696 31.627383811124673L41.96617959205287 31.216410057117173L40.47348646586943 30.96472231855296L38.9340173495948 30.8799680000011L37.394548233321984 30.96472231855296L35.90185510713491 31.216410057117173L34.50129269633908 31.627383811124673L33.23541638106508 32.18515635102449L32.142689172593236 32.87278004043219L31.256313034195045 33.6693617814999L30.603220056320424 34.55069784112129L30.203254138608827 35.49000926909139Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.13421670400021 52.03330028320488L75.13421670400021 52.03330028320488L75.13421670400021 36.03330028320488L39.13421670400021 36.03330028320488L39.13421670400021 52.03330028320488Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39 36.8799680000011L75 36.8799680000011L75 19.8799680000011L39 19.8799680000011L39 36.8799680000011Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,255,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39 21.03330028320488L75 21.03330028320488L75 4.0333002832048805L39 4.0333002832048805L39 21.03330028320488Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       

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
video_color_RGBSplitter = video_color_RGBSplitter.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.tmpCanvasR = null;
        this.tmpContextR = null;
        this.tmpCanvasG = null;
        this.tmpContextG = null;
        this.tmpCanvasB = null;
        this.tmpContextB = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port2").setSemanticGroup("Image");
        this.getOutputPort("output_port3").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        var threshold = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData: imageData,threshold: threshold}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var threshold = event.data.threshold;
            // map offset from 0-5 => 0-255
            threshold = 255/5*threshold;
            var pixels = imageData.data;
            var w = imageData.width;
            var h = imageData.height;
            
            var r = new Uint8ClampedArray(pixels.length);
            var g = new Uint8ClampedArray(pixels.length);
            var b = new Uint8ClampedArray(pixels.length);
            r.fill(255);
            g.fill(255);
            b.fill(255);
            
            for( let x = 0; x < pixels.length; x += 4 ) {
                r[x]=r[x+1]=r[x+2] = threshold < (pixels[x]  -((pixels[x+1]+pixels[x+2])/2))?0:255;
                g[x]=g[x+1]=g[x+2] = threshold < (pixels[x+1]-((pixels[x]  +pixels[x+2])/2))?0:255;
                b[x]=b[x+1]=b[x+2] = threshold < (pixels[x+2]-((pixels[x+1]+pixels[x])/2))?0:255;
            }
            var imageDataR = new ImageData(r, w, h);
            var imageDataG = new ImageData(g, w, h);
            var imageDataB = new ImageData(b, w, h);
            self.postMessage({imageDataR, imageDataG, imageDataB}, [imageDataR.data.buffer,imageDataG.data.buffer,imageDataB.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageDataR = event.data.imageDataR;
            var imageDataG = event.data.imageDataG;
            var imageDataB = event.data.imageDataB;
            this.tmpContextR.putImageData(imageDataR,0,0);
            this.tmpContextG.putImageData(imageDataG,0,0);
            this.tmpContextB.putImageData(imageDataB,0,0);
            
            var imageR = new Image();
            imageR.onload = () => {
                this.getOutputPort("output_port1").setValue(imageR);
                this.processing = false;
            };
            imageR.src = this.tmpCanvasR.toDataURL();
            
            var imageG = new Image();
            imageG.onload = () => {
                this.getOutputPort("output_port2").setValue(imageG);
                this.processing = false;
            };
            imageG.src = this.tmpCanvasG.toDataURL();
            
            var imageB = new Image();
            imageB.onload = () => {
                this.getOutputPort("output_port3").setValue(imageB);
                this.processing = false;
            };
            imageB.src = this.tmpCanvasB.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        delete this.tmpContextR;
        delete this.tmpCanvasR;
        delete this.tmpContextG;
        delete this.tmpCanvasG;
        delete this.tmpContextB;
        delete this.tmpCanvasB;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.tmpCanvasR = null;
        this.tmpContextR = null;
        this.tmpCanvasG = null;
        this.tmpContextG = null;
        this.tmpCanvasB = null;
        this.tmpContextB = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            delete this.tmpContextR;
            delete this.tmpCanvasR;
            delete this.tmpContextG;
            delete this.tmpCanvasG;
            delete this.tmpContextB;
            delete this.tmpCanvasB;
            this.tmpCanvas = null;
            this.tmpContext = null;
            this.tmpCanvasR = null;
            this.tmpContextR = null;
            this.tmpCanvasG = null;
            this.tmpContextG = null;
            this.tmpCanvasB = null;
            this.tmpContextB = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');

            this.tmpCanvasR = document.createElement('canvas');
            this.tmpCanvasR.width = width;
            this.tmpCanvasR.height = height;
            this.tmpContextR = this.tmpCanvasR.getContext('2d');

            this.tmpCanvasG = document.createElement('canvas');
            this.tmpCanvasG.width = width;
            this.tmpCanvasG.height = height;
            this.tmpContextG = this.tmpCanvasG.getContext('2d');

            this.tmpCanvasB = document.createElement('canvas');
            this.tmpCanvasB.width = width;
            this.tmpCanvasB.height = height;
            this.tmpContextB = this.tmpCanvasB.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_Splitter = CircuitFigure.extend({

   NAME: "video_color_Splitter",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.12910056640976},attr), setter, getter);
     var port;
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 88.6738137133109 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 50.528459340992306 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(1);
     // output_port3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 64.88029895819727 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port3");
     port.setMaxFanOut(20);
     // output_port2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 38.062980070742384 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 7.716504935529654 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.12910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.12910056640976 L0,80.12910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.3799680000011Q4.5,4.379968000001099 8.5, 4.379968000001099L71.5,4.379968000001099Q75.5,4.379968000001099 75.5, 8.3799680000011L75.5,48.3799680000011Q75.5,52.3799680000011 71.5, 52.3799680000011L8.5,52.3799680000011Q4.5,52.3799680000011 4.5, 48.3799680000011L4.5,8.3799680000011');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'RGB Splitter');
       shape.attr({"x":6.407552000004216,"y":69.12910056640976,"text-anchor":"start","text":"RGB Splitter","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.8799680000011L49.136293579453195 49.8799680000011L47.66478056057895 35.49000926909139L47.26481464287099 34.55069784112129L46.61172166499273 33.6693617814999L45.72534552659636 32.87278004043219L44.63261831811906 32.18515635102449L43.366742002848696 31.627383811124673L41.96617959205287 31.216410057117173L40.47348646586943 30.96472231855296L38.9340173495948 30.8799680000011L37.394548233321984 30.96472231855296L35.90185510713491 31.216410057117173L34.50129269633908 31.627383811124673L33.23541638106508 32.18515635102449L32.142689172593236 32.87278004043219L31.256313034195045 33.6693617814999L30.603220056320424 34.55069784112129L30.203254138608827 35.49000926909139Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.13421670400021 52.03330028320488L75.13421670400021 52.03330028320488L75.13421670400021 36.03330028320488L39.13421670400021 36.03330028320488L39.13421670400021 52.03330028320488Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39 36.8799680000011L75 36.8799680000011L75 19.8799680000011L39 19.8799680000011L39 36.8799680000011Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,255,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39 21.03330028320488L75 21.03330028320488L75 4.0333002832048805L39 4.0333002832048805L39 21.03330028320488Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       

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
video_color_Splitter = video_color_Splitter.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.tmpCanvasR = null;
        this.tmpContextR = null;
        this.tmpCanvasG = null;
        this.tmpContextG = null;
        this.tmpCanvasB = null;
        this.tmpContextB = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port2").setSemanticGroup("Image");
        this.getOutputPort("output_port3").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        var threshold = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData: imageData,threshold: threshold}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var threshold = event.data.threshold;
            // map offset from 0-5 => 0-255
            threshold = 255/5*threshold;
            var pixels = imageData.data;
            var w = imageData.width;
            var h = imageData.height;
            
            var r = new Uint8ClampedArray(pixels.length);
            var g = new Uint8ClampedArray(pixels.length);
            var b = new Uint8ClampedArray(pixels.length);
            r.fill(255);
            g.fill(255);
            b.fill(255);
            
            for( let x = 0; x < pixels.length; x += 4 ) {
                r[x]=r[x+1]=r[x+2] = threshold < (pixels[x]  -((pixels[x+1]+pixels[x+2])/2))?0:255;
                g[x]=g[x+1]=g[x+2] = threshold < (pixels[x+1]-((pixels[x]  +pixels[x+2])/2))?0:255;
                b[x]=b[x+1]=b[x+2] = threshold < (pixels[x+2]-((pixels[x+1]+pixels[x])/2))?0:255;
            }
            var imageDataR = new ImageData(r, w, h);
            var imageDataG = new ImageData(g, w, h);
            var imageDataB = new ImageData(b, w, h);
            self.postMessage({imageDataR, imageDataG, imageDataB}, [imageDataR.data.buffer,imageDataG.data.buffer,imageDataB.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageDataR = event.data.imageDataR;
            var imageDataG = event.data.imageDataG;
            var imageDataB = event.data.imageDataB;
            this.tmpContextR.putImageData(imageDataR,0,0);
            this.tmpContextG.putImageData(imageDataG,0,0);
            this.tmpContextB.putImageData(imageDataB,0,0);
            
            var imageR = new Image();
            imageR.onload = () => {
                this.getOutputPort("output_port1").setValue(imageR);
                this.processing = false;
            };
            imageR.src = this.tmpCanvasR.toDataURL();
            
            var imageG = new Image();
            imageG.onload = () => {
                this.getOutputPort("output_port2").setValue(imageG);
                this.processing = false;
            };
            imageG.src = this.tmpCanvasG.toDataURL();
            
            var imageB = new Image();
            imageB.onload = () => {
                this.getOutputPort("output_port3").setValue(imageB);
                this.processing = false;
            };
            imageB.src = this.tmpCanvasB.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        delete this.tmpContextR;
        delete this.tmpCanvasR;
        delete this.tmpContextG;
        delete this.tmpCanvasG;
        delete this.tmpContextB;
        delete this.tmpCanvasB;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.tmpCanvasR = null;
        this.tmpContextR = null;
        this.tmpCanvasG = null;
        this.tmpContextG = null;
        this.tmpCanvasB = null;
        this.tmpContextB = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            delete this.tmpContextR;
            delete this.tmpCanvasR;
            delete this.tmpContextG;
            delete this.tmpCanvasG;
            delete this.tmpContextB;
            delete this.tmpCanvasB;
            this.tmpCanvas = null;
            this.tmpContext = null;
            this.tmpCanvasR = null;
            this.tmpContextR = null;
            this.tmpCanvasG = null;
            this.tmpContextG = null;
            this.tmpCanvasB = null;
            this.tmpContextB = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');

            this.tmpCanvasR = document.createElement('canvas');
            this.tmpCanvasR.width = width;
            this.tmpCanvasR.height = height;
            this.tmpContextR = this.tmpCanvasR.getContext('2d');

            this.tmpCanvasG = document.createElement('canvas');
            this.tmpCanvasG.width = width;
            this.tmpCanvasG.height = height;
            this.tmpContextG = this.tmpCanvasG.getContext('2d');

            this.tmpCanvasB = document.createElement('canvas');
            this.tmpCanvasB.width = width;
            this.tmpCanvasB.height = height;
            this.tmpContextB = this.tmpCanvasB.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_WhiteBlack = CircuitFigure.extend({

   NAME: "video_color_WhiteBlack",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80.43880200000422,height:84.12910056640976},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.8647716807119048, y: 48.126034543826854 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.8647716807119048, y: 77.8389528672162 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.3093158697166, y: 48.14029833592497 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80.43880200000422;
      this.originalHeight= 84.12910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80.43880200000422,0 L80.43880200000422,84.12910056640976 L0,84.12910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.3799680000011Q4.5,4.379968000001099 8.5, 4.379968000001099L71.5,4.379968000001099Q75.5,4.379968000001099 75.5, 8.3799680000011L75.5,48.3799680000011Q75.5,52.3799680000011 71.5, 52.3799680000011L8.5,52.3799680000011Q4.5,52.3799680000011 4.5, 48.3799680000011L4.5,8.3799680000011');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'WhiteBlack');
       shape.attr({"x":5.407552000004216,"y":72.12910056640976,"text-anchor":"start","text":"WhiteBlack","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'threshold');
       shape.attr({"x":12,"y":57.59737500000119,"text-anchor":"start","text":"threshold","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.8799680000011L49.136293579453195 49.8799680000011L47.66478056057895 35.49000926909139L47.26481464287099 34.55069784112129L46.61172166499273 33.6693617814999L45.72534552659636 32.87278004043219L44.63261831811906 32.18515635102449L43.366742002848696 31.627383811124673L41.96617959205287 31.216410057117173L40.47348646586943 30.96472231855296L38.9340173495948 30.8799680000011L37.394548233321984 30.96472231855296L35.90185510713491 31.216410057117173L34.50129269633908 31.627383811124673L33.23541638106508 32.18515635102449L32.142689172593236 32.87278004043219L31.256313034195045 33.6693617814999L30.603220056320424 34.55069784112129L30.203254138608827 35.49000926909139Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.92918400000053,47.3799680000011Q39.92918400000053,51.3799680000011 43.92918400000053, 51.3799680000011L70.92918400000053,51.3799680000011Q74.92918400000053,51.3799680000011 74.92918400000053, 47.3799680000011L74.92918400000053,9.3799680000011Q74.92918400000053,5.379968000001099 70.92918400000053, 5.379968000001099L43.92918400000053,5.379968000001099Q39.92918400000053,5.379968000001099 39.92918400000053, 9.3799680000011L39.92918400000053,47.3799680000011');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.84867200000008 49.8799680000011L49.651728947199445 49.8799680000011L48.46050412239856 35.49000926909139L48.13672218901411 34.55069784112129L47.60802787358989 33.6693617814999L46.890485285362956 32.87278004043219L46.00589659279103 32.18515635102449L44.98113957566238 31.627383811124673L43.84735095739961 31.216410057117173L42.6389803314396 30.96472231855296L41.392743427790265 30.8799680000011L40.84867200000008 30.916969314093876L40.84867200000008 49.8799680000011Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M39.92918400000053 25.470542254553948L40.260442059450725 25.499523579457673L41.64962748078506 25.377985603554407L42.996603206054715 25.01706454574378L44.260442059450725 24.42772680973212L45.40274293694165 23.627879124409446L46.3887976044025 22.641824456950417L47.18864528972517 21.499523579457673L47.77798302573683 20.235684726063482L48.13890408354746 18.888709000792005L48.260442059450725 17.499523579457673L48.13890408354746 16.11033815812334L47.77798302573683 14.763362432851864L47.18864528972517 13.499523579457673L46.3887976044025 12.357222701964929L45.40274293694165 11.3711680345059L44.260442059450725 10.571320349183225L42.996603206054715 9.981982613171567L41.64962748078506 9.621061555360939L40.260442059450725 9.499523579457673L39.92918400000053 9.528504904361398L39.92918400000053 25.470542254553948Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M9.377490534403478 57.12910056640976L5.757806182406057,57.53049545921385L0.4075520000042161,64.0115340000084');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M40.086528000003455 5.1831660000025295L40.34867200000008,52.369086000002426');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_color_WhiteBlack = video_color_WhiteBlack.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        var threshold = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData: imageData,threshold: threshold}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var threshold = event.data.threshold;
            // map offset from 0-5 => 0-255
            threshold = 255/5*threshold;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                let lum = 0.2126 * pixels[x] + 0.7152 * pixels[x+1] + 0.0722 * pixels[x+2];
                pixels[x] = pixels[x+1] = pixels[x+2] = lum>threshold?255:0;
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_features_LineAngle = CircuitFigure.extend({

   NAME: "video_features_LineAngle",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.04423942400535},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.859428095247814 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.859428095247814 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
     // output_angle
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 81.20509416759656 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_angle");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.04423942400535;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.04423942400535 L0,80.04423942400535");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Line Angle');
       shape.attr({"x":4.3266039182290115,"y":68.04423942400535,"text-anchor":"start","text":"Line Angle","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#000000","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // PictureFrame
       shape = this.canvas.paper.path('M4.228799999999865,8.044239424005355Q4.228799999999865,4.0442394240053545 8.228799999999865, 4.0442394240053545L71.22879999999986,4.0442394240053545Q75.22879999999986,4.0442394240053545 75.22879999999986, 8.044239424005355L75.22879999999986,52.044239424005355Q75.22879999999986,56.044239424005355 71.22879999999986, 56.044239424005355L8.228799999999865,56.044239424005355Q4.228799999999865,56.044239424005355 4.228799999999865, 52.044239424005355L4.228799999999865,8.044239424005355');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","PictureFrame");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":54.29535391822901,"cy":39.909599999999955,"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // Rectangle
       shape = this.canvas.paper.path('M18.566656000002695 8.730641212006049L27.741696000002776 20.789265212005375L18.566656000002695 20.789265212005375Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":2,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Line
       shape = this.canvas.paper.path('M41.89747200000329 6.109201212002517L40.97996800000374,9.517073212003197Q40.062464000004184,12.924945212003877 37.30995200000325, 20.65819321200479L37.30995200000325,20.65819321200479Q34.557440000002316,28.391441212005702 33.20585518239518, 37.289374594584714L31.4117120000019,49.100817212005495');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M25.139520000010634 48.333649211997L26.84345600000779,42.43540921199883Q28.547392000004947,36.53716921200066 23.885079773487288, 28.8389327449607L21.937512226522248,25.62318167904202Q17.275200000004588,17.924945212002058 13.503676402846846, 26.09657967250519L13.182403597159013,26.79267075149505Q9.41088000000127,34.96430521199818 10.983744000002844, 41.386833212000056L12.556608000004417,47.80936121200193');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M59.947317759990256 26.990202171997225L42.03763967999657,21.684407612005998');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,15,31,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M43.619281919998684 28.46698681199905L39.8653798400037,21.032582972004093L46.513351680005144,16.785850172007486');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,15,31,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_features_LineAngle = video_features_LineAngle.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels    = imageData.data;
            var width     = imageData.width;
            var height    = imageData.height;
            var angles    = 360;
            var rhoMax    = Math.sqrt(width*width + height*height);
            var accum     = Array(angles);
            var houghAccCalled=false;
            
            // Precalculate tables.
            if(self.cosTable===undefined){
                self.cosTable = new Float64Array(angles);
                self.sinTable = new Float64Array(angles);
                var theta = 0;
                var piSteps = Math.PI / angles;
                for (var i = 0; i < angles; i++) {
                    self.cosTable[i] = Math.cos(theta);
                    self.sinTable[i] = Math.sin(theta);
                    theta += piSteps;
                }
            }
           
            function getAngle(line) {
                if(!line) return null;
                return 180-(Math.atan2(line.y1 - line.y2, line.x1 - line.x2) * 180 / Math.PI)|0;
            }

            function getFont() {
                var ratio = 0.3;   // calc ratio
                var size = width * ratio;   // get font size based on current width
                return "normal 100 "+ (size|0) + "px Verdana"; // set font
            }
            
            // Clipping helper
            //
            // bit code reflects the point position relative to the bbox:
            //         left  mid  right
            //    top  1001  1000  1010
            //    mid  0001  0000  0010
            // bottom  0101  0100  0110
            function bitCode(p, bbox) {
                var code = 0;
            
                if (p[0] < bbox[0]) code |= 1; // left
                else if (p[0] > bbox[2]) code |= 2; // right
            
                if (p[1] < bbox[1]) code |= 4; // bottom
                else if (p[1] > bbox[3]) code |= 8; // top
            
                return code;
            }
            
            // intersect a segment against one of the 4 lines that make up the bbox
            function intersect(a, b, edge, bbox) {
                return edge & 8 ? [a[0] + (b[0] - a[0]) * (bbox[3] - a[1]) / (b[1] - a[1]), bbox[3]] : // top
                    edge & 4 ? [a[0] + (b[0] - a[0]) * (bbox[1] - a[1]) / (b[1] - a[1]), bbox[1]] : // bottom
                    edge & 2 ? [bbox[2], a[1] + (b[1] - a[1]) * (bbox[2] - a[0]) / (b[0] - a[0])] : // right
                    edge & 1 ? [bbox[0], a[1] + (b[1] - a[1]) * (bbox[0] - a[0]) / (b[0] - a[0])] : null; // left
            }
            
            // Sutherland-Hodgeman polygon clipping algorithm
            function clipLine(line, w, h) {
                if(!line) return null;
                var offset = 10;
                var points = [[line.x1, line.y1],[line.x2, line.y2]];
                var bbox = [offset,offset, w-offset, h-offset];
                var len = points.length,
                    codeA = bitCode(points[0], bbox),
                    part = [],
                    i, a, b, codeB, lastCode,
                    result = [];
            
                for (i = 1; i < len; i++) {
                    a = points[i - 1];
                    b = points[i];
                    codeB = lastCode = bitCode(b, bbox);
            
                    while (true) {
            
                        if (!(codeA | codeB)) { // accept
                            part.push(a);
                            if (codeB !== lastCode) { // segment went outside
                                part.push(b);
                                if (i < len - 1) { // start a new line
                                    result.push(part);
                                    part = [];
                                }
                            } else if (i === len - 1) {
                                part.push(b);
                            }
                            break;
                        } else if (codeA & codeB) { // trivial reject
                            break;
                        } else if (codeA) { // a outside, intersect with clip edge
                            a = intersect(a, b, codeA, bbox);
                            codeA = bitCode(a, bbox);
                        } else { // b outside
                            b = intersect(a, b, codeB, bbox);
                            codeB = bitCode(b, bbox);
                        }
                    }
                    codeA = lastCode;
                }
            
                if (part.length) result.push(part);
            
                if(result.length > 0){
                    result = result[0]
                    if(result.length === 2){
                        p1 = result[0];
                        p2 = result[1];
                        return {x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1]}
                    }
                }
                return null;
            }

            function findMaxInHough() {
                var max = 0;
                var bestRho = 0;
                var bestTheta = 0;
                for (var i = 0; i < angles; i++) {
                    for (var j = 0; j < accum[i].length; j++) {
                        if (accum[i][j] > max) {
                            max = accum[i][j];
                            bestRho = j;
                            bestTheta = i;
                        }
                    }
                }

                if (max > height) {
                    bestRho <<= 1; // accumulator is bitshifted
                    bestRho -= rhoMax; /// accumulator has rhoMax added
                    var a = self.cosTable[bestTheta];
                    var b = self.sinTable[bestTheta];

                    var x1 = (a * bestRho + 1000 * (-b))|0;
                    var y1 = (b * bestRho + 1000 * ( a))|0;
                    var x2 = (a * bestRho - 1000 * (-b))|0;
                    var y2 = (b * bestRho - 1000 * ( a))|0;
                    // return a line with P1(x1,y1) and P2(x2,y2)
                    // startpoint is ALWAYS on the downside
                    if(y1<y2){
                        return {x1:x2 + width / 2,  y1:y2 + height / 2, x2:x1 + width / 2,  y2:y1 + height / 2 };
                    }
                    else{
                        return {x1:x1 + width / 2,  y1:y1 + height / 2, x2:x2 + width / 2,  y2:y2 + height / 2 };
                    }
                }
                return null;
            }
            
            function houghAcc(x, y) {
                houghAccCalled= true;
                var rho;
                x -= width  / 2;
                y -= height / 2;
                for (var index = 0; index < angles; index++) {
                    rho = rhoMax + x * self.cosTable[index] + y * self.sinTable[index];
                    rho >>= 1;
                    if (accum[index] === undefined) accum[index] = [];
                    if (accum[index][rho] === undefined) {
                       accum[index][rho] = 1;
                    } else {
                       accum[index][rho]++;
                    }
                }
            }
            
            for (var index=0; index<pixels.length; index+=4) {
                // because we NEED a black/white image we can just use the RED part
                // if the RGBA color
                if(pixels[index]<80){
                    var x = (index/4) % width;
                    var y = (index/4) / width;
                    houghAcc(x,y);
                }
            }

            var line = houghAccCalled?findMaxInHough():null;
            
            var canvas = new OffscreenCanvas(width, height);
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.beginPath();
            ctx.fillRect(0,0, width, height);
            ctx.closePath();
            
            line = clipLine(line,width, height)
            angle = getAngle(line);
            if(line){
                var stroke = Math.max(2,(width/25)|0);
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255,0,0,1)';
                ctx.lineWidth = stroke;
                ctx.moveTo(line.x1, line.y1);
                ctx.lineTo(line.x2, line.y2);
                ctx.stroke();
                ctx.closePath();
                
                ctx.beginPath();
                ctx.arc(line.x1, line.y1, stroke/2+1, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#0000ff';
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(line.x2, line.y2, stroke/2+1, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#00FF00';
                ctx.fill();
                ctx.closePath();

                ctx.font = getFont();
                ctx.textBaseline = "top";
                ctx.fillStyle = "#d0d0d0";
                ctx.fillText(""+angle+"°" , 0, 0);
            }
            imageData = ctx.getImageData(0, 0, width, height);
            self.postMessage({imageData, angle}, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data.imageData;
            var angle = event.data.angle;
            // map the angle [0..180] to [0..5]
            angle = 5/180*angle;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                console.log(angle);
                this.getOutputPort("output_port1").setValue(image);
                this.getOutputPort("output_angle").setValue(angle);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;
       
        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_features_Object = CircuitFigure.extend({

   NAME: "video_features_Object",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:121,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4132231404958678, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.71485619834695, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 121;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L121,0 L121,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1,3Q1,0 4, 0L118,0Q121,0 121, 3L121,77Q121,80 118, 80L4,80Q1,80 1, 77L1,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,5.508584000000155Q4.5,3.5085840000001554 6.5, 3.5085840000001554L75.5,3.5085840000001554Q77.5,3.5085840000001554 77.5, 5.508584000000155L77.5,53.508584000000155Q77.5,55.508584000000155 75.5, 55.508584000000155L6.5,55.508584000000155Q4.5,55.508584000000155 4.5, 53.508584000000155L4.5,5.508584000000155');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(240,243,243,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M22.199999999999818 48.49629215999994L46.822380625916594 48.410392814080296L43.248545078531606 33.84124771412098L42.82709505194725 32.92176425057005L42.138921283378295 32.05903235089045L41.20493358454951 31.27926568728435L40.05351069907101 30.606157075243573L38.71963802866776 30.060158579344716L37.243844619459196 29.657860087585505L35.67097170739544 29.41148523607808L34.0488102399986 29.328520000000026L32.426648772601766 29.41148523607808L30.853775860538008 29.657860087585505L29.377982451329444 30.060158579344716L28.044109780926192 30.606157075243573L26.892686895447696 31.27926568728435L25.95869919661891 32.05903235089045L25.27052542804995 32.92176425057005L24.849075401465598 33.84124771412098Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8.5,"cx":33.69999999999982,"cy":17.828520000000026,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M19.199999999999818 8.450120000000425L48.19999999999982 8.450120000000425L48.19999999999982 32.450120000000425L19.199999999999818 32.450120000000425Z');
       shape.attr({"stroke":"rgba(70,176,25,1)","stroke-width":2,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Detect:');
       shape.attr({"x":4,"y":67.50858400000016,"text-anchor":"start","text":"Detect:","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // objectClass
       shape = this.canvas.paper.text(0,0,'person');
       shape.attr({"x":50,"y":66.96170900000016,"text-anchor":"start","text":"person","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#C71D3D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","objectClass");
       
       // Label
       shape = this.canvas.paper.text(0,0,'found');
       shape.attr({"x":88,"y":39.937895000000026,"text-anchor":"start","text":"found","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
video_features_Object = video_features_Object.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        
        this.objectClass = "person"
        this.on("change:userData.objectClass",(emitter, event)=>{
            this.layerAttr("objectClass", {text: event.value})
            this.objectClass = event.value;
        });
        this.on("added",(emitter, event)=>{
             this.layerAttr("objectClass", {text: this.attr("userData.objectClass")})
        });
        this.attr("userData.objectClass",this.objectClass)


        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()/6*4-6, 
            height: this.getHeight()/4*3-6,
            selectable: false,
            deleteable: false,
            resizeable:false,
            draggable: false,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false;
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));


        this.rectangleLocator =  new draw2d.layout.locator.XYAbsPortLocator({x:0, y:0});
        this.rectangle = new draw2d.shape.basic.Rectangle({
                        x: 0, y: 0,
                        width: 20, height: 20,
                        color: "#ff0000",
                        bgColor: null,
                        alpha  : 0.7,
                        visible:false,
                        radius: 5
                });
        this.add(this.rectangle, this.rectangleLocator)  ;
        this.rectangle.setVisible(false);
        this.rectangle.hitTest = ()=>false;
        
        this.model = null;
        // Initialize the Image Classifier method with MobileNet
        cocoSsd.load().then(model =>{
            this.model = model;
        });
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
        
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        if(this.model===null){
            return;
        }
        
        var image = this.getInputPort("input_port1").getValue();
        if (image instanceof HTMLImageElement) {
            this.img.attr("path", image.src);
            this.model.detect(image, 1).then(predictions => {
                if(predictions.length>0){
                    let pre = predictions[0];
                    if(pre.class === this.objectClass){
                       var height = this.getHeight()/4*3;
                       var width = this.getWidth()/6*4;
                       this.rectangle.setVisible(true);
                       let bbox = pre.bbox;
                       let x_percent = 100/image.naturalWidth * bbox[0];
                       let y_percent = 100/image.naturalHeight * bbox[1];
                       let w_percent = 100/image.naturalWidth * bbox[2];
                       let h_percent = 100/image.naturalHeight * bbox[3];
                     
                       this.rectangle.attr({width:width/100*w_percent, height:height/100*h_percent});
                       this.rectangleLocator.setX(width/100*x_percent);
                       this.rectangleLocator.setY(height/100*y_percent);
                       this.rectangleLocator.relocate(0, this.rectangle);
                       this.getOutputPort("output_port1").setValue(5.0);
                    }
                    else{
                        this.rectangle.setVisible(false);
                        this.getOutputPort("output_port1").setValue(0.0);
                    }
                }
                else{
                    this.rectangle.setVisible(false);
                    this.getOutputPort("output_port1").setValue(0.0);
                }
            });
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },
    
  
    getPersistentAttributes: function () 
    {
       let currentImage = this.img.attr("path");
       this.img.attr("path", this.TRANSPARENT_PIXEL);
    
       let memento = this._super()
    
       this.img.attr("path", currentImage);

       return memento
    },

    setPersistentAttributes: function (memento) 
    {
        this._super(memento);
        this.rectangle = this.getChildren().find( child => child instanceof draw2d.shape.basic.Rectangle);
        this.rectangle.setVisible(false);
        this.rectangle.hitTest = ()=>false;
 
        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image);
        this.img.hitTest = ()=>false;
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
        
        this.objectClass = this.attr("userData.objectClass")
    },
    
    
    getParameterSettings: function () {
        return [
            {
                name: "objectClass",
                label: "Type of Object to detect",
                property: {
                    type: "enum",
                    values: [
"person",
"bicycle",
"car",
"motorcycle",
"airplane",
"bus",
"train",
"truck",
"boat",
"traffic light",
"fire hydrant",
"stop sign",
"parking meter",
"bench",
"bird",
"cat",
"dog",
"horse",
"sheep",
"cow",
"elephant",
"bear",
"zebra",
"giraffe",
"backpack",
"umbrella",
"handbag",
"tie",
"suitcase",
"frisbee",
"skis",
"snowboard",
"sports ball",
"kite",
"baseball bat",
"baseball glove",
"skateboard",
"surfboard",
"tennis racket",
"bottle",
"wine glass",
"cup",
"fork",
"knife",
"spoon",
"bowl",
"banana",
"apple",
"sandwich",
"orange",
"broccoli",
"carrot",
"hot dog",
"pizza",
"donut",
"cake",
"chair",
"couch",
"potted plant",
"bed",
"dining table",
"toilet",
"tv",
"laptop",
"mouse",
"remote",
"keyboard",
"cell phone",
"microwave",
"oven",
"toaster",
"sink",
"refrigerator",
"book",
"clock",
"vase",
"scissors",
"teddy bear",
"hair drier",
"toothbrush"
]
                }

            }];
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_features_Scanner = CircuitFigure.extend({

   NAME: "video_features_Scanner",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:83.453125},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 47.822774761280606 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 47.822774761280606 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
     // output_port2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 80.28459090058041 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port2");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 83.453125;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,83.453125 L0,83.453125");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Scanner');
       shape.attr({"x":14.41088000000127,"y":71.453125,"text-anchor":"start","text":"Scanner","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#000000","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // PictureFrame
       shape = this.canvas.paper.path('M4.228799999999865,8.044239424005355Q4.228799999999865,4.0442394240053545 8.228799999999865, 4.0442394240053545L71.22879999999986,4.0442394240053545Q75.22879999999986,4.0442394240053545 75.22879999999986, 8.044239424005355L75.22879999999986,46.044239424005355Q75.22879999999986,50.044239424005355 71.22879999999986, 50.044239424005355L8.228799999999865,50.044239424005355Q4.228799999999865,50.044239424005355 4.228799999999865, 46.044239424005355L4.228799999999865,8.044239424005355');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","PictureFrame");
       
       // Rectangle
       shape = this.canvas.paper.path('M31.46390011292715 4.418223163842413L55.758017759986615 4.0442394240053545L43.250664818812766 12.505621537824481L38.77272364233795 21.527979261401924L38.46390011292624 50.044239424004445L27.758017759986615 50.044239424005355Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'+');
       shape.attr({"x":27.816251679999368,"y":37.225817212005495,"text-anchor":"start","text":"+","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#FF0000","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'position');
       shape.attr({"x":35.17650500000127,"y":55.972099999999955,"text-anchor":"start","text":"position","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M65.57327558593806 56.11871406249975L69.7862755859378,56.11871406249975L76.94837558593736,65.80861406250006');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M73.05801775999316 39.18620217199896L40.84053967998898,38.858807612009514');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,15,31,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M43.722181920001276 44.79038681200382L40.17947984000875,38.65598297201268L44.41625168000701,33.409250172013344');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,15,31,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M23.322181919997092 44.59038681199763L27.26827984000647,38.05598297200504L22.816251679999368,33.30925017200752');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,15,31,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M26.758017759986615 38.3862021719915L5.540539679985159,38.35880761200315');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,15,31,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_features_Scanner = video_features_Scanner.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels    = imageData.data;
            var width     = imageData.width;
            var height    = imageData.height;
            var leftSide  = width;
            var rightSide = 0;

            var matrix    = [ [1,1,1],
                              [1,1,1],
                              [1,1,1] ]; 
                              
            function checkMatrix(x,y){
        		var nx,ny;
        		var xC=parseInt(matrix[0].length/2);
        		var yC=parseInt(matrix.length/2);
        		var offset = (y*width+x)*4;
        		var hit = true;
    			for(var i=0; i<matrix.length; i++){
    				for(var j=0; j<matrix.length; j++){
    					if((i != yC || j != xC) && matrix[i][j]){
    						nx = x + (j-xC);
    						ny = y + (i-yC);
    						if(nx > 0 && nx < width && ny > 0 && ny < height){
                        		var outOffset = (ny*width+nx)*4;
    							hit = hit && pixels[outOffset]===0;
    							if(hit === false) {
    							    return false; // abort
    							}
    						}
    					}
    				}
    			}
    			return hit;
            }
            
            let bottom = parseInt(height/100*80);
            for (let i=2; i<(width-1); i++){
               if(checkMatrix(i,bottom)){
                   leftSide = i;
                   break;
               }    
            }
            for (let i=(width-2); i>0; i--){
               if(checkMatrix(i,bottom)){
                   rightSide = i;
                   break;
               }    
            }
            var canvas = new OffscreenCanvas(width, height);
            var ctx = canvas.getContext('2d');
            ctx.putImageData(imageData,0,0);

            let position = width/2;
            if(leftSide <=rightSide){
                let length =  height/100*8;
                position = parseInt((leftSide + rightSide )/2);
                
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255,0,0,1)';
                ctx.lineWidth = height/100*4;
                ctx.moveTo(leftSide, bottom);
                ctx.lineTo(rightSide,bottom);
                ctx.stroke();
                ctx.moveTo(position,bottom-length);
                ctx.lineTo(position,bottom+length);
                ctx.stroke();
                ctx.closePath();
            }
            imageData = ctx.getImageData(0, 0, width, height);
            self.postMessage({imageData, position}, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data.imageData;
            var position = event.data.position;
            // map the width [0..width] to [0..5]
            position = 5/imageData.width*position;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.getOutputPort("output_port2").setValue(position);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;
       
        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_filter_Emboss = CircuitFigure.extend({

   NAME: "video_filter_Emboss",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.04423942400535},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.24421560822089 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.24421560822089 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.04423942400535;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.04423942400535 L0,81.04423942400535");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Embose');
       shape.attr({"x":12.228799999999865,"y":68.54423942400535,"text-anchor":"start","text":"Embose","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow
       shape = this.canvas.paper.path('M37.31898911823282,49.08107850869237Q37.31898911823282,51.08107850869237 39.31888395146733, 51.10158840878765L49.319094284998314,51.20414545902051Q51.31898911823282,51.224655359115786 50.90607867073568, 49.267743260336765L48.31286185049548,36.977675520356634Q47.89995140299834,35.02076342157761 47.84167307749067, 34.43069753144073L47.84167307749067,34.43069753144073Q47.783394751982996,33.840631641303844 47.6103305328902, 33.268494604651096L47.6103305328902,33.268494604651096Q47.43726631379741,32.69635756799835 47.154674669841825, 32.15953347917139L47.154674669841825,32.15953347917139Q46.87208302588624,31.622709390344426 46.48855036117084, 31.137509377641436L46.48855036117084,31.137509377641436Q46.105017696455434,30.652309364938446 45.6321974569214, 30.23347598521468L45.6321974569214,30.23347598521468Q45.15937721738737,29.814642605490917 44.61163580675429, 29.474901899055112L44.61163580675429,29.474901899055112Q44.06389439612121,29.135161192619307 43.45787465998001, 28.884836008916864L43.45787465998001,28.884836008916864Q42.8518549238388,28.63451082521442 42.205970465211976, 28.48120716828589L42.205970465211976,28.48120716828589Q41.56008600658515,28.327903511357363 40.89396169791462, 28.276279435236574L40.89396169791462,28.276279435236574Q40.22783738924409,28.224655359115786 39.5617130805731, 28.276279435236574L39.5617130805731,28.276279435236574Q38.89558877190211,28.327903511357363 38.24970431327529, 28.48120716828589L38.24970431327529,28.48120716828589Q37.603819854648464,28.63451082521442 37.46140448644064, 28.693337545011218L37.46140448644064,28.693337545011218Q37.31898911823282,28.752164264808016 37.31898911823282, 30.752164264808016L37.31898911823282,49.08107850869237');
       shape.attr({"stroke":"rgba(255,255,255,1)","stroke-width":2,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow");
       
       // TOP_Circle
       shape = this.canvas.paper.path('M38.67362344960475 24.54496882107196L38.98139389101925 24.629850218838328L40.415416481778266 24.75898431823407L41.84943907253819 24.629850218838328L43.239889612527804 24.246371594914308L44.54451996569151 23.620200250402377L45.723689598924466 22.77036208474601L46.74157003960863 21.72267900056977L47.567233505626064 20.50898431823407L48.175592630367646 19.16615553650263L48.548162729673095 17.734993828403276L48.67362344960475 16.25898431823407L48.548162729673095 14.782974808064864L48.175592630367646 13.351813099965511L47.567233505626064 12.00898431823407L46.74157003960863 10.79528963589837L45.723689598924466 9.747606551722129L44.54451996569151 8.897768386065763L43.239889612527804 8.271597041553832L41.84943907253819 7.888118417629812L40.415416481778266 7.75898431823407L38.98139389101925 7.888118417629812L38.67362344960475 7.972999815396179L38.67362344960475 24.54496882107196Z');
       shape.attr({"stroke":"rgba(255,255,255,1)","stroke-width":2,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.038881344014044L38.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(26,12,112,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_filter_Emboss = video_filter_Emboss.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing ===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var opaque = true;
            var weights =[  1,   1,  1,  
                            1, 0.7, -1,  
                           -1,  -1, -1 ];
            var side     = Math.round(Math.sqrt(weights.length));
            var halfSide = Math.floor(side/2);

            var src = imageData.data;
            var sw = imageData.width;
            var sh = imageData.height;
            var w = sw;
            var h = sh;
            var dst = new Uint8ClampedArray(w*h*4);
            var alphaFac = opaque ? 1 : 0;

            for (var y=0; y < h; y++) {
              for (var x=0; x < w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y*w+x)*4;
                var r=0, g=0, b=0, a=0;
                for (var cy=0; cy<side; cy++) {
                  for (var cx=0; cx<side; cx++) {
                    var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                    var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                    var srcOff = (scy*sw+scx)*4;
                    var wt = weights[cy*side+cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff+1] * wt;
                    b += src[srcOff+2] * wt;
                    a += src[srcOff+3] * wt;
                  }
                }
                dst[dstOff] = r;
                dst[dstOff+1] = g;
                dst[dstOff+2] = b;
                dst[dstOff+3] = a + alphaFac*(255-a);
              }
            }
            imageData.data.set(dst);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_filter_Prewitt = CircuitFigure.extend({

   NAME: "video_filter_Prewitt",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.04423942400535},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.24421560822089 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.24421560822089 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.04423942400535;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.04423942400535 L0,81.04423942400535");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Prewitt');
       shape.attr({"x":15.228799999999865,"y":68.54423942400535,"text-anchor":"start","text":"Prewitt","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Shadow
       shape = this.canvas.paper.path('M38.81898911823282,48.09356345220658Q38.81898911823282,50.09356345220658 40.81886978802416, 50.11541079975606L48.81910844844148,50.202808011566304Q50.81898911823282,50.224655359115786 50.43037456504294, 48.26277393327756L48.276999915507304,37.391678928941374Q47.88838536231742,35.429797503103146 47.838432511882274, 34.89104169036955L47.838432511882274,34.89104169036955Q47.78847966144713,34.35228587763595 47.64013890222441, 33.829899887648025L47.64013890222441,33.829899887648025Q47.49179814300169,33.3075138976601 47.24957673389736, 32.81737016438365L47.24957673389736,32.81737016438365Q47.007355324793025,32.32722643110719 46.678613040751316, 31.884217723856636L46.678613040751316,31.884217723856636Q46.349870756709606,31.44120901660608 45.9445962656805, 31.05879593077134L45.9445962656805,31.05879593077134Q45.5393217746514,30.676382844936597 45.069829136965836, 30.36618480862535L45.069829136965836,30.36618480862535Q44.600336499280274,30.0559867723141 44.08089101115911, 29.827428995890386L44.08089101115911,29.827428995890386Q43.561445523037946,29.598871219466673 43.00783027278612, 29.4588983153144L43.00783027278612,29.4588983153144Q42.4542150225343,29.318925411162127 41.88325132938871, 29.271790385138956L41.88325132938871,29.271790385138956Q41.31228763624313,29.224655359115786 40.74132394309618, 29.271790385138956L40.74132394309618,29.271790385138956Q40.170360249949226,29.318925411162127 39.6167449996974, 29.4588983153144L39.6167449996974,29.4588983153144Q39.06312974944558,29.598871219466673 38.9410594338392, 29.652582572324718L38.9410594338392,29.652582572324718Q38.81898911823282,29.706293925182763 38.81898911823282, 31.706293925182763L38.81898911823282,48.09356345220658');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":2,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow");
       
       // TOP_Circle
       shape = this.canvas.paper.path('M39.17362344960475 23.57014711485499L39.41983980273653 23.64504246582692L40.56705787534429 23.75898431823407L41.71427594795114 23.64504246582692L42.82663637994392 23.306678974127863L43.87034066247361 22.754174846618298L44.813676369059976 22.004317641627495L45.627980721607855 21.07989139088386L46.28851149442198 20.00898431823407L46.7751987942147 18.82413539317713L47.0732548736587 17.561345650736257L47.17362344960475 16.25898431823407L47.0732548736587 14.956622985731883L46.7751987942147 13.69383324329101L46.28851149442198 12.50898431823407L45.627980721607855 11.438077245584282L44.813676369059976 10.513650994840646L43.87034066247361 9.763793789849842L42.82663637994392 9.211289662340278L41.71427594795114 8.872926170641222L40.56705787534429 8.75898431823407L39.41983980273653 8.872926170641222L39.17362344960475 8.94782152161315L39.17362344960475 23.57014711485499Z');
       shape.attr({"stroke":"rgba(13,13,13,1)","stroke-width":2,"fill":"rgba(255,253,253,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.038881344014044L38.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_filter_Prewitt = video_filter_Prewitt.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels    = imageData.data;
            var w = imageData.width;
            var h = imageData.height;

            var kernelX   =[ -1, 0,  1,  
                             -1, 0,  1,  
                             -1, 0,  1 ];
                             
            var kernelY   =[ -1, -1, -1,  
                              0,  0,  0,  
                              1,  1,  1 ];
                           
            function convolut(weights, src, w, h){
                var side     = Math.round(Math.sqrt(weights.length));
                var halfSide = Math.floor(side/2);
                var sw = w;
                var sh = h;

                var dst = new Uint8ClampedArray(w*h*4);

                for (var y=0; y < h; y++) {
                    for (var x=0; x < w; x++) {
                        var sy = y;
                        var sx = x;
                        var dstOff = (y*w+x)*4;
                        var r=0, g=0, b=0, a=0;
                        for (var cy=0; cy<side; cy++) {
                            for (var cx=0; cx<side; cx++) {
                                var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                                var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                                var srcOff = (scy*sw+scx)*4;
                                var wt = weights[cy*side+cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff+1] * wt;
                                b += src[srcOff+2] * wt;
                            }
                        }
                        dst[dstOff]   = r;
                        dst[dstOff+1] = g;
                        dst[dstOff+2] = b;
                        dst[dstOff+3] = src[dstOff+3];
                    }
                }
                return dst;
            }

            var dstX = convolut(kernelX, pixels, w, h);
            var dstY = convolut(kernelY, pixels, w, h);
            for (var i=0; i < dstX.length; i++) {
                var edgeX = dstX[i];
                var edgeY = dstY[i]; 
                dstX[i] = Math.min(255,Math.round(Math.sqrt(edgeX * edgeX + edgeY * edgeY)));
            }
            
            imageData.data.set(dstX);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();

        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;
        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_filter_PrewittInvers = CircuitFigure.extend({

   NAME: "video_filter_PrewittInvers",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.04423942400535},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.24421560822089 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.24421560822089 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.04423942400535;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.04423942400535 L0,81.04423942400535");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Prewitt');
       shape.attr({"x":15.228799999999865,"y":68.54423942400535,"text-anchor":"start","text":"Prewitt","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Shadow
       shape = this.canvas.paper.path('M38.81898911823282,48.09356345220658Q38.81898911823282,50.09356345220658 40.81886978802416, 50.11541079975606L48.81910844844148,50.202808011566304Q50.81898911823282,50.224655359115786 50.43037456504294, 48.26277393327756L48.276999915507304,37.391678928941374Q47.88838536231742,35.429797503103146 47.838432511882274, 34.89104169036955L47.838432511882274,34.89104169036955Q47.78847966144713,34.35228587763595 47.64013890222441, 33.829899887648025L47.64013890222441,33.829899887648025Q47.49179814300169,33.3075138976601 47.24957673389736, 32.81737016438365L47.24957673389736,32.81737016438365Q47.007355324793025,32.32722643110719 46.678613040751316, 31.884217723856636L46.678613040751316,31.884217723856636Q46.349870756709606,31.44120901660608 45.9445962656805, 31.05879593077134L45.9445962656805,31.05879593077134Q45.5393217746514,30.676382844936597 45.069829136965836, 30.36618480862535L45.069829136965836,30.36618480862535Q44.600336499280274,30.0559867723141 44.08089101115911, 29.827428995890386L44.08089101115911,29.827428995890386Q43.561445523037946,29.598871219466673 43.00783027278612, 29.4588983153144L43.00783027278612,29.4588983153144Q42.4542150225343,29.318925411162127 41.88325132938871, 29.271790385138956L41.88325132938871,29.271790385138956Q41.31228763624313,29.224655359115786 40.74132394309618, 29.271790385138956L40.74132394309618,29.271790385138956Q40.170360249949226,29.318925411162127 39.6167449996974, 29.4588983153144L39.6167449996974,29.4588983153144Q39.06312974944558,29.598871219466673 38.9410594338392, 29.652582572324718L38.9410594338392,29.652582572324718Q38.81898911823282,29.706293925182763 38.81898911823282, 31.706293925182763L38.81898911823282,48.09356345220658');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":2,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow");
       
       // TOP_Circle
       shape = this.canvas.paper.path('M39.17362344960475 23.57014711485499L39.41983980273653 23.64504246582692L40.56705787534429 23.75898431823407L41.71427594795114 23.64504246582692L42.82663637994392 23.306678974127863L43.87034066247361 22.754174846618298L44.813676369059976 22.004317641627495L45.627980721607855 21.07989139088386L46.28851149442198 20.00898431823407L46.7751987942147 18.82413539317713L47.0732548736587 17.561345650736257L47.17362344960475 16.25898431823407L47.0732548736587 14.956622985731883L46.7751987942147 13.69383324329101L46.28851149442198 12.50898431823407L45.627980721607855 11.438077245584282L44.813676369059976 10.513650994840646L43.87034066247361 9.763793789849842L42.82663637994392 9.211289662340278L41.71427594795114 8.872926170641222L40.56705787534429 8.75898431823407L39.41983980273653 8.872926170641222L39.17362344960475 8.94782152161315L39.17362344960475 23.57014711485499Z');
       shape.attr({"stroke":"rgba(13,13,13,1)","stroke-width":2,"fill":"rgba(255,253,253,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.038881344014044L38.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_filter_PrewittInvers = video_filter_PrewittInvers.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels    = imageData.data;
            var w = imageData.width;
            var h = imageData.height;

            var kernelX   =[ -1, 0,  1,  
                             -1, 0,  1,  
                             -1, 0,  1 ];
                             
            var kernelY   =[ -1, -1, -1,  
                              0,  0,  0,  
                              1,  1,  1 ];
                           
            function convolut(weights, src, w, h){
                var side     = Math.round(Math.sqrt(weights.length));
                var halfSide = Math.floor(side/2);
                var sw = w;
                var sh = h;

                var dst = new Uint8ClampedArray(w*h*4);

                for (var y=0; y < h; y++) {
                    for (var x=0; x < w; x++) {
                        var sy = y;
                        var sx = x;
                        var dstOff = (y*w+x)*4;
                        var r=0, g=0, b=0, a=0;
                        for (var cy=0; cy<side; cy++) {
                            for (var cx=0; cx<side; cx++) {
                                var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                                var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                                var srcOff = (scy*sw+scx)*4;
                                var wt = weights[cy*side+cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff+1] * wt;
                                b += src[srcOff+2] * wt;
                            }
                        }
                        dst[dstOff]   = r;
                        dst[dstOff+1] = g;
                        dst[dstOff+2] = b;
                        dst[dstOff+3] = 0;
                    }
                }
                return dst;
            }

            var dstX = convolut(kernelX, pixels, w, h);
            var dstY = convolut(kernelY, pixels, w, h);
            for (var i=0; i < dstX.length; i++) {
                var edgeX = dstX[i];
                var edgeY = dstY[i]; 
                dstX[i] = 255-Math.min(255,Math.round(Math.sqrt(edgeX * edgeX + edgeY * edgeY)));
            }
            
            imageData.data.set(dstX);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();

        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_filter_Roberts = CircuitFigure.extend({

   NAME: "video_filter_Roberts",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.04423942400535},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.24421560822089 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.24421560822089 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.04423942400535;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.04423942400535 L0,81.04423942400535");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Roberts');
       shape.attr({"x":13.228799999999865,"y":68.54423942400535,"text-anchor":"start","text":"Roberts","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M38.728320000003805,7.16335971200624Q38.728320000003805,3.1633597120062404 42.728320000003805, 3.1633597120062404L71.42848000000322,3.1633597120062404Q75.42848000000322,3.1633597120062404 75.42848000000322, 7.16335971200624L75.42848000000322,51.91983971200625Q75.42848000000322,55.91983971200625 71.42848000000322, 55.91983971200625L42.728320000003805,55.91983971200625Q38.728320000003805,55.91983971200625 38.728320000003805, 51.91983971200625L38.728320000003805,7.16335971200624');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M38.81898911823282,48.09356345220658Q38.81898911823282,50.09356345220658 40.81886978802416, 50.11541079975606L48.81910844844148,50.202808011566304Q50.81898911823282,50.224655359115786 50.43037456504294, 48.26277393327756L48.276999915507304,37.391678928941374Q47.88838536231742,35.429797503103146 47.838432511882274, 34.89104169036955L47.838432511882274,34.89104169036955Q47.78847966144713,34.35228587763595 47.64013890222441, 33.829899887648025L47.64013890222441,33.829899887648025Q47.49179814300169,33.3075138976601 47.24957673389736, 32.81737016438365L47.24957673389736,32.81737016438365Q47.007355324793025,32.32722643110719 46.678613040751316, 31.884217723856636L46.678613040751316,31.884217723856636Q46.349870756709606,31.44120901660608 45.9445962656805, 31.05879593077134L45.9445962656805,31.05879593077134Q45.5393217746514,30.676382844936597 45.069829136965836, 30.36618480862535L45.069829136965836,30.36618480862535Q44.600336499280274,30.0559867723141 44.08089101115911, 29.827428995890386L44.08089101115911,29.827428995890386Q43.561445523037946,29.598871219466673 43.00783027278612, 29.4588983153144L43.00783027278612,29.4588983153144Q42.4542150225343,29.318925411162127 41.88325132938871, 29.271790385138956L41.88325132938871,29.271790385138956Q41.31228763624313,29.224655359115786 40.74132394309618, 29.271790385138956L40.74132394309618,29.271790385138956Q40.170360249949226,29.318925411162127 39.6167449996974, 29.4588983153144L39.6167449996974,29.4588983153144Q39.06312974944558,29.598871219466673 38.9410594338392, 29.652582572324718L38.9410594338392,29.652582572324718Q38.81898911823282,29.706293925182763 38.81898911823282, 31.706293925182763L38.81898911823282,48.09356345220658');
       shape.attr({"stroke":"rgba(110,110,110,1)","stroke-width":1,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Show_Circle
       shape = this.canvas.paper.path('M38.67362344960475 23.57014711485499L38.91983980273653 23.64504246582692L40.06705787534429 23.75898431823407L41.21427594795114 23.64504246582692L42.32663637994392 23.306678974127863L43.37034066247361 22.754174846618298L44.313676369059976 22.004317641627495L45.127980721607855 21.07989139088386L45.78851149442198 20.00898431823407L46.2751987942147 18.82413539317713L46.5732548736587 17.561345650736257L46.67362344960475 16.25898431823407L46.5732548736587 14.956622985731883L46.2751987942147 13.69383324329101L45.78851149442198 12.50898431823407L45.127980721607855 11.438077245584282L44.313676369059976 10.513650994840646L43.37034066247361 9.763793789849842L42.32663637994392 9.211289662340278L41.21427594795114 8.872926170641222L40.06705787534429 8.75898431823407L38.91983980273653 8.872926170641222L38.67362344960475 8.94782152161315L38.67362344960475 23.57014711485499Z');
       shape.attr({"stroke":"rgba(107,107,107,1)","stroke-width":1,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Show_Circle");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.038881344014044L38.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_filter_Roberts = video_filter_Roberts.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels    = imageData.data;
            var w = imageData.width;
            var h = imageData.height;

            var kernelX   =[ 1,  0,
                             0, -1 ];
                             
            var kernelY   =[ 0, 1,
                            -1, 0 ];
                           
            function convolut(weights, src, w, h){
                var side     = Math.round(Math.sqrt(weights.length));
                var halfSide = Math.floor(side/2);
                var sw = w;
                var sh = h;

                var dst = new Uint8ClampedArray(w*h*4);

                for (var y=0; y < h; y++) {
                    for (var x=0; x < w; x++) {
                        var sy = y;
                        var sx = x;
                        var dstOff = (y*w+x)*4;
                        var r=0, g=0, b=0, a=0;
                        for (var cy=0; cy<side; cy++) {
                            for (var cx=0; cx<side; cx++) {
                                var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                                var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                                var srcOff = (scy*sw+scx)*4;
                                var wt = weights[cy*side+cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff+1] * wt;
                                b += src[srcOff+2] * wt;
                            }
                        }
                        dst[dstOff]   = r;
                        dst[dstOff+1] = g;
                        dst[dstOff+2] = b;
                        dst[dstOff+3] = src[dstOff+3];
                    }
                }
                return dst;
            }

            var dstX = convolut(kernelX, pixels, w, h);
            var dstY = convolut(kernelY, pixels, w, h);
            for (var i=0; i < dstX.length; i++) {
                var edgeX = dstX[i];
                var edgeY = dstY[i]; 
                dstX[i] = Math.min(255,Math.round(Math.sqrt(edgeX * edgeX + edgeY * edgeY)));
            }
            
            imageData.data.set(dstX);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();

        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_filter_RobertsInvers = CircuitFigure.extend({

   NAME: "video_filter_RobertsInvers",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.04423942400535},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.24421560822089 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.24421560822089 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.04423942400535;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.04423942400535 L0,81.04423942400535");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Roberts');
       shape.attr({"x":13.228799999999865,"y":68.54423942400535,"text-anchor":"start","text":"Roberts","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // PictureFrame
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","PictureFrame");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M38.19640448001155,8.038881344014044Q38.19640448001155,4.038881344014044 42.19640448001155, 4.038881344014044L71.19640448001155,4.038881344014044Q75.19640448001155,4.038881344014044 75.19640448001155, 8.038881344014044L75.19640448001155,51.038881344014044Q75.19640448001155,55.038881344014044 71.19640448001155, 55.038881344014044L42.19640448001155,55.038881344014044Q38.19640448001155,55.038881344014044 38.19640448001155, 51.038881344014044L38.19640448001155,8.038881344014044');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":2,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M38.81898911823282,48.09356345220658Q38.81898911823282,50.09356345220658 40.81886978802416, 50.11541079975606L48.81910844844148,50.202808011566304Q50.81898911823282,50.224655359115786 50.43037456504294, 48.26277393327756L48.276999915507304,37.391678928941374Q47.88838536231742,35.429797503103146 47.838432511882274, 34.89104169036955L47.838432511882274,34.89104169036955Q47.78847966144713,34.35228587763595 47.64013890222441, 33.829899887648025L47.64013890222441,33.829899887648025Q47.49179814300169,33.3075138976601 47.24957673389736, 32.81737016438365L47.24957673389736,32.81737016438365Q47.007355324793025,32.32722643110719 46.678613040751316, 31.884217723856636L46.678613040751316,31.884217723856636Q46.349870756709606,31.44120901660608 45.9445962656805, 31.05879593077134L45.9445962656805,31.05879593077134Q45.5393217746514,30.676382844936597 45.069829136965836, 30.36618480862535L45.069829136965836,30.36618480862535Q44.600336499280274,30.0559867723141 44.08089101115911, 29.827428995890386L44.08089101115911,29.827428995890386Q43.561445523037946,29.598871219466673 43.00783027278612, 29.4588983153144L43.00783027278612,29.4588983153144Q42.4542150225343,29.318925411162127 41.88325132938871, 29.271790385138956L41.88325132938871,29.271790385138956Q41.31228763624313,29.224655359115786 40.74132394309618, 29.271790385138956L40.74132394309618,29.271790385138956Q40.170360249949226,29.318925411162127 39.6167449996974, 29.4588983153144L39.6167449996974,29.4588983153144Q39.06312974944558,29.598871219466673 38.9410594338392, 29.652582572324718L38.9410594338392,29.652582572324718Q38.81898911823282,29.706293925182763 38.81898911823282, 31.706293925182763L38.81898911823282,48.09356345220658');
       shape.attr({"stroke":"rgba(219,219,219,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Circle
       shape = this.canvas.paper.path('M39.17362344960475 23.57014711485499L39.41983980273653 23.64504246582692L40.56705787534429 23.75898431823407L41.71427594795114 23.64504246582692L42.82663637994392 23.306678974127863L43.87034066247361 22.754174846618298L44.813676369059976 22.004317641627495L45.627980721607855 21.07989139088386L46.28851149442198 20.00898431823407L46.7751987942147 18.82413539317713L47.0732548736587 17.561345650736257L47.17362344960475 16.25898431823407L47.0732548736587 14.956622985731883L46.7751987942147 13.69383324329101L46.28851149442198 12.50898431823407L45.627980721607855 11.438077245584282L44.813676369059976 10.513650994840646L43.87034066247361 9.763793789849842L42.82663637994392 9.211289662340278L41.71427594795114 8.872926170641222L40.56705787534429 8.75898431823407L39.41983980273653 8.872926170641222L39.17362344960475 8.94782152161315L39.17362344960475 23.57014711485499Z');
       shape.attr({"stroke":"rgba(115,115,115,1)","stroke-width":1,"fill":"rgba(255,253,253,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Circle");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.5874573440150925L38.864176640010555,54.544239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_filter_RobertsInvers = video_filter_RobertsInvers.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels    = imageData.data;
            var w = imageData.width;
            var h = imageData.height;

            var kernelX   =[ 1,  0,
                             0, -1 ];
                             
            var kernelY   =[ 0, 1,
                            -1, 0 ];
                           
            function convolut(weights, src, w, h){
                var side     = Math.round(Math.sqrt(weights.length));
                var halfSide = Math.floor(side/2);
                var sw = w;
                var sh = h;

                var dst = new Uint8ClampedArray(w*h*4);

                for (var y=0; y < h; y++) {
                    for (var x=0; x < w; x++) {
                        var sy = y;
                        var sx = x;
                        var dstOff = (y*w+x)*4;
                        var r=0, g=0, b=0, a=0;
                        for (var cy=0; cy<side; cy++) {
                            for (var cx=0; cx<side; cx++) {
                                var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                                var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                                var srcOff = (scy*sw+scx)*4;
                                var wt = weights[cy*side+cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff+1] * wt;
                                b += src[srcOff+2] * wt;
                            }
                        }
                        dst[dstOff]   = r;
                        dst[dstOff+1] = g;
                        dst[dstOff+2] = b;
                        dst[dstOff+3] = 0;
                    }
                }
                return dst;
            }

            var dstX = convolut(kernelX, pixels, w, h);
            var dstY = convolut(kernelY, pixels, w, h);
            for (var i=0; i < dstX.length; i++) {
                var edgeX = dstX[i];
                var edgeY = dstY[i]; 
                dstX[i] = 255-Math.min(255,Math.round(Math.sqrt(edgeX * edgeX + edgeY * edgeY)));
            }
            
            imageData.data.set(dstX);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();

        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_filter_Sobel = CircuitFigure.extend({

   NAME: "video_filter_Sobel",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Sobel');
       shape.attr({"x":20.228799999999865,"y":67.37877759999992,"text-anchor":"start","text":"Sobel","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Shadow_Background
       shape = this.canvas.paper.path('M37.864176640010555,7.770740800002386Q37.864176640010555,3.770740800002386 41.864176640010555, 3.770740800002386L70.86417664001056,3.770740800002386Q74.86417664001056,3.770740800002386 74.86417664001056, 7.770740800002386L74.86417664001056,51.770740800002386Q74.86417664001056,55.770740800002386 70.86417664001056, 55.770740800002386L41.864176640010555,55.770740800002386Q37.864176640010555,55.770740800002386 37.864176640010555, 51.770740800002386L37.864176640010555,7.770740800002386');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Background");
       
       // Shadow_Circle
       shape = this.canvas.paper.path('M38.67362344960475 23.57014711485499L38.91983980273653 23.64504246582692L40.06705787534429 23.75898431823407L41.21427594795114 23.64504246582692L42.32663637994392 23.306678974127863L43.37034066247361 22.754174846618298L44.313676369059976 22.004317641627495L45.127980721607855 21.07989139088386L45.78851149442198 20.00898431823407L46.2751987942147 18.82413539317713L46.5732548736587 17.561345650736257L46.67362344960475 16.25898431823407L46.5732548736587 14.956622985731883L46.2751987942147 13.69383324329101L45.78851149442198 12.50898431823407L45.127980721607855 11.438077245584282L44.313676369059976 10.513650994840646L43.37034066247361 9.763793789849842L42.32663637994392 9.211289662340278L41.21427594795114 8.872926170641222L40.06705787534429 8.75898431823407L38.91983980273653 8.872926170641222L38.67362344960475 8.94782152161315L38.67362344960475 23.57014711485499Z');
       shape.attr({"stroke":"rgba(117,117,117,1)","stroke-width":3,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Circle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M38.81898911823282,48.09356345220658Q38.81898911823282,50.09356345220658 40.81886978802416, 50.11541079975606L48.81910844844148,50.202808011566304Q50.81898911823282,50.224655359115786 50.43037456504294, 48.26277393327756L48.276999915507304,37.391678928941374Q47.88838536231742,35.429797503103146 47.838432511882274, 34.89104169036955L47.838432511882274,34.89104169036955Q47.78847966144713,34.35228587763595 47.64013890222441, 33.829899887648025L47.64013890222441,33.829899887648025Q47.49179814300169,33.3075138976601 47.24957673389736, 32.81737016438365L47.24957673389736,32.81737016438365Q47.007355324793025,32.32722643110719 46.678613040751316, 31.884217723856636L46.678613040751316,31.884217723856636Q46.349870756709606,31.44120901660608 45.9445962656805, 31.05879593077134L45.9445962656805,31.05879593077134Q45.5393217746514,30.676382844936597 45.069829136965836, 30.36618480862535L45.069829136965836,30.36618480862535Q44.600336499280274,30.0559867723141 44.08089101115911, 29.827428995890386L44.08089101115911,29.827428995890386Q43.561445523037946,29.598871219466673 43.00783027278612, 29.4588983153144L43.00783027278612,29.4588983153144Q42.4542150225343,29.318925411162127 41.88325132938871, 29.271790385138956L41.88325132938871,29.271790385138956Q41.31228763624313,29.224655359115786 40.74132394309618, 29.271790385138956L40.74132394309618,29.271790385138956Q40.170360249949226,29.318925411162127 39.6167449996974, 29.4588983153144L39.6167449996974,29.4588983153144Q39.06312974944558,29.598871219466673 38.9410594338392, 29.652582572324718L38.9410594338392,29.652582572324718Q38.81898911823282,29.706293925182763 38.81898911823282, 31.706293925182763L38.81898911823282,48.09356345220658');
       shape.attr({"stroke":"rgba(196,196,196,1)","stroke-width":3,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.709969984015515L38.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_filter_Sobel = video_filter_Sobel.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels    = imageData.data;
            var w = imageData.width;
            var h = imageData.height;

            var kernelX   =[ -1, 0,  1,  
                             -2, 0,  2,  
                             -1, 0,  1 ];
                             
            var kernelY   =[ -1, -2, -1,  
                              0,  0,  0,  
                              1,  2,  1 ];
                           
            function convolut(weights, src, w, h){
                var side     = Math.round(Math.sqrt(weights.length));
                var halfSide = Math.floor(side/2);
                var sw = w;
                var sh = h;

                var dst = new Uint8ClampedArray(w*h*4);

                for (var y=0; y < h; y++) {
                    for (var x=0; x < w; x++) {
                        var sy = y;
                        var sx = x;
                        var dstOff = (y*w+x)*4;
                        var r=0, g=0, b=0, a=0;
                        for (var cy=0; cy<side; cy++) {
                            for (var cx=0; cx<side; cx++) {
                                var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                                var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                                var srcOff = (scy*sw+scx)*4;
                                var wt = weights[cy*side+cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff+1] * wt;
                                b += src[srcOff+2] * wt;
                            }
                        }
                        dst[dstOff]   = r;
                        dst[dstOff+1] = g;
                        dst[dstOff+2] = b;
                        dst[dstOff+3] = src[dstOff+3];
                    }
                }
                return dst;
            }

            var dstX = convolut(kernelX, pixels, w, h);
            var dstY = convolut(kernelY, pixels, w, h);
            for (var i=0; i < dstX.length; i++) {
                var edgeX = dstX[i];
                var edgeY = dstY[i]; 
                dstX[i] = Math.min(255,Math.round(Math.sqrt(edgeX * edgeX + edgeY * edgeY)));
            }
            
            imageData.data.set(dstX);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();

        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_filter_SobelInvers = CircuitFigure.extend({

   NAME: "video_filter_SobelInvers",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Sobel');
       shape.attr({"x":20.228799999999865,"y":67.37877759999992,"text-anchor":"start","text":"Sobel","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,47.276768974949896Q28.81898911823282,51.224655359115786 32.81880873597436, 51.262642534977275L46.90091030048609,51.39638338325396Q50.900729918227626,51.43437055911545 50.01211395841982, 47.53432419067637L48.22418747803842,39.68729409867167Q47.33557151823061,35.78724773023259 47.27480253027943, 35.21745662722515L47.27480253027943,35.21745662722515Q47.21403354232825,34.6476655242177 47.03357301342339, 34.0951872355472L47.03357301342339,34.0951872355472Q46.85311248451853,33.5427089468767 46.558443616512704, 33.02433024577522L46.558443616512704,33.02433024577522Q46.263774748506876,32.505951544673735 45.86385090584463, 32.037423105665766L45.86385090584463,32.037423105665766Q45.46392706318238,31.568894666657798 44.97089972945241, 31.16445248927039L44.97089972945241,31.16445248927039Q44.47787239572244,30.76001031188298 43.906721956976526, 30.431943167022382L43.906721956976526,30.431943167022382Q43.33557151823061,30.103876022161785 42.70365209153351, 29.86215206401357L42.70365209153351,29.86215206401357Q42.07173266483642,29.620428105865358 41.39824480220159, 29.472391994582267L41.39824480220159,29.472391994582267Q40.72475693956676,29.324355883299177 40.03016422889914, 29.27450562120748L40.03016422889914,29.27450562120748Q39.33557151823152,29.224655359115786 38.64097880756344, 29.27450562120748L38.64097880756344,29.27450562120748Q37.94638609689537,29.324355883299177 37.27289823426054, 29.472391994582267L37.27289823426054,29.472391994582267Q36.59941037162571,29.620428105865358 35.96749094492861, 29.86215206401357L35.96749094492861,29.86215206401357Q35.33557151823152,30.103876022161785 34.7644210794856, 30.431943167022382L34.7644210794856,30.431943167022382Q34.193270640739684,30.76001031188298 33.700243307009714, 31.16445248927039L33.700243307009714,31.16445248927039Q33.207215973279745,31.568894666657798 32.8072921306175, 32.037423105665766L32.8072921306175,32.037423105665766Q32.40736828795525,32.505951544673735 32.11269941994942, 33.02433024577522L32.11269941994942,33.02433024577522Q31.818030551943593,33.5427089468767 31.637570023038734, 34.0951872355472L31.637570023038734,34.0951872355472Q31.457109494133874,34.6476655242177 31.396340506182696, 35.21745662722515L31.396340506182696,35.21745662722515Q31.335571518231518,35.78724773023259 30.69199316424689, 39.735134114398484L29.462567472217447,47.276768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Shadow_Background
       shape = this.canvas.paper.path('M38.69640448001155,8.770740800002386Q38.69640448001155,3.770740800002386 43.69640448001155, 3.770740800002386L70.69640448001155,3.770740800002386Q75.69640448001155,3.770740800002386 75.69640448001155, 8.770740800002386L75.69640448001155,50.770740800002386Q75.69640448001155,55.770740800002386 70.69640448001155, 55.770740800002386L43.69640448001155,55.770740800002386Q38.69640448001155,55.770740800002386 38.69640448001155, 50.770740800002386L38.69640448001155,8.770740800002386');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Background");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M38.81898911823282,48.09356345220658Q38.81898911823282,50.09356345220658 40.81886978802416, 50.11541079975606L48.81910844844148,50.202808011566304Q50.81898911823282,50.224655359115786 50.43037456504294, 48.26277393327756L48.276999915507304,37.391678928941374Q47.88838536231742,35.429797503103146 47.838432511882274, 34.89104169036955L47.838432511882274,34.89104169036955Q47.78847966144713,34.35228587763595 47.64013890222441, 33.829899887648025L47.64013890222441,33.829899887648025Q47.49179814300169,33.3075138976601 47.24957673389736, 32.81737016438365L47.24957673389736,32.81737016438365Q47.007355324793025,32.32722643110719 46.678613040751316, 31.884217723856636L46.678613040751316,31.884217723856636Q46.349870756709606,31.44120901660608 45.9445962656805, 31.05879593077134L45.9445962656805,31.05879593077134Q45.5393217746514,30.676382844936597 45.069829136965836, 30.36618480862535L45.069829136965836,30.36618480862535Q44.600336499280274,30.0559867723141 44.08089101115911, 29.827428995890386L44.08089101115911,29.827428995890386Q43.561445523037946,29.598871219466673 43.00783027278612, 29.4588983153144L43.00783027278612,29.4588983153144Q42.4542150225343,29.318925411162127 41.88325132938871, 29.271790385138956L41.88325132938871,29.271790385138956Q41.31228763624313,29.224655359115786 40.74132394309618, 29.271790385138956L40.74132394309618,29.271790385138956Q40.170360249949226,29.318925411162127 39.6167449996974, 29.4588983153144L39.6167449996974,29.4588983153144Q39.06312974944558,29.598871219466673 38.9410594338392, 29.652582572324718L38.9410594338392,29.652582572324718Q38.81898911823282,29.706293925182763 38.81898911823282, 31.706293925182763L38.81898911823282,48.09356345220658');
       shape.attr({"stroke":"rgba(166,166,166,1)","stroke-width":3,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Circle
       shape = this.canvas.paper.path('M39.17362344960475 23.57014711485499L39.41983980273653 23.64504246582692L40.56705787534429 23.75898431823407L41.71427594795114 23.64504246582692L42.82663637994392 23.306678974127863L43.87034066247361 22.754174846618298L44.813676369059976 22.004317641627495L45.627980721607855 21.07989139088386L46.28851149442198 20.00898431823407L46.7751987942147 18.82413539317713L47.0732548736587 17.561345650736257L47.17362344960475 16.25898431823407L47.0732548736587 14.956622985731883L46.7751987942147 13.69383324329101L46.28851149442198 12.50898431823407L45.627980721607855 11.438077245584282L44.813676369059976 10.513650994840646L43.87034066247361 9.763793789849842L42.82663637994392 9.211289662340278L41.71427594795114 8.872926170641222L40.56705787534429 8.75898431823407L39.41983980273653 8.872926170641222L39.17362344960475 8.94782152161315L39.17362344960475 23.57014711485499Z');
       shape.attr({"stroke":"rgba(161,161,161,1)","stroke-width":3,"fill":"rgba(255,253,253,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Circle");
       
       // Line
       shape = this.canvas.paper.path('M39.19640448001155 4.038881344014044L39.364176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_filter_SobelInvers = video_filter_SobelInvers.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels    = imageData.data;
            var w = imageData.width;
            var h = imageData.height;

            var kernelX   =[ -1, 0,  1,  
                             -2, 0,  2,  
                             -1, 0,  1 ];
                             
            var kernelY   =[ -1, -2, -1,  
                              0,  0,  0,  
                              1,  2,  1 ];
                           
            function convolut(weights, src, w, h){
                var side     = Math.round(Math.sqrt(weights.length));
                var halfSide = Math.floor(side/2);
                var sw = w;
                var sh = h;

                var dst = new Uint8ClampedArray(w*h*4);

                for (var y=0; y < h; y++) {
                    for (var x=0; x < w; x++) {
                        var sy = y;
                        var sx = x;
                        var dstOff = (y*w+x)*4;
                        var r=0, g=0, b=0, a=0;
                        for (var cy=0; cy<side; cy++) {
                            for (var cx=0; cx<side; cx++) {
                                var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                                var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                                var srcOff = (scy*sw+scx)*4;
                                var wt = weights[cy*side+cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff+1] * wt;
                                b += src[srcOff+2] * wt;
                            }
                        }
                        dst[dstOff]   = r;
                        dst[dstOff+1] = g;
                        dst[dstOff+2] = b;
                        dst[dstOff+3] = 0;
                    }
                }
                return dst;
            }

            var dstX = convolut(kernelX, pixels, w, h);
            var dstY = convolut(kernelY, pixels, w, h);
            for (var i=0; i < dstX.length; i++) {
                var edgeX = dstX[i];
                var edgeY = dstY[i]; 
                dstX[i] = 255-Math.min(255,Math.round(Math.sqrt(edgeX * edgeX + edgeY * edgeY)));
            }
            
            imageData.data.set(dstX);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();

        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_geometry_FlipHorizontal = CircuitFigure.extend({

   NAME: "video_geometry_FlipHorizontal",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80.35023911823282,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9597980148700479, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.88775500953986, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80.35023911823282;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80.35023911823282,0 L80.35023911823282,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Flip Horizontal');
       shape.attr({"x":6.037739118232821,"y":67.91215535911579,"text-anchor":"start","text":"Flip Horizontal","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,49.770740800002386Q75.31542400000308,53.770740800002386 71.31542400000308, 53.770740800002386L8.315424000003077,53.770740800002386Q4.315424000003077,53.770740800002386 4.315424000003077, 49.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Line
       shape = this.canvas.paper.path('M39.48283648001234 4.038881344014044L39.65060864001134,53.47137542400378');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M56.886569500003134 28.18538080000235L48.497961500003385,35.787556800005405Q40.109353500003635,43.38973280000846 30.147881500003223, 35.78755680000495L20.18640950000281,28.18538080000144');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(112,150,255,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M49.28439350000281 24.156068800002686L60.294441500002904,26.253220800002964L56.62442550000287,36.476836800002275');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(112,150,255,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M21.035657500005982 37.13680480000221L17.88992949999556,26.651044800002637L27.06496949999928,24.02960479999456');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(112,150,255,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_geometry_FlipHorizontal = video_geometry_FlipHorizontal.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.progressing = false;
        
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            
            var dst = new Uint8ClampedArray(width*height*4);
            for (var y=0; y<height; y++) {
              for (var x=0; x<width; x++) {
                var off = (y*width+x)*4;
                var dstOff = (y*width+(width-x-1))*4;
                dst[dstOff  ] = pixels[off];
                dst[dstOff+1] = pixels[off+1];
                dst[dstOff+2] = pixels[off+2];
                dst[dstOff+3] = pixels[off+3];
              }
            }
            imageData.data.set(dst);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_geometry_FlipVertical = CircuitFigure.extend({

   NAME: "video_geometry_FlipVertical",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.22465535911579},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.7473000305823 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.7473000305823 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.22465535911579;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.22465535911579 L0,80.22465535911579");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Flip Vertical');
       shape.attr({"x":10.037739118232821,"y":69.22465535911579,"text-anchor":"start","text":"Flip Vertical","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,49.770740800002386Q75.31542400000308,53.770740800002386 71.31542400000308, 53.770740800002386L8.315424000003077,53.770740800002386Q4.315424000003077,53.770740800002386 4.315424000003077, 49.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Line
       shape = this.canvas.paper.path('M5.141972480008917 31.03971334401649L75.0400486400149,30.140559424007733');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":0.5});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M23.944361499994557 15.864612799999122L14.63824949999389,23.204644800003734Q5.332137499993223,30.544676800008347 14.507177499993304, 37.884708800003864L23.682217499993385,45.22474079999938');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(112,150,255,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M15.555753499995262 14.981028800004424L26.30365750000601,13.932452800004285L23.01112885999828,24.009268160004467');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(112,150,255,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M16.929289500008963 46.836132800000996L25.842185499998777,46.836132800005544L23.482889499998237,37.66109279999819');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(112,150,255,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_geometry_FlipVertical = video_geometry_FlipVertical.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.progressing = false;
        
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            
            var dst = new Uint8ClampedArray(width*height*4);
            for (var y=0; y<height; y++) {
                for (var x=0; x<width; x++) {
                  var off = (y*width+x)*4;
                  var dstOff = ((height-y-1)*width+x)*4;
                  dst[dstOff  ] = pixels[off  ];
                  dst[dstOff+1] = pixels[off+1];
                  dst[dstOff+2] = pixels[off+2];
                  dst[dstOff+3] = pixels[off+3];
                }
            }
            imageData.data.set(dst);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_geometry_Scale = CircuitFigure.extend({

   NAME: "video_geometry_Scale",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.59580028320488},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.4546330256835063, y: 47.74105968884587 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.4546330256835063, y: 78.37647333849256 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 104.19463302568374, y: 47.75576632810568 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.59580028320488;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.59580028320488 L0,81.59580028320488");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M6.363706420546805,6.846667716796219Q6.363706420546805,2.846667716796219 10.363706420546805, 2.846667716796219L47.363706420546805,2.846667716796219Q51.363706420546805,2.846667716796219 51.363706420546805, 6.846667716796219L51.363706420546805,46.84666771679622Q51.363706420546805,50.84666771679622 47.363706420546805, 50.84666771679622L10.363706420546805,50.84666771679622Q6.363706420546805,50.84666771679622 6.363706420546805, 46.84666771679622L6.363706420546805,6.846667716796219');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Scale');
       shape.attr({"x":25.27125842055102,"y":69.59580028320488,"text-anchor":"start","text":"Scale","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Head
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":40,"cy":15.966223296252792,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Head");
       
       // factor_label
       shape = this.canvas.paper.text(0,0,'factor');
       shape.attr({"x":13.863706420546805,"y":56.06407471679631,"text-anchor":"start","text":"factor","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","factor_label");
       
       // Body
       shape = this.canvas.paper.path('M30 48.34666771679622L51 48.34666771679622L49.52848698112575 33.95670898588651L49.12852106341779 33.01739755791641L48.475428085539534 32.13606149829502L47.58905194714316 31.33947975722731L46.49632473866586 30.651856067819608L45.2304484233955 30.094083527919793L43.82988601259967 29.683109773912292L42.33719288641623 29.431422035348078L40.7977237701416 29.34666771679622L39.25825465386879 29.431422035348078L37.76556152768171 29.683109773912292L36.36499911688588 30.094083527919793L35.099122801611884 30.651856067819608L34.00639559314004 31.33947975722731L33.12001945474185 32.13606149829502L32.46692647686723 33.01739755791641L32.06696055915563 33.95670898588651Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M41.863706420546805 52L72.8637064205468 52L72.8637064205468 2L41.863706420546805 2L41.863706420546805 52Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M41.41650485804712,15.712932812500185Q41.41650485804712,12.712932812500185 44.41650485804712, 12.712932812500185L62.696904858046764,12.712932812500185Q65.69690485804676,12.712932812500185 65.69690485804676, 15.712932812500185L65.69690485804676,41.686132812499636Q65.69690485804676,44.686132812499636 62.696904858046764, 44.686132812499636L44.41650485804712,44.686132812499636Q41.41650485804712,44.686132812499636 41.41650485804712, 41.686132812499636L41.41650485804712,15.712932812500185');
       shape.attr({"stroke":"rgba(0,0,0,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M42.712378420546884 42.34666771679622L48.712378420546884 42.34666771679622L47.9004617202836 32.500906479855985L47.67977797235835 31.85821971335099L47.31942975337279 31.25520030413736L46.83036606161386 30.710170691827443L46.227446849882654 30.239691325390595L45.52899151332713 29.858057482302684L44.75622226392079 29.576864913768986L43.9326193042607 29.404657513698112L43.08320739351802 29.34666771679622L42.712378420546884 29.371984405384865L42.712378420546884 42.34666771679622Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Shadow_Head
       shape = this.canvas.paper.path('M42.79289042054734 25.948109968187964L42.99169476503266 25.966223296252792L43.82541364123517 25.890262061314388L44.63380039126514 25.66468640018047L45.39229259279 25.296350315175005L46.077843844077506 24.796445511849015L46.66962401726596 24.180161344686894L47.149652171247 23.466223296252792L47.50334289346756 22.676324012882105L47.7199494703118 21.834464184587887L47.79289042054734 20.966223296252792L47.7199494703118 20.097982407917698L47.50334289346756 19.25612257962348L47.149652171247 18.466223296252792L46.66962401726596 17.75228524781869L46.077843844077506 17.13600108065657L45.39229259279 16.63609627733058L44.63380039126514 16.267760192325113L43.82541364123517 16.042184531191197L42.99169476503266 15.966223296252792L42.79289042054734 15.98433662431762L42.79289042054734 25.948109968187964Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Head");
       
       // width_height
       shape = this.canvas.paper.text(0,0,'w x h');
       shape.attr({"x":44.5,"y":56.14219971679631,"text-anchor":"start","text":"w x h","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#EB213C","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","width_height");
       
       // Line
       shape = this.canvas.paper.path('M11.241196954950283 55.59580028320488L7.621512602952862,55.99719517600897L2.271258420551021,62.478233716803516');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M41.95023442055026 3.649865716797649L42.212378420546884,50.835785716797545');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_geometry_Scale = video_geometry_Scale.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        
        this.processing = false;
        
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.processing ===false){
            this.processing = true;
            var factor = this.getInputPort("input_port2").getValue();

            var w = img.naturalWidth;
            var h = img.naturalHeight;
            // map factor from 0-5 => 1-20
            factor = 19/5*factor+1;

            w = Math.max(10,parseInt(w/factor));
            h = Math.max(parseInt(h/factor));
            this.layerAttr("width_height", {"text": w+"x"+h});
            var scaleCanvas = document.createElement("canvas");
            scaleCanvas.height = h;
            scaleCanvas.width = w;
            var scaleCtx = scaleCanvas.getContext('2d');
            scaleCtx.drawImage(img, 0, 0, w, h);
            var scaledImage = document.createElement("img");
            scaledImage.onload = () => {
                this.getOutputPort("output_port1").setValue(scaledImage);
            }
            this.processing = false;
	   	    scaledImage.src = scaleCanvas.toDataURL();
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        this.processing = false;
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_morphological_Dilate = CircuitFigure.extend({

   NAME: "video_morphological_Dilate",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Dilate');
       shape.attr({"x":21.76637911823309,"y":66.77074080000239,"text-anchor":"start","text":"Dilate","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,49.770740800002386Q75.31542400000308,53.770740800002386 71.31542400000308, 53.770740800002386L8.315424000003077,53.770740800002386Q4.315424000003077,53.770740800002386 4.315424000003077, 49.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // TOP_Body
       shape = this.canvas.paper.path('M38.91283164062497,47.87030333208804Q38.91283164062497,51.87030333208804 42.91260138990854, 51.91322130869542L47.000230250716434,51.95708202339262Q51,52 50.20924821365575, 48.07893998867738L48.238790665599616,38.30813399225801Q47.448038879255364,34.387073980935384 47.38749484212394, 33.74569801339612L47.38749484212394,33.74569801339612Q47.32695080499252,33.10432204585686 47.14715829352963, 32.482433962538835L47.14715829352963,32.482433962538835Q46.967365782066736,31.86054587922081 46.67378770075311, 31.27704143484425L46.67378770075311,31.27704143484425Q46.38020961943948,30.693536990467692 45.981766189717746, 30.166145672311814L45.981766189717746,30.166145672311814Q45.58332275999601,29.638754354155935 45.09212048385734, 29.183500680543148L45.09212048385734,29.183500680543148Q44.60091820771868,28.72824700693036 44.031882017763564, 28.358963630369544L44.031882017763564,28.358963630369544Q43.46284582780845,27.98968025380873 42.83326560072146, 27.717587662828464L42.83326560072146,27.717587662828464Q42.20368537363447,27.4454950718482 41.53269058603291, 27.278860662142506L41.53269058603291,27.278860662142506Q40.861695798431356,27.112226252436813 40.16967428739645, 27.056113126218406L40.16967428739645,27.056113126218406Q39.47765277636154,27 39.195242208493255, 27.022899490243617L39.195242208493255,27.022899490243617Q38.91283164062497,27.045798980487234 38.91283164062497, 31.045798980487234L38.91283164062497,47.87030333208804');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // TOP_Circle
       shape = this.canvas.paper.path('M40.81750864001151 25.43001197547619L41.47054496045439 25.5L42.74633181479476 25.363269777109053L43.98335453114578 24.95723358707346L45.144026800233405 24.294228634060346L46.1930821824908 23.3943999880712L47.09864566097622 22.285088487178655L47.83320214763262 21L48.374432515316585 19.578181289931308L48.70589175318128 18.06283359900226L48.81750864001151 16.49999999999909L48.70589175318128 14.93716640099774L48.374432515316585 13.421818710068692L47.83320214763262 12L47.09864566097622 10.714911512821345L46.1930821824908 9.6056000119288L45.144026800233405 8.705771365939654L43.98335453114578 8.04276641292654L42.74633181479476 7.636730222890947L41.47054496045439 7.5L40.81750864001151 7.569988024523809L40.81750864001151 25.43001197547619Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // Line
       shape = this.canvas.paper.path('M39.64973648001251 5.040281344015057L39.81750864001151,52.63687542400294');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M33.73613164062499 34.29746328124929L33.90303164062061,34.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M33.73613164062499 39.29746328124929L33.90303164062061,39.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M34.23613164062499 49.79746328124929L34.40303164062061,50.46506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.73613164062499 9.297463281249293L35.90303164062061,9.965063281248149');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_morphological_Dilate = video_morphological_Dilate.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.progressing = false;
        
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var colorToCare = 0;
            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            var matrix = [
                [1,1,1],
                [1,1,1],
                [1,1,1]
            ]
            var pixelsCopy = new Uint8ClampedArray(pixels);
            pixelsCopy.set(pixels);

            function applyMatrix(x,y,matrix,imgIn,imgOut){
        		var nx,ny;
        		var xC=parseInt(matrix[0].length/2);
        		var yC=parseInt(matrix.length/2);
        		var offset = (y*width+x)*4;
        		
        		if(imgIn[offset]===colorToCare){
        			for(var i=0; i<matrix.length; i++){
        				for(var j=0; j<matrix.length; j++){
        					if((i != yC || j != xC) && matrix[i][j]){
        						nx = x + (j-xC);
        						ny = y + (i-yC);
        						if(nx > 0 && nx < width && ny > 0 && ny < height){
                            		var outOffset = (ny*width+nx)*4;
        							imgOut[outOffset]=imgOut[outOffset+1]=imgOut[outOffset+2]=colorToCare;
        						}
        					}
        				}
        			}
        		}
        	}
           
            for(var y=0; y<height; y++){
				for(var x=0; x<width; x++){
					applyMatrix(x, y, matrix, pixels, pixelsCopy);
				}
			}

            pixels.set(pixelsCopy);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_morphological_Erode = CircuitFigure.extend({

   NAME: "video_morphological_Erode",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Erode');
       shape.attr({"x":21.76637911823309,"y":66.77074080000239,"text-anchor":"start","text":"Erode","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,49.770740800002386Q75.31542400000308,53.770740800002386 71.31542400000308, 53.770740800002386L8.315424000003077,53.770740800002386Q4.315424000003077,53.770740800002386 4.315424000003077, 49.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.58450938880469 5.328906649604505L51.71779200000401 5.328906649604505L51.71779200000401 52.46617272320418L39.58450938880469 52.46617272320418Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Small_Body
       shape = this.canvas.paper.path('M37.91283164062497,45.620898024786584Q37.91283164062497,49.620898024786584 41.912653708953805, 49.65862628620485L44.91300957229614,49.68692709769752Q48.91283164062497,49.724655359115786 48.01842084549514, 45.825933859757924L46.57475893204867,39.533036043222864Q45.68034813691884,35.634314543865 45.62524967310674, 35.1212137698335L45.62524967310674,35.1212137698335Q45.570151209294636,34.608112995802 45.406529956798295, 34.110602529146945L45.406529956798295,34.110602529146945Q45.24290870430195,33.61309206249189 44.975736212082666, 33.146288506990004L44.975736212082666,33.146288506990004Q44.70856371986338,32.67948495148812 44.34595788890056, 32.25757189696378L44.34595788890056,32.25757189696378Q43.983352057937736,31.835658842439443 43.536330482918856, 31.471455903549213L43.536330482918856,31.471455903549213Q43.08930890789998,31.107252964658983 42.57145411317879, 30.811826263410694L42.57145411317879,30.811826263410694Q42.0535993184576,30.516399562162405 41.4806460599234, 30.29872548937783L41.4806460599234,30.29872548937783Q40.9076928013892,30.081051416593255 40.29704997387444, 29.947743888829336L40.29704997387444,29.947743888829336Q39.68640714635967,29.814436361065418 39.05662882317711, 29.769545860090602L39.05662882317711,29.769545860090602Q38.42685049999454,29.724655359115786 38.16984107030976, 29.742974951311226L38.16984107030976,29.742974951311226Q37.91283164062497,29.761294543506665 37.91283164062497, 33.761294543506665L37.91283164062497,45.620898024786584');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Small_Body");
       
       // Small_Circle
       shape = this.canvas.paper.path('M39.31750864001151 23.445564869815826L39.80728588034344 23.5L40.76412602109849 23.393654271086234L41.69189305836244 23.07784834550057L42.56239726017793 22.56217782649219L43.3491887968712 21.862311101834166L44.02836140573436 20.999513267806833L44.57927877072689 20L44.985201546490316 18.89414100328031L45.23379597488929 17.715537243669132L45.31750864001151 16.49999999999909L45.23379597488929 15.284462756330868L44.985201546490316 14.10585899671969L44.57927877072689 13L44.02836140573436 12.000486732193167L43.3491887968712 11.137688898165834L42.56239726017793 10.437822173507811L41.69189305836244 9.92215165449943L40.76412602109849 9.606345728913766L39.80728588034344 9.5L39.31750864001151 9.554435130184174L39.31750864001151 23.445564869815826Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Small_Circle");
       
       // Line
       shape = this.canvas.paper.path('M33.73613164062499 34.29746328124929L33.90303164062061,34.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M33.73613164062499 39.29746328124929L33.90303164062061,39.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M34.23613164062499 49.79746328124929L34.40303164062061,50.46506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.73613164062499 9.297463281249293L35.90303164062061,9.965063281248149');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M44.73613164062499 11.297463281249293L44.044038181421456,12.072437463648384');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M45.23613164062499 49.29746328124929L45.40303164062061,49.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M44.23613164062499 38.79746328124929L44.40303164062061,39.46506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M43.73613164062499 34.29746328124929L43.90303164062061,34.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.14973648001251 5.040281344015057L39.31750864001151,52.63687542400294');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,38,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_morphological_Erode = video_morphological_Erode.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.progressing = false;
        
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var colorToCare = 255;
            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            var matrix = [
                [1,1,1],
                [1,1,1],
                [1,1,1]
            ]
            var pixelsCopy = new Uint8ClampedArray(pixels);
            pixelsCopy.set(pixels);

            function applyMatrix(x,y,matrix,imgIn,imgOut){
        		var nx,ny;
        		var xC=parseInt(matrix[0].length/2);
        		var yC=parseInt(matrix.length/2);
        		var offset = (y*width+x)*4;
        		
        		if(imgIn[offset]===colorToCare){
        			for(var i=0; i<matrix.length; i++){
        				for(var j=0; j<matrix.length; j++){
        					if((i != yC || j != xC) && matrix[i][j]){
        						nx = x + (j-xC);
        						ny = y + (i-yC);
        						if(nx > 0 && nx < width && ny > 0 && ny < height){
                            		var outOffset = (ny*width+nx)*4;
        							imgOut[outOffset]=imgOut[outOffset+1]=imgOut[outOffset+2]=colorToCare;
        						}
        					}
        				}
        			}
        		}
        	}
           
            for(var y=0; y<height; y++){
				for(var x=0; x<width; x++){
					applyMatrix(x, y, matrix, pixels, pixelsCopy);
				}
			}

            pixels.set(pixelsCopy);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_morphological_Thinning = CircuitFigure.extend({

   NAME: "video_morphological_Thinning",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(1);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Thinning');
       shape.attr({"x":13.76637911823309,"y":66.77074080000239,"text-anchor":"start","text":"Thinning","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,49.770740800002386Q75.31542400000308,53.770740800002386 71.31542400000308, 53.770740800002386L8.315424000003077,53.770740800002386Q4.315424000003077,53.770740800002386 4.315424000003077, 49.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // TOP_Body
       shape = this.canvas.paper.path('M38.91283164062497,47.87030333208804Q38.91283164062497,51.87030333208804 42.91260138990854, 51.91322130869542L47.000230250716434,51.95708202339262Q51,52 50.20924821365575, 48.07893998867738L48.238790665599616,38.30813399225801Q47.448038879255364,34.387073980935384 47.38749484212394, 33.74569801339612L47.38749484212394,33.74569801339612Q47.32695080499252,33.10432204585686 47.14715829352963, 32.482433962538835L47.14715829352963,32.482433962538835Q46.967365782066736,31.86054587922081 46.67378770075311, 31.27704143484425L46.67378770075311,31.27704143484425Q46.38020961943948,30.693536990467692 45.981766189717746, 30.166145672311814L45.981766189717746,30.166145672311814Q45.58332275999601,29.638754354155935 45.09212048385734, 29.183500680543148L45.09212048385734,29.183500680543148Q44.60091820771868,28.72824700693036 44.031882017763564, 28.358963630369544L44.031882017763564,28.358963630369544Q43.46284582780845,27.98968025380873 42.83326560072146, 27.717587662828464L42.83326560072146,27.717587662828464Q42.20368537363447,27.4454950718482 41.53269058603291, 27.278860662142506L41.53269058603291,27.278860662142506Q40.861695798431356,27.112226252436813 40.16967428739645, 27.056113126218406L40.16967428739645,27.056113126218406Q39.47765277636154,27 39.195242208493255, 27.022899490243617L39.195242208493255,27.022899490243617Q38.91283164062497,27.045798980487234 38.91283164062497, 31.045798980487234L38.91283164062497,47.87030333208804');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // TOP_Circle
       shape = this.canvas.paper.path('M40.81750864001151 25.43001197547619L41.47054496045439 25.5L42.74633181479476 25.363269777109053L43.98335453114578 24.95723358707346L45.144026800233405 24.294228634060346L46.1930821824908 23.3943999880712L47.09864566097622 22.285088487178655L47.83320214763262 21L48.374432515316585 19.578181289931308L48.70589175318128 18.06283359900226L48.81750864001151 16.49999999999909L48.70589175318128 14.93716640099774L48.374432515316585 13.421818710068692L47.83320214763262 12L47.09864566097622 10.714911512821345L46.1930821824908 9.6056000119288L45.144026800233405 8.705771365939654L43.98335453114578 8.04276641292654L42.74633181479476 7.636730222890947L41.47054496045439 7.5L40.81750864001151 7.569988024523809L40.81750864001151 25.43001197547619Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // Line
       shape = this.canvas.paper.path('M33.73613164062499 34.29746328124929L33.90303164062061,34.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M33.73613164062499 39.29746328124929L33.90303164062061,39.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M34.23613164062499 49.79746328124929L34.40303164062061,50.46506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.73613164062499 9.297463281249293L35.90303164062061,9.965063281248149');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.64973648001251 5.040281344015057L39.81750864001151,52.63687542400294');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_morphological_Thinning = video_morphological_Thinning.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.progressing = false;
        
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var colorToCare = 0;
            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            var matrix = [
                [0,0,1,0,0],
                [0,1,1,1,0],
                [1,1,1,1,1],
                [0,1,1,1,0],
                [0,0,1,0,0]
            ];
            var pixelsCopy = new Uint8ClampedArray(pixels);
            
            function applyMatrix(x,y,matrix,imgIn,imgOut){
        		var nx,ny;
        		var xC=parseInt(matrix[0].length/2);
        		var yC=parseInt(matrix.length/2);
        		var offset = (y*width+x)*4;
        		
        		if(imgIn[offset]===colorToCare){
        			for(var i=0; i<matrix.length; i++){
        				for(var j=0; j<matrix.length; j++){
        					if((i != yC || j != xC) && matrix[i][j]){
        						nx = x + (j-xC);
        						ny = y + (i-yC);
        						if(nx > 0 && nx < width && ny > 0 && ny < height){
                            		var outOffset = (ny*width+nx)*4;
        							imgOut[outOffset]=imgOut[outOffset+1]=imgOut[outOffset+2]=colorToCare;
        						}
        					}
        				}
        			}
        		}
        	}
         
            for(var y=0; y<height; y++){
				for(var x=0; x<width; x++){
					applyMatrix(x, y, matrix, pixels, pixelsCopy);
				}
			}
			
            for(var i=0; i<pixels.length; i+=4){
                pixels[i]=pixels[i+1]=pixels[i+2] = (pixelsCopy[i]!==pixels[i])?0:255;
            }
            

            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_Blur = CircuitFigure.extend({

   NAME: "video_quality_Blur",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.87877759999992},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.34495943717131 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.34495943717131 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.87877759999992;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.87877759999992 L0,80.87877759999992");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Blur');
       shape.attr({"x":25.228799999999865,"y":68.37877759999992,"text-anchor":"start","text":"Blur","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow
       shape = this.canvas.paper.path('M38.31898911823282,51.06235109342106Q38.31898911823282,53.06235109342106 40.3188720499583, 53.083990395468334L51.31910618650734,53.20301605706851Q53.31898911823282,53.224655359115786 52.92678092918581, 51.26348919164184L50.04794261238581,36.86837846676326Q49.6557344233388,34.90721229928931 49.593293360294865, 34.2401812930475L49.593293360294865,34.2401812930475Q49.53085229725093,33.573150286805685 49.3454263482231, 32.9263866801557L49.3454263482231,32.9263866801557Q49.16000039919527,32.27962307350572 48.85722363781406, 31.67277845135368L48.85722363781406,31.67277845135368Q48.55444687643285,31.06593382920164 48.1435190213806, 30.51744685832L48.1435190213806,30.51744685832Q47.73259116632835,29.96895988743836 47.225998052541854, 29.49549606688106L47.225998052541854,29.49549606688106Q46.71940493875536,29.02203224632376 46.13253914164852, 28.63797753470044L46.13253914164852,28.63797753470044Q45.54567334454168,28.25392282307712 44.896366484390455, 27.97094652845726L44.896366484390455,27.97094652845726Q44.24705962423923,27.687970233837405 43.5550405614249, 27.51467044774381L43.5550405614249,27.51467044774381Q42.86302149861058,27.341370661650217 42.14931688217757, 27.283013010383L42.14931688217757,27.283013010383Q41.43561226574457,27.224655359115786 40.72190764931156, 27.283013010383L40.72190764931156,27.283013010383Q40.008203032878555,27.341370661650217 39.31618397006423, 27.51467044774381L39.31618397006423,27.51467044774381Q38.624164907249906,27.687970233837405 38.47157701274136, 27.75447000404165L38.47157701274136,27.75447000404165Q38.31898911823282,27.820969774245896 38.31898911823282, 29.820969774245896L38.31898911823282,51.06235109342106');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.2});
       shape.data("name","Shadow");
       
       // TOP_Circle
       shape = this.canvas.paper.path('M38.67362344960475 25.032379674180447L39.00903935568749 25.122254095344033L40.57187295468975 25.25898431823407L42.13470655369201 25.122254095344033L43.65005424462106 24.71621790530753L45.07187295468975 24.053212952294416L46.35696144186841 23.15338430630527L47.46627294276095 22.044072805412725L48.3661015887501 20.75898431823407L49.02910654176321 19.337165608165378L49.435142731799715 17.82181791723633L49.57187295468975 16.25898431823407L49.435142731799715 14.69615071923181L49.02910654176321 13.180803028302762L48.3661015887501 11.75898431823407L47.46627294276095 10.473895831055415L46.35696144186841 9.36458433016287L45.07187295468975 8.464755684173724L43.65005424462106 7.80175073116061L42.13470655369201 7.395714541124107L40.57187295468975 7.25898431823407L39.00903935568749 7.395714541124107L38.67362344960475 7.485588962287693L38.67362344960475 25.032379674180447Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.15});
       shape.data("name","TOP_Circle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.038881344014044L38.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(26,12,112,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_quality_Blur = video_quality_Blur.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var opaque = false;
            var weights =[  1/9, 1/9, 1/9,  
                            1/9, 1/9, 1/9,  
                            1/9, 1/9, 1/9 ];
            var side = Math.round(Math.sqrt(weights.length));
            var halfSide = Math.floor(side/2);

            var src = imageData.data;
            var sw = imageData.width;
            var sh = imageData.height;
            var w = sw;
            var h = sh;
            var dst = new Uint8ClampedArray(w*h*4);
            var alphaFac = opaque ? 1 : 0;

            for (var y=0; y < h; y++) {
              for (var x=0; x < w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y*w+x)*4;
                var r=0, g=0, b=0, a=0;
                for (var cy=0; cy<side; cy++) {
                  for (var cx=0; cx<side; cx++) {
                    var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                    var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                    var srcOff = (scy*sw+scx)*4;
                    var wt = weights[cy*side+cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff+1] * wt;
                    b += src[srcOff+2] * wt;
                    a += src[srcOff+3] * wt;
                  }
                }
                dst[dstOff] = r;
                dst[dstOff+1] = g;
                dst[dstOff+2] = b;
                dst[dstOff+3] = a + alphaFac*(255-a);
              }
            }
            imageData.data.set(dst);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_Brighter = CircuitFigure.extend({

   NAME: "video_quality_Brighter",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:82.9852109375006},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 48.78941626176425 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 78.9119051427369 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.86500000000024, y: 48.80387666966603 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 82.9852109375006;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,82.9852109375006 L0,82.9852109375006");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.37996800000019Q4.5,4.37996800000019 8.5, 4.37996800000019L71.5,4.37996800000019Q75.5,4.37996800000019 75.5, 8.37996800000019L75.5,48.37996800000019Q75.5,52.37996800000019 71.5, 52.37996800000019L8.5,52.37996800000019Q4.5,52.37996800000019 4.5, 48.37996800000019L4.5,8.37996800000019');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Brighter');
       shape.attr({"x":19.466176000004452,"y":70.9852109375006,"text-anchor":"start","text":"Brighter","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(168,25,52,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.87996800000019L49.136293579453195 49.87996800000019L47.66478056057986 35.49000926909048L47.26481464287099 34.55069784111947L46.61172166499273 33.6693617814999L45.725345526597266 32.87278004043128L44.63261831811997 32.18515635102358L43.366742002848696 31.627383811123764L41.96617959205287 31.216410057116263L40.47348646586943 30.96472231855114L38.934017349595706 30.87996800000019L37.394548233321075 30.96472231855114L35.901855107135816 31.216410057116263L34.50129269633908 31.627383811123764L33.23541638106508 32.18515635102358L32.14268917259233 32.87278004043128L31.256313034195045 33.6693617814999L30.603220056319515 34.55069784111947L30.203254138608827 35.49000926909048Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(163,24,50,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'adjustment');
       shape.attr({"x":12,"y":57.597375000000284,"text-anchor":"start","text":"adjustment","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.92918400000053,47.37996800000019Q39.92918400000053,51.37996800000019 43.92918400000053, 51.37996800000019L70.92918400000053,51.37996800000019Q74.92918400000053,51.37996800000019 74.92918400000053, 47.37996800000019L74.92918400000053,9.37996800000019Q74.92918400000053,5.37996800000019 70.92918400000053, 5.37996800000019L43.92918400000053,5.37996800000019Q39.92918400000053,5.37996800000019 39.92918400000053, 9.37996800000019L39.92918400000053,47.37996800000019');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.84867199999917 49.87996800000019L49.651728947198535 49.87996800000019L48.46050412239674 35.49000926909048L48.13672218901229 34.55069784111947L47.60802787358898 33.6693617814999L46.89048528536114 32.87278004043128L46.00589659279012 32.18515635102358L44.98113957566147 31.627383811123764L43.84735095739779 31.216410057116263L42.63898033143869 30.96472231855114L41.392743427790265 30.87996800000019L40.84867199999917 30.916969314092967L40.84867199999917 49.87996800000019Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(252,37,77,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M39.92918400000053 25.470542254553948L40.260442059449815 25.499523579457673L41.64962748078506 25.377985603555317L42.996603206054715 25.017064545744688L44.260442059449815 24.42772680973303L45.40274293694256 23.627879124409446L46.38879760440159 22.641824456950417L47.18864528972517 21.499523579457673L47.77798302573683 20.235684726062573L48.13890408354746 18.888709000792915L48.260442059449815 17.499523579457673L48.13890408354746 16.11033815812243L47.77798302573683 14.763362432852773L47.18864528972517 13.499523579457673L46.38879760440159 12.357222701964929L45.40274293694256 11.3711680345059L44.260442059449815 10.571320349182315L42.996603206054715 9.981982613170658L41.64962748078506 9.62106155536003L40.260442059449815 9.499523579457673L39.92918400000053 9.528504904361398L39.92918400000053 25.470542254553948Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(237,35,73,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M9.377490534402568 58.62910056640976L5.757806182406966,59.03049545921385L0.4075520000042161,65.51153400000749');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.586528000003455 5.1831660000025295L39.84867199999917,52.369086000002426');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_quality_Brighter = video_quality_Brighter.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
  
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        var adjustment = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData: imageData,adjustment: adjustment}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var adjustment = event.data.adjustment;
            // map offset from 0-5 => 0-255
            adjustment = 255/5*adjustment;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                pixels[x]     = Math.min(255,pixels[x  ]+adjustment);
                pixels[x + 1] = Math.min(255,pixels[x+1]+adjustment);
                pixels[x + 2] = Math.min(255,pixels[x+2]+adjustment);
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_Contrast = CircuitFigure.extend({

   NAME: "video_quality_Contrast",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:82.9852109375006},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 48.78941626176425 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 78.9119051427369 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.86500000000024, y: 48.80387666966603 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 82.9852109375006;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,82.9852109375006 L0,82.9852109375006");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.37996800000019Q4.5,4.37996800000019 8.5, 4.37996800000019L71.5,4.37996800000019Q75.5,4.37996800000019 75.5, 8.37996800000019L75.5,48.37996800000019Q75.5,52.37996800000019 71.5, 52.37996800000019L8.5,52.37996800000019Q4.5,52.37996800000019 4.5, 48.37996800000019L4.5,8.37996800000019');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(199,199,199,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Contrast');
       shape.attr({"x":13.466176000004452,"y":70.9852109375006,"text-anchor":"start","text":"Contrast","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(240,36,74,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.87996800000019L49.136293579453195 49.87996800000019L47.66478056057986 35.49000926909048L47.26481464287099 34.55069784111947L46.61172166499273 33.6693617814999L45.725345526597266 32.87278004043128L44.63261831811997 32.18515635102358L43.366742002848696 31.627383811123764L41.96617959205287 31.216410057116263L40.47348646586943 30.96472231855114L38.934017349595706 30.87996800000019L37.394548233321075 30.96472231855114L35.901855107135816 31.216410057116263L34.50129269633908 31.627383811123764L33.23541638106508 32.18515635102358L32.14268917259233 32.87278004043128L31.256313034195045 33.6693617814999L30.603220056319515 34.55069784111947L30.203254138608827 35.49000926909048Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(232,34,71,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'adjustment');
       shape.attr({"x":12,"y":57.597375000000284,"text-anchor":"start","text":"adjustment","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.92918400000053,47.87996800000019Q39.92918400000053,51.87996800000019 43.92918400000053, 51.87996800000019L70.92918400000053,51.87996800000019Q74.92918400000053,51.87996800000019 74.92918400000053, 47.87996800000019L74.92918400000053,8.87996800000019Q74.92918400000053,4.87996800000019 70.92918400000053, 4.87996800000019L43.92918400000053,4.87996800000019Q39.92918400000053,4.87996800000019 39.92918400000053, 8.87996800000019L39.92918400000053,47.87996800000019');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(250,250,250,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.34867199999917 49.87996800000019L49.151728947198535 49.87996800000019L47.96050412239674 35.49000926909048L47.63672218901229 34.55069784111947L47.10802787358898 33.6693617814999L46.39048528536114 32.87278004043128L45.50589659279012 32.18515635102358L44.48113957566147 31.627383811123764L43.34735095739779 31.216410057116263L42.13898033143869 30.96472231855114L40.892743427790265 30.87996800000019L40.34867199999917 30.916969314092967L40.34867199999917 49.87996800000019Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(143,21,44,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M39.92918400000053 25.470542254553948L40.260442059449815 25.499523579457673L41.64962748078506 25.377985603555317L42.996603206054715 25.017064545744688L44.260442059449815 24.42772680973303L45.40274293694256 23.627879124409446L46.38879760440159 22.641824456950417L47.18864528972517 21.499523579457673L47.77798302573683 20.235684726062573L48.13890408354746 18.888709000792915L48.260442059449815 17.499523579457673L48.13890408354746 16.11033815812243L47.77798302573683 14.763362432852773L47.18864528972517 13.499523579457673L46.38879760440159 12.357222701964929L45.40274293694256 11.3711680345059L44.260442059449815 10.571320349182315L42.996603206054715 9.981982613170658L41.64962748078506 9.62106155536003L40.260442059449815 9.499523579457673L39.92918400000053 9.528504904361398L39.92918400000053 25.470542254553948Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(163,24,50,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M9.377490534402568 58.62910056640976L5.757806182406966,59.03049545921385L0.4075520000042161,65.51153400000749');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.586528000003455 5.1831660000025295L39.84867199999917,52.369086000002426');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_quality_Contrast = video_quality_Contrast.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        var adjustment = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage({imageData: imageData,adjustment: adjustment}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var adjustment = event.data.adjustment; // 0..5
            
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                let red = pixels[x];
                let green = pixels[x + 1];
                let blue = pixels[x + 2];

                //Red channel
                red /= 255;
                red -= 0.5;
                red *= adjustment;
                red += 0.5;
                red *= 255;

                //Green channel
                green /= 255;
                green -= 0.5;
                green *= adjustment;
                green += 0.5;
                green *= 255;

                //Blue channel
                blue /= 255;
                blue -= 0.5;
                blue *= adjustment;
                blue += 0.5;
                blue *= 255;

                pixels[x]     = red < 0 ? 0 : red > 255 ? 255 : red;
                pixels[x + 1] = green < 0 ? 0 : green > 255 ? 255 : green;
                pixels[x + 2] = blue < 0 ? 0 : blue > 255 ? 255 : blue;
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_Darker = CircuitFigure.extend({

   NAME: "video_quality_Darker",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:82.9852109375006},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 48.78941626176425 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 78.9119051427369 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.86500000000024, y: 48.80387666966603 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 82.9852109375006;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,82.9852109375006 L0,82.9852109375006");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.37996800000019Q4.5,4.37996800000019 8.5, 4.37996800000019L71.5,4.37996800000019Q75.5,4.37996800000019 75.5, 8.37996800000019L75.5,48.37996800000019Q75.5,52.37996800000019 71.5, 52.37996800000019L8.5,52.37996800000019Q4.5,52.37996800000019 4.5, 48.37996800000019L4.5,8.37996800000019');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(252,252,252,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Darker');
       shape.attr({"x":19.466176000004452,"y":70.9852109375006,"text-anchor":"start","text":"Darker","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(240,36,74,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.87996800000019L49.136293579453195 49.87996800000019L47.66478056057986 35.49000926909048L47.26481464287099 34.55069784111947L46.61172166499273 33.6693617814999L45.725345526597266 32.87278004043128L44.63261831811997 32.18515635102358L43.366742002848696 31.627383811123764L41.96617959205287 31.216410057116263L40.47348646586943 30.96472231855114L38.934017349595706 30.87996800000019L37.394548233321075 30.96472231855114L35.901855107135816 31.216410057116263L34.50129269633908 31.627383811123764L33.23541638106508 32.18515635102358L32.14268917259233 32.87278004043128L31.256313034195045 33.6693617814999L30.603220056319515 34.55069784111947L30.203254138608827 35.49000926909048Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(232,34,71,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'adjustment');
       shape.attr({"x":12,"y":57.597375000000284,"text-anchor":"start","text":"adjustment","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.92918400000053,47.87996800000019Q39.92918400000053,51.87996800000019 43.92918400000053, 51.87996800000019L70.92918400000053,51.87996800000019Q74.92918400000053,51.87996800000019 74.92918400000053, 47.87996800000019L74.92918400000053,8.87996800000019Q74.92918400000053,4.87996800000019 70.92918400000053, 4.87996800000019L43.92918400000053,4.87996800000019Q39.92918400000053,4.87996800000019 39.92918400000053, 8.87996800000019L39.92918400000053,47.87996800000019');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(189,189,189,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.34867199999917 49.87996800000019L49.151728947198535 49.87996800000019L47.96050412239674 35.49000926909048L47.63672218901229 34.55069784111947L47.10802787358898 33.6693617814999L46.39048528536114 32.87278004043128L45.50589659279012 32.18515635102358L44.48113957566147 31.627383811123764L43.34735095739779 31.216410057116263L42.13898033143869 30.96472231855114L40.892743427790265 30.87996800000019L40.34867199999917 30.916969314092967L40.34867199999917 49.87996800000019Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(143,21,44,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M39.92918400000053 25.470542254553948L40.260442059449815 25.499523579457673L41.64962748078506 25.377985603555317L42.996603206054715 25.017064545744688L44.260442059449815 24.42772680973303L45.40274293694256 23.627879124409446L46.38879760440159 22.641824456950417L47.18864528972517 21.499523579457673L47.77798302573683 20.235684726062573L48.13890408354746 18.888709000792915L48.260442059449815 17.499523579457673L48.13890408354746 16.11033815812243L47.77798302573683 14.763362432852773L47.18864528972517 13.499523579457673L46.38879760440159 12.357222701964929L45.40274293694256 11.3711680345059L44.260442059449815 10.571320349182315L42.996603206054715 9.981982613170658L41.64962748078506 9.62106155536003L40.260442059449815 9.499523579457673L39.92918400000053 9.528504904361398L39.92918400000053 25.470542254553948Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(163,24,50,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M9.377490534402568 58.62910056640976L5.757806182406966,59.03049545921385L0.4075520000042161,65.51153400000749');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.586528000003455 5.1831660000025295L39.84867199999917,52.369086000002426');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_quality_Darker = video_quality_Darker.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        var adjustment = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage({imageData: imageData,adjustment: adjustment}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var adjustment = event.data.adjustment;
            // map offset from 0-5 => 0-255
            adjustment = 255/5*adjustment;
            var pixels = imageData.data;
            for( let x = 0; x < pixels.length; x += 4 ) {
                pixels[x]     = Math.max(0,pixels[x  ]-adjustment);
                pixels[x + 1] = Math.max(0,pixels[x+1]-adjustment);
                pixels[x + 2] = Math.max(0,pixels[x+2]-adjustment);
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_GaussBlur = CircuitFigure.extend({

   NAME: "video_quality_GaussBlur",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:83.375,height:84.37877759999992},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.5997001499250375, y: 47.298149054958564 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.5997001499250375, y: 79.13214993055605 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(1);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 97.78860569715143, y: 47.298149054958564 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 83.375;
      this.originalHeight= 84.37877759999992;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L83.375,0 L83.375,84.37877759999992 L0,84.37877759999992");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1.2712000000001353,3Q1.2712000000001353,0 4.271200000000135, 0L78.27120000000014,0Q81.27120000000014,0 81.27120000000014, 3L81.27120000000014,77Q81.27120000000014,80 78.27120000000014, 80L4.271200000000135,80Q1.2712000000001353,80 1.2712000000001353, 77L1.2712000000001353,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'GaussBlur');
       shape.attr({"x":4,"y":71.87877759999992,"text-anchor":"start","text":"GaussBlur","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M5.586624000003212,7.770740800002386Q5.586624000003212,3.770740800002386 9.586624000003212, 3.770740800002386L72.58662400000321,3.770740800002386Q76.58662400000321,3.770740800002386 76.58662400000321, 7.770740800002386L76.58662400000321,49.770740800002386Q76.58662400000321,53.770740800002386 72.58662400000321, 53.770740800002386L9.586624000003212,53.770740800002386Q5.586624000003212,53.770740800002386 5.586624000003212, 49.770740800002386L5.586624000003212,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M40.090189118232956,51.06235109342106Q40.090189118232956,53.06235109342106 42.0900547303779, 53.08553585911158L52.09032350608801,53.20147059342526Q54.090189118232956,53.224655359115786 53.72321753600035, 51.25861063484482L51.038122985231084,36.87325702356028Q50.671151402998476,34.90721229928931 50.61287307749126, 34.2401812930475L50.61287307749126,34.2401812930475Q50.55459475198404,33.573150286805685 50.38153053289079, 32.9263866801557L50.38153053289079,32.9263866801557Q50.208466313797544,32.27962307350572 49.92587466984196, 31.67277845135368L49.92587466984196,31.67277845135368Q49.643283025886376,31.06593382920164 49.25975036117052, 30.51744685832L49.25975036117052,30.51744685832Q48.87621769645466,29.96895988743836 48.403397456921084, 29.49549606688106L48.403397456921084,29.49549606688106Q47.93057721738751,29.02203224632376 47.38283580675443, 28.63797753470044L47.38283580675443,28.63797753470044Q46.83509439612135,28.25392282307712 46.22907465998014, 27.97094652845726L46.22907465998014,27.97094652845726Q45.623054923838936,27.687970233837405 44.97717046521211, 27.51467044774381L44.97717046521211,27.51467044774381Q44.33128600658529,27.341370661650217 43.665161697914755, 27.283013010383L43.665161697914755,27.283013010383Q42.99903738924422,27.224655359115786 42.332913080573235, 27.283013010383L42.332913080573235,27.283013010383Q41.66678877190225,27.341370661650217 41.02090431327542, 27.51467044774381L41.02090431327542,27.51467044774381Q40.3750198546486,27.687970233837405 40.23260448644078, 27.75447000404165L40.23260448644078,27.75447000404165Q40.090189118232956,27.820969774245896 40.090189118232956, 29.820969774245896L40.090189118232956,51.06235109342106');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.2});
       shape.data("name","Shadow_Body");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M40.090189118232956,52.04986614990685Q40.090189118232956,54.04986614990685 42.09008341288485, 54.07042849945177L55.09029482358106,54.20409300957086Q57.090189118232956,54.224655359115786 56.67828728064497, 52.26753071408378L53.350402301607836,36.45530286279578Q52.93850046401985,34.49817821776378 52.86773392590385, 33.77983713411868L52.86773392590385,33.77983713411868Q52.796967387787845,33.06149605047358 52.586817978889485, 32.36498139715877L52.586817978889485,32.36498139715877Q52.376668569991125,31.668466743843965 52.03352157375866, 31.014941766141874L52.03352157375866,31.014941766141874Q51.6903745775262,30.361416788439783 51.2246563417998, 29.77073851210571L51.2246563417998,29.77073851210571Q50.7589381060734,29.180060235771634 50.184799243782436, 28.670176121325312L50.184799243782436,28.670176121325312Q49.61066038149147,28.16029200687899 48.945545811437114, 27.746694625130658L48.945545811437114,27.746694625130658Q48.28043124138276,27.333097243382326 47.54455013321149, 27.028353541484194L47.54455013321149,27.028353541484194Q46.80866902504022,26.72360983958606 46.02438075385089, 26.536979300715757L46.02438075385089,26.536979300715757Q45.24009248266157,26.350348761845453 44.431227250703614, 26.28750206048062L44.431227250703614,26.28750206048062Q43.62236201874566,26.224655359115786 42.81349678678862, 26.28750206048062L42.81349678678862,26.28750206048062Q42.004631554831576,26.350348761845453 41.22034328364225, 26.536979300715757L41.22034328364225,26.536979300715757Q40.436055012452925,26.72360983958606 40.26312206534294, 26.795224976728605L40.26312206534294,26.795224976728605Q40.090189118232956,26.86684011387115 40.090189118232956, 28.86684011387115L40.090189118232956,52.04986614990685');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.15});
       shape.data("name","Shadow_Body");
       
       // Shadow_Circle
       shape = this.canvas.paper.path('M40.94482344960488 26.00720138039742L41.314147979302106 26.107061848355443L43.03497508821329 26.25898431823407L44.75580219712447 26.107061848355443L46.42434284511182 25.655910526093976L47.98989926890954 24.919238356078495L49.40490282878818 23.919428749423787L50.626359357608635 22.686860415098636L51.61715551683028 21.25898431823407L52.347186466520725 19.679185751490877L52.79427058568763 17.99546609490244L52.94482344960488 16.25898431823407L52.79427058568763 14.5225025415657L52.347186466520725 12.838782884977263L51.61715551683028 11.25898431823407L50.626359357608635 9.831108221369504L49.40490282878818 8.598539887044353L47.98989926890954 7.5987302803896455L46.42434284511182 6.862058110374164L44.75580219712447 6.4109067881126975L43.03497508821329 6.25898431823407L41.314147979302106 6.4109067881126975L40.94482344960488 6.5107672560707215L40.94482344960488 26.00720138039742Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.1});
       shape.data("name","Shadow_Circle");
       
       // Shadow_Circle
       shape = this.canvas.paper.path('M39.44482344960488 25.032379674180447L39.78023935568763 25.122254095344033L41.34307295468989 25.25898431823407L42.90590655369215 25.122254095344033L44.421254244621196 24.71621790530753L45.84307295468989 24.053212952294416L47.12816144186854 23.15338430630527L48.23747294276109 22.044072805412725L49.13730158875023 20.75898431823407L49.80030654176335 19.337165608165378L50.20634273179985 17.82181791723633L50.34307295468989 16.25898431823407L50.20634273179985 14.69615071923181L49.80030654176335 13.180803028302762L49.13730158875023 11.75898431823407L48.23747294276109 10.473895831055415L47.12816144186854 9.36458433016287L45.84307295468989 8.464755684173724L44.421254244621196 7.80175073116061L42.90590655369215 7.395714541124107L41.34307295468989 7.25898431823407L39.78023935568763 7.395714541124107L39.44482344960488 7.485588962287693L39.44482344960488 25.032379674180447Z');
       shape.attr({"stroke":"rgba(27,27,27,1)","stroke-width":1,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.15});
       shape.data("name","Shadow_Circle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":40.771200000000384,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M30.733767472217583,46.776768974949896Q30.090189118232956,50.724655359115786 34.09000873597449, 50.762642534977275L48.172110300486224,50.89638338325396Q52.17192991822776,50.93437055911545 51.28331395841995, 47.03432419067637L49.49538747803855,39.18729409867167Q48.606771518230744,35.28724773023259 48.546002530279566, 34.71745662722515L48.546002530279566,34.71745662722515Q48.48523354232839,34.1476655242177 48.30477301342353, 33.5951872355472L48.30477301342353,33.5951872355472Q48.12431248451867,33.0427089468767 47.82964361651284, 32.52433024577522L47.82964361651284,32.52433024577522Q47.53497474850701,32.005951544673735 47.135050905844764, 31.537423105665766L47.135050905844764,31.537423105665766Q46.73512706318252,31.068894666657798 46.24209972945255, 30.66445248927039L46.24209972945255,30.66445248927039Q45.74907239572258,30.26001031188298 45.17792195697666, 29.931943167022382L45.17792195697666,29.931943167022382Q44.606771518230744,29.603876022161785 43.97485209153365, 29.36215206401357L43.97485209153365,29.36215206401357Q43.34293266483655,29.120428105865358 42.669444802201724, 28.972391994582267L42.669444802201724,28.972391994582267Q41.995956939566895,28.824355883299177 41.301364228899274, 28.77450562120748L41.301364228899274,28.77450562120748Q40.60677151823165,28.724655359115786 39.91217880756358, 28.77450562120748L39.91217880756358,28.77450562120748Q39.2175860968955,28.824355883299177 38.54409823426067, 28.972391994582267L38.54409823426067,28.972391994582267Q37.870610371625844,29.120428105865358 37.23869094492875, 29.36215206401357L37.23869094492875,29.36215206401357Q36.60677151823165,29.603876022161785 36.035621079485736, 29.931943167022382L36.035621079485736,29.931943167022382Q35.46447064073982,30.26001031188298 34.97144330700985, 30.66445248927039L34.97144330700985,30.66445248927039Q34.47841597327988,31.068894666657798 34.07849213061763, 31.537423105665766L34.07849213061763,31.537423105665766Q33.678568287955386,32.005951544673735 33.38389941994956, 32.52433024577522L33.38389941994956,32.52433024577522Q33.08923055194373,33.0427089468767 32.90877002303887, 33.5951872355472L32.90877002303887,33.5951872355472Q32.72830949413401,34.1476655242177 32.66754050618283, 34.71745662722515L32.66754050618283,34.71745662722515Q32.60677151823165,35.28724773023259 31.963193164247027, 39.235134114398484L30.733767472217583,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Label
       shape = this.canvas.paper.text(0,0,'radius');
       shape.attr({"x":12.9609375,"y":59.423763799999506,"text-anchor":"start","text":"radius","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M12.259241500002645 59.67813280000246L7.8027935000027355,60.464564800002336L0.9870495000031951,67.44414879999931');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.96760448001169 4.038881344014044L40.13537664001069,53.47137542400378');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_quality_GaussBlur = video_quality_GaussBlur.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var radius = this.getInputPort("input_port2").getValue();
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData, radius}, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.progressing = false;
        
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data.imageData;
            var radius = event.data.radius;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;

            // map values from [0..5] => [0..30]
            radius = Math.max(3,parseInt(30/5 * radius));

            var BlurStack = function() {
              this.r = 0;
              this.g = 0;
              this.b = 0;
              this.a = 0;
              this.next = null;
            };

            var mulTable = [
              512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
              454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
              482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
              437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
              497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
              320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
              446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
              329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
              505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
              399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
              324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
              268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
              451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
              385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
              332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
              289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
            ];

            var shgTable = [
              9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
              17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
              19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
              20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
              21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
              21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
              22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
              22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
              23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
              23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
              23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
              23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
              24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
              24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
              24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
              24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
            ];

          let x, y, i, p, yp, yi, yw, rSum, gSum, bSum, aSum,
            rOutSum, gOutSum, bOutSum, aOutSum,
            rInSum, gInSum, bInSum, aInSum,
            pr, pg, pb, pa, rbs;

          const div = 2 * radius + 1;
          // const w4 = width << 2;
          const widthMinus1 = width - 1;
          const heightMinus1 = height - 1;
          const radiusPlus1 = radius + 1;
          const sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

          const stackStart = new BlurStack();
          let stack = stackStart;
          let stackEnd;
          for (i = 1; i < div; i++) {
            stack = stack.next = new BlurStack();
            if (i === radiusPlus1) {
              stackEnd = stack;
            }
          }
          stack.next = stackStart;
          let stackIn = null;
          let stackOut = null;

          yw = yi = 0;

          const mulSum = mulTable[radius];
          const shgSum = shgTable[radius];

          for (y = 0; y < height; y++) {
            rInSum = gInSum = bInSum = aInSum = rSum = gSum = bSum = aSum = 0;

            rOutSum = radiusPlus1 * (pr = pixels[yi]);
            gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
            bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
            aOutSum = radiusPlus1 * (pa = pixels[yi + 3]);

            rSum += sumFactor * pr;
            gSum += sumFactor * pg;
            bSum += sumFactor * pb;
            aSum += sumFactor * pa;

            stack = stackStart;

            for (i = 0; i < radiusPlus1; i++) {
              stack.r = pr;
              stack.g = pg;
              stack.b = pb;
              stack.a = pa;
              stack = stack.next;
            }

            for (i = 1; i < radiusPlus1; i++) {
              p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
              rSum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
              gSum += (stack.g = (pg = pixels[p + 1])) * rbs;
              bSum += (stack.b = (pb = pixels[p + 2])) * rbs;
              aSum += (stack.a = (pa = pixels[p + 3])) * rbs;

              rInSum += pr;
              gInSum += pg;
              bInSum += pb;
              aInSum += pa;

              stack = stack.next;
            }

            stackIn = stackStart;
            stackOut = stackEnd;
            for (x = 0; x < width; x++) {
              pixels[yi + 3] = pa = (aSum * mulSum) >> shgSum;
              if (pa !== 0) {
                pa = 255 / pa;
                pixels[yi] = ((rSum * mulSum) >> shgSum) * pa;
                pixels[yi + 1] = ((gSum * mulSum) >> shgSum) * pa;
                pixels[yi + 2] = ((bSum * mulSum) >> shgSum) * pa;
              } else {
                pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
              }

              rSum -= rOutSum;
              gSum -= gOutSum;
              bSum -= bOutSum;
              aSum -= aOutSum;

              rOutSum -= stackIn.r;
              gOutSum -= stackIn.g;
              bOutSum -= stackIn.b;
              aOutSum -= stackIn.a;

              p = (yw + ((p = x + radius + 1) < widthMinus1
                ? p
                : widthMinus1)) << 2;

              rInSum += (stackIn.r = pixels[p]);
              gInSum += (stackIn.g = pixels[p + 1]);
              bInSum += (stackIn.b = pixels[p + 2]);
              aInSum += (stackIn.a = pixels[p + 3]);

              rSum += rInSum;
              gSum += gInSum;
              bSum += bInSum;
              aSum += aInSum;

              stackIn = stackIn.next;

              rOutSum += (pr = stackOut.r);
              gOutSum += (pg = stackOut.g);
              bOutSum += (pb = stackOut.b);
              aOutSum += (pa = stackOut.a);

              rInSum -= pr;
              gInSum -= pg;
              bInSum -= pb;
              aInSum -= pa;

              stackOut = stackOut.next;

              yi += 4;
            }
            yw += width;
          }

          for (x = 0; x < width; x++) {
            gInSum = bInSum = aInSum = rInSum = gSum = bSum = aSum = rSum = 0;

            yi = x << 2;
            rOutSum = radiusPlus1 * (pr = pixels[yi]);
            gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
            bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
            aOutSum = radiusPlus1 * (pa = pixels[yi + 3]);

            rSum += sumFactor * pr;
            gSum += sumFactor * pg;
            bSum += sumFactor * pb;
            aSum += sumFactor * pa;

            stack = stackStart;

            for (i = 0; i < radiusPlus1; i++) {
              stack.r = pr;
              stack.g = pg;
              stack.b = pb;
              stack.a = pa;
              stack = stack.next;
            }

            yp = width;

            for (i = 1; i <= radius; i++) {
              yi = (yp + x) << 2;

              rSum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
              gSum += (stack.g = (pg = pixels[yi + 1])) * rbs;
              bSum += (stack.b = (pb = pixels[yi + 2])) * rbs;
              aSum += (stack.a = (pa = pixels[yi + 3])) * rbs;

              rInSum += pr;
              gInSum += pg;
              bInSum += pb;
              aInSum += pa;

              stack = stack.next;

              if (i < heightMinus1) {
                yp += width;
              }
            }

            yi = x;
            stackIn = stackStart;
            stackOut = stackEnd;
            for (y = 0; y < height; y++) {
              p = yi << 2;
              pixels[p + 3] = pa = (aSum * mulSum) >> shgSum;
              if (pa > 0) {
                pa = 255 / pa;
                pixels[p] = ((rSum * mulSum) >> shgSum) * pa;
                pixels[p + 1] = ((gSum * mulSum) >> shgSum) * pa;
                pixels[p + 2] = ((bSum * mulSum) >> shgSum) * pa;
              } else {
                pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
              }

              rSum -= rOutSum;
              gSum -= gOutSum;
              bSum -= bOutSum;
              aSum -= aOutSum;

              rOutSum -= stackIn.r;
              gOutSum -= stackIn.g;
              bOutSum -= stackIn.b;
              aOutSum -= stackIn.a;

              p = (x + (
                ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) *
                width
              )) << 2;

              rSum += (rInSum += (stackIn.r = pixels[p]));
              gSum += (gInSum += (stackIn.g = pixels[p + 1]));
              bSum += (bInSum += (stackIn.b = pixels[p + 2]));
              aSum += (aInSum += (stackIn.a = pixels[p + 3]));

              stackIn = stackIn.next;

              rOutSum += (pr = stackOut.r);
              gOutSum += (pg = stackOut.g);
              bOutSum += (pb = stackOut.b);
              aOutSum += (pa = stackOut.a);

              rInSum -= pr;
              gInSum -= pg;
              bInSum -= pb;
              aInSum -= pa;

              stackOut = stackOut.next;

              yi += width;
            }
          }
            //imageData.data.set(dst);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.progressing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_HistogramAdjust = CircuitFigure.extend({

   NAME: "video_quality_HistogramAdjust",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Histogram Adjust');
       shape.attr({"x":5.228799999999865,"y":67.56627759999992,"text-anchor":"start","text":"Histogram Adjust","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.962567472217447,46.776768974949896Q29.31898911823282,50.724655359115786 33.31880873597436, 50.762642534977275L47.40091030048609,50.89638338325396Q51.400729918227626,50.93437055911545 50.51211395841982, 47.03432419067637L48.72418747803842,39.18729409867167Q47.83557151823061,35.28724773023259 47.77480253027943, 34.71745662722515L47.77480253027943,34.71745662722515Q47.71403354232825,34.1476655242177 47.53357301342339, 33.5951872355472L47.53357301342339,33.5951872355472Q47.35311248451853,33.0427089468767 47.058443616512704, 32.52433024577522L47.058443616512704,32.52433024577522Q46.763774748506876,32.005951544673735 46.36385090584463, 31.537423105665766L46.36385090584463,31.537423105665766Q45.96392706318238,31.068894666657798 45.47089972945241, 30.66445248927039L45.47089972945241,30.66445248927039Q44.97787239572244,30.26001031188298 44.406721956976526, 29.931943167022382L44.406721956976526,29.931943167022382Q43.83557151823061,29.603876022161785 43.20365209153351, 29.36215206401357L43.20365209153351,29.36215206401357Q42.57173266483642,29.120428105865358 41.89824480220159, 28.972391994582267L41.89824480220159,28.972391994582267Q41.22475693956676,28.824355883299177 40.53016422889914, 28.77450562120748L40.53016422889914,28.77450562120748Q39.83557151823152,28.724655359115786 39.14097880756344, 28.77450562120748L39.14097880756344,28.77450562120748Q38.44638609689537,28.824355883299177 37.77289823426054, 28.972391994582267L37.77289823426054,28.972391994582267Q37.09941037162571,29.120428105865358 36.46749094492861, 29.36215206401357L36.46749094492861,29.36215206401357Q35.83557151823152,29.603876022161785 35.2644210794856, 29.931943167022382L35.2644210794856,29.931943167022382Q34.693270640739684,30.26001031188298 34.200243307009714, 30.66445248927039L34.200243307009714,30.66445248927039Q33.707215973279745,31.068894666657798 33.3072921306175, 31.537423105665766L33.3072921306175,31.537423105665766Q32.90736828795525,32.005951544673735 32.61269941994942, 32.52433024577522L32.61269941994942,32.52433024577522Q32.31803055194359,33.0427089468767 32.137570023038734, 33.5951872355472L32.137570023038734,33.5951872355472Q31.957109494133874,34.1476655242177 31.896340506182696, 34.71745662722515L31.896340506182696,34.71745662722515Q31.835571518231518,35.28724773023259 31.19199316424689, 39.235134114398484L29.962567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077 44.171641281785924L13.719023999994533 44.02284128177871L13.676023999993959 33.767941281774256L20.7717239999929 33.69354128177201L20.760973999997077 49.015291281779355L30.763898999993216 49.04026628178235L30.83561149999332 42.51590378178207L36.55331775000013 42.43627253178329L36.45297087500239 45.23235690677393L41.51974743750179 45.02749909427439L41.52548571875377 42.33577018802771L46.46035485937591 42.34620573490429L46.461789429688906 39.14562350832966L51.88770671484508 39.14823239504858L51.826415357422775 37.30003683841369L56.29621967871026 37.3623390600942L56.188421839356124 41.70899017092779L63.03932291968249 41.78621572634893L63.1356734598412 25.672528504053844L75.31542400000308 25.587841281771944L75.31542400000308 55.587841281771944L4.315424000003077 55.587841281771944Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,219,219,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.55});
       shape.data("name","Rectangle");
       
       // Line
       shape = this.canvas.paper.path('M39.69640448001155 4.038881344014044L39.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(26,12,112,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_quality_HistogramAdjust = video_quality_HistogramAdjust.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            const  HISTOGRAM_SIZE = 256; // for 8-bit image
            const  MAX_VALUE = 255;      // max value in 8-bit image

            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            var imageSize = width * height;
            var scale = MAX_VALUE / imageSize;    // scale factor ,so the values in LUT are from 0 to MAX_VALUE
            var lutR   = new Uint8Array(HISTOGRAM_SIZE);
            var lutG   = new Uint8Array(HISTOGRAM_SIZE);
            var lutB   = new Uint8Array(HISTOGRAM_SIZE);
            var histR  = new Uint32Array(HISTOGRAM_SIZE);
            var histG  = new Uint32Array(HISTOGRAM_SIZE);
            var histB  = new Uint32Array(HISTOGRAM_SIZE);
            histR.fill(0);
            histG.fill(0);
            histB.fill(0);
            
            // collect the distribution of the RGB values 
            //
            for (var index=0; index < pixels.length; index+=4) {
                histR[pixels[index  ]]++; // red
                histG[pixels[index+1]]++; // green
                histB[pixels[index+2]]++; // blue
            }

            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            var i = 0;
            while(i < HISTOGRAM_SIZE)
            {
                // cumulative sum is used as LUT
                sumR += histR[i];
                sumG += histG[i];
                sumB += histB[i];
       
                // build look-up table
                lutR[i] = (sumR * scale+0.5)|0;
                lutG[i] = (sumG * scale+0.5)|0;
                lutB[i] = (sumB * scale+0.5)|0;
                ++i;
            }

            // re-map input pixels by using LUT
            for (index=0; index < pixels.length; index+=4) {
                pixels[index  ] = lutR[pixels[index  ]];
                pixels[index+1] = lutG[pixels[index+1]];
                pixels[index+2] = lutB[pixels[index+2]];
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { 
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_Sharpen = CircuitFigure.extend({

   NAME: "video_quality_Sharpen",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.87877759999992},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.34495943717131 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.34495943717131 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.87877759999992;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.87877759999992 L0,80.87877759999992");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Sharpen');
       shape.attr({"x":10.228799999999865,"y":68.37877759999992,"text-anchor":"start","text":"Sharpen","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M38.3575436800038 6.761013428584192L38.33557151823152 6.75898431823407L36.77273791922926 6.903310664618402L35.25739022830021 7.331904420767387L33.83557151823152 8.031742982281685L32.55048303105286 8.981562108603612L31.441171530160318 10.15250202621246L30.541342884171172 11.50898431823407L29.878337931158057 13.009792956640013L29.472301741121555 14.609326630398755L29.335571518231518 16.25898431823407L29.472301741121555 17.908642006069385L29.878337931158057 19.508175679828128L30.541342884171172 21.00898431823407L31.441171530160318 22.36546661025568L32.55048303105286 23.53640652786453L33.83557151823152 24.486225654186455L35.25739022830021 25.186064215700753L36.77273791922926 25.614657971849738L38.33557151823152 25.75898431823407L38.3575436800038 25.756955207883948L38.3575436800038 6.761013428584192Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.25});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M35.323635168710325,52.22508227661048Q38.32230559823074,52.314388799999506 38.32230559823074, 49.314388799999506L38.32230559823074,30.438490014114905Q38.32230559823074,27.438490014114905 38.301052857797, 27.433087432160846L38.301052857797,27.433087432160846Q38.279800117363266,27.427684850206788 37.59730583340797, 27.371036825103147L37.59730583340797,27.371036825103147Q36.91481154945268,27.314388799999506 36.23231726549511, 27.371036825103147L36.23231726549511,27.371036825103147Q35.549822981537545,27.427684850206788 34.88806594104108, 27.5959077039397L34.88806594104108,27.5959077039397Q34.22630890054461,27.764130557672615 33.605396256316, 28.038816873749056L33.605396256316,28.038816873749056Q32.98448361208739,28.313503189825497 32.42328148062643, 28.68630676353132L32.42328148062643,28.68630676353132Q31.86207934916547,29.059110337237144 31.377639573254783, 29.51870372063013L31.377639573254783,29.51870372063013Q30.893199797344096,29.978297104023113 30.50024183443702, 30.510715784715558L30.50024183443702,30.510715784715558Q30.107283871529944,31.043134465408002 29.817747550480362, 31.632201171204088L29.817747550480362,31.632201171204088Q29.52821122943078,32.22126787700017 28.902015467438314, 35.15518656497751L25.948501360223208,48.993303588943135Q25.32230559823074,51.927222276920475 28.320976027751158, 52.0165288003095L35.323635168710325,52.22508227661048');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M38.309039678229965 51.724655359115786L38.309039678229965 27.84379252466624L38.27307350211322 27.833419567314195L37.11808317541818 27.724655359115786L35.96309284872041 27.833419567314195L34.84319631864855 28.156407446482262L33.792421074570484 28.683805173349356L32.84269439055879 29.399588034863882L32.02287323132532 30.28200733097765L31.357867447944045 31.304251197908343L30.867882904630278 32.435259273036536L27.309039678229965 51.352975496960426Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.2});
       shape.data("name","Rectangle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.038881344014044L38.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(26,12,112,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
video_quality_Sharpen = video_quality_Sharpen.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var imageData = event.data;
            var opaque = false;
            var weights =[  0, -1,  0,  -1,  5, -1,   0, -1,  0 ];
            var side = Math.round(Math.sqrt(weights.length));
            var halfSide = Math.floor(side/2);

            var src = imageData.data;
            var sw = imageData.width;
            var sh = imageData.height;
            var w = sw;
            var h = sh;
            var dst = new Uint8ClampedArray(w*h*4);
            var alphaFac = opaque ? 1 : 0;

            for (var y=0; y < h; y++) {
              for (var x=0; x < w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y*w+x)*4;
                var r=0, g=0, b=0, a=0;
                for (var cy=0; cy<side; cy++) {
                  for (var cx=0; cx<side; cx++) {
                    var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                    var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                    var srcOff = (scy*sw+scx)*4;
                    var wt = weights[cy*side+cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff+1] * wt;
                    b += src[srcOff+2] * wt;
                    a += src[srcOff+3] * wt;
                  }
                }
                dst[dstOff] = r;
                dst[dstOff+1] = g;
                dst[dstOff+2] = b;
                dst[dstOff+3] = a + alphaFac*(255-a);
              }
            }
            imageData.data.set(dst);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_source_IPCamera = CircuitFigure.extend({

   NAME: "video_source_IPCamera",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.125},attr), setter, getter);
     var port;
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.7890625, y: 49.921996879875195 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.125;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.125 L0,80.125");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M79.9944352881578,16.18111752610946Q79.99426089739427,14.181117533712495 79.99426089739427, 12.181117533712495L79.99426089739427,2Q79.99426089739427,0 77.99427040266448, 0.006166116321677656L1.9999904947297864,0.2404620146918169Q0,0.24662813101349457 0.007528135284914805, 2.24661396275809L0.2926710777935708,78.0000141682554Q0.3001992130784856,80 2.3001992130784856, 80L78,80Q80,80 79.99982560923647, 78.00000000760303L79.9944352881578,16.18111752610946');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'NetworkCam');
       shape.attr({"x":5.640625,"y":69.125,"text-anchor":"start","text":"NetworkCam","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#BD2466","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M7.077599999998711,25.322299999999814Q7.077599999998711,21.322299999999814 11.07759999999871, 21.322299999999814L47.07759999999871,21.322299999999814Q51.07759999999871,21.322299999999814 51.07759999999871, 25.322299999999814L51.07759999999871,47.322299999999814Q51.07759999999871,51.322299999999814 47.07759999999871, 51.322299999999814L11.07759999999871,51.322299999999814Q7.077599999998711,51.322299999999814 7.077599999998711, 47.322299999999814L7.077599999998711,25.322299999999814');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M50.88073469083684,32.45000459669621Q50.86119999999755,30.450100000008206 52.560817500210284, 29.39591768514487L63.87798249978598,22.37648231486315Q65.57759999999871,21.322299999999814 65.57759999999871, 23.322299999999814L65.57759999999871,49.322299999999814Q65.57759999999871,51.322299999999814 63.91645483821974, 50.20847921033106L52.63054516177801,42.641120789660306Q50.96939999999904,41.527299999991556 50.949865309159755, 39.52739540330355L50.88073469083684,32.45000459669621');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":3,"ry":3,"cx":45.86119999999755,"cy":25.958674805342525,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'http://<address>:<port>');
       shape.attr({"x":6.640625,"y":13.109375,"text-anchor":"start","text":"http://<address>:<port>","font-family":"\"Arial\"","font-size":6,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
video_source_IPCamera = video_source_IPCamera.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
   
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()-6, 
            height: this.getHeight()/4*3 -6,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false;
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3,y:3}));
        
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });

    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function( context)
    {
        var image = new Image();
        image.onload = () => {
            this.getOutputPort("output_port1").setValue(image);
        };
        image.src = hardware.camera.image(this.attr("userData.ipAddress"));
    },
    
    
    onStart: function(context ){
        hardware.camera.start(this.attr("userData.ipAddress"));
    },
    
    
    onStop: function(context){
        hardware.camera.stop(this.attr("userData.ipAddress"));
    },
    
    getPersistentAttributes: function () 
    {
       let currentImage = this.img.attr("path");
       this.img.attr("path", this.TRANSPARENT_PIXEL);
    
       let memento = this._super()
    
       this.img.attr("path", currentImage);

       return memento
    },
    
    setPersistentAttributes: function (memento) {
        this._super(memento)
        
        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image)
        this.img.hitTest = ()=>false
        
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
    },
    
    getParameterSettings: function () {
        return [{
                name: "ipAddress",
                label: "IP-Address of the MJPEG Web Camera",
                property: {
                    type: "string"
                }
            }]
    }
    
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_source_WebCam = CircuitFigure.extend({

   NAME: "video_source_WebCam",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.744140625, y: 49.375 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,4Q0,0 4, 0L76,0Q80,0 80, 4L80,76Q80,80 76, 80L4,80Q0,80 0, 76L0,4');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'WebCam');
       shape.attr({"x":6.3046875,"y":67.5,"text-anchor":"start","text":"WebCam","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M12.22705078125,21Q12.22705078125,18 15.22705078125, 18L50.22705078125,18Q53.22705078125,18 53.22705078125, 21L53.22705078125,43Q53.22705078125,46 50.22705078125, 46L15.22705078125,46Q12.22705078125,46 12.22705078125, 43L12.22705078125,21');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M53.122734264543645,28.07737012110689Q53.17847478124895,25.07788800000708 55.76516920427005, 23.55834466008171L62.6403563582289,19.51954333992537Q65.22705078125,18 65.22705078125, 21L65.22705078125,43Q65.22705078125,46 62.60245076049134, 44.54690856067706L55.54093080200735,40.63734743931612Q52.91633078124869,39.184255999993184 52.972071297953995, 36.184773878893374L53.122734264543645,28.07737012110689');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":3.8705097763024305,"ry":3.8705097763024305,"cx":47.54582100494663,"cy":23.37050977630243,"stroke":"none","stroke-width":0,"fill":"rgba(192,15,57,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       

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
video_source_WebCam = video_source_WebCam.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
   
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()-6, 
            height: this.getHeight()/4*3 -6,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3,y:3}));

        
        this.imageCapture = null;
        this.track = null;
        this.processing = false;
        
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        if(this.imageCapture===null && this.processing === false){
            return
        }
        this.processing = true;
        this.imageCapture.takePhoto()
            .then((blob) =>{
                var a = new FileReader();
                a.onload = (e) => {
                    this.img.attr("path", e.target.result)
                    var image = new Image()
                    image.onload = () => {
                        this.getOutputPort("output_port1").setValue(image)
                        this.processing = false;
                    }
                    image.src = e.target.result
                }
                a.readAsDataURL(blob);
            }).catch((error) =>{
                //console.log('takePhoto() error: ', error);
            });
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        try{
            this.processing = false;
            navigator.mediaDevices.getUserMedia({ audio: false, video: true })
               .then((stream) =>{
                    this.track = stream.getVideoTracks()[0];
                    this.imageCapture = new ImageCapture(this.track);
                })
                .catch((err) =>{
                    console.log("no permission to use VideoCam");
                })
        }
        catch(e){
            console.log("didn't support mediaDevices")
        }

    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.track !==null){
            this.track.stop();
            this.track = null;
            this.imageCapture = null;
        }
        this.processing = false;
    },
    
    getPersistentAttributes: function () 
    {
       let currentImage = this.img.attr("path");
       this.img.attr("path", this.TRANSPARENT_PIXEL);
    
       let memento = this._super()
    
       this.img.attr("path", currentImage);

       return memento
    },
    
    setPersistentAttributes: function (memento) {
        this._super(memento)
        
        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image)
        this.img.hitTest = ()=>false
        
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_tools_Histogram = CircuitFigure.extend({

   NAME: "video_tools_Histogram",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:81.13504999999986,height:80.87877759999992},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9505139887140474, y: 49.34495943717131 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.92155116685083, y: 49.34495943717131 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 81.13504999999986;
      this.originalHeight= 80.87877759999992;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L81.13504999999986,0 L81.13504999999986,80.87877759999992 L0,80.87877759999992");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Histogram');
       shape.attr({"x":4.228799999999865,"y":68.37877759999992,"text-anchor":"start","text":"Histogram","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.587841281771944Q4.315424000003077,3.5878412817719436 8.315424000003077, 3.5878412817719436L71.31542400000308,3.5878412817719436Q75.31542400000308,3.5878412817719436 75.31542400000308, 7.587841281771944L75.31542400000308,51.587841281771944Q75.31542400000308,55.587841281771944 71.31542400000308, 55.587841281771944L8.315424000003077,55.587841281771944Q4.315424000003077,55.587841281771944 4.315424000003077, 51.587841281771944L4.315424000003077,7.587841281771944');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M26.881109741784876,49.0014882001456Q30.763898999993216,48.04026628178235 33.19092321874905, 50.011182688028384L33.19092321874905,50.011182688028384Q35.61794743750488,51.98209909427442 39.60742605740177, 51.69216747925865L43.95100709885412,51.376501803042366Q47.940485718751006,51.0865701880266 48.957170984829936, 47.21793333898817L50.809730091343845,40.16867368745212Q51.826415357422775,36.30003683841369 54.61532928927137, 33.43264096746374L60.3467595279926,27.539924375003793Q63.1356734598412,24.672528504053844 64.6440145226967, 28.377242695203275L73.80708293714758,50.88312709062251Q75.31542400000308,54.587841281771944 71.31542400000308, 54.587841281771944L8.315424000003077,54.587841281771944Q4.315424000003077,54.587841281771944 8.198213258211418, 53.62661936340869L26.881109741784876,49.0014882001456');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,5,5,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Blue
       shape = this.canvas.paper.path('M19.668557677951,50.01256520603322Q23.46607499998572,48.75603737552319 23.981302606081, 44.78935859927759L27.804895831405744,15.351948964267933Q28.320123437501024,11.385270188022332 30.150343500575005, 14.941995440374768L47.02364165567381,47.732416029423774Q48.853861718747794,51.28914128177621 49.91241655701927, 47.431750757811585L54.24723651914971,31.63559845613332Q55.305791357421185,27.778207932168698 56.32595992971813, 31.645927684697003L59.949680887541824,45.38437984527374Q60.96984945983877,49.252099597802044 64.7298452502696, 50.6168089646426L72.46880420956903,53.425703008681Q76.22879999999986,54.790412375521555 72.22879999999986, 54.790412375521555L9.228799999999865,54.790412375521555Q5.228799999999865,54.790412375521555 9.026317322034586, 53.533884545011524L19.668557677951,50.01256520603322');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,17,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Blue");
       
       // Green
       shape = this.canvas.paper.path('M43.953306587033246,51.516137367703884Q47.940485718751006,51.196133349612865 48.957170984829936, 47.32749650057443L50.809730091343845,40.278236849038386Q51.826415357422775,36.409599999999955 53.995775125476655, 39.77023657611901L57.8871136917881,45.79845508951964Q60.05647345984198,49.1590916656387 63.816469250272824, 50.523801032479255L71.55542820957224,53.33269507651765Q75.31542400000308,54.69740444335821 71.31542400000308, 54.69740444335821L8.315424000003077,54.69740444335821Q4.315424000003077,54.69740444335821 8.302603131720836, 54.37740042526719L43.953306587033246,51.516137367703884');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,181,78,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Green");
       

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
video_tools_Histogram = video_tools_Histogram.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        
        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()-6, 
            height: this.getHeight()/4*3-6,
            selectable: false,
            deleteable: false,
            resizeable:false,
            draggable: false,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false;
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));

        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
        this.getOutputPort("output_port1").setValue(img);
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            const  HISTOGRAM_SIZE = 256; // for 8-bit image
            const  MAX_VALUE = 255;      // max value in 8-bit image

            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            var imageSize = width * height;
            var histR  =  Array(HISTOGRAM_SIZE);
            var histG  =  Array(HISTOGRAM_SIZE);
            var histB  =  Array(HISTOGRAM_SIZE);
            histR.fill(0);
            histG.fill(0);
            histB.fill(0);
            
            // collect the distribution of the RGB values 
            //
            for (var index=0; index < pixels.length; index+=4) {
                histR[pixels[index  ]]++; // red
                histG[pixels[index+1]]++; // green
                histB[pixels[index+2]]++; // blue
            }

            var canvas = new OffscreenCanvas(width, height);
            var ctx = canvas.getContext('2d');

            let max = Math.max.apply(null, histR.concat(histG, histB))

            function drawColorGraph (vals, color) {
                const graphX = 0;
                const graphY = height;

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(graphX, height);
                for (let i = 0; i < vals.length; i++) {
                  let val = vals[i];
                  let drawHeight = Math.round((val / max) * height);
                  let drawX = graphX + (width / (vals.length - 1)) * i;
                  ctx.lineTo(drawX, graphY - drawHeight);
                }
                ctx.lineTo(graphX + width, graphY);
                ctx.closePath();
                ctx.fill();
            }
            
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.beginPath();
            ctx.fillRect(0,0, width, height);
            ctx.closePath();
 
            ctx.globalCompositeOperation = 'screen';
    
            drawColorGraph(histR, "#FF0000");
            drawColorGraph(histG, "#00FF00");
            drawColorGraph(histB, "#0000FF");
            imageData = ctx.getImageData(0, 0, width, height);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
           try{
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            this.img.attr("path", this.tmpCanvas.toDataURL());
            this.processing = false;
           }
           catch(exc){
              console.log(exc);
              this.processing = false;
           }
        };

        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    },
    
    setPersistentAttributes: function (memento) 
    {
        this._super(memento);

        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image);
        this.remove(this.img);
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));
        this.img.hitTest = ()=>false;
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_tools_Preview = CircuitFigure.extend({

   NAME: "video_tools_Preview",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(1);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 102.5, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M3.5,5.508584000000155Q3.5,3.5085840000001554 5.5, 3.5085840000001554L74.5,3.5085840000001554Q76.5,3.5085840000001554 76.5, 5.508584000000155L76.5,53.508584000000155Q76.5,55.508584000000155 74.5, 55.508584000000155L5.5,55.508584000000155Q3.5,55.508584000000155 3.5, 53.508584000000155L3.5,5.508584000000155');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(240,243,243,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M30.936231463021613,35.76911304131136Q30.872197764576413,36.19697836850173 30.786098882288115, 36.19697836850173L30.786098882288115,36.19697836850173Q30.699999999999818,36.19697836850173 30.02542399975173, 39.120152537087876L28.228848000250217,46.90534583141388Q27.55427200000213,49.828520000000026 30.55427200000213, 49.828520000000026L49.845727999999326,49.828520000000026Q52.845727999999326,49.828520000000026 52.17115199975087, 46.90534583141397L50.374576000248275,39.12015253708779Q49.69999999999982,36.19697836850173 49.61390111771152, 36.19697836850173L49.61390111771152,36.19697836850173Q49.52780223542322,36.19697836850173 49.46376853697802, 35.76911304131136L49.46376853697802,35.76911304131136Q49.39973483853282,35.34124771412098 49.189009825240646, 34.881505982345516L49.189009825240646,34.881505982345516Q48.97828481194847,34.42176425057005 48.63419792766399, 33.99039830073025L48.63419792766399,33.99039830073025Q48.29011104337951,33.55903235089045 47.82311719396512, 33.1691490190874L47.82311719396512,33.1691490190874Q47.356123344550724,32.77926568728435 46.780411901811476, 32.44271138126396L46.780411901811476,32.44271138126396Q46.20470045907223,32.10615707524357 45.5377641238706, 31.833157827294144L45.5377641238706,31.833157827294144Q44.870827788668976,31.560158579344716 44.132931084064694, 31.35900933346511L44.132931084064694,31.35900933346511Q43.39503437946041,31.157860087585505 42.60859792342853, 31.03467266183179L42.60859792342853,31.03467266183179Q41.822161467396654,30.91148523607808 41.011080733698236, 30.870002618039052L41.011080733698236,30.870002618039052Q40.19999999999982,30.828520000000026 39.3889192663014, 30.870002618039052L39.3889192663014,30.870002618039052Q38.57783853260298,30.91148523607808 37.7914020765711, 31.03467266183179L37.7914020765711,31.03467266183179Q37.004965620539224,31.157860087585505 36.26706891593494, 31.35900933346511L36.26706891593494,31.35900933346511Q35.52917221133066,31.560158579344716 34.862235876129034, 31.833157827294144L34.862235876129034,31.833157827294144Q34.19529954092741,32.10615707524357 33.61958809818816, 32.44271138126396L33.61958809818816,32.44271138126396Q33.04387665544891,32.77926568728435 32.57688280603452, 33.1691490190874L32.57688280603452,33.1691490190874Q32.109888956620125,33.55903235089045 31.765802072335646, 33.99039830073025L31.765802072335646,33.99039830073025Q31.421715188051166,34.42176425057005 31.21099017475899, 34.881505982345516L31.21099017475899,34.881505982345516Q31.000265161466814,35.34124771412098 30.936231463021613, 35.76911304131136L30.936231463021613,35.76911304131136');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Preview');
       shape.attr({"x":15.5,"y":67.50858400000016,"text-anchor":"start","text":"Preview","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8.5,"cx":39.69999999999982,"cy":19.328520000000026,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       

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
video_tools_Preview = video_tools_Preview.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        
        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()-6, 
            height: this.getHeight()/4*3-6,
            selectable: false,
            deleteable: false,
            resizeable:false,
            draggable: false,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false;
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));

        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        
        this.attr({
            resizeable:false
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var image = this.getInputPort("input_port1").getValue();
        if (image instanceof HTMLImageElement) {
            this.img.attr("path", image.src);
            this.getOutputPort("output_port1").setValue(image);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },
    
  
    getPersistentAttributes: function () 
    {
       let currentImage = this.img.attr("path");
       this.img.attr("path", this.TRANSPARENT_PIXEL);
    
       let memento = this._super();
    
       this.img.attr("path", currentImage);

       return memento;
    },

    setPersistentAttributes: function (memento) 
    {
        this._super(memento);

        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image);
        this.remove(this.img);
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));
        this.img.hitTest = ()=>false;
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
    },
    
    getContextMenuEntries: function(){
        return {
              "expand": {name: "Expand Image"}
        };
    },
    
    executeContextMenuEntry: function(key, x, y){
        var image = new Image();
        image.src = this.img.attr("path");
        var w = window.open("");
        w.document.write(image.outerHTML);
    },
  
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_tools_VideoSelector = CircuitFigure.extend({

   NAME: "video_tools_VideoSelector",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40.6875,height:84},attr), setter, getter);
     var port;
     // input_port3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.398279569892874, y: 81.34154761904765 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port3");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.398279569892874, y: 46.42857142857143 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.398279569892874, y: 12.467376411074751 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.47444583453309, y: 30.457738095238017 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40.6875;
      this.originalHeight= 84;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40.6875,0 L40.6875,84 L0,84");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,2Q0,0 2, 0L38,0Q40,0 40, 2L40,78Q40,80 38, 80L2,80Q0,80 0, 78L0,2');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Selector');
       shape.attr({"x":7,"y":73.3125,"text-anchor":"start","text":"Selector","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Video');
       shape.attr({"x":6.5,"y":62.6875,"text-anchor":"start","text":"Video","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // high
       shape = this.canvas.paper.path('M35.0014546875027 23.42591640624869L5.0260546874969805,11.796116406252622');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       
       // low
       shape = this.canvas.paper.path('M34.92365468750086 26.972316406244317L5.275854687495666,38.43831640625194');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       

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
video_tools_VideoSelector = video_tools_VideoSelector.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        
        this.getInputPort("input_port2").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        let inValue1 = this.getInputPort("input_port1").getValue();
        let inValue2 = this.getInputPort("input_port2").getValue();
        let inValue3 = this.getInputPort("input_port3").getBooleanValue();
        if(inValue3 === true){
            this.getOutputPort("output_port1").setValue(inValue1);
        }
        else{
            this.getOutputPort("output_port1").setValue(inValue2);
        }
        
        if(this.getInputPort("input_port3").hasChangedValue()){
            this.layerShow("low" , !inValue3, 100);
            this.layerShow("high",  inValue3, 100);
        }
    },
    
    onStart:function(context){
        let inValue3 = this.getInputPort("input_port3").getBooleanValue();
        this.layerShow("low" , !inValue3, 100);
        this.layerShow("high",  inValue3, 100);
    },
    
    
    setPersistentAttributes: function (memento) {
        this._super(memento);
        
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });
        
        this.getInputPort("input_port2").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });

    },
    

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var widget_HighLow = CircuitFigure.extend({

   NAME: "widget_HighLow",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:42,height:43.5},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.80952380952381, y: 51.72413793103448 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 42;
      this.originalHeight= 43.5;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L42,0 L42,43.5 L0,43.5");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":4.5,"y":10.5,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#C21B7A","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'0');
       shape.attr({"x":4,"y":32.5,"text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":3,"ry":3.5,"cx":39,"cy":22.5,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // high
       shape = this.canvas.paper.path('M39.29830000000038 22.446912500003236L13.857399999998961,11.091512500001045');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       
       // low
       shape = this.canvas.paper.path('M38.75319999999738 22.70831250000083L13.644500000000335,32.35131249999904');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       

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
widget_HighLow = widget_HighLow.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.value = false;
        this.on("click",()=>{            
            this.value = !this.value;
            this.layerShow("low" , !this.value, 100);
            this.layerShow("high",  this.value, 100);
            this.getOutputPort(0).setValue(this.value);
        });

        this.on("added",()=>{
            this.layerShow("low" , !this.value);
            this.layerShow("high",  this.value);
            this.getOutputPort(0).setValue(this.value);
        });
    },
    
    calculate: function()
    {
        // do nothing per default;
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var widget_PushButton = CircuitFigure.extend({

   NAME: "widget_PushButton",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:35.04322500000035,height:28.93699999999899},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 131.7741517796944, y: 82.88350554653319 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 35.04322500000035;
      this.originalHeight= 28.93699999999899;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L35.04322500000035,0 L35.04322500000035,28.93699999999899 L0,28.93699999999899");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Label
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4.5,"ry":4,"cx":4.5,"cy":22.98399999999947,"stroke":"none","stroke-width":0,"fill":"rgba(194,27,122,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4.5,"ry":4,"cx":27.5,"cy":23.48399999999947,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // low
       shape = this.canvas.paper.path('M26.125825000000987,8.735999999999876Q24.125825000000987,8.735999999999876 24.125825000000987, 6.735999999999876L24.125825000000987,2Q24.125825000000987,0 22.125825000000987, 0L11.125825000000987,0Q9.125825000000987,0 9.125825000000987, 2L9.125825000000987,6.735999999999876Q9.125825000000987,8.735999999999876 7.125825000000987, 8.735999999999876L2.299425000001065,8.735999999999876Q0.2994250000010652,8.735999999999876 0.2994250000010652, 10.735999999999876L0.2994250000010652,11.735999999999876Q0.2994250000010652,13.735999999999876 2.299425000001065, 13.735999999999876L30.299425000001065,13.735999999999876Q32.299425000001065,13.735999999999876 32.299425000001065, 11.735999999999876L32.299425000001065,10.735999999999876Q32.299425000001065,8.735999999999876 30.299425000001065, 8.735999999999876L26.125825000000987,8.735999999999876');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","low");
       
       // high
       shape = this.canvas.paper.path('M22.31382500000109,16.235999999999876Q20.50182500000119,16.235999999999876 21.26817190867568, 14.388647187036133L23.359478091326498,9.347352812963743Q24.125825000000987,7.5 22.125825000000987, 7.5L11.125825000000987,7.5Q9.125825000000987,7.5 9.627772390073126, 9.4359878144244L10.888877609928265,14.300012185575476Q11.390825000000405,16.235999999999876 9.390825000000405, 16.235999999999876L2.299425000001065,16.235999999999876Q0.2994250000010652,16.235999999999876 0.2994250000010652, 18.235999999999876L0.2994250000010652,19.235999999999876Q0.2994250000010652,21.235999999999876 2.299425000001065, 21.235999999999876L30.299425000001065,21.235999999999876Q32.299425000001065,21.235999999999876 32.299425000001065, 19.235999999999876L32.299425000001065,18.235999999999876Q32.299425000001065,16.235999999999876 30.299425000001065, 16.235999999999876L26.125825000000987,16.235999999999876Q24.125825000000987,16.235999999999876 22.31382500000109, 16.235999999999876L22.31382500000109,16.235999999999876');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","high");
       
       // Line
       shape = this.canvas.paper.path('M30.043225000000348 23.93699999999899L37.699524999999994,23.93699999999899L45.35582500000055,23.93699999999899');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
widget_PushButton = widget_PushButton.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.setResizeable(false);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.value = false;
        this.on("mousedown",()=>{            
            this.layerShow("low" , false, 100);
            this.layerShow("high", true,  100);
            this.getOutputPort(0).setValue(true);
        });
        this.on("mouseup",()=>{            
            this.value = !this.value;
            this.layerShow("low" , true,  100);
            this.layerShow("high", false, 100);
            this.getOutputPort(0).setValue(false);
        });

        this.on("added",()=>{
            this.layerShow("low" , true);
            this.layerShow("high", false);
            this.getOutputPort(0).setValue(false);
        });
    },
    
    calculate: function()
    {
        // do nothing per default;
    }

});


var widget_Slider = draw2d.shape.widget.Slider.extend({

    NAME: "widget_Slider",
    VERSION: "1.0.0",

    init: function () {
        this._super({bold: false, fontFamily: "Verdana", fontSize: 10, bgColor: "#fafafa"});

        this.persistPorts = false

        this.outputPort = new DecoratedOutputPort()
        this.outputPort.setName("output")
        this.addPort(this.outputPort)

        this.on("change:userData.value", (figure, event) => {
            this.setValue(parseInt(event.value))
        })

        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.on("change:value", (element, event) => {
            let value = parseInt(event.value); // 0..100
            value = 5.0 / 100.0 * value;       // 0..5
            this.getOutputPort(0).setValue(value);
        });
    },

    calculate: function (context) {
    },

    onStart: function (context) {
        let value = 5.0 / 100.0 * this.getValue();       // 0..5
        this.getOutputPort(0).setValue(value);
    },

    onStop: function (context) {
    },


    onPanning: function (dx, dy, dx2, dy2) {
        // calculate the current position of the mouse pos
        //
        let width = this.getWidth()
        let sliderWidth = width - this.padding.left - this.padding.right

        let figurePos = Math.min(width, Math.max(0, this.panningX + dx))
        let sliderPos = Math.min(width - this.padding.left - this.padding.right, figurePos)

        this.setValue(100 / sliderWidth * sliderPos)
    },


    getPersistentAttributes: function ()
    {
        let memento = this._super()
        memento.value = this.getValue()
        return memento
    },

    setPersistentAttributes: function (memento)
    {
        this._super(memento)
        if(memento.value){
            this.setValue(parseInt(memento.value))
        }
    }

});





var widget_Sparkline = draw2d.shape.diagram.Sparkline.extend({

    NAME : "widget_Sparkline",

    init : function(attr)
    {
        this._super(attr)
        this.maxValues = 100
        this.min = 0
        this.max = 5
        this.padding=4
        this.persistPorts = false

        this.inputPort = new DecoratedInputPort()
        this.inputPort.setName("input")
        this.inputPort.setMaxFanOut(1)

        this.outputPort = new DecoratedOutputPort()
        this.outputPort.setName("output")

        this.setBackgroundColor("#FF765E")
        this.setRadius(5)
        this.addPort(this.inputPort)
        this.addPort(this.outputPort)
        this.setDimension(250,50)

        // get the connected port and forward the port to the related party ( SignalSource shape)
        // The Sparkline forwards the original signal without any delay. The signal runtime is the same if the
        // Sparkline in between a connect or not
        this.inputPort.on("connect", (emitter, event)=>{
            let signalPort = event.connection.getSource()
            this.outputPort.originalGetValue = this.outputPort.getValue
            this.outputPort.originalGetBooleanValue = this.outputPort.getBooleanValue
            this.outputPort.getValue = ()=>{
                return signalPort.getValue()
            }
            this.outputPort.getBooleanValue = ()=>{
                return signalPort.getBooleanValue()
            }
        })
        this.inputPort.on("disconnect", (emitter, event)=>{
            this.outputPort.getValue = this.outputPort.originalGetValue
            this.outputPort.getBooleanValue = this.outputPort.originalGetBooleanValue
        })
    },

    setData:function( data)
    {
        this._super(data)
        this.cache= {}
        this.min = 0
        this.max = 5
        this.repaint()
    },


    /**
     * @method
     *
     * Update the chart with the current value of the input port.
     *
     */
    calculate:function(context)
    {
        let port = this.getInputPort(0)
        let value=port.getValue() || 0.0
        this.data.push(value===null?0:value)
        if(this.data.length>this.maxValues) {
            this.data.shift()
        }
        this.setData(this.data)
    },

    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
        return {
            arduino: false
        }
    }
});



