/**
 * 图书添加页面
 * 这个组件除了返回BookEditor没有做任何事，其实可以直接export default BookEditor
 */
import React from 'react';
// 编辑组件
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component {
  render() {
    return (
      <BookEditor />
    );
  }
}

export default BookAdd;