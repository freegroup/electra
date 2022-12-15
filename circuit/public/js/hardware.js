/**
 * Registry of all available devices (connected via RF24 adapter) and of the hub GPIO pins.
 * The hub could be an RaspberryPi or and Arduino.
 *
 * The "hub" is the receiver for the connected devices and expose its own
 * GPIO pins as well.
 */
import serial from "./serial"
import EventEmitter from "./util/EventEmitter"

const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

let values = {}
let socket = null
let usbPort = null
let currentImage = {
  "webcam": TRANSPARENT_PIXEL
}

export default {
  /**
   * Init the listener for the socket.io events
   * Events could be
   *  - changes on the GPIO pins
   *
   * @param s
   */
  init: function (s) {
    socket = s

    // Init the WEBUSB stuff
    //
    serial.getPorts().then(ports => {
      if (ports.length !== 0) {
        this.arduino.connectPort(ports[0])
      }
    })
  },

  arduino: new class extends EventEmitter {
    set(pin, value) {
      /*
       * 1 = Wright:
       *     1 = analog:
       *         "pin number"
       *         "frequency (0-255)"
       *     2 = digital:
       *         "pin number"
       *         "1 for LOW"
       *         "2 for HIGH"
       *  2 = Read:
       *     1 = analog:
       *         "pin number"
       *     2 = digital:
       *         "pin number"
       *
       *  '1/2/7/1/' will turn pin 7 on HIGH
       *  '1/2/7/0/' would turn pin 7 off
       *  '1/1/7/255/' would turn pin 7 on at a analog rate of 255 or full power
       *
       */
      let cmd = [
        "1/",           // write
        "2/",           // digital
        pin, "/",        // pin number
        value ? "2/" : "1/" // on/off
      ].join("")

      // Either send the command via WebUSB to the connected Arduino
      //
      if (usbPort) {
        usbPort.send(new TextEncoder().encode(cmd)).catch(function (e) {
          console.log(e)
        })
      }
      // or post it to the server. Maybe the server itself (local pc) has an connected Arduino via serial port
      //
      else {
        socket.emit('arduino:set', {cmd})
      }
    }

    get(pin) {
      let cmd = [
        "2/",             // read
        pin > 13 ? "1/" : "2/", // analog / digital
        pin,              // pin number
        "/"
      ].join("")

      // https://github.com/arduino/ArduinoCore-avr/blob/master/variants/standard/pins_arduino.h#L56-L72
      if (usbPort) {
        usbPort.send(new TextEncoder().encode(cmd))
          .catch((e) => {
            console.log(e)
          })
      }
      return values[pin]
    }

    disconnect() {
      if (usbPort) {
        usbPort.disconnect()
        usbPort = null
        this.emit("disconnect")
      }
    }

    connect() {
      serial.requestPort()
        .then(selectedPort => {
          this.connectPort(selectedPort)
        })
        .catch(error => {
          this.emit("disconnect")
        })
    }

    connectPort(port) {
      const regex = /\d+\/\d+\//
      port.connect().then(() => {
        usbPort = port
        this.emit("connect")
        usbPort.onReceive = data => {
          let textDecoder = new TextDecoder()
          let txt = textDecoder.decode(data)
          txt = txt.split("\n").filter( e => e.match(regex))
          txt.forEach( e => {
            e = e.split("/")
            let pin = parseInt(e[0])
            let value = parseInt(e[1])
            values[pin] = (5/1024)*parseInt(value)
          })
        }
        usbPort.onReceiveError = error => {
          usbPort = null;
          this.emit("disconnect")
        }
      }, error => {
        let msg = error.message
        switch (error.message) {
          case "Unable to claim interface.":
            msg = "Unable to claim USB interface." +
              "<br>Maybe it is already paired by another browser window"
            break;
          default:
            break;
        }
        $.notify({message: msg}, {type: 'danger'});
        this.emit("disconnect")
      })
    }

    get connected() {
      return usbPort !== null
    }
  },


  camera: {
    start: function (ipAddress) {
      socket.emit('camera:start', {ipAddress})
      socket.on("camera:capture", msg => {
        if(msg.ipAddress) {
          currentImage[msg.ipAddress] = msg.data
        }
        else{
          currentImage["webcam"] = msg.data
        }
      })
    },
    stop: function (ipAddress) {
      socket.emit('camera:stop', {ipAddress})
      socket.off("camera:capture")
    },
    image: function(ipAddress){
      if(ipAddress){
        return currentImage[ipAddress] || TRANSPARENT_PIXEL
      }
      return currentImage["webcam"]
    }
  },

  pca9685:{
    set(channel, value) {
      socket.emit('pca9685:set', {
        channel: channel,
        value: value
      })
    },

    pwm(channel, value) {
      socket.emit('pca9685:pwm', {
        channel: channel,
        value: value
      })
    }
  }
}
