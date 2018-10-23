function shortcutKeyEvent(event)
{
	var container = this;
	if(event.altKey && event.shiftKey){
		//console.log(event.keyCode);
		switch(event.keyCode){
			case 65: 
				trigger(".site-shortcut-key-a");
				break;
			case 66: 
				trigger(".site-shortcut-key-b");
				break;
			case 67: 
				trigger(".site-shortcut-key-c");
				break;
			case 69: 
				trigger(".site-shortcut-key-e"); 
				break;
			case 70: 
				trigger(".site-shortcut-key-f"); 
				break;
			case 78: 
				trigger(".site-shortcut-key-n"); 
				break;
			case 83: 
				trigger(".site-shortcut-key-s"); 
				break;
			case 90: 
				trigger(".site-shortcut-key-z"); 
				break;
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
				trigger_default(el);
		}
	}
	// 기본으로는 click 이벤트를 발생
	function trigger_default(el)
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
		} else if(['button','reset','submit','color','file','image'].indexOf(el.type) !== -1){
			el.click();
		} else if(['hidden'].indexOf(el.type) !== -1){
			return;
		} else {
			el.click();
		}
	}
}