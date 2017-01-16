

//import createjs from "createjs";

import './libs/createjs.js';
import Histogram from  './framework/components/Histogram.js';
import PiPingDraw from  './framework/components/PiPingDraw.js';
import FixedXHistogram from  './framework/components/FixedXHistogram.js';
import ChatPie from  './framework/components/ChatPie.js';
import ProgressBar from './framework/components/ProgressBar';

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

    // this.currentA = [];
    // for(var i = 0;i<12;i++){
    //     this.currentA.push((300*Math.random())|0);
    // }
    //
    // this.currentB = [];
    //
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


    // let pieStyle = {
    //     a:90,
    //     b:50,
    //     h:20,
    //     open:true,
    //     colorList:["#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa"],
    //     dataList:[50,50,50,150],
    //     nameList:['w','h','ww','ee'],
    //     txtColor:'#fff',
    //     lineColor:'#fff',
    //     txtSize:16,
    //     txtFont:'微软雅黑',
    // }
    //
    // this.pie1 = new ChatPie(pieStyle);
    // this.pie1.createView();
    // this.pie1.x = 200;
    // this.pie1.y = 210;
    // stage.addChild(this.pie1);


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
    //var ts = new TextString({
    //    left:10,
    //    top:10,
    //    gapH:10,
    //    gapV:10,
    //    dir:"h",
    //    itemW:100,
    //    itemH:30,
    //    font:"15px 微软雅黑",
    //    color:"#000000",
    //    textAlign:"left",
    //    value:"",
    //    itemsStyle:
    //        [{valueField:"v1",font:"15px 微软雅黑",color:"#ff0000",value:"text1",textAlign:"left",width:100,height:30},
    //            {valueField:"v2",font:"15px 微软雅黑",color:"#000000",value:"text2",textAlign:"left",width:100,height:30},
    //            {valueField:"v3",font:"15px 微软雅黑",color:"#000000",value:"text3",textAlign:"left",width:100,height:30}],
    //});
    //ts.setData({v1:1,v2:2,v3:3});
    //stage.addChild(ts);
//============================ end 测试TextString

    //============================测试 TextDoubleState的代码
    //var tds = new TextDoubleState(
    //{
    //      text:"",
    //      width:100,
    //      height:30,
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
    //      bgUnselectedAlpha:0.01
    //  }
    //);
    //tds.setData({a:"aaa",b:"bbb"},"b");
    ////tds.text = "bbb";
    //tds.selected = true;
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
    //var arr = [];
    //var tds0 = new TextDoubleState(o);tds0.text = "relCons";
    //for(var i=0;i<10;i++){
    //    var tds = new TextDoubleState(o);tds.text = i+1;
    //    arr.push(tds);
    //}
    //
    //var m = new MenuTile({
    //      items:arr,
    //      dir:"h",
    //      groupCount:3,
    //      itemW:100,
    //      itemH:30,
    //      gapH:10,
    //      gapV:10,
    //      selectedIndex:0,
    //      trigger:"click",
    //      blLoop:true,
    //      loopTime:1000,
    //      blMouseRelCon:true,
    //      relCons:[tds0]
    //});
    //m.x = 100;m.y = 100;
    //stage.enableMouseOver(60);
    //stage.addChild(tds0,m);
//============================end 测试 MenuTile的代码

    //============================测试 PageList的代码
//
//var p = new PageList({width:400,height:300,listItemClass:ExpItem,listCount:3,listItemTriggle:"click",pageTiggle:"click",pageBLLoop:true,pageLoopTime:2000});
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

    createjs.Ticker.addEventListener('tick',stage);


}
