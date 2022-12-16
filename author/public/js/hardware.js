/**
 * Registry of all available devices (connected via RF24 adapter) and of the hub GPIO pins.
 * The hub could be an RaspberryPi or and Arduino.
 *
 * The "hub" is the receiver for the connected devices and expose its own
 * GPIO pins as well.
 */

export default {

  init: function (s) {

  },

  arduino: new class{
    set(pin, value) {
    }

    on(){}
    off(){}

    get(pin) {
      return false
    }

    disconnect(){
    }

    connect() {
    }

    connectPort(port) {
    }

    get connected(){
      return false
    }
  },


  raspi:  new class{
    on(){}
    off(){}

    set(pin, value) {
    }

    get (pin) {
      return false
    }

    get connected(){
      return false
    }
  }

}
