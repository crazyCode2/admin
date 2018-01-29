import Nerv from 'nervjs'
// import { Component, createElement } from 'nervjs'
 
class Hello extends Nerv.Component {
  // 构造器
  constructor () {
    super(...arguments)
    this.state = {
      message: '世界'
    }
  }
  
  // 渲染
  render () {
    return (
      <div>
        Hello, {this.state.message}
      </div>
    )
  }
}
 
export default Hello