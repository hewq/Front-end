/**
 * Created by hewq on 2016/12/15.
 */
$(function(){
    var intevalID = "";
    /*手动轮播*/
    $(".banner-select span").eq(0).mouseover(function(){
        $(".ul-banner").animate({
            left:"0px"
        },100,"linear");
    });
    $(".banner-select span").eq(1).mouseover(function(){
        $(".ul-banner").animate({
            left:"-468px"
        },100,"linear");
    });
    $(".banner-select span").eq(2).mouseover(function(){
        $(".ul-banner").animate({
            left:-468*2+"px"
        },100,"linear");
    });
    $(".banner-select span").eq(3).mouseover(function(){
        $(".ul-banner").animate({
            left:-468*3+"px"
        },100,"linear");
    });
    $(".banner-select span").eq(4).mouseover(function(){
        $(".ul-banner").animate({
            left:-468*4+"px"
        },100,"linear");
    });
    $(".banner-select span").hover(function(){
        $(".banner-select span").removeClass("active");
        $(this).addClass("active");
        clearInterval( intevalID );
    },function(){
        intevalID = setInterval(carousel,2000);
    });

    function carousel(){
        var leftValue = $(".ul-banner").css("left").split("px")[0];
        if( +leftValue == -1872){
            leftValue = 0;
            $(".ul-banner").css("left","0px");
        }else{
            leftValue = +leftValue - 468;
            $(".ul-banner").animate({
                left:leftValue+"px"
            },1000,"linear");
        }
        $(".banner-select span").removeClass("active");
        $(".banner-select span").eq( leftValue / -468).addClass("active");
    }
    intevalID = setInterval(carousel,2000);

});