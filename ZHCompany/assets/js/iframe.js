/**
 * Created by hewq on 2017/2/8.
 */
$(function () {
    /*头部*/
    $.ajax({
        type:"GET",
        url:"../pages/header.html",
        datatype:"html",
        success:function(data){
            $("#header").html(data);
        },
        error: function () {
            console.log("err");
        }
    });

    /*底部*/
    $.ajax({
        type:"GET",
        url:"../pages/footer.html",
        datatype:"html",
        success:function(data){
            $("#footer").html(data);
        },
        error: function () {
            console.log("err");
        }
    });

    /*滚动事件*/
    // window.onscroll = function () {
    //     var top = document.documentElement.scrollTop || document.body.scrollTop;
    //     if(top > 20) {
    //         $(".header").animate({
    //             height: "50px"
    //         }, 100, "linear");
    //         $(".nav ul a").animate({
    //             "line-height": "50px"
    //         }, 100, "linear");
    //     }else{
    //         $(".header").animate({
    //             height: "100px"
    //         }, 100, "linear");
    //         $(".nav ul a").animate({
    //             "line-height": "100px"
    //         }, 100, "linear");
    //     }
    // };
});