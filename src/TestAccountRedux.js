import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {take,call,put,select,fork,takeEvery,takeLatest} from 'redux-saga/effects';
 
class App extends Component{
    render(){
        const {count, plus, minus} = this.props;
        return (
            <div>
                <button onClick={minus}>-</button>
                <p>{count}</p>
                <button onClick={plus}>+</button>
            </div>
        )
    }
}
 
 
 
//action
const plusAcion = {
    type: 'PLUS',
    count: 10
}
 
const minusAction = {
    type: 'MINUS',
    count: 20
}
 
//reducer
const initialState = {
    count: 0
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PLUS' :
            return {
                count: state.count + action.count
            }
        case 'MINUS' :
            return {
                count: state.count - action.count
            }
        default:
            return initialState;
    }
}
 
//store
let store = createStore(reducer)
 
//映射Redux state到组件的属性
function mapStateToProps(state) {
    return { count: state.count }
}
 
//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        plus:()=>dispatch(plusAcion),
        minus:()=>dispatch(minusAction)
    }
}
 
//连接组件
App = connect(mapStateToProps, mapDispatchToProps)(App)
 
//渲染组件
ReactDOM.render (
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
  
)
