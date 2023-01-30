var digital_buttons_4x4Keypad = CircuitFigure.extend({

   NAME: "digital_buttons_4x4Keypad",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     this._super( {...attr, stroke:0, bgColor:null, width:110.49250000000029,height:104.5 }, setter, getter);
     this.read = {};
     this.write = {};

     let port;
     // out_a
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105.2223939384449, y: 31.2333014354073 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_a");
     port.setMaxFanOut(20);
     this.read["out_a"] = port.getValue.bind(port)
     this.write["out_a"]= port.setValue.bind(port)

     // out_b
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105.2223939384449, y: 50.37205741626855 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_b");
     port.setMaxFanOut(20);
     this.read["out_b"] = port.getValue.bind(port)
     this.write["out_b"]= port.setValue.bind(port)

     // out_c
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105.2223939384449, y: 69.5108133971298 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_c");
     port.setMaxFanOut(20);
     this.read["out_c"] = port.getValue.bind(port)
     this.write["out_c"]= port.setValue.bind(port)

     // out_d
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105.2223939384449, y: 88.64956937799103 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out_d");
     port.setMaxFanOut(20);
     this.read["out_d"] = port.getValue.bind(port)
     this.write["out_d"]= port.setValue.bind(port)

     // out_strobe
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 105.2223939384449, y: 12.094545454546056 }));
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
      this.originalWidth = 110.49250000000029;
      this.originalHeight= 104.5;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L110.49250000000029,0 L110.49250000000029,104.5 L0,104.5");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.49250000000029104 1.7776000000003478L110.49250000000029 1.7776000000003478L110.49250000000029 101.77760000000035L0.49250000000029104 101.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // rect_0
       shape = this.canvas.paper.path('M0 1.7776000000003478L20 1.7776000000003478L20 21.777600000000348L0 21.777600000000348Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_0");
       
       // rect_1
       shape = this.canvas.paper.path('M20 1.7776000000003478L40 1.7776000000003478L40 21.777600000000348L20 21.777600000000348Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_1");
       
       // rect_2
       shape = this.canvas.paper.path('M40 1.7776000000003478L60 1.7776000000003478L60 21.777600000000348L40 21.777600000000348Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_2");
       
       // rect_3
       shape = this.canvas.paper.path('M60 1.7776000000003478L80 1.7776000000003478L80 21.777600000000348L60 21.777600000000348Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_3");
       
       // rect_4
       shape = this.canvas.paper.path('M0 21.777600000000348L20 21.777600000000348L20 41.77760000000035L0 41.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_4");
       
       // rect_5
       shape = this.canvas.paper.path('M20 21.777600000000348L40 21.777600000000348L40 41.77760000000035L20 41.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_5");
       
       // rect_6
       shape = this.canvas.paper.path('M40 21.777600000000348L60 21.777600000000348L60 41.77760000000035L40 41.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_6");
       
       // rect_7
       shape = this.canvas.paper.path('M60 21.777600000000348L80 21.777600000000348L80 41.77760000000035L60 41.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_7");
       
       // rect_8
       shape = this.canvas.paper.path('M0 41.77760000000035L20 41.77760000000035L20 61.77760000000035L0 61.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_8");
       
       // rect_9
       shape = this.canvas.paper.path('M20 41.77760000000035L40 41.77760000000035L40 61.77760000000035L20 61.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_9");
       
       // rect_a
       shape = this.canvas.paper.path('M40 41.77760000000035L60 41.77760000000035L60 61.77760000000035L40 61.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_a");
       
       // rect_b
       shape = this.canvas.paper.path('M60 41.77760000000035L80 41.77760000000035L80 61.77760000000035L60 61.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_b");
       
       // rect_c
       shape = this.canvas.paper.path('M0 61.77760000000035L20 61.77760000000035L20 81.77760000000035L0 81.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_c");
       
       // rect_d
       shape = this.canvas.paper.path('M20 61.77760000000035L40 61.77760000000035L40 81.77760000000035L20 81.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_d");
       
       // rect_e
       shape = this.canvas.paper.path('M40 61.77760000000035L60 61.77760000000035L60 81.77760000000035L40 81.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_e");
       
       // rect_f
       shape = this.canvas.paper.path('M60 61.77760000000035L80 61.77760000000035L80 81.77760000000035L60 81.77760000000035Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","rect_f");
       
       // 0
       shape = this.canvas.paper.text(0,0,'0');
       shape.attr({"x":5.5,"y":10.75,"text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","0");
       
       // 1
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":26.5,"y":10.75,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","1");
       
       // 2
       shape = this.canvas.paper.text(0,0,'2');
       shape.attr({"x":46.5,"y":10.75,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","2");
       
       // 3
       shape = this.canvas.paper.text(0,0,'3');
       shape.attr({"x":66.5,"y":10.75,"text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","3");
       
       // 4
       shape = this.canvas.paper.text(0,0,'4');
       shape.attr({"x":6.5,"y":32.02760000000035,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","4");
       
       // 5
       shape = this.canvas.paper.text(0,0,'5');
       shape.attr({"x":26.5,"y":32.02760000000035,"text-anchor":"start","text":"5","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","5");
       
       // 6
       shape = this.canvas.paper.text(0,0,'6');
       shape.attr({"x":46.5,"y":32.02760000000035,"text-anchor":"start","text":"6","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","6");
       
       // 7
       shape = this.canvas.paper.text(0,0,'7');
       shape.attr({"x":66.5,"y":32.02760000000035,"text-anchor":"start","text":"7","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","7");
       
       // 8
       shape = this.canvas.paper.text(0,0,'8');
       shape.attr({"x":6.5,"y":52.02760000000035,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","8");
       
       // 9
       shape = this.canvas.paper.text(0,0,'9');
       shape.attr({"x":27,"y":52.02760000000035,"text-anchor":"start","text":"9","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","9");
       
       // a
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":46.5,"y":52.02760000000035,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","a");
       
       // b
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":66,"y":51.52760000000035,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","b");
       
       // c
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":5.504339694976807,"y":71.80414933929478,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","c");
       
       // d
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":25.5,"y":72.52760000000035,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","d");
       
       // e
       shape = this.canvas.paper.text(0,0,'E');
       shape.attr({"x":45.5,"y":72.52760000000035,"text-anchor":"start","text":"E","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","e");
       
       // f
       shape = this.canvas.paper.text(0,0,'F');
       shape.attr({"x":66,"y":72.02760000000035,"text-anchor":"start","text":"F","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","f");
       
       // Label
       shape = this.canvas.paper.text(0,0,'A');
       shape.attr({"x":97.17759999999998,"y":32.77760000000035,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'B');
       shape.attr({"x":98.17759999999998,"y":51.75,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'clk');
       shape.attr({"x":90.54828056335464,"y":12.75,"text-anchor":"start","text":"clk","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D');
       shape.attr({"x":96.85383224487305,"y":93.75,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'C');
       shape.attr({"x":96.67759999999998,"y":72.52760000000035,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
        this.segment = null
        this.key = -1
        this.strobe = false
        this.mousedownCallback = function(emitter, {relX, relY}) {
            relX = parseInt(relX/20)
            relY = parseInt(relY/20)
            this.key = (relX+ relY*4)
            this.segment =  "rect_"+this.key.toString(16).toLowerCase()
            emitter.layerAttr(this.segment, {fill:"#C21B7A"});
        };
        
        this.mouseupCallback = function(emitter, {relX, relY}) {
            emitter.layerAttr(this.segment, {fill:"#FFFFFF"});
        };
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        // first stage....set the output
        if (this.strobe && this.key >=0){
            this.getOutputPort("out_strobe").setValue(false)
            this.key = -1
        }
        else if (this.strobe){
            this.getOutputPort("out_a").setValue(false)
            this.getOutputPort("out_b").setValue(false)
            this.getOutputPort("out_c").setValue(false)
            this.getOutputPort("out_d").setValue(false)
            this.strobe = false
        }
        else if(this.key>=0){
            this.getOutputPort("out_a").setValue(this.key&1?true:false)
            this.getOutputPort("out_b").setValue(this.key&2?true:false)
            this.getOutputPort("out_c").setValue(this.key&4?true:false)
            this.getOutputPort("out_d").setValue(this.key&8?true:false)
            this.getOutputPort("out_strobe").setValue(true)
            this.strobe = true
        }

    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.on("mousedown", this.mousedownCallback, this)
        this.on("mouseup",   this.mouseupCallback, this)
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        this.off(this.mousedownCallback)
        this.off(this.mouseupCallback)
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