var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filename = ''
    if (pathname.substr(1) == "") {
        filename = "index.html"
    }else {
        var indexpos = pathname.indexOf(".")
        filename = pathname.slice(0, indexpos)
        filename += '/'
        filename += pathname.substr(1)
        filename = filename.slice(1)
        console.log(filename)
        
    }
    console.log("Request for " + pathname + " received.");
    fs.readFile(filename, function (err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data.toString());
        }
        response.end();
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');