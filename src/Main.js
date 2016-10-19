

//import createjs from "createjs";

import args from './libs/createjs.js';
import Histogram from  './framework/components/Histogram.js';
import PiPingDraw from  './framework/components/PiPingDraw.js';
import FixedXHistogram from  './framework/components/FixedXHistogram.js';
import ChatPie from  './framework/components/ChatPie.js';

window.onload = function(){

    let stage = new createjs.Stage('name');

    var currentA = [];
    var historyA = [];
    var currentT = 0;
    var historyT = 0;
    var A = [];

    for(var i = 0;i<100;i++){

        var obj  ={};
        obj.time = 1470109099942 + 1000 * 60 * i;
        obj.value = parseInt(Math.random() * 100);
        currentA.push(obj);
        currentT = obj.time;
    }

    for(var j = 0;j<400;j++){

        var obj  ={};
        obj.time = 1470109099942 + + 1000 * 60 * j;
        obj.value = parseInt(Math.random() * 100);
        historyA.push(obj);
        historyT = obj.time;
    }


    for(var n = 0;n<200;n++){

        var obj  ={};
        obj.time = 1470109099942 + + 1000 * 60 * n;
        obj.value = parseInt(Math.random() * 100);
        A.push(obj);
    }

    // let styleO = {
    //
    //     w:900,
    //     h:300,
    //     xTime:30,
    //     beforeHour:2,
    //     afterHour:1,
    //     sortData:false,
    //     yNum:5,
    //     title:{
    //         txtStr:'总体交易率(笔/秒)',
    //         txtColor:'#fff',
    //         txtSize:12,
    //         txtFont:'Microsoft YaHei',
    //         x:10,
    //         y:0
    //     },
    //     xAxis:{
    //         lineColor:'#ccc',
    //         thickness:2,
    //         txtColor:'#ccc',
    //         txtSize:20,
    //         txtFont:'黑体',
    //         mark:true
    //     },
    //     yAxis:{
    //         lineColor:'#ccc',
    //         thickness:2,
    //         txtColor:'#ccc',
    //         txtSize:20,
    //         txtFont:'黑体',
    //         mark:true
    //     },
    //     lineArr:[
    //         {
    //             lineType:'a',
    //             id:'A',
    //             value:currentA,
    //             lineColor:'#A00',
    //             thickness:2,
    //             valueColor:'#0f0',
    //             valueSize:30,
    //             valueFont:'黑体',
    //             unitStr:'万',
    //             unitColor:'#ccc',
    //             unitSize:10,
    //             unitFont:'Microsoft YaHei',
    //             titleStr:'当前销售额',
    //             titleColor:'#ccc',
    //             titleSize:15,
    //             titleFont:'Microsoft YaHei',
    //             ballR:4,
    //             ballColor:'#f00',
    //             shadowColor:'#fff',
    //             shadowSize:10
    //         },
    //         {
    //             lineType:'b',
    //             id:'B',
    //             value:historyA,
    //             lineColor:'rgba(126,126,126,0)',
    //             thickness:2,
    //             fillColor:'rgba(126,126,126,0.5)'
    //         }
    //
    //     ]
    //
    //
    // }
    //
    // let a = new Histogram(styleO);
    // a.x = 40;
    // a.y = 15;
    // stage.addChild(a);

    this.currentA = [];
    for(var i = 0;i<12;i++){
        this.currentA.push((300*Math.random())|0);
    }

    this.currentB = [];

    for(var i = 0;i<5;i++){

        this.currentB.push((300*Math.random())|0);
    }

    // let style = {
    //     w:540,
    //     h:265,
    //     // yMax:100,
    //     xAxisDash:true,
    //     xAxis:{
    //         value:['1','2','3','4','5','6','7','8','9','10','11','12'],
    //         lineColor:'#fff',
    //         thickness:2,
    //         txtColor:'#fff',
    //         txtSize:18,
    //         txtFont:'微软雅黑',
    //         mark:true
    //     },
    //     yAxis:{
    //         lineColor:'#fff',
    //         thickness:2,
    //         txtColor:'#fff',
    //         txtSize:12,
    //         txtFont:'微软雅黑'
    //     },
    //     lineArr:[
    //         {
    //             lineType:'b',
    //             id:'B',
    //             value:this.currentA,
    //             lineColor:'rgba(0,0,0,0)',
    //             thickness:2,
    //             valueColor:'#fff',
    //             valueSize:14,
    //             txtFont:'黑体',
    //             fillColor:'rgba(60,109,149,0.5)',
    //             isTitle:true,
    //             titleFont:'微软雅黑',
    //             titleSize:12,
    //             titleColor:'#fff',
    //             titleValue:'去年同期'
    //         },
    //         {
    //             lineType:'a',
    //             id:'A',
    //             value:this.currentB,
    //             lineColor:'#fff',
    //             thickness:2,
    //             valueColor:'#fff',
    //             valueSize:16,
    //             txtFont:'Arial',
    //             ballR:3,
    //             ballColor:'#fff',
    //             isTitle:true,
    //             titleFont:'Impact',
    //             titleSize:30,
    //             titleColor:'#fff'
    //         }
    //     ]
    // };
    //
    // this.his = new FixedXHistogram(style);
    // this.his.x = 60;
    // this.his.y = 65;
    // stage.addChild(this.his);

    // setInterval( () => {
    //
    //     var obj = {};
    //     obj.time = currentT + 1000 * 60 + '';
    //     obj.value = parseInt(Math.random() * 300) + '';
    //     currentA.push(obj);
    //     currentT = parseFloat(obj.time);
    //
    //     var obj1 = {};
    //     obj1.time = historyT + 1000 * 60 + '';
    //     obj1.value = parseInt(Math.random() * 100) + '';
    //     historyA.push(obj1);
    //     historyT = parseFloat(obj1.time);
    //
    //     var warn = parseInt(Math.random() * 100) + '';
    //
    //     a.updata([{value: currentA, id: 'A'}, {value: historyA, id: 'B'}])
    // },5000);

    //let a = new Histogram(styleO);
    //a.x = 40;
    //a.y = 15;
    //stage.addChild(a);

    // let a = new PiPingDraw(50,30,false,[{name:'S1',value:[780,420,780,490,300,490],color:'#44a50a'},
    //     {name:'S2',value:[300,490,100,490,100,200],color:'#ff0000'}]);
    // a.y = 20;
    // a.updata([{name:'S2',color:'#0000ff'}]);
    // stage.addChild(a);
    //name:this.arrRed[i].name,color:colorD


    let pieStyle = {
        a:90,
        b:50,
        h:20,
        open:true,
        colorList:["#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa"],
        dataList:[50,50,50,150],
        nameList:['w','h','ww','ee'],
        txtColor:'#fff',
        lineColor:'#fff',
        txtSize:16,
        txtFont:'微软雅黑',
    }

    this.pie1 = new ChatPie(pieStyle);
    this.pie1.createView();
    this.pie1.x = 200;
    this.pie1.y = 210;
    stage.addChild(this.pie1);


    //
    //setInterval( () =>{
    //
    //    var obj = {};
    //    obj.time = currentT + 1000 * 60+'';
    //    obj.value = parseInt(100 + Math.random() * 300) + '';
    //    currentA.push(obj);
    //    currentT = parseFloat(obj.time);
    //
    //    var obj1  ={};
    //    obj1.time = historyT  + 1000 * 60 +'';
    //    obj1.value = parseInt(100 + Math.random() * 100) + '';
    //    historyA.push(obj1);
    //    historyT = parseFloat(obj1.time);
    //
    //    var warn = 300 + parseInt(Math.random() * 100)+'';
    //
    //    a.updata([{value:currentA,id:'A'},{value:historyA,id:'B'},{value:A,id:'E'},{value:150+100*Math.random(),id:'C'}]);
    //
    //    console.log(historyA.length);
    //
    //},5000)

    createjs.Ticker.addEventListener('tick',stage);


}
