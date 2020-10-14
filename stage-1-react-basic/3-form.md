## 4 表单 

#### ⛵ 4.1 受控表单
- 表单控件中的值由组件的`state`对象来管理, `state`对象中存储的值和表单控件中的值是同步状态的
```jsx
class App extends Component {
    constructor(){
        this.state = {username: ''}
        this.nameChanged = this.nameChanged.bind(this)
    }

    nameChanged(e){
        this.setState({
            username: e.target.value
        })
    }

    render(){
        return(
            <form>
                <p>{this.state.username}</p>
                <input type="text" value={this.state.username}  onChange={this.nameChanged} />
            </form>
        )
    }
}
```

#### ⛵ 4.2 非受控表单
- 表单元素的值由 `DOM` 元素本身管理
```jsx
class App extends Component {
    constructor(){
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        console.info(this.username.value)
        e.preventDefault()
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                {/* 给表单元素添加 ref 属性, */}
                 {/* ref 指定成一个函数,函数的参数 username 就是当前的DOM对象 */} 
                {/* this.username 是给当前实例创建一个属性, 值就是当前参数的DOM对象 */} 
                <input type="text" ref={username => this.username = username}  />
            </form>
        )
    }
}
```