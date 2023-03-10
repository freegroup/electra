var digital_gate_DIN40700_NOR = CircuitFigure.extend({

   NAME: "digital_gate_DIN40700_NOR",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:30.5,height:40 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 88.52459016393443, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
     this.read["output"] = port.getValue.bind(port)
     this.write["output"]= port.setValue.bind(port)

     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.338360655739246, y: 80 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
     this.read["input1"] = port.getValue.bind(port)
     this.write["input1"]= port.setValue.bind(port)

     // input0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.338360655739246, y: 21.25 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input0");
     port.setMaxFanOut(20);
     this.read["input0"] = port.getValue.bind(port)
     this.write["input0"]= port.setValue.bind(port)

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
       
       // Line
       shape = this.canvas.paper.path('M19.44 31.56L0.75,31.56');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M19.71 8.14L1.01,8.14');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":4.5,"ry":4.5,"cx":26,"cy":20,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
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