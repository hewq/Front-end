/**
 * Created by hewq on 2016/12/7.
 */
//绘制八卦图
function drawArc(id){
    var canvas = document.getElementById(id);
    if( canvas == null )
        return false;
    var context = canvas.getContext("2d");

    //圆
    context.beginPath();
    context.arc(250/2,250/2,120,0,Math.PI * 2,true);
    context.closePath();
    context.strokeStyle = "rgb(0,0,0)";
    context.stroke();

    //左半圆
    context.beginPath();
    context.arc(250/2,250/2,120,270 * Math.PI / 180,90 * Math.PI / 180,true);
    context.closePath();
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();

    //右半圆
    context.beginPath();
    context.arc(250/2,250/2,120,270 * Math.PI / 180,90 * Math.PI / 180,false);
    context.closePath();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();

    //大黑圆
    context.beginPath();
    context.arc(250/2,130/2,60,0,Math.PI * 2,true);
    context.closePath();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();

    //大白圆
    context.beginPath();
    context.arc(250/2,370/2,60,0,Math.PI * 2,false);
    context.closePath();
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();

    //小黑圆
    context.beginPath();
    context.arc(250/2,370/2,30/2,0,Math.PI * 2,true);
    context.closePath();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fill();

    //小白圆
    context.beginPath();
    context.arc(250/2,130/2,30/2,0,Math.PI * 2,false);
    context.closePath();
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();
}
drawArc("canvas");