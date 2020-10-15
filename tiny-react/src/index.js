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
    <span>这是一段被修改过的内容</span>
    <button onClick={() => alert('HELLO!!!!')}>点击我!</button>
    <h6>这个将会被删除</h6>
    2,3
    <input type="text" value="13" />
  </div>
)

TinyReact.render(VirtualDOM, root)
setTimeout(() => {
  TinyReact.render(modifyDOM, root)
}, 2000)

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
     *
     */
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
      </div>
    )
  }
}

// TinyReact.render(<Alert name="leslie" age={20} />, root)
