/**
 * Created by hewq on 2017/1/12.
 */

var audio = document.getElementById("audio");
var box = document.getElementById("box");
box.addEventListener("mouseover",function () {
    audio.play();
});
box.addEventListener("mouseout",function () {
    audio.pause();
});
