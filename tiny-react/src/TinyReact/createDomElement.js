import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDomElement(virtualDOM) {
  let newElement = null
  // 最外层节点
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    updateNodeElement(newElement, virtualDOM)
  }

  // 给元素节点添加对应的virtualDOM
  newElement._virtualDOM = virtualDOM

  // 递归创建子节点
  virtualDOM.children.forEach((child) => {
    mountElement(child, newElement)
  })

  // 如果有props 并且 props.ref
  // ref: 就是绑定的DOM实例对象(native和component都是)
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }

  return newElement
}
