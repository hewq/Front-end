/**
 * Created by hewq on 2016/12/10.
 */
$(function(){
    var i = -1;
    var arr = [".dragon",".xuanwu",".tiger",".zhuque"];
    function setOpacity(theClassName){
        i++;
        if( i < theClassName.length ){
            $(theClassName[i]).animate({
                opacity : "0"
            },2000,"linear",function(){
                $(theClassName[i]).animate({
                    opacity : "1"
                },1000,"linear",setOpacity(theClassName));
            });
        }
    }
    function showOpacity(){
        i = -1;
        setOpacity(arr);
    }
    setOpacity([".dragon",".xuanwu",".tiger",".zhuque"]);
    setInterval(showOpacity,1000*10);
    //$(".si-xiang").bind("mouseover",function(){
    //    $(this).animate({
    //        opacity : "0",
    //        'background-color' : "#fff"
    //    },2000,"linear",function(){
    //        $(this).animate({
    //            opacity : "1",
    //            "background-color" : "rgba(0,0,0,0)"
    //        },1000,"linear");
    //    });
    //});
});