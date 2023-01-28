import { createElement, render } from './lib/createElement'
const Didact = {
  createElement,
  render,
}
/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const element = (
  <div style='color:#f4bc00;' id='foo'>
    <h1 id='kk'>
      <div id='kk2'>hello world3</div>
    </h1>
    <div className='j3322'>text content</div>
  </div>
)
// console.log('element===>', element)
const container = document.getElementById('root')
Didact.render(element, container)
