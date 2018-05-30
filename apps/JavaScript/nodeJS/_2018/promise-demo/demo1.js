var fs = require('fs');

// 创建 Promise 容器
// Promise 容器一旦创建，就开始这行里面的代码
var p1 = new Promise(function (resolve, reject) {
	fs.readFile('./data/a.txt', 'utf8', function (err, data) {
		if (err) {
			// 调用reject就相当于调用then方法中的第二个参数
			reject(err);
		} else {
			// 调用resolve就相当于调用then方法的第一个参数
			resolve(data);
		}
	})
});

var p2 = new Promise(function (resolve, reject) {
	fs.readFile('./data/b.txt', 'utf8', function (err, data) {
		if (err) {
			// 调用reject就相当于调用then方法中的第二个参数
			reject(err);
		} else {
			// 调用resolve就相当于调用then方法的第一个参数
			resolve(data);
		}
	})
});

var p3 = new Promise(function (resolve, reject) {
	fs.readFile('./data/c.txt', 'utf8', function (err, data) {
		if (err) {
			// 调用reject就相当于调用then方法中的第二个参数
			reject(err);
		} else {
			// 调用resolve就相当于调用then方法的第一个参数
			resolve(data);
		}
	})
});

// 当p1成功后， then做指定的操作
// then方法接收的function就是容器中的resolve函数
p1
  .then(function (data) {
  	console.log(data);
  	return p2;
  }, function (err) {
  	console.log('读取文件失败', err);
  })
  .then(function (data) {
  	console.log(data);
  	return p3;
  })
  .then(function (data) {
  	console.log(data);
  })
  