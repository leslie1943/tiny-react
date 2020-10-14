#### 创建 Virtual DOM
- 1. html 定义 根节点
- 2. 定义 开放给框架外部的 `createElemenet` 函数, 将 `JSX` 转换成 `VirtualDOM`
- 3. 定义 开放给框架外部的 `render` 函数: `VirtualDOM对象` 转换成 `真实DOM对象`
- 4. `render(virtualDOM, container, oldDOM)` -> `diff(virtualDOM, container, oldDOM)` -> `mountElement(virtualDOM, container)` -> `mountNativeElement(virtualDOM, container)` -> `createDomElement(VirtualDOM)`
- 5. `createDomElement` 创建节点( `newElement` ),  vituralDOM的children 递归调用 `mountElement()` . 将创建好的 `newElement` 返回给`mountNativeElement` ,然后append到 `container` 中

#### 函数组件
- 组件的 `VirtualDOM`类型值为函数,函数组件合类组件都是这样的.
```jsx
// 原始组件
const Heart = () => <span>&hearts;</span>
// 调用
<Heart />
// 转换后
{
    type: f function(){}, // 类型为函数
    props:{},
    children: []
}
```