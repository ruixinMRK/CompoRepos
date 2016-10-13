

//import createjs from "createjs";

import args from './libs/createjs.js';
import Histogram from  './framework/components/Histogram.js';
import PiPingDraw from  './framework/components/PiPingDraw.js';

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

    let styleO = {

        w:900,
        h:300,
        xTime:30,
        beforeHour:2,
        afterHour:1,
        sortData:false,
        yNum:5,
        title:{
            txtStr:'总体交易率(笔/秒)',
            txtColor:'#fff',
            txtSize:12,
            txtFont:'Microsoft YaHei',
            x:10,
            y:0
        },
        xAxis:{
            lineColor:'#ccc',
            thickness:2,
            txtColor:'#ccc',
            txtSize:20,
            txtFont:'黑体',
            mark:true
        },
        yAxis:{
            lineColor:'#ccc',
            thickness:2,
            txtColor:'#ccc',
            txtSize:20,
            txtFont:'黑体',
            mark:true
        },
        lineArr:[
            {
                lineType:'a',
                id:'A',
                value:currentA,
                lineColor:'#A00',
                thickness:2,
                valueColor:'#0f0',
                valueSize:30,
                valueFont:'黑体',
                unitStr:'万',
                unitColor:'#ccc',
                unitSize:10,
                unitFont:'Microsoft YaHei',
                titleStr:'当前销售额',
                titleColor:'#ccc',
                titleSize:15,
                titleFont:'Microsoft YaHei',
                ballR:4,
                ballColor:'#f00'
            },
            {
                lineType:'b',
                id:'B',
                value:historyA,
                lineColor:'rgba(126,126,126,0)',
                thickness:2,
                fillColor:'rgba(126,126,126,0.5)'
            }

        ]


    }

<<<<<<< HEAD
    let a = new Histogram(styleO);
    a.x = 40;
    a.y = 15;
    stage.addChild(a);

    setInterval( () =>{

        var obj = {};
        obj.time = currentT + 1000 * 60+'';
        obj.value = parseInt(Math.random() * 300) + '';
        currentA.push(obj);
        currentT = parseFloat(obj.time);

        var obj1  ={};
        obj1.time = historyT  + 1000 * 60 +'';
        obj1.value = parseInt(Math.random() * 100) + '';
        historyA.push(obj1);
        historyT = parseFloat(obj1.time);

        var warn = parseInt(Math.random() * 100)+'';

        a.updata([{value:currentA,id:'A'},{value:historyA,id:'B'}]);

        // console.log(historyA.length);
=======
    //let a = new Histogram(styleO);
    //a.x = 40;
    //a.y = 15;
    //stage.addChild(a);

    let a = new PiPingDraw(50,30);
    a.y = 20;
    a.updata([{value:[50,200,50,50,300,50,300,350],color:'#33ff00'},{value:[300,350,300,500,500,500],color:'#ccff33'}])
    stage.addChild(a);
>>>>>>> 6bc390f5f9f8cfe85e2f6136fc859759dd94aac5

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
