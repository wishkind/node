import createSagaMiddle from 'redux-saga';
const sagaMiddle  = createSagaMiddle();
const handlers =     componseHandles(applyMiddleware(sagaMiddle));

import {takeEvery,put} from 'redux-saga/effects';
import axios from 'axios';
import {GETSAGALIST} from './actionTypes.js';

import {getDataAction} from './actionCreaters.js';
//generator
function* mySaga(){
    yield takeEvery(GETSAGALIST,getList)
}

//建议使用generator函数
function* getList(){
    console.log("dondong");
    const res = yield axios.get('/api/list');
    const action  = getDataAction(res.data.data);
    yield put(action);
}

export default mySaga;



function * getList(){
  try {
   yield delay(3000);
   const res = yield call(fetchSmart,'/list',{
     method:'POST',
     body:JSON.stringify({})
   });
   yield put({type:'update_list',list:res.data.activityList});
 } catch(error) {
   yield put({type:'update_list_error', error});
 }
}

function * watchIsLogin(){
  while(true){
    //监听登入事件
    const action1=yield take('TO_LOGIN_IN');

    const res=yield call(fetchSmart,'/login',{
      method:'POST',
      body:JSON.stringify({
        username:action1.username,
        password:action1.password
      })
    });

    //根据返回的状态码判断登陆是否成功
    if(res.status===10000){
      yield put({type:'to_login_in'});
      //登陆成功后获取首页的活动列表
      yield call(getList);
    }

    //监听登出事件
    const action2=yield take('TO_LOGIN_OUT');
    yield put({type:'to_login_out'});
  }
}


// request.js
import axios from 'axios'
import store from '../store/index.js'
import { ACTION_CHANGE_LOADING } from '../store/actioncreaters'
import url from '../config.js'
/** **** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(
  (config) => {
    // 加载
    store.dispatch(ACTION_CHANGE_LOADING(true))
    let value = sessionStorage.getItem('token') || '123'
    if (value) config.headers.Authorization = value
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
/** **** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(
  (response) => {
    store.dispatch(ACTION_CHANGE_LOADING(false))
    return response
  },
  (error) => {
    // 错误提醒

    store.dispatch(ACTION_CHANGE_LOADING(false))
    const { status } = error.response
    if (status === 401) {
      // 清除token
      sessionStorage.clear()
      window.location.href = url.homeurl
    }
    if (status === 404) {
      window.location.href = url.homeurl
    }
    // 页面跳转
    //router.push('/login')

    return Promise.reject(error)
  }
)
export default axios
