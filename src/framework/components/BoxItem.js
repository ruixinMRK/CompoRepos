/**
 * Created by wind on 2017/1/5.
 */
import Base from "./Base.js";
// import UIContext from '../core/UIContext';
import ScaleBitmap from './ScaleBitmap';
import InfoItem from "./InfoItem";

const WIDTH_TYPE_0_SIZT_TYPE_0 = 296;
const HEIGHT_TYPE_0_SIZT_TYPE_0 = 56;

const WIDTH_TYPE_0_SIZT_TYPE_1 = 296;
const HEIGHT_TYPE_0_SIZT_TYPE_1 = 100;

const WIDTH_TYPE_0_SIZT_TYPE_2 = 355;
const HEIGHT_TYPE_0_SIZT_TYPE_2 = 266;

const WIDTH_TYPE_1_SIZT_TYPE_0 = 352;
const HEIGHT_TYPE_1_SIZT_TYPE_0 = 261;

class BoxItem extends Base {
    constructor(styleData) {
        super();

        this.setDefaultData();
        this.setStyleData(styleData==null?{}:styleData);
        this.initView();
    }
    setDefaultData(){
        this._paddingLeft = 44;
        this._paddingTop = 10;
        this._font = "34px 微软雅黑";
        this._color = "#ffffff";
        this._textAlign = "center";
        this._alertColor = "#ff7800";
        this._alertBoardColor = "#ff7800";
        this._alertBoardWeight = 2;
        this._abnormalColor = "#ff0000";
        this._abnormalBoardColor = "#ff0000";
        this._abnormalBoardWeight = 2;
        this._round = 12;
        this._gap = 23;


        this._infoItemPos = BoxItem.POP_POS_BOTTOM_CENTER;
        this._infoItemVisible = false;

        this._bgImg = '';
        this._infoBgImg = "";

        //数据
        this._title = "";
        this._time = 0;
        this._volume = 0;
        this._rate = 0;
        this._alert = "";

        this._grey = false;
        this._state = 0;
        this._typeState = 0;
        this._sizeState = 0;
        this._w = 0;
        this._h = 0;
    }
    setStyleData(styleData){
        for(let k in styleData){
            if(("_"+k) in this){
                this["_"+k] = styleData[k];
            }
        }
    }
    initView(){
        this.setWHBySize();
        this._bgCon = new createjs.Container();
        this.addChild(this._bgCon);

        this._hitShape = new createjs.Shape();
        this._hitShape.graphics.beginFill("#ff0000").drawRoundRect(0, 0, this._w, this._h,this._round).endFill();
        this.hitArea = this._hitShape;
        this.cursor = "pointer";

        this._bg0 = new ScaleBitmap(this._bgImg,new createjs.Rectangle(40,25,5,5));
        this._bg0.setDrawSize(this._w,this._h);
        this._bg1 = new createjs.Shape();
        this._bgCon.addChild(this._bg0,this._bg1);

        this._txtCon = new createjs.Container();
        this.addChild(this._txtCon);

        this._txtTitle = new createjs.Text(this._title,this._font,this._color);
        this._txtTitle.textAlign = this._textAlign;
        this._txtTime = new createjs.Text("响应时间："+this._time+"毫秒",this._font,this._color);
        this._txtTime.textAlign = this._textAlign;
        this._txtVolume = new createjs.Text("交易量："+this._volume+"笔",this._font,this._color);
        this._txtVolume.textAlign = this._textAlign;
        this._txtRate = new createjs.Text("成功率："+this._rate+"%",this._font,this._color);
        this._txtRate.textAlign = this._textAlign;
        //文字信息
        this.steTxtTime();
        this.setTxtVolume();
        this.setTxtRate();
        this.setTextPos();
        this._txtCon.addChild(this._txtTitle,this._txtTime,this._txtVolume,this._txtRate);

        this.infoItem = new InfoItem({bgImg:this._infoBgImg});
        this.setInfoItemItem();
        this.setInfoItemData();
        this.addChild(this.infoItem);

        this.typeState = this._typeState;
        this.grey = this._grey;
    }
    setWHBySize(){
        if(this._typeState == 0){
            switch (this._sizeState){
                case 0:
                    this._w = WIDTH_TYPE_0_SIZT_TYPE_0;
                    this._h = HEIGHT_TYPE_0_SIZT_TYPE_0;
                    break;
                case 1:
                    this._w = WIDTH_TYPE_0_SIZT_TYPE_1;
                    this._h = HEIGHT_TYPE_0_SIZT_TYPE_1;
                    break;
                case 2:
                    this._w = WIDTH_TYPE_0_SIZT_TYPE_2;
                    this._h = HEIGHT_TYPE_0_SIZT_TYPE_2;
                    break;
                default:
                    this._w = WIDTH_TYPE_0_SIZT_TYPE_0;
                    this._h = HEIGHT_TYPE_0_SIZT_TYPE_0;
                    break;
            }
        }else{
            this._w = WIDTH_TYPE_1_SIZT_TYPE_0;
            this._h = HEIGHT_TYPE_1_SIZT_TYPE_0;
        }
        if(this._txtTitle && this._txtTitle.textAlign == "center"){
            this._txtTitle.x = this._w/2;
        }
        if(this.infoItem){
            this.infoItemPos  = this._infoItemPos;
        }
        if(this._hitShape){
            this._hitShape.graphics.beginFill("#ff0000").drawRoundRect(0, 0, this._w, this._h,this._round).endFill().endStroke();
        }
    }
    setTextPos(){
        if(this._typeState == 0){
            this._txtTitle.x = this._paddingLeft;
            this._txtTitle.y = (this._h-this._txtTitle.getMeasuredHeight())/2;
            if(this._txtTitle.textAlign == "center"){
                this._txtTitle.x = this._w/2;
            }

            this._txtTime.x = this._txtVolume.x = this._txtRate.x = 0;
            this._txtTime.y = this._txtVolume.y = this._txtRate.y = 0;

        }else{
            this._txtTitle.x = this._paddingLeft;
            this._txtTitle.y = this._paddingTop;
            if(this._txtTitle.textAlign == "center"){
                this._txtTitle.x = this._w/2;
            }

            this._txtTime.x = this._txtVolume.x = this._txtRate.x = this._paddingLeft;
            this._txtTime.y = this._txtTitle.y + this._txtTitle.getMeasuredHeight() + this._gap+5;
            this._txtVolume.y = this._txtTime.y + this._txtTime.getMeasuredHeight() + this._gap;
            this._txtRate.y = this._txtVolume.y + this._txtVolume.getMeasuredHeight() + this._gap;
        }
    }
    setTypeState(){
        if(this._typeState == 0){
            this._txtTime.visible = this._txtVolume.visible = this._txtRate.visible = false;
        }else{
            this._txtTime.visible = this._txtVolume.visible = this._txtRate.visible = true;
        }
        this.setWHBySize();
        this.setTextPos();
        this._bg0.setDrawSize(this._w,this._h);
        this.state = this._state;
    }
    setTxtTitle(){
        this._txtTitle.text = this._title;
    }
    steTxtTime(){
        this._txtTime.text = "响应时间："+this._time+"毫秒";
    }
    setTxtVolume(){
        this._txtVolume.text = "交易量："+this._volume+"笔";
    }
    setTxtRate(){
        this._txtRate.text = "成功率："+this._rate+"%";
    }
    set title(v){
        this._title = v;
        this.setTxtTitle();
    }
    set time(v){
        this._time = v;
        this.steTxtTime();
        this.infoItem.time = this._time;
    }
    set volume(v){
        this._volume = v;
        this.setTxtVolume();
        this.infoItem.volume = this._volume;
    }
    set rate(v){
        this._rate = v;
        this.setTxtRate();
        this.infoItem.rate = this._rate;
    }
    set alert(v){
        this._alert = v;
        this.infoItem.alert = this._alert;
    }
    setData(o){
        if(o.title != null){
            this._title = o.title;
            this.setTxtTitle();
        }
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
        }
        this.setTextPos();
        this.infoItem.setData(o);
    }
    get grey(){
        return this._grey;
    }
    set grey(b){
        this._grey = b==true;
        this._bgCon.alpha = this._txtCon.alpha = this._grey?0.25:1;
    }
    get state(){
        return this._state;
    }
    set state(s){
        this._state = s;
        this._bg0.visible = this._state===BoxItem.NORMAL_STATE;
        this._bg1.visible = !this._bg0.visible;

        switch (this._state){
            case BoxItem.NORMAL_STATE://正常状态
                break;
            case BoxItem.ALERT_STATE://警告
                this._bg1.graphics.clear();
                this._bg1.graphics.setStrokeStyle(this._alertBoardWeight);
                this._bg1.graphics.beginStroke(this._alertBoardColor).beginFill(this._alertColor).drawRoundRect(0, 0, this._w, this._h,this._round).endFill().endStroke();
                break;
            case BoxItem.ABNORMAL_STATE://异常
                this._bg1.graphics.clear();
                this._bg1.graphics.setStrokeStyle(this._abnormalBoardWeight);
                this._bg1.graphics.beginStroke(this._abnormalBoardColor).beginFill(this._abnormalColor).drawRoundRect(0, 0, this._w, this._h,this._round).endFill().endStroke();
                break;
        }
        this.infoItem.setState(this._state);
    }
    set sizeState(v){
        this._sizeState = v;
        this.setWHBySize();
        this.setTextPos();
        this._bg0.setDrawSize(this._w,this._h);
        this.state = this._state;
    }
    get sizeState(){
        return this._sizeState;
    }
    set typeState(t){
        this._typeState = t;
        this.setTypeState();
    }
    get typeState(){
        return this._typeState;
    }
    get leftAnchorX(){
        return this.x;
    }
    get leftAnchorY(){
        return this.y + this._h/2;
    }
    get topAnchorX(){
        return this.x + this._w/2;
    }
    get topAnchorY(){
        return this.y;
    }
    get rightAnchorX(){
        return this.x + this._w;
    }
    get rightAnchorY(){
        return this.y + this._h/2;
    }
    get bottomAnchorX(){
        return this.x + this._w/2;
    }
    get bottomAnchorY(){
        return this.y + this._h;
    }

    get itemWidth(){
        return this._w;
    }
    get itemHeight(){
        return this._h;
    }

    widthBySizeType(s){
        switch (s){
            case 0:
                return WIDTH_TYPE_0_SIZT_TYPE_0;
            case 1:
                return WIDTH_TYPE_0_SIZT_TYPE_1;
            case 2:
                return WIDTH_TYPE_0_SIZT_TYPE_2;
            default:
                return 0;
        }
    }
    heightBySizeType(s){
        switch (s){
            case 0:
                return HEIGHT_TYPE_0_SIZT_TYPE_0;
            case 1:
                return HEIGHT_TYPE_0_SIZT_TYPE_1;
            case 2:
                return HEIGHT_TYPE_0_SIZT_TYPE_2;
            default:
                return 0;
        }
    }

    setInfoItemItem(){
        this.infoItemVisible = this._infoItemVisible;
        this.infoItemPos  = this._infoItemPos;
    }
    setInfoItemData(){
        this.infoItem.setData({time:this._time,volume:this._volume,rate:this._rate,alert:this._alert});
    }
    set infoItemVisible(v){
        this._infoItemVisible = v;
        this.infoItem.visible = this._infoItemVisible;
    }
    get infoItemVisible(){
        return this._infoItemVisible;
    }
    set infoItemPos(p){
        this._infoItemPos = p;
        switch (this._infoItemPos){
            case BoxItem.POP_POS_TOP_LEFT:
                this.infoItem.setArrowState(InfoItem.RB_R);
                this.infoItem.setArrowPos(0,0);
                break;
            case BoxItem.POP_POS_TOP_CENTER:
                this.infoItem.setArrowState(InfoItem.LB_R);
                this.infoItem.setArrowPos(this._w/2,0);
                break;
            case BoxItem.POP_POS_TOP_RIGHT:
                this.infoItem.setArrowState(InfoItem.LB_L);
                this.infoItem.setArrowPos(this._w,0);
                break;
            case BoxItem.POP_POS_BOTTOM_LEFT:
                this.infoItem.setArrowState(InfoItem.RT_R);
                this.infoItem.setArrowPos(0,this._h);
                break;
            case BoxItem.POP_POS_BOTTOM_CENTER:
                this.infoItem.setArrowState(InfoItem.LT_R);
                this.infoItem.setArrowPos(this._w/2,this._h);
                break;
            case BoxItem.POP_POS_BOTTOM_RIGHT:
                this.infoItem.setArrowState(InfoItem.LT_L);
                this.infoItem.setArrowPos(this._w,this._h);
                break;
        }
    }
    reset(){
        this.setState(0);
    }
    clear(){
        this.infoItem.clear();
        this._bgCon.removeAllChildren();
        this._txtCon.removeAllChildren();
        this.removeAllChildren();
    }
}
BoxItem.NORMAL_STATE = 0;
BoxItem.ALERT_STATE = 1;
BoxItem.ABNORMAL_STATE = 2;

BoxItem.POP_POS_TOP_LEFT = 0;
BoxItem.POP_POS_TOP_CENTER = 1;
BoxItem.POP_POS_TOP_RIGHT = 2;
BoxItem.POP_POS_BOTTOM_LEFT = 3;
BoxItem.POP_POS_BOTTOM_CENTER = 4;
BoxItem.POP_POS_BOTTOM_RIGHT = 5;

export default BoxItem;