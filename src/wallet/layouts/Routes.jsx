import React,{Suspense,lazy} from 'react';
import {useAccountAmount} from 'contexts/StorageProvider';
import {useGlobal} from 'contexts/GlobalProvider';
import {withRouter} from "react-router";
import { Route, Switch,Redirect } from "react-router-dom";
//延时载入各路由页面
const ImportWallet = lazy(() => import('views/ImportWallet'));
const CreateWallet = lazy(() => import('views/CreateWallet'));
const SignInWallet = lazy(() => import('views/SignIn'));
const WalletDetail = lazy(() => import('views/WalletDetail'));
const SendCurrency = lazy(() => import('views/SendCurrency'));
const TokenInfo = lazy(() => import('views/TokenInfo'));

//直接进行对应路由的导航，不显示任何内容
function SwitchRoute({history,path}) {
    history.push(path)
    return null
}

function Admin({history}) {
    const accountAmount = useAccountAmount()
    const {isLogin} = useGlobal()
    //未读取本地存储时(-1)，不显示，读取后会自动刷新
    if(accountAmount === -1) {
        return null
    }
    const hasAccount = accountAmount > 0

    return (
        //因为延时载入，这里需要使用<Suspense /> 。fallback也可以设置成为一个动画或者显示文字loading
        <Suspense fallback ={null}>
            <Switch>
                <Route path="/import" component={ImportWallet} />
                <Route path="/create" >
                    {hasAccount ? <SwitchRoute history={history} path='/sign' /> : <CreateWallet /> }
                </Route>
                <Route path='/sign' >
                    {hasAccount ? <SignInWallet /> : <SwitchRoute history={history} path='/create' />}
                </Route>
                <Route path='/detail'>
                    {hasAccount
                        ? (isLogin ? <WalletDetail /> : <SwitchRoute history={history} path='/sign' />)
                        : <SwitchRoute history={history} path='/create' />}
                </Route>
                <Route path='/send'>
                    {hasAccount
                        ? (isLogin ? <SendCurrency /> : <SwitchRoute history={history} path='/sign' />)
                        : <SwitchRoute history={history} path='/create' />}
                </Route>
                <Route path='/token'>
                    {hasAccount
                        ? (isLogin ? <TokenInfo /> : <SwitchRoute history={history} path='/sign' />)
                        : <SwitchRoute history={history} path='/create' />}
                </Route>
                <Redirect from='/' to='/detail' />
            </Switch>
        </Suspense >
    )
}

export default withRouter(Admin)
