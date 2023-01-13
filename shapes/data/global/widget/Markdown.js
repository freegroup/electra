
var widget_Markdown = draw2d.shape.basic.Rectangle.extend({
    NAME: "widget_Markdown",
    VERSION: "1.0.0",

    init: function (attr) {
        this._super($.extend({bgColor: "#FDFDFD", color: "#1B1B1B"}, attr));

        let updateOverlay = (emitter, {value})=>{
            value ??=1
            this.overlay?.css({
                width: this.getWidth(),
                height: this.getHeight(),
                top: this.getY() * 1/value,
                left: this.getX() * 1/value,
                transform: `scale(${1/value})`,
                "transform-origin": "top left"
            })
        }

        this
            .on("change:userData.text", (figure, event) => {
                let rendered = markdown.render(this.attr("userData.text"))
                if(this.overlay) {
                    this.overlay.html(rendered)
                }
            })
            .on("added", (emitter, event) => {
                let rendered = markdown.render(this.attr("userData.text"))
                this.overlay = $(
                       `<div id="${this.id}" style="padding:5px;font-size:80%;overflow:hidden;position:absolute; top:${this.getY()}px;left:${this.getY()}px">
                        ${rendered}
                        </div>`)
                event.canvas.html.append(this.overlay)
                this.overlay.css({
                    width: this.getWidth(),
                    height: this.getHeight(),
                    top: this.getY(),
                    left: this.getX()
                })
                event.canvas.on("zoom", updateOverlay)
            })
            .on("removed", (emitter, event) => {
                this.overlay.remove()
                event.canvas.off(zoomCallback)
            })
            .on("change:dimension", (emitter, event) => {
                updateOverlay( emitter, {value: this.canvas.getZoom()})
            })
            .on("move", (emitter, event) => {
                updateOverlay( emitter, {value: this.canvas?.getZoom()})
            })

        this.attr("userData.text", "The quick brown fox $ **jumps** over the *lazy* dog")
    },

    getParameterSettings: function () {
        return [
            {
                name: "text",
                label: "Markdown Text",
                property: {
                    type: "longtext"
                }

            }];
    }

});

