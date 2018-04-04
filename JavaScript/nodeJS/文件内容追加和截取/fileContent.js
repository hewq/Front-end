var fs = require('fs');

// 文件不存在时生成新文件
fs.appendFile('./fileForAppend.txt', 'hello', 'utf8', function (err) {
    if(err) throw err;
    console.log('append成功');
});