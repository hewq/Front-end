var http = require('http');

// http server
var server = http.createServer(function (serverReq, serverRes) {
    var url = serverReq.url;
    serverRes.end("访问地址是： " + url);
});

server.listen(3000);    // 端口

// http client
var client = http.get('http://127.0.0.1:3000', function (clientRes) {
    clientRes.pipe(process.stdout);
});