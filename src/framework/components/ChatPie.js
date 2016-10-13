/**
 * Created by Administrator on 2016-06-03.
 */
import Base from  './Base.js';
import Tools from 'common/Tools.js';
import 'createjs.js';
import ObjectPool from 'common/ObjectPool.js';

class ChatPie extends Base{

  //长轴  短轴 数据 名称 颜色 透明度 是否将第二块突出  是否在图例中显示数值
  constructor(styleObj){
    super();

    this.a = 0;
    this.b = 0;
    this.h = 0;
    this.dataList = [];
    this.colorList = [];
    this.nameList = [];
    this.txtColor = '';//饼图上文字颜色
    this.lineColor = '';//饼图上延伸线颜色

    //解析样式
    this.setStyle(styleObj);
    this.style = styleObj;

    this.init();
  }

  updata(nameArr,dataArr){

    this.reset();
    this.init();
    this.dataList = dataArr;
    this.nameList = nameArr;
    this.createView();
  }

  init(){

    this._pie = {};
    this.sSp = ObjectPool.getObj('con');
    this.allSp = ObjectPool.getObj('con');
    this.legSp = ObjectPool.getObj('con');
    this.legSp.x  = this.a * 2.2;
    this.legSp.y -= this.b  + 30;
    this.tweenArr = [];

    this.addChild(this.allSp,this.legSp);
    this.allSp.addChild(this.sSp);
    this.allSpArr =[];
    this.poolArr = [this.sSp,this.allSp,this.legSp];
    this.angleList = [];
    this.totalData = 0;
    this.R = -90;
    this.isLeg = false;

  }
  createView(){

    this.angleCreat();
    this.pieCreat();

  }

  angleCreat(){

    var len = this.dataList.length;
    for (var i = 0; i < len; i++) {
      this.totalData+= this.dataList[i];

    }
    for (var j=0; j < len; j++) {
      if (j == len - 1) { this.angleList.push([this.R, 270]); }
      else {
        var r = Math.floor(this.dataList[j] / this.totalData * 360);
        var posR = this.R + r;
        this.angleList.push([this.R,posR]);
        this.R=posR;
      }
    }

  }

  pieCreat(){

    var len = this.angleList.length;

    var total = 0;
    this.dataList.forEach(function(a){total+=parseFloat(a)})
    var step = 1;
    let itemSp =ObjectPool.getObj('con');


    //console.log(_isT);
    for (var j=0; j < len; j++) {


      this.txtColor = "#fff";
      this.lineColor = "#fff";

      //console.log(angleList[j][0] + "---"+angleList[j][1]);
      //画饼图线
      var middleP = (this.angleList[j][0] + this.angleList[j][1])>>1;
      if(middleP < -88.5) middleP = -88.5;
      var X = this.getRPoint(0,0, this.a,this.b, middleP).x;
      var Y = this.getRPoint(0,0, this.a,this.b, middleP).y;

      let lineS = ObjectPool.getObj('shape');
      this.poolArr.push(lineS);
      lineS.graphics.clear();
      lineS.graphics.beginStroke(this.lineColor);
      lineS.graphics.setStrokeStyle("2");

      let drakColor = Tools.getDarkColor(this.colorList[j],0.2);//深色
      let prelabel = ObjectPool.getObj('txt');//名字
      let valueTxt = ObjectPool.getObj('txt');//数值

      this.poolArr.push(prelabel,valueTxt);

      var str = '';
      if(this.style.hasOwnProperty('leg')){

        str = ((this.dataList[j]/total) * 100).toFixed(2) + "%";
        let s = ObjectPool.getObj('shape');
        this.poolArr.push(s);
        s.graphics.clear();
        s.graphics.beginFill(drakColor);
        s.graphics.drawRect(0,0,this.style.leg.w,this.style.leg.w);
        s.graphics.endFill();
        s.y = j * 30;

        let fs = this.style.leg.size|0;
        let legStr = this.nameList[j] + "\t\t" + this.dataList[j];
        let txtTitle = this.getText(legStr,this.style.leg.color,fs,30,s.y - fs/4,this.style.leg.font);
        this.legSp.addChild(s,txtTitle);

        this.sSp.addChild(prelabel);
        this.allSpArr.push(prelabel);
        this.isLeg = true;
      }
      else{
        str = this.nameList[j];

        let valueStr = ((this.dataList[j]/total) * 100).toFixed(2) + "%";
        valueTxt.color = this.txtColor;
        valueTxt.text = valueStr;
        valueTxt.font = this.txtSize + 'px ' + this.txtFont;

        itemSp.addChild(lineS,prelabel,valueTxt);
        this.allSpArr.push(lineS,prelabel,valueTxt);
        itemSp.alpha = 0;
      }

      prelabel.color = this.txtColor;
      prelabel.text = str;
      prelabel.font = this.txtSize + 'px ' + this.txtFont;
      prelabel.name = 'pre_l';

      // console.log(middleP);
      lineS.graphics.moveTo(X,Y);

      var txtW = prelabel.getMeasuredWidth();
      var txtH = prelabel.getMeasuredHeight();
      let f = 1;
      let tempM = middleP<0?middleP+360:middleP;
      let tempY = 0;
      if(0<=tempM&&tempM<=90){
        f = 0;
      }
      if(90<tempM&&tempM<=180) {
        f = -1;
        tempY = txtH;
      }
      if(180<tempM&&tempM<=270) f = -1;
      if(270<tempM&&tempM<360) {
        f = 0;
        tempY = -txtH;
      }

      //console.log(f,tempM,Math.cos(middleP));

      if(this.isLeg){
        prelabel.x = X + f * txtW;
        prelabel.y = Y + f * txtH + tempY;
        if ((middleP > 0 && middleP <= 90)||(middleP > 90 && middleP < 180)) prelabel.y = Y + f * txtH + tempY + this.h/2;

      }
      else{

        let valueW = valueTxt.getMeasuredWidth();
        let valueH = valueTxt.getMeasuredHeight();

        if (middleP >0 && middleP <= 90)
        {
          lineS.graphics.lineTo(X + 20,Y+40);
          lineS.graphics.lineTo(X + 90,Y+40);
          prelabel.x = X + 90 - txtW - 5;
          prelabel.y = Y + 40 - txtH - 5;
          valueTxt.x = X + 90 - valueW - 5;
          valueTxt.y = Y + 40;

        }
        else if (middleP > 90 && middleP <= 180)
        {
          lineS.graphics.lineTo(X - 20,Y+40);
          lineS.graphics.lineTo(X - 90,Y+40);
          prelabel.x = X - 90;
          prelabel.y = Y + 40 - txtH - 5;
          valueTxt.x = X - 90;
          valueTxt.y = Y + 40;
        }
        else  if(middleP >180 && middleP < 200){
          lineS.graphics.lineTo(X - 20,Y-40);
          lineS.graphics.lineTo(X - 90,Y-40);
          prelabel.x = X - 90;
          prelabel.y = Y - 40 - txtH - 5;
          valueTxt.x = X - 90;
          valueTxt.y = Y + 40;
        }
        else if(middleP >= 200 && middleP < 230){

          lineS.graphics.lineTo(X - 60,Y - 10);
          lineS.graphics.lineTo(X - 130,Y-10);
          prelabel.x = X - 130 - (txtW>>1);
          prelabel.y = Y  - 10  - (txtH>>1);

          prelabel.x = X - 130;
          prelabel.y = Y - 10 - txtH - 5;
          valueTxt.x = X - 130;
          valueTxt.y = Y - 10;

        }
        else if(middleP >= 230 && middleP < 245){

          lineS.graphics.lineTo(X - 50,Y);
          lineS.graphics.lineTo(X -120,Y);

          prelabel.x = X - 120;
          prelabel.y = Y - txtH - 5;
          valueTxt.x = X - 120;
          valueTxt.y = Y;

        }
        else if(middleP >= 245 && middleP < 255){

          lineS.graphics.lineTo(X - 40,Y -25);
          lineS.graphics.lineTo(X - 110,Y-25);

          prelabel.x = X - 110;
          prelabel.y = Y - 25 - txtH - 5;
          valueTxt.x = X - 110;
          valueTxt.y = Y - 25;

        }
        else if(middleP >= 255 && middleP <= 268){

          lineS.graphics.lineTo(X - 15,Y-60);
          lineS.graphics.lineTo(X - 85,Y-60);

          prelabel.x = X - 85;
          prelabel.y = Y - 25 - txtH - 5;
          valueTxt.x = X - 85;
          valueTxt.y = Y - 60;

        }
        else if(middleP > 268 && middleP <= 270){

          lineS.graphics.lineTo(X + 15,Y-80);
          lineS.graphics.lineTo(X + 85,Y-80);

          prelabel.x = X + 85 - txtW - 5;
          prelabel.y = Y - 80 - txtH - 5;
          valueTxt.x = X + 85 - valueW - 5;
          valueTxt.y = Y - 80;


        }
        else if (middleP >= -90 && middleP < 0)
        {
          lineS.graphics.lineTo(X+20,Y-34);
          lineS.graphics.lineTo(X + 90,Y-34);
          prelabel.x = X + 90 - txtW - 5;
          prelabel.y = Y - 34 - txtH - 5;
          valueTxt.x = X + 90 - valueW - 5;
          valueTxt.y = Y - 34;
        }
        else if (middleP == 0)
        {
          lineS.graphics.lineTo(X+20,Y-40);
          lineS.graphics.lineTo(X + 90,Y-40);
          prelabel.x = X + 90 - txtW - 5;
          prelabel.y = Y - 40 - txtH - 5;
          valueTxt.x = X + 90 - valueW - 5;
          valueTxt.y = Y - 40;
        }
      }


      //画饼图具体内容
      var s = ObjectPool.getObj('shape');
      this.poolArr.push(s);
      s.graphics.clear();
      this._pie["shape"+j]=s;
      var g = s.graphics;
  //				if (_line) { g.setStrokeStyle(1); }
      //先画底
      //内弧
      g.beginFill(this.colorList[j]);
      g.moveTo(0,this.h);

      var r = this.angleList[j][0];
      var minR = r;
      var maxR = this.angleList[j][1];

      let _a = this.a;
      let _b = this.b;
      let _h = this.h;

      while (r + step < maxR) {
        g.lineTo(this.getRPoint(0,_h,_a,_b,r).x,this.getRPoint(0,_h,_a,_b,r).y);
        r+= step;
      }
      g.lineTo(this.getRPoint(0,_h,_a,_b,maxR).x,this.getRPoint(0,_h,_a,_b,maxR).y);
      g.endFill();
      //画内侧面
      g.beginFill(drakColor);
      g.moveTo(0,_h);
      g.lineTo(this.getRPoint(0,_h,_a,_b,minR).x,this.getRPoint(0,_h,_a,_b,minR).y);
      g.lineTo(this.getRPoint(0,0,_a,_b,minR).x,this.getRPoint(0,0,_a,_b,minR).y);
      g.lineTo(0,0);
      g.endFill();
      //画外侧面
      g.beginFill(drakColor);
      g.moveTo(0,_h);
      g.lineTo(this.getRPoint(0,_h,_a,_b,maxR).x,this.getRPoint(0,_h,_a,_b,maxR).y);
      g.lineTo(this.getRPoint(0,0,_a,_b,maxR).x,this.getRPoint(0,0,_a,_b,maxR).y);
      g.lineTo(0,0);
      g.endFill();
      //画外弧侧面
      g.beginFill(drakColor);
      g.moveTo(this.getRPoint(0,_h,_a,_b,minR).x,this.getRPoint(0,_h,_a,_b,minR).y);
      g.lineTo(this.getRPoint(0,0,_a,_b,minR).x,this.getRPoint(0,0,_a,_b,minR).y);
      r=minR;
      while (r + step < maxR) {
        r+= step;
        g.lineTo(this.getRPoint(0,0,_a,_b,r).x,this.getRPoint(0,0,_a,_b,r).y);
      }
      g.lineTo(this.getRPoint(0,0,_a,_b,maxR).x,this.getRPoint(0,0,_a,_b,maxR).y);
      g.lineTo(this.getRPoint(0,_h,_a,_b,maxR).x,this.getRPoint(0,_h,_a,_b,maxR).y);
      while (r - step > minR) {
        g.lineTo(this.getRPoint(0,_h,_a,_b,r).x,this.getRPoint(0,_h,_a,_b,r).y);
        r-= step;
      }
      g.lineTo(this.getRPoint(0,_h,_a,_b,minR).x,this.getRPoint(0,_h,_a,_b,minR).y);
      g.endFill();
      //画上表面
      g.beginFill(this.colorList[j]);
      g.moveTo(0,0);
      r=minR;
      while (r + step < maxR) {
        g.lineTo(this.getRPoint(0,0,_a,_b,r).x,this.getRPoint(0,0,_a,_b,r).y);
        r+= step;
      }//end while
      g.lineTo(this.getRPoint(0,0,_a,_b,maxR).x,this.getRPoint(0,0,_a,_b,maxR).y);
      g.endFill();


      this.sSp.addChild(s);
      this.allSpArr.push(s);
      this.allSp.addChild(itemSp);
      if(this.open) {
        this.tweenArr.push(s,prelabel,itemSp);
        this.setOut(s,this.style.hasOwnProperty('leg')?prelabel:itemSp,this.getRPoint(0, 0, 15, 15, middleP).x, this.getRPoint(0, 0, 15, 15, middleP).y);
      }


    }


    // this.allSp.addChild(this.sSp);
    // this.allSpArr.push(this.sSp);
    this.pieDepth();


  }

  setOut(mc,mc1,x,y)
  {
    var posX = x;
    var posY = y;

    // mc.x = posX;
    // mc.y = posY;

    createjs.Tween.get(mc).to({x:posX,y:posY}, 800).call(function(){
      createjs.Tween.removeTweens(this);
    });

    //单独文本时
    if(mc1.name === 'pre_l'){
      posX = posX + mc1.x;
      posY = posY + mc1.y;
      createjs.Tween.get(mc1).to({x:posX,y:posY}, 800).call(function(){
        createjs.Tween.removeTweens(this);
      });
    }
    else{
      posX = mc1.x;
      posY = mc1.y;
      createjs.Tween.get(mc1).wait(900).to({alpha:1}, 800).call(function(){
        createjs.Tween.removeTweens(this);
      });
    }



  }

  getText(str,color,size,_x,_y,$font){

    // 黑体：SimHei
    // 宋体：SimSun
    // 新宋体：NSimSun
    // 仿宋：FangSong
    // 楷体：KaiTi
    // 仿宋_GB2312：FangSong_GB2312
    // 楷体_GB2312：KaiTi_GB2312
    // 微软雅黑体：Microsoft YaHei

    color = color||"#ffffff";
    size = size||20;
    _x = _x||0;
    _y = _y||0;
    $font = $font||'Microsoft YaHei';

    let txt = ObjectPool.getObj('txt');
    this.poolArr.push(txt);
    txt.color = color;
    txt.font = size + "px " + $font;
    txt.text = '' + str;
    txt.x = _x;
    txt.y = _y;

    return txt;
  }

  pieDepth(){

    var depthList=[];
    var indexList = [];//取得原来位置的索引
    var temp = [];

    var len = this.angleList.length;
    for (var j=0; j < len; j++) {
      var minJ=this.angleList[j][0];
      var maxJ=this.angleList[j][1];


      switch (true) {
        case minJ >= -90 && minJ <= 90 && maxJ<=90 :
          depthList[j]=minJ;
          break;
        default :
          depthList[j]=1000-minJ;
      }
    }

    temp = depthList.slice();
    depthList.sort(function s(a,b){return a - b});

    depthList.forEach(function getIndex(a){

      if(temp.indexOf(a)>-1){
        indexList.push(temp.indexOf(a));
      }

    })

    for (var i=0; i<len; i++) {

      this.sSp.setChildIndex(this._pie["shape"+indexList[i]],i);
    }

  }

  //读取属性
  setStyle(obj){

    for(var str in obj){
      this[str] = obj[str];
    }

  }

  getRPoint(x0,y0,a,b,r) {
    r=r * Math.PI / 180;
    return {x:Math.cos(r) * a + x0,y:Math.sin(r) * b + y0};
  }

  //重置
  reset(){

    ObjectPool.returnObj(this.poolArr);
    if(this.allSpArr&&this.angleList) this.allSpArr.length = this.angleList.length = 0;
    else return;
    this.removeAllChildren();
    let l = this.tweenArr.length;
    let i = 0;
    for(;i<l;i++){
      createjs.Tween.removeTweens(this.tweenArr[i]);
    }

  }

  //清除
  clear(){
    this.reset();
    Tools.clearProp(this);
  }

}
export default ChatPie;
