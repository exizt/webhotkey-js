/**
 * 키보드 단축키 지정 하는 스크립트.
 * class="site-shortcut-key-s" 와 같이 지정하면, 가장 첫번째로 클래스 지정된 것을 동작시킨다. (키보드를 눌렀을 때)
 * 
 * [동작]
 * alt + shift + (잠깐 쉬고) + key
 * 
 * [목록]
 * site-shortcut-key-s
 * site-shortcut-key-e
 * 
 * @require jQuery
 * @returns
 */
$(function() {
	$(document).on('keyup', function(e){
		if(e.altKey && e.shiftKey){
			if(e.keyCode == 83){
				// s key
				trigger($(".site-shortcut-key-s"));
				//$("#site-shortcut-key-s").click();
			} else if(e.keyCode == 67){
				trigger($(".site-shortcut-key-c"));
			} else if(e.keyCode == 69){
				trigger($(".site-shortcut-key-e"));
			} else if(e.keyCode == 70){
				trigger($(".site-shortcut-key-f"));
			} else if(e.keyCode == 78){
				trigger($(".site-shortcut-key-n"));
			} else if(e.keyCode == 90){
				trigger($(".site-shortcut-key-z"));
			}
		}
		/**
		 * case 1) anchor 태그이면, href 로 이동시킨다.
		 * case 2) 일반 태그 이면 click 이벤트를 동작시킨다.
		 */
		function trigger($els){
			var $el = $els.first();
			if($el.is("a")){
				var href = $el.attr('href');
			    window.location.href = href;
			} else if ($el.is("input")){
				if(	$el.is( ":text" )) {
					//console.log($el);
					$el.focus();
				} else if($el.attr("type") == "search"){
					$el.focus();
				} else {
					$el.click();	
				}
			} else {
				$el.click();
			}
		}
	});
});