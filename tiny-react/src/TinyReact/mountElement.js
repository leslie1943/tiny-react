import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'
import isFunction from './isFunction'

export default function mountElement(virtualDOM, container) {
  // Component
  if (isFunction(virtualDOM)) {
    mountComponent(virtualDOM, container)
  } else {
    // NativeElement(普通的virtualDOM)
    mountNativeElement(virtualDOM, container)
  }
}
