export default function updateNodeElement(
  newElement,
  virtualDOM,
  oldVirtualDOM = {}
) {
  // 获取新节点对应的属性对象
  const newProps = virtualDOM.props
  // 获取旧节点对应的属性对象
  const oldProps = oldVirtualDOM.props || {}

  // 循环属性
  Object.keys(newProps).forEach((propName) => {
    // 获取新旧DOM 属性值
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    // 不相等则更新属性
    if (newPropsValue !== oldPropsValue) {
      if (propName.slice(0, 2) === 'on') {
        // ⛵ 判断属性是否为事件属性: onClick -> click
        // 事件名称: onClick -> onclick -> click
        const eventName = propName.toLowerCase().slice(2)
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropsValue)

        // 删除原有的事件的事件处理函数
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue)
        }
      } else if (propName === 'value' || propName === 'checked') {
        // ⛵ 判断属性是否为 value || checked
        newElement[propName] = newPropsValue
      } else if (propName !== 'children') {
        // ⛵ 判断属性是样式属性
        if (propName === 'className') {
          newElement.setAttribute('class', newPropsValue)
        } else {
          // ⛵ 普通属性
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }
  })

  // 循环旧的props,判断属性被删除的情况
  Object.keys(oldProps).forEach((propName) => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName] // 旧的事件处理函数
    // 新元素没有, 旧元素有
    if (!newPropsValue) {
      // 属性被删除了
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLocaleLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })
}
