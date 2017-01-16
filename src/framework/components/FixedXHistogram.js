/**
 * Created by Administrator on 2016/8/2 0002.
 */


import Base from './Base.js';
import Tools from '../../tools/Tools';
import ObjectPool from '../../tools/ObjectPool';

//x轴固定的线图
class FixedXHistogram extends Base{

    constructor(styleObj){
        super();

        this.w = 400;
        this.h = 300;

        this.dataMax = 0;
        this.dataMin = 100000000;
        this.yDataMax = 0;
        this.yDataMin = 0;
        this.yDataArr = [];
        this.xTxtArr = [];
        this.yNum = 5;
        this.mouseEvent = true;
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
        this.TimeData = this.typeFixed === 'C'?false:true;
        this.tipsHash = [];//存储线图tips的映射
        this.wTips = 0;//tips的宽度
        this.init(styleObj.lineArr);

        styleObj.lineArr.forEach(a=>{

            this.tipsHash.push({id:a.id,name:a.name});

        })



        // this.addEventListener('click',this.overPannel);
    }

    init(data){

        //画x轴,y轴
        let yAxis = this.drawLine(ObjectPool.getObj('shape'),[0,0,0,this.h],this.yAxis['lineColor'],this.yAxis['thickness']);


        this.yEventAxis = this.drawLine(ObjectPool.getObj('shape'),[0,0,0,this.h],this.yAxis['lineColor'],0.5);


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
        this.tipsCon = ObjectPool.getObj('con');
        this.tipsCon.alpha = 0;


        this.tipsHash.reduce((prev,curr,index)=>{
            // console.log(prev,curr.name,'-----gggg');

            let txt = this.getTxt(curr.name,'#fff',16,prev.x,prev.y);
            let txtVlaue = this.getTxt(data[0]['value'][0],'#fff',16,prev.x + txt.getMeasuredWidth() + 5,prev.y);
            txtVlaue.name = curr.id;
            this.tipsCon.addChild(txt,txtVlaue);

            let w = txtVlaue.x+txtVlaue.getMeasuredWidth()+10;
            let h = txt.y + txt.getMeasuredHeight() + 15;

            if(index == this.tipsHash.length-1){
                this.tips = this.drawRect(w>prev.w?w:prev.w,h,'rgba(40,40,40,0.6)',10,10,10,10);
                this.tips.mouseEnabled = false;
                this.tipsCon.addChildAt(this.tips,0);
                this.wTips = w>prev.w?w:prev.w;
            }
            return {x:prev.x,y:txt.y + txt.getMeasuredHeight() + 15,w:w,h:h};

        },{x:5,y:10,w:0,h:0});

        this.poolArr.push(this.tipsCon,this.bgSp,this.dataSp,this.maskS,defaultSp);

        defaultSp.addChild(this.tipsCon,this.yEventAxis,yAxis,xAxis,yAxisThree,xAxisThree);

        //放一个背景作为接受事件

        this.addChild(this.dataSp,this.bgSp,defaultSp);

        if(this.typeFixed){
            this.addEventListener('mouseover',this.overPannel);
            this.addEventListener('rollout',this.outPannel);
        }

        this.getAnimTime();
        this.checkData(data);
        this.drawXTxt();
        this.createView();

    }

    overPannel = e =>{

        // console.log(e.stageX - this.x,(e.stageX-this.x)/this.xSpace);

        this.tipsCon.alpha?'':this.tipsCon.alpha = 1;
        let num = Math.ceil((e.stageX-this.x)/this.xSpace);
        this.yEventAxis.x = num * this.xSpace;
        let inLeft = num > this.xCounts/2?false:true;

        this.dataObjArr.forEach(item => {
            this.tipsCon.getChildByName(item.id).text = this[item.id + 'Data'][num];
        });


        createjs.Tween.removeTweens(this.tipsCon);
        createjs.Tween.get(this.tipsCon).to({x:inLeft?this.yEventAxis.x + 10:this.yEventAxis.x - 10 - this.wTips,y:this.h/2,y:e.stageY-this.y}, 200,Ease.linear).call(function(){
            createjs.Tween.removeTweens(this);
        });

    }

    outPannel = e =>{
        this.yEventAxis.x = 0;
        this.tipsCon.alpha = 0;
        // console.log('out');
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
            this.yDataArr = Tools.drawY(this.dataMax,this.dataMin,this.yNum);
            //y轴最大值
            // console.log(this.yDataArr,this.dataMax,this.dataMin,this.yNum);

            this.yDataMax = this.yDataArr[this.yDataArr.length -1];
            this.yDataMin = this.yDataArr[0];

            // console.log(this.dataMax,this.dataMin,this.yDataMax,this.yDataMin,this.yDataArr);
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
        // console.log(min,max,this.minTime,this.maxTime);

    }

    getCTime(h){
        if(!this.TimeData) return 1;
        let date1 = new Date();
        let date = new Date();
        date.setFullYear(date1.getFullYear());
        date.setMonth(date1.getMonth());
        date.setDate(date1.getDate());
        date.setHours(h|0);
        date.setMinutes('0');
        date.setSeconds('0');
        // console.log(date);
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

            //背景触发事件
            if(i!=len-1){
                let hitBG = this.drawRect(this.xSpace,this.h,'#fff');
                hitBG.x = dis;
                hitBG.alpha = 0.01;
                this.bgSp.addChild(hitBG);
            }

            // console.log(this.x,dis,this.h,Tools.randomColor());
            this.xTxtArr.push(txt);
            this.bgSp.addChild(txt);
        }


    }

    drawDataLine(objA,style){

        //画其他折线
        let l = this[objA.id + 'Data'].length;
        // console.log(l);
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
            let totalValue = this.yDataMax-this.yDataMin;
            // let currentValue = parseFloat(obj.value)>0?parseFloat(obj.value)-this.yDataMin:-obj.value;
            // console.log(obj,totalValue);
            let y1 = this.h - (parseFloat(obj.value)>0?parseFloat(obj.value)-this.yDataMin:Math.abs(this.yDataMin-obj.value))/(totalValue) * this.availH;
            if(!this.TimeData) y1 = this.h - (parseFloat(obj)>0?parseFloat(obj)-this.yDataMin:Math.abs(this.yDataMin-obj))/(totalValue) * this.availH;
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
        return Tools.dateFormat(new Date(t),'hh:mm');
    }

    //更新数据
    updata(arr){

        this.reset();
        this.init(arr);
    }

    //检查数据
    checkData(arr){

        let Len = arr.length;

        // console.log(arr,Len,this.minTime);

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

            // this[obj.id + 'Data'] = dataArr;
            //console.log(this.minTime,dataArr[0].time);
            //下面的1000*60 时  正式版必须要去掉
            if(this.TimeData){

                this[obj.id + 'Data'] = dataArr.filter(a => {
                    // console.log(a['time'],this.minTime - 1000 * 60,a['time']<=this.maxTime);
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
            console.log(this.TimeData,this[obj.id + 'Data']);
            this.getMax(this[obj.id + 'Data']);

        }
    }

    //获取数据最大值
    getMax(arr1){
        console.log(arr1);
        if (!arr1 || !arr1.length) return;
        let arr = Tools.clone(arr1);

        let max = 0;
        let min = 0;
        if(this.TimeData){
            arr.sort((a,b)=>{return a.value-b.value});
            max = (+arr[arr.length - 1]['value']);
            min = (+arr[0]['value']);
        }
        else{

            arr.sort((a,b) => {return (a|0)-(b|0);});
            max = arr.pop();
            min = arr.shift();
        }
        this.dataMax = this.dataMax>max?this.dataMax:max;
        this.dataMin = this.dataMin>min?min:this.dataMin;

    }


    reset(){

        this.removeAllChild();
        createjs.Tween.removeTweens(this.maskS);
        ObjectPool.returnObj(this.poolArr);
        this.poolArr = [];

        if(this.typeFixed){
            this.removeEventListener('mouseover',this.overPannel);
            this.removeEventListener('rollout',this.outPannel);
        }

    }
    // this.clear(this);
    //清空
    clear(){

        createjs.Tween.removeTweens(this.maskS);
        super.clear();

    }
}


export default FixedXHistogram;
