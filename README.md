# Accesskey JS
> html의 `accesskey` 속성값이 있으면, 기본적으로 웹사이트에서 단축키를 사용할 수 있으나, 크롬 브라우저(alt+key)와 파이어폭스(alt+shift+key)의 방식이 다르다. 이런 점을 하나로 조율하기 위한 스크립트이다. 공통적으로 'alt+shift+key'로 동작되게 변경해준다.

웹 사이트에서 단축키를 사용하기 위한 코드.

`shift` + `alt` + 영문자 로 단축키를 구성할 수 있다.



## Usage
스크립트를 로드
```html
<script src="./dist/shAccessKey.min.js"></script>
```

다음 코드를 추가
```html
<script>
let accessKey = new shAccessKey()
</script>
```

`class="site-shortcut-key-a"` 와 같이 클래스를 지정하면, 해당 링크를 실행하거나 click 이벤트를 실행함.

### CDN 사용
* https://cdn.jsdelivr.net/gh/exizt/jshotkey@master/dist/shAccessKey.min.js
* https://cdn.jsdelivr.net/gh/exizt/jshotkey@master/dist/shAccessKey.es5.min.js


### 옵션 변경
```js
let accessKey = new shAccessKey({"selectorPrefix": '.my-key-'})
```
와 같이 변경하면, 셀렉터의 prefix 옵션을 변경할 수 있음.



## License

MIT License