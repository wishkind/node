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
        } else {
            return (
                // 如果login为true，即已经登录成功，就重定向到首页
                <Redirect to='/' />
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