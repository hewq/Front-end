var http = require('http');

// 设置状态码，状态描述信息，响应主体
var server = http.createServer(function (req, res) {
    res.writeHead(200, 'ok', {
        'Content-type': 'text/plain'
    });
    // 增 删 改 查
    res.setHeader('Content-Type','text/plain');

    res.removeHeader('Content-Type');

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');     // 覆盖

    res.getHeader('content-type');

    // 设置响应主体
    //res.write(data, encoding);
    res.end('hello');
});

server.listen(3000);

