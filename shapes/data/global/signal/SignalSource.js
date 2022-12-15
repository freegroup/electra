// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var signal_SignalSource = CircuitFigure.extend({

   NAME: "signal_SignalSource",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:65.72720000000481,height:22},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.47855986562651, y: 46.56272727272815 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 65.72720000000481;
      this.originalHeight= 22;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L65.72720000000481,0 L65.72720000000481,22 L0,22");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // outline
       shape = this.canvas.paper.path('M0 0L53.81817921990478 0L65.72720000000481 10L53.81817921990478 20L0.24380000000201107 20.243800000000192Z');
       shape.attr({"stroke":"rgba(0,120,242,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","outline");
       
       // label
       shape = this.canvas.paper.text(0,0,'Signal_ID');
       shape.attr({"x":4.773050000005242,"y":11,"text-anchor":"start","text":"Signal_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
signal_SignalSource = signal_SignalSource.extend({

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
            adjustWidth()
        });
        this.on("added", ()=>{
            var signalId = this.attr("userData.signalId")
            if(!signalId){
                signalId = "Signal_Id"
                this.attr("userData.signalId", signalId)
            }            
            this.layerAttr("label", {text: signalId})
            adjustWidth()
        })
        
        // override the "getValue" method of the port and delegate them to the related party (SourceTarget port)
        this.originalGetValue = this.getOutputPort(0).getBooleanValue
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
        var signalId = this.attr("userData.signalId")
        if(context.signalPorts && context.signalPorts[signalId]){
            this.getOutputPort(0).getBooleanValue = function(){ 
                if(context.signalPorts[signalId] instanceof draw2d.Port){
                    return context.signalPorts[signalId].getBooleanValue()
                }
                else {
                    return false
                }
            }
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