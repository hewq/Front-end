var fs = require('fs');
var data;

console.log('*普通读取*');
try{
    data = fs.readFileSync('./fileForRead.txt', 'utf8');
    console.log('文件内容： ' + data);
}catch(err) {
    console.log('读取文件出错： ', err.message);
}
console.log('****************');

console.log('*异步读取*');
fs.readFile('./fileForRead.txt', 'utf8', function(err, data){
    if(err){
        return console.error('读取文件出错： ' + err.message);
    }
    console.log('文件内容： ' + data);
});
console.log('****************');

console.log('*通过文件流读取，适合读取大文件*');
var readStream = fs.createReadStream('./fileForRead.txt','utf8');
readStream.on('data',function(chunk){
    console.log('读取数据： ' + chunk);
}).on('error', function (err) {
    console.log('出错： ' + err.message);
}).on('end', function () {
    console.log('没有数据了');
}).on('close', function () {
    console.log('已经关闭')
});