#### JSX
- `jsx` 是 `React.createElement` 的语法糖

```html
<!-- JSX -->
<div className="app">
  <div class="title"> I am Title </div>
  <div class="content"> I am content </div>
</div>
```

- `convert to below codes`
```js
// React.createElement
"use strict";

/*#__PURE__*/
React.createElement("div", {
  className: "app"
}, /*#__PURE__*/React.createElement("div", {
  class: "title"
}, " I am Title "), /*#__PURE__*/React.createElement("div", {
  class: "content"
}, " 
```
- `React.createElement()`返回值就是`Virtual DOM`
- 1. 我们写的 `JSX` 先被 `Babel` 转换为 `React.createElement()` 的调用, 
- 2. 调用后会返回 `ReactElement`类型的 `Virtual DOM`对象, 
- 3. 然后 `React`再将`Virtual DOM` 对象转换成 `真实DOM`
- 4. 再将 `真实DOM` 对象显示在页面上