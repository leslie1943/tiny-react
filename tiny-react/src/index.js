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

// TinyReact.render(VirtualDOM, root)

function Heart() {
  return <div>&hearts;</div>
}

TinyReact.render(<Heart />, root)
