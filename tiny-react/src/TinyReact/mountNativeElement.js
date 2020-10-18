import createDomElement from './createDomElement'
import unmountNode from './unmountNode'
export default function mountNativeElement(virtualDOM, container, oldDOM) {
  let newElement = createDomElement(virtualDOM)

  if (oldDOM) {
    // 处理比对更新
    container.insertBefore(newElement, oldDOM)
  } else {
    // 直接新增
    // 将转换之后的对象放置在页面中
    container.appendChild(newElement)
  }

  // 判断旧的DOM对象是否存在, 存在 => 删除
  if (oldDOM) {
    unmountNode(oldDOM)
  }

  // virtualDOM.component 是在 mountComponent 中 的 buildClassComponent 中设置的
  let component = virtualDOM.component
  if (component) {
    // 判断, 如果不是类组件
    component.setDOM(newElement)
  }
}
