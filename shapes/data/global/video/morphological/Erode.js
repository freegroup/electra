// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_morphological_Erode = CircuitFigure.extend({

   NAME: "video_morphological_Erode",
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
       shape = this.canvas.paper.text(0,0,'Erode');
       shape.attr({"x":21.76637911823309,"y":66.77074080000239,"text-anchor":"start","text":"Erode","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
       
       // Rectangle
       shape = this.canvas.paper.path('M39.58450938880469 5.328906649604505L51.71779200000401 5.328906649604505L51.71779200000401 52.46617272320418L39.58450938880469 52.46617272320418Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Small_Body
       shape = this.canvas.paper.path('M37.91283164062497,45.620898024786584Q37.91283164062497,49.620898024786584 41.912653708953805, 49.65862628620485L44.91300957229614,49.68692709769752Q48.91283164062497,49.724655359115786 48.01842084549514, 45.825933859757924L46.57475893204867,39.533036043222864Q45.68034813691884,35.634314543865 45.62524967310674, 35.1212137698335L45.62524967310674,35.1212137698335Q45.570151209294636,34.608112995802 45.406529956798295, 34.110602529146945L45.406529956798295,34.110602529146945Q45.24290870430195,33.61309206249189 44.975736212082666, 33.146288506990004L44.975736212082666,33.146288506990004Q44.70856371986338,32.67948495148812 44.34595788890056, 32.25757189696378L44.34595788890056,32.25757189696378Q43.983352057937736,31.835658842439443 43.536330482918856, 31.471455903549213L43.536330482918856,31.471455903549213Q43.08930890789998,31.107252964658983 42.57145411317879, 30.811826263410694L42.57145411317879,30.811826263410694Q42.0535993184576,30.516399562162405 41.4806460599234, 30.29872548937783L41.4806460599234,30.29872548937783Q40.9076928013892,30.081051416593255 40.29704997387444, 29.947743888829336L40.29704997387444,29.947743888829336Q39.68640714635967,29.814436361065418 39.05662882317711, 29.769545860090602L39.05662882317711,29.769545860090602Q38.42685049999454,29.724655359115786 38.16984107030976, 29.742974951311226L38.16984107030976,29.742974951311226Q37.91283164062497,29.761294543506665 37.91283164062497, 33.761294543506665L37.91283164062497,45.620898024786584');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Small_Body");
       
       // Small_Circle
       shape = this.canvas.paper.path('M39.31750864001151 23.445564869815826L39.80728588034344 23.5L40.76412602109849 23.393654271086234L41.69189305836244 23.07784834550057L42.56239726017793 22.56217782649219L43.3491887968712 21.862311101834166L44.02836140573436 20.999513267806833L44.57927877072689 20L44.985201546490316 18.89414100328031L45.23379597488929 17.715537243669132L45.31750864001151 16.49999999999909L45.23379597488929 15.284462756330868L44.985201546490316 14.10585899671969L44.57927877072689 13L44.02836140573436 12.000486732193167L43.3491887968712 11.137688898165834L42.56239726017793 10.437822173507811L41.69189305836244 9.92215165449943L40.76412602109849 9.606345728913766L39.80728588034344 9.5L39.31750864001151 9.554435130184174L39.31750864001151 23.445564869815826Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(0,0,0,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Small_Circle");
       
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
       
       // Line
       shape = this.canvas.paper.path('M44.73613164062499 11.297463281249293L44.044038181421456,12.072437463648384');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M45.23613164062499 49.29746328124929L45.40303164062061,49.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M44.23613164062499 38.79746328124929L44.40303164062061,39.46506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M43.73613164062499 34.29746328124929L43.90303164062061,34.96506328124815');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,255,255,1)","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line
       shape = this.canvas.paper.path('M39.14973648001251 5.040281344015057L39.31750864001151,52.63687542400294');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"rgba(255,5,38,1)","stroke-width":1,"stroke-dasharray":null,"opacity":1});
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
video_morphological_Erode = video_morphological_Erode.extend({

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
            var colorToCare = 255;
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