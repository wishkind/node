import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from 'views/Main.jsx';
import * as serviceWorker from './serviceWorker';
import NotistackWrapper from 'contexts/NotistackWrapper.js'     //用来初始化消息条
import GlobalProvider from 'contexts/GlobalProvider.js'         //用来初始化全局内存变量
import StorageProvider from 'contexts/StorageProvider.js'       //用来初始化本地存储变量
import BalancesProvider from 'contexts/BalancesProvider.js'     //用来初始化账号的ETH余额

//这里用来初始化各种Context
function AllProvider() {
    return (
        <NotistackWrapper>
            <GlobalProvider>
                <StorageProvider>
                    <BalancesProvider>
                       <Main />
                    </BalancesProvider>
                </StorageProvider>
            </GlobalProvider>
        </NotistackWrapper>
    )
}

ReactDOM.render(<AllProvider />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
