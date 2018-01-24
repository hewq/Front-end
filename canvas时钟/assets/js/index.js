var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
// 中心点
var cx = canvas.width / 2;
var cy = canvas.height / 2;
//把画布原点移到中心点
ctx.translate(cx, cy);

function drawWatch() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.arc(0, 0, 200, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.restore();

    // 绘制刻度
    drawDial();

    // 绘制数字
    drawNumber();

    // 绘制指针
    drawNeedle();
}

function drawDial() {
    var angle = 0;
    for(var i = 0 ; i < 60; i++){
        ctx.save();
        // 画布旋转
        ctx.rotate(angle);
        // 开始绘制刻度
        ctx.beginPath();
        ctx.moveTo(199, 0);
        ctx.lineTo(189, 0);
        ctx.strokeStyle = 'silver';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
        // 角度转为弧度
        angle += Math.PI / 180 * 6;
    }
    angle = 0;
    for(var j = 0 ; j < 12; j++){
        ctx.save();
        // 画布旋转
        ctx.rotate(angle);
        // 开始绘制刻度
        ctx.beginPath();
        ctx.moveTo(199, 0);
        ctx.lineTo(179, 0);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.restore();
        // 角度转为弧度
        angle += Math.PI / 180 * 30;
    }
}

function drawNumber() {
    var angle = 0;
    for(var i = 12; i > 0; i--){
        ctx.save();
        ctx.rotate(-angle);
        ctx.translate(0, -160);  // 要先旋转再移动画布原点
        // 画布旋转
        ctx.rotate(angle);
        // 开始绘制数字
        ctx.beginPath();
        ctx.font = '20px 宋体';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeText(i, 0, 0);
        ctx.restore();

        angle += Math.PI / 180 * 30;
    }
}

function drawNeedle() {
    getCurrentTime();
    ctx.save();
    // 时针
    ctx.rotate(-Math.PI / 2);
    var hAngle = ctx.hour * Math.PI / 180 * 30,
        mAngle = ctx.minutes * Math.PI / 180 * 0.5,
        sAngle = ctx.seconds * Math.PI / 180 * 1 / 120;
    ctx.rotate( hAngle + mAngle + sAngle );
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineCap = 'round'; // 棱角处理
    ctx.lineWidth = 10;
    ctx.moveTo(0, 0);
    ctx.lineTo(100, 0);
    ctx.stroke();
    ctx.restore();

    // 分针
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    mAngle = ctx.minutes * Math.PI / 180 * 6;
    sAngle = ctx.seconds * Math.PI / 180 * 0.1;
    ctx.rotate( mAngle + sAngle );
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineCap = 'round';
    ctx.lineWidth = 7;
    ctx.moveTo(0, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
    ctx.restore();

    // 秒针
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    sAngle = ctx.seconds * Math.PI / 180 * 6;
    ctx.rotate(sAngle);
    ctx.beginPath();
    ctx.strokeStyle = 'yellow';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.moveTo(0, 0);
    ctx.lineTo(140, 0);
    ctx.stroke();
    ctx.restore();

    // 原点
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
}

function getCurrentTime() {
    var date = new Date();
    ctx.hour = date.getHours();
    ctx.minutes = date.getMinutes();
    ctx.seconds = date.getSeconds();
}

drawWatch();

// 定时器
setInterval(function () {
    ctx.clearRect(-cx, -cy, canvas.width, canvas.height);
    drawWatch();
}, 1000);