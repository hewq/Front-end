/**
 * Created by hewq on 2016/12/7.
 */
$(function (){
    $(".navigation li").bind("mouseover",function(){
        $(".navigation li").removeClass("li-active");
        $(this).addClass("li-active");
    });
    $(".two-content-in-right a").bind("mouseover",function(){
        $(".two-content-in-right a").removeClass("two-a-active");
        $(this).addClass("two-a-active");
        var son = $(this).html();
        var imgSon = "img" +  $(this).html();
        $.ajax({
            type:"GET",
            url:"assets/json/nineSon.json",
            datatype:"json",
            success:function(data){
                $("#nine-son").html(data[son]);
                $("#img-son").attr("src","assets/images/"+ data[imgSon] +".png");
            },
            error: function () {
                console.log("err");
            }
        });
    });

});