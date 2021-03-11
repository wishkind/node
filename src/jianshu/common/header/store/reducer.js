import * as actionTypes from './actionTypes'

// immutable库 immutable对象
import {fromJS} from 'immutable';

const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    // 此时list是immutable数组 不是普通数组
    list: [],
    // 换一批时，显示当前是第几页
    page: 1,
    // 热门搜索一共有多少页
    totalPage: 1
})

export default (state = defaultState, action) => {
    if (action.type === actionTypes.SEARCH_FOCUS) {
        // immutable对象的set方法，会结合之前的immutable对象的值和设置的值，返回一个全新的对象
        return state.set('focused',true)
    }
    if (action.type === actionTypes.SEARCH_BLUR) {
        return state.set('focused',false)
    }
    if (action.type === actionTypes.CHANGE_LIST) {
        // 因为list是immutable数组，改变数据会把immutable数组改变成普通数组
        // 所以在actionCreaters里面要把data数组也转成immutable数组（用fromJS方法），这样会让数组类型统一
        return state.merge({
            list: action.data,
            totalPage: action.totalPage
        })
    }
    if (action.type === actionTypes.MOUSE_ENTER) {
        return state.set('mouseIn',true)
    }
    if (action.type === actionTypes.MOUSE_LEAVE) {
        return state.set('mouseIn',false)
    }
    if (action.type === actionTypes.CHANGE_PAGE) {
        return state.set('page',action.page)
    }
    return state;
}