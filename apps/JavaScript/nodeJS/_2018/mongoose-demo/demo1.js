const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/test');

// 创建一个模型，就是在设计数据库
// MongoDB是动态的， 非常灵活
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个Cat
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));