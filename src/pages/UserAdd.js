/**
 * 用户添加页面
 */
import React from 'react';
// 布局组件
import HomeLayout from '../layouts/HomeLayout';
// 编辑组件
import UserEditor from '../components/UserEditor';

class UserAdd extends React.Component {
  render() {
    return (
      <HomeLayout title="添加用户">
        <UserEditor />
      </HomeLayout>
    );
  }
}

export default UserAdd;