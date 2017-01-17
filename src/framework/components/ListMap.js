/**
 * Created by ruixin on 2017/1/6 0006.
 */
import Base from './Base.js';
import PiPingDraw from './PiPingDraw';
import BoxItem from './BoxItem';

class ListMap extends Base{

    constructor(arr) {

        super();
        this.nodeSp = new createjs.Container();
        // this.updata(arr,supplyArr);
        this.boxData = arr[0];//两张图片
        this.popData = arr[1];
        this.nodeData = [];
    }
    /**
     *
     * @param 节点数据
     * @param 管道补充数据
     */
    updata(arr,supplyArr){
        this.ListMapData = arr;
        this.supplyArr = supplyArr||[];
        this.nodeArr = [];//存储节点
        this.nodeStatus = true;//正常为true
        this.tempNode = null;
        this.timeout = null;
        this.init();
    }

    updataNode(obj){

        this.changeNode(obj);

        if(obj.nodeLine.length>0) {
            let i = 1;
            //初次刷新时
            this.toggle();
            this.changeNode(obj);
            this.getGroup(obj.nodeLine[0]);
            //计时器调用
            setInterval(e=>{

                this.toggle();
                this.changeNode(obj);
                this.getGroup(obj.nodeLine[i>obj.nodeLine.length-1?(function(){i=0;return i++;})():i++])
            },5000);
        }


    }

    changeNode(obj){

        let nodeData = this.nodeData = obj.nodeData;
        let nodeDataArr = Object.keys(nodeData);
        for(let i= 0;i<nodeDataArr.length;i++){
            let name = nodeDataArr[i];
            let o = nodeData[nodeDataArr[i]];
            let tempObj = this.nodeSp.getChildByName(name);

            if(tempObj){
                // console.log(o.state);
                tempObj.state = (o.state|0)||0;
                tempObj.setData(o);
            }

        }

    }

    /**
     * 生成节点和连线
     */
    init(){

        this.mapLineData = [];
        let i =0;
        let L = this.ListMapData.length;
        for(;i<L;i++){
            let item = this.ListMapData[i];
            if(item==null) continue;

            //搭配节点 如果已存在 取出
            let tempObj = this.nodeSp.getChildByName(item.name);
            if(tempObj){
                item.target = tempObj;
                continue;
            }

            //生成节点
            var t = item.type?item.type:0;
            let node = new BoxItem({title:item.title,sizeState:item.size||0,typeState:t,textAlign:t==0?"center":"left",bgImg:this.boxData,infoBgImg:this.popData});
            node.x = item.x;
            node.y = item.y;
            node.infoItemPos = item.infoItemPos==null&&item.y>512?1:item.infoItemPos;
            node.name = item.name;
            // node.name = item.title;
            item.target = node;
            node.mouseChildren = false;
            this.nodeArr.push(node);
            this.nodeSp.addChild(node);
        }
        for(let j=0,L = this.ListMapData.length;j<L;j++){

            let item = this.ListMapData[j];
            let item1 = this.ListMapData[j+1];
            if(item==null||item1==null) continue;

            let arr = this.getLinePoint(item,item1);

            //画线条信息
            let obj = {};
            let obj1 = {};
            //获取线时,名字两个节点的名字连在一起
            obj.name = item.target.name +　item1.target.name;
            obj.color = obj1.color = 'rgb(38,140,178)';
            obj.r = item.fristCornR?0:8;
            if(typeof(arr[0]) == 'object'){
                obj.value = arr[0];
                //第二条线段
                obj1.value = arr[1];
                obj1.r = item.fristCornR?8:0;
                obj1.name = item.target.name + item1.target.name + '_1';
                this.mapLineData.push(obj,obj1);
                continue;
            }
            obj.value = arr;
            this.mapLineData.push(obj);
        }

        this.nodeSp.addEventListener('click',this.clickNode.bind(this));

        // console.log(this.mapLineData,'-----');
        this.piping = new PiPingDraw(16,8,false,this.mapLineData.concat(this.supplyArr));
        this.addChild(this.piping,this.nodeSp);
    }

    clickNode(e){
        console.log(e.target.name);
        let target = e.target;
        (this.tempNode&&this.tempNode!==target)&&(this.tempNode.infoItemVisible = false);
        target.infoItemVisible = !target.infoItemVisible;
        this.tempNode = target;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(e=>{this.tempNode.infoItemVisible = false;this.tempNode=null},5000);
    }
    /**
     *  抽出一组
     * @param str 'A-B-C-D'
     */
    getGroup(str){

        console.log(str);
        if(!str) return;
        let arr = str.replace(/\s/g,'').split('-');

        for(let i =0,L=arr.length;i<L;i++){

            let itemObj = this.nodeSp.getChildByName(arr[i]);//获取节点

            let obj = this.nodeData[arr[i]];

            itemObj.state = obj!=null?obj.state|0:0;
            itemObj.grey = false;
            if(arr[i+1]==null) continue;
            //改变线的颜色(一个节点,最多会有两根线)
            this.piping.updata([{name:arr[i] + arr[i+1],color:'rgb(38,140,178)'},{name:arr[i]+ arr[i+1]+'_1',color:'rgb(38,140,178)'}]);

        }

    }

    /**
     *  获取连线数据  规则 从左到右 从上到下 如果不是这规则 请单独添加
     * @param prevObj 当前线的前一个节点
     * @param nextObj 当前线的后一个节点
     * @returns {*}
     */
    getLinePoint(prevObj,nextObj){

        let left = prevObj.target;
        let right = nextObj.target;
        //连线是否分割
        let spl = prevObj.spl;

        // x,y,right,bottom
        let px1 = left.x;
        let py1 = left.y;
        let pyr1 = px1 + left.itemWidth;
        let pyb1 = py1 + left.itemHeight;

        let px2 = right.x;
        let py2 = right.y;
        let pyr2 = px2 + right.itemWidth;
        let pyb2 = py2 + right.itemHeight;

        if(Math.abs((px1 + left.itemWidth/2) - (px2+right.itemWidth/2))<1.2){
            return [px1 + left.itemWidth/2,pyb1,px2+right.itemWidth/2,py2];
        }
        else if(Math.abs((py1+left.itemHeight/2)-(py2+right.itemHeight/2))<1.2){
            return [pyr1,py1+left.itemHeight/2,px2,py2+right.itemHeight/2];
        }
        else{
            //不同行同列时

            //第一个转折点
            let cpx1 = (px2 - pyr1)*3/4 + pyr1;
            let cpy1 = py1;

            //第二个转折点
            let cpx2 = cpx1;
            let cpy2 = py2  + right.itemHeight/2;

            //分割点
            let mpx = cpx1;
            let mpy = null;
            //分割
            if(spl){
                mpy = (py1+pyb2)/2;
            }
            return mpy!=undefined?[[pyr1,py1+left.itemHeight/2,cpx1,cpy1+left.itemHeight/2,mpx,mpy],[mpx,mpy,cpx2,cpy2,px2,py2 + right.itemHeight/2]]:[pyr1,py1+ left.itemHeight/2,cpx1,cpy1+ left.itemHeight/2,cpx2,cpy2,px2,cpy2];
        }
        return null;
    }

    //将节点和连线变为可用或者是不可用状态
    toggle(bol=true){

        this.nodeArr.forEach(item=>{
            bol?item.grey =true:item.grey =false;
            item.state = 0;
        })
        bol?this.piping.updata(null,'rgb(21,56,87)'):this.piping.updata(null,'rgb(38,140,178)');

    }

    /**
     * 清除
     */
    clear(){

        this.nodeArr.forEach(item=>{
            item.clear();
        })

        for(let i=0,L = this.ListMapData.length;i<L;i++){
            let obj = this.ListMapData[i];
            if(obj!=null){
                for(let str in obj){
                    delete obj.str;
                }
            }
        }
        this.ListMapData.length = this.nodeArr.length = 0;
        this.piping.clear();
        clearTimeout(this.timeout);
        this.nodeSp.removeAllChildren();
        this.piping.parent&&this.piping.parent.removeChild(this.piping);
        this.nodeSp.removeAllEventListeners();

    }
}
export default ListMap;

