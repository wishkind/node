//reducer.js
import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './ActionTypes';
const defaultState = {
    inputValue: '123',
    list: [1, 2, 3]
};

export  const reducer = (state = defaultState, action) => {
    // 更改input輸入框的值
    if (action.type === CHANGE_INPUT_VALUE) {
        const newState = JSON.parse(JSON.stringify(state)); //深拷貝
        newState.inputValue = action.value;
        return newState;
    }
    // 将input提交的值插入到数组list中
    if (action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        console.log(newState);
        return newState;
    }
    //刪除item
    if (action.type === DELETE_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1);
        return newState;
    }
    return state;
}

