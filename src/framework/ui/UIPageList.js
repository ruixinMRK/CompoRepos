/**
 * Created by wind on 2016/2/24.
 */
import '../../libs/createjs.js';
import Tools from '../../tools/Tools.js';
import PageList from '../components/PageList';
import TextString from '../components/TextString';

/**
 *
 * @param styleData
 *  {
        titleX:20,
        titleY:0,
        bgX:20,
        bgY:34,
        listTitleX:25,
        listTitleY:47,
        pageListX:25,
        pageListY:72,

        titleStr:"",
        titleFont:"24px 微软雅黑",
        titleColor:"#ffffff",
        titleAlpha:1,

        bg:null,
        listTitleParam:null,
        pageListParam:null
     }
 */
class UIPageList extends createjs.Container{
    constructor(styleData) {
        super();
        if(styleData == null){
            console.error('UIPageList:constructor - param is null,please give a param with "pageListParam" property');
            return;
        }
        if(!Tools.hasProperty(styleData,"pageListParam")){
            console.error('UIPageList:constructor - lack of necessary "pageListParam" attribute');
            return;
        }
        this.setDefaultData();
        this.setStyleData(styleData==null?{}:styleData);

        this.initView();
    }
    setDefaultData(){
        this._titleX = 20;
        this._titleY = 0;
        this._bgX = 20;
        this._bgY = 34;
        this._listTitleX = 25;
        this._listTitleY = 47;
        this._pageListX = 25;
        this._pageListY = 72;

        this._titleStr = "";
        this._titleFont = "24px 微软雅黑";
        this._titleColor = "#ffffff";
        this._titleAlpha = 1;

        this._bg = null;
        this._listTitleParam = null;
        this._pageListParam = null;
    }
    setStyleData = (styleData)=>{
        for(let k in styleData){
            if(("_"+k) in this){
                this["_"+k] = styleData[k];
            }
        }
    };
    initView() {
        this._title = new createjs.Text(this._titleStr,this._titleFont, this._titleColor);
        this._title.alpha = this._titleAlpha;
        this._title.x = this._titleX;
        this._title.y = this._titleY;
        this._bgCon = new createjs.Container();
        this._bgCon.x = this._bgX;
        this._bgCon.y = this._bgY;
        if(this._bg != null){
            this._bgCon.addChild(this._bg);
        }

        this._listTitle = new TextString(this._listTitleParam);
        this._listTitle.x = this._listTitleX;
        this._listTitle.y = this._listTitleY;

        this._pageList = new PageList(this._pageListParam);
        this._pageList.x = this._pageListX;
        this._pageList.y = this._pageListY;

        this.addChild(this._bgCon,this._title,this._listTitle,this._pageList);
    }

    get selectedIndex() {
        return this._pageList.selectedIndex;

    }
    get selectedItemData () {
        return this._pageList.selectedItemData;
    }
    get selectedItem(){
        return this._pageList.selectedItem;
    }
    reset(){
        this._pageList.reset();
    }
    clear(){
        this._listTitle.clear();
        this._pageList.clear();
        this._bgCon.removeAllChildren();
        this.removeAllChildren();
    }
    setTitle(t){
        this._title.text = t;
    }
    setListTitle(o){
        this._listTitle.setData(o);
    }
    setData(arrData){
        this._pageList.setData(arrData);
    }
}
export default UIPageList;
