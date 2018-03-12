/**
 * 编辑用户页面
 */
import React from 'react';
// 布局组件
import HomeLayout from '../layouts/HomeLayout';
// 引入 prop-types
import PropTypes from 'prop-types';
// 编辑组件
import UserEditor from '../components/UserEditor';

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
    fetch('http://localhost:8000/user/' + userId)
    .then(res => res.json())
    .then(res => {
      this.setState({
        user: res
      });
    })
  }

  render() {
    const {user} = this.state;
    return (
      <HomeLayout title="编辑用户">
        {
          user ? <UserEditor editTarget={user} /> : '加载中...'
        }
      </HomeLayout>
    );
  }
}

UserEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UserEdit;