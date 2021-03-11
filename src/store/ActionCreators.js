//actionCreator.js
import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM, INIT_LIST, TODO_LIST} from './ActionTypes';


export const getInputChangeAction = (value) => ({    type: CHANGE_INPUT_VALUE,
    value
});

export const getAddItemAction = () => ({
    type: ADD_TODO_ITEM
});

export const getDeleteItemAction = (index) => ({
    type: DELETE_TODO_ITEM,
    index
});

export const initListAction = () => ({
    type: INIT_LIST
});

export const getTodoList = (index) => ({
    type: TODO_LIST,
    index
});



