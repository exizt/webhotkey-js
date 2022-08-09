# 개발 관련 노트

가끔식 해줄 일
* `npm update`


# 빌드
esnext 버전
* `npm run build` : js 생성 + legacy.js 생성
  * `npm run webpack` : ts -> js
  * `npm run webpack.legacy` : legacy.ts -> legacy.js


# 버저닝
1. major : 대대적 변경.
2. minor : ts 코드에 사소한 변경.
3. build : 의존성 변경, 환경 변경으로 인한 업데이트. 또는 빌드.



버전 변경 시 같이 작업할 사항
1. package.json 에서 버전 변경
2. ts 코드 상단에서 버전 변경


# 프로젝트 셋팅
1. `npm install` : `node_modules` 생성됨.


# 프로젝트 구성 과정에서의 히스토리
1. npm 셋팅
    ```shell
    npm install --save-dev typescript
    npm install --save-dev webpack webpack-cli ts-loader
    ```

2. `tsconfig.json`설정. 
    - `npx tsc --init` 또는 파일을 복사해옴

3. `webpack.config.js` 복사 후 설정.