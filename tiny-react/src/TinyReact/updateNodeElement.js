export default function updateNodeElement(newElement, virtualDOM) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props

  Object.keys(newProps).forEach((propName) => {
    // 获取属性值
    const newPropsValue = newProps[propName]
    // ⛵ 判断属性是否为事件属性: onClick -> click
    if (propName.slice(0, 2) === 'on') {
      // 事件名称: onClick -> onclick -> click
      const eventName = propName.toLowerCase().slice(2)
      // 为元素添加事件
      newElement.addEventListener(eventName, newPropsValue)
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
  })
}
