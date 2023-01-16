// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var digital_memory_16x4_RAM = CircuitFigure.extend({

   NAME: "digital_memory_16x4_RAM",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:219},attr), setter, getter);
     var port;
     // input_a1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.5634765625, y: 25.816923515981735 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a1");
     port.setMaxFanOut(1);
     // input_a2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.1327421875002983, y: 34.949343607305934 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a2");
     port.setMaxFanOut(1);
     // input_a3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2287421875000746, y: 44.081763698630134 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a3");
     port.setMaxFanOut(1);
     // input_a4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.1327421875002983, y: 53.21418378995433 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a4");
     port.setMaxFanOut(1);
     // input_d1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2287421875000746, y: 66.91281392694063 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d1");
     port.setMaxFanOut(1);
     // input_d2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2327421875002074, y: 76.04523401826484 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d2");
     port.setMaxFanOut(1);
     // input_d3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2327421875002074, y: 85.17765410958904 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d3");
     port.setMaxFanOut(1);
     // input_d4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -2.2327421875002074, y: 94.31007420091323 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_d4");
     port.setMaxFanOut(1);
     // input_enable
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.26725781249979264, y: 5.268978310502283 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_enable");
     port.setMaxFanOut(1);
     // output_q1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.3115234375, y: 66.91281392694063 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q1");
     port.setMaxFanOut(20);
     // output_q2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.6865234375, y: 76.04523401826484 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q2");
     port.setMaxFanOut(20);
     // output_q3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.6865234375, y: 85.17765410958904 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q3");
     port.setMaxFanOut(20);
     // output_q4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.6865234375, y: 94.31007420091323 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_q4");
     port.setMaxFanOut(20);
     // input_rw
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0.26725781249979264, y: 14.401398401826484 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_rw");
     port.setMaxFanOut(1);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 219;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,219 L0,219");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1Q0,0 1, 0L79,0Q80,0 80, 1L80,218Q80,219 79, 219L1,219Q0,219 0, 218L0,1');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A1');
       shape.attr({"x":6.21700624999994,"y":56.75,"text-anchor":"start","text":"A1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A2');
       shape.attr({"x":6.21700624999994,"y":76.875,"text-anchor":"start","text":"A2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":57.40450624999994,"y":146.453125,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A3');
       shape.attr({"x":6.21700624999994,"y":96.484375,"text-anchor":"start","text":"A3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":57.40450624999994,"y":186.6242999999995,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":57.40450624999994,"y":166.5,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":6.21700624999994,"y":166.5,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D1');
       shape.attr({"x":6.21700624999994,"y":145.953125,"text-anchor":"start","text":"D1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A4');
       shape.attr({"x":6.21700624999994,"y":116.97956250000061,"text-anchor":"start","text":"A4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":6.21700624999994,"y":186.6242999999995,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":6.293806249999761,"y":206.15625,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":57.56075624999994,"y":205.9795625000006,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'16x4');
       shape.attr({"x":21.59765625,"y":98.984375,"text-anchor":"start","text":"16x4","font-family":"\"Arial\"","font-size":18,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'enable');
       shape.attr({"x":7.218363805389345,"y":11.254799999999705,"text-anchor":"start","text":"enable","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'RAM');
       shape.attr({"x":25.41427187499994,"y":82.375,"text-anchor":"start","text":"RAM","font-family":"\"Arial\"","font-size":15,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'r/w');
       shape.attr({"x":7.713806249999834,"y":30.2890625,"text-anchor":"start","text":"r/w","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
digital_memory_16x4_RAM = digital_memory_16x4_RAM.extend({

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
        input.push(this.getInputPort("input_a2").getBooleanValue());
        input.push(this.getInputPort("input_a3").getBooleanValue());
        input.push(this.getInputPort("input_a4").getBooleanValue());
        
        input.push(this.getInputPort("input_b1").getBooleanValue());
        input.push(this.getInputPort("input_b2").getBooleanValue());
        input.push(this.getInputPort("input_b3").getBooleanValue());
        input.push(this.getInputPort("input_b4").getBooleanValue());
 
        input.push(this.getInputPort("input_c").getBooleanValue());
 
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
        
        this.getOutputPort("output_s1").setValue(output[0]);
        this.getOutputPort("output_s2").setValue(output[1]);
        this.getOutputPort("output_s3").setValue(output[2]);
        this.getOutputPort("output_s4").setValue(output[3]);
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