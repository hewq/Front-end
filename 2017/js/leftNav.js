/**
 * Created by hewq on 2016/12/19.
 */

$(function(){
    /*leftNav*/
    $(".left-nav-li").click(function(){
        $(".left-nav-li").removeClass("active");
        $(this).addClass("active");
    });
    /*table css*/
    $(".main-tb tr:even").not("main-th").css("background-color","#f8f9fb");
});
