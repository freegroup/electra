var digital_alu_FullAdder4Bit = CircuitFigure.extend({

   NAME: "digital_alu_FullAdder4Bit",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:82.109375,height:223.078125 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // output_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.77215604186496, y: 91.89605659452266 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_c");
     port.setMaxFanOut(20);
     this.read["output_c"] = port.getValue.bind(port)
     this.write["output_c"]= port.setValue.bind(port)

     // input_a1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8822378686965522, y: 8.769349303074875 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a1");
     port.setMaxFanOut(1);
     this.read["input_a1"] = port.getValue.bind(port)
     this.write["input_a1"]= port.setValue.bind(port)

     // input_a2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.78870409134187, y: 17.738202703649346 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a2");
     port.setMaxFanOut(1);
     this.read["input_a2"] = port.getValue.bind(port)
     this.write["input_a2"]= port.setValue.bind(port)

     // input_a3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8822378686965522, y: 26.896406808152975 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a3");
     port.setMaxFanOut(1);
     this.read["input_a3"] = port.getValue.bind(port)
     this.write["input_a3"]= port.setValue.bind(port)

     // input_a4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.78870409134187, y: 35.861875744203964 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_a4");
     port.setMaxFanOut(1);
     this.read["input_a4"] = port.getValue.bind(port)
     this.write["input_a4"]= port.setValue.bind(port)

     // input_b1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8822378686965522, y: 49.31007914828045 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b1");
     port.setMaxFanOut(1);
     this.read["input_b1"] = port.getValue.bind(port)
     this.write["input_b1"]= port.setValue.bind(port)

     // input_b2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8861351094198024, y: 58.27554808433144 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b2");
     port.setMaxFanOut(1);
     this.read["input_b2"] = port.getValue.bind(port)
     this.write["input_b2"]= port.setValue.bind(port)

     // input_b3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8861351094198024, y: 67.24101702038243 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b3");
     port.setMaxFanOut(1);
     this.read["input_b3"] = port.getValue.bind(port)
     this.write["input_b3"]= port.setValue.bind(port)

     // input_b4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8861351094198024, y: 76.20648595643343 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_b4");
     port.setMaxFanOut(1);
     this.read["input_b4"] = port.getValue.bind(port)
     this.write["input_b4"]= port.setValue.bind(port)

     // input_c
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.8861351094198024, y: 91.89605659452266 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_c");
     port.setMaxFanOut(1);
     this.read["input_c"] = port.getValue.bind(port)
     this.write["input_c"]= port.setValue.bind(port)

     // output_s1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.77215604186496, y: 8.965468936050991 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_s1");
     port.setMaxFanOut(20);
     this.read["output_s1"] = port.getValue.bind(port)
     this.write["output_s1"]= port.setValue.bind(port)

     // output_s2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.77215604186496, y: 17.930937872101982 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_s2");
     port.setMaxFanOut(20);
     this.read["output_s2"] = port.getValue.bind(port)
     this.write["output_s2"]= port.setValue.bind(port)

     // output_s3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.77215604186496, y: 26.61592211248839 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_s3");
     port.setMaxFanOut(20);
     this.read["output_s3"] = port.getValue.bind(port)
     this.write["output_s3"]= port.setValue.bind(port)

     // output_s4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.77215604186496, y: 35.861875744203964 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_s4");
     port.setMaxFanOut(20);
     this.read["output_s4"] = port.getValue.bind(port)
     this.write["output_s4"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 82.109375;
      this.originalHeight= 223.078125;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L82.109375,0 L82.109375,223.078125 L0,223.078125");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1Q0,0 1, 0L79,0Q80,0 80, 1L80,220Q80,221 79, 221L1,221Q0,221 0, 220L0,1');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'FA');
       shape.attr({"x":31.538024999999834,"y":81.72956250000061,"text-anchor":"start","text":"FA","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A1');
       shape.attr({"x":6.27559999999994,"y":20.5,"text-anchor":"start","text":"A1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A2');
       shape.attr({"x":6.27559999999994,"y":40.625,"text-anchor":"start","text":"A2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'out');
       shape.attr({"x":62.109375,"y":212.635625,"text-anchor":"start","text":"out","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q1');
       shape.attr({"x":57.96309999999994,"y":20.5,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":55.93184999999994,"y":205.34375,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A3');
       shape.attr({"x":6.27559999999994,"y":60.734375,"text-anchor":"start","text":"A3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q3');
       shape.attr({"x":57.96309999999994,"y":59.624299999999494,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q2');
       shape.attr({"x":57.96309999999994,"y":40.0625,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'in');
       shape.attr({"x":17.772399999999834,"y":212.71375,"text-anchor":"start","text":"in","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B2');
       shape.attr({"x":6.27559999999994,"y":131.4375,"text-anchor":"start","text":"B2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B1');
       shape.attr({"x":6.27559999999994,"y":111.203125,"text-anchor":"start","text":"B1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A4');
       shape.attr({"x":5.77559999999994,"y":80.72956250000061,"text-anchor":"start","text":"A4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":8.27559999999994,"y":205.640625,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B3');
       shape.attr({"x":6.27559999999994,"y":151.171875,"text-anchor":"start","text":"B3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B4');
       shape.attr({"x":6.852399999999761,"y":171.40625,"text-anchor":"start","text":"B4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Q4');
       shape.attr({"x":58.11934999999994,"y":80.22956250000061,"text-anchor":"start","text":"Q4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4 Bit');
       shape.attr({"x":25.94747499999994,"y":148,"text-anchor":"start","text":"4 Bit","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
    }
});