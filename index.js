var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var MIMEType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg':'image/jpeg',
    '.js': 'application/x-javascript'
}

var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname === '/') pathname = '/index.html';
    if (pathname.indexOf('.') === -1) pathname += '/index.html';

    fs.readFile('./src' + pathname, function (err, data) {
        if (err) {
            //res.end('404');
            fs.readFile('./src/404.html', function (err, data) {
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.end(data);
            });
            return;
        }
        res.writeHead(200, {
            'content-type': MIMEType[path.extname(pathname)]
        });
        res.end(data);
    });
});

server.listen(8081, '127.0.0.1');