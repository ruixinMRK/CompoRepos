/**
 * Created by Administrator on 2016/8/2 0002.
 */


import Base from  './Base.js';
import Tools from './Tools.js';

class Histogram extends Base{

    constructor(styleObj){
        super();

        this.w = 400;
        this.h = 300;
        this.beforeHour = 2;
        this.afterHour = 2;
        this.xTime = 20;//间隔为15分钟

        this.dataMax = 0;
        this.yDataMax = 0;
        this.yDataArr = [];
        this.yTxtArr = [];
        this.xTxtArr = [];
        this.currentTime = 0;
        this.dataSp = new createjs.Container();
        this.yNum = 5;

        //解析样式
        this.setStyle(styleObj);

        //记录id和lineType的匹配,为后面的重绘
        this.dataObjArr = [];
        //记录传进来的样式
        this.style = styleObj.lineArr;

        //以下为不会更新数据
        //画x轴,y轴
        let yAxis = this.drawLine(new createjs.Shape(),[0,0,0,this.h],this.yAxis['lineColor'],this.yAxis['thickness']);
        let xAxis = this.drawLine(new createjs.Shape(),[0,this.h,this.w,this.h],this.xAxis['lineColor'],this.xAxis['thickness']);
        //画轴三角
        let yAxisThree = this.drawLine(new createjs.Shape(),[-5,0,5,0,0,-12],this.yAxis['lineColor'],1,true,this.yAxis['lineColor']);
        let xAxisThree = this.drawLine(new createjs.Shape(),[this.w,this.h-5,this.w,this.h+5,this.w+12,this.h],this.yAxis['lineColor'],1,true,this.yAxis['lineColor']);
        //可以画的宽和高
        this.availW = this.w/20*19;
        this.availH = this.h/20*19;

        //x轴的个数
        this.xCounts = (this.beforeHour+this.afterHour)*60/this.xTime;
        //x轴的间距
        this.xSpace = this.availW/this.xCounts;
        //y轴标题
        let titleTxt = this.getTxt(this.title['txtStr'],this.title['txtColor'],this.title['txtSize'],this.title['x'],this.title['y'],'',this.title['txtFont']);

        let defaultSp = new createjs.Container();
        defaultSp.addChild(yAxis,xAxis,yAxisThree,xAxisThree,titleTxt);
        this.addChild(defaultSp);
        this.addChild(this.dataSp);

        //警告的容器
        this.waringSp = new createjs.Container();
        this.addChild(this.waringSp);

        this.checkData(styleObj.lineArr);
        this.init();


    }

    init(){

        //y轴的绘图数据
        this.yDataArr = Tools.drawY(this.dataMax,0,this.yNum);
        //y轴最大值
        this.yDataMax = this.yDataArr[this.yDataArr.length -1];
        //y轴间距
        this.ySpace = this.availH/this.yNum;

        console.log(this.yDataMax);
        //画y轴
        this.drawYTxt();
        this.drawXTxt();

        this.dataObjArr.forEach((a,i) => {
            this.drawDataLine(a,this.style[i]);
        })

    }

    drawYTxt(){

        let len = this.yDataArr.length;
        let yTxtLen = this.yTxtArr.length;
        for(let i = 1;i<len;i++){

            if(yTxtLen){
                this.yTxtArr[i-1].text = this.yDataArr[i];
                this.yTxtArr[i-1].x = -10 - this.yTxtArr[i-1].getMeasuredWidth();
                continue;
            }
            let dis = this.h - this.ySpace*i;
            let txt = this.getTxt(this.yDataArr[i],this.yAxis['txtColor'],this.yAxis['txtSize'],-10,0,'right',this.yAxis['txtFont']);
            txt.y = dis - txt.getMeasuredHeight();

            if(i ===1) console.log(txt.getMeasuredWidth())
            if(this.yAxis['mark']) {
                let yS = this.drawLine(new createjs.Shape(),[-5,dis,5,dis],'#ccc',1);
                this.dataSp.addChild(yS);
            }
            this.yTxtArr.push(txt);
            this.dataSp.addChild(txt);
        }

    }

    drawXTxt(){

        if(!this.currentTime) return;

        let xTxtLen = this.xTxtArr.length;

        for(let i = 0;i<this.xCounts+1;i++){

            let dis = this.xSpace * i;
            let t = this.minTime + i * this.xTime * 1000 * 60;
            let dateTime = this.getTime(t);

            if(xTxtLen){
                this.xTxtArr[i].text = dateTime;
                continue;
            }

            let txt = this.getTxt(dateTime,this.xAxis['txtColor'],this.xAxis['txtSize'],dis,this.h,'bottom',this.yAxis['txtFont']);
            if(txt.getMeasuredWidth()>this.xSpace&&i%(Math.ceil(txt.getMeasuredWidth()/this.xSpace)+1)) txt.alpha = 0;
            console.log(txt.getMeasuredWidth(),this.xSpace)
            if(this.xAxis['mark']&&i) {
                let yS = this.drawLine(new createjs.Shape(),[dis,this.h-5,dis,this.h+5],'#ccc',1);
                if(!txt.alpha) yS.alpha = 0;
                this.dataSp.addChild(yS);
            }

            this.xTxtArr.push(txt);
            this.dataSp.addChild(txt);
        }


    }

    drawDataLine(objA,style){

        // console.log(this[objA.id + 'Data']);

        //警告线
        if(objA.lineType == 'c'){

            let y1 = this.h - (+this[objA.id + 'Data'])/this.yDataMax * this.availH;

            let values = this[objA.id + 'Data'];
            if(values.toString().indexOf('.')>0){
                values = parseFloat(values).toFixed(2);
            }
            if(isNaN(values)) return;
            if(objA.sf.numChildren){

                this[objA.id + 'ValueTxt'].text = values.toString();
                this.drawLine(objA.s,[0,y1,this.availW,y1],style['lineColor'],style['thickness']);
            }
            else{
                this.drawLine(objA.s,[0,y1,this.availW,y1],style['lineColor'],style['thickness']);
                this[objA.id + 'ValueTxt'] = this.getTxt(values,style['valueColor'],style['valueSize'],0,0,'',style['valueFont']);
                this[objA.id + 'TitleTxt'] = this.getTxt(style['titleStr'],style['titleColor'],style['titleSize'],0,0,'',style['titleFont']);
                objA.sf.addChild(objA.s,this[objA.id + 'ValueTxt'],this[objA.id + 'TitleTxt']);
                this.waringSp.addChild(objA.sf);
            }

            this[objA.id + 'ValueTxt'].x = this.availW - this[objA.id + 'ValueTxt'].getMeasuredWidth() - 10;
            this[objA.id + 'ValueTxt'].y = y1 - this[objA.id + 'ValueTxt'].getMeasuredHeight();
            this[objA.id + 'TitleTxt'].x = this.availW - this[objA.id + 'ValueTxt'].getMeasuredWidth() - 20 - this[objA.id + 'TitleTxt'].getMeasuredWidth();
            this[objA.id + 'TitleTxt'].y = y1 - this[objA.id + 'TitleTxt'].getMeasuredHeight() - 5;

        }
        else{

            //画其他折线
            let l = this[objA.id + 'Data'].length;
            if(!l) return;

            let pointArr = [];
            let ballX = 0;
            let ballY = 0;

            for(let i = 0;i<l;i++){

                let obj = this[objA.id + 'Data'][i];
                let bl = ((+obj.time) - this.minTime)/(this.maxTime - this.minTime)
                bl = bl<=0.01?0:bl;
                bl = bl >= 0.99?1:bl;
                let x1 = bl * this.availW;
                let y1 = this.h - (+obj.value)/this.yDataMax * this.availH;
                pointArr.push(x1,y1);
                ballX = x1;
                ballY = y1;
            }

            this.drawLine(objA.s,pointArr,style['lineColor'],style['thickness']);
            if(!objA.s.parent) this.dataSp.addChild(objA.s);

            if(style.valueColor){

                let valueS = this[objA.id + 'Data'][l-1].value;
                if(valueS.toString().indexOf('.')>0){
                    valueS = parseFloat(valueS).toFixed(2);
                }
                valueS = valueS.toLocaleString();
                //当前线的文本
                if(this[objA.id + 'Txt']){
                    this[objA.id + 'Txt'].text = valueS;
                }
                else{
                    this[objA.id + 'Txt'] = this.getTxt(valueS,style['valueColor'],style['valueSize'],0,0,'',style['valueFont']);
                    this.dataSp.addChild(this[objA.id + 'Txt']);
                }
                this[objA.id + 'Txt'].x = ballX + 5;
                this[objA.id + 'Txt'].y = ballY - this[objA.id + 'Txt'].getMeasuredHeight()/2-3;
            }
            if(style.unitStr){
                //单位
                if(!this[objA.id + 'Unit']){
                    this[objA.id + 'Unit'] = this.getTxt(style['unitStr'],style['unitColor'],style['unitSize'],0,0,'',style['unitFont']);
                    this.dataSp.addChild(this[objA.id + 'Unit']);
                }
                this[objA.id + 'Unit'].x = this[objA.id + 'Txt'].x + this[objA.id + 'Txt'].getMeasuredWidth() + 3;
                this[objA.id + 'Unit'].y = this[objA.id + 'Txt'].y + this[objA.id + 'Txt'].getMeasuredHeight() - this[objA.id + 'Unit'].getMeasuredHeight() + 6;
            }
            if(style.titleStr){
                //当前线的标题
                if(!this[objA.id + 'Title']){
                    this[objA.id + 'Title'] = this.getTxt(style['titleStr'],style['titleColor'],style['titleSize'],0,0,'',style['titleFont']);
                    this.dataSp.addChild(this[objA.id + 'Title']);
                }
                if(this[objA.id + 'Unit']){
                    this[objA.id + 'Title'].x =  this[objA.id + 'Unit'].x + this[objA.id + 'Unit'].getMeasuredWidth() - this[objA.id + 'Title'].getMeasuredWidth();
                }
                else{
                    this[objA.id + 'Title'].x =  this[objA.id + 'Txt'].x + this[objA.id + 'Txt'].getMeasuredWidth() - this[objA.id + 'Title'].getMeasuredWidth();
                }
                this[objA.id + 'Title'].y = this[objA.id + 'Txt'].y  - this[objA.id + 'Title'].getMeasuredHeight() -3;
            }
            if(style.ballR){
                //球
                if(!this[objA.id + 'Ball']){
                    this[objA.id + 'Ball'] = this.drawCircle(0,0,style['ballR'],style['ballColor']);
                    this.addChild(this[objA.id + 'Ball']);
                }
                this[objA.id + 'Ball'].x = ballX;
                this[objA.id + 'Ball'].y = ballY;
            }

            //填充效果
            if(style['lineType'] === 'b'){
                let copy = Array.prototype.slice.call(pointArr);
                copy.unshift(pointArr[0],this.h);
                copy.push(pointArr[pointArr.length -2],this.h);
                this.drawLine(objA.sf,copy,style['lineColor'],1,true,style['fillColor']);
                if(!objA.sf.parent) this.dataSp.addChild(objA.sf);
            }


        }


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
        this.checkData(arr);
        if(!this.currentTime) return;
        this.init();
    }

    //检查数据
    checkData(arr){

        let Len = arr.length;
        if(!Len) return;

        //a为当前线
        //b为历史有阴影线
        //c为警告值线
        //d为普通线条
        let getCurrentTime = obj=>{
            let arr1 = obj.value;
            if(!arr1||!arr1.length) return;
            this.currentTime = +(arr1[arr1.length-1]['time']);
            // console.log(this.currentTime,parseFloat(arr1[arr1.length-1]['time']));
            this.maxTime = this.currentTime + 1000 * 60 * 60 * this.beforeHour;
            this.minTime = this.currentTime - 1000 * 60 * 60 * this.afterHour;
        };

        arr.forEach(a => {

            this.dataObjArr.forEach( b =>{
                if(a.id == b.id&&b.lineType == 'a'){
                    getCurrentTime(a);
                }
            })

            if(a.lineType == 'a'){
                getCurrentTime(a);
            }

            // if(!this.currentTime){
            //
            //     this.dataObjArr.forEach( c =>{
            //
            //         if(a.id == c.id){
            //             getCurrentTime(a);
            //         }
            //
            //     })
            //
            // }


        })


        for(let i=0;i<Len;i++){

            let obj = arr[i];

            //记录id和type
            let idObj = {};
            idObj.id = obj.id;
            idObj.lineType = obj.lineType;
            idObj.s = new createjs.Shape();
            if(obj.lineType == 'b') idObj.sf = new createjs.Shape();

            let isV = this.dataObjArr.some( a => {
                return a.id === obj.id;
            })

            // console.log(isV);
            if(!isV) this.dataObjArr.push(idObj);

            if(obj.lineType == 'c'||(!isNaN(obj.value)&&!Array.isArray(obj.value))){
                this[obj.id + 'Data'] = (+obj.value);

                this.dataMax = this.dataMax>this[obj.id + 'Data']?this.dataMax:this[obj.id + 'Data'];
                idObj.sf = new createjs.Container();
                continue;
            }

            let dataArr = obj.value;
            let currLen = dataArr.length;

            if(this.sortData) dataArr.sort( (a,b) => {return a.time - b.time});

            this[obj.id + 'Data'] = [];
            if(!currLen) continue;


            this[obj.id + 'Data'] = dataArr.filter(a => {
                return (a['time']>this.minTime&&a['time']<this.maxTime);
            });

            this.getMax(this[obj.id + 'Data']);

        }


    }


    //获取数据最大值
    getMax(arr1){

        if (!arr1 || !arr1.length) return;
        let arr = Tools.clone(arr1);
        arr.sort((a,b)=>{return a.value-b.value});
        let max = (+arr[arr.length - 1]['value']);
        this.dataMax = this.dataMax>max?this.dataMax:max;
    }



    //读取属性
    setStyle(obj){

        for(var str in obj){
            // console.log(str,obj[str]);
            this[str] = obj[str];
        }

    }

    // this.clear(this);
    //清空
    clear(){

       for(let str in this){
            let obj = this[str];
            if(!super[str]&&Array.isArray(this[str])){
                obj.length = 0;
            }
       }
        this.removeAllChildren();
        if(this.parent) this.parent.removeChild(this);

    }
}


export default Histogram;
