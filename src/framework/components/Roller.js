/**
 * Created by wind on 2016/1/4.
 */
import '../../libs/createjs.js';
import Tools from '../../tools/Tools.js';
import Timer from '../../tools/Timer.js';

/**
 * Class representing a Menu.
 * */
class Roller extends createjs.Container{
    /**
     *
     * @param {object} styleData - 格式数据
     *  {
     *  width:480,
     *  height:260,
     *  dir:"v",
     *  itemClass:null,
     *  itemParam:null,
     *  showCount:10,
     *  itemGap:10,
     *  marginTop:0,
     *  marginLeft:0,
     *  curFirstIdx:0,

     *  blAlpha:1,
     *  bgColor:"#17266D",

     *  bgRadius:10,
     *  bgRadiusTL:null,
     *  bgRadiusTR:null,
     *  bgRadiusBR:null,
     *  bgRadiusBL:null,

     *  blAni:true,
     *  skipCount:1,
     *  skipTime:2000,
     *  pauseTime:3000,
     *  arrData:[]
     * }
     * */
    constructor(styleData) {
        super();
        if(styleData == null){
            console.error('Roller:constructor - param is null,please give a param with "itemClass" property');
            return;
        }
        if(!Tools.hasProperty(styleData,"itemClass")){
            console.error('Roller:constructor - lack of necessary "itemClass" attribute');
            return;
        }
        this.setDefaultData();
        this.setStyleData(styleData);

        if(this._bgRadiusTL == null)this._bgRadiusTL = (this._bgRadius != null)?this._bgRadius:0;
        if(this._bgRadiusTR == null)this._bgRadiusTR = (this._bgRadius != null)?this._bgRadius:0;
        if(this._bgRadiusBR == null)this._bgRadiusBR = (this._bgRadius != null)?this._bgRadius:0;
        if(this._bgRadiusBL == null)this._bgRadiusBL = (this._bgRadius != null)?this._bgRadius:0;

        this.initView();
    }
    setDefaultData() {
        this._width = 480;
        this._height = 260;
        this._dir = "v";
        this._itemClass = null;
        this._itemParam = null;
        this._showCount = 10;
        this._itemGap = 10;
        this._marginTop = 0;
        this._marginLeft = 0;
        this._curFirstIdx = 0;

        this._blAlpha = 1;
        this._bgColor = "#17266D";

        this._bgRadius = 10;
        this._bgRadiusTL = null;
        this._bgRadiusTR = null;
        this._bgRadiusBR = null;
        this._bgRadiusBL = null;

        this._blCache = false;
        this._blAni = true;
        this._skipCount = 1;
        this._skipTime = 2000;
        this._pauseTime = 3000;
        this._arrData = [];

        this.__items = [];
    }

    setStyleData = (styleData)=>{
        for(let k in styleData){
            if(("_"+k) in this){
                this["_"+k] = styleData[k];
            }
        }
    };

    initView(){
        this.bg = new createjs.Shape();
        this.bg.graphics.beginFill(this._bgColor).drawRoundRectComplex(0,0,this._width,this._height,this._bgRadiusTL,this._bgRadiusTR,this._bgRadiusBR,this._bgRadiusBL).endFill();
        this.bg.alpha = this._blAlpha;

        this.itemCon = new createjs.Container();
        var mask = new createjs.Shape();
        mask.graphics.beginFill("#000000").drawRoundRectComplex(0,0,this._width,this._height,this._bgRadiusTL,this._bgRadiusTR,this._bgRadiusBR,this._bgRadiusBL).endFill();
        this.itemCon.mask = mask;

        this.createItem(this._showCount + this._skipCount);
        this.setDataByPos();
        this.addChild(this.bg,this.itemCon);

        if(this._blAni){
            this.startAni();
        }
    }
    setDataByPos(){
        var item;
        if(this._arrData.length<=this._showCount){
            for(var i=0;i<this.__items.length;i++){
                if(i<this._arrData.length){
                    this.__items[i].setData(this._arrData[i]);
                    this.__items[i].visible = true;
                    if(this._blCache){
                        this.__items[i].cache(0,0,this.__items[i].width,this.__items[i].height);
                    }
                }else{
                    this.__items[i].visible = false;
                    if(this._blCache){
                        this.__items[i].uncache();
                    }
                }
                this.itemCon.addChild(this.__items[i]);
            }
        }else{
            for(var i=0;i<this.__items.length;i++){
                this.__items[i].visible = true;
                var idx = (this._curFirstIdx+i)%this._arrData.length;
                this.__items[i].setData(this._arrData[idx]);
                if(this._blCache){
                    this.__items[i].cache(0,0,this.__items[i].width,this.__items[i].height);
                }
                this.itemCon.addChild(this.__items[i]);
            }
        }
        this.setPos();
    }
    setPos(){
        this.itemCon.x = this.itemCon.y = 0;
        if(this._dir !== "v"){
            var pos = this._marginLeft;
            for(let i=0;i<this.__items.length;i++){
                this.__items[i].x = pos;
                this.__items[i].y = this._marginTop;
                pos = this.__items[i].x + this.__items[i].width + this._itemGap;
            }
        }else{
            var pos = this._marginTop;
            for(let i=0;i<this.__items.length;i++){
                this.__items[i].x = this._marginLeft;
                this.__items[i].y = pos;
                pos = this.__items[i].y + this.__items[i].height + this._itemGap;
            }
        }
    }
    createItem(c){
        if(this.__items.length<c){
            var leg = this.__items.length;
            var cc = c-leg;
            var s;
            for(var i=0;i<cc;i++){
                this.__items.push(new this._itemClass(this._itemParam));
            }
        }
    }
    reset() {
        createjs.Tween.removeTweens (this.itemCon);
        this.itemCon.removeAllChildren();
        this._arrData = [];
    }
    setData(arrData){
        this.reset();
        this._arrData = arrData;
        this._curFirstIdx = 0;
        this.setDataByPos();
        if(this._blAni){
            this.startAni();
        }
    }
    clear(){
        createjs.Tween.removeTweens (this.itemCon);
        this.itemCon.removeAllChildren();
        this._arrData = [];
        for(let i=0;i<this.__items.length;i++){
            if(this._blCache){
                this.__items[i].uncache();
            }
            if(this.__items[i].clear){
                this.__items[i].clear();
            }
        }
        this.__items = [];
        Tools.clearProp(this);
    }

    startAni(){
        createjs.Tween.removeTweens (this.itemCon);
        if(this._arrData.length>this._showCount){
            this.ani();
        }
    }
    ani = ()=>{
        if(this._dir !== "v"){
            var d = -(this.__items[this._skipCount].x - this.__items[0].x);
            createjs.Tween.get(this.itemCon).wait(this._pauseTime).to({x:d}, this._skipTime).call(this.recalculate);
        }else{
            var d = -(this.__items[this._skipCount].y - this.__items[0].y);
            createjs.Tween.get(this.itemCon).wait(this._pauseTime).to({y:d}, this._skipTime).call(this.recalculate);
        }
    };
    recalculate = ()=>{
        var arr = this.__items.splice(0,this._skipCount);
        for(var i=0;i<arr.length;i++){
            this.__items.push(arr[i]);
        }

        this._curFirstIdx += this._skipCount;
        this._curFirstIdx %= this._arrData.length;

        for(var i=this._showCount;i<this.__items.length;i++){
            var idx = (this._curFirstIdx+ i)%this._arrData.length;
            this.__items[i].setData(this._arrData[idx]);
            if(this._blCache){
                this.__items[i].cache(0,0,this.__items[i].width,this.__items[i].height);
            }
        }
        this.setPos();

        this.next();
    };
    next(){
        this.ani();
    }
}

export default Roller;
