
import $ from './jquery.min.js';
$('body').append('<div class="container">' + 
	'<div class="page video-box">' + 
	'<video id="mainvideo" autoplay="autoplay" playsinline webkit-playsinline ></video>' + 
	'</div>' + 
	'<div id="page1" class="page page-start"></div>' + 
	'</div>');
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">');