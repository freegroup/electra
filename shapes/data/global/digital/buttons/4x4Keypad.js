var digital_buttons_4x4Keypad = CircuitFigure.extend({

   NAME: "digital_buttons_4x4Keypad",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:102.52570724487305,height:103.27760000000035 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // out_a
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.59840751580046, y: 11.351397263981276 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_a");
     port.setMaxFanOut(20);
     this.read["out_a"] = port.getValue.bind(port)
     this.write["out_a"]= port.setValue.bind(port)

     // out_b
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.59840751580046, y: 30.71668073300063 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_b");
     port.setMaxFanOut(20);
     this.read["out_b"] = port.getValue.bind(port)
     this.write["out_b"]= port.setValue.bind(port)

     // out_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.59840751580046, y: 50.08196420201998 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_c");
     port.setMaxFanOut(20);
     this.read["out_c"] = port.getValue.bind(port)
     this.write["out_c"]= port.setValue.bind(port)

     // out_d
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.59840751580046, y: 69.93137975776483 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_d");
     port.setMaxFanOut(20);
     this.read["out_d"] = port.getValue.bind(port)
     this.write["out_d"]= port.setValue.bind(port)

     // out_strobe
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 103.59840751580046, y: 89.08030395748904 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_strobe");
     port.setMaxFanOut(20);
     this.read["out_strobe"] = port.getValue.bind(port)
     this.write["out_strobe"]= port.setValue.bind(port)

   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 102.52570724487305;
      this.originalHeight= 103.27760000000035;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L102.52570724487305,0 L102.52570724487305,103.27760000000035 L0,103.27760000000035");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.00 1.78L100.00 1.78L100.00 101.78L0.00 101.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // rect_0
       shape = this.canvas.paper.path('M0.00 1.78L20.00 1.78L20.00 21.78L0.00 21.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_0");
       
       // rect_1
       shape = this.canvas.paper.path('M20.00 1.78L40.00 1.78L40.00 21.78L20.00 21.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_1");
       
       // rect_2
       shape = this.canvas.paper.path('M40.00 1.78L60.00 1.78L60.00 21.78L40.00 21.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_2");
       
       // rect_3
       shape = this.canvas.paper.path('M60.00 1.78L80.00 1.78L80.00 21.78L60.00 21.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_3");
       
       // rect_4
       shape = this.canvas.paper.path('M0.00 21.78L20.00 21.78L20.00 41.78L0.00 41.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_4");
       
       // rect_8
       shape = this.canvas.paper.path('M0.00 41.78L20.00 41.78L20.00 61.78L0.00 61.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_8");
       
       // rect_c
       shape = this.canvas.paper.path('M0.00 61.78L20.00 61.78L20.00 81.78L0.00 81.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_c");
       
       // rect_5
       shape = this.canvas.paper.path('M20.00 21.78L40.00 21.78L40.00 41.78L20.00 41.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_5");
       
       // rect_6
       shape = this.canvas.paper.path('M40.00 21.78L60.00 21.78L60.00 41.78L40.00 41.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_6");
       
       // rect_7
       shape = this.canvas.paper.path('M60.00 21.78L80.00 21.78L80.00 41.78L60.00 41.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_7");
       
       // rect_9
       shape = this.canvas.paper.path('M20.00 41.78L40.00 41.78L40.00 61.78L20.00 61.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_9");
       
       // rect_a
       shape = this.canvas.paper.path('M40.00 41.78L60.00 41.78L60.00 61.78L40.00 61.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_a");
       
       // rect_b
       shape = this.canvas.paper.path('M60.00 41.78L80.00 41.78L80.00 61.78L60.00 61.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_b");
       
       // rect_d
       shape = this.canvas.paper.path('M20.00 61.78L40.00 61.78L40.00 81.78L20.00 81.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_d");
       
       // rect_e
       shape = this.canvas.paper.path('M40.00 61.78L60.00 61.78L60.00 81.78L40.00 81.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_e");
       
       // rect_f
       shape = this.canvas.paper.path('M60.00 61.78L80.00 61.78L80.00 81.78L60.00 81.78Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_f");
       
       // Label
       shape = this.canvas.paper.text(0,0,'0');
       shape.attr({"x":"4.001.5","y":"10.750","text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":"4.0022.5","y":"10.750","text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'2');
       shape.attr({"x":"4.0042.5","y":"10.750","text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'3');
       shape.attr({"x":"4.0062.5","y":"10.750","text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4');
       shape.attr({"x":"4.002.5","y":"10.7521.277600000000348","text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'5');
       shape.attr({"x":"4.0022.5","y":"10.7521.277600000000348","text-anchor":"start","text":"5","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'6');
       shape.attr({"x":"4.0042.5","y":"10.7521.277600000000348","text-anchor":"start","text":"6","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'7');
       shape.attr({"x":"4.0062.5","y":"10.7521.277600000000348","text-anchor":"start","text":"7","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'8');
       shape.attr({"x":"4.002.5","y":"10.7541.27760000000035","text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'9');
       shape.attr({"x":"4.0023","y":"10.7541.27760000000035","text-anchor":"start","text":"9","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":"4.0042.5","y":"10.7541.27760000000035","text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":"4.0062","y":"10.7540.77760000000035","text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":"4.001.5043396949768066","y":"10.7561.05414933929478","text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":"4.0021.5","y":"10.7561.77760000000035","text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'E');
       shape.attr({"x":"4.0041.5","y":"10.7561.77760000000035","text-anchor":"start","text":"E","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'F');
       shape.attr({"x":"4.0062","y":"10.7561.27760000000035","text-anchor":"start","text":"F","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":"4.0086.17759999999998","y":"10.751.7776000000003478","text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":"4.0086.17759999999998","y":"10.7522","text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'strobe');
       shape.attr({"x":"4.0060.53896427154541","y":"10.7581.77760000000035","text-anchor":"start","text":"strobe","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":"4.0085.85383224487305","y":"10.7562","text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":"4.0085.67759999999998","y":"10.7541.77760000000035","text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
digital_buttons_4x4Keypad = digital_buttons_4x4Keypad.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        // your special code here
        this.on("click", (emitter, event) => {
            console.log(event)
            /*
            let h = emitter.getHeight();
            let modh = h/this.bitCount;
            let index = (event.relY/modh)|0;
            let port = emitter.getOutputPort(index);
            port.setValue(!port.getBooleanValue());
            emitter.layerAttr("rect0"+(index+1), {fill:port.getBooleanValue()?"#C21B7A":"#FFFFFF"});
            */
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