/**
 * Created by Administrator on 2016/8/1 0001.
 */
//父类
class Base extends createjs.Container
{

    constructor(){
        super();
    }

    //画虚线
    drawDash (x1,y1,x2,y2,color,alpha,dash,ed)
    {
        let s = new createjs.Shape();
        s.graphics.setStrokeStyle(1);
        s.graphics.beginStroke(color);
        //计算起点终点连续的角度
        var angle = Math.atan2(y2 - y1,x2 - x1);
        //步长，每次循环改变的长度
        var step = dash + ed;
        //每段实线水平和竖直长度
        var dashx = dash * Math.cos(angle);
        var dashy = dash * Math.sin(angle);
        //每段虚线水平和竖直长度
        var edx = ed * Math.cos(angle);
        var edy = ed * Math.sin(angle);
        //每段实线和虚线的水平和垂直长度
        var stepx = step * Math.cos(angle);
        var stepy = step * Math.sin(angle);
        //起点和终点的距离
        var _length = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));

        //使用循环，逐段绘制
        for (var i=step,px=x1,py=y1; i<_length; i+=step) {
            s.graphics.moveTo (px+edx,py+edy);
            s.graphics.lineTo (px+dashx,py+dashy);
            //循环递归
            px+=stepx;
            py+=stepy;
        }
        return s;
    }

    // 贝塞尔虚线
    drawBezierDash(x1,y1,x2,y2,x3,y3,color){

        let s = new createjs.Shape();
        s.graphics.setStrokeStyle(1);
        s.graphics.beginStroke(color);

        let t = 0;
        let drawLineIndex = 0;
        let lineX = 0;
        let lineY = 0;

        while(t<=1){

            t += 0.01;
            drawLineIndex++;

            //二次贝塞尔曲线公式
            lineX = Math.pow((1-t),2)*x1+2*t*(1-t)*x2 + Math.pow(t,2)*x3;
            lineY = Math.pow((1-t),2)*y1+2*t*(1-t)*y2 + Math.pow(t,2)*y3;

            //三次贝塞尔曲线公式
            //lineX = Math.pow((1-t),3)*p1.x + 3*p2.x*t*(1-t)*(1-t) + 3*p3.x*t*t*(1-t) + p4.x *Math.pow(t,3);
            //lineY = Math.pow((1-t),3)*p1.y + 3*p2.y*t*(1-t)*(1-t) + 3*p3.y*t*t*(1-t) + p4.y *Math.pow(t,3);

            if (drawLineIndex % 2 == 0) {
                s.graphics.lineTo(lineX, lineY);
            } else {
                s.graphics.moveTo(lineX, lineY);
            }

        }

        return s;
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
    drawLine($s,$dataArr,$lineColor,$thickness,$isFill,$fillColor)
    {
        let $lC = $lineColor||"#ffffff";
        let $tN = $thickness||2.5;
        let $iF = $isFill == 'undefined'?false:$isFill;
        let $fC = $fillColor||"#ffffff";
        if(!$s) return;
        $s.graphics.clear();
        $s.graphics.setStrokeStyle($tN);
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
        let txt = new createjs.Text(str + '');
        txt.color = color;
        txt.font = size + "px " + $font;

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