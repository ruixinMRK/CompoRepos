/**
 * Created by Administrator on 2016/8/13.
 */
//管道图

import Base from './Base.js';
import Tools from '../../tools/Tools.js';


class PiPingDraw extends Base{

    constructor(rw,r,f,arr){
        super();
        this.rw  =rw;
        this.r = r;
        this._arr = Tools.clone(arr);
        this._f = f;
        this._id = '';
        this.init();
    }

    get id(){
      return this._id;
    }
    set id(value){
      this._id = value;
    }
    updata(arr){

        arr.forEach(a=>{
            let tempSp = this.getChildByName(a.name);
            if(tempSp){

              let index = this.matchArr(a);
              tempSp.alpha = 1;
              this._arr[index].color = a.color;
              this.drawItem(this._arr[index],tempSp.getChildAt(0));
              tempSp = null;
            }
        });

    }

    getChild(str){

      let tempSp = this.getChildByName(str);
      return tempSp;
    }

    matchArr(a){
      let index;
      this._arr.forEach((b,i)=>{
        if(a.name == b.name){
          index = i;
        }
      },this);
      return index;
    }

    init(){

        //注意管道接口处坐标应该大于w/2+r
        let L = this._arr.length;

        for(let i =0;i<L;i++){
          if(!this._f) this.drawItem(this._arr[i]);
          else this.drawF(this._arr[i]);
        }

    }

    drawF(obj){

      this.addChild(this.drawLine(new createjs.Shape(),obj.value,obj.color,this.rw,false,'',1))
    }

    drawItem(obj,tempSp){


      let x1 = 0;
      let y1 = 0;
      let w1 = 0;
      let h1 = 0;
      let sp = new createjs.Container();
      //分别为底图 灰色层图  高光层 遮罩
      let sh = tempSp||new createjs.Shape();
      this.drawPiPing(sh,obj.value,this.rw,this.r,'rgba(255,0,0,1)',obj.color);
      //let s2 = this.drawPiPing(new createjs.Shape(),obj.value,this.rw,this.r,'rgba(0,0,0,0)','#rgba(0,0,0)')
      //let sFil = this.drawPiPing(new createjs.Shape(),obj.value,this.rw/2,this.r/2,'rgba(0,0,0,0)',obj.color);
      //let maskS = this.drawPiPing(new createjs.Shape(),obj.value,this.rw,this.r,'rgba(0,0,0,0)','#rgba(0,0,0)')
      //s2.alpha = 0.45;
      //sFil.alpha = 0.65;

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

      // let blurFilter = new createjs.BlurFilter(this.rw/2, this.rw/2, 1);
      //sFil.filters = [blurFilter];
      //sFil.cache(x1,y1,w1,h1);
      //sp.addChild(s1,s2,sFil);

      //sp.mask = maskS;

      // let t = new createjs.Text(obj.name,"16px 黑体","white");
      // t.x = obj.value[0] + 3;
      // t.y = obj.value[1] - 8;
      // if(obj.value[0] == obj.value[2]) {
      //   t.x -= 8;
      //   t.y += 15;
      // }
      if(!tempSp){
        sp.addChild(sh);
        sp.name = obj.name;
      }

      this.addChild(sp);
    }

    //画水管线
    drawPiPing($s,$dataArr,$think,r,$lineColor,$beginF){

      let $lC = $lineColor||"#ffffff";
      let $n = $think||20;
      let $r = r||10;
      let $hn = $n>>1;
      let $bf = $beginF;

      if(!$s) return;

      $s.graphics.clear();
      // $s.graphics.setStrokeStyle(2);
      // $s.graphics.beginStroke($lC);
      $s.graphics.beginFill($bf);

      let len = $dataArr.length;
      if(len < 4) return;

      let rArr = Array.prototype.slice.call($dataArr).reverse();
      rArr.forEach((a,b)=>{
        if(b%2==0){
          let temp = 0;
          temp = rArr[b];
          rArr[b] = rArr[b+1];
          rArr[b+1] = temp;
        }
      })

      let H = 0;
      let V = 0;
      for(let j =0;j<2;j++){
        for(let i =0;i<len;i+=2){

          //外层线(靠右边的线)
          if(j==0){

            //console.log(isNaN($dataArr[i+4]),$dataArr[i+4],'check');
            //画线终点

            if($dataArr.length == 4){

              H = $dataArr[i]-$dataArr[i+2];
              V = $dataArr[i+1]-$dataArr[i+3];
              if(isNaN(H)&&isNaN(V)) continue;
              if(H==0) $s.graphics.moveTo($dataArr[i]+$hn,$dataArr[i+1]);
              else if(V==0) $s.graphics.moveTo($dataArr[i],$dataArr[i+1]-$hn);
              continue;
            }

            if(isNaN($dataArr[i+4])){
              let O = $dataArr[len-1];//倒数第一个y
              let T = $dataArr[len-2];//x
              let Th = $dataArr[len-3];//y
              // console.log(H<0&&V<0,O==Th);

              if(H>=0&&V>=0){
                if(O==Th)  $s.graphics.lineTo(T,O-$hn);
                else  $s.graphics.lineTo(T+$hn,O);
              }
              else if(H<0&&V>0){
                if(O==Th) $s.graphics.lineTo(T,O+$hn);
                else $s.graphics.lineTo(T+$hn,O);
              }
              else if(H<=0&&V<=0){
                if(O==Th) $s.graphics.lineTo(T,O+ $hn);
                else $s.graphics.lineTo(T- $hn,O );
              }
              else if(H>0&&V<0){
                if(O==Th) $s.graphics.lineTo(T,O-$hn);
                else $s.graphics.lineTo(T-$hn,O);
              }
              continue;
            }
            //水平距离和垂直距离
            H = $dataArr[i]-$dataArr[i+4];
            V = $dataArr[i+1]-$dataArr[i+5];
            // console.log(H,V,'1H','1V');

            //水平线
            if($dataArr[i+1] == $dataArr[i+3]){
              // console.log('1H');
              //起始点
              if(i == 0) {
                if(H<0&&V>0) {
                  $s.graphics.moveTo($dataArr[i],$dataArr[i+1] + $hn);
                }
                else if(H>0&&V>0){
                  $s.graphics.moveTo($dataArr[i],$dataArr[i+1] - $hn);
                }
                else if(H>0&&V<0){
                  $s.graphics.moveTo($dataArr[i],$dataArr[i+1] - $hn);
                }
                else if(H<0&&V<0){
                  $s.graphics.moveTo($dataArr[i],$dataArr[i+1] + $hn);
                }
              }

              //r-t
              if(H>=0&&V>0){
                $s.graphics.lineTo($dataArr[i+2] + ($r+$hn),$dataArr[i+1] - $hn);
                $s.graphics.quadraticCurveTo($dataArr[i+2] + $hn,$dataArr[i+1] - $hn, $dataArr[i+2] + $hn, $dataArr[i+1] - $hn - $r);
              }
              //r-b
              if(H>=0&&V<=0){
                $s.graphics.lineTo($dataArr[i+2] + ($r+$hn),$dataArr[i+1] - $hn);
                $s.graphics.quadraticCurveTo($dataArr[i+2] - $hn,$dataArr[i+1] - $hn, $dataArr[i+2] - $hn, $dataArr[i+1] + $hn + $r);
              }
              //l-t
              if(H<=0&&V>0){
                $s.graphics.lineTo($dataArr[i+2] - ($r+$hn),$dataArr[i+1] + $hn);
                $s.graphics.quadraticCurveTo($dataArr[i+2] + $hn,$dataArr[i+1] + $hn, $dataArr[i+2] + $hn, $dataArr[i+1] - $hn - $r);
              }
              //l-b
              if(H<=0&&V<=0){
                $s.graphics.lineTo($dataArr[i+2] - $r-$hn,$dataArr[i+1] + $hn);
                $s.graphics.quadraticCurveTo($dataArr[i+2] - $hn,$dataArr[i+1] + $hn, $dataArr[i+2] - $hn, $dataArr[i+1] + $hn + $r);
              }

            }
            else if($dataArr[i] == $dataArr[i+2]){
              // console.log('1V');
              //竖直线
              if(i == 0) {
                if(H<0&&V>0||H>0&&V>0) $s.graphics.moveTo($dataArr[i]+$hn,$dataArr[i+1]);
                else $s.graphics.moveTo($dataArr[i]-$hn,$dataArr[i+1]);
              }
              //b-l
              if(H>=0&&V>0){
                $s.graphics.lineTo($dataArr[i+2] + $hn,$dataArr[i+3] + $hn + $r);
                $s.graphics.quadraticCurveTo($dataArr[i+2] + $hn,$dataArr[i+3] - $hn, $dataArr[i+2] - $hn-$r, $dataArr[i+3] - $hn);
              }
              //b-r
              if(H>=0&&V<=0){
                $s.graphics.lineTo($dataArr[i+2] - $hn,$dataArr[i+3] - $hn - $r);
                $s.graphics.quadraticCurveTo($dataArr[i+2] - $hn,$dataArr[i+3] - $hn, $dataArr[i+2] - $hn-$r, $dataArr[i+3] - $hn);
              }
              //t-l
              if(H<=0&&V>0){
                $s.graphics.lineTo($dataArr[i+2] + $hn,$dataArr[i+3] + $hn + $r);
                $s.graphics.quadraticCurveTo($dataArr[i+2] + $hn,$dataArr[i+3] + $hn, $dataArr[i+2] + $hn+$r, $dataArr[i+3] + $hn);
              }
              //t-r
              if(H<=0&&V<=0){
                $s.graphics.lineTo($dataArr[i+2] - $hn,$dataArr[i+3] - $hn - $r);
                $s.graphics.quadraticCurveTo($dataArr[i+2] - $hn,$dataArr[i+3] + $hn, $dataArr[i+2] + $hn+$r, $dataArr[i+3] + $hn);
              }
            }

          }
          else{

            //rArr内层线数据
            //内层线

            if($dataArr.length == 4){

              H = $dataArr[i]-$dataArr[i+2];
              V = $dataArr[i+1]-$dataArr[i+3];

              if(isNaN(H)&&isNaN(V)) continue;
              // console.log(H,V)
              if((H>0&&V==0)||(H<0&&V==0)){
                $s.graphics.lineTo($dataArr[i+2],$dataArr[i+3]-$hn);
                $s.graphics.lineTo($dataArr[i+2],$dataArr[i+3]+$hn);
                $s.graphics.lineTo($dataArr[i],$dataArr[i+3]+$hn);
              }
              if((H==0&&V>0)||(H==0&&V<0)){
                $s.graphics.lineTo($dataArr[i+2]+$hn,$dataArr[i+3]);
                $s.graphics.lineTo($dataArr[i+2]-$hn,$dataArr[i+3]);
                $s.graphics.lineTo($dataArr[i]-$hn,$dataArr[i+1]);
              }

              continue;
            }

            if(isNaN(rArr[i+4])){

              let O = rArr[len-1];//倒数第一个y
              let T = rArr[len-2];//x
              let Th = rArr[len-3];//y
              if(H>0&&V>0){
                if(O==Th)  $s.graphics.lineTo(T,O-$hn);
                else  $s.graphics.lineTo(T+$hn,O);
              }
              else if(H<0&&V>0){
                if(O==Th) $s.graphics.lineTo(T,O+$hn);
                else $s.graphics.lineTo(T+$hn,O);
              }
              else if(H<0&&V<0){
                if(O==Th) $s.graphics.lineTo(T,O+ $hn);
                else $s.graphics.lineTo(T- $hn,O );
              }
              else if(H>0&&V<0){
                if(O==Th) $s.graphics.lineTo(T,O-$hn);
                else $s.graphics.lineTo(T-$hn,O);
              }
              continue;
            }
            //水平距离和垂直距离
            H = rArr[i]-rArr[i+4];
            V = rArr[i+1]-rArr[i+5];
            // console.log(H,V,'2H','2V');

            //水平线
            if(rArr[i+1] == rArr[i+3]){
              // console.log('2H');
              //起始点
              if(i == 0) {

                if(H>0&&V<0) {
                  $s.graphics.lineTo(rArr[i],rArr[i+1] - $hn);
                }
                if(H<0&&V<0){
                  $s.graphics.lineTo(rArr[i],rArr[i+1] + $hn);
                }
                if(H<0&&V>0){
                  $s.graphics.lineTo(rArr[i] ,rArr[i+1]+ $hn);
                }
                if(H>0&&V>0){
                  $s.graphics.lineTo(rArr[i] ,rArr[i+1]- $hn);
                }
              }

              if(H>=0&&V<0){
                $s.graphics.lineTo(rArr[i+2] + ($r+$hn),rArr[i+1] - $hn);
                $s.graphics.quadraticCurveTo(rArr[i+2] - $hn,rArr[i+1] - $hn, rArr[i+2] - $hn, rArr[i+1] + $hn + $r);
              }
              if(H<0&&V<0){
                $s.graphics.lineTo(rArr[i+2] - $r - $hn,rArr[i+1] + $hn);
                $s.graphics.quadraticCurveTo(rArr[i+2] - $hn,rArr[i+1] + $hn, rArr[i+2] - $hn, rArr[i+1] + $hn + $r);
              }
              if(H<0&&V>0){
                $s.graphics.lineTo(rArr[i+2] - $r - $hn,rArr[i+1] + $hn);
                $s.graphics.quadraticCurveTo(rArr[i+2] + $hn,rArr[i+1] + $hn, rArr[i+2] + $hn, rArr[i+1] - $hn - $r);
              }
              if(H>0&&V>0){
                $s.graphics.lineTo(rArr[i+2] + $r + $hn,rArr[i+1] - $hn);
                $s.graphics.quadraticCurveTo(rArr[i+2] + $hn,rArr[i+1] - $hn, rArr[i+2] + $hn, rArr[i+1] - $hn - $r);
              }
            }
            else if(rArr[i] == rArr[i+2]){
              // console.log('2V');
              //竖直线
              if(i == 0) {

                if(H>0&&V>0){
                  $s.graphics.lineTo(rArr[i]+ $hn ,rArr[i+1]);
                }
                if(H<0&&V>0){
                  $s.graphics.lineTo(rArr[i]+ $hn ,rArr[i+1]);
                }
                if(H<0&&V<0){
                  $s.graphics.lineTo(rArr[i]- $hn ,rArr[i+1]);
                }
                if(H>0&&V<0){
                  $s.graphics.lineTo(rArr[i]- $hn ,rArr[i+1]);
                }
              }

              if(H<0&&V>0){
                $s.graphics.lineTo(rArr[i+2] + $hn,rArr[i+3] + $hn + $r);
                $s.graphics.quadraticCurveTo(rArr[i+2] + $hn,rArr[i+3] + $hn, rArr[i+2] + $hn + $r, rArr[i+3] + $hn);
              }
              if(H>0&&V>0){
                $s.graphics.lineTo(rArr[i+2] + $hn,rArr[i+3] + $hn + $r);
                $s.graphics.quadraticCurveTo(rArr[i+2] + $hn,rArr[i+3] - $hn, rArr[i+2] - $hn - $r, rArr[i+3] - $hn);
              }
              if(H>0&&V<0){
                $s.graphics.lineTo(rArr[i+2] - $hn,rArr[i+3] - $hn - $r);
                $s.graphics.quadraticCurveTo(rArr[i+2] - $hn,rArr[i+3] - $hn, rArr[i+2] - $hn - $r, rArr[i+3] - $hn);
              }
              if(H<0&&V<0){
                $s.graphics.lineTo(rArr[i+2] - $hn,rArr[i+3] - $hn - $r);
                $s.graphics.quadraticCurveTo(rArr[i+2] - $hn,rArr[i+3] + $hn, rArr[i+2] + $hn + $r, rArr[i+3] + $hn);
              }
            }

          }


        }

      }

      $s.graphics.endStroke();
      $s.graphics.endFill();
      rArr.length = 0;
    }

    clear(){

      while(this.numChildren){
        this.removeChildAt(0);
      }

      Tools.clearProp(this);

    }
}

export default PiPingDraw;
