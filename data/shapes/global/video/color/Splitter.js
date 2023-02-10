// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_Splitter = CircuitFigure.extend({

   NAME: "video_color_Splitter",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.12910056640976},attr), setter, getter);
     var port;
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 88.6738137133109 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 50.528459340992306 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(1);
     // output_port3
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 64.88029895819727 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port3");
     port.setMaxFanOut(20);
     // output_port2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 38.062980070742384 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.41777088000026, y: 7.716504935529654 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.12910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.12910056640976 L0,80.12910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,8.3799680000011Q4.5,4.379968000001099 8.5, 4.379968000001099L71.5,4.379968000001099Q75.5,4.379968000001099 75.5, 8.3799680000011L75.5,48.3799680000011Q75.5,52.3799680000011 71.5, 52.3799680000011L8.5,52.3799680000011Q4.5,52.3799680000011 4.5, 48.3799680000011L4.5,8.3799680000011');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'RGB Splitter');
       shape.attr({"x":6.407552000004216,"y":69.12910056640976,"text-anchor":"start","text":"RGB Splitter","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 49.8799680000011L49.136293579453195 49.8799680000011L47.66478056057895 35.49000926909139L47.26481464287099 34.55069784112129L46.61172166499273 33.6693617814999L45.72534552659636 32.87278004043219L44.63261831811906 32.18515635102449L43.366742002848696 31.627383811124673L41.96617959205287 31.216410057117173L40.47348646586943 30.96472231855296L38.9340173495948 30.8799680000011L37.394548233321984 30.96472231855296L35.90185510713491 31.216410057117173L34.50129269633908 31.627383811124673L33.23541638106508 32.18515635102449L32.142689172593236 32.87278004043219L31.256313034195045 33.6693617814999L30.603220056320424 34.55069784112129L30.203254138608827 35.49000926909139Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.13421670400021 52.03330028320488L75.13421670400021 52.03330028320488L75.13421670400021 36.03330028320488L39.13421670400021 36.03330028320488L39.13421670400021 52.03330028320488Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39 36.8799680000011L75 36.8799680000011L75 19.8799680000011L39 19.8799680000011L39 36.8799680000011Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,255,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39 21.03330028320488L75 21.03330028320488L75 4.0333002832048805L39 4.0333002832048805L39 21.03330028320488Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       

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
video_color_Splitter = video_color_Splitter.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.tmpCanvasR = null;
        this.tmpContextR = null;
        this.tmpCanvasG = null;
        this.tmpContextG = null;
        this.tmpCanvasB = null;
        this.tmpContextB = null;
        this.processing = false;
        this.getInputPort("input_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port1").setSemanticGroup("Image");
        this.getOutputPort("output_port2").setSemanticGroup("Image");
        this.getOutputPort("output_port3").setSemanticGroup("Image");
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
        var threshold = this.getInputPort("input_port2").getValue();
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage({imageData: imageData,threshold: threshold}, [imageData.data.buffer]);
        }
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
            var imageData = event.data.imageData;
            var threshold = event.data.threshold;
            // map offset from 0-5 => 0-255
            threshold = 255/5*threshold;
            var pixels = imageData.data;
            var w = imageData.width;
            var h = imageData.height;
            
            var r = new Uint8ClampedArray(pixels.length);
            var g = new Uint8ClampedArray(pixels.length);
            var b = new Uint8ClampedArray(pixels.length);
            r.fill(255);
            g.fill(255);
            b.fill(255);
            
            for( let x = 0; x < pixels.length; x += 4 ) {
                r[x]=r[x+1]=r[x+2] = threshold < (pixels[x]  -((pixels[x+1]+pixels[x+2])/2))?0:255;
                g[x]=g[x+1]=g[x+2] = threshold < (pixels[x+1]-((pixels[x]  +pixels[x+2])/2))?0:255;
                b[x]=b[x+1]=b[x+2] = threshold < (pixels[x+2]-((pixels[x+1]+pixels[x])/2))?0:255;
            }
            var imageDataR = new ImageData(r, w, h);
            var imageDataG = new ImageData(g, w, h);
            var imageDataB = new ImageData(b, w, h);
            self.postMessage({imageDataR, imageDataG, imageDataB}, [imageDataR.data.buffer,imageDataG.data.buffer,imageDataB.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageDataR = event.data.imageDataR;
            var imageDataG = event.data.imageDataG;
            var imageDataB = event.data.imageDataB;
            this.tmpContextR.putImageData(imageDataR,0,0);
            this.tmpContextG.putImageData(imageDataG,0,0);
            this.tmpContextB.putImageData(imageDataB,0,0);
            
            var imageR = new Image();
            imageR.onload = () => {
                this.getOutputPort("output_port1").setValue(imageR);
                this.processing = false;
            };
            imageR.src = this.tmpCanvasR.toDataURL();
            
            var imageG = new Image();
            imageG.onload = () => {
                this.getOutputPort("output_port2").setValue(imageG);
                this.processing = false;
            };
            imageG.src = this.tmpCanvasG.toDataURL();
            
            var imageB = new Image();
            imageB.onload = () => {
                this.getOutputPort("output_port3").setValue(imageB);
                this.processing = false;
            };
            imageB.src = this.tmpCanvasB.toDataURL();
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
        delete this.tmpContextR;
        delete this.tmpCanvasR;
        delete this.tmpContextG;
        delete this.tmpCanvasG;
        delete this.tmpContextB;
        delete this.tmpCanvasB;
        this.worker = null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.tmpCanvasR = null;
        this.tmpContextR = null;
        this.tmpCanvasG = null;
        this.tmpContextG = null;
        this.tmpCanvasB = null;
        this.tmpContextB = null;
        this.progressing = false;
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
            delete this.tmpContextR;
            delete this.tmpCanvasR;
            delete this.tmpContextG;
            delete this.tmpCanvasG;
            delete this.tmpContextB;
            delete this.tmpCanvasB;
            this.tmpCanvas = null;
            this.tmpContext = null;
            this.tmpCanvasR = null;
            this.tmpContextR = null;
            this.tmpCanvasG = null;
            this.tmpContextG = null;
            this.tmpCanvasB = null;
            this.tmpContextB = null;
        }

        // convert the HTMLImageElement to an ImageData object. Required for the WebWorker
        //
        if(this.tmpContext === null ) {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;
            this.tmpContext = this.tmpCanvas.getContext('2d');

            this.tmpCanvasR = document.createElement('canvas');
            this.tmpCanvasR.width = width;
            this.tmpCanvasR.height = height;
            this.tmpContextR = this.tmpCanvasR.getContext('2d');

            this.tmpCanvasG = document.createElement('canvas');
            this.tmpCanvasG.width = width;
            this.tmpCanvasG.height = height;
            this.tmpContextG = this.tmpCanvasG.getContext('2d');

            this.tmpCanvasB = document.createElement('canvas');
            this.tmpCanvasB.width = width;
            this.tmpCanvasB.height = height;
            this.tmpContextB = this.tmpCanvasB.getContext('2d');
        }
        this.tmpContext.drawImage(image, 0, 0, width, height);
        return this.tmpContext.getImageData(0, 0, width, height);
    }
});