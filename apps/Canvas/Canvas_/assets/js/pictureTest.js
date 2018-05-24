/**
 * Created by hewq on 2016/8/17.
 */
var dolly1 = document.getElementById("dolly1");
var dolly2 = document.getElementById("dolly2");
var dolly3 = document.getElementById("dolly3");
var pixelOpts = [ { resolution : 8} ];
var pixelDolly1 = dolly1.closePixelate( pixelOpts );
var pixelDolly2 = dolly2.closePixelate( pixelOpts );
var pixelDolly3 = dolly3.closePixelate( pixelOpts );
var range = document.getElementById("range");
var output = document.getElementById("output");

range.addEventListener('change',function( event ){
    var res = parseInt(event.target.value,10);
    res = Math.floor( res / 2 ) * 2;
    res = Math.max(4,Math.min(100,res));
    output.textContent = res;

    pixelOpts = [ { resolution : res } ];
    pixelDolly1.render( pixelOpts );
    pixelDolly2.render( pixelOpts );
    pixelDolly3.render( pixelOpts );
},false)
