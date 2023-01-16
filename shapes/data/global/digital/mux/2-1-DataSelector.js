// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_mux_2_1_DataSelector = CircuitFigure.extend({

   NAME: "digital_mux_2_1_DataSelector",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:199},attr), setter, getter);
     var port;
     // input_a1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.5634765625, y: 18.5929648241206 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a1");
     port.setMaxFanOut(1);
     // input_a2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.1327421875002983, y: 28.643216080402006 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a2");
     port.setMaxFanOut(1);
     // input_a3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2287421875000746, y: 38.69346733668341 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a3");
     port.setMaxFanOut(1);
     // input_a4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.1327421875002983, y: 48.74371859296482 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a4");
     port.setMaxFanOut(1);
     // input_b1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2287421875000746, y: 63.81909547738693 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b1");
     port.setMaxFanOut(1);
     // input_b2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2327421875002074, y: 73.86934673366834 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b2");
     port.setMaxFanOut(1);
     // input_b3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2327421875002074, y: 83.91959798994974 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b3");
     port.setMaxFanOut(1);
     // input_b4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2327421875002074, y: 93.96984924623115 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b4");
     port.setMaxFanOut(1);
     // output_q1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.3115234375, y: 39.698492462311556 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q1");
     port.setMaxFanOut(20);
     // output_q2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.6865234375, y: 49.74874371859296 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q2");
     port.setMaxFanOut(20);
     // output_q3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.6865234375, y: 59.79899497487437 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q3");
     port.setMaxFanOut(20);
     // output_q4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.6865234375, y: 69.84924623115577 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q4");
     port.setMaxFanOut(20);
     // input_select
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.26725781249979264, y: 6.030150753768844 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_select");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 199;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,199 L0,199");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1Q0,0 1, 0L79,0Q80,0 80, 1L80,198Q80,199 79, 199L1,199Q0,199 0, 198L0,1');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A1');
       shape.attr({"x":6.21700624999994,"y":37.2109375,"text-anchor":"start","text":"A1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A2');
       shape.attr({"x":6.21700624999994,"y":57.3359375,"text-anchor":"start","text":"A2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":55,"y":78.9140625,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A3');
       shape.attr({"x":6.21700624999994,"y":76.9453125,"text-anchor":"start","text":"A3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":55,"y":119.0852374999995,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":55,"y":98.9609375,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B2');
       shape.attr({"x":6.21700624999994,"y":147.9609375,"text-anchor":"start","text":"B2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B1');
       shape.attr({"x":6.21700624999994,"y":127.4140625,"text-anchor":"start","text":"B1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A4');
       shape.attr({"x":6.21700624999994,"y":97.44050000000061,"text-anchor":"start","text":"A4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B3');
       shape.attr({"x":6.21700624999994,"y":168.0852374999995,"text-anchor":"start","text":"B3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B4');
       shape.attr({"x":6.293806249999761,"y":187.6171875,"text-anchor":"start","text":"B4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":55,"y":138.4405000000006,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'MUX');
       shape.attr({"x":29.91427187499994,"y":36.860198974609375,"text-anchor":"start","text":"MUX","font-family":"\"Arial\"","font-size":15,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'select');
       shape.attr({"x":7.713806249999834,"y":10.75,"text-anchor":"start","text":"select","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_mux_2_1_DataSelector = digital_mux_2_1_DataSelector.extend({

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
        if(this.getInputPort("input_select").getBooleanValue()){
            this.getOutputPort("output_q1").setValue(this.getInputPort("input_a1").getBooleanValue());
            this.getOutputPort("output_q2").setValue(this.getInputPort("input_a2").getBooleanValue());
            this.getOutputPort("output_q3").setValue(this.getInputPort("input_a3").getBooleanValue());
            this.getOutputPort("output_q4").setValue(this.getInputPort("input_a4").getBooleanValue());
        } else {
            this.getOutputPort("output_q1").setValue(this.getInputPort("input_b1").getBooleanValue());
            this.getOutputPort("output_q2").setValue(this.getInputPort("input_b2").getBooleanValue());
            this.getOutputPort("output_q3").setValue(this.getInputPort("input_b3").getBooleanValue());
            this.getOutputPort("output_q4").setValue(this.getInputPort("input_b4").getBooleanValue());
        }

    }
});