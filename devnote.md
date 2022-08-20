# 개발 관련 노트

가끔식 해줄 일
* `npm update`


# 빌드
* `npm run build` : js 생성 + legacy.js 생성
    * `npm run webpack` : ts -> js (with minify)
    * `npm run webpack.legacy` : ts -> legacy.js (with minify)


# 버저닝
1. major : 대대적 변경.
2. minor : ts 코드에 사소한 변경.
3. build : (누적 카운팅) 의존성 변경, 환경 변경으로 인한 업데이트. 또는 빌드.



버전 변경 시 같이 작업할 사항
1. package.json 에서 버전 변경
2. ts 코드 상단에서 버전 변경


# 프로젝트 셋팅
1. `npm install` : `node_modules` 생성 및 타입스크립트 환경 구성됨.


# 프로젝트 구성 과정에서의 히스토리
## npm 셋팅
```console
$ npm install --save-dev typescript
$ npm install --save-dev webpack webpack-cli ts-loader
```
- `typescript` : 타입스크립트 기능
- `webpack`, `webpack-cli` : 웹팩 및 웹팩 cli
- `ts-loader` : 웹팩에서 typescript를 로드하는 웹팩 로더


## 설정 파일
1. `tsconfig.json`설정. 
    - `npx tsc --init` 또는 파일을 복사해옴
2. `webpack.config.js` 복사 후 설정.