var http = require('http');
http.get('http://127.0.0.1:3000', function (res) {
    console.log(res.statusCode);
});