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

export function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)
  Object.keys(element.props)
    .filter((key) => key !== 'children')
    .forEach((k) => (dom[k] = element.props[k]))
  element.props.children.forEach((child) => render(child, dom))
  //如果直接append会出现大量appendChild操作
  drawCall++
  console.log('drawCall==>', drawCall)
  container.appendChild(dom)
}
