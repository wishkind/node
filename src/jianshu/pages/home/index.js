// PureComponent 纯组件
// PureComponent 与 Component 的区别： PureComponent内部有shouldComponentUpdate的功能，提升性能
// PureComponent要与immutable相结合 使用immutable数据结构
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic'; // 热门专题
import List from './components//List'; // 文章列表
import Recommend from './components/Recommend'; // 推荐
import DownloadApp from './components/DownloadApp'; // 下载App
import Writer from './components/Writer'; // 推荐作者
import { actionCreaters } from './store';
import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // 性能优化 判断只有和组件相关的数据发生改变时，执行render 否则return false
    // 避免虚拟DOM的比对 提供性能
    should

    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img
                        className="banner-img"
                        src="//upload.jianshu.io/admin_banners/web_images/4681/399c05119c11ec982afaf3cb352ad313ed75cfeb.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
                        alt=''
                    />
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <DownloadApp />
                    <Writer />
                </HomeRight>
                {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>Top</BackTop> : null}
            </HomeWrapper>
        );
    }

    // 返回顶部
    handleScrollTop () {
        window.scrollTo(0, 0);
    }

    // componentDidMount在UI组件中 尽量不要写逻辑 逻辑可以写在mapDispatch中，调用changeHomeData方法
    // componentDidMount中发送AJAX请求
    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvents()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

    bindEvents () {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
}

const mapStateToProps = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatchToProps = (dispatch) => ({
    changeHomeData() {
        dispatch(actionCreaters.getHomeInfo());
    },
    changeScrollTopShow(ev) {
        if (document.documentElement.scrollTop > 200) {
            dispatch(actionCreaters.toggleTopShow(true));
        } else {
            dispatch(actionCreaters.toggleTopShow(false));
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);