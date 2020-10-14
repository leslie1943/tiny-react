import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'
import isFunction from './isFunction'

export default function mountElement(virtualDOM, container) {
  // Component
  if (isFunction(virtualDOM)) {
    // console.info('I am component')
    mountComponent(virtualDOM, container)
  } else {
    // NativeElement(普通的virtualDOM)
    mountNativeElement(virtualDOM, container)
  }
}
