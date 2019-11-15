let anim = bodymovin.loadAnimation({
	container: document.getElementById('anim1'),
	renderer: 'svg',
	loop: true,
	autoplay: false,
	path: 'data.json',
	name: 'anim_bodymovin'
});

let anim2 = lottie.loadAnimation({
	container: document.getElementById('anim2'),
	renderer: 'canvas',
	loop: false,
	autoplay: false,
	path: 'data.json',
	name: 'lottie_bodymovin'
});

// 实例方法
$('.play').click(function () {
	anim.play();
});

$('.pause').click(function () {
	anim.pause();
});

$('.stop').click(function () {
	anim.stop();
});

$('.speed-slow').click(function () {
	anim.setSpeed(0.5);
});

$('.speed-normal').click(function () {
	anim.setSpeed(1);
});

$('.speed-fast').click(function () {
	anim.setSpeed(2);
});

$('.gostop').click(function () {
	anim.goToAndStop(3000, false);
});

$('.goplay').click(function () {
	anim.goToAndPlay(1000, true);
});

$('.dirc').click(function () {
	anim.setDirection(-1);
});

$('.seg1').click(function () {
	anim.playSegments([10, 20], false);
});

$('.seg2').click(function () {
	anim.playSegments([[0, 10], [70, 80]], true);
});

$('.subframe').click(function () {
	anim.playSegments(false);
});

$('.destroy').click(function () {
	anim.destroy();
});

// lottie 的主要方法
$('.lottie-play').click(function () {
	lottie.play();
	// lottie.play('anim_bodymovin');
});

$('.lottie-stop').click(function () {
	lottie.stop();
});

$('.lottie-slow').click(function () {
	lottie.setSpeed(0.5);
});

$('.lottie-normal').click(function () {
	lottie.setSpeed(1);
});

$('.lottie-fast').click(function () {
	lottie.setSpeed(2);
});

$('.lottie-search').click(function () {
	lottie.searchAnimations(); // TODO
});

$('.lottie-register').click(function () {
	lottie.registerAnimation(); // TODO
});

$('.lottie-quality').click(function () {
	lottie.setQuality(); // TODO 
});

$('.lottie-destroy').click(function () {
	lottie.destroy(); 
});

// 监听事件
anim.addEventListener('complete', function () {
	console.log('complete');
});

anim.addEventListener('loopComplete', function () {
	console.log('loop complete');
});

anim.addEventListener('enterFrame', function () {
	console.log('enter frame');
});

anim.addEventListener('segmentStart', function () {
	console.log('segment start');
});

anim.addEventListener('config_ready', function () {
	console.log('config ready');
});

anim.addEventListener('data_ready', function () {
	console.log('data ready');
});

anim.addEventListener('DOMLoaded', function () {
	console.log('dom loaded');
});

anim.addEventListener('destroy', function () {
	console.log('destroy');
});
