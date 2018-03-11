// FormItem组件
import React from 'react';

class FormItem extends React.Component {
  render() {
    // 组件传值
    const { label, children, valid, error } = this.props;
    return (
      <div>
        <label>{label}</label>
        {children}
        {!valid && <span>{error}</span>}
      </div>
    );
  }
}

export default FormItem;