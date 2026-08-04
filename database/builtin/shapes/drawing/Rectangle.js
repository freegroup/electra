
var drawing_Rectangle = draw2d.shape.basic.Rectangle.extend({
    NAME: "drawing_Rectangle",
    VERSION: "1.0.0",

    init: function (attr) {
        this._super($.extend({width: 200, height: 200}, attr));
    },

    calculate: function( context )
    {
    }
});

