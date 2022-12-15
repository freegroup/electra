// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_filter_Roberts = CircuitFigure.extend({

   NAME: "video_filter_Roberts",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:81.04423942400535},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.24421560822089 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.24421560822089 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 81.04423942400535;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,81.04423942400535 L0,81.04423942400535");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Roberts');
       shape.attr({"x":13.228799999999865,"y":68.54423942400535,"text-anchor":"start","text":"Roberts","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // Rectangle
       shape = this.canvas.paper.path('M38.728320000003805,7.16335971200624Q38.728320000003805,3.1633597120062404 42.728320000003805, 3.1633597120062404L71.42848000000322,3.1633597120062404Q75.42848000000322,3.1633597120062404 75.42848000000322, 7.16335971200624L75.42848000000322,51.91983971200625Q75.42848000000322,55.91983971200625 71.42848000000322, 55.91983971200625L42.728320000003805,55.91983971200625Q38.728320000003805,55.91983971200625 38.728320000003805, 51.91983971200625L38.728320000003805,7.16335971200624');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Shadow_Body
       shape = this.canvas.paper.path('M38.81898911823282,48.09356345220658Q38.81898911823282,50.09356345220658 40.81886978802416, 50.11541079975606L48.81910844844148,50.202808011566304Q50.81898911823282,50.224655359115786 50.43037456504294, 48.26277393327756L48.276999915507304,37.391678928941374Q47.88838536231742,35.429797503103146 47.838432511882274, 34.89104169036955L47.838432511882274,34.89104169036955Q47.78847966144713,34.35228587763595 47.64013890222441, 33.829899887648025L47.64013890222441,33.829899887648025Q47.49179814300169,33.3075138976601 47.24957673389736, 32.81737016438365L47.24957673389736,32.81737016438365Q47.007355324793025,32.32722643110719 46.678613040751316, 31.884217723856636L46.678613040751316,31.884217723856636Q46.349870756709606,31.44120901660608 45.9445962656805, 31.05879593077134L45.9445962656805,31.05879593077134Q45.5393217746514,30.676382844936597 45.069829136965836, 30.36618480862535L45.069829136965836,30.36618480862535Q44.600336499280274,30.0559867723141 44.08089101115911, 29.827428995890386L44.08089101115911,29.827428995890386Q43.561445523037946,29.598871219466673 43.00783027278612, 29.4588983153144L43.00783027278612,29.4588983153144Q42.4542150225343,29.318925411162127 41.88325132938871, 29.271790385138956L41.88325132938871,29.271790385138956Q41.31228763624313,29.224655359115786 40.74132394309618, 29.271790385138956L40.74132394309618,29.271790385138956Q40.170360249949226,29.318925411162127 39.6167449996974, 29.4588983153144L39.6167449996974,29.4588983153144Q39.06312974944558,29.598871219466673 38.9410594338392, 29.652582572324718L38.9410594338392,29.652582572324718Q38.81898911823282,29.706293925182763 38.81898911823282, 31.706293925182763L38.81898911823282,48.09356345220658');
       shape.attr({"stroke":"rgba(110,110,110,1)","stroke-width":1,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Shadow_Body");
       
       // Show_Circle
       shape = this.canvas.paper.path('M38.67362344960475 23.57014711485499L38.91983980273653 23.64504246582692L40.06705787534429 23.75898431823407L41.21427594795114 23.64504246582692L42.32663637994392 23.306678974127863L43.37034066247361 22.754174846618298L44.313676369059976 22.004317641627495L45.127980721607855 21.07989139088386L45.78851149442198 20.00898431823407L46.2751987942147 18.82413539317713L46.5732548736587 17.561345650736257L46.67362344960475 16.25898431823407L46.5732548736587 14.956622985731883L46.2751987942147 13.69383324329101L45.78851149442198 12.50898431823407L45.127980721607855 11.438077245584282L44.313676369059976 10.513650994840646L43.37034066247361 9.763793789849842L42.32663637994392 9.211289662340278L41.21427594795114 8.872926170641222L40.06705787534429 8.75898431823407L38.91983980273653 8.872926170641222L38.67362344960475 8.94782152161315L38.67362344960475 23.57014711485499Z');
       shape.attr({"stroke":"rgba(107,107,107,1)","stroke-width":1,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Show_Circle");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.038881344014044L38.864176640010555,55.044239424005355');
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
video_filter_Roberts = video_filter_Roberts.extend({

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
            var imageData = event.data;
            var pixels    = imageData.data;
            var w = imageData.width;
            var h = imageData.height;

            var kernelX   =[ 1,  0,
                             0, -1 ];
                             
            var kernelY   =[ 0, 1,
                            -1, 0 ];
                           
            function convolut(weights, src, w, h){
                var side     = Math.round(Math.sqrt(weights.length));
                var halfSide = Math.floor(side/2);
                var sw = w;
                var sh = h;

                var dst = new Uint8ClampedArray(w*h*4);

                for (var y=0; y < h; y++) {
                    for (var x=0; x < w; x++) {
                        var sy = y;
                        var sx = x;
                        var dstOff = (y*w+x)*4;
                        var r=0, g=0, b=0, a=0;
                        for (var cy=0; cy<side; cy++) {
                            for (var cx=0; cx<side; cx++) {
                                var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                                var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                                var srcOff = (scy*sw+scx)*4;
                                var wt = weights[cy*side+cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff+1] * wt;
                                b += src[srcOff+2] * wt;
                            }
                        }
                        dst[dstOff]   = r;
                        dst[dstOff+1] = g;
                        dst[dstOff+2] = b;
                        dst[dstOff+3] = src[dstOff+3];
                    }
                }
                return dst;
            }

            var dstX = convolut(kernelX, pixels, w, h);
            var dstY = convolut(kernelY, pixels, w, h);
            for (var i=0; i < dstX.length; i++) {
                var edgeX = dstX[i];
                var edgeY = dstY[i]; 
                dstX[i] = Math.min(255,Math.round(Math.sqrt(edgeX * edgeX + edgeY * edgeY)));
            }
            
            imageData.data.set(dstX);
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