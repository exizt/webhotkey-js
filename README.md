# shortcutKeyEvent
웹 사이트에서 단축키를 사용하기 위한 코드.

`shift` + `alt` + 영문자 로 단축키를 구성할 수 있다.


# 라이선스

MIT License


# 사용법
스크립트를 로드한 후. 
```html
<script src="./dist/shAccessKey.min.js"></script>
<script>
let shhotkey = new shAccessKey()
</script>
```

`class="site-shortcut-key-a"` 와 같이 클래스를 지정하면, 해당 링크를 실행하거나 click 이벤트를 실행함.

## CDN
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

