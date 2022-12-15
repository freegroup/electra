// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var video_source_IPCamera = CircuitFigure.extend({

   NAME: "video_source_IPCamera",
   VERSION: "2.0.343_1136",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:80.125},attr), setter, getter);
     var port;
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.7890625, y: 49.921996879875195 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 80.125;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,80.125 L0,80.125");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M79.9944352881578,16.18111752610946Q79.99426089739427,14.181117533712495 79.99426089739427, 12.181117533712495L79.99426089739427,2Q79.99426089739427,0 77.99427040266448, 0.006166116321677656L1.9999904947297864,0.2404620146918169Q0,0.24662813101349457 0.007528135284914805, 2.24661396275809L0.2926710777935708,78.0000141682554Q0.3001992130784856,80 2.3001992130784856, 80L78,80Q80,80 79.99982560923647, 78.00000000760303L79.9944352881578,16.18111752610946');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'NetworkCam');
       shape.attr({"x":5.640625,"y":69.125,"text-anchor":"start","text":"NetworkCam","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#BD2466","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M7.077599999998711,25.322299999999814Q7.077599999998711,21.322299999999814 11.07759999999871, 21.322299999999814L47.07759999999871,21.322299999999814Q51.07759999999871,21.322299999999814 51.07759999999871, 25.322299999999814L51.07759999999871,47.322299999999814Q51.07759999999871,51.322299999999814 47.07759999999871, 51.322299999999814L11.07759999999871,51.322299999999814Q7.077599999998711,51.322299999999814 7.077599999998711, 47.322299999999814L7.077599999998711,25.322299999999814');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M50.88073469083684,32.45000459669621Q50.86119999999755,30.450100000008206 52.560817500210284, 29.39591768514487L63.87798249978598,22.37648231486315Q65.57759999999871,21.322299999999814 65.57759999999871, 23.322299999999814L65.57759999999871,49.322299999999814Q65.57759999999871,51.322299999999814 63.91645483821974, 50.20847921033106L52.63054516177801,42.641120789660306Q50.96939999999904,41.527299999991556 50.949865309159755, 39.52739540330355L50.88073469083684,32.45000459669621');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":3,"ry":3,"cx":45.86119999999755,"cy":25.958674805342525,"stroke":"none","stroke-width":0,"fill":"rgba(199,29,61,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'http://<address>:<port>');
       shape.attr({"x":6.640625,"y":13.109375,"text-anchor":"start","text":"http://<address>:<port>","font-family":"\"Arial\"","font-size":6,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custome code and event handler here.
 *
 *
 */
video_source_IPCamera = video_source_IPCamera.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
   
        this.img = new draw2d.shape.basic.Image({
            width: this.getWidth()-6, 
            height: this.getHeight()/4*3 -6,
            path: this.TRANSPARENT_PIXEL
        });
        this.img.hitTest = ()=>false;
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:3,y:3}));
        
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        });

    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function( context)
    {
        var image = new Image();
        image.onload = () => {
            this.getOutputPort("output_port1").setValue(image);
        };
        image.src = hardware.camera.image(this.attr("userData.ipAddress"));
    },
    
    
    onStart: function(context ){
        hardware.camera.start(this.attr("userData.ipAddress"));
    },
    
    
    onStop: function(context){
        hardware.camera.stop(this.attr("userData.ipAddress"));
    },
    
    getPersistentAttributes: function () 
    {
       let currentImage = this.img.attr("path");
       this.img.attr("path", this.TRANSPARENT_PIXEL);
    
       let memento = this._super()
    
       this.img.attr("path", currentImage);

       return memento
    },
    
    setPersistentAttributes: function (memento) {
        this._super(memento)
        
        this.img = this.getChildren().find( child => child instanceof draw2d.shape.basic.Image)
        this.img.hitTest = ()=>false
        
        this.getOutputPort("output_port1").attr({
            semanticGroup:"Image",
            bgColor:"#ff0000",
            diameter:15
        })
    },
    
    getParameterSettings: function () {
        return [{
                name: "ipAddress",
                label: "IP-Address of the MJPEG Web Camera",
                property: {
                    type: "string"
                }
            }]
    }
    
});