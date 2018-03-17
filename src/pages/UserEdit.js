/**
 * 编辑用户页面
 */
import React from 'react';
// 引入 prop-types
import PropTypes from 'prop-types';
// 用户编辑器组件
import UserEditor from '../components/UserEditor';
// 引入 封装fetch工具类
import { get } from '../utils/request'; 

class UserEdit extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {
      user: null
    };
  }

  // 生命周期--组件加载中
  componentWillMount(){
    // 定义常量
    const userId = this.context.router.params.id;
    /**
     * 发送请求
     * 获取用户数据
     */
    get('http://localhost:8000/user/' + userId)
    .then((res) => {
      // 设置状态
      this.setState({
        user: res
      });
    })
  }

  render() {
    const {user} = this.state;
    return user ? <UserEditor editTarget={user} /> : <span>加载中...</span>;
  }
}

UserEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UserEdit;