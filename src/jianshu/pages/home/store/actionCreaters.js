import axios from 'axios';
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const changeHomeData = (result) => ({
    type: actionTypes.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList,
    writerList: result.writerList,
    writerTotalPage: Math.ceil(result.writerList.length/5)
    // 推荐作者（result.writerList）一共有14条数据  每页显示5条 向上取整即共3页 totalPage = 3
})

const addArticleList = (list, nextPage) => ({
    type: actionTypes.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage
})

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('/api/home.json')
            .then((res) => {
                const result = res.data.data;
                dispatch(changeHomeData(result));
            })
    }
}

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/homeList.json?page=' + page)
            .then((res) => {
                const result = res.data.data;
                dispatch(addArticleList(result, page + 1));
            })
    }
}

export const toggleTopShow = (show) => ({
    type: actionTypes.TOGGLE_SCROLL_TOP,
    show
})
