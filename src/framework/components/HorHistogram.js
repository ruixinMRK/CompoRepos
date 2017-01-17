
import Base from './Base.js';
import Tools from '../../tools/Tools';
import ObjectPool from '../../tools/ObjectPool';
import Timer from '../../tools/Timer';

class HorHistogram extends Base{

  constructor(styleObj){
    super();

    this.w = 400;
    this.h = 300;
    this.oneNum = 0;//每页显示个数(限制每页的显示个数，由外界传参,如果不传按顺序排下)
    this.dataVis = false;
    this.sort = false;
    this.yVis = false;

    //解析样式
    this.setStyle(styleObj);

    //存储动画显示对象
    this.tweenArr = [];
    // this.pageNum = 1;//页数

    if(this.oneNum) this.ySpace = this.h/this.oneNum;
    else this.ySpace = this.h/this.dataArr.value.length;

    //分别存储数据和y轴
    this.yData = [];
    this.grapData = [];

    //算出总页数

    this.turnTimer = '';
    this.allData = this.dataArr.value;
    this.resetPageProp();
    this.totalNum>1?this.turnTimer = Timer.add(this.turnPage,this.turnTime||5000,0,true):this.updata(this.allData);

  }

  turnPage = a => {

    ++this.currentId>this.totalNum-1?this.currentId=0:'';
    this.updata();

  }

  //重置柱子属性
  resetPageProp = a=>{

    this.currentId = -1;
    this.totalNum =  this.oneNum!=0?Math.ceil(this.allData.length/this.oneNum):1;

  }

  updata(arr){

    //如果是外部传参,且页数大于1时,将数据隐藏
    if(arr&&this.totalNum>1){
      this.allData = arr;
      this.resetPageProp();
      this.totalNum==1?(this.updata(this.allData),Timer.clear(this.turnTimer)):'';
      return;
    }

    this.reset();
    //截取数据
    console.log(this.currentId);;
    this.parseData(this.totalNum===1?arr:(Tools.clone(this.allData).splice(this.currentId*this.oneNum,this.currentId*(this.oneNum+1)>this.allData.length-1?this.allData.length-this.currentId*this.oneNum:this.oneNum)));
    this.init();


  }

  parseData(arr){

    console.log(arr);
    //数组排序
    if(this.sort) {
      arr.sort((a,b)=>{
        return b['value'] - a['value']
      })
    }

    arr.forEach(obj=>{

      for(var a in obj){
        if(a == 'name') this.yData.push(obj[a]);
        if(a == 'value') this.grapData.push(obj[a]);
      }

    })

  }

  init(){


    this.drawYTxt(this.yData);

    //console.log(this.grapData);
    let dataAC = this.grapData.slice();
    dataAC.sort((a,b)=>{return a - b});

    this.dataMax = 1;
    dataAC.length&&(dataAC[dataAC.length-1]>0)&&(this.dataMax = dataAC[dataAC.length-1]);


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

    this.drawPost(this.grapData);

  }

  drawPost(arr){


    if(this.waring){
      let w = (+this.waring.value)/this.xDataMax * (this.xSpace * 5) + this.txtMaxL;
      this.waringShape = ObjectPool.getObj('shape');
      this.addChild(this.drawLine(this.waringShape,[w,0-this.yArr.size/2,w,this.h-this.yArr.size/2],this.waring.lineColor,1,false,null,0,true));
    }

    for(let i =0 ;i<arr.length;i++){

      let w = arr[i]/this.xDataMax * (this.xSpace * 5);

      let color = '#fff';
      if(this.waring&&arr[i]<(+this.waring.value)) color = this.waring.zzColor;
      else color = this.dataArr.color;
      if(w<=2) w =2;

      //柱体
      let rect = this.drawRect(w,this.dataArr.zw,color,0,this.dataArr.zr||0,this.dataArr.zr||0,0);
      rect.y = this.ySpace * i - (this.dataArr.zw - this.yArr.size)/2 + 2;
      rect.x = this.txtMaxL ;
      rect.scaleX = 0;


      let dataTxt = null;
      //柱子后的文字
      if(this.dataVis) {
        dataTxt = this.getTxt(arr[i],this.dataArr.txtColor,this.dataArr.size,this.txtMaxL + w + 10,rect.y,'',this.dataArr.font);
        dataTxt.alpha = 0;
      }
      this.addChild(rect,dataTxt);
      this.tweenArr.push(rect,dataTxt);

    }
    this.tweenNext();
  }

  tweenNext(top = true){

    let L = this.tweenArr.length;
    let i = top?0:1;
    let t = 1;

    for(;i<L;i+=2){

      let obj = this.tweenArr[i];
      if(obj ==null) continue;
      createjs.Tween.get(obj).to(top?{scaleX:1}:{alpha:1}, 1500).call(b=>{
        createjs.Tween.removeTweens(b);
        t?top?(this.tweenNext(false),t=0):'':'';
      });

    }

  }

  drawXTxt(arr){

    for(let i = 1;i<arr.length;i++){

      var txt = this.getTxt(arr[i],this.xArr.color,this.xArr.size,0,0,'');
      txt.x = this.txtMaxL + this.xSpace * i - txt.getMeasuredWidth()/2;
      txt.y = -txt.getMeasuredHeight() - 5;

      this.addChild(txt);

    }

  }

  drawYTxt(arr){

    this.txtMaxL = 0;
    for(let i = 0;i<arr.length;i++){

      var txt = this.getTxt(arr[i],this.yArr.color,this.yArr.size,0,0,'',this.yArr.font);
      txt.y = this.ySpace * i;
      this.addChild(txt);
      this.txtMaxL = this.txtMaxL>txt.getMeasuredWidth()?this.txtMaxL:txt.getMeasuredWidth();
      txt.x = this.txtMaxL - txt.getMeasuredWidth();
    }

    if(this.yTitle){
      let txtTitle = this.getTxt(this.yTitle.value,this.yTitle.color,this.yTitle.size,0,0,'',this.yTitle.font);
      txtTitle.y -= txtTitle.getMeasuredHeight() + 10;
      this.addChild(txtTitle);
    }

    //画Y轴
    // if(this.yAxis.parent) this.yAxis.parent.removeChild(this.yAxis);
    if(this.yVis){
      this.yAxis = ObjectPool.getObj('shape');
      this.drawLine(this.yAxis,[this.txtMaxL+15,-this.dataArr.zw/2 - 5,this.txtMaxL+15,this.h-this.dataArr.zw/2],'#fff',1);
    }


    this.txtMaxL+=15;
  }



  //重置
  reset(){

    this.tweenArr.forEach( a =>{createjs.Tween.removeTweens(a);})

    this.removeAllChildren();

    ObjectPool.returnObj(this.poolArr);

    this.poolArr.length = this.tweenArr.length = this.yData.length = this.grapData.length = 0;

  }


  clear(){
    this.reset();
    super.clear();
  }

}


export default HorHistogram;
