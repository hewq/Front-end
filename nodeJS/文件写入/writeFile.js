// 如果文件不存在则创建文件，如果存在则替换文件
var fs = require('fs');
console.log('*异步写入*');
fs.writeFile('./fileForWrite.txt', 'hello world!', 'utf8', function (err) {
    if(err) throw err;
    console.log('文件写入成功');
});
console.log('****************');

console.log('*同步写入*');
try{
    fs.writeFileSync('./fileForWrite1.txt', 'hello world', 'utf8');
    console.log('文件写入成功');
}catch (err){
    throw err;
}
console.log('****************');

console.log('*通过文件流写入*');
var writeSteam = fs.createWriteStream('./fileForWrite1.txt','utf8');

writeSteam.on('close',function () {     // 已经关闭，不会再有事件抛出
    console.log('已经关闭');
});
writeSteam.write('hello');
writeSteam.write('world');
writeSteam.end('');