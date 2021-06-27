"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * shAccessKey 3.0.2
 *
 * License : MIT
 * Git : https://github.com/exizt/jshotkey
 * Author : EXIzT
 */
var shAccessKey = /** @class */ (function () {
    /**
     * constructor
     * @param {json} options
     */
    function shAccessKey(options) {
        var _this = this;
        this.options = {
            "selectorPrefix": '.site-shortcut-key-',
            "isDebug": false
        };
        // this.options = options
        var opts = options || {};
        // Object.assign(this.options, opts)
        this.options = __assign(__assign({}, this.options), opts);
        // add key Event
        window.addEventListener("keydown", function (event) { return _this.hotkeyEvent(event); });
    }
    /**
       * (사용법)
       * window.onkeydown = shortcutKeyEvent 과 같이
       * 이벤트를 바인딩하면 사용할 수 있음.
       * @param {event} e 키 이벤트
       */
    shAccessKey.prototype.hotkeyEvent = function (e) {
        // console.log(this.options)
        if (e.altKey && e.shiftKey) {
            // 알파벳 키 입력일 때에. (a~z)
            // 0~9 는 48-57
            if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57) {
                if (this.isAvailable()) {
                    if (this.options.isDebug) {
                        console.log(String.fromCharCode(e.keyCode).toLowerCase());
                    }
                    e.preventDefault(); // altkey 로 발생하는 이벤트 방지
                    this.trigger(this.options.selectorPrefix + String.fromCharCode(e.keyCode).toLowerCase());
                }
            }
        }
    };
    /**
     * case 1) anchor 태그이면, href 로 이동시킨다.
     * case 2) 일반 태그 이면 click 이벤트를 동작시킨다.
     */
    shAccessKey.prototype.trigger = function (selector) {
        var el = document.querySelector(selector);
        if (el === null)
            return;
        switch (el.tagName.toLowerCase()) {
            case 'a':
                this.triggerAnchorEl(el);
                break;
            case 'input':
                this.triggerInputEl(el);
                break;
            default:
                this.triggerClick(el);
        }
    };
    /**
     * 기본으로는 click 이벤트를 발생
     * @param {el} el
     */
    shAccessKey.prototype.triggerClick = function (el) {
        el.click();
    };
    /**
     * a 태그의 경우에는 location 처리
     * @param {el} el
     */
    shAccessKey.prototype.triggerAnchorEl = function (el) {
        var href = el.getAttribute('href');
        if (href == '#') {
            // 링크가 # 일 경우에, click 이벤트가 있으면 실행함
            el.click();
        }
        else {
            window.location.href = href;
        }
    };
    /**
     * input 태그의 경우에는 type 의 종류에 따라 분기.
     * focusing : 'text' 'search'
     * onclick : 그 외의 경우. 예) button, submit, reset 등
     *
     * @param {el} el
     * @returns
     */
    shAccessKey.prototype.triggerInputEl = function (el) {
        if (['text', 'search', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'radio', 'range', 'tel', 'time', 'url', 'week'].indexOf(el.type) !== -1) {
            el.focus();
        }
        else if (['hidden'].indexOf(el.type) !== -1) {
            // input type="hidden"은 동작하지 않게
            return;
        }
        else {
            el.click();
        }
    };
    /**
     * 사용 가능한지 여부. 스마트폰에서 단축키를 이용할 수 없으니 제외해야 함.
     * @returns boolean
     */
    shAccessKey.prototype.isAvailable = function () {
        var simpleAgent = this.getSimpleBrowserAgent();
        if (simpleAgent == "mobile") {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * 간략하게 브라우저를 체크함
     */
    shAccessKey.prototype.getSimpleBrowserAgent = function () {
        var agent = navigator.userAgent.toLowerCase();
        if (agent.match(/android/i)
            || agent.match(/webos/i)
            || agent.match(/iphone/i)
            || agent.match(/ipad/i)) {
            return 'mobile';
        }
        /*
        if (agent.indexOf("msie") != -1) {    //익스플로러인지 체크
            return 'ie'
        }
        if (agent.indexOf("chrome") != -1) {
            return 'chrome'
        }
        if (agent.indexOf("safari") != -1) {
            return 'safari'
        }
        if (agent.indexOf("firefox") != -1) {
            return 'firefox'
        }
        */
    };
    return shAccessKey;
}());
