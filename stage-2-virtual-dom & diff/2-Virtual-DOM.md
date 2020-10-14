#### 真实DOM 操作问题
- `真实DOM`的更新远远超过其必须进行的更新, 因为`真实DOM`中的属性多达几百个.

#### 什么是Virtual DOM
- `Virtual DOM`就是`JavaScript`对象, 用 `JavaScript`对象 描述`真实DOM`信息(属性,子节点)
- `Virtual DOM`可以理解成DOM对象的副本

#### Virtual DOM 如何提升效率
- 精准找出发生变化的DOM对象, 只更新发生变化的部分
- 在 `React` 第一次 创建 `DOM` 对象后, 会为每个 `DOM` 对象创建其对应的 `Virtual DOM` 对象, 在DOM对象发生更新之前,`React` 会先更新所有的`Virtual DOM` 对象, 然后 `React`会将更新后的 `Virtual DOM` 对象 和 更新前的 `Virtual DOM` 进行比较, 从而找出发生变化的部分, `React` 会将发生变化的部分更新到真实的 DOM 对象中. `React`仅更新必要更新的部分, 不会重新渲染整个 `DOM Tree`
- `Virtual DOM` 对象的更正和比较发生在内存中，不会在视图中渲染任何内容，所以这一部分的性能损耗成本是微不足道的.