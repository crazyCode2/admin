/**
 * 自动完成组件
 */
import React from 'react';
// 引入 antd 组件
import { Input } from 'antd';
// 引入 prop-types
import PropTypes from 'prop-types';
// 引入样式
import styles from '../styles/auto-complete.less';

// 获得当前元素value值
function getItemValue (item) {
  return item.value || item;
}

class AutoComplete extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {
      show: false, // 新增的下拉框显示控制开关
      displayValue: '',
      activeItemIndex: -1
    };

    // 对上下键、回车键进行监听处理
    this.handleKeyDown = this.handleKeyDown.bind(this);
    // 对鼠标移出进行监听处理
    this.handleLeave = this.handleLeave.bind(this);
  }

  // 处理输入框改变事件
  handleChange(value){
    // 选择列表项的时候重置内部状态
    this.setState({
      activeItemIndex: -1,
      displayValue: ''
    });
    /**
     * 通过回调将新的值传递给组件使用者
     * 原来的onValueChange改为了onChange以适配antd的getFieldDecorator
     */
    this.props.onChange(value);
  }

  // 处理上下键、回车键点击事件
  handleKeyDown(e){
    const {activeItemIndex} = this.state;
    const {options} = this.props;

    /**
     * 判断键码
     */
    switch (e.keyCode) {
      // 13为回车键的键码(keyCode)
      case 13: {
        // 判断是否有列表项处于选中状态
        if(activeItemIndex >= 0){
          // 防止按下回车键后自动提交表单
          e.preventDefault();
          e.stopPropagation();
          // 输入框改变事件
          this.handleChange(getItemValue(options[activeItemIndex]));
        }
        break;
      }
      // 38为上方向键,40为下方向键
      case 38:
      case 40: {
        e.preventDefault();
        // 使用moveItem方法对更新或取消选中项
        this.moveItem(e.keyCode === 38 ? 'up' : 'down');
        break;
      }
      default: {
        //
      }
    }
  }

  // 使用moveItem方法对更新或取消选中项
  moveItem(direction){
    const {activeItemIndex} = this.state;
    const {options} = this.props;
    const lastIndex = options.length - 1;
    let newIndex = -1;

    // 计算新的activeItemIndex
    if(direction === 'up'){ // 点击上方向键
      if(activeItemIndex === -1){
        // 如果没有选中项则选择最后一项
        newIndex = lastIndex;
      }else{
        newIndex = activeItemIndex - 1;
      }
    }else{ // 点击下方向键
      if(activeItemIndex < lastIndex){
        newIndex = activeItemIndex + 1;
      }
    }

    // 获取新的displayValue
    let newDisplayValue = '';
    if(newIndex >= 0){
      newDisplayValue = getItemValue(options[newIndex]);
    }

    // 更新状态
    this.setState({
      displayValue: newDisplayValue,
      activeItemIndex: newIndex
    });
  }

  // 处理鼠标移入事件
  handleEnter(index){
    const currentItem = this.props.options[index];
    this.setState({
      activeItemIndex: index,
      displayValue: getItemValue(currentItem)
    });
  }

  // 处理鼠标移出事件
  handleLeave(){
    this.setState({
      activeItemIndex: -1,
      displayValue: ''
    });
  }

  // 渲染
  render() {
    const {show, displayValue, activeItemIndex} = this.state;
    // 组件传值
    const {value, options} = this.props;
    return (
      <div className={styles.wrapper}>
        <Input
          value={displayValue || value}
          onChange={e => this.handleChange(e.target.value)}
          onKeyDown={this.handleKeyDown}
          onFocus={() => this.setState({show: true})}
          onBlur={() => this.setState({show: false})}
        />
        {show && options.length > 0 && (
          <ul className={styles.options} onMouseLeave={this.handleLeave}>
            {
              options.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={index === activeItemIndex ? styles.active : ''}
                    onMouseEnter={() => this.handleEnter(index)}
                    onClick={() => this.handleChange(getItemValue(item))}
                  >
                    {item.text || item}
                  </li>
                );
              })
            }
          </ul>
        )}
      </div>
    );
  }
}

/**
 * 由于使用了antd的form.getFieldDecorator来包装组件
 * 这里取消了原来props的isRequired约束以防止报错
 */
AutoComplete.propTypes = {
  value: PropTypes.any, // 任意类型
  options: PropTypes.array, // 数组
  onChange: PropTypes.func // 函数
};

// 向外暴露
export default AutoComplete;