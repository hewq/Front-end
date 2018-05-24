import ImgStart from './page_start.png';
import $ from './jquery.min.js';
import './main.css';
require('./view.js');
if(process.env.NODE_ENV !== 'production'){
	console.log('Looks like we are in development mode!');
}
!function(b,a){var c=b.documentElement;a=function(){var a=c.clientWidth;a&&(c.style.fontSize=a/375*100+"px")};window.addEventListener("orientationchange"in window?"orientationchange":"resize",a,!1);a()}(document,window);

;(function(){
	var video;
    var ua = navigator.userAgent.toLowerCase();
    var device = {};
    device.isIOS = ua.match(/iphone os/i) == "iphone os";
    device.isAndroid = ua.match(/android/i) == "android";
    device.isWx = ua.match(/MicroMessenger/i) == "micromessenger";

    //整个应用的控制变量
    var app = {};
    var isPause = false;
    //视频元素的设置
    app.initVideo = function (){

        video = document.querySelector('#mainvideo');
        video.src = "http://img.bigbone.cn/a20180427fighters_3.mp4";
        video.addEventListener('timeupdate',function (){
            if ( !video.isPlayed && this.currentTime>0.1 ){
                video.isPlayed = !0;
                $("#page1").hide();
            }
        });
    }
	
    app.main = function (){
    	if(device.isWx){
    		$("#page1").hide();
    	}
		$('#page1').on( 'click', function(event){
			$(this).fadeOut(100);
			video.play();
	        event.preventDefault();
	    });
		$('#page1').on( 'touchstart', function(event){
			$(this).fadeOut(100);
			video.play();
	        event.preventDefault();
	    });
		$('#page1').on( 'touchmove', function(event){
			$(this).fadeOut(100);
			video.play();
	        event.preventDefault();
	    });	    
		$('.video-box').on( 'touchmove', function(event){
	        event.preventDefault();
	    });      	
		$('.video-box').on( 'touchmove', function(event){
	        event.preventDefault();
	    });	    
	    $(".pause").on('click', function(){
	    	video.play();
	    	$(this).hide();
	    });
		document.addEventListener("WeixinJSBridgeReady",function (){
			video.play();
		}, false);    
    	app.initVideo();    
    }
    app.main();
})();