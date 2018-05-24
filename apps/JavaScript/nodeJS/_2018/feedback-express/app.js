var express = require('express');
var bodyParser = require('body-parser');


var app = express();

var comments = [
	{
		name: 'Mr.X',
		message: 'I am fine',
		dateTime: '2018-05-12'
	}
];

app.use('/public/', express.static('./public/'));

// 配置使用art-template模板引擎
// 第一个参数表示，当渲染以.art结尾的文件的时候， 使用 art-template模板引擎
// express-art-template是专门用来在express中把art-template整合到express中
// 虽然外面这里不需要加载art-template, 但是也必须安装
// 原因就在于express-art-template依赖了art-template
// app.engine('art', require('express-art-template'));
app.engine('html', require('express-art-template'));

// 配置body-parser中间件
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

// express为Response相应对象提供了一个方法： render
// render方法默认是不可以使用，但是如果配置了模板引擎就可以使用
// res.render('html模版名'， {模板数据})
// 第一个参数不能写路径，默认会去项目中的views目录查找该模板文件

// 如果想要修改默认的views目录，则可以
// app.set('views', render函数的默认路径)

app.get('/', function (req, res) {
	res.render('index.html', {
		comments: comments
	});
});

app.get('/post', function (req, res) {
	res.render('post.html');
});

app.post('/post', function (req, res) {
	var comment = req.body;
	comment.dataTime = '2018-05-12 10:58:32';
	comments.unshift(comment);
	res.redirect('/');
});

app.listen(3000, function () {
	console.log('feedback-express is running at port 3000...');
});