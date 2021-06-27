/**
 * shAccessKey 3.0.1
 * 
 * License : MIT
 * Git : https://github.com/exizt/jshotkey
 * Author : EXIzT
 */
class shAccessKey {
  private options = {
    "selectorPrefix": '.site-shortcut-key-',
    "isDebug": false
  }

  /**
   * constructor
   * @param {json} options 
   */
  constructor(options?:JSON) {
    // this.options = options
    let opts = options || {}

    // Object.assign(this.options, opts)
    this.options = {...this.options, ... opts}

    // add key Event
    window.addEventListener("keydown", (event) => this.hotkeyEvent(event))
  }

  /**
     * (사용법)
     * window.onkeydown = shortcutKeyEvent 과 같이 
     * 이벤트를 바인딩하면 사용할 수 있음.
     * @param {event} e 키 이벤트
     */
   hotkeyEvent(e:any) {
    // console.log(this.options)
    if (e.altKey && e.shiftKey) {

        // 알파벳 키 입력일 때에. (a~z)
        // 0~9 는 48-57
        if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57) {
            if (this.isAvailable()) {
                if (this.options.isDebug) {
                    console.log(String.fromCharCode(e.keyCode).toLowerCase())
                }
                e.preventDefault();// altkey 로 발생하는 이벤트 방지
                this.trigger(this.options.selectorPrefix + String.fromCharCode(e.keyCode).toLowerCase());
            }
        }
    }
  }

  /**
   * case 1) anchor 태그이면, href 로 이동시킨다.
   * case 2) 일반 태그 이면 click 이벤트를 동작시킨다.
   */
  trigger(selector: string) {
      var el = document.querySelector(selector);
      if (el === null) return;

      switch (el.tagName.toLowerCase()) {
          case 'a':
              this.triggerAnchorEl(el)
              break
          case 'input':
              this.triggerInputEl(el)
              break
          default:
              this.triggerClick(el)
      }

  }

  /**
   * 기본으로는 click 이벤트를 발생
   * @param {el} el 
   */
  triggerClick(el:any){
      el.click()
  }

  /**
   * a 태그의 경우에는 location 처리
   * @param {el} el 
   */
  triggerAnchorEl(el:any){
      var href = el.getAttribute('href');
      if (href == '#') {
          // 링크가 # 일 경우에, click 이벤트가 있으면 실행함
          el.click();
      } else {
          window.location.href = href;
      }
  }

  /**
   * input 태그의 경우에는 type 의 종류에 따라 분기.
   * focusing : 'text' 'search'
   * onclick : 그 외의 경우. 예) button, submit, reset 등
   * 
   * @param {el} el 
   * @returns 
   */
  triggerInputEl(el:any){
      if (['text', 'search', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'radio', 'range', 'tel', 'time', 'url', 'week'].indexOf(el.type) !== -1) {
          el.focus();
      } else if (['hidden'].indexOf(el.type) !== -1) {
          // input type="hidden"은 동작하지 않게
          return;
      } else {
          el.click();
      }
  }

  /**
   * 사용 가능한지 여부. 스마트폰에서 단축키를 이용할 수 없으니 제외해야 함.
   * @returns boolean
   */
  isAvailable() {
      var simpleAgent = this.getSimpleBrowserAgent()
      if (simpleAgent == "mobile") {
          return false;
      } else {
          return true;
      }
  }

  /**
   * 간략하게 브라우저를 체크함
   */
  getSimpleBrowserAgent() {

      var agent = navigator.userAgent.toLowerCase();
      if (agent.match(/android/i)
          || agent.match(/webos/i)
          || agent.match(/iphone/i)
          || agent.match(/ipad/i)
      ) {
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
  }
}