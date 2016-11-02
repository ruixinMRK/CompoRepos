/**
 * Created by wind on 2016-04-20.
 */
import '../../libs/createjs.js';
import Tools from '../../tools//Tools.js';
import ObjectPool from '../../tools/ObjectPool';

class ProgressBar extends createjs.Container{
  constructor(styleData) {
    super();

    this.setDefaultData();
    this.setStyleData(styleData==null?{}:styleData);

    this.objPool = [];
    this.txtEmDis = 0;

    this._shadowLinearGradientRatiosX0 = 0;
    this._shadowLinearGradientRatiosY0 = 0;
    this._shadowLinearGradientRatiosX1 = 0;
    this._shadowLinearGradientRatiosY1 = 0;

    //渐变的方向
    switch (this._shadowLinearGradientDir){
      case "l2r":
        this._shadowLinearGradientRatiosX1 = this._barWidth;
        break;
      case "r2l":
        this._shadowLinearGradientRatiosX0 = this._barWidth;
        break;
      case "lt2rb":
        this._shadowLinearGradientRatiosX1 = this._barWidth;
        this._shadowLinearGradientRatiosY1 = this._barHeight;
        break;
      case "rb2lt":
        this._shadowLinearGradientRatiosX0 = this._barWidth;
        this._shadowLinearGradientRatiosY0 = this._barHeight;
        break;
      case "t2b":
        this._shadowLinearGradientRatiosY1 = this._barHeight;
        break;
      case "b2t":
        this._shadowLinearGradientRatiosY0 = this._barHeight;
        break;
      case "rt2lb":
        this._shadowLinearGradientRatiosX0 = this._barWidth;
        this._shadowLinearGradientRatiosY1 = this._barHeight;
        break;
      case "lb2rt":
        this._shadowLinearGradientRatiosY0 = this._barHeight;
        this._shadowLinearGradientRatiosX1 = this._barWidth;
        break;
      default :
        this._shadowLinearGradientRatiosY1 = this._barHeight;
        break;
    }
    this.initView();
  };
  setDefaultData(){
    this._barMaginLeft = 20;
    this._borderThickness = 4;
    this._barWidth = 616;
    this._barHeight = 42;
    this._barRound = 20;
    this._bgColor="#1e1e1e";
    this._boardColor="#ffffff";
    this._prgColor="";
    this._flagLineColor="#ffffff";
    this._flagTrgColor="#3e4556";
    this._flagPos=0;
    this._flagTrgHalfLength = 17;
    this._flagTrgHeight = 17;
    this._flagTrgBarGap = 3;
    this._curTrgColor="#ffae00";
    this._curTrgHalfLength = 17;
    this._curTrgHeight = 17;
    this._curPos=0;
    this._curTrgBarGap = 3;
    this._txtArr = [];
    this._shadowLinearGradientColors =  ["rgba(0,0,0,0.4)","rgba(0,0,0,0)"];
    this._shadowLinearGradientRatios = [0,1];
    this._shadowLinearGradientDir = "lt2rb";
    this._tweenDuring = 1000;
  }
  setStyleData = (styleData)=>{
    for(let k in styleData){
      if(("_"+k) in this){
        this["_"+k] = styleData[k];
      }
    }
  };
  initView(){
    this.barCon = ObjectPool.getObj('con');this.barCon.x = this._barMaginLeft;

    this.bg = ObjectPool.getObj('shape');
    this.bg.graphics.beginFill(this._bgColor).drawRoundRect(0,0,this._barWidth,this._barHeight,this._barRound).endFill();
    this.bg.x = this._borderThickness;this.bg.y = this._borderThickness;

    this.prg = ObjectPool.getObj('shape');
    if(this._prgColor){
      this.prg.graphics.beginFill(this._prgColor).drawRoundRect(0,0,this._barWidth,this._barHeight,this._barRound).endFill();
    }
    else{
      this.prg.graphics.beginLinearGradientFill(this._shadowLinearGradientColors,this._shadowLinearGradientRatios,
          this._shadowLinearGradientRatiosX0, this._shadowLinearGradientRatiosY0,
          this._shadowLinearGradientRatiosX1,this._shadowLinearGradientRatiosY1).drawRoundRect(0,0,this._barWidth,this._barHeight,this._barRound).endFill();
    }
    this.prg.x = this._borderThickness;this.prg.y = this._borderThickness;

    this.doneRect = ObjectPool.getObj('shape');
    this.doneRect.graphics.beginFill("#000000").drawRect(0, 0, /*this._curPos**/this._barWidth,this._barHeight).endFill();
    this.doneRect.x = this._borderThickness;this.doneRect.y = this._borderThickness;
    this.doneRect.scaleX = this._curPos;
    this.prg.mask = this.doneRect;

    //灰色的标记线
    this.flagLine = ObjectPool.getObj('shape');
    this.flagLine.graphics.beginStroke(this._flagLineColor).moveTo(0,0).lineTo(0,this._barHeight).endStroke();
    this.flagLine.x = this._borderThickness + this._flagPos*this._barWidth;this.flagLine.y = this._borderThickness;

    this.flagLineMask = ObjectPool.getObj('shape');
    this.flagLineMask.graphics.beginFill("#000000").drawRoundRect(0, 0, this._barWidth, this._barHeight,this._barRound).endFill();
    this.flagLineMask.x = this._borderThickness;this.flagLineMask.y = this._borderThickness;
    this.flagLine.mask = this.flagLineMask;

    this.board = ObjectPool.getObj('shape');
    this.board.graphics.setStrokeStyle(this._borderThickness,"round").beginStroke(this._boardColor).drawRoundRect(0,0,this._barWidth+this._borderThickness,this._barHeight+this._borderThickness,this._barRound+this._borderThickness/2).endStroke();
    this.board.x = this._borderThickness/2;this.board.y = this._borderThickness/2;

    this.flagTrg = ObjectPool.getObj('shape');
    this.flagTrg.graphics.beginFill(this._flagTrgColor).moveTo(0,0).lineTo(this._flagTrgHalfLength,this._flagTrgHeight).lineTo(-this._flagTrgHalfLength,this._flagTrgHeight).lineTo(0,0).endFill();
    this.flagTrg.x = this._barMaginLeft + this._flagPos*this._barWidth;this.flagTrg.y = this._borderThickness + this._barHeight+this._flagTrgBarGap;

    this.curTrg = ObjectPool.getObj('shape');
    this.curTrg.graphics.beginFill(this._curTrgColor).moveTo(0,0).lineTo(this._curTrgHalfLength,this._curTrgHeight).lineTo(-this._curTrgHalfLength,this._curTrgHeight).lineTo(0,0).endFill();
    this.curTrg.x = this._barMaginLeft + this._curPos*this._barWidth;this.curTrg.y = this._borderThickness + this._barHeight+this._curTrgBarGap;

    this.barCon.addChild(this.bg,this.prg,this.flagLine,this.board);

    this.curTagCon = ObjectPool.getObj('con');
    this.curTagCon.addChild(this.curTrg);

    this.objPool.push(this.barCon,this.bg,this.prg,this.doneRect,this.flagLine,this.flagLineMask,this.board,this.flagTrg,this.curTrg);
    this.addChild(this.barCon,this.flagTrg,this.curTagCon);

    // alert(this._txtArr);
    if(this._txtArr&&this._txtArr.length){

      let i = 0;
      for(;i<this._txtArr.length;i++){

        let obj = this._txtArr[i];

        this['txt_'+obj.id] = ObjectPool.getObj('txt');
        this['txt_'+obj.id].font = (obj.size||20) + "px " + (obj.font||"Microsoft YaHei");
        this['txt_'+obj.id].color = obj.color||'#fff';
        this['txt_'+obj.id].textAlign  = obj.autoSize||'left';
        this['txt_'+obj.id].text = obj.value;
        this.objPool.push(this['txt_'+obj.id]);

        this['txt_'+obj.id].x = obj.offsetX;
        this['txt_'+obj.id].y = obj.offsetY;
        this.addChild(this['txt_'+obj.id]);

        //游标下方的标题和值
        if(obj.id === 'secTitle'||obj.id === 'secValue') this.curTagCon.addChild(this['txt_'+obj.id]);this['txt_'+obj.id].y = -50 + obj.offsetY;

        obj.id === 'secTitle'?(this['txt_'+obj.id].x = this.curTrg.x + obj.offsetX,this['txt_'+obj.id].y = this.curTrg.y + 15 + obj.offsetY):'';
        obj.id === 'secValue'?(this['txt_'+obj.id].x = this['txt_secTitle']?this['txt_secTitle'].x + this['txt_secTitle'].getMeasuredWidth() +  15 + obj.offsetX:obj.offsetX,this['txt_'+obj.id].y = this.curTrg.y + 15 + obj.offsetY):'';
        obj.id === 'mainTitle'?(this['txt_'+obj.id].x = this._barWidth/2 + obj.offsetX):'';
        obj.id === 'mainValue'?(this['txt_'+obj.id].x = this['txt_mainTitle']?this['txt_mainTitle'].x + this['txt_mainTitle'].getMeasuredWidth() + 5 +obj.offsetX:obj.offsetX):'';
        obj.id === 'mainTitleEM'?(this['txt_'+obj.id].x = this['txt_mainTitleEM']?this['txt_mainTitleEM'].x + this['txt_mainTitleEM'].getMeasuredWidth() + 5 +obj.offsetX:obj.offsetX,this.txtEmDis = obj.offsetX):'';





      }

    }


  }

  updata(arr){

    let i = 0;
    let L = arr.length;

    for(;i<L;i++){

      let obj = arr[i];
      obj.id == 'total'&&this['txt_mainValue']&&(this['txt_mainValue'].text = obj.value,this['txt_mainTitleEM']?(this['txt_mainTitleEM'].x = this['txt_mainValue'].x + this['txt_mainValue'].getMeasuredWidth()+ 5 + this.txtEmDis):this.txtEmDis);
      // alert(obj.id);
      if(obj.id == 'history'){

        this._flagPos = obj.value;
        createjs.Tween.removeTweens(this.flagLine);
        createjs.Tween.removeTweens(this.flagTrg);

        createjs.Tween.get(this.flagLine)
            .to({
              x: this._barMaginLeft+this._borderThickness + this._flagPos*this._barWidth
            }, this._tweenDuring );
        createjs.Tween.get(this.flagTrg)
            .to({
              x: this._barMaginLeft+this._borderThickness + this._flagPos*this._barWidth
            }, this._tweenDuring );


      }

      if(obj.id == 'current'){

        this._curPos = obj.value;
        createjs.Tween.removeTweens(this.curTagCon);
        createjs.Tween.removeTweens(this.doneRect);

        this['txt_secValue']&&(this['txt_secValue'].text = (obj.value+'').indexOf('%')>0?obj.value:Number(obj.value) * 100 +'%');

        createjs.Tween.get(this.doneRect)
            .to({
              scaleX: this._curPos
            }, this._tweenDuring );
        createjs.Tween.get(this.curTagCon)
            .to({
              x: this._barMaginLeft+this._borderThickness+this._curPos*this._barWidth
            }, this._tweenDuring );

      }

    }

  }

  clear(){
    createjs.Tween.removeTweens(this.doneRect);
    createjs.Tween.removeTweens(this.curTagCon);

    createjs.Tween.removeTweens(this.flagLine);
    createjs.Tween.removeTweens(this.flagTrg);
    this.removeAllChildren();
    this.curTagCon.removeAllChildren();
    ObjectPool.returnObj(this.objPool);
    this.objPool = [];
    Tools.clearProp(this);
  }
}

export default ProgressBar;
