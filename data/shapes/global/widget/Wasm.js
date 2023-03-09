var widget_Wasm = draw2d.shape.basic.Rectangle.extend({

    NAME: "widget_Wasm",
    VERSION: "1.0.0",

    init: function () {
        this._super({width:50, height:100});

        var inputLocator  = new draw2d.layout.locator.InputPortLocator();
        var outputLocator = new draw2d.layout.locator.OutputPortLocator();
    
        this.createPort("input",inputLocator);
        this.createPort("otput",outputLocator);
    },

    calculate: function( context )
    {
    },

    onStart: function(context)
    {
    },

    onStop:function(context)
    {
    }
});

