import React, { Component } from 'react';
import { GlobalStyle } from './style';
import './style';
import './statics/iconfont/iconfont';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header/index';
import store from './store/index';
import Home from './pages/home';
// 访问异步组件
import Detail from './pages/detail/loadable';
import Login from './pages/login';
import Write from './pages/write';


class App extends Component {
  render() {
    return (
    <React.Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <>
          <GlobalStyle />
          <BrowserRouter>
            <>
              <Header />
              <Route path='/' exact component={Home}></Route>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/write' exact component={Write}></Route>
              <Route path='/detail/:id' exact component={Detail}></Route>
            </>
          </BrowserRouter>
        </>
      </Provider>
    </React.Fragment>
    );
  }
}

export default App;



