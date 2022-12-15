
module.exports = {
  connect: function( http, params){
    return this.io = require('socket.io')(http, params);
  },

  io: null
}
