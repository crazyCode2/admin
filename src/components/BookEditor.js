/**
 * 图书编辑器组件
 */
import React from 'react';
import FormItem from '../components/FormItem'; // 或写成 ./FormItem
// 高阶组件 formProvider表单验证
import formProvider from '../utils/formProvider';
// 引入 prop-types
import PropTypes from 'prop-types';
// 引入自动完成组件
import AutoComplete from './AutoComplete';

class BookEditor extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
  
    this.state = {
      recommendUsers: []
    };
  }

  // 获取推荐用户信息
  getRecommendUsers (partialUserId) {
    // 请求数据
    fetch('http://localhost:8000/user?id_like=' + partialUserId)
    .then((res) => res.json())
    .then((res) => {
      if(res.length === 1 && res[0].id === partialUserId){
        // 如果结果只有1条且id与输入的id一致,说明输入的id已经完整了,没必要再设置建议列表
        return;
      }

      // 设置建议列表
      this.setState({
        recommendUsers: res.map((user) => {
          return {
            text: `${user.id}(${user.name})`,
            value: user.id
          }
        })
      });
    })
  }

  // 计时器
  timer = 0;
  handleOwnerIdChange(value){
    this.props.onFormChange('owner_id', value);
    this.setState({
      recommendUsers: []
    });

    // 使用"节流"的方式进行请求,防止用户输入的过程中过多地发送请求
    if(this.timer){
      // 清除计时器
      clearTimeout(this.timer);
    }

    if(value){
      // 200毫秒内只会发送1次请求
      this.timer = setTimeout(() => {
        // 真正的请求方法
        this.getRecommendUsers(value);
        this.timer = 0;
      }, 200);
    }
  }

  // 按钮提交事件
  handleSubmit(e){
    // 阻止表单submit事件自动跳转页面的动作
    e.preventDefault();
    // 定义常量
    const { form: { name, price, owner_id }, formValid, editTarget} = this.props; // 组件传值
    // 验证
    if(!formValid){
      alert('请填写正确的信息后重试');
      return;
    }

    // 默认值
    let editType = '添加';
    let apiUrl = 'http://localhost:8000/book';
    let method = 'post';
    // 判断类型
    if(editTarget){
      editType = '编辑';
      apiUrl += '/' + editTarget.id;
      method = 'put';
    }

    // 发送请求
    fetch(apiUrl, {
      method, // method: method 的简写
      // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
      body: JSON.stringify({
        name: name.value,
        price: price.value,
        owner_id: owner_id.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // 强制回调的数据格式为json
    .then((res) => res.json())
    // 成功的回调
    .then((res) => {
      // 当添加成功时,返回的json对象中应包含一个有效的id字段
      // 所以可以使用res.id来判断添加是否成功
      if(res.id){
        alert(editType + '添加图书成功!');
        this.context.router.push('/book/list'); // 跳转到用户列表页面
        return;
      }else{
        alert(editType + '添加图书失败!');
      }
    })
    // 失败的回调
    .catch((err) => console.error(err));
  }

  // 生命周期--组件加载中
  componentWillMount(){
    const {editTarget, setFormValues} = this.props;
    if(editTarget){
      setFormValues(editTarget);
    }
  }
  
  render() {
    // 定义常量
    const {recommendUsers} = this.state;
    const {form: {name, price, owner_id}, onFormChange} = this.props;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormItem label="书名:" valid={name.valid} error={name.error}>
          <input
            type="text"
            value={name.value}
            onChange={(e) => onFormChange('name', e.target.value)}/>
        </FormItem>

        <FormItem label="价格:" valid={price.valid} error={price.error}>
          <input
            type="number"
            value={price.value || ''}
            onChange={(e) => onFormChange('price', e.target.value)}/>
        </FormItem>

        <FormItem label="所有者:" valid={owner_id.valid} error={owner_id.error}>
          <AutoComplete
            value={owner_id.value ? owner_id.value + '' : ''}
            options={recommendUsers}
            onValueChange={value => this.handleOwnerIdChange(value)} />
        </FormItem>
        <br />
        <input type="submit" value="提交" />
      </form>
    );
  }
}

// 必须给BookEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
BookEditor.contextTypes = {
  router: PropTypes.object.isRequired
};

// 实例化
BookEditor = formProvider({ // field 对象
  // 书名
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入图书户名'
      },
      {
        pattern: /^.{1,10}$/,
        error: '图书名最多10个字符'
      }
    ]
  },
  // 价格
  price: {
    defaultValue: 0,
    rules: [
      {
        pattern: function(value){
          return value > 0;
        },
        error: '价格必须大于0'
      }
    ]
  },
  // 所有者
  owner_id: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入所有者名称'
      },
      {
        pattern: /^.{1,10}$/,
        error: '所有者名称最多10个字符'
      }
    ]
  }
})(BookEditor);

export default BookEditor;