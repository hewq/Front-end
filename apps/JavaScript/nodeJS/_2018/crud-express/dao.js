/**
 * dao.js
 * 数据库操作文件模块
 */

var fs = require('fs');

var dbPath = './db.json';

// 查询所有
exports.retrieve = function (callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		callback(null, JSON.parse(data).students);
	});
};

// 查询单个
exports.retrieveById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students;
		var ret = students.find(function (item) {
			return item.id === parseInt(id);
		})
		callback(null, ret);
	});
};

// 添加
exports.create = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}

		var students = JSON.parse(data).students;
		student.id = students[students.length - 1].id + 1;
		students.push(student);

		var fileData = JSON.stringify({
			students: students
		});

		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err);
			}
			callback(null);
		})
	});
};

// 修改
exports.update = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}

		var students = JSON.parse(data).students;
		student.id = parseInt(student.id);

		// Ecamscript6中的一个数组方法：find,需要接受一个函数作为参数
		var stu = students.find(function (item) {
			return item.id === student.id;
		});

		for(var key in student) {
			stu[key] = student[key];
		}

		var fileData = JSON.stringify({
			students: students
		});

		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err);
			}
			callback(null);
		})
	});
};

// 删除
exports.delete = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}

		var students = JSON.parse(data).students;

		// Ecamscript6中的一个数组方法：findIndex,根据条件获取元素下标
		var index = students.findIndex(function (item) {
			return item.id === id;
		});

		students.splice(index, 1);

		var fileData = JSON.stringify({
			students: students
		});

		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err);
			}
			callback(null);
		})
	});
};
