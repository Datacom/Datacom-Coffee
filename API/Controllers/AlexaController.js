'use strict';


var io = require('socket.io');
exports.SetIO = function(IO){
    io = IO;
}

exports.processRequest = function(req, res) {
io.emit('full_response', {
    status: true,
    message: req
});

return res.json({
    speech: res,
    displayText: req,
    source: req
});
};