// just a simple mock object for the brainbox
// Hardware binding
//
export default {

  arduino: {
    set: function (pin, value) {
    },
    pwm: function (pin, value) {
    },
    get: function (pin) {
      return false
    },
    on: function(event, callback){
    },
    connected: false
  },

  camera: {
    start: function () {
    },
    stop: function () {
    },
    image: function(){
      return null
    }
  }
}
