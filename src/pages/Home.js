/**
 * 主页
 */
import React from 'react';
import { Link } from 'react-router';
// 布局组件
import HomeLayout from '../layouts/HomeLayout';

class Home extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {};
  }

  render() {
    return (
      <HomeLayout title="Welcome">
        <Link to="/user/list">用户列表</Link>
        <br />
        <Link to="/user/add">添加用户</Link>
      </HomeLayout>
    );
  }
}

export default Home;