export class WebHotKey {
    constructor(options) {
        this.attributeName = "hotkey";
        this.isDebug = false;
        this.setOptions(options);
        this.debug("loaded");
        if (!this.isSupported()) {
            this.debug("not supported");
            return;
        }
        window.addEventListener("keydown", (e) => this.handleKeyEvent(e));
    }
    handleKeyEvent(e) {
        if (e.altKey && e.shiftKey) {
            this.debug(e.key);
            let key = this.getAlphaNumericKey(e.key);
            if (key !== false) {
                if (e.defaultPrevented)
                    return;
                this.debug(`key (${key})`);
                this.handleElements(key.toString());
                e.preventDefault();
            }
        }
        return;
    }
    handleElements(key) {
        const el = document.querySelector(`[${this.attributeName}="${key}"]`);
        if (el === null)
            return;
        switch (el.tagName.toLowerCase()) {
            case 'a':
                this.handleAnchorElement(el);
                break;
            case 'input':
                this.handleInputElement(el);
                break;
            default:
                this.handleOtherElement(el);
                break;
        }
    }
    handleOtherElement(element) {
        element.click();
    }
    handleAnchorElement(element) {
        const el = element;
        const href = el.getAttribute('href') || '';
        if (href == '#') {
            el.click();
        }
        else {
            if (href.length > 0) {
                window.location.href = href;
            }
        }
    }
    handleInputElement(element) {
        const el = element;
        if (['text', 'search', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'radio', 'range', 'tel', 'time', 'url', 'week'].indexOf(el.type) !== -1) {
            el.focus();
        }
        else if (['hidden'].indexOf(el.type) !== -1) {
            return;
        }
        else {
            el.click();
        }
    }
    getAlphaNumericKey(key) {
        if (typeof key === "undefined")
            return false;
        if (key.length != 1)
            return false;
        let _key = (key).toLowerCase();
        let _code = _key.charCodeAt(0);
        if ((_code >= 'a'.charCodeAt(0) && _code <= 'z'.charCodeAt(0))
            || (_code >= '0'.charCodeAt(0) && _code <= '9'.charCodeAt(0))) {
            return _key;
        }
        return false;
    }
    isSupported() {
        const isSupportedBrowser = !this.isMobileBrowser();
        if (isSupportedBrowser) {
            return true;
        }
        else {
            return false;
        }
    }
    isMobileBrowser() {
        const agent = navigator.userAgent.toLowerCase();
        if (agent.match(/android/i)
            || agent.match(/webos/i)
            || agent.match(/iphone/i)
            || agent.match(/ipad/i)) {
            return true;
        }
        return false;
    }
    setOptions(options) {
        if (!options)
            return;
        if (options.attributeName) {
            this.attributeName = options.attributeName;
        }
        if (options.isDebug) {
            this.isDebug = options.isDebug;
        }
    }
    debug(..._args) {
        if (!this.isDebug)
            return;
        const tag = '[WebHotKey]';
        const args = _args.map((x) => {
            if (typeof x === 'object') {
                return JSON.parse(JSON.stringify(x));
            }
            else {
                return x;
            }
        });
        console.log(tag, ...args);
    }
}
