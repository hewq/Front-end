// fs.watchFile
// 实现原理： 轮询。 每隔一段时间检查文件是否发生改变。所以在不同平台上基本表现一致的。
var fs = require('fs');

var options = {
    persistent: true,   // 默认true
    interval: 2000  // 多久检查一次
};

// curr prev都是被监听文件的状态， fs.stat实例
// 可以通过fs.unwatch()移除监听
fs.watchFile('./fileForWatch.txt', options, function (curr, prev) {
    console.log('修改时间为： ' + curr.mtime);
});