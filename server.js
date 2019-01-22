var express = require('express');

var app = express();

app.use('/', express.static('./apps/'));

app.listen(3000, function () {
	console.log('Front-end is running at port 3000...');
});