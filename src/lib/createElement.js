let drawCall = 0
export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  }
}

export function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

export function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type)
  Object.keys(fiber.props)
    .filter((key) => key !== 'children')
    .forEach((k) => (dom[k] = fiber.props[k]))
  return dom
}

function commitRoot() {
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}
function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
export function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  }
  nextUnitOfWork = wipRoot
}
let nextUnitOfWork = null,
  wipRoot = null,
  currentRoot = null
function performUnitOfWork(fiber) {
  // 1.add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  //防止渐进渲染
  // if (fiber.parent) {
  //   drawCall++
  //   console.log('drawcall====>', drawCall)
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }

  // 2.create new fibers
  const elements = fiber.props.children
  let index = 0,
    prevSibling = null

  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      dom: null,
      type: element.type,
      props: element.props,
      parent: fiber,
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
  // 3.return next unit of work
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
