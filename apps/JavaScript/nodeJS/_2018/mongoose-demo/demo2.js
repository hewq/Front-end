var mongoose = require('mongoose');

var schema = mongoose.Schema;

// 连接数据库
mongoose.connect('mongodb://localhost/itcast');

// 设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的就是为了保证数据的完整性，不要有脏数据
var userSchema = new schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String
	}
});

// 将文档结构发布为模型
// mongoose.model方法就是用来将一个架构发布为 model
// 第一个参数： 传入一个首字母大写的名词单数字符串用来表示数据库的名称
// 			  mongoose会自动将大写名词的字符串生成小写复数的集合名称
// 			  例如这里的 User 最终会变为 users 集合名称
// 第二个参数： 架构 Schema
// 
// 返回值： 模型构造函数
var User = mongoose.model('User', userSchema);

// 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据进行操作
// 增加数据
// var admin = new User({
// 	username: 'admin',
// 	password: '123456',
// 	email: 'admin@admin.com'
// });

// admin.save().then((data) => {
// 	console.log(data);
// });

// 查询所有数据
// User.find().then((data) => {
// 	console.log(data)
// });

// // 按条件查询
// User.find({
// 	username: 'zs',
// 	password: '123456'
// }).then((data) => {
// 	console.log(data);
// });

// User.findOne({
// 	username: 'zs'
// }).then((data) => {
// 	console.log(data);
// });

// User.findOne().then((data) => {
// 	console.log(data);
// });	// 返回第一条数据

// // 删除数据
// User.remove({
// 	username: 'zs'
// }).then((data) => {
// 	console.log(data);
// });

// 更新数据
User.findByIdAndUpdate('5b0d2464870bdaac198f26f0', {
	password: '123'
}).then((data) => {
	console.log(data);
});


