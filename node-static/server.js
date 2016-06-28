const http = require('http');
const static = require('node-static');
const config = require('./config');


var fileServer = new static.Server('./public');
http.createServer(function (req, res) {
    req.addListener('end', function () {
        fileServer.serve(req, res, function (e, res) {
            if (e && (e.status === 404)) { 
                fileServer.serveFile('/404.html', 404, {}, req, res);
            }
        });
    }).resume();
}).listen(config.get('port'), function(){
    console.log('port ' + config.get('port'));
});
