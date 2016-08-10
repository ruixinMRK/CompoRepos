

class Tools{

    constructor(){

    }

    //获取节点
    static getDOM(args){

        let childElements = [];
        if (args.indexOf(' ') != -1) {
            let elements = args.split(' ');			//把节点拆开分别保存到数组里
            //存放临时节点对象的数组，解决被覆盖的问题
            let node = [];								//用来存放父节点用的
            for (let i = 0; i < elements.length; i ++) {
                if (node.length == 0) node.push(document);		//如果默认没有父节点，就把document放入

                switch (elements[i].charAt(0)) {
                    case '#' :
                        childElements = [];				//清理掉临时节点，以便父节点失效，子节点有效
                        childElements.push(Tools.getID(elements[i].substring(1)));
                        node = childElements;		//保存父节点，因为childElements要清理，所以需要创建node数组

                        break;
                    case '.' :
                        childElements = [];
                        for (let j = 0; j < node.length; j ++) {

                            let temps = Tools.getClass(elements[i].substring(1), node[j]);

                            for (let k = 0; k < temps.length; k ++) {
                                childElements.push(temps[k]);
                            }
                        }

                        node = childElements;
                        break;
                    default :
                        childElements = [];
                        for (let j = 0; j < node.length; j ++) {
                            let temps = Tools.getTagName(elements[i], node[j]);
                            for (let k = 0; k < temps.length; k ++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
            this.elements = childElements;
        } else {

            switch (args.charAt(0)) {
                case '#' :
                    childElements.push(Tools.getID(args.substring(1)));
                    break;
                case '.' :
                    childElements.push(Tools.getClass(args.substring(1)));
                    break;
                default :
                    childElements.push(Tools.getTagName(args));
            }
        }

        if(childElements.length>1) return childElements;
        else if(childElements.length == 1) return childElements[0];
        else throw new Error('no node is find');


    }

    static getID(id){
        return document.getElementById(id);
    }
    static getTagName(tag, parentNode){
        let node = null;
        let temps = [];
        if (parentNode != undefined) {
            node = parentNode;
        } else {
            node = document;
        }
        let tags = node.getElementsByTagName(tag);
        for (let i = 0; i < tags.length; i ++) {
            temps.push(tags[i]);
        }
        return temps;
    }
    static getClass(className, parentNode){

        let node = null;
        let temps = [];
        if (parentNode != undefined) {
            node = parentNode;
        } else {
            node = document;
        }

        let all = node.getElementsByTagName('*');
        for (let i = 0; i < all.length; i ++) {
            if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(all[i].className)) {
                temps.push(all[i]);
            }
        }
        return temps;
    }
    //是否为obj自己的属性(非继承)
    static hasPropSelf(o,prop){
        return o.hasOwnProperty(prop) && !(prop in o);
    }
    //获取dom节点的x,y,w,h
    static getDOMClient(div){
        let rect = div.getBoundingClientRect();
        let x = rect.left|0;
        let y = rect.top|0;
        let w = (rect.width||rect.right - x)|0;
        let h = (rect.height||rect.bottom - y)|0;
        return {x:x,y:y,w:w,h:h};
    }
    //设置样式
    static setDivStyle(div,obj){
        for(let attr in obj){
            div.style[attr] = obj[attr];
        }
    }
    //角度转弧度
    static getHD(num){
        return num * Math.PI /180;
    }
    //弧度转角度
    static getJD(num){
        return num * 180 /Math.PI;
    }
    //获取坐标旋转固定角度之后的坐标
    //x,y,角度，是否为弧度
    static getXY(x1,y1,num,isHD){
        if(!isHD) num = Tools.getHD(num);
        let x = Math.cos(num)*x1 + Math.sin(num)*y1;
        let y = Math.cos(num)*y1 - Math.sin(num)*x1;
        return [x|0,y|0];
    }
    //计算两点距离
    static getDis(x1,y1,x2,y2){
        let dx = x2 - x1;
        let dy = y2 - y1;
        return Math.sqrt(dx*dx+dy*dy);
    }
    //获取div样式
    static getDivStyle(div,att){
        let style = null;
        //如果div中没有写样式，在非IE中会返回默认样式，在ie中返回auto字符串
        if (window.getComputedStyle) {
            style = window.getComputedStyle(div, null);    // 非IE
        } else {
            style = div.currentStyle;  // IE
        }
        return style[att];
    }
    //获取键
    static getKey(obj){
        let key = '';
        for(let str in obj){
            key = str;
        }
        return key;
    }
    //获取对象的值
    static getValue(obj){
        let value = '';
        for(let str in obj){

            value = obj[str];
        }
        return value;
    }
    //给css增加一个规则
    static addRule(sheet, selectorText, cssText, position){

        if (sheet.insertRule) {
            sheet.insertRule(selectorText + "{" + cssText + "}", position);
        } else if (sheet.addRule) {
            sheet.addRule(selectorText, cssText, poistion);
        }

    }

    //返回本地时间
    static getLocalTime(){
        let checkTime = function(a){
            if(a < 10) a = "0" + a;
            else a = a;
            return a;
        }
        let str = "";
        let d = new Date();
        let m = d.getMonth() + 1;
        let r = d.getDate();
        let s = d.getHours();
        let f = d.getMinutes();
        let mm = d.getSeconds();
        str = (d.getYear() + 1900) + "-" +  checkTime(m) + "-" + checkTime(r) + "   " + checkTime(s) + ":" + checkTime(f) + ":" + checkTime(mm);
        return str;
    }

    //获取url中参数 GetParamsString('id')
    static getParamsString(name){
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    static hasClass(dom, className) {
        return dom.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
    }
    //增加class
    static addClassName(dom,str){
        if (!Tools.hasClass(dom, str)) {
            dom.className += ' ' + str;
        }
    }
    //移除class
    static removeClassName(dom,str){
        if (Tools.hasClass(dom, str)) {
            dom.className = dom.className.replace(new RegExp('(\\s|^)' +str +'(\\s|$)'), ' ');
        }
    }
    //获取浏览器类型
    static getBrowser(){
        let agent = navigator.userAgent.toLowerCase() ;
        let regStr_ie = /msie [\d.]+;/gi ;
        let regStr_ff = /firefox\/[\d.]+/gi
        let regStr_chrome = /chrome\/[\d.]+/gi ;
        let regStr_saf = /safari\/[\d.]+/gi ;
        //IE
        if(agent.indexOf("msie") > 0) return agent.match(regStr_ie) ;
        //firefox
        if(agent.indexOf("firefox") > 0)  return agent.match(regStr_ff) ;
        //Chrome
        if(agent.indexOf("chrome") > 0) return agent.match(regStr_chrome) ;
        //Safari
        if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) return agent.match(regStr_saf) ;
    }
    //判断时候是微信端
    static isWX(){
        let ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    //判断是否是手机端
    static isMobile() {
        return navigator.userAgent.match(/android|iphone|ipod|blackberry|meego|symbianos|windowsphone|ucbrowser/i)
    }
    //跨浏览器获取视口大小
    static getInner() {
        if (typeof window.innerWidth != 'undefined') {
            return {
                width : window.innerWidth,
                height : window.innerHeight
            }
        } else {
            return {
                width : document.documentElement.clientWidth,
                height : document.documentElement.clientHeight
            }
        }
    }

    //跨浏览器获取滚动条位置
    static getScroll() {
        return {
            top : document.documentElement.scrollTop || document.body.scrollTop,
            left : document.documentElement.scrollLeft || document.body.scrollLeft
        }
    }

    //处理长字符串，将其过多的字符用其他字符替代，比如，字符过长，将多余的用...替代
    static doLongString(str,upCount,count,repStr){
        if(str && str.length>upCount)
        {
            let s = str.substr(0,upCount-count);
            return s+repStr;
        }
        return str;
    }
    //获取区间随机数 isI 为是否取整
    static getRandomNum(min,max,isI){
        min = min||0;
        max = max ||100;
        isI = typeof isI != 'undefined'?isI:false;
        let n = Math.random()*(max - min+1) + min;
        n = isI?parseInt(n):n;
        return n;
    }
    //比较两个对象是否相等
    static equalObj(objA, objB) {
        if (typeof arguments[0] != typeof arguments[1])
            return false;

        //数组
        if (arguments[0] instanceof Array)
        {
            if (arguments[0].length != arguments[1].length)
                return false;

            let allElementsEqual = true;
            for (let i = 0; i < arguments[0].length; ++i)
            {
                if (typeof arguments[0][i] != typeof arguments[1][i])
                    return false;

                if (typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number')
                    allElementsEqual = (arguments[0][i] == arguments[1][i]);
                else
                    allElementsEqual = arguments.callee(arguments[0][i], arguments[1][i]);            //递归判断对象是否相等
            }
            return allElementsEqual;
        }

        //对象
        if (arguments[0] instanceof Object && arguments[1] instanceof Object)
        {
            let result = true;
            let attributeLengthA = 0, attributeLengthB = 0;
            for (let o in arguments[0])
            {
                //判断两个对象的同名属性是否相同（数字或字符串）
                if (typeof arguments[0][o] == 'number' || typeof arguments[0][o] == 'string')
                    result = eval("arguments[0]['" + o + "'] == arguments[1]['" + o + "']");
                else {
                    //如果对象的属性也是对象，则递归判断两个对象的同名属性
                    //if (!arguments.callee(arguments[0][o], arguments[1][o]))
                    if (!arguments.callee(eval("arguments[0]['" + o + "']"), eval("arguments[1]['" + o + "']")))
                    {
                        result = false;
                        return result;
                    }
                }
                ++attributeLengthA;
            }

            for (let o in arguments[1]) {
                ++attributeLengthB;
            }
            //如果两个对象的属性数目不等，则两个对象也不等
            if (attributeLengthA != attributeLengthB)
                result = false;
            return result;
        }
        return arguments[0] == arguments[1];
    }
    //删除左后空格
    static trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
    //去除数组中重复对象
    static unique(arr) {
        let result = [], hash = {};
        for (let i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }
    //克隆对象
    static clone(obj){
        let o;
        switch(typeof obj){
            case 'undefined': break;
            case 'string'   : o = obj + '';break;
            case 'number'   : o = obj - 0;break;
            case 'boolean'  : o = obj;break;
            case 'object'   :
                if(obj === null){
                    o = null;
                }else{
                    if(obj instanceof Array){
                        o = [];
                        for(let i = 0, len = obj.length; i < len; i++){
                            o.push(Tools.clone(obj[i]));
                        }
                    }else{
                        o = {};
                        for(let k in obj){
                            o[k] = Tools.clone(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj;break;
        }
        return o;
    }

    static floatNumToFixed(v,fixCount){
        let r = parseInt(v);
        if(r==v){
            return r
        }else{
            return parseFloat(v).toFixed(fixCount);
        }
    }

    static floatNumToGood(v,count){
        let r = parseInt(v);
        if(r==v){
            return r
        }else{
            let f = parseFloat(v);
            if(f<1){
                return f.toFixed(count);
            }else{
                return f.toPrecision(count)
            }
        }
    }
    //生成随机字符串
    static getRandomStr(len) {
        let str = "";
        for( ; str.length < len; str  += Math.random().toString(36).substr(2));
        return  str.substr(0, len);
    }
    //生成随机颜色
    static randomColor(){
        let colorStr=Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase();
        return "#"+"000000".substring(0,6-colorStr)+colorStr;
    }
    //将颜色加深 level为加深颜色的等级
    static getDarkColor(color, level) {
        let rgbc = Tools.HexToRgb(color);
        for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
        return Tools.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
    }
    //将Hex转换为rgb
    static HexToRgb(str) {
        str = str.replace("#", "");
        //match得到查询数组
        let hxs = str.match(/../g);
        for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
        return hxs;
    }
    //将rgb颜色值为a,b,c转化成hex颜色值
    static RgbToHex(a, b, c) {
        let hexs = [a.toString(16), b.toString(16), c.toString(16)];
        for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
        return "#" + hexs.join("");
    }
    //转换对象(类似于call和apply与bind)
    static delegate(c,a){
        let b=a||window;
        if(arguments.length>2)
        {
            let d=Array.prototype.slice.call(arguments,2);
            return function()
            {
                let e=Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e,d);
                return c.apply(b,e);
            }
        }else
            return function()
            {
                return c.apply(b,arguments);
            }
    }
    //createjs 中给文本换行
    static wrapText(cast, _displayTxt,nStr){
        let nn = nStr?nStr:'\n';
        let i=0;
        let tempTxt = new createjs.Text('', _displayTxt.font);

        tempTxt.linewidth = null;
        let len=cast.length;
        let _str='',output='';
        let splitList=[0];

        let txtTotalHeight=0;
        tempTxt.text=cast[0];
        let tempHeight=tempTxt.getMeasuredHeight();

        tempTxt.text='';

        try{
            for(i =0;i<len;i++)
            {
                _str+=cast[i];
                tempTxt.text=_str;
                if(tempTxt.getMeasuredWidth()>=_displayTxt.width){
                    splitList.push(i);
                    //alert('_width�򳬤�����: '+_str );
                    _str='';
                    tempTxt.lineWidth = null;
                    i--;
                }
            }
        }catch(error){
            alert(error);
        }

        for(i =0;i<splitList.length;i++){
            if(i==splitList.length){
                output+=cast.slice(splitList[i]);
            }else
            {
                if(txtTotalHeight+tempHeight>_displayTxt.height)break;
                output+=cast.slice(splitList[i],splitList[i+1])+nn;
                txtTotalHeight+=tempHeight;
            }
        }
        tempTxt=null;
        _displayTxt.text=output;
        //return output;
    }

    // 加载图片
    static preloadImg(){

        let imageObj =  {};
        let root = "assets/", count = 0, num = 0;

        this.loadImage = function(images,callback){

            count = images.length;
            //console.log(callback);

            for(let i = 0; i < count; i++)
            {
                let image = new Image();
                image.src = images[i];

                //console.log(images[i]);

                image.onload = () =>
                {
                    let name = this.src.split( '/' );
                    name = name[ name.length - 1 ].split( '.' )[0];
                    imageObj[name] = {
                        obj: this,
                        width: this.width,
                        height: this.height
                    }
                    num += 1;
                    if ( count === num ){
                        callback && callback(imageObj);
                        //console.log("load ok");
                    }
                    this.onload = null;
                }
            }
        }

        //返回回调和图片信息
        return {loadImg:this.loadImage,imageObj:imageObj};
    }


    //取两轴的数值
    static drawY(cormax,cormin,cornumber){
        let temp = 0;
        let extranumber = 0;
        let corstep = 0;
        let tmpstep = 0;
        let tmpnumber = 0;
        // console.log(cormax,cormin,cornumber,'---');
        if(cormax<=cormin)
            return null ;
        corstep=(cormax*1.1-cormin)/cornumber;
        if(Math.pow(10,parseInt(Math.log(corstep)/Math.log(10)))==corstep){
            temp = Math.pow(10,parseInt(Math.log(corstep)/Math.log(10)));
        }else{
            temp = Math.pow(10,(parseInt(Math.log(corstep)/Math.log(10))+1));
        }
        tmpstep = Number((corstep/temp).toFixed(6));
        //选取规范步长
        if(tmpstep>=0&&tmpstep<=0.1){
            tmpstep = 0.1;
        }else if(tmpstep>=0.100001&&tmpstep<=0.2){
            tmpstep = 0.2;
        }else if(tmpstep>=0.200001&&tmpstep<=0.25){
            tmpstep = 0.25;
        }else if(tmpstep>=0.250001&&tmpstep<=0.5){
            tmpstep = 0.5
        }else{
            tmpstep = 1;
        }
        tmpstep = tmpstep * temp;
        if(parseInt(cormin/tmpstep)!=(cormin/tmpstep)){
            if(cormin<0){
                cormin = (-1) * Math.ceil(Math.abs(cormin/tmpstep))*tmpstep;
            }else{
                cormin = parseInt(Math.abs(cormin/tmpstep))*tmpstep;
            }

        }
        if(parseInt(cormax/tmpstep)!=(cormax/tmpstep)){
            cormax = parseInt(cormax/tmpstep+1)*tmpstep;
        }
        tmpnumber = (cormax-cormin)/tmpstep;
        if(tmpnumber<cornumber){
            extranumber = cornumber - tmpnumber;
            tmpnumber = cornumber;
            if(extranumber%2 == 0){
                cormax = cormax + tmpstep*parseInt(extranumber/2);
            }else{
                cormax = cormax + tmpstep*parseInt(extranumber/2+1);
            }
            cormin = cormin - tmpstep*parseInt(extranumber/2);
        }
        cornumber = tmpnumber;

        let arrValue = [];
        let size = parseInt(cormax/cornumber);
        if(cormax <5) arrValue = [0,1,2,3,4,5];
        else{

            for(let i = 0;i<cornumber+1;i++){
                arrValue.push(i*size);
            }
        }

        return arrValue;
    }

    //操作cookie
    static cookie(key,value,time){
        let l = arguments.length;

        let getCookie = function(a){
            let arr,reg=new RegExp("(^| )"+a+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }

        let setCookie = function(a,b,c){
            c = c||10;
            let d = new Date();   //初始化时间
            d.setTime(d.getTime() + c * 1000);   //时间
            document.cookie = a+"="+b+";expires="+d.toGMTString()+";path=/";

        }

        if(l == 1){
            return getCookie(key);
        }
        else{
            setCookie(key,value,time)
        }
    }

    //注册事件
    //跨浏览器添加事件绑定

    static addEvent(obj, type, fn) {

        let same = function(es, fn){
            for (let i in es) {
                if (es[i] == fn) return true;
            }
            return false;
        }

        //IE阻止默认行为
        let preventD = function () {
            this.returnValue = false;
        };

        //IE取消冒泡
        let stopProp = function () {
            this.cancelBubble = true;
        };

        //把IE常用的Event对象配对到W3C中去
        let fixEvent = function (event) {
            event.preventDefault = preventD;
            event.stopPropagation = stopProp;
            event.target = event.srcElement;
            return event;
        };

        let exec = function (event) {
            let e = event || fixEvent(window.event);
            let es = this.events[e.type];
            for (let i in es) {
                es[i].call(this, e);
            }
        };

        if (typeof obj.addEventListener != 'undefined') {
            obj.addEventListener(type, fn, false);
        } else {
            //创建一个存放事件的哈希表(散列表)
            if (!obj.events) obj.events = {};
            //第一次执行时执行
            if (!obj.events[type]) {
                //创建一个存放事件处理函数的数组
                obj.events[type] = [];
                //把第一次的事件处理函数先储存到第一个位置上
                if (obj['on' + type]) obj.events[type][0] = fn;
            } else {
                //同一个注册函数进行屏蔽，不添加到计数器中
                if (same(obj.events[type], fn)) return false;
            }
            //从第二次开始我们用事件计数器来存储
            obj.events[type][Tools.addEventId++] = fn;
            //执行事件处理函数
            obj['on' + type] = exec;
        }
    }
    //跨浏览器删除事件
    /**
     *
     * @param obj
     * @param type
     * @param fn
     */
    static removeEvent(obj, type, fn) {
        if (typeof obj.removeEventListener != 'undefined') {
            obj.removeEventListener(type, fn, false);
        } else {
            if (obj.events) {
                for (let i in obj.events[type]) {
                    if (obj.events[type][i] == fn) {
                        delete obj.events[type][i];
                    }
                }
            }
        }
    }

    //ajax //obj = {data:'',url = '',mothed:'',callback:,async:'',timeout};
    static ajax(obj){

        let xmlhttp = null;
        let createXMLHttp = function(){

            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xmlhttp;
        };

        //解析参数
        let paramsData = function(data){

            if(!data) return '';
            let arr = [];
            for(let str in data){
                arr.push( encodeURIComponent(str) + '=' + encodeURIComponent(data[str]));
            }
            return arr.join('&');
        }

        let callBack = function(){
            if(xhr.status == 200){
                obj.callback&&obj.callback(xhr.responseText);
                xmlhttp = null;
            }
        }

        let xhr = createXMLHttp();

        if(obj.async){
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4) callBack();
            }
        }


        let url = obj.url;
        let mothed = obj.mothed;
        let timeout = timeout||10;

        if(mothed === 'get') url += '?r=' + Math.random() + '&' + paramsData(obj.data);
        xhr.open(mothed,url,obj.async);
        if(mothed === 'post'){
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(obj.data);
        }
        else{
            xhr.send(null);
        }
        //到时间后取消请求
        let t = setTimeout( function () {
            xhr.abort();
            clearTimeout(t);
        },timeout);
        console.log(url);
        //同步的话
        if(!obj.async)  callBack();
    }

    //快速排序(可能造成栈溢出)
    // var aaa = [3, 5, 2, 9, 1];
    // this.quickSort(aaa, 0, aaa.length - 1);
    static quickSort(array, left, right,key) {
        if (Array.isArray(array)) {
            if (left < right) {
                var x = array[right][key], i = left - 1, temp;
                for (let j = left; j <= right; j++) {
                    if (array[j][key] <= x) {
                        i++;
                        temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
                Tools.quickSort(array, left, i - 1,key);
                Tools.quickSort(array, i + 1, right,key);
            }
        } else {
            return 'array is not an Array or left or right is not a number!';
        }
    }

    //createjs加载资源
    static loadPlate(arr,callBack) {
        let dataArr = [];

        let handlerProgress = function(event)
        {

        }

        let handlerComplete = function(event)
        {
            callBack(dataArr);
        }

        let handlerFileloaded = function(event)
        {
            let obj = {};
            obj.source = event.result;
            obj.id = event.item.id;
            dataArr.push(obj);
        }

        let onError = function (e){
            throw new Error('资源加载错误',e)
        }

        let loader = new createjs.LoadQueue(true);
        // loader.installPlugin(createjs.Sound);
        // createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop)
        loader.addEventListener("fileload", handlerFileloaded);
        loader.addEventListener("progress",handlerProgress);
        loader.addEventListener("complete", handlerComplete);
        loader.addEventListener('fileerror',onError);
        loader.loadManifest(arr);

    }
    //容器自适应
    static getZoomByRate(_srcWidth,_srcHeight,_maxWidth,_maxHeight){

        // 变量声明
        let isZoom=false;//是否缩放
        let srcWidth=_srcWidth;//原始宽
        let srcHeight=_srcHeight;//原始高
        let maxWidth=_maxWidth;//限制宽
        let maxHeight=_maxHeight;//限制高
        let newWidth=0;//新宽
        let newHeight=0;//新高

        let conductimg = function(){
            if(isZoom){//如果高宽正常，开始计算
                if(srcWidth/srcHeight>=maxWidth/maxHeight){
                    //比较高宽比例，确定以宽或者是高为基准进行计算。
                    if(srcWidth>maxWidth){//以宽为基准开始计算，
                        //当宽度大于限定宽度，开始缩放
                        newWidth=maxWidth;
                        newHeight=(srcHeight*maxWidth)/srcWidth
                    }else{
                        //当宽度小于限定宽度，直接返回原始数值。
                        newWidth=srcWidth;
                        newHeight=srcHeight;
                    }
                }else{
                    if(srcHeight>maxHeight){//以高为基准，进行计算
                        //当高度大于限定高度，开始缩放。
                        newHeight=maxHeight;
                        newWidth=(srcWidth*maxHeight)/srcHeight
                    }else{
                        //当高度小于限定高度，直接返回原始数值。
                        newWidth=srcWidth;
                        newHeight=srcHeight;
                    }
                }
            }else{//不正常，返回0
                newWidth=0;
                newHeight=0;
            }
        }

        let getWidth = function(){//���ش����Ŀ�ȣ���ȷ��2��С����
            let num = new Number(newWidth);
            return num.toFixed(2);
        }

        let getHeight = function(){//���ش����ĸ߶ȣ���ȷ��2��С����
            let num = new Number(newHeight);
            return num.toFixed(2);
        }


        if(srcWidth>0 && srcWidth>0){//检查图片高度是否正常
            isZoom=true;//高宽正常，执行缩放处理
        }else{
            isZoom=false;//不正常，返回0
        }
        conductimg();//执行缩放算法

        return{
            getWidth:getWidth,
            getHeight:getHeight
        }

    }

}
Tools.addEventId = 0;

export default Tools;


