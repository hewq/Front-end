/**
 * Created by hewq on 2016/11/6.
 */
//绘制矩形
function draw21(id) {
    //获取画布
    var canvas = document.getElementById(id);
    if (canvas == null) {
        return false;
    }
    //获取上下文
    var context = canvas.getContext("2d");
    //没有设置style，默认为黑色
    context.fillRect(0, 0, 100, 100);
    context.strokeRect(120, 0, 100, 100);

    //设置纯色
    context.fillStyle = "red";
    context.strokeStyle = "blue";
    context.fillRect(0, 120, 100, 100);
    context.strokeRect(120, 120, 100, 100);

    //设置透明度
    context.fillStyle = "rgba(255,0,0,0.2)";
    context.strokeStyle = "rgba(0,255,0,0.4)";
    context.fillRect(240, 0, 100, 100);
    context.strokeRect(240, 120, 100, 100);
}

//draw21("canvas");

//清除矩形区域
function draw22(id) {
    //获取画布
    var canvas = document.getElementById(id);
    if (canvas == null) {
        return false;
    }
    //获取上下文
    var context = canvas.getContext("2d");
    //没有设置style，默认为黑色
    context.fillRect(0, 0, 100, 100);
    context.strokeRect(120, 0, 100, 100);

    //设置纯色
    context.fillStyle = "red";
    context.strokeStyle = "blue";
    context.fillRect(0, 120, 100, 100);
    context.strokeRect(120, 120, 100, 100);

    //设置透明度
    context.fillStyle = "rgba(255,0,0,0.2)";
    context.strokeStyle = "rgba(0,255,0,0.4)";
    context.fillRect(240, 0, 100, 100);
    context.strokeRect(240, 120, 100, 100);
    context.clearRect(50,50,240,120);
}

//draw22("canvas");

//绘制八卦图
function drawArc(id){
    var canvas = document.getElementById(id);
    if( canvas == null )
        return false;
    var context = canvas.getContext("2d");

    //圆
    context.beginPath();
    context.arc(250,250,240,0,Math.PI * 2,true);
    context.closePath();
    context.strokeStyle = "rgb(0,0,0)";
    context.stroke();

    //左半圆
    context.beginPath();
    context.arc(250,250,240,270 * Math.PI / 180,90 * Math.PI / 180,true);
    context.closePath();
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();

    //右半圆
    context.beginPath();
    context.arc(250,250,240,270 * Math.PI / 180,90 * Math.PI / 180,false);
    context.closePath();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();

    //大黑圆
    context.beginPath();
    context.arc(250,130,120,0,Math.PI * 2,true);
    context.closePath();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();

    //大白圆
    context.beginPath();
    context.arc(250,370,120,0,Math.PI * 2,false);
    context.closePath();
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();

    //小黑圆
    context.beginPath();
    context.arc(250,370,30,0,Math.PI * 2,true);
    context.closePath();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();

    //小白圆
    context.beginPath();
    context.arc(250,130,30,0,Math.PI * 2,false);
    context.closePath();
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();
}

//drawArc("canvas");

//动态八卦图
function drawLeftArc(id){
    var canvas = document.getElementById(id);
    if( canvas == null )
        return false;
    var context = canvas.getContext("2d");

    //半圆
    context.beginPath();
    context.arc(250,250,240,270 * Math.PI / 180,90 * Math.PI / 180,true);
    context.strokeStyle = "rgb(0,0,0)";
    context.stroke();
    context.closePath();


    //大黑圆
    context.beginPath();
    context.arc(250,130,120,270 * Math.PI / 180,90 * Math.PI / 180,true);
    context.strokeStyle = "rgba(0,0,0,1)";
    context.stroke();
    context.closePath();


    //大白圆
    context.beginPath();
    context.arc(250,370,120,270 * Math.PI / 180,90 * Math.PI / 180,false);
    context.strokeStyle = "rgba(0,0,0,1)";
    context.stroke();
    context.closePath();

    //小黑圆
    context.beginPath();
    context.arc(250,370,30,0,Math.PI * 2,true);
    context.closePath();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();

}
function drawRightArc(id){
    var canvas = document.getElementById(id);
    if( canvas == null )
        return false;
    var context = canvas.getContext("2d");

    //半圆
    context.beginPath();
    context.arc(250,250,240,270 * Math.PI / 180,90 * Math.PI / 180,false);
    context.strokeStyle = "rgb(0,0,0)";
    context.stroke();
    context.closePath();

    //右半圆
    context.beginPath();
    context.arc(250,250,240,270 * Math.PI / 180,90 * Math.PI / 180,false);
    context.closePath();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();

    //大黑圆
    context.beginPath();
    context.arc(250,130,120,270 * Math.PI / 180,90 * Math.PI / 180,true);
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();
    context.closePath();


    //大白圆
    context.beginPath();
    context.arc(250,370,120,270 * Math.PI / 180,90 * Math.PI / 180,false);
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();
    context.closePath();

    //小白圆
    context.beginPath();
    context.arc(250,130,30,0,Math.PI * 2,false);
    context.closePath();
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();

}
drawLeftArc("canvasLeft");
drawRightArc("canvasRight");

var right = document.getElementById("canvasRight");
var left = document.getElementById("canvasLeft");
left.addEventListener("click",function(){
    right.style = "-webkit-animation : toRotateToRight 4s ease";
    left.style= "-webkit-animation : toRotateToLeft 4s ease";
});

//花朵
function drawFlower(id){
    var canvas = document.getElementById(id);
    if( canvas == null )
        return false;
    var context = canvas.getContext("2d");
    context.fillStyle = "#EEEEFF";
    context.fillRect(0,0,400,300);
    var dx = 150;
    var dy = 150;
    var s = 100;
    context.beginPath();
    context.fillStyle = "rgb(100,255,100)";
    context.strokeStyle = "rgb(0,0,100)";
    var dig = Math.PI / 15 * 11;
    for(var i = 0; i < 30; i++){
        var x = Math.sin( i * dig );
        var y = Math.cos( i * dig );
        context.lineTo( dx + x * s, dy + y * s);
    }
    context.closePath();
    context.fill();
    context.stroke();
}
//drawFlower("canvas");