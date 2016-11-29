

//import createjs from "createjs";

import args from './libs/createjs.js';
import Histogram from  './framework/components/Histogram.js';
import PiPingDraw from  './framework/components/PiPingDraw.js';
import FixedXHistogram from  './framework/components/FixedXHistogram.js';
import ChatPie from  './framework/components/ChatPie.js';
import ProgressBar from './framework/components/ProgressBar';
import Tools from './tools/Tools';
import HorHistogram from './framework/components/HorHistogram';
import Timer from './tools/Timer';

window.onload = function(){

    let stage = new createjs.Stage('name');

    // var currentA = [];
    // var historyA = [];
    // var currentT = 0;
    // var historyT = 0;
    // var A = [];
    //
    // for(var i = 0;i<100;i++){
    //
    //     var obj  ={};
    //     obj.time = 1470109099942 + 1000 * 60 * i;
    //     obj.value = parseInt(Math.random() * 100);
    //     currentA.push(obj);
    //     currentT = obj.time;
    // }
    //
    // for(var j = 0;j<400;j++){
    //
    //     var obj  ={};
    //     obj.time = 1470109099942 + + 1000 * 60 * j;
    //     obj.value = parseInt(Math.random() * 100);
    //     historyA.push(obj);
    //     historyT = obj.time;
    // }
    //
    //
    // for(var n = 0;n<200;n++){
    //
    //     var obj  ={};
    //     obj.time = 1470109099942 + + 1000 * 60 * n;
    //     obj.value = parseInt(Math.random() * 100);
    //     A.push(obj);
    // }
    //
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

    // a.clear();

    // this.currentA = [];
    // for(var i = 0;i<12;i++){
    //     this.currentA.push((300*Math.random())|0);
    // }
    //
    // this.currentB = [0,40,200,90];

    // for(var i = 0;i<5;i++){
    //
    //     this.currentB.push((300*Math.random())|0);
    // }

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
    // this.his.y = 350;
    // stage.addChild(this.his);
    // this.his.clear();

    // setInterval( () => {
    //
    //     this.currentB = this.currentB.map(function(a){
    //         return  (a*Math.random() * 2)|0;
    //     });
    //     this.his.updata([{value: this.currentB, id: 'A'}])
    //
    // },5000);

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
    //     a.updata([{value: currentA, id: 'A'}, {value: historyA, id: 'B'}]);
    //
    // },5000);


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
        R:180,
        colorList:["#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa","#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa","#5c7fa2","#6f8ba7","#8ba4bd"],
        dataList:[10,9,8,7,6,5,4,3,2,1],
        nameList:['w','h','ww','ee','w','h','ww','ee','w','h','ww','ee','w','h','ww','ee'],
        txtColor:'#fff',
        leg:{w:10},
        lineColor:'#fff',
        txtSize:10,
        txtFont:'微软雅黑',
    }

    // this.pie1 = new ChatPie(pieStyle);
    // this.pie1.createView();
    // this.pie1.x = 200;
    // this.pie1.y = 210;
    // stage.addChild(this.pie1);


    let pieStyle1 = {
        a:90,
        b:50,
        h:20,
        open:true,
        R:180,
        colorList:["#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa","#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa","#5c7fa2","#6f8ba7","#8ba4bd"],
        dataList:[50,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
        nameList:['w','h','ww','ee','w','h','ww','ee','w','h','ww','ee','w','h','ww','ee'],
        txtColor:'#fff',
        lineColor:'#fff',
        txtSize:10,
        txtFont:'微软雅黑',
    }

    // this.pie2 = new ChatPie(pieStyle1);
    // this.pie2.createView();
    // this.pie2.x = 700;
    // this.pie2.y = 200;
    // stage.addChild(this.pie2);
    //
    // Timer.add(()=>{this.pie1.updata(['1','2'],[100,200])},2000,1);

    // this.pie1.clear();


    // this.bar = new ProgressBar({
    //     barWidth:500,
    //     barHeight:50,
    //     // prgColor:"rgb(69,161,169)",//如果此属性存在 则用纯色填充 否则则用渐变填充效果
    //     bgColor:"rgb(31,31,31)",
    //     shadowLinearGradientColors:["rgb(55,164,174)","#000","rgb(55,164,174)"],
    //     shadowLinearGradientRatios:[0,0.5,1],
    //     shadowLinearGradientDir:"#0f0",
    //     borderThickness:3,
    //     flagTrgColor:"rgb(69,69,69)",
    //     curTrgColor:"rgb(254,171,39)",
    //     boardColor:"#6c6c6c",//"#685420",
    //     flagTrgHalfLength:8,//长度的一半
    //     flagTrgHeight:20,//高度
    //     flagTrgBarGap:8,
    //     curTrgBarGap:8,
    //     barRound:10,
    //     barMaginLeft:0,
    //     curPos:0,
    //     tweenDuring:2000,
    //     txtArr:[
    //         {value:'年度指标:',id:'mainTitle',size:24,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:0,autoSize:'left'},
    //         {value:'6000',id:'mainValue',size:32,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:-7,autoSize:'left'},
    //         {value:'万',id:'mainTitleEM',size:20,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:5,autoSize:'left'},
    //         {value:'目标完成度:',id:'secTitle',size:20,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:10,autoSize:'left'},
    //         {value:'20.13%',id:'secValue',size:35,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:0,autoSize:'left'}
    //     ]
    // });
    // this.bar.setFlagRatio(0.4,2000);
    // this.bar.updata([{id:'total',value:'3030'},{id:'history',value:0.2},{id:'current',value:0.6}])
    // this.bar.setCurrentRatio(0.5,1000);
    // Timer.add(()=>{this.bar.clear()},2000,1);
    //
    // stage.addChild(this.bar);
    // this.bar.y = 100;


    let jdpp = {

        w:360,
        h:120,
        maxAuto:true,
        oneNum:2,
        dataVis:true,
        yVis:false,
        sort:true,
        turnTime:5000,
        dataArr:{
            value:[{name:'NOGARA',value:20},{name:'INDIOS',value:40},{name:'SIMPLE LIFE',value:60}],
            color:'rgb(109,120,149)',
            font:'Microsoft YaHei',
            txtColor:'#fff',
            size:20,
            zw:18,
            zr:0
        },
        yArr:{
            color:'#ccc',
            font:'Microsoft YaHei',
            size:16
        }
    };


    this.horHis = new HorHistogram(jdpp);
    this.horHis.y = 100;
    stage.addChild(this.horHis);

    Timer.add(()=>{this.horHis.updata([{name:'NOGARA',value:20}])},2000,1);
    // this.horHis.updata([{'1Hao ':100},{'2好':100}]);
    // this.horHis.clear();
    // Timer.add(()=>{this.horHis.clear();},4000,1);

    createjs.Ticker.addEventListener('tick',stage);


}
