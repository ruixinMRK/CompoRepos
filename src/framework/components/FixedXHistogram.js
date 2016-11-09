/**
 * Created by Administrator on 2016/8/2 0002.
 */


import Base from  './Base.js';
import Tools from '../../tools/Tools.js';
import ObjectPool from '../../tools/ObjectPool';

//x轴固定的线图
class FixedXHistogram extends Base{

    constructor(styleObj){
        super();

        this.w = 400;
        this.h = 300;

        this.dataMax = 0;
        this.yDataMax = 0;
        this.yDataArr = [];
        this.xTxtArr = [];
        this.yNum = 5;

        //解析样式
        this.setStyle(styleObj);

        //记录id和lineType的匹配,为后面的重绘
        this.dataObjArr = [];
        //记录传进来的样式
        this.style = styleObj.lineArr;

        //以下为不会更新数据
        //可以画的宽和高
        this.availW = this.w/20*19;
        this.availH = this.h/20*19;

        //x轴的个数
        this.xCounts = this.xAxis.value.length;
        //x轴的间距
        this.xSpace = this.availW/(this.xCounts-1);

        //判断是单独的数据还是数据是对象包含time
        this.TimeData = true;
        this.TimeData = typeof(styleObj.lineArr[0].value[0]) === 'object'?true:false;

        this.init(styleObj.lineArr);


    }

    init(data){

        // console.log('updata');
      //画x轴,y轴
      let yAxis = this.drawLine(ObjectPool.getObj('shape'),[0,0,0,this.h],this.yAxis['lineColor'],this.yAxis['thickness']);
      let xAxis = this.drawLine(ObjectPool.getObj('shape'),[0,this.h,this.w,this.h],this.xAxis['lineColor'],this.xAxis['thickness']);
      //画轴三角
      let yAxisThree = this.drawLine(ObjectPool.getObj('shape'),[-5,0,5,0,0,-12],'rgba(0,0,0,0)',1,true,'#ccc');
      let xAxisThree = this.drawLine(ObjectPool.getObj('shape'),[this.w,this.h-5,this.w,this.h+5,this.w+12,this.h],'rgba(0,0,0,0)',1,true,'#ccc');

      //遮罩动画
      this.maskS = ObjectPool.getObj('shape');
      this.maskS.graphics.beginFill('#fff');
      this.maskS.graphics.drawRect(0,0,this.w+10,this.h);
      this.maskS.graphics.endFill();
      this.maskS.scaleX = 0;

      this.dataSp = ObjectPool.getObj('con');
      this.bgSp = ObjectPool.getObj('con');
      this.dataSp.mask = this.maskS;
      let defaultSp = ObjectPool.getObj('con');

      this.poolArr.push(this.bgSp,this.dataSp,this.maskS,defaultSp);

      defaultSp.addChild(yAxis,xAxis,yAxisThree,xAxisThree);

      this.addChild(defaultSp,this.dataSp,this.bgSp);

      this.getAnimTime();
      this.checkData(data);
      this.drawXTxt();
      this.createView();

    }

    createView(){

        if(this.yMax){
          //y轴的绘图数据
          this.yDataArr = [0,20,40,60,80,100];
          //y轴最大值
          this.yDataMax = 100;
        }
        else{
          //y轴的绘图数据
          this.yDataArr = Tools.drawY(this.dataMax,0,this.yNum);
          //y轴最大值
          this.yDataMax = this.yDataArr[this.yDataArr.length -1];
        }
        //y轴间距
        this.ySpace = this.availH/this.yNum;

        //画y轴
        this.drawYTxt();

        //循环绘图
        this.dataObjArr.forEach((a,i) => {
            this.drawDataLine(a,this.style[i]);
        })



        createjs.Tween.get(this.maskS).to({scaleX:1}, 1000).call(function(){
          createjs.Tween.removeTweens(this);
        });

    }

    getAnimTime(){

      let min = this.xAxis.value[0]|0;
      let max = this.xAxis.value[this.xAxis.value.length-1]|0;
      this.minTime = this.getCTime(min);
      this.maxTime = this.getCTime(max);
      //console.log(min,max,this.minTime,this.maxTime);

    }

    getCTime(h){
      if(this.TimeData) return 1;
      let date1 = new Date();
      let date = new Date();
      date.setFullYear(date1.getFullYear());
      date.setMonth(date1.getMonth());
      date.setDate(date1.getDate());
      date.setHours(h);
      date.setMinutes('0');
      date.setSeconds('0');
      //console.log(date);
      return date.getTime();
    }

    drawYTxt(){

        let len = this.yDataArr.length;
        for(let i = 1;i<len;i++){

            let dis = this.h - this.ySpace*i;
            let txt = this.getTxt(this.yDataArr[i],this.yAxis['txtColor'],this.yAxis['txtSize'],-10,0,'right',this.yAxis['txtFont']);
            txt.y = dis - txt.getMeasuredHeight();

            let yS = null;

            this.yAxis['mark']&&(yS = this.drawLine(ObjectPool.getObj('shape'),[-5,dis,5,dis],'#ccc',1));
            this['xAxisDash']&&(yS = this.drawLine(ObjectPool.getObj('shape'),[0,dis,this.availW,dis],'rgba(200,200,200,0.5)',1));

            if(yS) this.dataSp.addChild(yS);
            this.bgSp.addChild(txt);
        }

    }

    drawXTxt(){

        let len = this.xAxis.value.length;
        for(let i = 0;i<len;i++){

            let dis = this.xSpace * i;
            let str = this.xAxis.value[i];

            let txt = this.getTxt(str,this.xAxis['txtColor'],this.xAxis['txtSize'],dis,this.h,'bottom',this.yAxis['txtFont']);
            if(txt.getMeasuredWidth()>this.xSpace&&i%(Math.ceil(txt.getMeasuredWidth()/this.xSpace)+1)) txt.alpha = 0;

            if(this.xAxis['mark']&&i) {

                let yS = this.drawLine(ObjectPool.getObj('shape'),[dis,this.h-5,dis,this.h+5],'#ccc',1);
                if(!txt.alpha) yS.alpha = 0;
                this.dataSp.addChild(yS);
            }

            this.xTxtArr.push(txt);
            this.bgSp.addChild(txt);
        }


    }

    drawDataLine(objA,style){

        //画其他折线
        let l = this[objA.id + 'Data'].length;
        console.log(l);
        if(!l) return;

        let pointArr = [];
        let ballX = 0;
        let ballY = 0;

        // console.log(l);
        for(let i = 0;i<l;i++){

            let obj = this[objA.id + 'Data'][i];
            let bl = ((+obj.time) - this.minTime)/(this.maxTime - this.minTime);
            if(!this.TimeData) bl = i/(this.xCounts-1);
            bl = bl<=0.01?0:bl;
            bl = bl >= 0.99?1:bl;
            let x1 = bl * this.availW;
            let y1 = this.h - (+obj.value)/this.yDataMax * this.availH;
            if(!this.TimeData) y1 = this.h - (+obj)/this.yDataMax * this.availH;
            pointArr.push(x1,y1);

            ballX = x1;
            ballY = y1;

            if(obj.bg==1&&style['lineType'] ==='a') {
              let txt = this.getTxt(this.getTime(obj.time), style['valueColor'], style['valueSize'], 0, 0, '', style['valueFont']);
              txt.x = ballX - txt.getMeasuredWidth() / 2;
              txt.y = ballY - txt.getMeasuredHeight() - 10;
              this.dataSp.addChild(txt);
            }
            //填充效果
            if (style['lineType'] === 'b') {
              let copy = Array.prototype.slice.call(pointArr);
              copy.unshift(pointArr[0], this.h);
              copy.push(pointArr[pointArr.length - 2], this.h);
                
              if(i==l-1) this.dataSp.addChild(this.drawLine(ObjectPool.getObj('shape'), copy, style['lineColor'], 1, true, style['fillColor']));

            }
            //球(圆点)
          if(style['ballR']){
            let ball = this.drawCircle(0, 0, style['ballR'], style['ballColor']);
            ball.x = ballX;
            ball.y = ballY;
            this.dataSp.addChild(ball);
          }
            if(style['isTitle']&&i == l-1){
              //在最后一个点上显示值
              let txt = this.getTxt(style['titleValue']||obj, style['titleColor'], style['titleSize'], 0, 0, '', style['titleFont']);
              txt.x = ballX - txt.getMeasuredWidth() / 2;
              txt.y = ballY - txt.getMeasuredHeight() - 10;
              this.dataSp.addChild(txt);

            }
        }
        this.dataSp.addChild(this.drawLine(ObjectPool.getObj('shape'),pointArr,style['lineColor'],1));
         // if(!objA.s.parent) this.dataSp.addChild(objA.s);


    }


    getTime(t){
        let date = new Date(t);
        let dateTime;
        if (date.getHours() < 10)
        {
            if (date.getUTCMinutes() < 10)
            {
                dateTime = "0"+date.getHours() + ":0"+date.getMinutes();
            }else
            {
                dateTime = "0"+date.getHours() + ":"+date.getMinutes();
            }
        }else
        {
            if (date.getUTCMinutes() < 10)
            {
                dateTime = date.getHours() +":0"+date.getMinutes();
            }else
            {
                dateTime = date.getHours() +":"+ date.getMinutes();
            }
        }
        return dateTime;
    }

    //更新数据
    updata(arr){

        this.reset();
        this.init(arr);
    }

    //检查数据
    checkData(arr){

        let Len = arr.length;
        if(!Len||!this.minTime) return;


        for(let i=0;i<Len;i++){

            let obj = arr[i];

            //记录id和type
            let idObj = {};
            idObj.id = obj.id;
            idObj.lineType = obj.lineType;
            // idObj.s = ObjectPool.getObj('shape');
            // obj.lineType == 'b'&&(idObj.sf = ObjectPool.getObj('shape'));

            let isV = this.dataObjArr.some( a => {
                return a.id === obj.id;
            });
            // console.log(isV);
            if(!isV) this.dataObjArr.push(idObj);

            let dataArr = obj.value;
            let currLen = dataArr.length;

            if(this.sortData&&this.TimeData) dataArr.sort( (a,b) => {return a.time - b.time});

            this[obj.id + 'Data'] = [];
            // console.log(this[obj.id + 'Data']);
            if(!currLen) continue;

          //this[obj.id + 'Data'] = dataArr;
          //console.log(this.minTime,dataArr[0].time);
          //下面的1000*60 时  正式版必须要去掉
          if(this.TimeData){

            this[obj.id + 'Data'] = dataArr.filter(a => {
              return (a['time']>=this.minTime - 1000 * 60&&a['time']<=this.maxTime);
            });

          }
          else{
            //单纯的数据时
            // this[obj.id + 'Data'] = dataArr.sort((a,b) => {
            //   return (a|0)-(b|0);
            // });
            this[obj.id + 'Data'] = dataArr;
          }

          this.getMax(this[obj.id + 'Data']);

        }
    }

    //获取数据最大值
    getMax(arr1){
      // console.log(arr1);
        if (!arr1 || !arr1.length) return;
        let arr = Tools.clone(arr1);

        let max = 0;
        if(this.TimeData){
          arr.sort((a,b)=>{return a.value-b.value});
          max = (+arr[arr.length - 1]['value']);
        }
        else{

          arr.sort((a,b) => {return (a|0)-(b|0);});
          max = arr.pop();
        }
        this.dataMax = this.dataMax>max?this.dataMax:max;
    }
    

    reset(){

      this.bgSp.removeAllChildren();
      this.dataSp.removeAllChildren();
      createjs.Tween.removeTweens(this.maskS);
      this.removeAllChildren();

      ObjectPool.returnObj(this.poolArr);
      this.poolArr = [];
    }
    // this.clear(this);
    //清空
    clear(){

      createjs.Tween.removeTweens(this.maskS);
      super.clear();

    }
}


export default FixedXHistogram;
