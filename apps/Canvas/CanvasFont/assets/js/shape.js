/**
 * Created by hewq on 2016/8/17.
 */
function Shape(x,y,texte){
    this.x = x;
    this.y = y;
    this.size = 150;

    this.text = texte;
    this.placement = [];
}

Shape.prototype.getValue = function(){
    context.textAlign = "center";
    context.font = this.size + "px arial";
    /*todo fillText*/
    context.fillText(this.text,this.x,this.y);

    /*todo getImageData*/
    var idata = context.getImageData(0,0,W,H);
    var buffer32 = new Uint32Array(idata.data.buffer);

    for(var j = 0; j < H; j += gridY){
        for(var i = 0;i < W;i += gridX){
            if(buffer32[j * W + i]){
                var particle = new Particle(i,j,type);
                this.placement.push(particle);
            }
        }
    }

    context.clearRect(0,0,W,H);
};