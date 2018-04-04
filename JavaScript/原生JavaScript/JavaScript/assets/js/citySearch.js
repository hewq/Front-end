/**
 * Created by hewq on 2016/8/3.
 */
var cityData = function(){
    var cityObj = {
        "湖北":{
            "武汉市":{
                "area": [
                    "江岸区",
                    "武昌区",
                    "江汉区",
                    "硚口区",
                    "汉阳区",
                    "青山区",
                    "洪山区",
                    "东西湖区",
                    "汉南区",
                    "蔡甸区",
                    "江夏区",
                    "黄陂区",
                    "新洲区",
                    "其他"
                ]
            },
            "黄石":{
                "area": [
                    "黄石港区",
                    "西塞山区",
                    "下陆区",
                    "铁山区",
                    "大冶市",
                    "阳新县",
                    "其他"
                ]
            }
        },
        "湖南":{
            "长沙":{
                "area": [
                    "岳麓区",
                    "芙蓉区",
                    "天心区",
                    "开福区",
                    "雨花区",
                    "浏阳市",
                    "长沙县",
                    "望城县",
                    "宁乡县",
                    "其他"
                ]
            },
            "株洲":{
                "area": [
                    "天元区",
                    "荷塘区",
                    "芦淞区",
                    "石峰区",
                    "醴陵市",
                    "株洲县",
                    "炎陵县",
                    "茶陵县",
                    "攸县",
                    "其他"
                ]
            },
            "湘潭":{
                "area": [
                    "岳塘区",
                    "雨湖区",
                    "湘乡市",
                    "韶山市",
                    "湘潭县",
                    "其他"
                ]
            }
        },
        "山西":{
            "太原":{
                "area": [
                    "小店区",
                    "迎泽区",
                    "杏花岭区",
                    "尖草坪区",
                    "万柏林区",
                    "晋源区",
                    "清徐县",
                    "阳曲县",
                    "娄烦县",
                    "古交市"
                ]
            },
            "大同":{
                "area": [
                    "城  区",
                    "矿  区",
                    "南郊区",
                    "新荣区",
                    "阳高县",
                    "天镇县",
                    "广灵县",
                    "灵丘县",
                    "浑源县",
                    "左云县",
                    "大同县"
                ]
            }
        },
        "山东":{
            "济南":{
                "area": [
                    "市中区",
                    "历下区",
                    "天桥区",
                    "槐荫区",
                    "历城区",
                    "长清区",
                    "章丘市",
                    "平阴县",
                    "济阳县",
                    "商河县",
                    "其他"
                ]
            },
            "青岛":{
                "area": [
                    "市南区",
                    "市北区",
                    "城阳区",
                    "四方区",
                    "李沧区",
                    "黄岛区",
                    "崂山区",
                    "胶南市",
                    "胶州市",
                    "平度市",
                    "莱西市",
                    "即墨市",
                    "其他"
                ]
            },
            "淄博":{
                "area": [
                    "张店区",
                    "临淄区",
                    "淄川区",
                    "博山区",
                    "周村区",
                    "桓台县",
                    "高青县",
                    "沂源县",
                    "其他"
                ]
            }
        },
        "新疆":{
            "乌鲁木齐":{
                "area": [
                    "天山区",
                    "沙依巴克区",
                    "新市区",
                    "水磨沟区",
                    "头屯河区",
                    "达坂城区",
                    "东山区",
                    "乌鲁木齐县",
                    "其他"
                ]
            },
            "克拉玛依":{
                "area": [
                    "克拉玛依区",
                    "独山子区",
                    "白碱滩区",
                    "乌尔禾区",
                    "其他"
                ]
            },
            "吐鲁番地区":{
                "area": [
                    "吐鲁番市",
                    "托克逊县",
                    "鄯善县",
                    "其他"
                ]
            }
        }
    };
    return cityObj;
};
/*检测输入的内容*/
function main(){
    var inPro;
    while (true){
        inPro = prompt("请输入省份");
        if(inPro == ""){
            confirm("输入为空，请重新输入");
        }else{
            break;
        }
    }
    search(inPro);
}
function search(inPro){
    var divPro = document.getElementById("province");
    var divCity = document.getElementById("city");
    var divArea = document.getElementById("area");
    var p, c, a,strP = "",strC="",strA="",flag=0;
    var data = cityData();
    for(p in data){
        if(data.hasOwnProperty(p)){
            if(p.indexOf(inPro) != -1){
              strP += p;
                for(c in data[p]){
                    strC += "<span>" + c + "</span>";
                    for(a in data[p][c]){
                        strA += data[p][c][a].join(" | ");
                    }
                }
                flag = 1;
            }
        }
    }

    divPro.innerHTML = strP;
    divCity.innerHTML = strC;
    divArea.innerHTML = strA;
    if (flag == 0){
        divPro.innerHTML = "查询不到";
    }
}
main();