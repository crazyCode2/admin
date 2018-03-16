/**
 * 登录页
 */
import React from 'react';
// 页面布局组件
import HomeLayout from '../layouts/HomeLayout';
import FormItem from '../components/FormItem';
// 引入 封装后的fetch工具类
import { post } from '../utils/request';
// 表单验证组件
import formProvider from '../utils/formProvider';
// 引入 prop-types
import PropTypes from 'prop-types';
 
class Login extends React.Component {
  // 构造器
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit (e) {
    e.preventDefault();
 
    const {formValid, form: {account, password}} = this.props;
    if (!formValid) {
      alert('请输入账号或密码');
      return;
    }
 
    post('http://localhost:8000/login', {
      account: account.value,
      password: password.value
    })
      .then((res) => {
        if (res) {
          this.context.router.push('/');
        } else {
          alert('登录失败，账号或密码错误');
        }
      })
  }
 
  render () {
    const {form: {account, password}, onFormChange} = this.props;
    return (
      <HomeLayout title="请登录">
        <form onSubmit={this.handleSubmit}>
          <FormItem label="账号：" valid={account.valid} error={account.error}>
            <input type="text" value={account.value} onChange={e => onFormChange('account', e.target.value)}/>
          </FormItem>
          <FormItem label="密码：" valid={password.valid} error={password.error}>
            <input type="password" value={password.value} onChange={e => onFormChange('password', e.target.value)}/>
          </FormItem>
          <br/>
          <input type="submit" value="登录"/>
        </form>
      </HomeLayout>
    );
  }
}
 
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
 
Login = formProvider({
  account: {
    defaultValue: '',
    rules: [
      {
        pattern (value) {
          return value.length > 0;
        },
        error: '请输入账号'
      }
    ]
  },
  password: {
    defaultValue: '',
    rules: [
      {
        pattern (value) {
          return value.length > 0;
        },
        error: '请输入密码'
      }
    ]
  }
})(Login);
 
export default Login;