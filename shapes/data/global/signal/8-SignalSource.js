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
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 79.53286258474542 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 20.28103266372857 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 30.15633765056471 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 40.03164263740085 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 49.90694762423699 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 59.78225261107313 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 69.65755759790927 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 93.56401874023545, y: 89.40816757158156 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
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
       shape = this.canvas.paper.path('M3.631000000000313 22.525390625L54.63100000000031 22.525390625L54.63100000000031 202.525390625L3.631000000000313 202.525390625Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":4,"y":10.7626953125,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");
       
       // Line
       shape = this.canvas.paper.path('M22.30409999999665 58.03999062499406L22.30409999999847,183.90409062500294');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M27.756499999994958 89.07929062499443L21.28324999999677,97.27874062499995L14.809999999997672,105.47819062500457');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Label
       shape = this.canvas.paper.text(0,0,'8 Bit');
       shape.attr({"x":19.275679251099064,"y":43.07424062500013,"text-anchor":"start","text":"8 Bit","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'1');
       shape.attr({"x":44.30409999999665,"y":41.57424062500013,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'2');
       shape.attr({"x":44.30409999999665,"y":61.57424062500013,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'3');
       shape.attr({"x":44.30409999999665,"y":81.57424062500013,"text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'4');
       shape.attr({"x":44.30409999999665,"y":101.57424062500013,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'5');
       shape.attr({"x":44.30409999999665,"y":121.07424062500013,"text-anchor":"start","text":"5","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
       shape = this.canvas.paper.text(0,0,'8');
       shape.attr({"x":44.30409999999665,"y":181.07424062500013,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Signal Bus');
       shape.attr({"x":4.631000000000313,"y":29.174392223358154,"text-anchor":"start","text":"Signal Bus","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

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
        
        // calculate the outer frame/shape in the correct size in relation to the length of the text
        //
        var adjustWidth = ()=>{
            var width = this.layerGet("label").getBBox().width+15

            this.setWidth(width+5);
            this.layerAttr("BoundingBox", { path: `M0 0 L${width} 0 L${width} 20 L0 20 Z`})
            this.layerAttr("outline",     { path: `M0 0 L${width-13} 0 L${width} 10 L${width-13} 20 L0 20 Z`})
        }
        this.on("change:userData.signalId",(emitter, event)=>{
            this.layerAttr("label", {text: event.value})
            this.signalId = event.value
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
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    onStart:function(context)
    {
        this.getOutputPort(0).getValue = ()=>context.signalPorts[this.signalId]?.getValue()
    },

    calculate:function(context)
    {
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