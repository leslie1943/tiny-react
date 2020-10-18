import diff from './diff'

export default class Component {
  constructor(props) {
    this.props = props
  }
  setState(state) {
    // 由于方法是子类调用的,所以当前的this指向子类的实例对象
    // 第二个参数: 子类原有的state
    // 第三个参数: 新的state
    this.state = Object.assign({}, this.state, state)
    // 获取最新要渲染的 VirtualDOM 对象
    let virtualDOM = this.render()
    // ⛵⛵ 获取旧的 VirtuaDOM 对象(在mountNavtiveComponent产生的这个对象) 进行比对
    /**
     * getDOM的说明
     * mountComponent.js => nextVirtualDOM.component = component
     * mountNavtiveComponent.js => virtualDOM.component.setDOM()
     */
    let oldDOM = this.getDOM()
    // 获取容器
    let container = oldDOM.parentNode
    // 实现对比
    diff(virtualDOM, container, oldDOM)
  }

  // 保存到类的实例对象当中
  setDOM(dom) {
    this._dom = dom
  }

  getDOM() {
    return this._dom
  }

  updateProps(props) {
    this.props = props
  }
  // 生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}
}
