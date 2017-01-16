/**
 * Created by Administrator on 2016-06-03.
 */
import Base from  './Base.js';
import Tools from '../../tools/Tools.js';
import ObjectPool from '../../tools/ObjectPool';
import '../../libs/createjs.js';

class ChatPie extends Base{

  //长轴  短轴 数据 名称 颜色 透明度 是否将第二块突出  是否在图例中显示数值
  constructor(styleObj){
    super();
    
    this.a = 0;
    this.b = 0;
    this.h = 0;
    this.dataList = [];
    this.colorList = ["#5c7fa2","#6f8ba7","#8ba4bd","#a0c1d4","#c8dfec","#d8e5ee","#f8f8fa"];
    this.nameList = [];
    this.txtColor = '';//饼图上文字颜色
    this.lineColor = '';//饼图上延伸线颜色
    this.R = 50;//起始位置

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

    this._pie = [];
    this.sSp = ObjectPool.getObj('con');
    this.allSp = ObjectPool.getObj('con');
    this.legSp = ObjectPool.getObj('con');
    this.legSp.x  = this.a * 2.2;
    this.legSp.y -= this.b  + 30;
    this.tweenArr = [];

    this.addChild(this.allSp,this.legSp);
    this.allSp.addChild(this.sSp);

    this.poolArr.push(this.sSp,this.allSp,this.legSp);
    this.angleList = [];
    this.totalData = 0;

    this.RG = this.R + 360;//结束位置

  }
  createView(){

    this.angleCreat();
    this.pieCreat();

  }

  //计算饼块 起始到结尾
  angleCreat(){

    var len = this.dataList.length;
    for (var i = 0; i < len; i++) {
      this.totalData+= this.dataList[i];

    }
    for (var j=0; j < len; j++) {
      var r = Math.floor(this.dataList[j] / this.totalData * 360);
      var posR = this.R + r;
      this.angleList.push([this.R,j==len-1?this.RG:posR]);
      this.R=posR;
    }

  }

  pieCreat(){

    var len = this.angleList.length;

    var total = 0;
    this.dataList.forEach(function(a){total+=parseFloat(a)})
    var step = 1;
    let itemSp =ObjectPool.getObj('con');

    for (var j=0; j < len; j++) {

      //饼块中间值
      var middleP = (this.angleList[j][0] + this.angleList[j][1])>>1;

      var X = this.getRPoint(0,0, this.a,this.b, middleP).x;
      var Y = this.getRPoint(0,0, this.a,this.b, middleP).y;

      let drakColor = Tools.getDarkColor(this.colorList[j],0.2);//深色
      let prelabel = ObjectPool.getObj('txt');//名字


      this.poolArr.push(prelabel);

      var str = '';
      prelabel.color = this.txtColor||"#fff";
      prelabel.font = this.txtSize + 'px ' + this.txtFont;
      prelabel.name = 'pre_l';

      //水平线为0时的,作为基准点
      let resetMidPon = middleP%360>0?(middleP%360):(middleP%360 + 360);
      let resetStartPon = this.angleList[j][0]%360>0?(this.angleList[j][0]%360):(this.angleList[j][0]%360 + 360);
      let resetMidCos = Math.cos(resetMidPon * Math.PI /180);
      let resetMidSin = Math.sin(resetMidPon * Math.PI /180);

      // console.log(resetMidPon,resetMidCos,resetMidSin);

      var txtW = 0;

      //判断是否有图例,处理不同的情况
      if(this.style.hasOwnProperty('leg')){

        str = ((this.dataList[j]/total) * 100).toFixed(2) + "%";
        prelabel.text = str;

        txtW = prelabel.getMeasuredWidth();
        let w = this.style.leg.w||5;

        let s = this.drawRect(w,this.style.leg.w||5,drakColor);
        s.y = j * 30;

        //图例
        let legStr = this.nameList[j] + "\t\t" + this.dataList[j];
        let txtTitle = this.getTxt(legStr,this.style.leg.color,this.style.leg.size|0,30,s.y- w/2,this.style.leg.font);
        this.legSp.addChild(s,txtTitle);

        this.sSp.addChild(prelabel);

        let txtH = prelabel.getMeasuredHeight();
        prelabel.x = X + (resetMidCos<0?-txtW:5);
        prelabel.y = Y + resetMidSin * txtH + (resetMidSin>0?3:-2);

      }
      else{
        str = this.nameList[j];
        prelabel.text = str;

        txtW = prelabel.getMeasuredWidth();
        //线条
        let lineS = ObjectPool.getObj('shape');
        lineS.graphics.beginStroke(this.lineColor||"#fff");
        lineS.graphics.setStrokeStyle("1");
        this.poolArr.push(lineS);

        lineS.graphics.moveTo(X,Y);

        //数据百分比
        let valueStr = ((this.dataList[j]/total) * 100).toFixed(2) + "%";
        let valueTxt = ObjectPool.getObj('txt');//数值
        valueTxt.color = this.txtColor||"#fff";
        valueTxt.text = valueStr;
        valueTxt.font = this.txtSize + 'px ' + this.txtFont;
        this.poolArr.push(valueTxt);

        itemSp.addChild(lineS,prelabel,valueTxt);
        itemSp.alpha = 0;

        //计算线上文字数据的位置和画线的算法
        let valueW = valueTxt.getMeasuredWidth();
        let valueH = valueTxt.getMeasuredHeight();

        let space = this.h * 1.9;
        lineS.graphics.lineTo(X + resetMidCos * space,Y + resetMidSin * space);
        lineS.graphics.lineTo(X + resetMidCos * space + (resetMidCos>0?15:-15),Y + resetMidSin * space);

        prelabel.text += ':';
        prelabel.x = X + resetMidCos * space + (resetMidCos>0?15 + 5:-20 - valueW - txtW);
        prelabel.y = Y + resetMidSin * space - valueH/2;
        valueTxt.x = prelabel.x + (resetMidCos>0?txtW + 5:txtW+5);
        valueTxt.y = Y + resetMidSin * space - valueH/2;

      }

      //画饼图具体内容
      var s = ObjectPool.getObj('shape');
      this.poolArr.push(s);

      let obj = {};
      obj.target = s;
      obj.mid = resetMidPon;
      obj.start = resetStartPon;
      this._pie[j]=obj;

      var g = s.graphics;

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
      this.allSp.addChild(itemSp);

      if(this.open) {
        this.tweenArr.push(s,prelabel,itemSp);
        let space = this.h/4 * 2.5;
        this.setOut(s,this.style.hasOwnProperty('leg')?prelabel:itemSp,this.getRPoint(0, 0, space, space, middleP).x, this.getRPoint(0, 0, space, space, middleP).y);
      }


    }

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
      createjs.Tween.get(mc1).wait(900).to({alpha:1}, 800).call(function(){
        createjs.Tween.removeTweens(this);
      });
    }



  }

  pieDepth(){

    this.right = [];
    this.left = [];

    let n = 0;
    let N = this._pie.length;

    let rt,rb,lb,lt;
    rt = [];
    rb = [];
    lb = [];
    lt = [];

    for(;n<N;n++){
      let item = this._pie[n];
      if(item.mid>0&&item.mid<=90) rb.push(item);
      else if(item.mid>90&&item.mid<=180){
        item.start<=90?rb.push(item):lb.push(item);
      }
      else if(item.mid>180&&item.mid<=270) lt.push(item);
      else if(item.mid>270&&item.mid<=360){
        item.start<=270?lt.push(item):rt.push(item);
      }
    }

    rb.sort(this.sortArr);
    lb.sort(this.sortArr);
    lt.sort(this.sortArr);
    rt.sort(this.sortArr);

    this.right.push(...rt,...rb);
    this.left.push(...lb,...lt);

    // let i = 0;
    // let L = this.left.length;
    for(let i=0,L =this.left.length;i<L;i++){
      let t  = this.left[i];
      t?(this.sSp.removeChild(t.target),this.sSp.addChildAt(t.target,0)):'';
    }

    let j = 0;
    let M = this.right.length;

    for(;j<M;j++){
      let t  = this.right[j];
      t?(this.sSp.removeChild(t.target),this.sSp.addChild(t.target)):'';
    }

  }

  sortArr = (a,b)=>{
    return a.mid - b.mid;
  }

  getRPoint(x0,y0,a,b,r) {
    r=r * Math.PI / 180;
    return {x:Math.cos(r) * a + x0,y:Math.sin(r) * b + y0};
  }

  //重置
  reset(){

    ObjectPool.returnObj(this.poolArr);
    if(this.angleList) this.angleList.length = 0;
    else return;
    this.removeAllChild();
    let l = this.tweenArr.length;
    let i = 0;
    this.poolArr = [];
    for(;i<l;i++){
      createjs.Tween.removeTweens(this.tweenArr[i]);
    }

    for(let i=0;i<this._pie.length;i++){
      let obj = this._pie[i];
      for(let str in obj){
        delete obj[str];
      }
    }
    this._pie = [];
  }

  //清除
  clear(){
    this.reset();
    super.clear();
  }

}
export default ChatPie;
