/**
 * Created by hewq on 2017/2/17.
 */
$(function(){
    /*给每个导航绑定事件*/
    // $(".nav-section-one").click(function(){
    //     $('body').animate({
    //         scrollTop:"0"
    //     },500);
    // });
    // $(".nav-section-two").click(function(){
    //     $('body').animate({
    //         scrollTop:"666"
    //     },500);
    // });
    // $(".nav-section-three").click(function(){
    //     $('body').animate({
    //         scrollTop:"1331"
    //     },500);
    // });
    // $(".nav-section-four").click(function(){
    //     $('body').animate({
    //         scrollTop:"1996"
    //     },500);
    // });
    // $(".nav-section-five").click(function(){
    //     $('body').animate({
    //         scrollTop:"2661"
    //     },500);
    // });

    /*对上面的绑定事件进行优化*/
    /*通过闭包方式*/
    var nav = $(".nav-section");
    var scrollHeight = ["0","666","1331","1996","2661"];
    for( var i = 0; i < nav.length; i++ ){
        (function( index ){
            nav.eq(i).click(function(){
                $('body').animate({
                    scrollTop:scrollHeight[index]
                },500);
            });
        })(i);
    }


});
