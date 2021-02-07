/*! 
* exizt/jshotkey 2.0.0
* 
* Licensed under MIT
*      Git : https://github.com/exizt/jshotkey
*   Author : EXIZT
* Modified : 2021.02
*/
document.addEventListener("DOMContentLoaded",()=>{

    //window.onkeydown = shortcutKeyEvent
    window.addEventListener("keydown", hotkeyEvent)

    const config = {
        selectorPrefix : '.site-shortcut-key-',
        isDebug : false
    }
    
    /**
     * (사용법)
     * window.onkeydown = shortcutKeyEvent 과 같이 
     * 이벤트를 바인딩하면 사용할 수 있음.
     * @param {event} e 키 이벤트
     */
    function hotkeyEvent(e){
        if(e.altKey && e.shiftKey){
            
            // 알파벳 키 입력일 때에. (a~z)
            // 0~9 는 48-57
            if(e.keyCode >=65 && e.keyCode <=90 || e.keyCode >=48 && e.keyCode <=57)
            {
                e.preventDefault();// altkey 로 발생하는 이벤트 방지
                if(validAltShift()){
                    if(config.isDebug){ 
                        console.log(String.fromCharCode(e.keyCode).toLowerCase()) 
                    }
                    trigger(config.selectorPrefix + String.fromCharCode(e.keyCode).toLowerCase());
                }
            }
        }
    }

    /**
     * case 1) anchor 태그이면, href 로 이동시킨다.
     * case 2) 일반 태그 이면 click 이벤트를 동작시킨다.
     */
    function trigger(selector){
        //console.log(container);		
        //var el = container.querySelector(selector);
        var el = document.querySelector(selector);
        if(el === null) return;
        //console.log(el);
        switch(el.tagName.toLowerCase()){
            case 'a' :
                trigger_a_tag(el);
                break;
            case 'input' :
                trigger_input_tag(el);
                break;
            default :
                trigger_click(el);
        }
    }

    // 기본으로는 click 이벤트를 발생
    function trigger_click(el)
    {
        el.click();
    }

    // a 태그의 경우에는 location 처리
    function trigger_a_tag(el)
    {
        var href = el.getAttribute('href');
        if(href=='#'){
            // 링크가 # 일 경우에, click 이벤트가 있으면 실행함
            el.click();
        } else {
            window.location.href = href;
        }
    }

    // input 태그의 경우에는 type 의 종류에 따라 분기.
    // focusing : 'text' 'search'
    // onclick : 그 외의 경우. 예) button, submit, reset 등
    function trigger_input_tag(el)
    {
        if(['text','search','date','datetime-local','email','month','number','password','radio','range','tel','time','url','week'].indexOf(el.type) !== -1){
            el.focus();
        } else if(['hidden'].indexOf(el.type) !== -1){
            // input type="hidden"은 동작하지 않게
            return;
        } else {
            el.click();
        }
    }

    function validAltShift(){
        var simpleAgent = simpleBrowserCheck()
        if(simpleAgent == "mobile"){
            return false;
        } else {
            return true;
        }
    }

    
    /**
     * 간략하게 브라우저를 체크함
     */
    function simpleBrowserCheck(){
        var agent = navigator.userAgent.toLowerCase();
        //console.log(agent)
    
        if( agent.match(/android/i)
        || agent.match(/webos/i)
        || agent.match(/iphone/i)
        || agent.match(/ipad/i)
        ){
            return 'mobile';
        }
        /*
        if (agent.indexOf("msie") != -1) {    //익스플로러인지 체크
            //alert("익스프로러입니다.");
        }
        if (agent.indexOf("chrome") != -1) {
            //alert("크롬 브라우저입니다.");
        }
        if (agent.indexOf("safari") != -1) {
            //alert("사파리 브라우저입니다.");
        }
        if (agent.indexOf("firefox") != -1) {
            //alert("파이어폭스 브라우저입니다.");
        }
        */
    }
});