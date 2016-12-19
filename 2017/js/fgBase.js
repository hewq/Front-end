/**
 * Created by hewq on 2016/12/19.
 */
$(function () {
    var topNavPara = {
        "办公综合" : "法制建设,政研参考,经验交流,专题工作",
        "人事政工" : "人事管理,教育培训,党风廉政,党务工作,群团工作",
        "监察内审" : "纪检监察,督察内审",
        "关务保障" : "办事指南,业务联系,专业技能",
        "业务运行" : "业务动态,统计简报,指标分析"
    };
    $(".left-nav-li").click(function () {
        $('.top-nav').html("");
        var key = $(this).children("span").html();
        var valueArr = topNavPara[key].split(",");
        for( var i = 0; i < valueArr.length; i++){
            $(".top-nav").append("<li class='top-nav-li'><span>" + valueArr[i] + "</span></li>");
        }
        $(".top-nav-li:first-child span").addClass("active");
        setTimeout(topNav,300);
    });
    /*topNav*/
    function topNav() {
        $(".top-nav-li span").click(function(){
            $(".top-nav-li span").removeClass("active");
            $(this).addClass("active");
        });
    }

});