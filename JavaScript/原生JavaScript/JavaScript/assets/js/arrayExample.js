/**
 * Created by hewq on 2016/8/4.
 */
function getClass(clazz){
    return document.getElementsByClassName(clazz);
}
function addClick(){
    var elementTab = getClass("tab");
    for(var i = 0; i < elementTab.length; i++){
        elementTab[i].setAttribute("onclick","tabChange(this)")
    }
}
function tabChange(element){
    var elementTab = getClass("tab");
    var elementTabContent = getClass("tab_content");
    var m;
    for(var i = 0; i < elementTab.length; i++){
        if(element.innerHTML == elementTab[i].innerHTML){
            m = i;
        }
        elementTab[i].setAttribute("class","tab");
    }
    elementTab[m].setAttribute("class","tab active");
    for (var i = 0; i < elementTabContent.length; i++){
        elementTabContent[i].setAttribute("class","tab_content");
    }
    elementTabContent[m].setAttribute("class","tab_content active")
}
addClick();
