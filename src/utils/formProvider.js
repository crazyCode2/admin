/**
 * 高阶组件 formProvider
 * 返回组件的组件（函数）
 * 使用高阶组件可以在不修改原组件代码的情况下，修改原组件的行为或增强功能
 */
import React from 'react';

function formProvider (fields) { // fields 对象
  return function(Comp) { // Comp
    /**
     * 定义常量
     * 初始表单状态
     */
    const initialFormState = {};
    // 循环
    for(const key in fields){
      initialFormState[key] = {
        value: fields[key].defaultValue,
        error: ''
      };
    }

    // 创建组件
    class FormComponent extends React.Component {
      // 构造器
      constructor(props) {
        super(props);
        // 定义初始状态
        this.state = {
          form: initialFormState,
          formValid: false // 加了一个formValid用来保存整个表单的校验状态
        };
        // 绑定this
        this.handleValueChange = this.handleValueChange.bind(this);
      }
      // 输入框改变事件
      handleValueChange(fieldName, value){
        // 定义常量
        const { form } = this.state;

        const newFieldState = {value, valid: true, error: ''};

        const fieldRules = fields[fieldName].rules;
        // 循环
        for(let i=0; i<fieldRules.length; i++){
          const {pattern, error} = fieldRules[i];
          let valid = false;
          if(typeof pattern === 'function'){
            valid = pattern(value);
          }else{
            valid = pattern.test(value);
          }

          if(!valid){
            newFieldState.valid = false;
            newFieldState.error = error;
            break;
          }
        }
        /**
         * ... 扩展运算符
         * 将一个数组转为用逗号分隔的参数序列
         */
        const newForm = {...form, [fieldName]: newFieldState};
        /**
         * every
         * 对数组中的每个元素都执行一次指定的函数,直到此函数返回 false
         * 如果发现这个元素,every 将返回 false
         * 如果回调函数对每个元素执行后都返回 true,every 将返回 true
         */
        const formValid = Object.values(newForm).every(f => f.valid);
        // 设置状态
        this.setState({
          form: newForm,
          formValid
        });
      }
      render(){
        const { form, formValid } = this.state;
        return (
          <Comp
            {...this.props}
            form={form}
            formValid={formValid}
            onFormChange={this.handleValueChange} />
        );
      }
    }
    // 返回组件
    return FormComponent;
  }
}

export default formProvider;