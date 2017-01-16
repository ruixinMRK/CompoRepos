/**
 * Created by Administrator on 2016/8/1 0001.
 */
//父类
import '../../libs/createjs.js';
import ObjectPool from '../../tools/ObjectPool.js';

/**
 * 我是基类
 * @extends createjs.Container
 */
class Base extends createjs.Container
{

    constructor(){
        super();
    }
    init(){

    }
    updata(){

    }
    reset(){

    }
    clear(){
    }
    //矩形
    drawRect(w1,h1,color){

        let roundObject = new createjs.Shape();
        roundObject.graphics.beginFill(color);
        roundObject.graphics.drawRect(0,0,w1,h1);
        roundObject.graphics.endFill();
        return roundObject;
    }

    //画立体柱子
    drawCylinder(w1,h1,r,colorArr)
    {
        r = r||6;
        let roundObject = new createjs.Shape();
        let colors = colorArr||["#00FFFF","#0099FF"];
        let alphas = [1,1];
        let ratios = [0,0xFF];
        let color1 = "#" + colors[0].substr(1,1) + colors[0].substr(3,1) + colors[0].substr(5,1);
        let color2 = "#" + colors[1].substr(1,1) + colors[1].substr(3,1) + colors[1].substr(5,1);
        roundObject.graphics.beginLinearGradientFill([color1,color2], [0, 1], 0, 0, 0, h1);
        if(h1 > 0){
            roundObject.graphics.moveTo( 0,  0 + h1);
            roundObject.graphics.bezierCurveTo(0,h1 + 2 * r, w1,h1+ 2 * r, w1, h1);
            roundObject.graphics.lineTo( w1, 0);
            roundObject.graphics.bezierCurveTo(w1,2 * r,0,2 * r,0,0);
            roundObject.graphics.endFill();
        }
        roundObject.graphics.beginFill(this.getDarkColor(colors[1],0.1));
        roundObject.graphics.moveTo( 0, 0);
        roundObject.graphics.bezierCurveTo(0,-2 *r, w1,-2 * r, w1, 0);
        roundObject.graphics.bezierCurveTo(w1,2 *r,0,2 * r,0,0);
        roundObject.graphics.endFill();
        return roundObject;
    }


    //画圆
    drawCircle($x,$y,$radius,$color)
    {
        let $s = new createjs.Shape();
        $s.graphics.beginFill($color);
        $s.graphics.drawCircle(0,0,$radius);
        $s.graphics.endFill();
        $s.x = $x;
        $s.y = $y;
        return $s;
    }



    //画线
    drawLine($s,$dataArr,$lineColor,$thickness,$isFill,$fillColor,$joinType)
    {
        let $lC = $lineColor||"#ffffff";
        let $tN = $thickness||2.5;
        let $iF = $isFill == 'undefined'?false:$isFill;
        let $fC = $fillColor||"#ffffff";

        let $T  = $joinType||0;
        if(!$s) return;
        $s.graphics.clear();
        $s.graphics.setStrokeStyle($tN,0,$T);

        $s.graphics.beginStroke($lC);
        if($iF) $s.graphics.beginFill($fC);

        let len = $dataArr.length;
        let n = 0;

        for(let i =0;i<len;i++){
            if(!(i%2)){
                !n?$s.graphics.moveTo($dataArr[i],$dataArr[i+1]):$s.graphics.lineTo($dataArr[i],$dataArr[i+1]);
                n++;
            }
        }
        $s.graphics.endFill();
        return $s;
    }

    //文本
    getTxt(str,color,size,_x,_y,sL,$font){

        // 黑体：SimHei
        // 宋体：SimSun
        // 新宋体：NSimSun
        // 仿宋：FangSong
        // 楷体：KaiTi
        // 仿宋_GB2312：FangSong_GB2312
        // 楷体_GB2312：KaiTi_GB2312
        // 微软雅黑体：Microsoft YaHei

        color = color||"#ffffff";
        size = size||20;
        sL = sL||'';
        _x = _x||0;
        _y = _y||0;
        $font = $font;

        // console.log($font);
        let txt = ObjectPool.getObj('txt');
        txt.color = color;
        txt.font = size + "px " + $font;
        txt.text = '' + str;

        if(sL == "left"){
            txt.x = _x;
            txt.y = _y - txt.getMeasuredHeight()/2;
        }
        else if(sL == "right"){
            txt.x = _x - txt.getMeasuredWidth();
            txt.y = _y - txt.getMeasuredHeight()/2;
        }
        else if(sL == "bottom"){
            txt.x = _x - txt.getMeasuredWidth()/2;
            txt.y = _y;
        }
        else if(sL == "top"){
            txt.x = _x - txt.getMeasuredWidth()/2;
            txt.y = _y - txt.getMeasuredHeight();
        }
        else{
            txt.x = _x;
            txt.y = _y;
        }

        return txt;
    }


}

export default  Base;
