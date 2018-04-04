/**
 * Created by hewq on 2016/8/17.
 */
var canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
gridY = 7, gridX = 7;
var type = "ball";
colors = ["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722"];

var message = document.getElementById("message"),
    gravity = document.getElementById("gra"),
    duration = document.getElementById("dur"),
    speed = document.getElementById("speed"),
    radius = document.getElementById("rad"),
    resolution = document.getElementById("res");

graVal = parseFloat(gravity.value);
durVal = parseFloat(duration.value);
speVal = parseFloat(speed.value);
radVal = parseFloat(radius.value);
resVal = parseFloat(resolution.value);

var word = new Shape(W/2,H/2,message.value);
word.getValue();

function change(){
    /*todo clearRect*/
    context.clearRect(0,0,W,H);
    gridX = parseFloat(resolution.value);
    gridY = parseFloat(resolution.value);
    word.placement = [];
    word.text = message.value;
    word.getValue();
}

function changeV(){
    graVal = parseFloat(gravity.value);
    durVal = parseFloat(speed.value);
    speVal = parseFloat(radius.value);
    radVal = parseFloat(resolution.value);
}
(function drawFrame(){
    /*todo requestAnimationFrame*/
    window.requestAnimationFrame(drawFrame,canvas);
    context.clearRect(0,0,W,H);

    for(var i = 0; i < word.placement.length; i++){
        word.placement[i].update();
    }
}())

//resize
function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

/*todo addEventListener*/
window.addEventListener('resize',resize,false);
