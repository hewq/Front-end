// 引入fs模块
var fs = require('fs');

// 读取文件
fs.readFile('../../../../README.md', function(error, data){
	if( error ){
		console.log( '读取文件失败' )；
		return;
	}
	console.log(data.toString());
});
