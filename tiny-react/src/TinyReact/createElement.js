export default function createElement(type, props, ...children) {
  const childElements = [].concat(...children).reduce((result, child) => {
    // 刨除布尔值节点,布尔值节点不应该显示
    if (child != false && child != true && child != null) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        // 处理文本节点
        result.push(
          createElement('text', {
            textContent: child,
          })
        )
      }
    }
    return result
  }, [])
  return {
    type,
    // 合并 children 给 props
    props: Object.assign({ children: childElements }, props),
    children: childElements,
  }
}
