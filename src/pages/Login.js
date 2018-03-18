/**
 * 登录页
 */
import React from 'react';
// 引入antd组件
import { Icon, Form, Input, Button, message } from 'antd';
// 引入 封装后的fetch工具类
import { post } from '../utils/request';
// 引入样式表
import styles from '../styles/login-page.less';
// 引入 prop-types
import PropTypes from 'prop-types';

const FormItem = Form.Item;
 
class Login extends React.Component {
  // 构造器
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit (e) {
    // 通知 Web 浏览器不要执行与事件关联的默认动作
    e.preventDefault();
    // 表单验证
    this.props.form.validateFields((err, values) => {
      if(!err){
        // 发起请求
        post('http://localhost:8000/login', values)
          // 成功的回调
          .then((res) => {
            if(res){
              message.info('登录成功');
              // 页面跳转
              this.context.router.push('/');
            }else{
              message.info('登录失败,账号或密码错误');
            }
          });
      }
    });
  }
 
  render () {
    const { form } = this.props;
    // 验证规则
    const { getFieldDecorator } = form;
    return (
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <header className={styles.header}>
            ReactManager
          </header>

          <section className={styles.form}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('account',{
                  rules: [
                    {
                      required: true,
                      message: '请输入管理员帐号',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="text" prefix={<Icon type="user" />} />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password',{
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="password" prefix={<Icon type="lock" />} />
                )}
              </FormItem>

              <Button className={styles.btn} type="primary" htmlType="submit">登录</Button>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}
 
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
 
Login = Form.create()(Login);
 
export default Login;