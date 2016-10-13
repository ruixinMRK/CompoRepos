/**
 * Created by Administrator on 2016/8/13.
 */
//管道图

import Base from './Base.js';
class PiPingDraw extends Base{

    constructor(rw,r){
        super();
        this.rw  =rw;
        this.r = r;

    }

    updata(arr){
        this._arr = arr;
        this.init();
    }

    init(){

        let L = this._arr.length;
        let x1 = 0;
        let y1 = 0;
        let w1 = 0;
        let h1 = 0;

        for(let i =0;i<L;i++){

            let obj = this._arr[i];
            let sp = new createjs.Container();
            let s1 = this.drawPiPing(new createjs.Shape(),obj.value,this.rw,this.r,'rgba(0,0,0,0)',obj.color)
            let s2 = this.drawPiPing(new createjs.Shape(),obj.value,this.rw,this.r,'rgba(0,0,0,0)','#rgba(0,0,0)')
            let sFil = this.drawPiPing(new createjs.Shape(),obj.value,this.rw/2,this.r/2,'rgba(0,0,0,0)',obj.color);
            let maskS = this.drawPiPing(new createjs.Shape(),obj.value,this.rw,this.r,'rgba(0,0,0,0)','#rgba(0,0,0)')
            s2.alpha = 0.45;
            sFil.alpha = 0.5;

            obj.value.forEach((b,ind) =>{
                if(ind%2==0){
                    x1 = x1 > b?b:x1;
                    w1 = w1 > b?w1:b;
                }
                else{
                    y1 = y1 > b?b:y1;
                    h1 = h1 > b?h1:b;
                }
            })

            let blurFilter = new createjs.BlurFilter(this.rw/2, this.rw/2, 1);
            sFil.filters = [blurFilter];
            sFil.cache(x1,y1,w1,h1);
            sp.addChild(s1,s2,sFil);
            sp.mask = maskS;
            this.addChild(sp);

        }
        //this.addChild(this.drawPiPing(new createjs.Shape(),[50,200,50,50,300,50,300,350],30,10,'rgba(0,0,0,0)','#0f0'));
        //this.addChild(this.drawPiPing(new createjs.Shape(),[50,200,50,50,300,50,300,350],30,10,'rgba(0,0,0,0)','rgba(0,0,0,0.55)'));
        //var A = this.drawPiPing(new createjs.Shape(),[50,200,50,50,300,50,300,350],15,5,'rgba(0,0,0,0)','rgba(0,255,0,0.5)');
        //var ms = this.drawPiPing(new createjs.Shape(),[50,200,50,50,300,50,300,350],15,5,'rgba(0,0,0,0)','rgba(0,255,0,0.5)');
        //A.mask = ms;
        //this.addChild(this.drawLine(new createjs.Shape(),[0,0,200,0,200,150,400,150,400,100],'#0f0',30,'','',1));
        //this.addChild(this.drawLine(new createjs.Shape(),[0,0,200,0,200,150,400,150,400,100],'rgba(0,0,0,0.4)',30,'','',1));
        //
        //var A = this.drawLine(new createjs.Shape(),[0,0,200,0,200,150,400,150,400,100],'rgba(0,255,0,0.5)',15,'','',1);
        //
        //var a = [50,200,50,50,300,50,300,350];
        //
        //
        //a.forEach((b,ind) =>{
        //    if(ind%2==0){
        //        x1 = x1 > b?b:x1;
        //        w1 = w1 > b?w1:b;
        //    }
        //    else{
        //        y1 = y1 > b?b:y1;
        //        h1 = h1 > b?h1:b;
        //    }
        //})
        //console.log(x1,y1,w1,h1);
        //var blurFilter = new createjs.BlurFilter(12, 12, 1);
        //A.filters = [blurFilter];
        //var bounds = A.getBounds();
        //A.cache(x1,y1,w1,h1);
        //this.addChild(A);

        //this.addChild(this.drawBezierDash(80,110,110,110,110,140,'#0f0'))
        //this.addChild(this.drawBezierDash(80,130,90,130,90,140,'#0f0'))

       // console.log('b-r');
       // this.addChild(this.drawPiPing(new createjs.Shape(),[50,200,50,50,300,50],30,10,'#0f0','#0f0'));
       // console.log('b-l');
       // this.addChild(this.drawPiPing(new createjs.Shape(),[350,300,350,100,100,100],30,10,'#0f0','#0f0'));
       // console.log('t-l');
       //this.addChild(this.drawPiPing(new createjs.Shape(),[400,100,400,300,300,300],30,10,'#00f','#0f0'));
       // console.log('t-r');
       // this.addChild(this.drawPiPing(new createjs.Shape(),[500,100,500,300,700,300],30,10,'#ff0','#0f0'));
       // console.log('r-b');
       // this.addChild(this.drawPiPing(new createjs.Shape(),[800,100,600,100,600,400],30,10,'#ff0','#0f0'));
       // console.log('l-b');
       // this.addChild(this.drawPiPing(new createjs.Shape(),[900,100,1200,100,1200,400],30,10,'#ff0','#0f0'));
       // console.log('l-t');
       // this.addChild(this.drawPiPing(new createjs.Shape(),[1300,400,1600,400,1600,100],30,10,'#ff0','#0f0'));
       // console.log('r-t');
       // this.addChild(this.drawPiPing(new createjs.Shape(),[2000,400,1700,400,1700,100],30,10,'#ff0','#0f0'));
        //this.addChild(this.drawLine(new createjs.Shape(),[800,100,600,100,600,400],'#f00'));
        //this.addChild(this.drawLine(new createjs.Shape(),[50,200,50,50,300,50,300,350,500,350,500,100,700,100,700,600,200,600,200,550,500,550,500,450,100,450,100,500],'#f00'));
        console.log('is ok?无奈了');


    }

}

export default PiPingDraw;