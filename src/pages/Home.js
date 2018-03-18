/**
 * 主页
 */
import React from 'react';
// 引入样式表
import styles from '../styles/home-page.less';

class Home extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {};
  }

  render() {
    return (
      <div className={styles.welcome}>
        Welcome
      </div>
    );
  }
}

export default Home;