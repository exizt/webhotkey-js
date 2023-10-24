# WebHotKey JS
> html의 `accesskey` 속성값이 있으면, 기본적으로 웹사이트에서 단축키를 사용할 수 있으나, 크롬 브라우저(alt+key)와 파이어폭스(alt+shift+key)의 방식이 다르다. 이런 점을 하나로 조율하기 위한 스크립트이다. 공통적으로 'alt+shift+key'로 동작되게 변경해준다.

웹 사이트에서 단축키를 사용하기 위한 코드.

`shift` + `alt` + 영문자 로 단축키를 구성할 수 있다.



## Usage
### Setup
html
```html
<script type="module" src="./dist/webhotkey.min.js"></script>
```

or 


```html
<script type="module">
import webHotKey from '../dist/webhotkey.min.js';
</script>
```


기본값으로 'hotkey' 속성을 가진 태그로 키보드 연결을 한다.
```html
<input hotkey="f" type="text" style="width:250px" placeholder="search (alt+shift+f)">
```

### CDN 사용
* https://cdn.jsdelivr.net/gh/exizt/jshotkey@master/dist/shAccessKey.min.js
* https://cdn.jsdelivr.net/gh/exizt/jshotkey@master/dist/shAccessKey.es5.min.js


### Customize
#### Options
- `attributeName` : Reassign of key attribute name.
- `isDebug` : debugging option.



#### how to use
example
<script type="module">
import webHotKey from '../dist/webhotkey.min.js';

webHotKey.setOptions({
    attributeName: "myAccessKey"
})
</script>
태그 속성 이름을 변경 지정할 수 있다.


## License

MIT License