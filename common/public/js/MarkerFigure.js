/**
 * The markerFigure is the left hand side annotation for a DecoratedPort.
 *
 * It contains two children
 *
 * StateAFigure: if the mouse hover and the figure isn't permanent visible
 * StateBFigure: either the mouse is over or the user pressed the checkbox to stick the figure on the port
 *
 * This kind of decoration is usefull for defualt values on workflwos enginges or circuit diagrams
 *
 */
import MarkerStateAFigure from "./MarkerStateAFigure"
import MarkerStateBFigure from "./MarkerStateBFigure"
import colors from "./Colors"
import Values from "./Values"

export default draw2d.shape.layout.StackLayout.extend({

    NAME : "MarkerFigure",

    init : function(attr, setter, getter)
    {
        this.isMouseOver = false;        // indicator if the mouse is over the element
        this.stick       = false;        // indicator if the stateBFigure should always be visible
        this.defaultValue= true;         // current selected default value for the decoration

        this._super({stroke:0, ...attr}, {...setter}, {...getter});

        // the figure to show, if the decoration is not permanent visible
        this.add(this.stateA = new MarkerStateAFigure({text:"High"}));
        // the figure to show, if the decoration permanent visible - sticky
        this.add(this.stateB = new MarkerStateBFigure({text:"High"}));

        this.on("mouseenter",() => this.onMouseOver(true));
        this.on("mouseleave",() => this.onMouseOver(false));
        this.on("click",(emitter, event) => {
            if (this.isVisible() === false) {
                return;//silently
            }
            else if(this.stateB.getBoundingBox().hitTest(event.x, event.y) === true){
                $.contextMenu({
                    selector: 'body',
                    trigger:"left",
                    events:
                    {
                        hide:() => { $.contextMenu( 'destroy' ); }
                    },
                    callback: (key, options) => 
                    {
                        // propagate the default value to the port
                        //
                        switch(key){
                            case "high":
                                this.setDefaultValue(Values.DIGITAL_HIGH);
                                this.setStick(true);
                                break;
                            case "low":
                                this.setDefaultValue(Values.DIGITAL_LOW);
                                this.setStick(true);
                                break;
                            case "clear":
                                // default values for unconnected ports are always HIGH
                                this.setDefaultValue(Values.DIGITAL_HIGH);
                                this.setStick(false);
                                break;
                            default:
                                break;
                        }

                    },
                    x:event.x,
                    y:event.y,
                    items:{
                        "high":  { name: "High"},
                        "low":   { name: "Low" },
                        "clear": { name: "Reset" }
                    }
                });
            }
        });

        this.setDefaultValue(Values.DIGITAL_HIGH);
        this.onMouseOver(false);
    },

    onMouseOver: function(flag)
    {
        this.isMouseOver = flag;

        if(this.visible===false){
            return this; // silently
        }

        if(this.stick===true) {
            this.setVisibleLayer(1)
        }
        else{
            this.setVisibleLayer(this.isMouseOver?1:0)
        }

        return this;
    },


    setVisible: function(flag)
    {
        this._super(flag);

        // update the hover/stick state of the figure
        this.onMouseOver(this.isMouseOver);

        return this;
    },


    setStick:function(flag)
    {
        this.stick = flag;
        this.onMouseOver(this.isMouseOver);


        // the port has only a default value if the decoration is visible
        this.parent.setValue(flag?this.defaultValue:null)
        this.stateB.setSolid(this.stick)

        return this;
    },


    getStick:function()
    {
        return this.stick;
    },


    setText: function(text)
    {
        this.stateB.setText(text);

        return this;
    },

    setDefaultValue: function(value)
    {
        this.defaultValue = value;

        this.setText((this.defaultValue===Values.DIGITAL_HIGH)?"High":"Low ");
        this.stateB.setTintColor((this.defaultValue===Values.DIGITAL_HIGH)?colors.high:colors.low);

        // only propagate the value to the parent if the decoration permanent visible
        //
        if(this.stick===true){
            this.parent.setValue(this.defaultValue);
        }

        return this
    }
});
