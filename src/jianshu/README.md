启动项目：
- `npm i` 安装依赖
- `npm start` 启动

# 简书项目
- 1.1 项目简介
此项目通过对模仿“简书”项目进行开发，包含首页开发，详情页面开发，登录权限校验开发，列表页面开发等。
- 1.2 技术栈
react + redux + redux-thunk + react-redux + react-router4 + axios + es6 

- 1.3 业务难点及解决方案：

难点1：头部组件引入iconfont图标，但一直显示方块
解决方案：用react-fontawesome，引入相关模块后，在需要显示图标的地方加入<FontAwesomeIcon icon="coffee" />即可

难点2：在reducer里面改变数据会把immutable数组改变成普通数组
解决方案：在actionCreaters里面要把data数组也转成immutable数组（用fromJS方法），这样会让数组类型统一

难点3：功能页面比较多的情况下所有的action和reducer都写到一起，不仅会在获取数据时容易混乱，而且代码可读性比较差。
解决方案： 分功能分模块写入action和reducer。然后使用combineReducers合并多个reducer，按需引入各个页面的reducer，使得结构清晰

![](https://user-gold-cdn.xitu.io/2019/7/31/16c479a5ba5318e3?w=1298&h=658&f=gif&s=3634376)


# 功能一：通过react-thunk中间件获取ajax数据

## 一、list是immutable数组，要把data转化成immutable数组，做到数据格式的统一
- 把异步获取数据都放到actionCreaters里面
```javascript
import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';
import axios from 'axios';

export const inputFocus = () => ({
    type: actionTypes.SEARCH_FOCUS
})

export const inputBlur = () => ({
    type: actionTypes.SEARCH_BLUR
})


// data应该是个immutable对象
const changeList = (data) => ({
    type: actionTypes.CHANGE_LIST,
    data: fromJS(data)
})

// actionCreaters必须返回一个函数，要想返回一个函数要用react-thunk中间件
export const getList = () => {
    return (dispatch) => {
        axios.get('api/headerList.json')
        .then((res) => {
            const data = res.data;
            const action = changeList(data.data)
            dispatch(action)
        }).catch(() => {
            console.log('error');
        })
    }
}
```

```javascript
// reducer
import * as actionTypes from './actionTypes'

// immutable库 immutable对象
import {fromJS} from 'immutable';

const defaultState = fromJS({
    focused: false,
    // 此时list是immutable数组 不是普通数组
    list: []
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
        return state.set('list',action.data)
    }
    return state;
}
```

## 二、 循环展示数据
```javascript
<SearchInfoList>
    {
        this.props.list.map(item=>{
            return <SearchInfoItem key={item}>{item}</SearchInfoItem>
        })   
    }
</SearchInfoList>
```

# 关于react路由

根据url的不同显示不同的内容

安装： `npm i react-router-dom --save`
- `Provider` `BrowserRouter` 下只能有一个chidren

`<Route path='/' exact render={() =><div>home</div>}></Route>`
- path: 需要跳转的路径
- exact: 要跳转的路径完全匹配 
    - 如果不加exact 路径`'/detail'` 会和`'/'`根目录匹配 也和`'/fetail'`匹配
    - 加上exact之后 路径`'/detail'` 只和`'/fetail'`匹配
- render: 该路径下渲染出的页面内容
- component: 该路径下渲染出相应的组件

```javascript
// app.js
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <>
          <Header />
           <BrowserRouter>
            <>
              {/* <Route path='/' exact render={() =><div>home</div>}></Route> */}
              <Route path='/' exact component={Home}></Route>
              <Route path='/detail' exact component={Detail}></Route>
            </>
          </BrowserRouter>
        </>
      </Provider>
    );
  }
}

export default App;
```

# redux-thunk发送ajax数据
首先绑定一个click事件，派发action，

借助redux-thunk中间件，在action里面写异步操作，

请求到数据之后再派发一个同步的action，然后reducer接收到同步的action，去改变他的数据，数据变了，页面跟着改变

# 路由跳转
- 单页面应用：不论页面如何跳转，整个页面只会加载一次html文件
- 不能用a标签 要用`react-router-dom` 
- ` <Link key={index} to='/detail'>...</Link>`

# 标签被转义
页面content部分直接显示字符串（带标签）

```javascript
<Content>{this.props.content}</Content>
```
变成

```javascript
<Content dangerouslySetInnerHTML={{__html:this.props.content}}/>
```

# 路由：
## 动态路由获取参数


```javascript
// detail/index.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    DetailWrapper,
    Header,
    Content
} from './style';
import {actionCreaters} from './store';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log(this.props.match.params.id);
        return (
            <DetailWrapper>
                <Header>{this.props.title}</Header>
                <Content dangerouslySetInnerHTML={{__html:this.props.content}} />
            </DetailWrapper>
        );
    }

    componentDidMount(){
        this.props.getDetail(this.props.match.params.id);
    }
}

const mapState = (state) => ({
    title: state.getIn(['detail','title']),
    content: state.getIn(['detail','content'])
})

const mapDispatch = (dispatch) => ({
    getDetail(id){
        dispatch(actionCreaters.getDetail(id))
    }
})

export default connect(mapState, mapDispatch)(Detail);
```

```javascript
// detail/store/actionCreaters.js
import axios from "axios";
import * as actionTypes from './actionTypes';
// import { fromJS } from 'immutable';

const changeDetail = (title, content) => ({
    type: actionTypes.CHANGE_DETAIL,
    title,
    content
})

export const getDetail = (id) => {
    return (dispatch) => {
        axios.get('/api/detail.json?id=' + id)
            .then((res) => {
                const result = res.data.data
                dispatch(changeDetail(result.title, result.content))
            })
    }
}
```

```javascript
// reducer.js
import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    title: '',
    content: ''
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_DETAIL:
            return state.merge({
                title: action.title,
                content: action.content
            })
        default:
            return state;
    }
};

```
```javascript
// home/components/list.js
render() {
    const { list, getMoreList, page } = this.props;
    return (
        <div>
            {
                list.map((item, index) => {
                    return (
                        <Link key={index} to={'/detail/' + item.get('id')}>
                            <ListItem>
                                <ListInfo>
                                    <h3 className='title'>{item.get('title')}</h3>
                                    <p className='desc'>{item.get('desc')}</p>
                                </ListInfo>
                                <img
                                    className='pic'
                                    src={item.get('imgUrl')}
                                    alt=''
                                />
                                {/* <ListMeta>
                                <span>79.6</span>
                                <a href='#'>万能的小考拉</a>
                                <a href='#'>3</a>
                                <span>15</span>
                            </ListMeta> */}
                            </ListItem>
                        </Link>
                    )
                })
            }
            <LoadMore
                onClick={() => getMoreList(page)}
            >更多列表</LoadMore>
        </div>
    );
}
```
```javascript
//app.js
import React, { Component } from 'react';
import { GlobalStyle } from './style';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header/index';
import store from './store/index';
import Home from './pages/home';
import Detail from './pages/detail';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <>
          <GlobalStyle />
          <BrowserRouter>
            <>
              <Header />
              <Route path='/' exact component={Home}></Route>
              <Route path='/detail/:id' exact component={Detail}></Route>
            </>
          </BrowserRouter>
        </>
      </Provider>
    );
  }
}

export default App;
```

## 通过加参数

```javascript
// list.js
 <Link key={index} to={'/detail?id=' + item.get('id')}>
```
```javascript
//app.js
<Route path='/detail' exact component={Detail}></Route>
```
```javascript
// pages/detail/index.js
render() {
    console.log(this.props.location.search);
    return (
        <DetailWrapper>
            <Header>{this.props.title}</Header>
            <Content dangerouslySetInnerHTML={{__html:this.props.content}} />
        </DetailWrapper>
    );
}
// console.log(this.props.match.params); // params下没有id了
// 此时需要在this.props.location.search 属性值为问号传参 ?id=2
```

# 登录功能及权限校验

## 登录及退出
- 新建 pages/login/index.js
- /login/store/四个文件
```javascript
//app.js
import Login from './pages/login';
<Route path='/login' exact component={Login}></Route>
```
```javascript
//login/index.js
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    LoginWrapper,
    LoginBox,
    Input,
    Button
} from './style';
import { actionCreaters } from './store';

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { loginStatus } = this.props;

        // 如果没登录 在渲染登录页面 如果登陆了，就跳转到首页
        if (!loginStatus) {
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder='账号' ref={(input) => { this.account = input }} />
                        <Input placeholder='密码' type='password' ref={(input) => { this.password = input }} />
                        <Button
                            onClick={() => this.props.login(this.account, this.password)}
                        >登录</Button>
                    </LoginBox>
                </LoginWrapper>
            );
        }else{
            return (
                // 如果login为true，即已经登录成功，就重定向到首页
                <Redirect to='/'/>
            )
        }

    }
}

const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
    login(accountEle, passwordEle) {
        console.log(accountEle.value, passwordEle.value)
        dispatch(actionCreaters.login(accountEle.value, passwordEle.value))
    }
})

export default connect(mapState, mapDispatch)(Login);
```
```javascript
// src/store/reducer.js
import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store/index';
import { reducer as homeReducer } from '../pages/home/store/index';
import { reducer as detailReducer } from '../pages/detail/store/index';
import { reducer as loginReducer } from '../pages/login/store';
// redux-immutable
export default combineReducers({
    header: headerReducer,
    home: homeReducer,
    detail: detailReducer,
    login: loginReducer
})
```

```javascript
// /login/store/reducer.js
import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    login: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOGIN:
            return state.set('login',action.value)
        default:
            return state;
    }
};
```

```javascript
// actionCreaters.js
import axios from 'axios';
import * as actionTypes from './actionTypes';

const changeLogin = () => ({
    type: actionTypes.CHANGE_LOGIN,
    value: true
})

export const logout = () => ({
    type: actionTypes.LOGOUT,
    value: false
})

export const login = (account, password) => {
    return (dispatch) => {
        axios.get('/api/login.json?account=' + account + '&password' + password)
            .then((res) => {
                const result = res.data.data;
                if(result){
                    dispatch(changeLogin())
                }else{
                    alert('登录失败');
                }
                console.log(res);
            })
    }
}
```

```javascript
//header/index.js
import { actionCreaters as loginActionCreaters } from '../../pages/login/store';

 render() {
    const { focused, handleInputFocus, handleInputBlur, list,login,logout } = this.props;
    return (
        <HeaderWrapper>
            <Link to='/'>
                <Logo />
            </Link>
            <Nav>
                <NavItem className='left active'>首页</NavItem>
                <NavItem className='left'>下载App</NavItem>
                <NavItem className='right'>
                    <span className="iconfont">&#xe636;</span>
                </NavItem>
                {
                    login? 
                    <NavItem 
                        onClick={logout}
                    className='right'>退出</NavItem> : <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
                }
                <SearchWrapper>
                    <CSSTransition
                        in={focused}
                        timeout={200}
                        classNames="slide"
                    >
                        <NavSearch
                            className={focused ? 'focused' : ''}
                            onFocus={() => handleInputFocus(list)}
                            onBlur={handleInputBlur}
                        ></NavSearch>
                    </CSSTransition>
                    <span
                        className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}
                    >&#xe615;</span>
                    {/* 聚焦显示热门搜索 */}
                    {this.getListArea()}
                </SearchWrapper>
            </Nav>
            <Addition>
                <Button className='reg'>注册</Button>
                <Button className='writting'>
                    <span className="iconfont">&#xe602;</span>
                    写文章
        </Button>
            </Addition>
        </HeaderWrapper>
    );
}

const MapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
        // 等价于focused: state.get('header','focused')
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login: state.getIn(['login', 'login']),
    }
}

const MapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
        // 等价于focused: state.get('header','focused')
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login: state.getIn(['login', 'login']),
    }
}

const MapDispatchToProps = (dispatch) => {
    return {

        // 鼠标聚焦搜索框时，搜索框宽度变长
        handleInputFocus(list) {
            // console.log(list)
            //在聚焦的时候请求数据 避免无意义的多次请求
            if (list.size === 0) {
                dispatch(actionCreaters.getList());
            }
            dispatch(actionCreaters.inputFocus());
        },

        // 鼠标失焦搜索框时，搜索框宽度变短
        handleInputBlur() {
            const action = actionCreaters.inputBlur()
            dispatch(action);
        },

        // 鼠标移入热门搜索
        handleMouseEnter() {
            dispatch(actionCreaters.mouseEnter())
        },

        // 鼠标移出热门搜索
        handleMouseLeave() {
            dispatch(actionCreaters.mouseLeave())
        },

        // 当鼠标点击换一批时
        handleChangePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            } else {
                originAngle = 0;
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'
            // 如果当前页码小于总页码，就让当前页码+1（换页）
            // 如果当前页码大于等于于总页码，就让当前页码=1（回到第一页）
            if (page < totalPage) {
                dispatch(actionCreaters.changePage(page + 1));
            } else {
                dispatch(actionCreaters.changePage(1));
            }
        },

        // 退出登录
        logout(){
            dispatch(loginActionCreaters.logout())
        }
    }
}
```






##  权限校验
- 比如：点击文章页，只有用户登陆之后才能访问

# react-loadable
现在访问首页会把所有页面都在加载出来在一个JS文件上

通过异步组件react-loadable实现： 访问首页 只加载首页代码，加载详情页再加载详情页的代码

```javascript
// pages/detail/loadable.js
import React from 'react';
import Loadable from 'react-loadable';

// 异步加载
const LoadableComponent = Loadable({
    loader: () => import('./'),
    loading() {
        return (
            <div>正在加载</div>
        )
    }
});

export default () => <LoadableComponent />;

```

```javascript
//app.js
// 访问异步组件
import Detail from './pages/detail/loadable';
```

```javascript
// detail/index.js
import { withRouter } from 'react-router-dom';
...
export default connect(mapState, mapDispatch)(withRouter(Detail));
```


