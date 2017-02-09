/**
 * Created by wind on 2016/8/9.
 */

import '../../libs/createjs.js';
class ExpItem extends createjs.Container {
    constructor() {
        super();
        this.initView();
    }
    initView(){
        this.width = 100;
        this.height = 30;
        this.arrTxt = [];
        var t;
        for(var i=0;i<4;i++){
            t = new createjs.Text("aa","15px 微软雅黑","#ff00ff");
            t.x = i*30;
            this.arrTxt.push(t);
            this.addChild(t);
        }
    }
    setData(d){
        for(var i=0;i<this.arrTxt.length;i++){
            this.arrTxt[i].text = d["t"+i];
        }
    }
    clear(){
        this.removeAllChildren();
    }

}

export default ExpItem;