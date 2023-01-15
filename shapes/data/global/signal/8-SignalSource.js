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

     this._super( $.extend({stroke:0, bgColor:null, width:60.03125,height:202.525390625},attr), setter, getter);
     var port;
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 20.28103266372857 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 30.15633765056471 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out2");
     port.setMaxFanOut(20);
     // out3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 40.03164263740085 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out3");
     port.setMaxFanOut(20);
     // out4
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 49.90694762423699 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out4");
     port.setMaxFanOut(20);
     // out5
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 59.78225261107313 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out5");
     port.setMaxFanOut(20);
     // out6
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 69.65755759790927 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out6");
     port.setMaxFanOut(20);
     // out7
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 79.53286258474542 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out7");
     port.setMaxFanOut(20);
     // out8
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 89.40816757158156 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out8");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 60.03125;
      this.originalHeight= 202.525390625;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L60.03125,0 L60.03125,202.525390625 L0,202.525390625");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M5.131000000000313 22.525390625L55.13100000000031 22.525390625L55.13100000000031 202.525390625L5.131000000000313 202.525390625Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'8 Bit');
       shape.attr({"x":19.275679251099064,"y":43.07424062500013,"text-anchor":"start","text":"8 Bit","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":44.30409999999665,"y":41.57424062500013,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":4,"y":10.7626953125,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4');
       shape.attr({"x":44.30409999999665,"y":101.57424062500013,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'5');
       shape.attr({"x":44.30409999999665,"y":121.07424062500013,"text-anchor":"start","text":"5","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'3');
       shape.attr({"x":44.30409999999665,"y":81.57424062500013,"text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M27.756499999994958 89.07929062499443L21.28324999999677,97.27874062499995L14.809999999997672,105.47819062500457');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Label
       shape = this.canvas.paper.text(0,0,'8');
       shape.attr({"x":44.30409999999665,"y":181.07424062500013,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'6');
       shape.attr({"x":44.30409999999665,"y":141.07424062500013,"text-anchor":"start","text":"6","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'7');
       shape.attr({"x":44.30409999999665,"y":161.07424062500013,"text-anchor":"start","text":"7","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Signal Bus');
       shape.attr({"x":6.131000000000313,"y":29.174392223358154,"text-anchor":"start","text":"Signal Bus","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'2');
       shape.attr({"x":44.30409999999665,"y":61.57424062500013,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M22.30409999999665 58.03999062499406L22.30409999999847,183.90409062500294');
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
        this.getOutputPort("out1").getValue = ()=>context.signalPorts[this.busId+":1"]?.getValue()
        this.getOutputPort("out2").getValue = ()=>context.signalPorts[this.busId+":2"]?.getValue()
        this.getOutputPort("out3").getValue = ()=>context.signalPorts[this.busId+":3"]?.getValue()
        this.getOutputPort("out4").getValue = ()=>context.signalPorts[this.busId+":4"]?.getValue()
        this.getOutputPort("out5").getValue = ()=>context.signalPorts[this.busId+":5"]?.getValue()
        this.getOutputPort("out6").getValue = ()=>context.signalPorts[this.busId+":6"]?.getValue()
        this.getOutputPort("out7").getValue = ()=>context.signalPorts[this.busId+":7"]?.getValue()
        this.getOutputPort("out8").getValue = ()=>context.signalPorts[this.busId+":8"]?.getValue()
    },

    calculate:function(context)
    {
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