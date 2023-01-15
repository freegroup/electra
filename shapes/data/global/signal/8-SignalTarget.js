// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var signal_8_SignalTarget = CircuitFigure.extend({

   NAME: "signal_8_SignalTarget",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:60.03125,height:202.525390625},attr), setter, getter);
     var port;
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.708589276424265, y: 18.748412332558477 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.5483810515358718, y: 28.62998582353665 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.708589276424265, y: 38.50529081037279 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.708589276424265, y: 48.38059579720893 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.708589276424265, y: 58.255900784045075 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.708589276424265, y: 68.13120577088121 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.708589276424265, y: 78.00651075771735 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
     // in1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.708589276424265, y: 87.88181574455349 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(1);
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
       shape = this.canvas.paper.path('M0 22.525390625L60 22.525390625L60 202.525390625L0 202.525390625Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":4,"y":10.7626953125,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       

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
signal_8_SignalTarget = signal_8_SignalTarget.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        // handle the size of the shape if the label has changed
        //
        var adjustWidth = ()=>{
            var width = this.layerGet("label").getBBox().width+15
            this.setWidth(width+5);
            this.layerAttr("BoundingBox", { path: `M0 0 L${width} 0 L${width} 20 L0 20 Z`})
            this.layerAttr("outline",     { path: `M0 10 L13 0 L${width} 0 L${width} 20 L13 20 Z`})
        }
        
        this.on("change:userData.signalId",(emitter, event)=>{
            this.layerAttr("label", {text: event.value})
            adjustWidth()
        });
        
        this.on("added", ()=>{
            this.signalId = this.attr("userData.signalId")
            if(!this.signalId){
                this.signalId = "Signal_Id"
                this.attr("userData.signalId", this.signalId)
            }            
            this.layerAttr("label", {text: this.signalId})
            adjustWidth()
        })
        
        // get the connected port and forward the port to the related party ( SignalSource shape)
        //
        this.getInputPort(0).on("connect", (emitter, event)=>{
           this.signalSourcePort = event.connection.getSource()
        })
        this.getInputPort(0).on("disconnect", (emitter, event)=>{
            delete this.signalSourcePort
        })
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    onPreStart:function(context)
    {
        // first check if any object already create the signal context
        context.signalPorts ??= {}
    },

    calculate:function(context)
    {
        // either signalPort can be undefined of the result of getValue...
        let value = this.signalSourcePort?.getValue()
        
        // override the source of the signal if we have a "connected" source. 
        // This is the semantic of a "bus". Only connected (tri state sources) ports can transfer data
        // to the bus.
        
        if(value !==null && value!==undefined ){
            if(context.signalPorts[this.signalId] !== this.signalSourcePort){
                context.signalPorts[this.signalId] = this.signalSourcePort;
            }
        }
        // it is "undefined". In this case remove it from the bus
        else if (context.signalPorts[this.signalId] === this.signalSourcePort){
             delete context.signalPorts[this.signalId]
        }
    },
    
    getParameterSettings: function()
    {
        return [
        {
            name:"signalId",
            label:"Signal Id",
            property:{
                type: "string"
            }
        }];
    },
    
  /**
   * @private
   */
  applyTransformation: function () {
    let s =
      // override the base implementation and do not scale the internal SVG elements....this let the arrow looks a like streche...we
      // calculate the path in the event handler. A lot more code....but the result is much cleaner
      //"S" + this.scaleX + "," + this.scaleY + ",0,0 " +
      "R" + this.rotationAngle + "," + ((this.getWidth() / 2) | 0) + "," + ((this.getHeight() / 2) | 0) +
      "T" + this.getAbsoluteX() + "," + this.getAbsoluteY() +
      ""
    this.svgNodes.transform(s)
    if (this.rotationAngle === 90 || this.rotationAngle === 270) {
      let before = this.svgNodes.getBBox(true)
      let ratio = before.height / before.width
      let reverseRatio = before.width / before.height
      let rs = "...S" + ratio + "," + reverseRatio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2)
      this.svgNodes.transform(rs)
    }

    return this
  }

});