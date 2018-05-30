/**
 * student.js
 * 数据库操作文件模块
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// 连接数据库
mongoose.connect('mongodb://localhost/students', { userMongoClient: true});

// 设计集合结构（表结构）
var studentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: ['0', '1'],
		default: '0'
	},
	age: {
		type: Number
	},
	hobbies: {
		type: String
	}

});

module.exports = mongoose.model('Student', studentSchema);
