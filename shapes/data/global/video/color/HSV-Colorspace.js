// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_color_HSV_Colorspace = CircuitFigure.extend({

   NAME: "video_color_HSV_Colorspace",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80.40294399999675,height:84.62910056640976},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3644475505813487, y: 47.84169952063797 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // input_port2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.3644475505813487, y: 78.1876804894442 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port2");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.8556534447299, y: 47.85587904035329 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80.40294399999675;
      this.originalHeight= 84.62910056640976;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80.40294399999675,0 L80.40294399999675,84.62910056640976 L0,84.62910056640976");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0.4029439999967508,3Q0.4029439999967508,0 3.402943999996751, 0L77.40294399999675,0Q80.40294399999675,0 80.40294399999675, 3L80.40294399999675,77Q80.40294399999675,80 77.40294399999675, 80L3.402943999996751,80Q0.4029439999967508,80 0.4029439999967508, 77L0.4029439999967508,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.902943999996751,8.37996800000019Q4.902943999996751,4.37996800000019 8.90294399999675, 4.37996800000019L71.90294399999675,4.37996800000019Q75.90294399999675,4.37996800000019 75.90294399999675, 8.37996800000019L75.90294399999675,48.37996800000019Q75.90294399999675,52.37996800000019 71.90294399999675, 52.37996800000019L8.90294399999675,52.37996800000019Q4.902943999996751,52.37996800000019 4.902943999996751, 48.37996800000019L4.902943999996751,8.37996800000019');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(235,235,235,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'RGB -> HSV');
       shape.attr({"x":7.810496000000967,"y":73.62910056640976,"text-anchor":"start","text":"RGB -> HSV","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8,"cx":38.539237579449946,"cy":17.499523579457673,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M28.539237579449946 49.87996800000019L49.539237579449946 49.87996800000019L48.06772456057661 35.49000926909048L47.66775864286774 34.55069784111947L47.01466566498948 33.6693617814999L46.12828952659402 32.87278004043128L45.03556231811672 32.18515635102358L43.76968600284545 31.627383811123764L42.36912359204962 31.216410057116263L40.87643046586618 30.96472231855114L39.33696134959246 30.87996800000019L37.797492233317826 30.96472231855114L36.30479910713257 31.216410057116263L34.90423669633583 31.627383811123764L33.63836038106183 32.18515635102358L32.54563317258908 32.87278004043128L31.659257034191796 33.6693617814999L31.006164056316265 34.55069784111947L30.606198138605578 35.49000926909048Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M40.33212799999728,47.87996800000019Q40.33212799999728,51.87996800000019 44.33212799999728, 51.87996800000019L71.33212799999728,51.87996800000019Q75.33212799999728,51.87996800000019 75.33212799999728, 47.87996800000019L75.33212799999728,8.87996800000019Q75.33212799999728,4.87996800000019 71.33212799999728, 4.87996800000019L44.33212799999728,4.87996800000019Q40.33212799999728,4.87996800000019 40.33212799999728, 8.87996800000019L40.33212799999728,47.87996800000019');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(34,61,199,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M41.25161599999592 49.87996800000019L50.054672947195286 49.87996800000019L48.86344812239349 35.49000926909048L48.53966618900904 34.55069784111947L48.01097187358573 33.6693617814999L47.29342928535789 32.87278004043128L46.40884059278687 32.18515635102358L45.384083575658224 31.627383811123764L44.250294957394544 31.216410057116263L43.04192433143544 30.96472231855114L41.795687427787016 30.87996800000019L41.25161599999592 30.916969314092967L41.25161599999592 49.87996800000019Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(51,255,207,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M40.33212799999728 25.470542254553948L40.663386059446566 25.499523579457673L42.05257148078181 25.377985603555317L43.399547206051466 25.017064545744688L44.663386059446566 24.42772680973303L45.80568693693931 23.627879124409446L46.79174160439834 22.641824456950417L47.591589289721924 21.499523579457673L48.18092702573358 20.235684726062573L48.54184808354421 18.888709000792915L48.663386059446566 17.499523579457673L48.54184808354421 16.11033815812243L48.18092702573358 14.763362432852773L47.591589289721924 13.499523579457673L46.79174160439834 12.357222701964929L45.80568693693931 11.3711680345059L44.663386059446566 10.571320349182315L43.399547206051466 9.981982613170658L42.05257148078181 9.62106155536003L40.663386059446566 9.499523579457673L40.33212799999728 9.528504904361398L40.33212799999728 25.470542254553948Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(51,255,207,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'hue');
       shape.attr({"x":9.121535999996922,"y":58.609375,"text-anchor":"start","text":"hue","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line
       shape = this.canvas.paper.path('M8.936960000001818 58.87394028320887L0.024064000000180386,66.07112428320761L0,66.19042028320837');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M40.440896000001885 5.1831660000025295L40.650611199997,52.945802799990815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
video_color_HSV_Colorspace = video_color_HSV_Colorspace.extend({

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
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing === false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            var hue = this.getInputPort("input_port2").getValue();
            this.worker.postMessage( {imageData, hue}, [imageData.data.buffer]);
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
            var hue = event.data.hue;
            
            // mapping of [0..5] => [0..359]
            hue = 359/5*hue;
            
            var pixels = imageData.data;
            var nPixels = pixels.length,
              v = 2, // Math.pow(2, this.value()),
              s = 1.5, // Math.pow(2, this.saturation()),
              h = Math.abs(hue + 360) % 360,
              i;

            // Precompute the values in the matrix:
            var vsu = v * s * Math.cos((h * Math.PI) / 180),
                vsw = v * s * Math.sin((h * Math.PI) / 180);
            // (result spot)(source spot)
            var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
                rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw,
                rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
            var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
                gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
                gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
            var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw,
                bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw,
                bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;

            var r, g, b, a;

            for (i = 0; i < nPixels; i += 4) {
              r = pixels[i + 0];
              g = pixels[i + 1];
              b = pixels[i + 2];
              a = pixels[i + 3];

              pixels[i + 0] = rr * r + rg * g + rb * b;
              pixels[i + 1] = gr * r + gg * g + gb * b;
              pixels[i + 2] = br * r + bg * g + bb * b;
              pixels[i + 3] = a; // alpha
            }
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => {
                this.getOutputPort("output_port1").setValue(image);
            }
            image.src = this.tmpCanvas.toDataURL();
        };
        
        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction
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
    }
});