var fs = require('fs');
console.log('*文件是否存在*');
fs.access('fileOperate.js', function (err) {
    if(err) throw err;
    console.log('文件存在');
});
console.log('**************');

console.log('*创建目录*');
console.log('如果目录存在，会报错');
/*console.log('异步');
fs.mkdir('./hello', function (err) {
    if(err) throw err;
    console.log('目录创建成功');
});
console.log('***************');

console.log('同步');
fs.mkdirSync('./hello');
console.log('***************');*/

/*console.log('*删除文件*');
fs.unlink('./fileForUnlink.txt', function (err) {
    if(err) throw err;
    console.log('文件删除成功');
});
console.log('***************');*/

console.log('*同步遍历目录*');
var path = require('path');

var getFilesInDir = function (dir) {
  var results = [ path.resolve(dir) ];
  var files = fs.readdirSync(dir, 'utf8');

  files.forEach(function (file) {
      file = path.resolve(dir, file);
      var stats = fs.statSync(file);

      if(stats.isFile()){
          results.push(file);
      }else if(stats.isDirectory()){
          results = results.concat( getFilesInDir(file) );
      }
  });

  return results;
};

var files = getFilesInDir('../');
console.log(files);
console.log('**************');

/*console.log('*文件/目录重命名*');
// fs.rename(oldPath, newPath, callback)
fs.rename('./hello', './world',function (err) {
    if(err) throw err;
    console.log('重命名成功');
});
console.log('************');*/
console.log('同步');
// fs.renameSync(oldPath, newPath);
fs.renameSync('./world', './hello');
console.log('************');


