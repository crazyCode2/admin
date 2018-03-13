/**
 * 图书编辑器组件
 */
import React from 'react';
import FormItem from '../components/FormItem'; // 或写成 ./FormItem
// 高阶组件 formProvider表单验证
import formProvider from '../utils/formProvider';
// 引入 prop-types
import PropTypes from 'prop-types';

class BookEditor extends React.Component {
  // 按钮提交事件
  handleSubmit(e){
    // 阻止表单submit事件自动跳转页面的动作
    e.preventDefault();
    // 定义常量
    const { form: { name, price }, formValid, editTarget} = this.props; // 组件传值
    // 验证
    if(!formValid){
      alert('请填写正确的信息后重试');
      return;
    }

    // 默认值
    let editType = '添加';
    let apiUrl = 'http://localhost:8000/book';
    let method = 'post';
    // 判断类型
    if(editTarget){
      editType = '编辑';
      apiUrl += '/' + editTarget.id;
      method = 'put';
    }

    // 发送请求
    fetch(apiUrl, {
      method, // method: method 的简写
      // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
      body: JSON.stringify({
        name: name.value,
        price: price.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // 强制回调的数据格式为json
    .then((res) => res.json())
    // 成功的回调
    .then((res) => {
      // 当添加成功时,返回的json对象中应包含一个有效的id字段
      // 所以可以使用res.id来判断添加是否成功
      if(res.id){
        alert(editType + '添加图书成功!');
        this.context.router.push('/book/list'); // 跳转到用户列表页面
        return;
      }else{
        alert(editType + '添加图书失败!');
      }
    })
    // 失败的回调
    .catch((err) => console.error(err));
  }

  // 生命周期--组件加载中
  componentWillMount(){
    const {editTarget, setFormValues} = this.props;
    if(editTarget){
      setFormValues(editTarget);
    }
  }
  
  render() {
    // 定义常量
    const {form: {name, price}, onFormChange} = this.props;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormItem label="图书名称:" valid={name.valid} error={name.error}>
          <input
            type="text"
            value={name.value}
            onChange={(e) => onFormChange('name', e.target.value)}/>
        </FormItem>

        <FormItem label="价格:" valid={price.valid} error={price.error}>
          <input
            type="number"
            value={price.value || ''}
            onChange={(e) => onFormChange('price', e.target.value)}/>
        </FormItem>
        <br />
        <input type="submit" value="提交" />
      </form>
    );
  }
}

// 必须给BookEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
BookEditor.contextTypes = {
  router: PropTypes.object.isRequired
};

// 实例化
BookEditor = formProvider({ // field 对象
  // 姓名
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入图书户名'
      },
      {
        pattern: /^.{1,10}$/,
        error: '图书名最多10个字符'
      }
    ]
  },
  // 价格
  price: {
    defaultValue: 0,
    rules: [
      {
        pattern: function(value){
          return value > 0;
        },
        error: '价格必须大于0'
      }
    ]
  }
})(BookEditor);

export default BookEditor;