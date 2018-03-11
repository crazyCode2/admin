// 配置路由
import React from 'react';
import ReactDOM from 'react-dom';
// 引入react-router
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './pages/Home';
import UserAddPage from './pages/UserAdd'; // 添加用户页
import UserListPage from './pages/UserList' // 用户列表页

// 渲染
ReactDOM.render((
  <Router history={hashHistory}>
  	<Route path="/" component={HomePage} />
  	<Route path="/user/add" component={UserAddPage} />
  	<Route path="/user/list" component={UserListPage} />
  </Router>
), document.getElementById('root'));
