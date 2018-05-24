/**
 * Created by hewq on 2016/9/8.
 */
/*
*
* todo 创建nodeJS服务器
* */

var server = require("http");
server.createServer(function(request,response){
    response.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
    response.end("响应内容");
}).listen(8888);
console.log("服务器已经在http://127.0.0.1:8888启动");