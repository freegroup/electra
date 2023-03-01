// We need a function to return a "float" instead of an "string" to cut off traling numbers 
// after deicmal dot.
Number.prototype.toFixedNumber = function(digits){
    // "+" to convert back to number
    return +(this.toFixed(digits))
}

let tokenMap = {
    "<strong>": "**",
    "</strong>": "**",
    "<em>": "*",
    "</em>": "*"
}
String.prototype.tuiMarkdownFix = function(){
    var re = new RegExp(Object.keys(tokenMap).join("|"),"g");

    return this.replace(re, function(matched){
        return tokenMap[matched];
    });
}
