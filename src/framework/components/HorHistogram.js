
import Base from './Base.js';
import Tools from '../tools/Tools.js';
import ObjectPool from '../tools/ObjectPool';

class HorHistogram extends Base{

  constructor(styleObj){
    super();

    this.w = 400;
    this.h = 300;
    this.pageNum = 0;//是否分页显示
    this.oneNum = 0;//每页显示个数(限制每页的显示个数，由外界传参,如果不传按顺序排下)
    this.dataVis = false;
    this.sort = false;
    this.yVis = false;

    //解析样式
    this.setStyle(styleObj);

    this.yTxtArr = [];
    this.yTxtSp = new createjs.Container();
    this.xTxtArr = [];
    this.xTxtSp = new createjs.Container();
    this.allSp = new createjs.Container();
    this.postSp = new createjs.Container();
    this.postArr = [];

    this.dataTxtArr = [];
    this.dataTxtSp = new createjs.Container();

    if(this.oneNum!=0) this.ySpace = this.h/this.dataArr.value.length;
    else this.ySpace = this.h/this.oneNum;

    this.yAxis = new createjs.Shape();
    this.waringShape = new createjs.Shape();

    // console.log(this.ySpace);

    //分别存储数据和y轴
    this.yData = [];
    this.data = [];


    this.parseData(this.dataArr.value);

    this.init();

    this.addChild(this.allSp);
    this.allSp.addChild(this.yTxtSp,this.xTxtSp,this.postSp,this.dataTxtSp,this.yAxis,this.waringShape);


  }

  updata(arr){

    // console.log(this.yTxtSp.numChildren);
    this.reset();

    this.parseData(arr);

    this.init();
    this.addChild(this.allSp);
    this.allSp.addChild(this.yTxtSp,this.xTxtSp,this.postSp,this.dataTxtSp);
    // this.allSp.addChild(this.yTxtSp,this.xTxtSp,this.postSp,this.dataTxtSp);
  }

  parseData(arr){

    let arr1 = arr;
    //数组排序
    if(this.sort) {
      arr1.sort((a,b)=>{
        return b['value'] - a['value']
      })
    }

    arr1.forEach(obj=>{

      for(var a in obj){
        if(a == 'name') this.yData.push(obj[a]);
        if(a == 'value') this.data.push(obj[a]);
      }

    })

    // console.log(this.yData,this.data);

  }

  init(){


    this.drawYTxt(this.yData);

    //console.log(this.data);
    let dataAC = this.data.slice();
    dataAC.sort((a,b)=>{return a - b});
    this.dataMax = dataAC[dataAC.length-1];
    //if(this.maxAuto)

    //if(this.dataMax == 0) return;
      //x轴的绘图数据
    this.xDataArr = Tools.drawY(this.dataMax,0,5);
    // console.log(this.xDataArr);
    //x轴最大值
    this.xDataMax = this.xDataArr[this.xDataArr.length -1];

    //是否取本身最大值作为最大值
    if(this.maxAuto) this.xDataMax = this.dataMax;

    // console.log(this.xDataMax);

    if(this.dataVis) this.xSpace = (this.w - this.txtMaxL * 2)/5;
    else this.xSpace = (this.w - this.txtMaxL)/5;

    if(this.xArr) this.drawXTxt(this.xDataArr);

    this.drawPost(this.data);

  }

  drawPost(arr){

    if(this.waring){
      let w = (+this.waring.value)/this.xDataMax * (this.xSpace * 5) + this.txtMaxL;
      this.allSp.addChild(this.drawDash(this.waringShape,w,0-this.yArr.size/2,w,this.h-this.yArr.size/2,this.waring.lineColor,1,5,2));
    }

    for(let i =0 ;i<arr.length;i++){

      let w = arr[i]/this.xDataMax * (this.xSpace * 5);

      // let zz = new createjs.Shape();
      let zz = ObjectPool.getObj('shape');
      zz.graphics.clear();
      if(this.waring&&arr[i]<(+this.waring.value)) zz.graphics.beginFill(this.waring.zzColor);
      else zz.graphics.beginFill(this.dataArr.color);
      if(w<=2) w =2;
      // console.log(+this.waring.value,arr[i]);
      zz.graphics.drawRoundRectComplex(0,0,w,this.dataArr.zw,0,this.dataArr.zr||0,this.dataArr.zr||0,0);
      zz.y = this.ySpace * i - (this.dataArr.zw - this.yArr.size)/2 + 2;
      zz.x = this.txtMaxL ;
      zz.scaleX = 0;
      this.postSp.addChild(zz);
      this.postArr.push(zz);

      //柱子后的文字
      if(this.dataVis) {
        let dataTxt = this.drawTxt(arr[i],this.dataArr.size,this.dataArr.txtColor,this.dataArr.font);
        dataTxt.x = this.txtMaxL + w + 10;
        dataTxt.y = zz.y;
        dataTxt.alpha = 0;
        this.dataTxtSp.addChild(dataTxt);
        this.dataTxtArr.push(dataTxt);
      }

    }



    this.postArr.forEach( a =>{

      createjs.Tween.get(a).to({scaleX:1}, 1500).call(b=>{
        createjs.Tween.removeTweens(a);
        this.tweenTxt();
      });

    })


  }

  tweenTxt(){

    this.dataTxtArr.forEach( a =>{

      createjs.Tween.get(a).to({alpha:1}, 1000).call(function(){
        createjs.Tween.removeTweens(this);
      });
    })

  }

  drawXTxt(arr){

    for(let i = 1;i<arr.length;i++){

      var txt = this.drawTxt(arr[i],this.xArr.size,this.xArr.color);
      txt.x = this.txtMaxL + this.xSpace * i - txt.getMeasuredWidth()/2;
      txt.y = -txt.getMeasuredHeight() - 5;

      this.xTxtArr.push(txt);
      this.xTxtSp.addChild(txt);

    }

  }

  drawYTxt(arr){

    this.txtMaxL = 0;
    for(let i = 0;i<arr.length;i++){

      var txt = this.drawTxt(arr[i],this.yArr.size,this.yArr.color,this.yArr.font);
      txt.y = this.ySpace * i;
      // txt.x = 50 - txt.getMeasuredWidth();
      this.yTxtArr.push(txt);
      this.yTxtSp.addChild(txt);
      this.txtMaxL = this.txtMaxL>txt.getMeasuredWidth()?this.txtMaxL:txt.getMeasuredWidth();

    }

    if(this.yTitle){
      var txtTitle = this.drawTxt(this.yTitle.value,this.yTitle.size,this.yTitle.color,this.yTitle.font);
      txtTitle.y -= txtTitle.getMeasuredHeight() + 10;
      this.yTxtSp.addChild(txtTitle);
    }
    //y轴设置位置
    this.yTxtArr.forEach(a=>{
      a.x = this.txtMaxL - a.getMeasuredWidth();
    })

    //画Y轴
    // if(this.yAxis.parent) this.yAxis.parent.removeChild(this.yAxis);
    if(this.yVis) this.drawLine(this.yAxis,[this.txtMaxL+15,-this.dataArr.zw/2 - 5,this.txtMaxL+15,this.h-this.dataArr.zw/2],'#fff',1);

    this.txtMaxL+=15;
  }

  //绘制文字
  drawTxt(str,numx,color1,font){

    let color = color1||"#ffffff";
    font = font||'Microsoft YaHei';
    // var txt = new createjs.Text(str,numx + "px " + font,color);
    let txt = ObjectPool.getObj('txt');
    txt.text = str;
    txt.font = numx + "px " + font;
    txt.color = color;
    return txt;
  }

  //读取属性
  setStyle(obj){

    for(var str in obj){
      // console.log(str,obj[str]);
      this[str] = obj[str];
    }

  }

  //清空
  reset(){

    this.postArr.forEach( a =>{
        createjs.Tween.removeTweens(a);
    })

    this.dataTxtArr.forEach( a =>{
        createjs.Tween.removeTweens(a);
    })

    for(let str in this){
      let obj = this[str];
      if(!super[str]&&Array.isArray(this[str])){
        obj.length = 0;
      }
    }


    // this.yTxtSp.removeAllChildren();
    // this.xTxtSp.removeAllChildren();
    // this.postSp.removeAllChildren();
    // this.dataTxtSp.removeAllChildren();
    this.recove(this.yTxtSp);
    this.recove(this.xTxtSp);
    this.recove(this.postSp);
    this.recove(this.dataTxtSp);
    this.removeAllChildren();
    // this.resetSp(this.allSp);

  }

  //回收对象
  recove(sp){
    while(sp.numChildren){
      ObjectPool.returnObj(sp.getChildAt(0));
      sp.removeChildAt(0);
    }

  }

  clear(){
    this.reset();
    Tools.clearProp(this);
  }
  resetSp(sp){

    if (sp.hasOwnProperty('numChildren')){

      if(sp.getChildAt(0).hasOwnProperty('numChildren') ){
        if(sp.parent) this.resetSp(sp);
      }

    }
    else{
      if(sp.parent) sp.parent.removeChild(sp);
    }

  }

}


export default HorHistogram;
