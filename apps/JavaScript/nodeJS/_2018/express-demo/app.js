var express = require('express');

// 创建服务器应用程序
var app = express();

// 公开指定目录
app.use('/public', express.static('./public'));

app.get('/', function (req, res) {
	res.send('hello world!');
});

app.listen(3000, function () {
	console.log('app is running at port 3000');
}); 