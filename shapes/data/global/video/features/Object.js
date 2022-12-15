// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_features_Object = CircuitFigure.extend({

   NAME: "video_features_Object",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:121,height:80},attr), setter, getter);
     var port;
     // input_port1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.4132231404958678, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_port1");
     port.setMaxFanOut(20);
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.71485619834695, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 121;
      this.originalHeight= 80;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L121,0 L121,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M1,3Q1,0 4, 0L118,0Q121,0 121, 3L121,77Q121,80 118, 80L4,80Q1,80 1, 77L1,3');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M4.5,5.508584000000155Q4.5,3.5085840000001554 6.5, 3.5085840000001554L75.5,3.5085840000001554Q77.5,3.5085840000001554 77.5, 5.508584000000155L77.5,53.508584000000155Q77.5,55.508584000000155 75.5, 55.508584000000155L6.5,55.508584000000155Q4.5,55.508584000000155 4.5, 53.508584000000155L4.5,5.508584000000155');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(240,243,243,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M22.199999999999818 48.49629215999994L46.822380625916594 48.410392814080296L43.248545078531606 33.84124771412098L42.82709505194725 32.92176425057005L42.138921283378295 32.05903235089045L41.20493358454951 31.27926568728435L40.05351069907101 30.606157075243573L38.71963802866776 30.060158579344716L37.243844619459196 29.657860087585505L35.67097170739544 29.41148523607808L34.0488102399986 29.328520000000026L32.426648772601766 29.41148523607808L30.853775860538008 29.657860087585505L29.377982451329444 30.060158579344716L28.044109780926192 30.606157075243573L26.892686895447696 31.27926568728435L25.95869919661891 32.05903235089045L25.27052542804995 32.92176425057005L24.849075401465598 33.84124771412098Z');
       shape.attr({"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8,"ry":8.5,"cx":33.69999999999982,"cy":17.828520000000026,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Rectangle
       shape = this.canvas.paper.path('M19.199999999999818 8.450120000000425L48.19999999999982 8.450120000000425L48.19999999999982 32.450120000000425L19.199999999999818 32.450120000000425Z');
       shape.attr({"stroke":"rgba(70,176,25,1)","stroke-width":2,"fill":"rgba(0,0,0,0)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Detect:');
       shape.attr({"x":4,"y":67.50858400000016,"text-anchor":"start","text":"Detect:","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // objectClass
       shape = this.canvas.paper.text(0,0,'person');
       shape.attr({"x":50,"y":66.96170900000016,"text-anchor":"start","text":"person","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#C71D3D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","objectClass");
       
       // Label
       shape = this.canvas.paper.text(0,0,'found');
       shape.attr({"x":88,"y":39.937895000000026,"text-anchor":"start","text":"found","font-family":"\"Arial\"","font-size":10,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

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
video_features_Object = video_features_Object.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        
        this.objectClass = "person"
        this.on("change:userData.objectClass",(emitter, event)=>{
            this.layerAttr("objectClass", {text: event.value})
            this.objectClass = event.value;
        });
        this.on("added",(emitter, event)=>{
             this.layerAttr("objectClass", {text: this.attr("userData.objectClass")})
        });
        this.attr("userData.objectClass",this.objectClass)


        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()/6*4-6, 
            height: this.getHeight()/4*3-6,
            selectable: false,
            deleteable: false,
            resizeable:false,
            draggable: false,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false;
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3}));


        this.rectangleLocator =  new draw2d.layout.locator.XYAbsPortLocator({x:0, y:0});
        this.rectangle = new draw2d.shape.basic.Rectangle({
                        x: 0, y: 0,
                        width: 20, height: 20,
                        color: "#ff0000",
                        bgColor: null,
                        alpha  : 0.7,
                        visible:false,
                        radius: 5
                });
        this.add(this.rectangle, this.rectangleLocator)  ;
        this.rectangle.setVisible(false);
        this.rectangle.hitTest = ()=>false;
        
        this.model = null;
        // Initialize the Image Classifier method with MobileNet
        cocoSsd.load().then(model =>{
            this.model = model;
        });
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
        
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
        if(this.model===null){
            return;
        }
        
        var image = this.getInputPort("input_port1").getValue();
        if (image instanceof HTMLImageElement) {
            this.img.attr("path", image.src);
            this.model.detect(image, 1).then(predictions => {
                if(predictions.length>0){
                    let pre = predictions[0];
                    if(pre.class === this.objectClass){
                       var height = this.getHeight()/4*3;
                       var width = this.getWidth()/6*4;
                       this.rectangle.setVisible(true);
                       let bbox = pre.bbox;
                       let x_percent = 100/image.naturalWidth * bbox[0];
                       let y_percent = 100/image.naturalHeight * bbox[1];
                       let w_percent = 100/image.naturalWidth * bbox[2];
                       let h_percent = 100/image.naturalHeight * bbox[3];
                     
                       this.rectangle.attr({width:width/100*w_percent, height:height/100*h_percent});
                       this.rectangleLocator.setX(width/100*x_percent);
                       this.rectangleLocator.setY(height/100*y_percent);
                       this.rectangleLocator.relocate(0, this.rectangle);
                       this.getOutputPort("output_port1").setValue(5.0);
                    }
                    else{
                        this.rectangle.setVisible(false);
                        this.getOutputPort("output_port1").setValue(0.0);
                    }
                }
                else{
                    this.rectangle.setVisible(false);
                    this.getOutputPort("output_port1").setValue(0.0);
                }
            });
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },
    
  
    getPersistentAttributes: function () 
    {
       let currentImage = this.img.attr("path");
       this.img.attr("path", this.TRANSPARENT_PIXEL);
    
       let memento = this._super()
    
       this.img.attr("path", currentImage);

       return memento
    },

    setPersistentAttributes: function (memento) 
    {
        this._super(memento);
        this.rectangle = this.getChildren().find( child => child instanceof draw2d.shape.basic.Rectangle);
        this.rectangle.setVisible(false);
        this.rectangle.hitTest = ()=>false;
 
        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image);
        this.img.hitTest = ()=>false;
        
        this.getInputPort("input_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
        
        this.objectClass = this.attr("userData.objectClass")
    },
    
    
    getParameterSettings: function () {
        return [
            {
                name: "objectClass",
                label: "Type of Object to detect",
                property: {
                    type: "enum",
                    values: [
"person",
"bicycle",
"car",
"motorcycle",
"airplane",
"bus",
"train",
"truck",
"boat",
"traffic light",
"fire hydrant",
"stop sign",
"parking meter",
"bench",
"bird",
"cat",
"dog",
"horse",
"sheep",
"cow",
"elephant",
"bear",
"zebra",
"giraffe",
"backpack",
"umbrella",
"handbag",
"tie",
"suitcase",
"frisbee",
"skis",
"snowboard",
"sports ball",
"kite",
"baseball bat",
"baseball glove",
"skateboard",
"surfboard",
"tennis racket",
"bottle",
"wine glass",
"cup",
"fork",
"knife",
"spoon",
"bowl",
"banana",
"apple",
"sandwich",
"orange",
"broccoli",
"carrot",
"hot dog",
"pizza",
"donut",
"cake",
"chair",
"couch",
"potted plant",
"bed",
"dining table",
"toilet",
"tv",
"laptop",
"mouse",
"remote",
"keyboard",
"cell phone",
"microwave",
"oven",
"toaster",
"sink",
"refrigerator",
"book",
"clock",
"vase",
"scissors",
"teddy bear",
"hair drier",
"toothbrush"
]
                }

            }];
    }

});