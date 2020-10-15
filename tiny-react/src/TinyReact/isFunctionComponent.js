import isFunction from './isFunction'

// 判断是函数组件还是类组件的依据: 原型上是否有 render 方法
export default function isFunctionComponent(virtualDOM) {
  const type = virtualDOM.type
  return (
    type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
  )
}
