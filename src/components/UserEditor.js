/**
 * 用户编辑器组件
 */
import React from 'react';
import FormItem from '../components/FormItem'; // 或写成 ./FormItem
// 高阶组件 formProvider表单验证
import formProvider from '../utils/formProvider';
// 引入 prop-types
import PropTypes from 'prop-types';
// 引入 封装fetch工具类
import request from '../utils/request'; 

class UserEditor extends React.Component {
  // 按钮提交事件
  handleSubmit(e){
    // 阻止表单submit事件自动跳转页面的动作
    e.preventDefault();
    // 定义常量
    const { form: { name, age, gender }, formValid, editTarget} = this.props; // 组件传值
    // 验证
    if(!formValid){
      alert('请填写正确的信息后重试');
      return;
    }

    // 默认值
    let editType = '添加';
    let apiUrl = 'http://localhost:8000/user';
    let method = 'post';
    // 判断类型
    if(editTarget){
      editType = '编辑';
      apiUrl += '/' + editTarget.id;
      method = 'put';
    }

    // 发送请求
    request(method,apiUrl, {
      name: name.value,
      age: age.value,
      gender: gender.value
    })
    // 成功的回调
    .then((res) => {
      // 当添加成功时,返回的json对象中应包含一个有效的id字段
      // 所以可以使用res.id来判断添加是否成功
      if(res.id){
        alert(editType + '添加用户成功!');
        this.context.router.push('/user/list'); // 跳转到用户列表页面
        return;
      }else{
        alert(editType + '添加用户失败!');
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
    const {form: {name, age, gender}, onFormChange} = this.props;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormItem label="用户名:" valid={name.valid} error={name.error}>
          <input
            type="text"
            value={name.value}
            onChange={(e) => onFormChange('name', e.target.value)}/>
        </FormItem>

        <FormItem label="年龄:" valid={age.valid} error={age.error}>
          <input
            type="number"
            value={age.value || ''}
            onChange={(e) => onFormChange('age', e.target.value)}/>
        </FormItem>

        <FormItem label="性别:" valid={gender.valid} error={gender.error}>
          <select
            value={gender.value}
            onChange={(e) => onFormChange('gender', e.target.value)}>
            <option value="">请选择</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </FormItem>
        <br />
        <input type="submit" value="提交" />
      </form>
    );
  }
}

// 必须给UserEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes = {
  router: PropTypes.object.isRequired
};

// 实例化
UserEditor = formProvider({ // field 对象
  // 姓名
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入用户名'
      },
      {
        pattern: /^.{1,4}$/,
        error: '用户名最多4个字符'
      }
    ]
  },
  // 年龄
  age: {
    defaultValue: 0,
    rules: [
      {
        pattern: function(value){
          return value >= 1 && value <= 100;
        },
        error: '请输入1~100的年龄'
      }
    ]
  },
  // 性别
  gender: {
    defaultValue: '',
    rules: [
      {
        pattern: function(value) {
          return !!value;
        },
        error: '请选择性别'
      }
    ]
  }
})(UserEditor);

export default UserEditor;