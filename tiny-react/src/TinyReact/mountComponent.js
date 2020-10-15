import isFunction from './isFunction'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'

export default function mountComponent(virtualDOM, container) {
  let nextVirtualDOM = null
  // ❓ 判断是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    // 处理函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 处理类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }

  // 判断是否是组件嵌套
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container)
  } else {
    // 解析 普通 virtualDOM
    mountNativeElement(nextVirtualDOM, container)
  }
}

// 获取函数组件的 virtualDOM 对象
function buildFunctionComponent(virtualDOM) {
  // 返回函数组件的virtualDOM, type本身就是一个函数, props在virtualDOM上,所以可以作为参数传递给type()函数
  return virtualDOM.type(virtualDOM.props || {})
}

// 获取类组件的 virtualDOM 对象
function buildClassComponent(virtualDOM) {
  // 组件的实例对象
  const component = new virtualDOM.type(virtualDOM.props || {})
  // 获取 virtualDOM
  const nextVirtualDOM = component.render()
  return nextVirtualDOM
}
