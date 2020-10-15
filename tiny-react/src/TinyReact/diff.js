/**
 * 💛💛 virtualDOM在比对时是【 深度优先 】,子节点对比优先于同级节点对比
 *          ul(1)
 *    li(2)     li(5)
 *    p(3)      p(4)
 */
import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDomElement from './createDomElement'
export default function diff(virtualDOM, container, oldDOM) {
  // 获取旧的virtualDOM
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (
    virtualDOM.type !== oldVirtualDOM.type &&
    typeof virtualDOM !== 'function'
  ) {
    // ⛵⛵ 类型不同且不为组件节点, 不需要对比, 直接替换
    // 根据新的 VirtualDOM 获取新的 DOM 元素
    const newElement = createDomElement(virtualDOM)
    // 替换: 旧DOM的父节点.replaceChild
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // ⛵⛵ 类型相同
    if (virtualDOM.type === 'text') {
      // 🧡🧡 文本节点 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 🧡🧡 元素节点 更新元素节点属性
      // oldDOM: 更新哪一个DOM
      // virtualDOM: 新的VirtualDOM
      // oldVirtualDOM: 旧的VirtualDOM
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 循环处理子节点, child 是新的 virtualDOM, conatiner是 oldDOM, oldDOM是循环到某个DOM对象
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })
  }
}
