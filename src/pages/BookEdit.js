/**
 * 编辑图书页面
 */
import React from 'react';
// 布局组件
import HomeLayout from '../layouts/HomeLayout';
// 引入 prop-types
import PropTypes from 'prop-types';
// 图书编辑器组件
import BookEditor from '../components/BookEditor';
// 引入 封装fetch工具类
import { get } from '../utils/request'; 

class BookEdit extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {
      book: null
    };
  }

  // 生命周期--组件加载中
  componentWillMount(){
    // 定义常量
    const bookId = this.context.router.params.id;
    /**
     * 发送请求
     * 获取用户数据
     */
    get('http://localhost:8000/book/' + bookId)
    .then((res) => {
      console.log(res);
      // 设置状态
      this.setState({
        book: res
      });
    })
  }

  render() {
    const {book} = this.state;
    return (
      <HomeLayout title="编辑图书">
        {
          book ? <BookEditor editTarget={book} /> : '加载中...'
        }
      </HomeLayout>
    );
  }
}

BookEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookEdit;