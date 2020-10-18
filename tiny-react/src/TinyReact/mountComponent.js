import isFunction from './isFunction'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'

export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null
  let component = null
  // ❓ 判断是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    // 处理函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 处理类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
    // component从buildClassComponent绑定
    component = nextVirtualDOM.component
  }

  // 判断是否是组件嵌套
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    // 解析 普通 virtualDOM
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }

  // 组件挂载完成: 处理类组件的ref
  if (component) {
    component.componentDidMount()
    if (component.props && component.props.ref) {
      component.props.ref(component)
    }
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

  // 获取组件的实例对象: 传递给 mountNavtiveElement, 然后再使用 component的setDOM方法设置virtualDOM
  nextVirtualDOM.component = component
  return nextVirtualDOM
}
