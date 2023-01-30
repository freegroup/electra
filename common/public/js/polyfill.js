// We need a function to return a "float" instead of an "string" to cut off traling numbers 
// after deicmal dot.
Number.prototype.toFixedNumber = function(digits){
    // "+" to convert back to number
    return +(this.toFixed(digits))
}