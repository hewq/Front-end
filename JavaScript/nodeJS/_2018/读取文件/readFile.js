// 引入fs模块
var fs = require('fs');

// 读取文件
fs.readFile('../../../../README.md', function(error, data){
	console.log(data.toString());
});
