// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var signal_8_SignalSource = CircuitFigure.extend({

   NAME: "signal_8_SignalSource",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:60.03125,height:204.05524222335862},attr), setter, getter);
     var port;
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 26.172442346049635 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 35.973709778379565 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out2");
     port.setMaxFanOut(20);
     // out3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 45.774977210709494 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out3");
     port.setMaxFanOut(20);
     // out4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 55.57624464303942 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out4");
     port.setMaxFanOut(20);
     // out5
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 65.37751207536935 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out5");
     port.setMaxFanOut(20);
     // out6
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 75.17877950769929 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out6");
     port.setMaxFanOut(20);
     // out7
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 84.98004694002921 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out7");
     port.setMaxFanOut(20);
     // out8
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 94.78360562023701, y: 94.78131437235915 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out8");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 60.03125;
      this.originalHeight= 204.05524222335862;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L60.03125,0 L60.03125,204.05524222335862 L0,204.05524222335862");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M5.863133248901249 22.857390625000335L55.86313324890125 22.857390625000335L55.86313324890125 202.85739062500033L5.863133248901249 202.85739062500033Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'8 Bit');
       shape.attr({"x":20.0078125,"y":41.906240625000464,"text-anchor":"start","text":"8 Bit","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
       shape = this.canvas.paper.text(0,0,'5');
       shape.attr({"x":45.03623324889759,"y":133.40624062500046,"text-anchor":"start","text":"5","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'3');
       shape.attr({"x":45.03623324889759,"y":93.90624062500046,"text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M28.988633248895894 115.91129062499476L22.515383248897706,124.11074062500029L16.042133248898608,132.3101906250049');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Label
       shape = this.canvas.paper.text(0,0,'8');
       shape.attr({"x":45.03623324889759,"y":193.40624062500046,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'6');
       shape.attr({"x":45.03623324889759,"y":153.40624062500046,"text-anchor":"start","text":"6","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'7');
       shape.attr({"x":45.03623324889759,"y":173.40624062500046,"text-anchor":"start","text":"7","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Signal Bus');
       shape.attr({"x":6.863133248901249,"y":29.00639222335849,"text-anchor":"start","text":"Signal Bus","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'2');
       shape.attr({"x":45.03623324889759,"y":73.90624062500046,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M23.036233248897588 70.3719906249944L23.036233248899407,196.23609062500327');
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
signal_8_SignalSource = signal_8_SignalSource.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.on("change:userData.busId",(emitter, event)=>{
            this.layerAttr("label", {text: event.value})
            this.signalId = event.value
        });
        this.on("added", ()=>{
            this.signalId = this.attr("userData.busId")
            if(!this.signalId){
                this.signalId = "Bus_Id"
                this.attr("userData.busId", this.signalId)
            }            
            this.layerAttr("label", {text: this.signalId})
        })
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    onStart:function(context)
    {
        this.getOutputPort("out1").getValue = ()=> {
            console.log(this.busId, context.signalPorts )
            return context.signalPorts[this.busId+":1"]?.getValue()
        }
        this.getOutputPort("out2").getValue = ()=>context.signalPorts[this.busId+":2"]?.getValue()
        this.getOutputPort("out3").getValue = ()=>context.signalPorts[this.busId+":3"]?.getValue()
        this.getOutputPort("out4").getValue = ()=>context.signalPorts[this.busId+":4"]?.getValue()
        this.getOutputPort("out5").getValue = ()=>context.signalPorts[this.busId+":5"]?.getValue()
        this.getOutputPort("out6").getValue = ()=>context.signalPorts[this.busId+":6"]?.getValue()
        this.getOutputPort("out7").getValue = ()=>context.signalPorts[this.busId+":7"]?.getValue()
        this.getOutputPort("out8").getValue = ()=>context.signalPorts[this.busId+":8"]?.getValue()
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