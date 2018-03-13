/**
 * 自动完成组件
 */
import React from 'react';
// 引入 prop-types
import PropTypes from 'prop-types';

class AutoComplete extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {
      displayValue: '',
      activeItemIndex: -1
    };
  }

  // 渲染
  render() {
    const {displayValue, activeItemIndex} = this.state;
    // 组件传值
    const {value, options} = this.props;
    return (
      <div>
        <input value={value} />
        {options.length > 0 && (
          <ul>
            {
              options.map((item, index) => {
                return (
                  <li key={index}>
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

// 通用组件最好写一下propTypes约束
AutoComplete.propTypes = {
  value: PropTypes.string.isRequired, // 字符串
  options: PropTypes.array.isRequired, // 数组
  onValueChange: PropTypes.func.isRequired // 函数
};

// 向外暴露
export default AutoComplete;