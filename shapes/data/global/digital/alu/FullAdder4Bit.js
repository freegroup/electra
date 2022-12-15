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