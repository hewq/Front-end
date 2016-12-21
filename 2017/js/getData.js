/**
 * Created by hewq on 2016/12/20.
 */
$(function(){
    $(".main-tb").html("");
    var tbHeader = '<tr class="main-th"><th class="w-70">序号</th><th class="w-630">名称</th><th class="w-140">发布日期</th></tr>';
    $(".main-tb").append(tbHeader);
    $.ajax({
        type: "get",
        url: "../data/testJson.json",
        data: "section=section&page=page",
        dataType:"json",
        success: function(msg){
            var pageNum = getJsonNum( msg["学习推送"] );
            var count = (pageNum - 1) * 10 + getJsonNum( msg["学习推送"][pageNum] );
            var curPage = 1 ;
            $("#page-num").html(pageNum);
            $("#page-count").html(count);
            $("#current-page").html(curPage);
            for( var x = 1; x <= 10; x++){
                var serialNum = (msg["学习推送"][curPage][x]).split(";")[0];
                var title = (msg["学习推送"][curPage][x]).split(";")[1];
                var date = (msg["学习推送"][curPage][x]).split(";")[2];
                $(".main-tb").append('<tr><td>' + serialNum + '</td><td>' + title + '</td><td>' + date + '</td></tr>');
            }
        },
        error:function (msg) {
            alert( msg.error );
        }
    });
    function getJsonNum( obj ) {
        var num = 0;
        for( var i in obj){
            num++;
        }
        return num;
    }
});