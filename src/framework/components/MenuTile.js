/**
 * Created by wind on 2016/3/19.
 */
import Tools from '../../tools/Tools.js';
import '../../libs/createjs.js';
class MenuTile extends createjs.Container{
    /**
     *
     * @param styleData
     *  {
     *      items:[],
     *      dir:"h",
     *      groupCount:10,
     *      itemW:100,
     *      itemH:30,
     *      gapH:10,
     *      gapV:10,
     *      selectedIndex:0,
     *      trigger:"click",
     *      blLoop:false,
     *      loopTime:1000,
     *      blMouseRelCon:false,
     *      relCons:[]
     * }
     */
    constructor(styleData) {
        super();
        if(styleData == null){
            console.error('MenuTile:constructor - param is null,please give a param with "items" property');
            return;
        }
        if(!Tools.hasProperty(styleData,"items")){
            console.error('MenuTile:constructor - lack of necessary "items" attribute');
            return;
        }
        this.setDefaultData();
        this.setStyleData(styleData);
        this.setMouseRel();
        this.__eventState = "auto";
        
        this.initView();        
    }
    setDefaultData(){
        this._items = [];
        this._dir = "h";
        this._groupCount = 10;
        this._itemW = 100;
        this._itemH = 30;
        this._gapH = 10;
        this._gapV = 10;
        this._selectedIndex = 0;
        this._trigger = "click";
        this._blLoop = false;
        this._loopTime = 1000;
        this._blMouseRelCon = false;
        this._relCons = [];

        this.__triggerFlg = 0;
        this.__loopFlg = 0;
        this.__blMouseRelFlag = false;
    }
    setStyleData = (styleData)=>{
        for(let k in styleData){
            if(("_"+k) in this){
                this["_"+k] = styleData[k];
            }
        }
    };
    clearItem(){
        clearInterval(this.__loopFlg);
        if(this._items)
        {
            for(var i=0;i<this._items.length;i++)
            {
                this._items[i].removeAllEventListeners();
            }
            this.removeAllChildren();
        }
    }
    resetItems(arrItems){
        this.clearItem();
        this._items = arrItems;
        this._selectedIndex = 0;
        this.createView();
    }
    resetPos(){
        var i,hIdx=0,vIdx=0;
        if (this._dir == "h") {
            for (i = 0; i < this._items.length; i++) {
                hIdx = Math.floor(i/this._groupCount);
                vIdx = i%this._groupCount;
                this._items[i].x =  (this._itemW + this._gapH) * vIdx;
                this._items[i].y =  (this._itemH + this._gapV) * hIdx;
            }
        } else {
            for (i = 0; i < this._items.length; i++) {
                vIdx = Math.floor(i/this._groupCount);
                hIdx = i%this._groupCount;
                this._items[i].x =  (this._itemW + this._gapH) * vIdx;
                this._items[i].y =  (this._itemH + this._gapV) * hIdx;
            }
        }
    }
    initView(){
        var i,hIdx=0,vIdx=0;
        if (this._dir == "h") {
            for (i = 0; i < this._items.length; i++) {
                hIdx = Math.floor(i/this._groupCount);
                vIdx = i%this._groupCount;
                this._items[i].x =  (this._itemW + this._gapH) * vIdx;
                this._items[i].y =  (this._itemH + this._gapV) * hIdx;

                this._items[i].selected = (i == this._selectedIndex);
                this.addChild(this._items[i]);
                this._items[i].addEventListener(this._trigger, this.onTrigMenuHandler);
                if(this._trigger == "mouseover")
                {
                    this._items[i].addEventListener("mouseout", this.onUnTrigMenuHandler);
                }
            }
        } else {
            for (i = 0; i < this._items.length; i++) {
                vIdx = Math.floor(i/this._groupCount);
                hIdx = i%this._groupCount;
                this._items[i].x =  (this._itemW + this._gapH) * vIdx;
                this._items[i].y =  (this._itemH + this._gapV) * hIdx;

                this._items[i].selected = (i == this._selectedIndex);
                this.addChild(this._items[i]);
                this._items[i].addEventListener(this._trigger, this.onTrigMenuHandler);
                if(this._trigger == "mouseover")
                {
                    this._items[i].addEventListener("mouseout", this.onUnTrigMenuHandler);
                }
            }
        }
        this.reBeginLoop();
    }
    stopLoop(){
        clearInterval(this.__loopFlg);
    }
    reBeginLoop (){
        if(this._blLoop)
        {
            clearInterval(this.__loopFlg);
            this.__loopFlg = setInterval(this.autoLoop,this._loopTime);
        }
    }
    autoLoop = ()=>{
        if((this._blMouseRelCon && this.__blMouseRelFlag == false) || this._blMouseRelCon == false){
            if(this._items && this._items.length>1){
                var oldIndex = this._selectedIndex;
                this._selectedIndex ++;
                if(this._selectedIndex >=this._items.length){
                    this._selectedIndex = 0;
                }
                for (let i = 0; i < this._items.length; i++) {
                    this._items[i].selected = (i == this._selectedIndex);
                }

                if(oldIndex != this._selectedIndex){
                    this.__eventState = "auto";
                    this.dispatchEvent("MenuChangeEvent");
                }
            }
        }
    };
    onTrigMenuHandler = (event)=>{
        this._triggerTarget = event.currentTarget;
        if(this._trigger == "mouseover"){
            this.__triggerFlg = setTimeout(this.triggerRun,300);
        }else {
            this.triggerRun();
        }
    };
    onUnTrigMenuHandler = (event) => {
        clearTimeout(this.__triggerFlg);
    };
    triggerRun = () => {
        if(this._blLoop)
        {
            clearInterval(this.__loopFlg);
            this.__loopFlg = setInterval(this.autoLoop,this._loopTime);
        }
        var oldIndex = this._selectedIndex;
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i] == this._triggerTarget) {
                this._items[i].selected = true;
                this._selectedIndex = i;
            }
            else {
                this._items[i].selected = false;
            }
        }
        if(oldIndex != this._selectedIndex)
        {
            this.__eventState = "manual";
            this.dispatchEvent("MenuChangeEvent");
        }
    };
    setSelectedIndexWithEvent(idx){
        if(this._items != null)
        {
            if(idx<this._items.length)
            {
                var oldIndex = this._selectedIndex;
                for (var i = 0; i < this._items.length; i++) {
                    if(i == idx){
                        this._items[i].selected = true;
                        this._selectedIndex = i;
                    }else {
                        this._items[i].selected = false;
                    }
                }
                if(oldIndex != this._selectedIndex){
                    this.__eventState = "manual";
                    this.dispatchEvent("MenuChangeEvent");
                }
            }
        }
    }
    setSelectedIndexNoEvent(idx){
        if(this._items != null){
            if(idx<this._items.length)
            {
                for (var i = 0; i < this._items.length; i++) {
                    if(i == idx){
                        this._items[i].selected = true;
                        this._selectedIndex = i;
                    }else {
                        this._items[i].selected = false;
                    }
                }
            }
        }
    }
    set blMouseRelCon(bl){
        if(this._blMouseRelCon !== bl){
            this.clearOldMouseRel();
            this._blMouseRelCon = bl;
            this.setMouseRel();
        }
    }
    set relCons(arr) {
        if(this._relCons !== arr){
            this.clearOldMouseRel();
            this._relCons = arr;
            this.setMouseRel();
        }
    }
    relConsAdd (arr) {
        this.clearOldMouseRel();
        if(this._relCons == null){
            this._relCons = [];
        }
        this._relCons = this._relCons.concat(arr);
        this.setMouseRel();
    }
    relConsRemove (arr) {
        this.clearOldMouseRel();
        if(this._relCons == null){
            this._relCons = [];
        }
        if(arr)
        {
            var idx;
            for(var i=0;i<arr.length;i++)
            {
                idx = this._relCons.indexOf(arr[i]);
                if(idx != -1)
                {
                    this._relCons.splice(idx,1);
                }
            }
        }
        this.setMouseRel();
    }
    clearOldMouseRel(){
        if(this._relCons && this._relCons.length>0)
        {
            for(var i=0;i<this._relCons.length;i++)
            {
                this._relCons[i].removeEventListener("mouseover",this.openMouseRelFlag);
                this._relCons[i].removeEventListener("mouseout",this.closeMouseRelFlag);
            }
        }
    }
    setMouseRel(){
        if(this._blMouseRelCon && this._relCons && this._relCons.length>0)
        {
            for(var i=0;i<this._relCons.length;i++) {
                this._relCons[i].addEventListener("mouseover", this.openMouseRelFlag);
                this._relCons[i].addEventListener("mouseout", this.closeMouseRelFlag);
            }
        }
    }
    openMouseRelFlag = (event)=>{
        if(this._relCons) {
            if (this._relCons.indexOf(event.currentTarget) != -1) {
                if (this._blMouseRelCon) {
                    this.stopLoop();
                }
            }
        }
    };
    closeMouseRelFlag = (event)=>{
        if(this._relCons) {
            if (this._relCons.indexOf(event.currentTarget) != -1) {
                if (this._blMouseRelCon) {
                    this.reBeginLoop();
                }
            }
        }
    };

    get selectedIndex() {
        return this._selectedIndex;
    }
    get selectedItem() {
        return this._items[this._selectedIndex];
    }
    get menuItems() {
        return this._items;
    }
    get width() {
        if(this._items.length === 0){
            return 0;
        }
        var c = 0;
        if (this._dir == "h") {
            if(this._items.length<=this._groupCount){
                c = this._items.length;
            }else{
                c = this._groupCount;
            }
        } else {
            c = Math.ceil(this._items.length/this._groupCount);
        }
        return c*(this._itemW+this._gapH)-this._gapH;
    }
    get height () {
        if(this._items.length === 0){
            return 0;
        }
        var c = 0;
        if (this._dir == "h") {
            c = Math.ceil(this._items.length/this._groupCount);
        } else {
            if(this._items.length<=this._groupCount){
                c = this._items.length;
            }else{
                c = this._groupCount;
            }
        }
        return c*(this._itemH+this._gapV)-this._gapV;
    }
    get eventState() {
        return this.__eventState;
    }
}

export default MenuTile;
