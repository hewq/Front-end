// 加载http模块
var http = require( 'http' );

// 使用http.createServer()方法创建一个web服务器，返回一个Server实例
var server = http.createServer();

server.on('request', function( request, response ){
	console.log( '收到客户端请求' );
	console.log(request.url);
	response.write( 'hello' );
	response.write( ' node.js' );
	response.end();	
})

server.listen( 3000, function(){
	console.log('服务器启动成功，可以通过http://localhost:3000/ 进行访问');
} );