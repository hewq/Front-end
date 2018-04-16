var fs = require('fs');

fs.writeFile('./fileForWriet', 'hello world', function( error ){
	if( error ){
		console.log( '写入失败' );
	}else {
		console.log( '写入成功' );
	}
})