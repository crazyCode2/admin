/**
 * 图书列表页面
 */
import React from 'react';
// 布局组件
import HomeLayout from '../layouts/HomeLayout';
// 引入 prop-types
import PropTypes from 'prop-types';

class BookList extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {
      bookList: []
    };
  }

  /**
   * 生命周期
   * componentWillMount
   * 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次
   */
  componentWillMount(){
    // 请求数据
    fetch('http://localhost:8000/book')
      .then(res => res.json())
      .then(res => {
        /**
         * 成功的回调
         * 数据赋值
         */
        this.setState({
          bookList: res
        });
      });
  }

  /**
   * 编辑
   */
  handleEdit(book){
    // 跳转编辑页面
    this.context.router.push('/book/edit/' + book.id);
  }

  /**
   * 删除
   */
  handleDel(book){
    // 确认框
    const confirmed = window.confirm(`确认要删除书名 ${book.name} 吗?`);
    // 判断
    if(confirmed){
      // 执行删除数据操作
      fetch('http://localhost:8000/book/' + book.id, {
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
          bookList: this.state.bookList.filter(item => item.id !== book.id)
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
    const { bookList } = this.state;

    return (
      <HomeLayout title="图书列表">
        <table>
          <thead>
            <tr>
              <th>图书ID</th>
              <th>图书名称</th>
              <th>价格</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {
              bookList.map((book) => {
                return (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.price}</td>
                    <td>
                      <a onClick={() => this.handleEdit(book)}>编辑</a>
                      &nbsp;
                      <a onClick={() => this.handleDel(book)}>删除</a>
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
BookList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookList;