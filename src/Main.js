

//import createjs from "createjs";

import './libs/createjs.js';
import Histogram from  './framework/components/Histogram.js';
import PiPingDraw from  './framework/components/PiPingDraw.js';
import FixedXHistogram from  './framework/components/FixedXHistogram.js';
import ChatPie from  './framework/components/ChatPie.js';
import ProgressBar from './framework/components/ProgressBar';
import Tools from './tools/Tools';
import HorHistogram from './framework/components/HorHistogram';
import Timer from './tools/Timer';
import ObjectPool from './tools/ObjectPool';
import ListMap from './framework/components/ListMap.js';

import TextString from './framework/components/TextString';
import TextDoubleState from './framework/components/TextDoubleState';

import Menu from './framework/components/Menu';
import MenuTile from './framework/components/MenuTile';

import PageList from './framework/components/PageList';
import ExpItem from './framework/components/ExpItem';

import UIPageList from './framework/ui/UIPageList';


/**
 * 你好
 */
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
                ballColor:'#f00',
                shadowColor:'#fff',
                shadowSize:10
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
    //     obj.value = parseInt(Math.random() * 50) + '';
    //     currentA.push(obj);
    //     currentT = parseFloat(obj.time);
    //
    //     // var obj1 = {};
    //     // obj1.time = historyT + 1000 * 60 + '';
    //     // obj1.value = parseInt(Math.random() * 20) + '';
    //     // historyA.push(obj1);
    //     // historyT = parseFloat(obj1.time);
    //     //
    //     // var warn = parseInt(Math.random() * 100) + '';
    //
    //     a.updata([{value: currentA, id: 'A'}]);
    //
    // },500);


    // let a = new PiPingDraw(50,30,false,[{name:'S1',value:[780,420,780,490,300,490],color:'#44a50a'},
    //     {name:'S2',value:[300,490,100,490,100,200],color:'#ff0000'}]);
    // a.y = 20;
    // a.updata([{name:'S2',color:'#0000ff'}]);
    // stage.addChild(a);
    //name:this.arrRed[i].name,color:colorD


    // let pieStyle = {
    //     a:90,
    //     b:50,
    //     h:20,
    //     open:true,
    //     R:0,
    //     colorList:["#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa","#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa","#5c7fa2","#6f8ba7","#8ba4bd"],
    //     dataList:[10,5,10,20,19,20,15,14,13],
    //     nameList:['w','h','ww','ee','w','h','ww','ee','w','h','ww','ee','w','h','ww','ee','w','h','ww','ee','w','h','ww','ee','w','h','ww','ee','w','h','ww','ee'],
    //     txtColor:'#fff',
    //     lineColor:'#fff',
    //     txtSize:15,
    //     txtFont:'微软雅黑'
    // }
    //
    // this.pie1 = new ChatPie(pieStyle);
    // this.pie1.createView();
    // this.pie1.x = 200;
    // this.pie1.y = 210;
    // stage.addChild(this.pie1);


    // let pieStyle1 = {
    //     a:90,
    //     b:50,
    //     h:20,
    //     open:true,
    //     R:180,
    //     colorList:["#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa","#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa","#5c7fa2","#6f8ba7","#8ba4bd"],
    //     dataList:[50,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
    //     nameList:['w','h','ww','ee','w','h','ww','ee','w','h','ww','ee','w','h','ww','ee'],
    //     txtColor:'#fff',
    //     lineColor:'#fff',
    //     txtSize:10,
    //     txtFont:'微软雅黑',
    // }

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


    // let jdpp = {
    //
    //     w:360,
    //     h:120,
    //     maxAuto:true,
    //     oneNum:2,
    //     dataVis:true,
    //     yVis:false,
    //     sort:true,
    //     turnTime:5000,
    //     dataArr:{
    //         value:[{name:'NOGARA',value:20},{name:'INDIOS',value:40},{name:'SIMPLE LIFE',value:60}],
    //         color:'rgb(109,120,149)',
    //         font:'Microsoft YaHei',
    //         txtColor:'#fff',
    //         size:20,
    //         zw:18,
    //         zr:0
    //     },
    //     yArr:{
    //         color:'#ccc',
    //         font:'Microsoft YaHei',
    //         size:16
    //     }
    // };
    //
    //
    // this.horHis = new HorHistogram(jdpp);
    // this.horHis.y = 100;
    // stage.addChild(this.horHis);

    // Timer.add(()=>{this.horHis.updata([{name:'NOGARA',value:20}])},2000,1);
    // this.horHis.updata([{'1Hao ':100},{'2好':100}]);
    // this.horHis.clear();
    // Timer.add(()=>{this.horHis.clear();},4000,1);


    // function onclick(){
    //     alert(1);
    // }
    // this.s = ObjectPool.getObj('shape');
    // this.s.graphics.beginFill('rgb(f,f,f)');
    // this.s.graphics.drawRect(0,0,100,200);
    // this.s.graphics.endFill();
    // this.s.alpha = 0.01;
    // // this.s.visible = false;
    //
    // this.testBit = new createjs.Bitmap();
    // this.testBit.x = 300;
    // this.testBit.draw(this.s);
    //
    //},5000)


    //this.bar = new ProgressBar({
    //    barWidth:500,
    //    barHeight:50,
    //    // prgColor:"rgb(69,161,169)",//如果此属性存在 则用纯色填充 否则则用渐变填充效果
    //    bgColor:"rgb(31,31,31)",
    //    shadowLinearGradientColors:["rgb(55,164,174)","#000","rgb(55,164,174)"],
    //    shadowLinearGradientRatios:[0,0.5,1],
    //    shadowLinearGradientDir:"#0f0",
    //    borderThickness:3,
    //    flagTrgColor:"rgb(69,69,69)",
    //    curTrgColor:"rgb(254,171,39)",
    //    boardColor:"#6c6c6c",//"#685420",
    //    flagTrgHalfLength:8,//长度的一半
    //    flagTrgHeight:20,//高度
    //    flagTrgBarGap:8,
    //    curTrgBarGap:8,
    //    barRound:10,
    //    barMaginLeft:0,
    //    curPos:0,
    //    tweenDuring:2000,
    //    txtArr:[
    //        {value:'年度指标:',id:'mainTitle',size:24,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:0,autoSize:'left'},
    //        {value:'6000',id:'mainValue',size:32,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:-7,autoSize:'left'},
    //        {value:'万',id:'mainTitleEM',size:20,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:5,autoSize:'left'},
    //        {value:'目标完成度:',id:'secTitle',size:20,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:10,autoSize:'left'},
    //        {value:'20.13%',id:'secValue',size:35,color:'#fff',font:'Microsoft YaHei',offsetX:0,offsetY:0,autoSize:'left'}
    //    ]
    //});
    //// this.bar.setFlagRatio(0.4,2000);
    //this.bar.updata([{id:'total',value:'3030'},{id:'history',value:0.2},{id:'current',value:0.6}])
    //// this.bar.setCurrentRatio(0.5,1000);
    //stage.addChild(this.bar);
    //this.bar.y = 100;

//============================ 测试TextString
//    var ts = new TextString({
//        left:10,
//        top:10,
//        gapH:10,
//        gapV:10,
//        dir:"h",
//        itemW:100,
//        itemH:30,
//        font:"15px 微软雅黑",
//        color:"#000000",
//        textAlign:"left",
//        value:"",
//        itemsStyle:
//            [{valueField:"v1",font:"15px 微软雅黑",color:"#ff0000",value:"text1",textAlign:"left",width:100,height:30},
//                {valueField:"v2",font:"15px 微软雅黑",color:"#000000",value:"text2",textAlign:"left",width:100,height:30},
//                {valueField:"v3",font:"15px 微软雅黑",color:"#000000",value:"text3",textAlign:"left",width:100,height:30}],
//    });
//    ts.setData({v1:"第一个文本",v2:"第二个文本",v3:"第三个文本"});
//    stage.addChild(ts);
//============================ end 测试TextString

    //============================测试 TextDoubleState的代码
    //var tds = new TextDoubleState(
    //{
    //      text:"",
    //      width:100,
    //      height:30,
    //      textAlign:"center",
    //      selected:false,
    //      textSelectedFont:"15px 微软雅黑",
    //      textSelectedColor:"#ffffff",
    //      textSelectedAlpha:1,
    //      textUnselectedFont:"15px 微软雅黑",
    //      textUnselectedColor:"#000000",
    //      textUnselectedAlpha:1,
    //      bgSelectedColor:"#333333",
    //      bgSelectedAlpha:0.5,
    //      bgUnselectedColor:"#ffffff",
    //      bgUnselectedAlpha:0.5
    //  }
    //);
    //tds.setData({key1:"key1_Value",key2:"key2_value"},"key2");
    //tds.setData("key2_value");
    //tds.text = "key2_value";
    //tds.x = 100;tds.y = 100;
    //tds.selected = false;
    //
    //stage.addChild(tds);
//============================ end 测试 TextDoubleState的代码

    //============================测试 Menu 的代码
    //var o = {
    //          text:"",
    //          width:100,
    //          height:30,
    //          selected:false,
    //          textSelectedFont:"15px 微软雅黑",
    //          textSelectedColor:"#ffffff",
    //          textSelectedAlpha:1,
    //          textUnselectedFont:"15px 微软雅黑",
    //          textUnselectedColor:"#000000",
    //          textUnselectedAlpha:1,
    //          bgSelectedColor:"#333333",
    //          bgSelectedAlpha:0.5,
    //          bgUnselectedColor:"#ffffff",
    //          bgUnselectedAlpha:0.01
    //      };
    //var tds1 = new TextDoubleState(o);tds1.text = 1;
    //var tds2 = new TextDoubleState(o);tds2.text = 2;
    //var tds3 = new TextDoubleState(o);tds3.text = 3;
    //var tds4 = new TextDoubleState(o);tds4.text = 4;
    //tds4.x = 100;tds4.y = 100;
    //var m = new Menu({
    //      items:[tds1,tds2,tds3],
    //      gap:10,
    //      dir:"h",
    //      selectedIndex:0,
    //      trigger:"click",
    //      blLoop:true,
    //      loopTime:1000,
    //      blMouseRelCon:true,
    //      relCons:[tds4]
    // });
    //stage.enableMouseOver(60);
    //stage.addChild(m,tds4);
//============================end 测试 Menu的代码


//============================测试 MenuTile的代码
//    var o = {
//              text:"",
//              width:100,
//              height:30,
//              selected:false,
//              textSelectedFont:"15px 微软雅黑",
//              textSelectedColor:"#ffffff",
//              textSelectedAlpha:1,
//              textUnselectedFont:"15px 微软雅黑",
//              textUnselectedColor:"#000000",
//              textUnselectedAlpha:1,
//              bgSelectedColor:"#333333",
//              bgSelectedAlpha:0.5,
//              bgUnselectedColor:"#ffffff",
//              bgUnselectedAlpha:0.01
//          };
//    var arr = [];
//    var tds0 = new TextDoubleState(o);tds0.text = "relCons";
//    for(var i=0;i<10;i++){
//        var tds = new TextDoubleState(o);tds.text = i+1;
//        arr.push(tds);
//    }
//
//    var m = new MenuTile({
//          items:arr,
//          dir:"h",
//          groupCount:3,
//          itemW:100,
//          itemH:30,
//          gapH:10,
//          gapV:10,
//          selectedIndex:0,
//          trigger:"click",
//          blLoop:true,
//          loopTime:1000,
//          blMouseRelCon:true,
//          relCons:[tds0]
//    });
//    m.x = 100;m.y = 100;
//    stage.enableMouseOver(60);
//    stage.addChild(tds0,m);
//============================end 测试 MenuTile的代码

    //============================测试 PageList的代码
//
//var p = new PageList({width:300,height:150,listItemClass:ExpItem,listCount:3,listItemTriggle:"click",pageTiggle:"click",pageBLLoop:true,pageLoopTime:2000});
//p.setData([{t0:0,t1:1,t2:2,t3:3},
//  {t0:10,t1:11,t2:2,t3:3},
//  {t0:20,t1:21,t2:2,t3:3},
//  {t0:30,t1:31,t2:2,t3:3},
//  {t0:40,t1:41,t2:2,t3:3},
//  {t0:50,t1:51,t2:2,t3:3},
//  {t0:60,t1:61,t2:2,t3:3},
//  {t0:70,t1:71,t2:2,t3:3},
//  {t0:80,t1:81,t2:2,t3:3},
//  {t0:90,t1:91,t2:2,t3:3},
//  {t0:110,t1:111,t2:2,t3:3},
//  {t0:220,t1:221,t2:2,t3:3},
//  {t0:330,t1:331,t2:2,t3:3},
//  {t0:440,t1:441,t2:2,t3:3},
//  {t0:550,t1:551,t2:2,t3:3},
//  {t0:660,t1:661,t2:2,t3:3},
//  {t0:770,t1:771,t2:2,t3:3}]);
//    stage.addChild(p);
//============================ end 测试 PageList的代码

  //============================测试 UIPageList的代码

  var bgS = new createjs.Shape();
  var g = bgS.graphics.setStrokeStyle(1).beginStroke("#fff").beginFill("#19233e").moveTo(0,0).lineTo(424,0).lineTo(450,27).lineTo(450,287).lineTo(0,287).lineTo(0,0).endFill();
  var listTitleP = {
        itemsStyle:
            [{valueField:"t1",font:"16px 微软雅黑",color:"#fff",value:"省份",textAlign:"center",x:42},
                {valueField:"t2",font:"16px 微软雅黑",color:"#fff",value:"指标名称",textAlign:"center",x:151},
                {valueField:"t3",font:"16px 微软雅黑",color:"#fff",value:"当前值",textAlign:"center",x:261},
              {valueField:"t4",font:"16px 微软雅黑",color:"#fff",value:"正常值",textAlign:"center",x:316},
              {valueField:"t5",font:"16px 微软雅黑",color:"#fff",value:"持续告警",textAlign:"center",x:404}]
    };
  var listItemP = {
    itemsStyle:
        [{valueField:"v0",font:"14px 微软雅黑",color:"#fff",value:"",textAlign:"center",x:10},
          {valueField:"v1",font:"14px 微软雅黑",color:"#fff",value:"",textAlign:"center",x:42},
          {valueField:"v2",font:"14px 微软雅黑",color:"#fff",value:"",textAlign:"center",x:151},
          {valueField:"v3",font:"14px 微软雅黑",color:"#fff",value:"",textAlign:"center",x:261},
          {valueField:"v4",font:"14px 微软雅黑",color:"#fff",value:"",textAlign:"center",x:316},
          {valueField:"v5",font:"14px 微软雅黑",color:"#fff",value:"",textAlign:"center",x:404}]
  };
  var pageItemP = {
      text:"",
      width:16,
      height:16,
      selected:false,
      textSelectedFont:"6px 微软雅黑",
      textSelectedColor:"#ffffff",
      textSelectedAlpha:1,
      textUnselectedFont:"6px 微软雅黑",
      textUnselectedColor:"#395b74",
      textUnselectedAlpha:1,
      bgSelectedColor:"#ff0000",
      bgSelectedAlpha:0.01,
      bgUnselectedColor:"#00ff00",
      bgUnselectedAlpha:0.01
  };


  var pageListP = {width:450,height:248,
      listItemClass:TextString,listItemParam:listItemP,listCount:10,listGap:7,
      /*pageItemClass:TextDoubleState,*/pageItemParam:pageItemP,pageMarginH:10,pageMarginV:3,
      listItemTriggle:"click",pageTiggle:"click",
      pageBLLoop:true,pageLoopTime:2000};

  var p = new UIPageList({titleStr:"当前提醒关注业务",bg:bgS,listTitleParam:listTitleP,pageListParam:pageListP});
  p.setListTitle({t1:"省份",t2:"指标名称",t3:"当前值",t4:"正常值",t5:"持续告警"});
  p.setData([
    {v0:1,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:2,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:3,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:4,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:5,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:6,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:7,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:8,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:9,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:10,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:11,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:12,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:13,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:14,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:15,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:16,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:17,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:18,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:19,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
    {v0:20,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:31,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:32,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:33,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:34,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:35,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:36,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:37,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:38,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:39,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:40,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:51,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:52,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:53,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:54,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:55,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:56,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:57,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:58,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:59,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:60,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9},
      {v0:61,v1:"宁夏",v2:"1分钟缴费复机及时率",v3:"10.04%",v4:"85%",v5:9}

  ]);
  stage.addChild(p);


  //============================end 测试 UIPageList的代码
    // this.s.addEventListener('click',onclick);
    // stage.addChild(this.s);


    //function loadImg(url){
    //    let pro = new Promise((resolve,reject)=>{
    //        let img = new Image();
    //        img.onload = function() {
    //            resolve(this);
    //        };
    //
    //        img.onerror = function() {
    //            reject(new Error('img error is' + url));
    //        };
    //        img.src = url;
    //    })
    //    return pro;
    //}
    ////拓扑图
    ///**
    // * @name    名字
    // * @x       x
    // * @y       y
    // * @spl     与下一个节点间连线是否分割
    // * @target  节点
    // * @size    0为默认大小 1为中等大小 2为最大
    // * @fristCornR  两条连线时第一条是否有是直角
    // * @target  节点
    // * @infoItemPos 悬浮框的位置
    // * null 元素代表换下一组
    // */
    //
    //
    //
    //this.ListMapData = [{name:'A',title:'柜面',x:235,y:112,spl:false,target:null},{name:'B',title:'图形前端',x:703,y:112,spl:true,target:null},{name:'C',title:'交易网关',x:1173,y:112,spl:true,target:null},{name:'D',title:'CTG',x:1644,y:184,spl:true,target:null,size:1},{name:'E',title:'CBOD',x:2149,y:364,spl:false,target:null,size:1,infoItemPos:0},{name:'EE',title:'加密平台',x:2149,y:543,spl:false,target:null,size:1,infoItemPos:3},
    //    null,{name:'F',title:'银联',x:235,y:202,spl:true,target:null},{name:'G',title:'银联AFE',x:702,y:235,spl:false,target:null},{name:'H',title:'卡AFA',x:1172,y:292,spl:true,target:null},{name:'I',title:'ESB',x:1644,y:543,spl:true,target:null,size:1},{name:'E',title:'CBOD',x:2149,y:364,spl:false,target:null,infoItemPos:0},
    //    null,{name:'J',title:'银联数据',x:236,y:271,spl:true,target:null},{name:'G',title:'银联AFE',x:702,y:235,spl:true,target:null},
    //    null,{name:'K',title:'ATM',x:236,y:337,spl:true,target:null},{name:'L',title:'ATMAFE',x:702,y:337,spl:true,target:null},{name:'H',title:'卡AFA',x:1172,y:292,spl:true,target:null},
    //    null,{name:'M',title:'POS',x:236,y:406,spl:true,target:null},{name:'N',title:'POSP',x:702,y:406,spl:true,target:null},
    //    null,{name:'O',title:'人行',x:236,y:496,spl:true,target:null},{name:'P',title:'人行AFE',x:702,y:496,spl:true,target:null},{name:'Q',title:'支付AFA',x:1172,y:565,spl:false,target:null},
    //    null,{name:'R',title:'超级网银',x:236,y:565,spl:true,target:null},{name:'S',title:'超级AFE',x:702,y:565,spl:true,target:null},{name:'Q',title:'支付AFA',x:1172,y:565,spl:false,target:null},{name:'I',title:'ESB',x:1644,y:543,spl:true,target:null},
    //    null,{name:'T',title:'农信银',x:236,y:634,spl:true,target:null},{name:'U',title:'农信银AFE',x:702,y:634,spl:true,target:null},{name:'Q',title:'支付AFA',x:1172,y:565,spl:true,target:null},
    //    null,{name:'UU',title:'苏南接入',x:236,y:727,spl:true,target:null},{name:'V',title:'苏南AFE',x:702,y:727,spl:true,target:null},{name:'W',title:'AFA',x:1172,y:727,spl:true,target:null},
    //    null,{name:'X',title:'网银',x:236,y:885,spl:true,target:null,fristCornR:true},{name:'Y',title:'个人网银(WAS)',x:702,y:817,spl:true,target:null},{name:'Z',title:'MCA',x:1172,y:885,spl:true,target:null},
    //    null,{name:'X',title:'网银',x:236,y:885,spl:true,target:null,fristCornR:true},{name:'A1',title:'企业网银(WAS)',x:702,y:885,spl:true,target:null},{name:'Z',title:'MCA',x:1172,y:885,spl:true,target:null},{name:'I',title:'ESB',x:1644,y:543,spl:true,target:null},
    //    null,{name:'X',title:'网银',x:236,y:885,spl:true,target:null,fristCornR:true},{name:'A2',title:'手机网银(WAS)',x:702,y:952,spl:true,target:null},{name:'Z',title:'MCA',x:1172,y:885,spl:true,target:null}
    //];
    //
    //var ww = 352;var hh = 261;
    //var b2 = {name:'B2',title:'图形前端（浦口）',x:703,y:421,spl:true,target:null,type:1};
    //var ff = {name:'FF',title:'ESB(河西)',x:1644,y:421,spl:false,target:null,type:1,size:2};
    //var gg = {name:'GG',title:'ESB(浦口)',x:1644,y:730,spl:false,target:null,type:1,size:2};
    //this.ListMapData2 = [{name:'A',title:'柜面',x:235,y:112,spl:true,target:null,type:1,fristCornR:true},{name:'B',title:'图形前端（河西）',x:703,y:112,spl:true,target:null,type:1},{name:'C',title:'交易网关',x:1173,y:112,spl:false,target:null,type:1},{name:'D',title:'CTG',x:1644,y:112,spl:true,target:null,type:1},{name:'E',title:'CBOD',x:2149,y:364,spl:false,target:null,type:0,size:1,infoItemPos:0},{name:'EE',title:'加密平台',x:2149,y:543,spl:false,target:null,type:0,size:1,infoItemPos:3},
    //    null,{name:'A',title:'柜面',x:235,y:112,spl:true,target:null,type:1,fristCornR:true},b2,{name:'C2',title:'交易网关（浦口）',x:1173,y:421,spl:true,target:null,type:1},{name:'D',title:'CTG',x:1644,y:112,spl:true,target:null,type:1},
    //    null,ff,
    //    null,gg
    //];
    //this.ListMapData2Apply = [{name:'B2GG',color:'rgb(38,140,178)',value:[b2.x + ww/2,b2.y+hh,b2.x+ww/2,gg.y+hh/2,gg.x,gg.y+hh/2]},
    //    {name:'B2FF',color:'rgb(38,140,178)',value:[b2.x + ww/2,b2.y+hh,b2.x+ww/2,gg.y+hh/2,gg.x-30,gg.y+hh/2,ff.x-30,ff.y+hh/2+20,ff.x,ff.y+hh/2+20]}
    //];
    //
    //Promise.all([loadImg('../assets/box.png'),loadImg('../assets/popBg.png')]).then(arr=>{
    //
    //    this.lisMap = new ListMap(arr);
    //    this.lisMap.scaleX= this.lisMap.scaleY = 0.3;
    //    this.lisMap.updata(this.ListMapData);
    //    stage.addChild(this.lisMap);
    //
    //
    //});
    //setTimeout(e=>{this.lisMap.getGroup('X-Y-Z-I-E-EE')},5000);
    ////
    //// setTimeout(e=>{this.lisMap.clear();this.lisMap.updata(this.ListMapData2,this.ListMapData2Apply)},10000);
    ////
    //// setTimeout(e=>{this.lisMap.getGroup('A-B-C-D-E-EE')},15000);
    //
    createjs.Ticker.addEventListener('tick',stage);


}
