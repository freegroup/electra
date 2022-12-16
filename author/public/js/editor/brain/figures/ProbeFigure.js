export default draw2d.shape.basic.Label.extend({

    NAME : "ProbeFigure",

    /**
     * @param attr
     */
    init : function(attr, setter, getter)
    {
        this._super($.extend({
                padding:{left:5, top:2, bottom:2, right:10},
                bgColor:"#FFFFFF",
                stroke:0,
                color:"#000000",
                fontSize:8
            },attr),
            setter,
            getter);

        // the sort index in the probe window
        //
        this.index = 0;
    },


    getValue:function()
    {
        return this.getParent().getValue();
    },

    getIndex: function()
    {
        return this.index;
    },

    setIndex: function( index)
    {
        this.index = index;

        return this;
    },


    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();

        memento.index = this.index;

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        if(typeof memento.index !=="undefined"){
            this.index = parseInt(memento.index);
        }
    }

});
