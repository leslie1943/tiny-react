/**
 * 1.如果要删除的节点是文本节点 =====> 直接删除
 * 2.如果要删除的节点由组件生成 =====> 需要调用组件卸载生命周期函数
 * 3.如果要删除的节点包含了其他组件生成的节点 =====> 需要调用其他的组件的卸载生命周期函数
 * 4.如果要删除的节点身上由ref属性 =====> 还需要删除通过ref属性传递给组件的DOM节点对象
 * 5.如果要删除的节点身上有事件 =====> 需要删除事件对应的事件处理函数
 */
export default function unmountNode(node) {
  // 获取节点的 _virtualDOM对象
  const virtualDOM = node._virtualDOM
  // 1. 如果要删除的节点是文本节点 =====> 直接删除
  if (virtualDOM.type === 'text') {
    // 直接删除
    node.remove()
    // 阻止程序向下执行
    return
  }
  // 2.看下节点是否由组件生成
  let component = virtualDOM.component
  // 如果component存在,就说明节点是由组件生成
  if (component) {
    component.componentWillUnmount()
  }

  // 3.节点是否有ref属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }

  // 4. 节点的属性中是否有事件属性, 'on'
  Object.keys(virtualDOM.props).forEach((propName) => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLocaleLowerCase().slice(0, 2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })

  // 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }

  // 删除节点
  node.remove()
}
