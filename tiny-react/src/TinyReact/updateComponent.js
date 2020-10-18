import diff from './diff'

// oldComponent
export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
  // oldComponent 是 Component的子类,所以可以重写生命周期函数即可
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    // 未更新前的props
    let prevProps = oldComponent.props
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 组件更新
    // 更新props
    oldComponent.updateProps(virtualDOM.props)
    // 获取组件最新的virtualDOM
    let nextVirtualDOM = oldComponent.render()
    // 更新component组件实例对象(mountComponent中buildClassComponent也有此操作)
    nextVirtualDOM.component = oldComponent
    // 比对
    diff(nextVirtualDOM, container, oldDOM)
    oldComponent.componentDidUpdate(prevProps)
  }
}
