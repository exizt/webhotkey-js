import { getKeyLowercaseByEvent, isAlphaNumericByEvent } from './keyboard'

/**
 * shAccessKey 3.0.3
 * 
 * Git : https://github.com/exizt/jshotkey
 * license MIT
 * author exizt
 */
export class shAccessKey {
    private options = {
        "selectorPrefix": '.site-hotkey-',
        "isDebug": false
    }
    private isEnabled = false
    private debugTag = '[jshotkey]'

    /**
     * constructor
     * @param {json} options 
     */
    constructor(options?: JSON) {
        // options의 값이 없을 수도 있으므로, null일 경우에 빈 오브젝트
        const opts = options || {}

        // 초기값과 옵션 파라미터의 병합
        // Object.assign(this.options, opts)
        this.options = { ...this.options, ...opts }

        if (this.options.isDebug) {
            console.log(`${this.debugTag} is loaded ${this.options}`)
        }

        // 브라우저 사용 가능 여부를 체크해서 허용 여부 결정
        this.isEnabled = this.isAvailable()

        // 키보드 이벤트 리스너 등록
        if(this.isEnabled){
            if (this.options.isDebug) {
                console.log(`${this.debugTag} is enabled`)
            }
            window.addEventListener("keydown", (event) => this.hotkeyEvent(event))
        }
    }

    /**
     * 키 이벤트
     * @param {event} e 키 이벤트
     */
    hotkeyEvent(e: KeyboardEvent) {
        // console.log(this.options)
        if (e.altKey && e.shiftKey) {
            this.triggerEvent(e, this.options)
        }
    }

    /**
     * 알파벳, 숫자 한정으로 단축키가 동작되는 이벤트
     * @param e 키보드 입력 이벤트
     * @param options 옵션값
     */
    triggerEvent(e: KeyboardEvent, options:{selectorPrefix:string}){
        // 알파벳, 숫자 한정으로 동작
        if (isAlphaNumericByEvent(e)) {
            e.preventDefault();// altkey 로 발생하는 이벤트 방지
            if (this.options.isDebug) {
                console.log(`${this.debugTag} is AlphaNumeric. key (${getKeyLowercaseByEvent(e)})`)
            }
            this.trigger(options.selectorPrefix + getKeyLowercaseByEvent(e));
        }
    }

    /**
     * case 1) anchor 태그이면, href 로 이동시킨다.
     * case 2) 일반 태그 이면 click 이벤트를 동작시킨다.
     */
    trigger(selector: string) {
        const el = document.querySelector(selector) as HTMLElement;
        if (el === null) return;

        switch (el.tagName.toLowerCase()) {
            case 'a':
                this.triggerAnchorElement(el)
                break
            case 'input':
                this.triggerInputElement(el)
                break
            default:
                this.triggerClickEvent(el)
        }
    }

    /**
     * 기본으로는 click 이벤트를 발생
     * @param element 
     */
    triggerClickEvent(element: HTMLElement) {
        element.click()
    }

    /**
     * a 태그의 경우에는 location 처리
     * @param element
     */
    triggerAnchorElement(element: HTMLElement) {
        const el = element as HTMLAnchorElement
        const href = el.getAttribute('href') || '';
        if (href == '#') {
            // 링크가 # 일 경우에, click 이벤트가 있으면 실행함.
            el.click();
        } else {
            if (href.length > 0) {
                window.location.href = href;
            }
        }
    }

    /**
     * input 태그의 경우에는 type 의 종류에 따라 분기.
     * focusing : 'text' 'search'
     * onclick : 그 외의 경우. 예) button, submit, reset 등
     * 
     * @param element 
     * @returns 
     */
    triggerInputElement(element: HTMLElement) {
        const el = element as HTMLInputElement
        if (['text', 'search', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'radio', 'range', 'tel', 'time', 'url', 'week'].indexOf(el.type) !== -1) {
            el.focus()
        } else if (['hidden'].indexOf(el.type) !== -1) {
            // input type="hidden"은 동작하지 않게
            return;
        } else {
            el.click()
        }
    }

    /**
     * 사용 가능한지 여부. 스마트폰에서 단축키를 이용할 수 없으니 제외해야 함.
     * @returns boolean
     */
    isAvailable(): boolean {
        const simpleAgent = this.getSimpleBrowserAgent()
        if (simpleAgent == "mobile") {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 간략하게 브라우저를 체크함
     */
    getSimpleBrowserAgent(): string {
        const agent = navigator.userAgent.toLowerCase();
        if (agent.match(/android/i)
            || agent.match(/webos/i)
            || agent.match(/iphone/i)
            || agent.match(/ipad/i)
        ) {
            return 'mobile'
        }
        return ''
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
    }
}