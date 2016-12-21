// /**
//  * Created by hewq on 2016/12/15.
//  */
// $(function(){
//     var intevalID = "";
//     /*手动轮播*/
//     $(".banner-select span").eq(0).mouseover(function(){
//         $(".ul-banner").animate({
//             left:"0px"
//         },100,"linear");
//     });
//     $(".banner-select span").eq(1).mouseover(function(){
//         $(".ul-banner").animate({
//             left:"-468px"
//         },100,"linear");
//     });
//     $(".banner-select span").eq(2).mouseover(function(){
//         $(".ul-banner").animate({
//             left:-468*2+"px"
//         },100,"linear");
//     });
//     $(".banner-select span").eq(3).mouseover(function(){
//         $(".ul-banner").animate({
//             left:-468*3+"px"
//         },100,"linear");
//     });
//     $(".banner-select span").eq(4).mouseover(function(){
//         $(".ul-banner").animate({
//             left:-468*4+"px"
//         },100,"linear");
//     });
//     $(".banner-select span").hover(function(){
//         $(".banner-select span").removeClass("active");
//         $(this).addClass("active");
//         clearInterval( intevalID );
//     },function(){
//         intevalID = setInterval(carousel,2000);
//     });
//
//     function carousel(){
//         var leftValue = $(".ul-banner").css("left").split("px")[0];
//         if( +leftValue == -1872){
//             leftValue = 0;
//             $(".ul-banner").css("left","0px");
//         }else{
//             leftValue = +leftValue - 468;
//             $(".ul-banner").animate({
//                 left:leftValue+"px"
//             },1000,"linear");
//         }
//         $(".banner-select span").removeClass("active");
//         $(".banner-select span").eq( leftValue / -468).addClass("active");
//     }
//     intevalID = setInterval(carousel,2000);
//
// });



/**
 * Created by hewq on 2016/12/15.
 */
$(function () {

    /*********************banner*********************/
    var intevalIDBanner = "";
    /*手动轮播*/
    $(".banner-select span").eq(0).mouseover(function(){
        $(".ul-banner li").fadeOut(1000);
        $(".ul-banner li").eq(0).fadeIn(1500);
    });
    $(".banner-select span").eq(1).mouseover(function(){
        $(".ul-banner li").fadeOut(1000);
        $(".ul-banner li").eq(1).fadeIn(1500);
    });
    $(".banner-select span").eq(2).mouseover(function(){
        $(".ul-banner li").fadeOut(1000);
        $(".ul-banner li").eq(2).fadeIn(1500);
    });
    $(".banner-select span").hover(function(){
        $(".banner-select span").removeClass("active");
        $(this).addClass("active");
        clearInterval(intevalIDBanner);
    },function(){
        intevalIDBanner = setInterval(showBanner, 2000);
    });

    /*自动轮播*/
    var indexBanner = 0;
    function showBanner() {
        if (indexBanner == 3) {
            indexBanner = 0;
        }
        $(".ul-banner li").fadeOut(500);
        $(".ul-banner li").eq(indexBanner).fadeIn(1000);
        $(".banner-select span").removeClass("active");
        $(".banner-select span").eq(indexBanner++).addClass("active");
    }
    $(".ul-banner").hover(function () {
        clearInterval(intevalIDBanner);
    }, function () {
        intevalIDBanner = setInterval(showBanner, 3000);
    });
    intevalIDBanner = setInterval(showBanner, 3000);

    /*********************news*********************/
    var newsLeft = 0;
    var intevalIDNews = "";
    function carsouselNews() {
        if (newsLeft == -1184) {
            newsLeft = 0;
            $(".news").css("left", "0px");
        } else {
            newsLeft -= 296;
            $(".news").animate({
                left: newsLeft + "px"
            }, 500, "linear");
        }
    }
    $(".news").hover(function () {
        clearInterval(intevalIDNews);
    }, function () {
        intevalIDNews = setInterval(carsouselNews, 3000);
    });
    intevalIDNews = setInterval(carsouselNews, 3000);

    /*********************notice*********************/
    var noticeTop = 0;
    var intevalIDNotice = "";
    function carouselNotice() {
        if (noticeTop == -60) {
            noticeTop = 0;
            $(".ul-notice").css("top", "0px");
        } else {
            noticeTop -= 30;
            $(".ul-notice").animate({
                top: noticeTop + "px"
            }, 500, "linear");
        }
    }
    $(".ul-notice").hover(function () {
        clearInterval(intevalIDNotice);
    }, function () {
        intevalIDNotice = setInterval(carouselNotice, 3000);
    });
    intevalIDNotice =  setInterval(carouselNotice, 3000);
});