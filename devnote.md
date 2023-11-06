# Development Notes

가끔식 해줄 일
* `npm update` : 의존성 업데이트 및 `package-lock.json` 갱신.


## Setup
1. git clone : `git clone git@github.com:exizt/webhotkey-js.git`
2. `npm install`
    - `node_modules` 생성 및 타입스크립트 환경 구성됨.
3. run `index.html`


## Build
* `npm run build` : tsc + npm run webpack
    * `tsc` : `src/*.ts` -> `src/*.js`
    * `npm run webpack` : `src/WebHotKey.js` -> `dist/*.min.js` (minifying)


## Versioning
- rules: `{major}.{minor}.{release_all_count}`
    - `major` : Major changes. No compatibility with previous versions at all.
    - `minor` : Minor code changes.
    - `release_all_count` : Updates or builds due to changes in dependencies, environment modifications, or cumulative counting. Just minor cumulative counting.


버전 변경 시 같이 작업할 사항
1. `package.json`에서 버전 변경




## Project Details
### dependencies configuration
```shell
$ npm install --save-dev typescript
$ npm install --save-dev webpack webpack-cli
```
- `typescript` : 타입스크립트 기능. `.ts` -> `.js`
- `webpack`, `webpack-cli` : 웹팩 및 웹팩 cli. `.js` -> `.min.js`


### config files
1. `tsconfig.json`설정. 
    - `npx tsc --init` 또는 파일을 복사해옴
2. `webpack.config.js` 복사 후 설정.