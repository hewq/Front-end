import _ from 'lodash';
import './style.css';
import Icon from './share-icon.png';
import Data from './data.xml';
import printMe from './print.js';

function component() {
	var element = document.createElement('div');
	var btn = document.createElement('button');

	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.classList.add('hello');

	// 将图像添加到现有的div
	var myIcon = new Image();
	myIcon.src = Icon;

	element.appendChild(myIcon);

	console.log(Data);

	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe;

	element.appendChild(btn);
	
	return element;
}
// document.body.appendChild(component());
let element = component(); // 当print.js改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if(module.hot){
	module.hot.accept('./print.js', function(){
		console.log('Accepting the updated printMe module!');
		// printMe();
		document.body.removeChild(element);
		element = component();	// 重新渲染页面后，component更新click事件处理
		document.body.appendChild(element);
	})
}