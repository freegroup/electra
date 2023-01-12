
var drawing_Polygon = draw2d.shape.basic.Polygon.extend({
    NAME: "drawing_Polygon",
    VERSION: "1.0.0",

    init: function (attr) {
        this._super({x:50, y:800, width:100, height:100, ...attr});
    },

    calculate: function( context )
    {
    }
});

