import React from 'react';

// 用户列表
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

  render() {
    // 定义变量
    const { userList } = this.state;

    return (
      <div>
        <header>
          <h1>用户列表</h1>
        </header>

        <main>
          <table>
            <thead>
              <tr>
                <th>用户ID</th>
                <th>用户名</th>
                <th>性别</th>
                <th>年龄</th>
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
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}

export default UserList;