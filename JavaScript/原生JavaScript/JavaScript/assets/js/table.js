/**
 * Created by hewq on 2016/8/10.
 */
/*字符串拼接生成表格*/
function createTable(trNum,tdNum){
    var div = document.getElementById("table");
    var tbp = "<table>";
    var tbl = "</table>"
    var trp = "<tr>";
    var trl = "</tr>";
    var tdtd = "<td></td>";
    var tb = "";
    var tr = "";
    var td = "";

    for(var i = 0; i < tdNum; i++){
        td += tdtd;
    }
    for(var j = 0; j < trNum; j++){
        tr += (trp + td +trl);
    }
    tb = (tbp + tr + tbl);
    div.innerHTML = tb;
}

/*创建标签生成数组*/
var div2 = document.getElementById("table2");
function createTableByTag(trNum,tdNum){
    var table = document.createElement("table");
    var tBody =document.createElement("tbody");
    var x = 1;
    for(var i = 0; i < trNum; i++){
        var tr = document.createElement("tr");
        for(var j = 0; j < tdNum; j++){
            var td =document.createElement("td");
            td.innerHTML = x++;
            tr.appendChild(td);
        }
        tBody.appendChild(tr);
        table.appendChild(tBody);
    }
    div2.appendChild(table);
}
var td,merryGoRoundValue, i,tdNum,trNum;
function create(){
    tdNum = document.getElementById("tdNum").value;
    trNum = document.getElementById("trNum").value;
    div2.innerHTML = "";
    i = 0;
    createTableByTag(trNum,tdNum);
    //var randTd = Math.floor(Math.random() * tdNum);
    //var randTr = Math.floor(Math.random() * trNum);
    //var tb = document.getElementsByTagName("table")[0];
    //var tBody = tb.childNodes[0];
    //var tr = tBody.childNodes[randTr];
    //var td = tr.childNodes[randTd];
    //td.className = "td";

}
/*跑马灯*/
function merryGoRound(){
    td = document.querySelectorAll("td");
    var area = tdNum * trNum;
    if(i == 0){
        td[i].className = "td";
        i++;
    }else if(i > 0 && i < area){
        td[i].className = "td";
        td[i - 1].className = "";
        i++;
    }else if(i = area){
        td[0].className = "td";
        td[area - 1].className = "";
        i = 1;
    }
    if(stop()){
        clearInterval(merryGoRoundValue);
    }
}
/*启动跑马灯*/
function startMerryGoRound(){
    merryGoRoundValue = setInterval("merryGoRound()",80);
    console.log(merryGoRoundValue);
}
/*停止并选中*/
function stop(){
    return 5 == Math.floor(Math.random() * 15);
}
/*生成一行*/
function createTr(){
    var tBody = document.getElementsByTagName("tbody")[0];
    var x = tdNum * trNum + 1;
        var tr = document.createElement("tr");
        for(var j = 0; j < tdNum; j++){
            var td =document.createElement("td");
            td.innerHTML = x++;
            tr.appendChild(td);
        }
    tBody.appendChild(tr);
    trNum++;
}
/*增加一列*/
function createTd(){
    div2.innerHTML = "";
    i = 0;
    var td = tdNum * 1;
    createTableByTag(trNum,++td);
    tdNum++;
}
/*删除一行*/
function removeTr(){
    var tBody = document.getElementsByTagName("tbody")[0];
    //var tr = tBody.childNodes;
    //tr[tr.length - 1].remove();
    tBody.lastElementChild.remove();
    trNum--;
}
/*删除一列*/
function removeTd(){
    div2.innerHTML = "";
    i = 0;
    var td = tdNum * 1;
    createTableByTag(trNum,--td);
    tdNum--;
}