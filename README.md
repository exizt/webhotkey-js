# WebHotKey JS
> The `accesskey` attribute in HTML allows for the use of keyboard shortcuts on websites by default. However, there is a difference in the shortcut key combinations between `Chrome (alt+key)` and `Firefox (alt+shift+key)`. The following script is designed to harmonize this discrepancy by setting a common behavior for both browsers, using `alt+shift+key` as the universal key combination.


You can configure keyboard shortcuts using `shift` + `alt` + `alphanumeric`.

- https://github.com/exizt/webhotkey-js


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


By default, keyboard connectivity is established with a tag that has the 'hotkey' attribute.
```html
<input hotkey="f" type="text" placeholder="search (alt+shift+f)">
```

### using CDN
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/exizt/webhotkey-js@main/dist/webhotkey.min.js"></script>
```


### Customize
#### Options
- `attributeName` : Reassign of key attribute name.
- `isDebug` : debugging option.



#### how to use
example
```html
<script type="module">
import webHotKey from '../dist/webhotkey.min.js';

webHotKey.setOptions({
    attributeName: "myAccessKey"
})
</script>
<input myAccessKey="f" type="text" placeholder="search (alt+shift+f)">
```



## License

MIT License