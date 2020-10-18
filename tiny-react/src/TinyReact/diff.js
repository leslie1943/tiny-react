/**
 * 💛💛 virtualDOM在比对时是【 深度优先 】,子节点对比优先于同级节点对比
 *          ul(1)
 *    li(2)     li(5)
 *    p(3)      p(4)
 */
import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDomElement from './createDomElement'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'
export default function diff(virtualDOM, container, oldDOM) {
  // 获取旧的virtualDOM
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 判断 oldDOM 是否存在
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component // buildClassComponent挂载的这个属性
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // ⛵⛵ 类型不同且不为组件节点, 不需要对比, 直接替换
    // 根据新的 VirtualDOM 获取新的 DOM 元素
    const newElement = createDomElement(virtualDOM)
    // 替换: 旧DOM的父节点.replaceChild
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (typeof virtualDOM.type === 'function') {
    // ⛵⛵ 更新的是组件
    /**
     * 参数1: 组件本身的VirtualDOM对象,通过它可以获取到组件最新的props
     * 参数2: 要更新的组件的实例对象,通过它可以调用组件的生命周期函数,
     *        可以更新组件的props,
     *        可以通过render方法获取到组件返回的最新的VirtualDOM
     * 参数3: 要更新的DOM对象,在更新组件时, 需要在已有的DOM对象的身上进行修改,实现DOM最小化操作,获取旧的VirtualDOM对象
     * 参数4: 如果要更新的组件和旧组件不是同一个组件,要直接将组件返回的 VirtualDOM显示在页面中, 此时需要container作为父级容器
     */
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // ⛵⛵ 类型相同
    if (virtualDOM.type === 'text') {
      // 🧡🧡 文本节点 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 🧡🧡 元素节点 更新元素节点属性
      // oldDOM: 更新哪一个DOM
      // virtualDOM: 新的VirtualDOM
      // oldVirtualDOM: 旧的VirtualDOM
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 1. 将拥有key属性的子元素放置在一个单独的对象中.
    let keyElements = {}
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      // 获取当前的子节点
      let domElement = oldDOM.childNodes[i]
      // 元素节点
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute('key')
        if (domElement.key) {
          keyElements[key] = domElement
        }
      }
    }

    // ⛵⛵ 是否有带key的子元素
    let hasNoKey = Object.keys(keyElements).length === 0
    if (hasNoKey) {
      // ⛵⛵ 通过索引对比
      // 循环处理子节点, child 是新的 virtualDOM, conatiner是 oldDOM, oldDOM是循环到某个DOM对象
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    } else {
      // ⛵⛵ 通过key去对比
      // 2. 循环要渲染的virtualDOM的子元素,获取子元素的key属性
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key) {
          let domElement = keyElements[key]
          if (domElement) {
            // 3. 判断当前位置的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] != domElement) {
              // 给元素调换位置
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          }
        } else {
          // 没有在之前的元素中找到 ==> 新增方法
          mountElement(child, oldDOM, oldDOM.childNodes[i])
        }
      })
    }

    // ⛵⛵⛵⛵ 删除节点 ⛵⛵⛵⛵
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes
    // 旧节点的子节点数量 大于 新的VirtualDOM的children 节点个数 ==> 执行删除多余节点的操作.
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 💛💛 通过索引删除
        for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 💛💛 通过key属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i] // 旧节点对象
          let oldChildKey = oldChild._virtualDOM.props.key
          // 在新的Virtual DOM中找oldChildKey对应的节点
          let found = false
          for (let n = 0; n < virtualDOM.children.length; i++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true
              break
            }
          }
          // 需要删掉此节点
          if (!found) {
            unmountNode(oldChild)
          }
        }
      }
    }
  }
}

/**
 * <ul>(old)          <ul>
 *  <li>1</li>          <li>1</li>
 *  <li>2</li> <-----   <li>3</li>
 *  <li>3</li> <-----   <li>4</li>
 *  <li>4</li>(被删除)
 * </ul>              </ul>
 *
 *  执行过程:
 *      old      =>    new
 *    <li>1</li> => <li>1</li>
 *    <li>2</li> => <li>3</li>
 *    <li>3</li> => <li>4</li>
 *    <li>4</li> => 删除
 */

/**
 * key: 减少DOM操作,复用不需要更新的节点
 * 1. 将拥有key属性的子元素放置在一个单独的对象中 => oldDOM.childNodes.length
 * 2. hasNoKey(没有带key的子元素)索引对比
 * 3. hasKey: 使用Key对比，当前位置不是正确的, 不是的话insertBefore插入当前节点之前
 */
