var dns = require('dns');

// 通过lookup解析域名的IP
dns.lookup('www.baidu.com', function (err, address, family) {
    if(err) throw err;
    console.log('例子A： ' + address);
});

// 获取一个域名的所有IP
var options = {all: true};
dns.lookup('www.qq.com', options, function (err, address, family) {
    if(err) throw err;
    console.log('www.qq.com的所有IP');
    console.log(address);
});

// 获取一个域名的所有IPv4
dns.resolve4('www.qq.com', function (err, address, family) {
    if(err) throw err;
    console.log( JSON.stringify(address));
});

/**
 * dns.lookup()和dns.resolve4()的区别
 * 最大差异在与当配置了本地host时是否会对查询结果产生影响
 * dns.lookup():有影响
 * dns.resolve4():没有影响
 * */