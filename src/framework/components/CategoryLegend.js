/**
 * Created by wind on 2016/1/4.
 */
import '../../libs/createjs.js';
import Tools from '../../tools/Tools.js';
import Timer from '../../tools/Timer.js';

/**
 * Class representing a Menu.
 * */
class CategoryLegend extends createjs.Container{
    /**
     *
     * @param {object} styleData - 格式数据
     *  {
     *      items:[],
     *      gap:10,
     *      dir:"h",
     *      selectedIndex:0,
     *      trigger:"click",
     *      blLoop:false,
     *      loopTime:1000,
     *      blMouseRelCon:false,
     *      relCons:[]
     * }
     * */
    constructor(styleData) {
        super();

        this.setDefaultData();
        this.setStyleData(styleData);

        this.initView();
    }
    setDefaultData(){
        this._itemW = 50;
        this._itemH = 13;
        this._itemNameGap = 4;
        this._itemValueGap = 4;
        this._itemTexts = ["正常","低","中","高","紧急"];
        this._itemColors = ["#E7E8EB","#B6B9C1","#858997","#FF9000","#FF2400"];
        this._itemNameFont = "22px 黑体";
        this._itemValueFont = "22px 黑体";
        this._blLine = true;
        this._lineL = 33;
        this._lineW = 2;
        this._lineLinearGradientColors = ["rgba(255,255,255,0.2)","rgba(255,255,255,1)"];
        this._lineLinearGradientRatios = [0,1];

        this.__lines = [];
        this.__itemsTxtName = [];
        this.__itemsTxtValue = [];
    }
    setStyleData = (styleData)=>{
        for(let k in styleData){
            if(("_"+k) in this){
                this["_"+k] = styleData[k];
            }
        }
    };
    initView (){
        this.createBar();
        this.createLine();
        this.createTxt();
    }
    createLine(){
        var l;
        for(var i=0;i<=this._itemTexts.length;i++){
            l = new createjs.Shape();
            l.graphics.setStrokeStyle(this._lineW).beginLinearGradientStroke(this._lineLinearGradientColors,this._lineLinearGradientRatios, 0, 0, 0, this._lineL).moveTo(0,0).lineTo(0, this._lineL).endStroke();
            l.x = i*this._itemW;
            this.addChild(l);
            this.__lines.push(l);
        }
    }
    createBar(){
        this._barShape = new createjs.Shape();
        this._barShape.y = this._lineL-this._itemH;
        var g = this._barShape.graphics;
        for(var i=0;i<this._itemTexts.length;i++){
            g.beginFill(this._itemColors[i]);
            g.drawRect(i*this._itemW,0,this._itemW,this._itemH);
            g.endFill();
        }
        this.addChild(this._barShape);
    }
    createTxt(){
        var n,v;
        for(var i=0;i<this._itemTexts.length;i++){
            n = new createjs.Text(this._itemTexts[i],this._itemNameFont,this._itemColors[i]);
            v = new createjs.Text("0",this._itemNameFont,this._itemColors[i]);
            n.textAlign = v.textAlign = "center";
            n.x = v.x = this._itemW*i + this._itemW/2;
            n.y = this._lineL + this._itemNameGap;
            v.y = this._lineL - (this._itemH + this._itemValueGap + v.getMeasuredLineHeight()+5);
            this.__itemsTxtName.push(n);
            this.__itemsTxtValue.push(v);
            this.addChild(n,v);
        }
    }

    setData(o){
        for (var key in o){
            this.setDataByName(key,o[key]);
        }
    }
    setDataByName(n,v){
        var idx = this._itemTexts.indexOf(n);
        if(idx != -1){
            this.__itemsTxtValue[idx].text = v;
        }
    }
    setDataByIndex(idx,v){
        if(idx>=0 && idx<this.__itemsTxtValue.length){
            this.__itemsTxtValue[idx].text = v;
        }
    }

    setLineVisibleByIdx(idx,bl){
        if(idx>=0 && idx<this.__lines.length){
            this.__lines[idx].visible = bl;
        }
    }

    set lineVisible(bl){
        for(var i=0;i<this.__lines.length;i++){
            this.__lines[i].visible = bl;
        }
    }

    setValueVisibleByIdx(idx,bl){
        if(idx>=0 && idx<this.__itemsTxtValue.length){
            this.__itemsTxtValue[idx].visible = bl;
        }
    }
    set valueVisible(bl){
        for(var i=0;i<this.__itemsTxtValue.length;i++){
            this.__itemsTxtValue[i].visible = bl;
        }
    }


    clear(){
        this._barShape.graphics.clear();
        this.removeAllChildren();
        this.__lines = [];
        this.__itemsTxtName = [];
        this.__itemsTxtValue = [];
        Tools.clearProp(this);
    }
}

export default CategoryLegend;
