import TinyReact from './TinyReact'
const root = document.getElementById('root')

const VirtualDOM = (
  <div className="container">
    <h1>Hello Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div className="nested">
      嵌套1<div>嵌套1.1</div>
      <div> 嵌套1.1.1 </div>
      <div> 嵌套1.1.2 </div>
      <div> 嵌套1.1.3 </div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>一段内容</span>
    <button onClick={() => alert('HELLO')}>点击我</button>
    <h3>这个将会被删除</h3>
    2,3
    <input type="text" value="13" />
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>Hello Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div className="nested">
      嵌套1<div>嵌套1.1</div>
      <div> 嵌套1.1.1 </div>
      <div> 嵌套1.1.2 </div>
      <div> 嵌套1.1.3 </div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <button onClick={() => alert('HELLO!!!!')}>点击我!</button>
    2,3
    <input type="text" value="13" />
  </div>
)

// TinyReact.render(VirtualDOM, root)
// setTimeout(() => {
//   TinyReact.render(modifyDOM, root)
// }, 2000)

function Hello() {
  return <div>Hello</div>
}

function Heart(props) {
  return (
    <div>
      &hearts;
      {props.title}
      <Hello />
    </div>
  )
}

class Alert extends TinyReact.Component {
  constructor(props) {
    /**
     * 通过 super(props)方法将props传递给父类
     * 子类继承父类,子类也有 props 的属性
     * 在实例化子类的时候, 给构造函数传递了参数 => 子类就有了参数
     */
    super(props)
    this.state = {
      title: 'Default Title',
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({ title: 'Changed Title' })
  }
  componentWillReceiveProps(nextProps) {
    console.info('componentWillReceiveProps')
    console.info(nextProps)
  }
  componentWillUpdate() {
    console.info('componentWillUpdate')
  }
  componentDidUpdate() {
    console.info('componentDidUpdate')
  }
  render() {
    // console.info(this.state)
    return (
      <div>
        {this.props.name}
        {this.props.age}
        <div>{this.state.title}</div>
        <button onClick={this.handleClick}>Change title</button>
      </div>
    )
  }
}

// TinyReact.render(<Alert name="leslie" age={20} />, root)

// setTimeout(() => {
//   // TinyReact.render(VirtualDOM, root)
//   TinyReact.render(<Alert name="dora" age={18} />, root)
//   // TinyReact.render(<Heart title="我是heart组件" />, root)
// }, 2000)

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.info(this.input.value)
    console.info(this.alert)
  }
  componentDidMount() {
    console.info('componentDidMount')
  }
  componentWillUnmount() {
    console.info('componentWillUnmount')
  }

  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <button onClick={this.handleClick}>Button</button>
        <div>
          <Alert ref={(alert) => (this.alert = alert)} name="leslie" age={20} />
        </div>
      </div>
    )
  }
}

class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { id: 1, name: 'name1' },
        { id: 2, name: 'name2' },
        { id: 3, name: 'name3' },
        { id: 4, name: 'name4' },
      ],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.persons.push(newState.persons.shift())
    // newState.persons.splice(1, 0, { id: 100, name: 'dora' })
    newState.persons.pop()
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map((person) => (
            <li key={person.id}>
              {person.name} <DemoRef />
            </li>
          ))}
        </ul>
        <button onClick={this.handleClick}>Button</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, root)
