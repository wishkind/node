//todolist.js
import React, { Component } from "react";
import {store} from "./store/store";
import {
    getInputChangeAction,
    getAddItemAction,
    getDeleteItemAction,
    initListAction,
    getTodoList
} from "./store/ActionCreators";
import {TodoListUI} from './store/TodoListUI';
 
export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    console.log(this.state);
    alert(this.state);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    /**
     * 页面上的内容并没有随着store的更新而更新，所以如下操作:
     * store发生改变，则subscribe()绑定的函数会自动执行
     */
    store.subscribe(this.handleStoreChange);
  }
 
  componentDidMount() {
      const action = getTodoList();
    //   当调用store.dispatch把action发给store的时候，action会自动执行。
      store.dispatch(action);
  }
 
  // input值改变触发action
  handleInputChange(e) {
    //定义action两种方式，下面是最原始的一种：（1）
    // const action = {
    //   type: CHANGE_INPUT_VALUE,
    //   value: e.target.value
    // };
    //下面是改进的方式：（2）
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action);
 
    console.log(e.target.value);
  }
  // 重新渲染页面数据
  handleStoreChange() {
    this.setState(store.getState());
  }
  // 提交输入内容
  handleButtonClick() {
    const action = getAddItemAction();
    console.log(action);
    store.dispatch(action);
  }
  // 点击列表电影名字，会删除电影
  handleItemDelete(index) {
    const action = getDeleteItemAction(index);
    store.dispatch(action);
  }
 
  render() {
    return (
      <TodoListUI
        list={this.state.list}
        inputValue={this.state.inputValue}
        handleInputChange={this.handleInputChange}
        handleButtonClick={this.handleButtonClick}
        handleItemDelete={this.handleItemDelete}
      />
    );
  }
}


