// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_morphological_Dilate = CircuitFigure.extend({

   NAME: "video_morphological_Dilate",
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
       shape = this.canvas.paper.text(0,0,'Dilate');
       shape.attr({"x":21.76637911823309,"y":66.77074080000239,"text-anchor":"start","text":"Dilate","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.315424000003077,7.770740800002386Q4.315424000003077,3.770740800002386 8.315424000003077, 3.770740800002386L71.31542400000308,3.770740800002386Q75.31542400000308,3.770740800002386 75.31542400000308, 7.770740800002386L75.31542400000308,49.770740800002386Q75.31542400000308,53.770740800002386 71.31542400000308, 53.770740800002386L8.315424000003077,53.770740800002386Q4.315424000003077,53.770740800002386 4.315424000003077, 49.770740800002386L4.315424000003077,7.770740800002386');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // TOP_Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.16442848176873,"ry":8.16442848176873,"cx":39.50000000000025,"cy":16.4234128000028,"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // TOP_Body
       shape = this.canvas.paper.path('M29.462567472217447,46.776768974949896Q28.81898911823282,50.724655359115786 32.81880873597436, 50.762642534977275L46.90091030048609,50.89638338325396Q50.900729918227626,50.93437055911545 50.01211395841982, 47.03432419067637L48.22418747803842,39.18729409867167Q47.33557151823061,35.28724773023259 47.27480253027943, 34.71745662722515L47.27480253027943,34.71745662722515Q47.21403354232825,34.1476655242177 47.03357301342339, 33.5951872355472L47.03357301342339,33.5951872355472Q46.85311248451853,33.0427089468767 46.558443616512704, 32.52433024577522L46.558443616512704,32.52433024577522Q46.263774748506876,32.005951544673735 45.86385090584463, 31.537423105665766L45.86385090584463,31.537423105665766Q45.46392706318238,31.068894666657798 44.97089972945241, 30.66445248927039L44.97089972945241,30.66445248927039Q44.47787239572244,30.26001031188298 43.906721956976526, 29.931943167022382L43.906721956976526,29.931943167022382Q43.33557151823061,29.603876022161785 42.70365209153351, 29.36215206401357L42.70365209153351,29.36215206401357Q42.07173266483642,29.120428105865358 41.39824480220159, 28.972391994582267L41.39824480220159,28.972391994582267Q40.72475693956676,28.824355883299177 40.03016422889914, 28.77450562120748L40.03016422889914,28.77450562120748Q39.33557151823152,28.724655359115786 38.64097880756344, 28.77450562120748L38.64097880756344,28.77450562120748Q37.94638609689537,28.824355883299177 37.27289823426054, 28.972391994582267L37.27289823426054,28.972391994582267Q36.59941037162571,29.120428105865358 35.96749094492861, 29.36215206401357L35.96749094492861,29.36215206401357Q35.33557151823152,29.603876022161785 34.7644210794856, 29.931943167022382L34.7644210794856,29.931943167022382Q34.193270640739684,30.26001031188298 33.700243307009714, 30.66445248927039L33.700243307009714,30.66445248927039Q33.207215973279745,31.068894666657798 32.8072921306175, 31.537423105665766L32.8072921306175,31.537423105665766Q32.40736828795525,32.005951544673735 32.11269941994942, 32.52433024577522L32.11269941994942,32.52433024577522Q31.818030551943593,33.0427089468767 31.637570023038734, 33.5951872355472L31.637570023038734,33.5951872355472Q31.457109494133874,34.1476655242177 31.396340506182696, 34.71745662722515L31.396340506182696,34.71745662722515Q31.335571518231518,35.28724773023259 30.69199316424689, 39.235134114398484L29.462567472217447,46.776768974949896');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // TOP_Body
       shape = this.canvas.paper.path('M38.91283164062497,47.87030333208804Q38.91283164062497,51.87030333208804 42.91260138990854, 51.91322130869542L47.000230250716434,51.95708202339262Q51,52 50.20924821365575, 48.07893998867738L48.238790665599616,38.30813399225801Q47.448038879255364,34.387073980935384 47.38749484212394, 33.74569801339612L47.38749484212394,33.74569801339612Q47.32695080499252,33.10432204585686 47.14715829352963, 32.482433962538835L47.14715829352963,32.482433962538835Q46.967365782066736,31.86054587922081 46.67378770075311, 31.27704143484425L46.67378770075311,31.27704143484425Q46.38020961943948,30.693536990467692 45.981766189717746, 30.166145672311814L45.981766189717746,30.166145672311814Q45.58332275999601,29.638754354155935 45.09212048385734, 29.183500680543148L45.09212048385734,29.183500680543148Q44.60091820771868,28.72824700693036 44.031882017763564, 28.358963630369544L44.031882017763564,28.358963630369544Q43.46284582780845,27.98968025380873 42.83326560072146, 27.717587662828464L42.83326560072146,27.717587662828464Q42.20368537363447,27.4454950718482 41.53269058603291, 27.278860662142506L41.53269058603291,27.278860662142506Q40.861695798431356,27.112226252436813 40.16967428739645, 27.056113126218406L40.16967428739645,27.056113126218406Q39.47765277636154,27 39.195242208493255, 27.022899490243617L39.195242208493255,27.022899490243617Q38.91283164062497,27.045798980487234 38.91283164062497, 31.045798980487234L38.91283164062497,47.87030333208804');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Body");
       
       // TOP_Circle
       shape = this.canvas.paper.path('M40.81750864001151 25.43001197547619L41.47054496045439 25.5L42.74633181479476 25.363269777109053L43.98335453114578 24.95723358707346L45.144026800233405 24.294228634060346L46.1930821824908 23.3943999880712L47.09864566097622 22.285088487178655L47.83320214763262 21L48.374432515316585 19.578181289931308L48.70589175318128 18.06283359900226L48.81750864001151 16.49999999999909L48.70589175318128 14.93716640099774L48.374432515316585 13.421818710068692L47.83320214763262 12L47.09864566097622 10.714911512821345L46.1930821824908 9.6056000119288L45.144026800233405 8.705771365939654L43.98335453114578 8.04276641292654L42.74633181479476 7.636730222890947L41.47054496045439 7.5L40.81750864001151 7.569988024523809L40.81750864001151 25.43001197547619Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","TOP_Circle");
       
       // Line
       shape = this.canvas.paper.path('M39.64973648001251 5.040281344015057L39.81750864001151,52.63687542400294');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(0,0,0,1)","stroke-width":3,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M33.73613164062499 34.29746328124929L33.90303164062061,34.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M33.73613164062499 39.29746328124929L33.90303164062061,39.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M34.23613164062499 49.79746328124929L34.40303164062061,50.46506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M35.73613164062499 9.297463281249293L35.90303164062061,9.965063281248149');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
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
video_morphological_Dilate = video_morphological_Dilate.extend({

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
            this.worker.postMessage(imageData, [imageData.data.buffer]);
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        this.progressing = false;
        
        // the method which runs as WebWorker
        //
        var workerFunction = function(event){
            var colorToCare = 0;
            var imageData = event.data;
            var pixels = imageData.data;
            var width  = imageData.width;
            var height = imageData.height;
            var matrix = [
                [1,1,1],
                [1,1,1],
                [1,1,1]
            ]
            var pixelsCopy = new Uint8ClampedArray(pixels);
            pixelsCopy.set(pixels);

            function applyMatrix(x,y,matrix,imgIn,imgOut){
        		var nx,ny;
        		var xC=parseInt(matrix[0].length/2);
        		var yC=parseInt(matrix.length/2);
        		var offset = (y*width+x)*4;
        		
        		if(imgIn[offset]===colorToCare){
        			for(var i=0; i<matrix.length; i++){
        				for(var j=0; j<matrix.length; j++){
        					if((i != yC || j != xC) && matrix[i][j]){
        						nx = x + (j-xC);
        						ny = y + (i-yC);
        						if(nx > 0 && nx < width && ny > 0 && ny < height){
                            		var outOffset = (ny*width+nx)*4;
        							imgOut[outOffset]=imgOut[outOffset+1]=imgOut[outOffset+2]=colorToCare;
        						}
        					}
        				}
        			}
        		}
        	}
           
            for(var y=0; y<height; y++){
				for(var x=0; x<width; x++){
					applyMatrix(x, y, matrix, pixels, pixelsCopy);
				}
			}

            pixels.set(pixelsCopy);
            self.postMessage(imageData, [imageData.data.buffer]);
        };
        
        // the method which receives the WebWorker result
        //
       var receiverFunction = (event) => {
            this.processing = false;
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