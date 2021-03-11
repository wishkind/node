import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage: 1,
    showScroll: false,
    writerList: [],
    writerPage: 1,
    writerTotalPage: 1
});

const changeHomeData = (state, action) => {
    return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList),
        writerList: fromJS(action.writerList)
    })
};

const addArticleList = (state, action) => {
    return state.merge({
        'articleList': state.get('articleList').concat(action.list),
        'articlePage': action.nextPage
    })
}

export default (state = defaultState, action) => {
    if (action.type === actionTypes.CHANGE_HOME_DATA) {
        return changeHomeData(state, action )
    };

    if (action.type === actionTypes.ADD_ARTICLE_LIST) {
        return addArticleList(state, action)
    };

    if (action.type === actionTypes.TOGGLE_SCROLL_TOP) {
        return state.set('showScroll', action.show);
    }

    return state;
};