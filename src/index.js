/**
 * 配置路由
 */
import React from 'react';
import ReactDOM from 'react-dom';
// 引入react-router
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './pages/Home';
import UserAddPage from './pages/UserAdd'; // 添加用户页
import UserListPage from './pages/UserList'; // 用户列表页
import UserEditPage from './pages/UserEdit'; // 用户编辑页面
import BookAddPage from './pages/BookAdd'; // 添加图书页
import BookListPage from './pages/BookList'; // 图书列表页
import BookEditPage from './pages/BookEdit'; // 用户编辑页面

// 渲染
ReactDOM.render((
  <Router history={hashHistory}>
  	<Route path="/" component={HomePage} />
  	<Route path="/user/add" component={UserAddPage} />
  	<Route path="/user/list" component={UserListPage} />
  	<Route path="/user/edit/:id" component={UserEditPage} />
  	<Route path="/book/add" component={BookAddPage} />
  	<Route path="/book/list" component={BookListPage} />
  	<Route path="/book/edit/:id" component={BookEditPage} />
  </Router>
), document.getElementById('root'));
