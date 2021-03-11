import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Write extends PureComponent {
    render() {
        const { loginStatus } = this.props;

        // 如果没登录 在渲染登录页面 如果登陆了，就跳转到首页
        if (!loginStatus) {
            return (
               <div>写文章页面</div>
            );
        }else{
            return (
                // 如果login为true，即已经登录成功，就重定向到首页
                <Redirect to='/login'/>
            )
        }

    }
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

export default connect(mapState, null)(Write);