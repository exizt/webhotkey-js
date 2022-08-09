# shortcutKeyEvent
웹 사이트에서 단축키를 사용하기 위한 코드.

`shift` + `alt` + 영문자 로 단축키를 구성할 수 있다.

'accesskey' 속성값이 있었네... 거의 동일한 기능에 가까움..


# 라이선스

MIT License


# 사용법
## 최신 브라우저
스크립트를 로드
```html
<script src="./dist/shAccessKey.min.js"></script>
```

다음 코드를 추가
```html
<script>
let shhotkey = new shAccessKey()
</script>
```

`class="site-shortcut-key-a"` 와 같이 클래스를 지정하면, 해당 링크를 실행하거나 click 이벤트를 실행함.

## IE11 등을 지원하려면 (ES5)
스크립트를 로드
```html
<script src="./dist/shAccessKey.es5.min.js"></script>
```

다음 코드를 추가
```html
<script>
var shhotkey = new shAccessKey()
</script>
```

## CDN 사용
* https://cdn.jsdelivr.net/gh/exizt/jshotkey@master/dist/shAccessKey.min.js
* https://cdn.jsdelivr.net/gh/exizt/jshotkey@master/dist/shAccessKey.es5.min.js


## 옵션 변경
```js
let shhotkey = new shAccessKey({"selectorPrefix": '.my-key-'})
```
와 같이 변경하면, 셀렉터의 prefix 옵션을 변경할 수 있음.


# 데모

https://exizt.github.io/jshotkey/


# 브라우저 지원
* shAccessKey(.min).js - ie11 미지원 버전. 최신 스크립트.
* shAccessKey.es5(.min).js - ie11 지원 버전. es5로 빌드됨.

ie10, ie9 는 확인되지 않음