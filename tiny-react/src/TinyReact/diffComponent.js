import mountElement from './mountElement'
import updateComponent from './updateComponent'
/**
 * 参数1: 组件本身的VirtualDOM对象,通过它可以获取到组件最新的props
 * 参数2: 要更新的组件的实例对象,通过它可以调用组件的生命周期函数,
 *        可以更新组件的props,
 *        可以通过render方法获取到组件返回的最新的VirtualDOM
 * 参数3: 要更新的DOM对象,在更新组件时, 需要在已有的DOM对象的身上进行修改,实现DOM最小化操作,获取旧的VirtualDOM对象
 * 参数4: 如果要更新的组件和旧组件不是同一个组件,要直接将组件返回的 VirtualDOM显示在页面中, 此时需要container作为父级容器
 */
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 同一个组件, 做组件更新操作
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不是同一个组件,组件替换
    mountElement(virtualDOM, container, oldDOM)
  }
}

// 判断是否是同一个组件
function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
