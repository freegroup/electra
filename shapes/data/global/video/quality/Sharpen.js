// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_quality_Sharpen = CircuitFigure.extend({

   NAME: "video_quality_Sharpen",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.87877759999992},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.9640000000001692, y: 49.34495943717131 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100.32506249999983, y: 49.34495943717131 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.87877759999992;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.87877759999992 L0,80.87877759999992");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L77,0Q80,0 80, 3L80,77Q80,80 77, 80L3,80Q0,80 0, 77L0,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Sharpen');
       shape.attr({"x":10.228799999999865,"y":68.37877759999992,"text-anchor":"start","text":"Sharpen","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,51.770740800002386Q75.31542400000308,55.770740800002386 71.31542400000308, 55.770740800002386L8.315424000003077,55.770740800002386Q4.315424000003077,55.770740800002386 4.315424000003077, 51.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(237,237,237,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.path('M38.3575436800038 6.761013428584192L38.33557151823152 6.75898431823407L36.77273791922926 6.903310664618402L35.25739022830021 7.331904420767387L33.83557151823152 8.031742982281685L32.55048303105286 8.981562108603612L31.441171530160318 10.15250202621246L30.541342884171172 11.50898431823407L29.878337931158057 13.009792956640013L29.472301741121555 14.609326630398755L29.335571518231518 16.25898431823407L29.472301741121555 17.908642006069385L29.878337931158057 19.508175679828128L30.541342884171172 21.00898431823407L31.441171530160318 22.36546661025568L32.55048303105286 23.53640652786453L33.83557151823152 24.486225654186455L35.25739022830021 25.186064215700753L36.77273791922926 25.614657971849738L38.33557151823152 25.75898431823407L38.3575436800038 25.756955207883948L38.3575436800038 6.761013428584192Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.25});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M35.323635168710325,52.22508227661048Q38.32230559823074,52.314388799999506 38.32230559823074, 49.314388799999506L38.32230559823074,30.438490014114905Q38.32230559823074,27.438490014114905 38.301052857797, 27.433087432160846L38.301052857797,27.433087432160846Q38.279800117363266,27.427684850206788 37.59730583340797, 27.371036825103147L37.59730583340797,27.371036825103147Q36.91481154945268,27.314388799999506 36.23231726549511, 27.371036825103147L36.23231726549511,27.371036825103147Q35.549822981537545,27.427684850206788 34.88806594104108, 27.5959077039397L34.88806594104108,27.5959077039397Q34.22630890054461,27.764130557672615 33.605396256316, 28.038816873749056L33.605396256316,28.038816873749056Q32.98448361208739,28.313503189825497 32.42328148062643, 28.68630676353132L32.42328148062643,28.68630676353132Q31.86207934916547,29.059110337237144 31.377639573254783, 29.51870372063013L31.377639573254783,29.51870372063013Q30.893199797344096,29.978297104023113 30.50024183443702, 30.510715784715558L30.50024183443702,30.510715784715558Q30.107283871529944,31.043134465408002 29.817747550480362, 31.632201171204088L29.817747550480362,31.632201171204088Q29.52821122943078,32.22126787700017 28.902015467438314, 35.15518656497751L25.948501360223208,48.993303588943135Q25.32230559823074,51.927222276920475 28.320976027751158, 52.0165288003095L35.323635168710325,52.22508227661048');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M38.309039678229965 51.724655359115786L38.309039678229965 27.84379252466624L38.27307350211322 27.833419567314195L37.11808317541818 27.724655359115786L35.96309284872041 27.833419567314195L34.84319631864855 28.156407446482262L33.792421074570484 28.683805173349356L32.84269439055879 29.399588034863882L32.02287323132532 30.28200733097765L31.357867447944045 31.304251197908343L30.867882904630278 32.435259273036536L27.309039678229965 51.352975496960426Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":0.2});
       shape.data("name","Rectangle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // Line
       shape = this.canvas.paper.path('M38.69640448001155 4.038881344014044L38.864176640010555,55.044239424005355');
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
video_quality_Sharpen = video_quality_Sharpen.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.worker= null;
        this.tmpCanvas = null;
        this.tmpContext = null;
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
        if(img instanceof HTMLImageElement && this.worker!==null){
            var imageData = this.imageToData(img);
            // Push it to the WebWorker with "Transferable Objects"
            // Passing data by reference instead of structure clone
            //
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
            var opaque = false;
            var weights =[  0, -1,  0,  -1,  5, -1,   0, -1,  0 ];
            var side = Math.round(Math.sqrt(weights.length));
            var halfSide = Math.floor(side/2);

            var src = imageData.data;
            var sw = imageData.width;
            var sh = imageData.height;
            var w = sw;
            var h = sh;
            var dst = new Uint8ClampedArray(w*h*4);
            var alphaFac = opaque ? 1 : 0;

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
                    a += src[srcOff+3] * wt;
                  }
                }
                dst[dstOff] = r;
                dst[dstOff+1] = g;
                dst[dstOff+2] = b;
                dst[dstOff+3] = a + alphaFac*(255-a);
              }
            }
            imageData.data.set(dst);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            var imageData = event.data;
            this.tmpContext.putImageData(imageData,0,0);
            var image = new Image();
            image.onload = () => { this.getOutputPort("output_port1").setValue(image);};
            image.src = this.tmpCanvas.toDataURL();
        };


        // convert a js function to a WebWorker
        //
        this.worker = this.createWorker(workerFunction);
        this.worker.onmessage = receiverFunction;
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