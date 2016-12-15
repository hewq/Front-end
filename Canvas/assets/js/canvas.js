/**
 * Created by hewq on 2016/8/16.
 */
var canvas = document.createElement("canvas"),
    context = canvas.getContext("2d");
var canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight;
//初始化一个数组
var particles = [];

init();

function init(){
    document.body.appendChild(canvas);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    setInterval(loop,1000 / 30);
}

function loop(){
    //清除canvas中的内容
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0,0,canvasWidth,canvasHeight);
    document.body.style["background-image"] = "url('assets/images/pink_star.png'')";
    //在一些随机位置产生并画出粒子
    //var particle = new Particle(canvasWidth *.5,canvasHeight*.5);
    var particle = new Particle(Math.random() * canvasWidth,Math.random() * canvasHeight);
    particle.xVel = Math.random()*4-2;//给每个粒子水平位置的变化量
    particles.push(particle);//加入数组

    //绘制数组中的每一个粒子
    for(var i = 0; i < particles.length;i++){
        var particle = particles[i];
        particle.render(context);
        //更新数组中每一个粒子
        particle.update();
    }

    if(particles.length > 1000){//只保留20个粒子
        particles.shift();
    }
}

/*function drawParticle(xPos,yPos){
    //设置填充颜色
    context.fillStyle = "rgba(255,255,255,1)";
    //draw a circle of the required size
    context.beginPath();
    context.arc(xPos,yPos,20,0,Math.PI*2,true);
    //and fill it
    context.fill();
}*/
/*function Particle(xPos,yPos){
    this.xPos = xPos;
    this.yPos = yPos;

    //set the color of the fill
    context.fillStyle = "rgba(255,255,255,.4)";
    //draw a circle of the required size
    context.beginPath();
    context.arc(this.xPos,this.yPos,20,0,Math.PI*2,true);
    //and fill it
    context.fill();
}*/
//粒子类
function  Particle (xPos,yPos){
    this.xPos = xPos;//中心X坐标
    console.log(this);
    this.yPos = yPos;//中心Y坐标
    this.yVel = -5;//负值，所以向上运动
    this.xVel = -10;

    //增加重力影响
    this.gravity = 0.1;
    //影响颜色
    this.counter = 0;

    this.render = function(c){
        //set the color of the fill
        c.fillStyle = "hsl(" + this.counter + ",100%,50%)";
        //draw a circle of the required size
        c.beginPath();
        c.arc(this.xPos,this.yPos,5,0,Math.PI*2,true);
        //and fill it
        c.fill();
    }

    this.update = function(){
        this.yVel += this.gravity;
        this.yPos += this.yVel;
        this.xVel += this.gravity;
        this.xPos += this.xVel;
        this.counter += 2;
    }

}
