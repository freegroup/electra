import colors from "./Colors"

export default draw2d.shape.layout.HorizontalLayout.extend({

    NAME : "MarkerStateBFigure",

    /**
     * @param attr
     */
    init : function(attr, setter, getter)
    {
        this.tintColor = colors.low;
        this.solid = false;

        this._super({
            bgColor:"#FFFFFF",
            stroke:1,
            color:colors.low,
            radius:2,
            padding:{left:3, top:2, bottom:0, right:12},
            gap:5,
            ...attr
        },
        setter,
        getter);

        
        this.label = new draw2d.shape.basic.Label({
            text: attr.text ?? "X",
            resizeable:false,
            stroke:0,
            padding:0,
            fontSize:8,
            fontColor:"#303030"
        })
        this.add(this.label)
        this.label.hitTest = () => false
        this.label.addCssClass("highlightOnHover");

        // we must override the hitTest method to ensure that the parent can receive the mouseenter/mouseleave events.
        // Unfortunately draw2D didn't provide event bubbling like HTML. The first shape in queue consumes the event.
        //
        // now this shape is "dead" for any mouse events and the parent must/can handle this.
        this.hitTest = () => false
    },

    setText: function(text)
    {
        this.label.setText(text);
    },

    setSolid: function(solid)
    {
        this.solid = solid
        // update the visual
        this.setTintColor(this.tintColor)
    },

    setTintColor: function(color)
    {
        this.tintColor = color;
        if(this.solid){
            this.attr({color: color, bgColor:color});
            this.label.attr({fontColor:"#ffffff"});
        }
        else{
            this.attr({color:color, bgColor: null});
            this.label.attr({fontColor:color});
        }
    },

    /**
     * @method
     *
     *
     * @template
     **/
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }

        this._super({ ...attributes, path: this.calculatePath()});
    },


    /**
     * @method
     *
     * Override the default rendering of the HorizontalLayout, which is a simple
     * rectangle. We want an arrow.
     */
    createShapeElement : function()
    {
        return this.canvas.paper.path(this.calculatePath());
    },

    /**
     * stupid copy&paste the code from the Polygon shape...unfortunately the LayoutFigure isn't a polygon.
     *
     * @returns {string}
     */
    calculatePath: function()
    {
        let arrowLength=8;

        this.vertices   = new draw2d.util.ArrayList();

        let w  = this.width;
        let h  = this.height;
        let pos= this.getAbsolutePosition();
        let i  = 0;
        let length=0;
        this.vertices.add(new draw2d.geo.Point(pos.x,  pos.y)  );
        this.vertices.add(new draw2d.geo.Point(pos.x+w-arrowLength,pos.y)  );

        this.vertices.add(new draw2d.geo.Point(pos.x+w,pos.y+h/2));

        this.vertices.add(new draw2d.geo.Point(pos.x+w-arrowLength,pos.y+h));
        this.vertices.add(new draw2d.geo.Point(pos.x  ,pos.y+h));

        let radius = this.getRadius();
        let path = [];
        // hard corners
        //
        if(radius === 0){
            length = this.vertices.getSize();
            let p = this.vertices.get(0);
            path.push("M",p.x," ",p.y);
            for(i=1;i<length;i++){
                p = this.vertices.get(i);
                path.push("L", p.x, " ", p.y);
            }
            path.push("Z");
        }
        // soften/round corners
        //
        else{
            length = this.vertices.getSize();
            let start = this.vertices.first();
            let end   = this.vertices.last();
            if(start.equals(end)){
                length = length-1;
                end = this.vertices.get(length-1);
            }
            let begin   = draw2d.geo.Util.insetPoint(start,end, radius);
            path.push("M", begin.x, ",", begin.y);
            for( i=0 ;i<length;i++){
                start = this.vertices.get(i);
                end   = this.vertices.get((i+1)%length);
                let modStart = draw2d.geo.Util.insetPoint(start,end, radius);
                let modEnd   = draw2d.geo.Util.insetPoint(end,start,radius);
                path.push("Q",start.x,",",start.y," ", modStart.x, ", ", modStart.y);
                path.push("L", modEnd.x, ",", modEnd.y);
            }
        }
        return path.join("");
    }
});
