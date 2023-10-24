# shortcutKeyEvent
> html의 'accesskey' 속성을 이용하면 되는데, 이걸 왜 만들었더라...? 기억이 안 남. 뭔가 부족한 게 있어서 만들었던 거 같기는 한데...


웹 사이트에서 단축키를 사용하기 위한 코드.

`shift` + `alt` + 영문자 로 단축키를 구성할 수 있다.

* Demo : https://exizt.github.io/jshotkey/


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