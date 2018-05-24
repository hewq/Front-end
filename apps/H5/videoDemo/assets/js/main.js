var $start = $('#start');
var loader = new resLoader({
    resources : [
        'images/sp.png',
        'images/pack/btn_start01.png',
        'images/pack/loading/moon.png',
        'images/pack/loading/moon_text.png'
    ],
    onStart : function(total){

    },
    onProgress : function(current, total){
        var percent = Math.floor(current/total*100);
        $('.loading .percent').html(percent + '%');
    },
    onComplete : function(){
        setTimeout("$start.fadeIn(500)",500);
    }
});
loader.start();

$(function(){

    $start.on('click', function () {
        $('#loading').css('z-index','-1');

        var video = document.getElementById('myVideo');
        video.play();
        video.addEventListener("ended",function(){
            // $('#page2').css();
            $('#page1').fadeOut(1000);
        });
    });

});
