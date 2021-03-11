import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreaters } from './store';
import { actionCreaters as loginActionCreaters } from '../../pages/login/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRedo, faAd, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList,
    Addition,
    Button,
    SearchWrapper
} from './style';


class Header extends Component {
    getListArea = () => {
        const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
        const newList = list.toJS()
        const pageList = [];
        if (newList.length) {
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }

        if (focused || mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch
                            onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
                        >
                            <FontAwesomeIcon
                                icon={faRedo}
                                className='redoFont'
                            />
                            <span
                                ref={(icon) => { this.spinIcon = icon }}
                                className="iconfont spin"
                            ></span>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null;
        }
    }

    render() {
        const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props;
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo />
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>
                        <FontAwesomeIcon icon={faAd} className='adFont' />
                        {/* <span className="iconfont">&#xe618;</span> */}
                    </NavItem>
                    {
                        login ?
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
                        <FontAwesomeIcon
                            icon={faSearch}
                            className={focused ? 'focused searchFont zoom' : 'searchFont zoom'}
                        />

                        {/* 聚焦显示热门搜索 */}
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className='reg'>注册</Button>
                    <Link to='/write'>
                        <Button className='writting'>
                            <FontAwesomeIcon icon={faPen} className='writtingFont' />
                            {/* <span className="iconfont writtingIcon"></span> */}
                            写文章
                        </Button>
                    </Link>
                </Addition>
            </HeaderWrapper>
        );
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
        logout() {
            dispatch(loginActionCreaters.logout())
        }
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Header);