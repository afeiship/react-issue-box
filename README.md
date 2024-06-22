# react-issue-box
> Issue box for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-issue-box
```

## usage
1. import css
  ```scss
  @import "~@jswork/react-issue-box/dist/style.css";

  // or use sass
  @import "~@jswork/react-issue-box/dist/style.scss";
  ```
2. import js
  ```js
  import ReactIssueBox from '@jswork/react-issue-box';
  import '@jswork/react-issue-box/dist/style.scss';

  function App() {
    return (
      <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 transition-all">
        <div className="badge badge-warning absolute right-0 top-0 m-4">
          Build Time: {BUILD_TIME}
        </div>
        <h1>react-issue-box</h1>
        <div className="y-5">
          <ReactIssueBox className="wp-5 mx-auto" contentClassName="p-5">
            清晨醒来，打开窗帘，一抹慵懒的阳光照进来，暖暖的，柔柔的，时光瞬间变得温婉静美，打开音乐，沏一杯花茶，躺在床上，暖阳淼淼，茶香淡淡，音乐袅袅，闭上眼睛，嘴角轻轻上扬，算是对着光阴的镜子，和自己撒个娇。
          </ReactIssueBox>
          <ReactIssueBox hoverAble shadowAble className="wp-5 mx-auto" contentClassName="p-5">
            <h6 className="mb-2 font-bold">需要讨论，原因如下</h6>
            <ol className="ml-5 list-decimal text-sm">
              <li>我的选校，对应原来的建议书，但建议书需要 report_id/或者 report_id + batch_id; my-schools
                属于主菜单，确定要添加这种动态判断的逻辑?
              </li>
              <li>原来有不少地方跳转到建议书页面，返回逻辑是否应该加上?</li>
              <li>文件结构改动比较大，所以，暂时未动</li>
            </ol>
          </ReactIssueBox>
        </div>
      </div>
    );
  }

  export default App;
  ```

## preview
- https://afeiship.github.io/react-issue-box/

## license
Code released under [the MIT license](https://github.com/afeiship/react-issue-box/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-issue-box
[version-url]: https://npmjs.org/package/@jswork/react-issue-box

[license-image]: https://img.shields.io/npm/l/@jswork/react-issue-box
[license-url]: https://github.com/afeiship/react-issue-box/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-issue-box
[size-url]: https://github.com/afeiship/react-issue-box/blob/master/dist/react-issue-box.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-issue-box
[download-url]: https://www.npmjs.com/package/@jswork/react-issue-box
