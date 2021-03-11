import React, {useState, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useGlobal} from 'contexts/GlobalProvider'
import DehazeIcon from '@material-ui/icons/Dehaze';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import CallMadeIcon from '@material-ui/icons/CallMade';
import DescriptionIcon from '@material-ui/icons/Description';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import copy from 'copy-to-clipboard';
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import { isMobile } from 'react-device-detect';
import { withRouter } from "react-router";
import {shortenAddress,getEtherscanLink,getChainIdByNetwork} from 'utils'
import AccountDetail from '../AccountDetail'

const COPY_TO_CLIPBOARD = '复制到剪贴板'
const COPIED = '已复制'
const useStyles = makeStyles(theme => ({
    Container:{
        display: 'flex',
        justifyContent: 'space-between',
        width:"100%"
    },
    accountWrapper:{
        marginTop:theme.spacing(-1),
        marginBottom:theme.spacing(1)
    },
    accountBtn:{
        paddingLeft:theme.spacing(3),
        paddingRight:theme.spacing(3),
        borderRadius:20,
    },
    icon:{
        marginRight:theme.spacing(2),
    },
    menuPaper:{
        border: '1px solid #d3d4d5',
        backgroundColor:"#000000BB",
        color:'white'
    }
}));

function  DetailHeader({history}) {
    const classes = useStyles();
    const {wallet,network} = useGlobal();
    const {address} = wallet;
    const [clickTip,setClickTip] = useState(COPY_TO_CLIPBOARD)
    const showSnackbar = useSimpleSnackbar()
    const anchorRefAccount = useRef(null)

    const [state,setState] = useState({
        accountOpen:false,
        accountDetail:false,
    })

    //copy地址并提示
    const copyAddress = (e) => {
        e.preventDefault()
        if(copy(address)){
           if(isMobile) {
               showSnackbar(COPIED,'info')
           }else{
               setClickTip(COPIED)
           }
        }
    }
    ///地址已经复制提示关闭时重置
    const closeAddressTip = e => {
        if(clickTip === COPY_TO_CLIPBOARD) {
            return
        }
        e.preventDefault()
        setTimeout(()=>{
            setClickTip(COPY_TO_CLIPBOARD)
        },500)
    }
    //显示token列表
    const showTokenList = () => {
        history.push('/token')
    }

 ///////////////////////////////////以下实现右边的账号菜单逻辑//////////////////////////
    //弹出账号菜单
    const showAccountMenu = event => {
        event.preventDefault()
        setState({
            ...state,
            "accountOpen":true
        })
    }
    //关闭账号菜单
    const handleCloseAccount = event => {
        if (anchorRefAccount.current && anchorRefAccount.current.contains(event.target)) {
            return;
        }
        setState({
            ...state,
            "accountOpen":false
        })
    }
    //按键关闭账号菜单
    const handleListKeyDownAccount = event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setState({
                ...state,
                "accountOpen":false
            })
        }
    }
    //显示账号详情
    const showAccountDetail = event => {
        setState({
            ...state,
            "accountOpen":false,
            "accountDetail":true,
        })
    }
    //关闭账号详情界面
    const handleCloseDetail = () => {
        setState({
            ...state,
            "accountDetail":false
        })
    }
    //在etherscan上查看
    const viewScan = event => {
        let chainId = getChainIdByNetwork(network)
        let url = getEtherscanLink(chainId,address,'address')
        window.open(url)
        setState({
            ...state,
            "accountOpen":false,
            "accountDetail":false,
        })
    }

    const {accountOpen,accountDetail} = state
    return (
        <div className={classes.Container}>
            {/* 未知原因:在容器布局为flex时必须再包装一个div,否则IconButton的背景会失真 */}
            <div>
                <Tooltip title="菜单" arrow >
                    <IconButton color="inherit" aria-label="Menu" onClick={showTokenList} >
                        <DehazeIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div className={classes.accountWrapper}>
                <Tooltip title={clickTip} onClose={closeAddressTip} arrow >
                    <Button onClick={copyAddress} className={classes.accountBtn}>
                        <ListItemText  primary="我的账号" secondary={shortenAddress(address)}
                        />
                    </Button>
                </Tooltip>
            </div>
            <div>
                <Tooltip title="账号选项" arrow >
                    <IconButton
                        ref={anchorRefAccount}
                        aria-controls={accountOpen ? 'menu-list-grow' : undefined}
                        color="inherit" aria-label="Menu"
                        aria-haspopup="true"
                        onClick={showAccountMenu}
                    >
                        <MoreHorizIcon/>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="customized-menu-account"
                    anchorEl={anchorRefAccount.current}
                    keepMounted
                    open={accountOpen}
                    onClose={handleCloseAccount}
                    onKeyDown={handleListKeyDownAccount}
                    classes={{
                        paper:classes.menuPaper
                    }}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={showAccountDetail}>
                        <DescriptionIcon className={classes.icon} /> 账户详情
                    </MenuItem>
                    <MenuItem onClick={viewScan}>
                        <CallMadeIcon  className={classes.icon} /> 在Etherscan上查看
                    </MenuItem>
                </Menu>
            </div>
            {/* 这里做了一点小修改，不用每次渲染时生成一个新的详情面板，相应的，AccountDetail里的代码也要会做一些小修改，主要是关闭弹框时重置状态 */}
            { <AccountDetail open={accountDetail} closeCallback={handleCloseDetail} />}
        </div>
    )
}

export default withRouter(DetailHeader)
