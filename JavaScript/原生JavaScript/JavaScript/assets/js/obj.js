/**
 * Created by hewq on 2016/8/2.
 */
var city = {
    "湖北省":"武汉市",
    "湖南省":"长沙市",
    "海南省":"海口市",
    "广东省":{
        "深圳市":"福田区、罗湖区",
        toJSON:function(){
            return this.深圳市 + "宝安区、南山区";
        }
    },
    get name(){
        return this["湖南省"];
    },
    set name(a){
        if(a == "岳阳市"){
            this["湖南省"] = a;
        }else{
            console.log(a + "不合法，禁止修改");
        }
    }
};
Object.prototype.a = "辽宁省";
console.log("深圳市" in city["广东省"]);
console.log("a" in city);
console.log(city.hasOwnProperty("a"));
var a;
for(a in city){
    if(city.hasOwnProperty(a)){
        console.log(a);
    }
}
console.log("------------------------");
console.log(Object.keys(city));
console.log(Object.keys(city).join());
console.log(Object.keys(city).join(" | "));
console.log("------------------------");
console.log(city.name);
city.name = "岳市";
console.log(city.name);
console.log("------------单个操作对象属性------------");
var c = Object.getOwnPropertyDescriptor(city,"湖北省");
Object.defineProperty(city,"湖北省",{
    configurable : false,//属性删除
    enumerable : false,//属性遍历
    value : "武汉市",//属性赋值
    writable : false//属性写操作
});
delete city.湖北省;
console.log(city.湖北省);
console.log(Object.keys(city).join());
city.湖北省 = "汕尾市";
console.log(city.湖北省);
console.log("-----------批量操作对象属性-------------");
Object.defineProperties(city,{
   "湖北省":{
       configurable : false,//属性删除
       enumerable : false,//属性遍历
       value : "武汉市",//属性赋值
       writable : false//属性写操作
   },
    "湖南省":{
        configurable : false,//属性删除
        enumerable : false,//属性遍历
        value : "武汉市",//属性赋值
        writable : false//属性写操作
    },
    //增加新属性
    "黑龙江省":{
        configurable : false,//属性删除
        enumerable : false,//属性遍历
        value : "哈尔滨市",//属性赋值
        writable : false//属性写操作
    }
});
console.log(city.黑龙江省);
console.log("********************************");
/*对象特性*/
/*1.原型链 o -> 原型 -> Object.prototype -> null*/
/*2.对象类型*/
/*3.对象扩展*/
/*4.对象序列化*/
var flag = Object.isExtensible(city);//检测对象是否可添加属性
console.log(flag);
Object.preventExtensions(city);//禁止对象添加属性
Object.seal(city);//禁止对象删除属性 操作configurable
console.log(Object.isSealed(city));//检测对象是否可删除属性 true为不可删除
delete city.海南省;
console.log(Object.keys(city));
console.log(Object.isFrozen(city));//检测对象是否冻结
Object.freeze(city);//禁止对象冻结
console.log("*********************************");
console.log(city.广东省.深圳市);
var ci = JSON.stringify(city);
console.log(ci);
var cc = JSON.parse('{"海南省":"海口市","广东省":"福田区、罗湖区宝安区、南山区","name":"武汉市"}');
console.log(cc.广东省);