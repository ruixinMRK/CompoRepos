/**
 * Created by wind on 2016/1/4.
 */
import '../../libs/createjs.js';
import Tools from '../../tools/Tools.js';
import Timer from '../../tools/Timer.js';

/**
 * Class representing a Menu.
 * */
class Menu extends createjs.Container{
    /**
     *
     * @param {object} styleData - 格式数据
     *  {
     *      items:[],
     *      gap:10,
     *      dir:"h",
     *      selectedIndex:0,
     *      trigger:"click",
     *      blLoop:false,
     *      loopTime:1000,
     *      blMouseRelCon:false,
     *      relCons:[]
     * }
     * */
    constructor(styleData) {
        super();
        if(styleData == null){
            console.error('Menu:constructor - param is null,please give a param with "items" property');
            return;
        }
        if(!Tools.hasProperty(styleData,"items")){
            console.error('Menu:constructor - lack of necessary "items" attribute');
            return;
        }
        this.setDefaultData();
        this.setStyleData(styleData);

        this.setMouseRel();
        this._pos = 0;
        this.__eventState = "auto";

        this.initView();
    }
    setDefaultData(){
        this._items = [];
        this._gap = 10;
        this._dir = "h";
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
    clearItem () {
        // clearInterval(this.__loopFlg);
        Timer.clear(this.__loopFlg);
        if(this._items){
            for(var i=0;i<this._items.length;i++){
                this._items[i].cursor = null;
                this._items[i].removeAllEventListeners();
            }
            this.removeAllChildren();

        }
    }
    clear(){
      this.clearItem();
      if(this._items){
        for(var i=0;i<this._items.length;i++){
          if(this._items[i].clear) this._items[i].clear();
        }
      }
      Tools.clearProp(this);
    }
    resetItems (arrItems) {
        this.clearItem();
        this._items = arrItems;
        this._selectedIndex = 0;
        this.initView();
    }
    resetPos () {
        var i,pos = 0;
        if (this._dir == "h") {
            for (i = 0; i < this._items.length; i++) {
                this._items[i].x = pos;
                pos += this._items[i].width + this._gap;
            }
        } else {
            for (i = 0; i < this._items.length; i++) {
                this._items[i].y = pos;
                pos += this._items[i].height + this._gap;
            }
        }
    }
    initView (){
        var i;
        var pos = 0;
        if (this._dir == "h") {
            for (i = 0; i < this._items.length; i++) {
                this._items[i].x = pos;
                pos += this._items[i].width + this._gap;
                this._items[i].selected = (i == this._selectedIndex);
                this._items[i].cursor = (i == this._selectedIndex)?null:"pointer";
                this.addChild(this._items[i]);
                this._items[i].addEventListener(this._trigger,this.onTrigMenuHandler);
                if(this._trigger == "mouseover"){
                    this._items[i].addEventListener("mouseout", this.onUnTrigMenuHandler);
                }
            }
        } else {
            for (i = 0; i < this._items.length; i++) {
                this._items[i].y = pos;
                pos += this._items[i].height + this._gap;
                this._items[i].selected = (i == this._selectedIndex);
                this._items[i].cursor = (i == this._selectedIndex)?null:"pointer";
                this.addChild(this._items[i]);
                this._items[i].addEventListener(this._trigger,this.onTrigMenuHandler);
                if(this._trigger == "mouseover"){
                    this._items[i].addEventListener("mouseout", this.onUnTrigMenuHandler);
                }
            }
        }
        this._pos = pos;
        this.reBeginLoop();
    }
    stopLoop () {
      Timer.clear(this.__loopFlg);
    }
    reBeginLoop() {
        if(this._blLoop){
            Timer.clear(this.__loopFlg);
            this.__loopFlg = Timer.add(this.autoLoop,this._loopTime);
        }
    }
    autoLoop = ()=> {
        if((this._blMouseRelCon && this.__blMouseRelFlag == false) || this._blMouseRelCon == false){
            if(this._items && this._items.length>1){
                var oldIndex = this._selectedIndex;
                this._selectedIndex ++;
                if(this._selectedIndex >=this._items.length){
                    this._selectedIndex = 0;
                }
                for (let i = 0; i < this._items.length; i++) {
                    this._items[i].selected = (i === this._selectedIndex);
                    this._items[i].cursor = (i === this._selectedIndex)?null:"pointer";
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
    onUnTrigMenuHandler = (event)=> {
        clearTimeout(this.__triggerFlg);
    };
    triggerRun = () => {
        if(this._blLoop){
            Timer.clear(this.__loopFlg);
            this.__loopFlg = Timer.add(this.autoLoop,this._loopTime);
        }
        var oldIndex = this._selectedIndex;
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i] == this._triggerTarget) {
                this._items[i].selected = true;
                this._items[i].cursor = "pointer";
                this._selectedIndex = i;
            }
            else {
                this._items[i].selected = false;
                this._items[i].cursor = null;
            }
        }
        if(oldIndex != this._selectedIndex){
            this.__eventState = "manual";
            this.dispatchEvent("MenuChangeEvent");
        }
    };
    setSelectedIndexWithEvent(idx) {
        if(this._items != null){
            if(idx<this._items.length)
            {
                var oldIndex = this._selectedIndex;
                for (var i = 0; i < this._items.length; i++) {
                    if(i === idx){
                        this._items[i].selected = true;
                        this._items[i].cursor = "pointer";
                        this._selectedIndex = i;
                    }else {
                        this._items[i].selected = false;
                        this._items[i].cursor = null;
                    }
                }
                if(oldIndex != this._selectedIndex){
                    this.__eventState = "manual";
                    this.dispatchEvent("MenuChangeEvent");
                }
            }
        }
    }
    setSelectedIndexNoEvent (idx) {
        if(this._items != null){
            if(idx<this._items.length){
                for (var i = 0; i < this._items.length; i++) {
                    if(i == idx){
                        this._items[i].selected = true;
                        this._items[i].cursor = "pointer";
                        this._selectedIndex = i;
                    }else {
                        this._items[i].selected = false;
                        this._items[i].cursor = null;
                    }
                }
                if(idx==-1)this._selectedIndex = -1;
            }
        }
    }

    set blMouseRelCon (bl){
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
        if(arr){
            var idx;
            for(var i=0;i<arr.length;i++){
                idx = this._relCons.indexOf(arr[i]);
                if(idx != -1){
                    this._relCons.splice(idx,1);
                }
            }
        }
        this.setMouseRel();
    }
    clearOldMouseRel () {
        if(this._relCons && this._relCons.length>0){
            for(var i=0;i<this._relCons.length;i++){
                this._relCons[i].removeEventListener("mouseover",this.openMouseRelFlag);
                this._relCons[i].removeEventListener("mouseout",this.closeMouseRelFlag);
            }
        }
    }
    setMouseRel() {
        if(this._blMouseRelCon && this._relCons && this._relCons.length>0){
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
    closeMouseRelFlag = (event)=> {
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
        if(this._dir==="h"){
            if(this._pos===0){
                return 0;
            }else{
                return this._pos-this._gap;
            }
        }else{
            if(this._items.length>0)
            {
                return this._items[0].width;
            }else{
                return 0;
            }
        }
    }
    get height () {
        if(this._dir==="h"){
            if(this._items.length>0){
                return this._items[0].height;
            }else{
                return 0;
            }
        }else{
            if(this._pos===0){
                return 0;
            }else{
                return this._pos-this._gap;
            }
        }
    }
    get eventState() {
        return this.__eventState;
    }
}

export default Menu;
