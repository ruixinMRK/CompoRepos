/**
 * Created by wind on 2016/8/9.
 */
import '../../libs/createjs.js';
import Tools from '../../tools/Tools.js';
class TextString extends createjs.Container{
    /**
     *
     * @param styleData
     * {
     *      left:0,
     *      top:0,
     *      gapH:10,
     *      gapV:10,
     *      dir:"h",
     *      itemW:0,
     *      itemH:0,
     *      font:"16px 微软雅黑",
     *      color:"#000000",
     *      textAlign:"left",
     *      value:"",
     *      itemsStyle:[];
     *          itemsStyle事例：
     *          [{valueField:"v1",font:"15px 微软雅黑",color:"#000000",value:"text1",textAlign:"left",width:100,height:30},
     *          {valueField:"v2",font:"15px 微软雅黑",color:"#000000",value:"text2",textAlign:"left",width:100,height:30},
     *          {valueField:"v3",font:"15px 微软雅黑",color:"#000000",value:"text3",textAlign:"left",width:100,height:30}],
     *      bgImg:null,
     *      bgImgX:0,
     *      bgImgY:0
     * }
     */
    constructor(styleData){
        super();
        if(styleData == null){
            console.error('TextString:constructor - param is null,please give a param with "itemsStyle" property');
            return;
        }
        if(!Tools.hasProperty(styleData,"itemsStyle")){
            console.error('TextString:constructor - lack of necessary "itemsStyle" attribute');
            return;
        }
        this.setDefaultData();
        this.setStyleData(styleData);
        this.initView();
    }
    setDefaultData(){
        this._left = 0;
        this._top = 0;
        this._gapH = 10;
        this._gapV = 10;
        this._dir = "h";
        this._itemW = 0;
        this._itemH = 0;
        this._font = "16px 微软雅黑";
        this._color = "#000000";
        this._textAlign = "left";
        this._value = "";
        this._itemsStyle = [];

        this._bgImg = null;
        this._bgImgX = 0;
        this._bgImgY = 0;

        this._w = 0;
        this._h = 0;
        this.__arrText = [];
    }
    setStyleData = (styleData)=>{
        for(let k in styleData){
            if(("_"+k) in this){
                if(k=="bgImg"){
                    this["_"+k] = styleData[k].clone();
                }else {
                    this["_" + k] = styleData[k];
                }
            }
        }
    };
    initView(){
        if(this._bgImg){
            this._bgImg.x = this._bgImgX;
            this._bgImg.y = this._bgImgY;
            this.addChild(this._bgImg);
        }
        var txt;
        for(let i=0;i<this._itemsStyle.length;i++){
            txt = new createjs.Text("");
            this.__arrText.push(txt);
            this.setTextStyleByIdx(i);
            this.addChild(txt);
        }
        this.setTextPos();
    }
    setTextStyleByIdx(idx){
        if(idx>=this._itemsStyle.length){
            return;
        }

        var f,c,v,al;
        var st = this._itemsStyle[idx];
        if(Tools.hasProperty(st,"font")){
            f = st.font;
        }else{
            f = this._font;
        }
        if(Tools.hasProperty(st,"color")){
            c = st.color;
        }else{
            c = this._color;
        }
        if(Tools.hasProperty(st,"value")){
            v = st.value;
        }else{
            v = this._value;
        }
        if(Tools.hasProperty(st,"textAlign")){
            al = st.textAlign;
        }else{
            al = this._textAlign;
        }
        this.__arrText[idx].font = f;
        this.__arrText[idx].color = c;
        this.__arrText[idx].text = v;
        this.__arrText[idx].textAlign = al;
    }
    setTextPos(){
        this._w = this._h = 0;
        for(var i=0;i<this.__arrText.length;i++){
            var w=null,h=null,pw=null,ph=null;
            if(Tools.hasProperty(this._itemsStyle[i],"width")){
                w = this._itemsStyle[i].width;
            }else{
                w = this._itemW;
            }
            if(Tools.hasProperty(this._itemsStyle[i],"height")){
                h = this._itemsStyle[i].height;
            }else{
                h = this._itemH;
            }
            if(Tools.hasProperty(this._itemsStyle[i],"x")){
                this.__arrText[i].x = this._itemsStyle[i].x;
            }else{
                if(i==0){
                    this.setTextBeginX(this.__arrText[i],w,this._left);
                }else{
                    if(this._dir == "v"){
                        this.setTextBeginX(this.__arrText[i],w,this._left);
                    }else{
                        if(Tools.hasProperty(this._itemsStyle[i-1],"width")){
                            pw = this._itemsStyle[i-1].width;
                        }else{
                            pw = this._itemW;
                        }
                        this.setTextBeginX(this.__arrText[i],w,this.getTextEndX(this.__arrText[i-1],pw)+this._gapH);
                    }
                }
            }
            if(Tools.hasProperty(this._itemsStyle[i],"y")){
                this.__arrText[i].y = this._itemsStyle[i].y;
            }else{
                if(i==0){
                    this.setTextBeginY(this.__arrText[i],h,this._top);
                }else{
                    if(this._dir == "v"){
                        if(Tools.hasProperty(this._itemsStyle[i-1],"height")){
                            ph = this._itemsStyle[i-1].height;
                        }else{
                            ph = this._itemW;
                        }
                        this.setTextBeginY(this.__arrText[i],h,this.getTextEndY(this.__arrText[i-1],ph)+this._gapV);
                    }else{
                        this.setTextBeginY(this.__arrText[i],h,this._top);
                    }
                }
            }

            var tEX = this.getTextEndX(this.__arrText[i],w);
            if(this._w<tEX)this._w = tEX;
            var tEY = this.getTextEndY(this.__arrText[i],h);
            if(this._h<tEY)this._h = tEY;
        }
    }
    getTextEndX(txt,txtW){
        if(txtW==null || txtW==0){
            txtW = txt.getMeasuredWidth();
        }
        if(txt.textAlign === "left"){
            return txt.x + txtW;
        }else if(txt.textAlign === "center"){
            return txt.x + txtW/2;
        }else if(txt.textAlign === "right"){
            return txt.x;
        }else{
            return txt.x + txtW;
        }
    }
    getTextEndY(txt,txtH){
        if(txtH==null || txtH==0){
            txtH = txt.getMeasuredHeight();
        }
        return txt.y + txtH;
    }
    setTextBeginX(txt,txtW,v){
        if(txtW==null || txtW==0){
            txtW = txt.getMeasuredWidth();
        }
        if(txt.textAlign === "left"){
            txt.x = v;
        }else if(txt.textAlign === "center"){
            txt.x = v + txtW/2;
        }else if(txt.textAlign === "right"){
            txt.x = v + txtW;
        }else{
            txt.x = v;
        }
    }
    setTextBeginY(txt,txtH,v){
        txt.y = v;
    }
    get width(){
        return this._w;
    }
    get height(){
        return this._h;
    }
    setData(data){
        for(var i=0;i<this._itemsStyle.length;i++){
            if(Tools.hasProperty(data,this._itemsStyle[i]["valueField"])){
                this._itemsStyle[i].value = data[this._itemsStyle[i]["valueField"]];
                this.__arrText[i].text = this._itemsStyle[i].value;
            }
        }
    }
    clear(){
        this.removeAllChildren();
        this.__arrText.length = 0;
        this._itemsStyle.length = 0;
    }
}

export default TextString;