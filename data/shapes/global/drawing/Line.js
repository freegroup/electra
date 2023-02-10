
var drawing_Line = draw2d.shape.basic.Line.extend({
    NAME: "drawing_Line",
    VERSION: "1.0.0",

    init: function (attr) {
        this._super($.extend({startX: 200, startY: 200, endX: 250, endY:250}, attr));
    },

    calculate: function( context )
    {
    }
});

