import createDomElement from './createDomElement'
export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDomElement(virtualDOM)
  // 将转换之后的对象放置在页面中
  container.appendChild(newElement)
}
