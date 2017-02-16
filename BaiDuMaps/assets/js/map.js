/**
 * Created by hewq on 2017/1/13.
 */
var map = new BMap.Map("map");    //创建一个地图
map.centerAndZoom("深圳",10);         //显示的中心位置和放大倍数

map.enableScrollWheelZoom();        //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();         //启用地图惯性拖拽，默认禁用

map.addControl(new BMap.NavigationControl());       //添加默认缩放平移控件
map.addControl(new BMap.OverviewMapControl());       //添加默认缩略地图控件
map.addControl(new BMap.OverviewMapControl({isOpen:true,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));       //右下角，打开

var localSearch = new BMap.LocalSearch(map);    //创建查询
localSearch.enableAutoViewport();               //允许自动调节窗体大小
function searchByAddr(){
    map.clearOverlays();    //清空原来的标注
    var keyword = document.getElementById("search").value;
    localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);
        document.getElementById("result").value = poi.point.lng + "," + poi.point.lat;  //获取经纬度，并将结果显示在指定框中

        map.centerAndZoom(poi.point,18)
        var marker = new BMap.Marker(new BMap.Point(poi.point.lng,poi.point.lat));      //创建标注，为要查询地址的经纬度
        map.addOverlay(marker);
        var content = document.getElementById("search").value + "<br><br>经度：" + poi.point.lng + "<br>纬度：" + poi.point.lat;

        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");

        marker.addEventListener("click",function(){
            this.openInfoWindow(infoWindow);
        });
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);         //跳动的动画
    });

    localSearch.search(keyword);
}


