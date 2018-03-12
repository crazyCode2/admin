/**
 * 用户列表页面
 */
import React from 'react';
// 布局组件
import HomeLayout from '../layouts/HomeLayout';
// 引入 prop-types
import PropTypes from 'prop-types';

class UserList extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {
      userList: []
    };
  }

  /**
   * 生命周期
   * componentWillMount
   * 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次
   */
  componentWillMount(){
    // 请求数据
    fetch('http://localhost:8000/user')
      .then(res => res.json())
      .then(res => {
        /**
         * 成功的回调
         * 数据赋值
         */
        this.setState({
          userList: res
        });
      });
  }

  /**
   * 编辑
   */
  handleEdit(user){
    // 跳转编辑页面
    this.context.router.push('/user/edit/' + user.id);
  }

  /**
   * 删除
   */
  handleDel(user){
    // 确认框
    const confirmed = window.confirm(`确认要删除用户 ${user.name} 吗?`);
    // 判断
    if(confirmed){
      // 执行删除数据操作
      fetch('http://localhost:8000/user/' + user.id, {
        method: 'delete'
      })
      .then(res => res.json())
      .then(res => {
        /**
         * 设置状态
         * array.filter
         * 把Array的某些元素过滤掉，然后返回剩下的元素
         */
        this.setState({
          userList: this.state.userList.filter(item => item.id !== user.id)
        });
        alert('删除用户成功');
      })
      .catch(err => {
        console.log(err);
        alert('删除用户失败');
      });
    }
  }

  render() {
    // 定义变量
    const { userList } = this.state;

    return (
      <HomeLayout title="用户列表">
        <table>
          <thead>
            <tr>
              <th>用户ID</th>
              <th>用户名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {
              userList.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user.age}</td>
                    <td>
                      <a onClick={() => this.handleEdit(user)}>编辑</a>
                      &nbsp;
                      <a onClick={() => this.handleDel(user)}>删除</a>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </HomeLayout>
    );
  }
}

/**
 * 任何使用this.context.xxx的地方，必须在组件的contextTypes里定义对应的PropTypes
 */
UserList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UserList;