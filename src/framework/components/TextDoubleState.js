/**
 * Created by wind on 2016/1/20.
 *
 *
 *
 *
 */
import '../../libs/createjs.js';
class TextDoubleState extends createjs.Container{
    /**
     *
     * @param styleData
     *  {
     *      text:"",
     *      width:100,
     *      height:30,
     *      textAlign:"center",
     *      selected:false,
     *      textSelectedFont:"15px 微软雅黑",
     *      textSelectedColor:"#ffffff",
     *      textSelectedAlpha:1,
     *      textUnselectedFont:"15px 微软雅黑",
     *      textUnselectedColor:"#000000",
     *      textUnselectedAlpha:1,
     *      bgSelectedColor:"#333333",
     *      bgSelectedAlpha:0.5,
     *      bgUnselectedColor:"#ffffff",
     *      bgUnselectedAlpha:0.01
     *  }
     */
    constructor(styleData){
        super();
        this.setDefaultData();
        this.setStyleData(styleData==null?{}:styleData);
        this.initView();
    }
    setStyleData = (styleData)=>{
        for(let k in styleData){
            if(("_"+k) in this){
                this["_"+k] = styleData[k];
            }
        }
    };
    setDefaultData(){
        this._text = "";
        this._width = 100;
        this._height = 30;
        this._textAlign = "center";
        this._selected = false;
        this._textSelectedFont = "15px 微软雅黑";
        this._textSelectedColor = "#ffffff";
        this._textSelectedAlpha = 1;
        this._textUnselectedFont = "15px 微软雅黑";
        this._textUnselectedColor = "#000000";
        this._textUnselectedAlpha = 1;
        this._bgSelectedColor = "#333333";
        this._bgSelectedAlpha = 0.5;
        this._bgUnselectedColor = "#ffffff";
        this._bgUnselectedAlpha = 0.01;
    }
    get width(){
        return this._width;
    }
    set width(v){
        this._width = v;
    }
    get height(){
        return this._height;
    }
    set height(v){
        this._height = v;
    }
    initView() {
        this.eventShape = new createjs.Shape();//只有文字的话，点在文字的空隙处无法触发，所以加shape
        this.title = new createjs.Text(this._text);

        //this.width = this.title.getMeasuredWidth();
        //this.height = this.title.getMeasuredHeight();
        this.setTextStyle();
        this.setBgStyle();
        this.setTextPos();

        this.addChild(this.eventShape,this.title);
    }
    setBgStyle(){
        if(this._selected){
            this.eventShape.graphics.clear().beginFill(this._bgSelectedColor).drawRect(0, 0, this._width, this._height).endFill();
            this.eventShape.alpha = this._bgSelectedAlpha;
        }else{
            this.eventShape.graphics.clear().beginFill(this._bgUnselectedColor).drawRect(0, 0, this._width, this._height).endFill();
            this.eventShape.alpha = this._bgUnselectedAlpha;
        }
    }
    setTextPos(){
        if(this._textAlign == "center"){
            this.title.x = (this._width-this.title.getMeasuredWidth())/2;
        }else if(this._textAlign == "right"){
            this.title.x = this._width-this.title.getMeasuredWidth();
        }else{
            this.title.x = 0;
        }
        this.title.y = (this._height-this.title.getMeasuredHeight())/2;
    }
    setTextStyle(){
        if(this._selected){
            this.title.font = this._textSelectedFont;
            this.title.color = this._textSelectedColor;
            this.title.alpha = this._textSelectedAlpha;
        }else{
            this.title.font = this._textUnselectedFont;
            this.title.color = this._textUnselectedColor;
            this.title.alpha = this._textUnselectedAlpha;
        }
    }
    set text(txt) {
        if(txt == null){
            txt = "";
        }
        if(this._text != txt){
            this._text = txt;
            this.title.text = txt;
            //this.width = this.title.getMeasuredWidth();
            //this.height = this.title.getMeasuredHeight();
            this.setBgStyle();
            this.setTextPos();
        }
    }
    get text(){
        return this._text;
    }
    setData(d,propName){
        if(propName==null){
           if(typeof d === "string"){
                this.text = d;
           }else{
               this.text = "";
               console.error("MenuItemText.setData :  Illegal Data");
           }
        }else{
            this.text = d[propName];
        }
    }
    set selected(bl){
        this._selected = bl===true;
        this.setTextStyle();
        this.setBgStyle();
    }
    get selected(){
        return this._selected;
    }
}

export default TextDoubleState;