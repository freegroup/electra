// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_HistogramAdjust = CircuitFigure.extend({

   NAME: "video_quality_HistogramAdjust",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.886999999999944 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.886999999999944 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Histogram Adjust');
       shape.attr({"x":5.228799999999865,"y":67.56627759999992,"text-anchor":"start","text":"Histogram Adjust","font-family":"\"Arial\"","font-size":9,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.962567472217447,46.776768974949896Q29.31898911823282,50.724655359115786 33.31880873597436, 50.762642534977275L47.40091030048609,50.89638338325396Q51.400729918227626,50.93437055911545 50.51211395841982, 47.03432419067637L48.72418747803842,39.18729409867167Q47.83557151823061,35.28724773023259 47.77480253027943, 34.71745662722515L47.77480253027943,34.71745662722515Q47.71403354232825,34.1476655242177 47.53357301342339, 33.5951872355472L47.53357301342339,33.5951872355472Q47.35311248451853,33.0427089468767 47.058443616512704, 32.52433024577522L47.058443616512704,32.52433024577522Q46.763774748506876,32.005951544673735 46.36385090584463, 31.537423105665766L46.36385090584463,31.537423105665766Q45.96392706318238,31.068894666657798 45.47089972945241, 30.66445248927039L45.47089972945241,30.66445248927039Q44.97787239572244,30.26001031188298 44.406721956976526, 29.931943167022382L44.406721956976526,29.931943167022382Q43.83557151823061,29.603876022161785 43.20365209153351, 29.36215206401357L43.20365209153351,29.36215206401357Q42.57173266483642,29.120428105865358 41.89824480220159, 28.972391994582267L41.89824480220159,28.972391994582267Q41.22475693956676,28.824355883299177 40.53016422889914, 28.77450562120748L40.53016422889914,28.77450562120748Q39.83557151823152,28.724655359115786 39.14097880756344, 28.77450562120748L39.14097880756344,28.77450562120748Q38.44638609689537,28.824355883299177 37.77289823426054, 28.972391994582267L37.77289823426054,28.972391994582267Q37.09941037162571,29.120428105865358 36.46749094492861, 29.36215206401357L36.46749094492861,29.36215206401357Q35.83557151823152,29.603876022161785 35.2644210794856, 29.931943167022382L35.2644210794856,29.931943167022382Q34.693270640739684,30.26001031188298 34.200243307009714, 30.66445248927039L34.200243307009714,30.66445248927039Q33.707215973279745,31.068894666657798 33.3072921306175, 31.537423105665766L33.3072921306175,31.537423105665766Q32.90736828795525,32.005951544673735 32.61269941994942, 32.52433024577522L32.61269941994942,32.52433024577522Q32.31803055194359,33.0427089468767 32.137570023038734, 33.5951872355472L32.137570023038734,33.5951872355472Q31.957109494133874,34.1476655242177 31.896340506182696, 34.71745662722515L31.896340506182696,34.71745662722515Q31.835571518231518,35.28724773023259 31.19199316424689, 39.235134114398484L29.962567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077 44.171641281785924L13.719023999994533 44.02284128177871L13.676023999993959 33.767941281774256L20.7717239999929 33.69354128177201L20.760973999997077 49.015291281779355L30.763898999993216 49.04026628178235L30.83561149999332 42.51590378178207L36.55331775000013 42.43627253178329L36.45297087500239 45.23235690677393L41.51974743750179 45.02749909427439L41.52548571875377 42.33577018802771L46.46035485937591 42.34620573490429L46.461789429688906 39.14562350832966L51.88770671484508 39.14823239504858L51.826415357422775 37.30003683841369L56.29621967871026 37.3623390600942L56.188421839356124 41.70899017092779L63.03932291968249 41.78621572634893L63.1356734598412 25.672528504053844L75.31542400000308 25.587841281771944L75.31542400000308 55.587841281771944L4.315424000003077 55.587841281771944Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,219,219,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.55});
       shape.data("name","Rectangle");
       
       // Line
       shape = this.canvas.paper.path('M39.69640448001155 4.038881344014044L39.864176640010555,55.044239424005355');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(26,12,112,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
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
video_quality_HistogramAdjust = video_quality_HistogramAdjust.extend({

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
        if(img instanceof HTMLImageElement && this.worker!==null && this.processing===false){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
            this.processing = true;
            this.worker.postMessage(imageData, [imageData.data.buffer]);
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
            const  HISTOGRAM_SIZE = 256; // for 8-bit image
            const  MAX_VALUE = 255;      // max value in 8-bit image

            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            var imageSize = width * height;
            var scale = MAX_VALUE / imageSize;    // scale factor ,so the values in LUT are from 0 to MAX_VALUE
            var lutR   = new Uint8Array(HISTOGRAM_SIZE);
            var lutG   = new Uint8Array(HISTOGRAM_SIZE);
            var lutB   = new Uint8Array(HISTOGRAM_SIZE);
            var histR  = new Uint32Array(HISTOGRAM_SIZE);
            var histG  = new Uint32Array(HISTOGRAM_SIZE);
            var histB  = new Uint32Array(HISTOGRAM_SIZE);
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

            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            var i = 0;
            while(i < HISTOGRAM_SIZE)
            {
                // cumulative sum is used as LUT
                sumR += histR[i];
                sumG += histG[i];
                sumB += histB[i];
       
                // build look-up table
                lutR[i] = (sumR * scale+0.5)|0;
                lutG[i] = (sumG * scale+0.5)|0;
                lutB[i] = (sumB * scale+0.5)|0;
                ++i;
            }

            // re-map input pixels by using LUT
            for (index=0; index < pixels.length; index+=4) {
                pixels[index  ] = lutR[pixels[index  ]];
                pixels[index+1] = lutG[pixels[index+1]];
                pixels[index+2] = lutB[pixels[index+2]];
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