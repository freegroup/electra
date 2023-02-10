// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_JustBlack = CircuitFigure.extend({

   NAME: "video_color_JustBlack",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:84.12910056640976},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 48.126034543826854 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.875, y: 77.8389528672162 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.86500000000024, y: 48.14029833592497 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 84.12910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,84.12910056640976 L0,84.12910056640976");
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
       shape = this.canvas.paper.text(0,0,'Just Black');
       shape.attr({"x":7.907552000004216,"y":72.12910056640976,"text-anchor":"start","text":"Just Black","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.136293579453195,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'threshold');
       shape.attr({"x":12,"y":57.59737500000119,"text-anchor":"start","text":"threshold","font-family":"\"Arial\"","font-size":8,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.136293579453195 47.3799680000011L49.136293579453195 47.3799680000011L47.66478056057895 32.99000926909139L47.26481464287099 32.05069784112129L46.61172166499273 31.1693617814999L45.72534552659636 30.37278004043219L44.63261831811906 29.68515635102449L43.366742002848696 29.127383811124673L41.96617959205287 28.716410057117173L40.47348646586943 28.46472231855296L38.9340173495948 28.3799680000011L37.394548233321984 28.46472231855296L35.90185510713491 28.716410057117173L34.50129269633908 29.127383811124673L33.23541638106508 29.68515635102449L32.142689172593236 30.37278004043219L31.256313034195045 31.1693617814999L30.603220056320424 32.05069784112129L30.203254138608827 32.99000926909139Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M39.92918400000053,47.3799680000011Q39.92918400000053,51.3799680000011 43.92918400000053, 51.3799680000011L70.92918400000053,51.3799680000011Q74.92918400000053,51.3799680000011 74.92918400000053, 47.3799680000011L74.92918400000053,9.3799680000011Q74.92918400000053,5.379968000001099 70.92918400000053, 5.379968000001099L43.92918400000053,5.379968000001099Q39.92918400000053,5.379968000001099 39.92918400000053, 9.3799680000011L39.92918400000053,47.3799680000011');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M34.208593749999636,9.296581533205426Q34.208593749999636,7.296581533205426 36.208593749999636, 7.296581533205426L44.208593749999636,7.296581533205426Q46.208593749999636,7.296581533205426 46.208593749999636, 9.296581533205426L46.208593749999636,10.296581533205426Q46.208593749999636,12.296581533205426 44.208593749999636, 12.296581533205426L36.208593749999636,12.296581533205426Q34.208593749999636,12.296581533205426 34.208593749999636, 10.296581533205426L34.208593749999636,9.296581533205426');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(32,32,32,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":2.5,"ry":2.5,"cx":35.136293579453195,"cy":16.796581533205426,"stroke":"none","stroke-width":0,"fill":"rgba(48,48,48,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":2.5,"ry":2.5,"cx":43.84867200000008,"cy":16.796581533205426,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Line
       shape = this.canvas.paper.path('M9.377490534403478 57.12910056640976L5.757806182406057,57.53049545921385L0.4075520000042161,64.0115340000084');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M40.086528000003455 5.1831660000025295L40.34867200000008,52.369086000002426');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M52.00859375000255 12.296581533203607L29.208593750002365,12.09658153320379');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(32,32,32,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M41.317968750000546 16.760644033205608L38.017968750000364,16.760644033205608');
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
video_color_JustBlack = video_color_JustBlack.extend({


    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
        this.processing = false;
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
            for( let x = 0; x < pixels.length; x += 4 ) {
                if(pixels[x]<threshold && pixels[x+1]<threshold && pixels[x+2]<threshold){
                    pixels[x] = pixels[x+1] = pixels[x+2] = 0;
                }
                else{
                    pixels[x] = pixels[x+1] = pixels[x+2] = 255;
                }
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
                this.processing = false;
            };
            image.src = this.tmpCanvas.toDataURL();
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
    }
});