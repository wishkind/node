import axios from "axios";
import * as actionTypes from './actionTypes';
// import { fromJS } from 'immutable';

const changeDetail = (title, content) => ({
    type: actionTypes.CHANGE_DETAIL,
    title,
    content
});

export const getDetail = (id) => {
    return (dispatch) => {
        axios.get('/api/detail.json?id=' + id)
            .then((res) => {
                const result = res.data.data
                dispatch(changeDetail(result.title, result.content))
            }).catch(()=>{
                console.log('请求失败，请刷新重试！')
            })
    };
};