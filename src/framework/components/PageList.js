/**
 * Created by wind on 2016/2/24.
 */
import '../../libs/createjs.js';
import Tools from '../../tools/Tools.js';
import Menu from './Menu.js';
import TextDoubleState from './TextDoubleState.js';

/**
 *
 * @param styleData
 *  {
        width:100,
        height:100,
        listItemClass:null,
        listItemParam:null,
        listCount:10,
        listDir:"v",
        listGap:10,

         pageItemClass:TextDoubleState,
         pageItemParam:{
                  text:"",
                  width:15,
                  height:21,
                  selected:false,
                  textSelectedFont:"15px 微软雅黑",
                  textSelectedColor:"#ffffff",
                  textSelectedAlpha:1,
                  textUnselectedFont:"15px 微软雅黑",
                  textUnselectedColor:"#000000",
                  textUnselectedAlpha:1,
                  bgSelectedColor:"#333333",
                  bgSelectedAlpha:0.5,
                  bgUnselectedColor:"#ffffff",
                  bgUnselectedAlpha:0.01
              },
         pageGap:5,
         pageMarginH:10,
         pageMarginV:10,
         listItemTriggle:"mouseover",
         pageTiggle:"mouseover",
         arrData:[]
     }
 */
class PageList extends createjs.Container{
    constructor(styleData) {
        super();
        if(styleData == null){
            console.error('PageList:constructor - param is null,please give a param with "listItemClass" property');
            return;
        }
        if(!Tools.hasProperty(styleData,"listItemClass")){
            console.error('PageList:constructor - lack of necessary "listItemClass" attribute');
            return;
        }
        this.setDefaultData();
        this.setStyleData(styleData==null?{}:styleData);

        this.initView();
    }
    setDefaultData(){
        this._width = 100;
        this._height = 100;
        this._listItemClass = null;
        this._listItemParam = null;
        this._listCount = 10;
        this._listDir = "v";
        this._listGap = 10;

        this._pageItemClass = TextDoubleState;
        this._pageItemParam = {
                  text:"",
                  width:15,
                  height:21,
                  selected:false,
                  textSelectedFont:"15px 微软雅黑",
                  textSelectedColor:"#ffffff",
                  textSelectedAlpha:1,
                  textUnselectedFont:"15px 微软雅黑",
                  textUnselectedColor:"#000000",
                  textUnselectedAlpha:1,
                  bgSelectedColor:"#333333",
                  bgSelectedAlpha:0.5,
                  bgUnselectedColor:"#ffffff",
                  bgUnselectedAlpha:0.01
              };
        this._pageGap = 5;
        this._pageMarginH = 10;
        this._pageMarginV = 10;
        this._listItemTriggle = "mouseover";
        this._pageTiggle = "mouseover";
        this._pageBLLoop = false;
        this._pageLoopTime = 1000;
        this._arrData = [];

        this.__allPage = 0;
        this.__currentPage = 0;
        this.__pageItemsPool = [];
        this.__listItemsPool = [];
    }
    setStyleData = (styleData)=>{
        for(let k in styleData){
            if(("_"+k) in this){
                if(k === "pageItemParam"){
                    if(styleData["pageItemClass"]==null || styleData["pageItemClass"] == TextDoubleState){
                        Tools.addPropCover(this._pageItemParam,styleData["pageItemParam"]);
                    }
                }else{
                    this["_"+k] = styleData[k];
                }
            }
        }
    };
    initView() {
        this.listContainer = new createjs.Container();
        this.addChild(this.listContainer);
        this.listMenus = new Menu({items:[],gap:this._listGap,dir:this._listDir,trigger:this._listItemTriggle});
        this.listContainer.addChild(this.listMenus);
        this.listMenus.addEventListener("MenuChangeEvent",this.onListMenuChange);
        this.pageMenus = new Menu({items:[],gap:this._pageGap,trigger:this._pageTiggle,blLoop:this._pageBLLoop,loopTime:this._pageLoopTime});
        this.addChild(this.pageMenus);
        this.pageMenus.addEventListener("MenuChangeEvent",this.onPageMenuChange);
        this.resetView();
    }
    resetView(){
        this.__allPage = Math.ceil(this._arrData.length/this._listCount);
        this.createPageMenus();
        this.createListMenus();
        this.pageMenus.visible = this.__allPage>1;
    }

    createPageMenus() {
        this.createPageItem(this.__allPage);
        var items = [];
        for(var i=0;i<this.__allPage;i++){
            items.push(this.__pageItemsPool[i]);
        }
        this.pageMenus.resetItems(items);
        this.pageMenus.x = this._width - this.pageMenus.width - this._pageMarginH;
        this.pageMenus.y = this._height - this.pageMenus.height - this._pageMarginV;
    }
    createPageItem(c) {
        if(this.__pageItemsPool.length<c){
            var leg = this.__pageItemsPool.length;
            var cc = c-leg;
            var s,p;
            for(var i=0;i<cc;i++){
                s = leg + i + 1;
                p = new this._pageItemClass(this._pageItemParam);
                p.setData(s+"");
                this.__pageItemsPool.push(p);
            }
        }
    }
    createListMenus() {
        var leftC = this._arrData.length - this.__currentPage * this._listCount;
        var ct = leftC>this._listCount?this._listCount:leftC;
        this.createListItem(ct);
        var items = [];
        for(var i=0;i<ct;i++){
            items.push(this.__listItemsPool[i]);
            this.__listItemsPool[i].setData(this._arrData[this.__currentPage * this._listCount + i],i+1);
        }
        this.listMenus.resetItems(items);
    }
    createListItem(c) {
        if(this.__listItemsPool.length<c){
            var leg = this.__listItemsPool.length;
            var cc = c-leg;
            var s;
            for(var i=0;i<cc;i++){
                this.__listItemsPool.push(new this._listItemClass(this._listItemParam));
            }
        }
    }
    onPageMenuChange = (event) => {
        this.__currentPage = this.pageMenus.selectedIndex;
        this.createListMenus();
        this.dispatchEvent("ListIndexChangeEvent");
    };
    onListMenuChange = (event)=>{
        this.dispatchEvent("ListIndexChangeEvent");
    };
    get selectedIndex() {
        return this.__currentPage*this._listCount+this.listMenus.selectedIndex;
    }
    get selectedItemData () {
        return this._arrData[this.selectedIndex];
    }
    get selectedItem(){
        return this.listMenus.selectedItem;
    }
    reset() {
        this._arrData = [];
        this.__allPage = 0;
        this.__currentPage = 0;

        this.pageMenus.resetItems([]);
    }
    clear(){
        this.reset();

        this.listContainer.removeAllChildren();
        this.removeAllChildren();

        for(var i=0;i<this.__listItemsPool.length;i++){
            if(this.__listItemsPool[i].clear){
                this.__listItemsPool[i].clear();
            }
        }
        for(var i=0;i<this.__pageItemsPool.length;i++){
            if(this.__pageItemsPool[i].clear){
                this.__pageItemsPool[i].clear();
            }
        }
        this.__pageItemsPool.length = 0;
        this.__listItemsPool.length = 0;

        this.pageMenus.clear();
        this.listMenus.clear();

        this._listItemClass = null;
        this._listItemParam = null;
        this._pageItemClass = null;
        this._pageItemParam = null;
    }
    setData(arrData){
        this.reset();
        this._arrData = arrData;
        this.resetView();
    }
}
export default PageList;
