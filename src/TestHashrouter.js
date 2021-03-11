import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import React from 'react';
import Account from './TestAccount';
import AccountRedux from './AccountRedux';
export default function SimpleHashRouter() {
    return (
        <HashRouter>
            <div className="App">
                hello react
                <br />
                <Link to='/redux'>
                    <span>redux示例</span>
                </Link>
                <Link to='/reduxRedux'>
                    <span>react-redux示例</span>
                </Link>
                <Link to='/topics'>
                    <span>router嵌套示例</span>
                </Link>
                <Switch> 
                    <Route path='/redux' exact >
                        <Account />
                    </Route>
                    <Route path='/reduxRedux' exact >
                        <AccountRedux />
                    </Route>
                    <Route path='/topics'>
                        <Topics />
                    </Route>
                    //重定向
                    <Redirect to="/redux" from='/' exact /> 
                </Switch>
            </div>
        </HashRouter>
    )
}
