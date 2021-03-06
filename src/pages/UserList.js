/**
 * 用户列表页面
 */
import React from 'react';
// 引入 antd 组件
import { message, Table, Button, Popconfirm } from 'antd';
// 引入 prop-types
import PropTypes from 'prop-types';
// 引入 封装后的fetch工具类
import { get, del } from '../utils/request';

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
    get('http://localhost:8000/user')
      .then((res) => {
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
    // 执行删除数据操作
    del('http://localhost:8000/user/' + user.id, {
    })
      .then((res) => {
        /**
         * 设置状态
         * array.filter
         * 把Array的某些元素过滤掉，然后返回剩下的元素
         */
        this.setState({
          userList: this.state.userList.filter(item => item.id !== user.id)
        });
        message.success('删除用户成功');
      })
      .catch(err => {
        console.error(err);
        message.error('删除用户失败');
      });
  }

  render() {
    // 定义变量
    const { userList } = this.state;
    // antd的Table组件使用一个columns数组来配置表格的列
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'name'
      },
      {
        title: '性别',
        dataIndex: 'gender'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Button.Group type="ghost">
              <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
              <Popconfirm
                title="确定要删除吗?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.handleDel(record)}>
                <Button size="small">删除</Button>
              </Popconfirm>
            </Button.Group>
          );
        }
      }
    ];

    return (
      <Table columns={columns} dataSource={userList} rowKey={row => row.id} />
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