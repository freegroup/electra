// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var signal_4_SignalSource = CircuitFigure.extend({

   NAME: "signal_4_SignalSource",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:60.03125,height:127.02762111167976},attr), setter, getter);
     var port;
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 42.043014076479416 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 57.787621292587524 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out2");
     port.setMaxFanOut(20);
     // out3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 73.53222850869564 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out3");
     port.setMaxFanOut(20);
     // out4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 89.27683572480375 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out4");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 60.03125;
      this.originalHeight= 127.02762111167976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L60.03125,0 L60.03125,127.02762111167976 L0,127.02762111167976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M5.015625 22.027621111679764L55.015625 22.027621111679764L55.015625 127.02762111167976L5.015625 127.02762111167976Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4 Bit');
       shape.attr({"x":20.0078125,"y":41.906240625000464,"text-anchor":"start","text":"4 Bit","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":45.03623324889759,"y":53.906240625000464,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":4,"y":10.7626953125,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4');
       shape.attr({"x":45.03623324889759,"y":113.90624062500046,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'3');
       shape.attr({"x":45.03623324889759,"y":93.90624062500046,"text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M33.988633248895894 77.91129062499476L27.515383248897706,86.11074062500029L21.042133248898608,94.3101906250049');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Signal Bus');
       shape.attr({"x":6.863133248901249,"y":29.00639222335849,"text-anchor":"start","text":"Signal Bus","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'2');
       shape.attr({"x":45.03623324889759,"y":73.90624062500046,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M28.036233248897588 61.371990624994396L28.036233248898498,115.61859062500298');
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
signal_4_SignalSource = signal_4_SignalSource.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.on("change:userData.busId",(emitter, event)=>{
            this.layerAttr("label", {text: event.value})
            this.busId = event.value
        });
        this.on("added", ()=>{
            this.busId = this.attr("userData.busId")
            if(!this.busId){
                this.busId = "Bus_Id"
                this.attr("userData.busId", this.busId)
            }            
            this.layerAttr("label", {text: this.busId})
        })
    },
    
    onPreStart: function(context)
    {
      context.signalPorts ??={}  
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    onStart:function(context)
    {
        this.getOutputPort("out1").getValue = ()=>context.signalPorts[this.busId+":1"]?.getValue()
        this.getOutputPort("out2").getValue = ()=>context.signalPorts[this.busId+":2"]?.getValue()
        this.getOutputPort("out3").getValue = ()=>context.signalPorts[this.busId+":3"]?.getValue()
        this.getOutputPort("out4").getValue = ()=>context.signalPorts[this.busId+":4"]?.getValue()
    },

    getParameterSettings: function()
    {
        return [
        {
            name:"busId",
            label:"Bus Id",
            property:{
                type: "string"
            }
        }];
    }

});