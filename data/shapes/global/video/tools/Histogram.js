// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_tools_Histogram = CircuitFigure.extend({

   NAME: "video_tools_Histogram",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:81.13504999999986,height:80.87877759999992},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9505139887140474, y: 49.34495943717131 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.92155116685083, y: 49.34495943717131 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 81.13504999999986;
      this.originalHeight= 80.87877759999992;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L81.13504999999986,0 L81.13504999999986,80.87877759999992 L0,80.87877759999992");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Histogram');
       shape.attr({"x":4.228799999999865,"y":68.37877759999992,"text-anchor":"start","text":"Histogram","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.587841281771944Q4.315424000003077,3.5878412817719436 8.315424000003077, 3.5878412817719436L71.31542400000308,3.5878412817719436Q75.31542400000308,3.5878412817719436 75.31542400000308, 7.587841281771944L75.31542400000308,51.587841281771944Q75.31542400000308,55.587841281771944 71.31542400000308, 55.587841281771944L8.315424000003077,55.587841281771944Q4.315424000003077,55.587841281771944 4.315424000003077, 51.587841281771944L4.315424000003077,7.587841281771944');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M26.881109741784876,49.0014882001456Q30.763898999993216,48.04026628178235 33.19092321874905, 50.011182688028384L33.19092321874905,50.011182688028384Q35.61794743750488,51.98209909427442 39.60742605740177, 51.69216747925865L43.95100709885412,51.376501803042366Q47.940485718751006,51.0865701880266 48.957170984829936, 47.21793333898817L50.809730091343845,40.16867368745212Q51.826415357422775,36.30003683841369 54.61532928927137, 33.43264096746374L60.3467595279926,27.539924375003793Q63.1356734598412,24.672528504053844 64.6440145226967, 28.377242695203275L73.80708293714758,50.88312709062251Q75.31542400000308,54.587841281771944 71.31542400000308, 54.587841281771944L8.315424000003077,54.587841281771944Q4.315424000003077,54.587841281771944 8.198213258211418, 53.62661936340869L26.881109741784876,49.0014882001456');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,5,5,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Blue
       shape = this.canvas.paper.path('M19.668557677951,50.01256520603322Q23.46607499998572,48.75603737552319 23.981302606081, 44.78935859927759L27.804895831405744,15.351948964267933Q28.320123437501024,11.385270188022332 30.150343500575005, 14.941995440374768L47.02364165567381,47.732416029423774Q48.853861718747794,51.28914128177621 49.91241655701927, 47.431750757811585L54.24723651914971,31.63559845613332Q55.305791357421185,27.778207932168698 56.32595992971813, 31.645927684697003L59.949680887541824,45.38437984527374Q60.96984945983877,49.252099597802044 64.7298452502696, 50.6168089646426L72.46880420956903,53.425703008681Q76.22879999999986,54.790412375521555 72.22879999999986, 54.790412375521555L9.228799999999865,54.790412375521555Q5.228799999999865,54.790412375521555 9.026317322034586, 53.533884545011524L19.668557677951,50.01256520603322');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,17,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Blue");
       
       // Green
       shape = this.canvas.paper.path('M43.953306587033246,51.516137367703884Q47.940485718751006,51.196133349612865 48.957170984829936, 47.32749650057443L50.809730091343845,40.278236849038386Q51.826415357422775,36.409599999999955 53.995775125476655, 39.77023657611901L57.8871136917881,45.79845508951964Q60.05647345984198,49.1590916656387 63.816469250272824, 50.523801032479255L71.55542820957224,53.33269507651765Q75.31542400000308,54.69740444335821 71.31542400000308, 54.69740444335821L8.315424000003077,54.69740444335821Q4.315424000003077,54.69740444335821 8.302603131720836, 54.37740042526719L43.953306587033246,51.516137367703884');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,181,78,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Green");
       

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
video_tools_Histogram = video_tools_Histogram.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
        
        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()-6, 
            height: this.getHeight()/4*3-6,
            selectable: false,
            deleteable: false,
            resizeable:false,
            draggable: false,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false;
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));

        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.attr({
            resizeable:false
        });
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
        var img = this.getInputPort("input_port1").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
        this.getOutputPort("output_port1").setValue(img);
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            const  HISTOGRAM_SIZE = 256; // for 8-bit image
            const  MAX_VALUE = 255;      // max value in 8-bit image

            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            var imageSize = width * height;
            var histR  =  Array(HISTOGRAM_SIZE);
            var histG  =  Array(HISTOGRAM_SIZE);
            var histB  =  Array(HISTOGRAM_SIZE);
            histR.fill(0);
            histG.fill(0);
            histB.fill(0);
            
            // collect the distribution of the RGB values 
            //
            for (var index=0; index < pixels.length; index+=4) {
                histR[pixels[index  ]]++; // red
                histG[pixels[index+1]]++; // green
                histB[pixels[index+2]]++; // blue
            }

            var canvas = new OffscreenCanvas(width, height);
            var ctx = canvas.getContext('2d');

            let max = Math.max.apply(null, histR.concat(histG, histB))

            function drawColorGraph (vals, color) {
                const graphX = 0;
                const graphY = height;

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(graphX, height);
                for (let i = 0; i < vals.length; i++) {
                  let val = vals[i];
                  let drawHeight = Math.round((val / max) * height);
                  let drawX = graphX + (width / (vals.length - 1)) * i;
                  ctx.lineTo(drawX, graphY - drawHeight);
                }
                ctx.lineTo(graphX + width, graphY);
                ctx.closePath();
                ctx.fill();
            }
            
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.beginPath();
            ctx.fillRect(0,0, width, height);
            ctx.closePath();
 
            ctx.globalCompositeOperation = 'screen';
    
            drawColorGraph(histR, "#FF0000");
            drawColorGraph(histG, "#00FF00");
            drawColorGraph(histB, "#0000FF");
            imageData = ctx.getImageData(0, 0, width, height);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
           try{
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            this.img.attr("path", this.tmpCanvas.toDataURL());
            this.processing = false;
           }
           catch(exc){
              console.log(exc);
              this.processing = false;
           }
        };

        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
        this.processing = false;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
        if(this.worker) this.worker.terminate();
        delete this.worker;
        delete this.tmpContext;
        delete this.tmpCanvas;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
    },
    

    /**
     *  Helper function to dynamically create Web Workers.
     */
    createWorker: function(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
           type: "text/javascript"
        });
        var url = window.URL.createObjectURL(blob);
        return new Worker(url);
    },
    
    imageToData: function(image){
        var width = image.naturalWidth;
        var height= image.naturalHeight;

        if(this.tmpContext !==null && this.tmpContext.width!== width){
            delete this.tmpContext;
            delete this.tmpCanvas;
            this.tmpCanvas = null;
            this.tmpContext = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    },
    
    setPersistentAttributes: function (memento) 
    {
        this._super(memento);

        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image);
        this.remove(this.img);
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));
        this.img.hitTest = ()=>false;
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
    }
});