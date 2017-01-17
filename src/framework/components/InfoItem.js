/**
 * Created by wind on 2017/1/5.
 */
import Base from  './Base.js';
import ScaleBitmap from './ScaleBitmap';
// import Utils from "../utils/Utils";

class InfoItem extends Base{
    constructor(styleData) {
        super();
        this.setDefaultData();
        this.setStyleData(styleData==null?{}:styleData);
        this.initView();
    }
    setDefaultData(){
        //数据
        this._time = 0;
        this._volume = 0;
        this._rate = 0;
        this._alert = "";

        this._paddingLeft = 44;
        this._paddingTop = 15;
        this._font = "34px 微软雅黑";
        this._textAlign = "left";
        this._color = "#ffffff";
        this._alertColor = "#ffff00";
        this._abnormalColor = "#ff0000";
        this._gap = 26;

        this._bgImg = "";

        this._w = 404;//173;
        this._h = 62;
        this._state = 0;
        this._arrowState = InfoItem.LT_R;

        this.__arrowH = 32;
        this.__arrowW = 137;

        this.__offX = this.__arrowW;
        this.__offY = -this.__arrowH;
        this.__offArrowRight = 173-this.__arrowW;
    }
    setStyleData(styleData){
        for(let k in styleData){
            if(("_"+k) in this){
                this["_"+k] = styleData[k];
            }
        }
    }
    initView(){
        this._bgCon = new createjs.Container();
        this._bg = new ScaleBitmap(this._bgImg,new createjs.Rectangle(380,150,5,5));
        this._bg.y = -this.__arrowH;
        this._bgCon.addChild(this._bg);
        this.addChild(this._bgCon);

        this._txtTime = new createjs.Text("交易响应时间："+this._time+"毫秒",this._font,this._color);
        this._txtVolume = new createjs.Text("交易量："+this._volume+"笔",this._font,this._color);
        this._txtRate = new createjs.Text("成功率："+this._rate+"%",this._font,this._color);
        this._txtAlert = new createjs.Text("",this._font,this._color);
        this._txtAlert.width = Math.max(this._txtTime.getMeasuredWidth(),this._txtVolume.getMeasuredWidth(),this._txtRate.getMeasuredWidth());
        // Utils.wrapText("告警信息："+this._alert,this._txtAlert);

        this._txtTime.x = this._txtVolume.x = this._txtRate.x = this._txtAlert.x = this._paddingLeft;
        this._txtTime.y = this._paddingTop;

        //文字信息
        this.steTxtTime();
        this.setTxtVolume();
        this.setTxtRate();
        this.setTxtAlert();
        this.setTextPos();
        this.addChild(this._txtTime,this._txtVolume,this._txtRate,this._txtAlert);

        //箭头状态
        this.setArrowState(this._arrowState);
        //大小状态
        this.setState(this._state);
    }
    setSize(w,h){
        this._w = w;
        this._h = h;
        this._bg.setDrawSize(this._w,this._h+this.__arrowH);
        this._bgCon.x = this._bgCon.regX = this._w/2;
        this._bgCon.y = this._bgCon.regY = this._h/2;
    }
    setWidth(w){
        this._w = w;
        this._bg.setDrawSize(this._w,this._h+this.__arrowH);
        this._bgCon.x = this._bgCon.regX = this._w/2;
    }
    setHeight(h){
        this._h = h;
        this._bg.setDrawSize(this._w,this._h+this.__arrowH);
        this._bgCon.y = this._bgCon.regY = this._h/2;
    }
    steTxtTime(){
        this._txtTime.text = "交易响应时间："+this._time+"毫秒";
    }
    setTxtVolume(){
        this._txtVolume.text = "交易量："+this._volume+"笔";
    }
    setTxtRate(){
        this._txtRate.text = "成功率："+this._rate+"%";
    }
    setTxtAlert(){
        this._txtAlert.text = "告警信息："+this._alert;
    }
    setTxtAlertWidth(){
        this._txtAlert.width = Math.max(this._txtTime.getMeasuredWidth(),this._txtVolume.getMeasuredWidth(),this._txtRate.getMeasuredWidth());
        // Utils.wrapText(this._txtAlert.text,this._txtAlert);
    }
    set time(v){
        this._time = v;
        this.steTxtTime();
        this.setTextPos();
    }
    set volume(v){
        this._volume = v;
        this.setTxtVolume();
        this.setTextPos();
    }
    set rate(v){
        this._rate = v;
        this.setTxtRate();
        this.setTextPos();
    }
    set alert(v){
        this._alert = v;
        this.setTxtAlert();
        this.setTextPos();
    }
    setData(o){
        if(o.time != null){
            this._time = o.time;
            this.steTxtTime();
        }
        if(o.volume != null){
            this._volume = o.volume;
            this.setTxtVolume();
        }
        if(o.rate != null){
            this._rate = o.rate;
            this.setTxtRate();
        }
        if(o.alert != null){
            this._alert = o.alert;
            this.setTxtAlert();
        }
        this.setTextPos();
    }
    setTextPos(){
        this._txtVolume.y = this._txtTime.y + this._txtTime.getMeasuredHeight() + this._gap;
        this._txtRate.y = this._txtVolume.y + this._txtVolume.getMeasuredHeight() + this._gap;
        this._txtAlert.y = this._txtRate.y + this._txtRate.getMeasuredHeight() + this._gap;
        this.setTxtAlertWidth();
        this.calculateSize();
        this.calculateOff();
    }

    setState(s){
        this._state = s;
        this._txtAlert.visible = false;
        switch (this._state){
            case 0://正常状态
                break;
            case 1://告警装填
                this._txtAlert.visible = true;
                this._txtAlert.color = "#ffff00";
                break;
            case 2://异常状态
                this._txtAlert.visible = true;
                this._txtAlert.color = "#ff0000";
                break;
        }
        this.calculateSize();
        this.calculateOff();
    }
    calculateSize(){
        var w1 = this._txtTime.x + this._txtTime.getMeasuredWidth() + this._paddingLeft;
        var w2 = this._txtVolume.x + this._txtVolume.getMeasuredWidth() + this._paddingLeft;
        var w3 = this._txtRate.x + this._txtRate.getMeasuredWidth() + this._paddingLeft;
        this._w = Math.max(w1,w2,w3);

        if(this._state == 0){
            this._h = this._txtRate.y + this._txtRate.getMeasuredHeight() + this._paddingTop;
        }else{
            this._h = this._txtAlert.y + this._txtAlert.getMeasuredHeight() + this._paddingTop;
        }
        this.setSize(this._w,this._h);
    }
    calculateOff(){
        var tempArrowX = this.arrowX;
        var tempArrowY = this.arrowY;
        //设置水平参数
        if(this._arrowState.charAt(0) == this._arrowState.charAt(3)) {
            if(this._arrowState.charAt(3) == "R"){
                this.__offX = this._w - this.__offArrowRight;
            }else{
                this.__offX = this.__offArrowRight;
            }
        }else{
            if(this._arrowState.charAt(3) == "R"){
                this.__offX = this.__arrowW;
            }else{
                this.__offX = this._w - this.__arrowW;
            }
        }

        //设置竖直参数
        if(this._arrowState.charAt(1) == "T"){//箭头在上
            this.__offY = -this.__arrowH;
        }else {//箭头在下
            this.__offY = this._h + this.__arrowH;
        }
        this.setArrowPos(tempArrowX,tempArrowY);
    }
    setArrowPos(x,y){
        this.arrowX = x;
        this.arrowY = y;
    }
    set arrowX(x){
        this.x = x-this.__offX;
    }
    set arrowY(y){
        this.y = y-this.__offY;
    }
    get arrowX(){
        return this.x + this.__offX;
    }
    get arrowY(){
        return this.y + this.__offY;
    }
    setArrowState(s){
        this._arrowState = s;

        //if(this._arrowState == InfoItem.LT_L || this._arrowState == InfoItem.RT_R || this._arrowState == InfoItem.LB_L || this._arrowState == InfoItem.RB_R){
        if(this._arrowState.charAt(0) == this._arrowState.charAt(3)) {
            this._bg.scale9Grid = new createjs.Rectangle(18, 48, 56, 31);
        }else{//}else if(this._arrowState == InfoItem.LT_R || this._arrowState == InfoItem.RT_L || this._arrowState == InfoItem.LB_R || this._arrowState == InfoItem.RB_L){
            this._bg.scale9Grid = new createjs.Rectangle(138,48,20,31);
        }
        this._bg.setDrawSize(this._w,this._h+this.__arrowH);
        //设置水平参数
        if(this._arrowState.charAt(3) == "R"){
            this._bgCon.scaleX = 1;
        }else{
            this._bgCon.scaleX = -1;
        }

        //设置竖直参数
        if(this._arrowState.charAt(1) == "T"){//箭头在上
            this._bgCon.scaleY = 1;
        }else {//箭头在下
            this._bgCon.scaleY = -1;
        }
        this.calculateOff();
    }

    reset(){
        this.setState(0);
    }
    clear(){
        this._bgCon.removeAllChildren();
        this.removeAllChildren();
    }
}

InfoItem.LT_L = "LT_L";//0;//左上角，向左
InfoItem.LT_R = "LT_R";//1;//左上角，向右
InfoItem.RT_L = "RT_L";//2;//右上角，向左
InfoItem.RT_R = "RT_R";//3;//右上角，向右
InfoItem.LB_L = "LB_L";//4;//左下角，向左
InfoItem.LB_R = "LB_R";//5;//左下角，向右
InfoItem.RB_L = "RB_L";//6;//右下角，向左
InfoItem.RB_R = "RB_R";//7;//右下角，向右

export default InfoItem;