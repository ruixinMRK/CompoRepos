/**
 * Created by wind on 2016/1/20.
 *
 *
 *
 *
 */
import '../../libs/createjs.js';
import Tools from '../../tools/Tools.js';

class TextDoubleState extends createjs.Container{
    /**
     *
     * @param styleData
     *  {
     *      text:"",
     *      width:66,
     *      height:28,
     *      selected:false,
     *      textSelectedOffX:0,
     *      textSelectedOffY:0,
     *      textSelectedFont:"20px 微软雅黑",
     *      textSelectedColor:"#ffffff",
     *      textSelectedAlpha:1,
     *      textUnselectedOffX:0,
     *      textUnselectedOffY:0,
     *      textUnselectedFont:"20px 微软雅黑",
     *      textUnselectedColor:"#6a79ac",
     *      textUnselectedAlpha:1,
     *      bgSelectedImg:null,
     *      bgSelectedImgX:0,
     *      bgSelectedImgY:0,
     *      bgSelectedColor:"#000000",
     *      bgSelectedAlpha:0.01,
     *      bgUnselectedImg:null,
     *      bgUnselectedImgX:0,
     *      bgUnselectedImgY:0,
     *      bgUnselectedColor:"#000000",
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
                if(k=="bgSelectedImg" || k=="bgUnselectedImg"){
                  this["_"+k] = styleData[k].clone();
                }else{
                  this["_"+k] = styleData[k];
                }
            }
        }
    };
    setDefaultData(){
        this._text = "";
        this._width = 66;
        this._height = 28;
        this._selected = false;
        this._textSelectedOffX = 0;
        this._textSelectedOffY = 0;
        this._textSelectedFont = "20px 微软雅黑";
        this._textSelectedColor = "#ffffff";
        this._textSelectedAlpha = 1;
        this._textUnselectedOffX = 0;
        this._textUnselectedOffY = 0;
        this._textUnselectedFont = "20px 微软雅黑";
        this._textUnselectedColor = "#6a79ac";
        this._textUnselectedAlpha = 1;
        this._bgSelectedImg = null;
        this._bgSelectedImgX = 0;
        this._bgSelectedImgY = 0;
        this._bgSelectedColor = "#000000";
        this._bgSelectedAlpha = 0.01;
        this._bgUnselectedImg = null;
        this._bgUnselectedImgX = 0;
        this._bgUnselectedImgY = 0;
        this._bgUnselectedColor = "#000000";
        this._bgUnselectedAlpha = 0.01;
        this._rectRadius = 0;
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

        this.addChild(this.eventShape);
        if(this._bgSelectedImg){
          this._bgSelectedImg.x = this._bgSelectedImgX;
          this._bgSelectedImg.y = this._bgSelectedImgY;
          this.addChild(this._bgSelectedImg);
        }
        if(this._bgUnselectedImg){
          this._bgUnselectedImg.x = this._bgUnselectedImgX;
          this._bgUnselectedImg.y = this._bgUnselectedImgY;
          this.addChild(this._bgUnselectedImg);
        }
        this.addChild(this.title);
    }
    setBgStyle(){
        if(this._selected){
            this.eventShape.graphics.clear().beginFill(this._bgSelectedColor).drawRoundRectComplex (0, 0, this._width, this._height,this._rectRadius,this._rectRadius,this._rectRadius,this._rectRadius).endFill();
            this.eventShape.alpha = this._bgSelectedAlpha;
            this.title.x = (this._width - this.title.getMeasuredWidth())/2 + this._textSelectedOffX;
            this.title.y = (this._height - this.title.getMeasuredHeight())/2 + this._textSelectedOffY;
        }else{
            this.eventShape.graphics.clear().beginFill(this._bgUnselectedColor).drawRoundRectComplex (0, 0, this._width, this._height,this._rectRadius,this._rectRadius,this._rectRadius,this._rectRadius).endFill();
            this.eventShape.alpha = this._bgUnselectedAlpha;
            this.title.x = (this._width - this.title.getMeasuredWidth())/2 + this._textUnselectedOffX;
            this.title.y = (this._height - this.title.getMeasuredHeight())/2 + this._textUnselectedOffY;
        }
        if(this._bgSelectedImg){
          this._bgSelectedImg.visible = this._selected;
        }
        if(this._bgUnselectedImg){
          this._bgUnselectedImg.visible = !this._selected;
        }
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
    getMeasuredWidth(){
      return this.title.getMeasuredWidth();
    }
    getMeasuredHeight(){
      return this.title.getMeasuredHeight();
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
               console.error("TextDoubleState.setData :  Illegal Data");
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
    clear(){
      this.removeAllChildren();
      Tools.clearProp(this);
    }
}

export default TextDoubleState;
