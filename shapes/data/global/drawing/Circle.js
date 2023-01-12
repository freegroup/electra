
var drawing_Circle = draw2d.shape.basic.Circle.extend({
    NAME: "drawing_Circle",
    VERSION: "1.0.0",

    init: function (attr) {
        this._super({x:50, y:800, diameter:100,  ...attr});
    },

    calculate: function( context )
    {
    }
});

