/**
 * MyAccessKey 4.0.0
 *
 * @author exizt
 * @license MIT
 * @see https://github.com/exizt/accesskey-js
 */
export class WebHotKey {
    // 키를 지정한 html 속성 이름
    private attributeName = "hotkey"
    // 디버깅 유무
    private isDebug = false

    /**
     * constructor
     * @param {json} options
     */
    constructor(options?: IOptions) {
        // 옵션값 지정
        this.setOptions(options)

        // debug
        this.debug("loaded")

        // 지원 여부 확인
        if ( !this.isSupported() ) {
            this.debug("not supported")
            return
        }

        // 키 이벤트 바인딩
        window.addEventListener("keydown", (e) => this.handleKeyEvent(e))
    }

    /**
     * 알파벳, 숫자 한정으로 단축키가 동작되는 이벤트
     *
     * @param e 키보드 입력 이벤트
     * @param options 옵션값
     */
    private handleKeyEvent(e: KeyboardEvent): void{
        // alt + shift 조합에 한정.
        if (e.altKey && e.shiftKey) {
            this.debug(e.key)

            // 알파벳, 숫자 한정으로 동작
            let key = this.getAlphaNumericKey(e.key)
            if ( key !== false ) {
                if(e.defaultPrevented) return
                this.debug(`key (${key})`)

                // 액션
                this.handleElements(key.toString());

                // 중복 액션 방지 or alt key 이벤트 방지.
                e.preventDefault()
            }
        }
        return
    }

    /**
     * 태그에 따라서 분기시키는 메소드.
     *
     * querySelector를 통해 현재 요소의 태그명을 받아오고, 이에 따라 분기시킨다.
     * @param selector 요소의 selector
     * @returns void
     */
    private handleElements(key: string): void {
        const el = document.querySelector(`[${this.attributeName}="${key}"]`) as HTMLElement
        if (el === null) return;

        switch (el.tagName.toLowerCase()) {
            case 'a':
                this.handleAnchorElement(el)
                break
            case 'input':
                this.handleInputElement(el)
                break
            default:
                this.handleOtherElement(el)
                break
        }
    }

    /**
     * 기본으로는 click 이벤트를 발생
     * @param element
     */
    private handleOtherElement(element: HTMLElement) {
        element.click()
    }

    /**
     * a 태그의 경우에는 location 처리
     * @param element
     */
    private handleAnchorElement(element: HTMLElement) {
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
    private handleInputElement(element: HTMLElement) {
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
     * 키보드로 입력한 값이 알파벳 또는 소문자인지 여부.
     * 빠르게 체크를 해야하는 부분이므로, 코드의 시인성보다 성능상의 최적화에 중점을 둘 것.
     * @param e 키보드 이벤트
     * @returns boolean
     */
    private getAlphaNumericKey(key: any): boolean|string {
        // 지원되지 않는 경우.
        if (typeof key === "undefined") return false

        // 1글자만 키로 사용 가능
        if(key.length != 1) return false

        // key값(예:a~z,0~9,Alt,Control)에서 영문,숫자 입력만 필터링
        // key값(예:a~z,0~9)의 첫글자만 소문자화
        let _key = (key).toLowerCase()
        let _code = _key.charCodeAt(0)
        if ( (_code >= 'a'.charCodeAt(0) && _code <= 'z'.charCodeAt(0))
            || (_code >= '0'.charCodeAt(0) && _code <= '9'.charCodeAt(0))
        ){
            return _key
        }
        return false
    }

    /**
     * 사용 가능한지 여부.
     * @returns boolean
     */
    private isSupported(): boolean {

        // 스마트폰에서 단축키를 이용할 수 없으니 제외함.
        const isSupportedBrowser = !this.isMobileBrowser()
        if (isSupportedBrowser) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 모바일 브라우저인지 확인.
     */
    private isMobileBrowser(): boolean {
        const agent = navigator.userAgent.toLowerCase();
        // this.debug(agent)
        if (agent.match(/android/i)
            || agent.match(/webos/i)
            || agent.match(/iphone/i)
            || agent.match(/ipad/i)
        ) {
            return true
        }
        return false
    }

    /**
     * 옵션값 지정
     * @param options 옵션값 JSON
     */
    private setOptions(options?:any): void {
        if(!options) return
        if(options.attributeName) {
            this.attributeName = options.attributeName
        }
        if(options.isDebug) {
            this.isDebug = options.isDebug
        }
    }

    /**
     * 디버깅 로그
     * @param _args 디버깅 로그
     */
    private debug(..._args:any) {
        if (!this.isDebug) return
        const tag = '[shAccessKey]'
        const args = _args.map((x: any) => {
            if(typeof x === 'object'){
                return JSON.parse(JSON.stringify(x))
            } else {
                return x
            }
        })
        console.log(tag, ...args)
    }
}
interface IOptions {
    attributeName: string;
    isDebug: boolean;
}
