var widget_Slider = draw2d.shape.widget.Slider.extend({

    NAME: "widget_Slider",
    VERSION: "1.0.0",

    init: function () {
        this._super({bold: false, fontFamily: "Verdana", fontSize: 10, bgColor: "#fafafa"});

        this.persistPorts = false

        this.outputPort = new DecoratedOutputPort()
        this.outputPort.setName("output")
        this.addPort(this.outputPort)

        this.on("change:userData.value", (figure, event) => {
            this.setValue(parseInt(event.value))
        })

        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.on("change:value", (element, event) => {
            let value = parseInt(event.value); // 0..100
            value = 5.0 / 100.0 * value;       // 0..5
            this.getOutputPort(0).setValue(value);
        });
    },

    calculate: function (context) {
    },

    onStart: function (context) {
        let value = 5.0 / 100.0 * this.getValue();       // 0..5
        this.getOutputPort(0).setValue(value);
    },

    onStop: function (context) {
    },


    onPanning: function (dx, dy, dx2, dy2) {
        // calculate the current position of the mouse pos
        //
        let width = this.getWidth()
        let sliderWidth = width - this.padding.left - this.padding.right

        let figurePos = Math.min(width, Math.max(0, this.panningX + dx))
        let sliderPos = Math.min(width - this.padding.left - this.padding.right, figurePos)

        this.setValue(100 / sliderWidth * sliderPos)
    },


    getPersistentAttributes: function ()
    {
        let memento = this._super()
        memento.value = this.getValue()
        return memento
    },

    setPersistentAttributes: function (memento)
    {
        this._super(memento)
        if(memento.value){
            this.setValue(parseInt(memento.value))
        }
    }

});

