/**
 * 图书添加页面
 */
import React from 'react';
// 布局组件
import HomeLayout from '../layouts/HomeLayout';
// 编辑组件
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component {
  render() {
    return (
      <HomeLayout title="添加图书">
        <BookEditor />
      </HomeLayout>
    );
  }
}

export default BookAdd;