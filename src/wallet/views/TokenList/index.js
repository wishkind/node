import React ,{useRef, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CopyIcon from '@material-ui/icons/FileCopy'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import CallMadeIcon from '@material-ui/icons/CallMade'
import {useGlobal,useUpdateGlobal} from 'contexts/GlobalProvider';
import {useErc20Tokens,useRemoveErc20Token,useErc721Tokens,useRemoveErc721Token,useUpdateAll721Tokens,
    useUpdateAllTokens,useUpdateErc20Balance,useUpdateErc721Balance} from 'contexts/StorageProvider'
import {useBalance} from 'contexts/BalancesProvider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import etherIcon from  'components/assets/ether.png';
import Avatar from '@material-ui/core/Avatar';
import copy from 'copy-to-clipboard';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isMobile } from 'react-device-detect';
import {useAddressIcon} from 'hooks'
import {shortenAddress,convertToEth,getEtherscanLink,getTokenBalance,
    convertBigNumberToFixed,getErc20Token,getErc721Token,getSupportInterface} from 'utils'
import {utils} from 'ethers'
import AccountDetail from 'components/AccountDetail'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios'
import {_INTERFACE_ID_TOKEN_BALANCES,_INTERFACE_ID_ERC721_ENUMERABLE} from '../../constants'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height:500,
        maxHeight:500,
        overflowY:'scroll',
    },
    iconWrapper:{
        width:"100%",
        textAlign:"center",
        position:"relative",
        marginBottom:theme.spacing(1)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0.5),
        top: theme.spacing(0.5),
        color: theme.palette.grey[500],
    },
    detailBtn: {
        marginTop: theme.spacing(1),
        color:"#64b5f6",
        border: '2px solid ',
        borderRadius:"15px",
        marginBottom: theme.spacing(2),
    },
    address:{
        cursor:"pointer",
        fontSize:"15px",
        display:"flex",
        backgroundColor:"#bdbdbd55",
        padding:"5px 10px",
        marginBottom:theme.spacing(1),
        alignItems:"center"
    },
    copyBtn:{
        marginLeft:theme.spacing(0.8),
    },
    avatar: {
        border: 1,
        borderStyle: "solid",
        borderColor: "#33333333",
        backgroundColor:"white",
        marginRight: theme.spacing(3),
        width: 50,
        height: 50,
   },
   tokenIcon:{
       marginLeft: theme.spacing(3),
   },
   tokenIconTwo:{
       marginLeft: theme.spacing(2),
   },
   itemPad:{
       paddingTop:theme.spacing(2),
       paddingBottom:theme.spacing(2),
   },
   itemPadTwo:{
       paddingTop:theme.spacing(2),
       marginLeft:theme.spacing(-3),
       paddingBottom:theme.spacing(2),
   },
   itemContext:{
       width:"100%",
       display:"flex",
       justifyContext:'left'
   },
   menuPaper:{
       border: '1px solid #d3d4d5',
       backgroundColor:"#000000BB",
       color:'white'
   },
   idWrapper:{
       marginLeft:theme.spacing(-2),
       // width:"100%",
       textAlign:"left"
   },
   tabWrapper:{
       width:"100%",
       textAlign:"left",
       marginLeft:theme.spacing(2),
   },
   icon:{
       marginRight:theme.spacing(2),
   },
   tipTitle:{
       color: theme.palette.grey[500],
       margin:theme.spacing(2),
       marginBottom:theme.spacing(1),
       fontWeight:"bold"
   },
   tipTitleTwo:{
       margin:theme.spacing(1),
       color: theme.palette.grey[500],
   },
   addBtn:{
       color:"#64b5f6",
       // margin:theme.spacing(1),
   },
   removeTitle:{
       margin:theme.spacing(-1),
   },
   removeIcon:{
       margin:theme.spacing(-1),
   },
   removeSymbol:{
       marginTop:theme.spacing(-1),
   }
}));
const ICON_SIZE = 50;
const COPY_TO_CLIPBOARD = '复制到剪贴板'
const COPIED = '已复制'
//每分钟定时查询ETH价格
const INTERVAL = 60000;
//只有主网络才有查询并显示ETH价格的必要
const MAINNET = 'homestead'
//eth_price_query_url
//这里YourApiKeyToken要替换成你自己的ApiKey
const CN_ETHERSCAN_QUERY_URL = 'https://api-cn.etherscan.com/api?module=stats&action=ethprice&apikey=YourApiKeyToken'

//代币子菜单选项
const token_menu_init = {
    selectedIndex:0,        //选中代币的索引
    anchorEl:null,     //当前点击的按钮，用来控制菜单的显示
    showRemove:false,       //显示移除代币对话框
}

const MAX_INT = utils.bigNumberify(10 ** 15)

function TokenList({onClose,openAdd,token_type}) {
    const classes = useStyles();
    //全局变量获取当前网络、账号、钱包和eth价格等,当前主界面显示的token的地址等
    const {wallet,network,tokenSelectedIndex,nftTokenSelectedIndex,ethPrice,provider} = useGlobal();
    const updateGlobal = useUpdateGlobal()
    const {address} = wallet;
    const balance = useBalance(address,network)
    const icon = useAddressIcon(address,ICON_SIZE)
    const showSnackbar = useSimpleSnackbar()
    const removeToken = useRemoveErc20Token()
    const updateTokenBalance = useUpdateErc20Balance()
    const updateAllTokens = useUpdateAllTokens()
    const [tokenType,setTokenType] = useState(token_type)
    const [isRefresh,setIsRefresh] = useState(false)
    const [show721List,setShow721List] = useState(false)
    const [showIds,setShowIds] = useState([])
    const [circleOpen,setCircleOpen] = useState(false)
    //显示用户账号图标
    const ref = useRef()
    const [tokenMenu,setTokenMenu] = useState(token_menu_init)
    //用户详情界面是否打开
    const [openDetail,setOpenDetail] = useState(false)
    //点击地址复制时的提示
    const [clickTip,setClickTip] = useState(COPY_TO_CLIPBOARD)
    //获取用户所有20代币
    const tokens = useErc20Tokens(address,network)
    const nfTokens = useErc721Tokens(address,network)
    const [selectedToken,setSelectedToken] = useState(null)
    const token_name = tokenType === 0 ? "代币" : "藏品"
    //代币列表同时显示ETH
    let alltokens = [{
        address:'eth',
        balance,
        symbol:"ETH",
        decimals:18
    }].concat(tokens)

    //关闭本页面，回到钱包主界面
    const handleClose = e => {
        e.preventDefault()
        if(onClose) {
            onClose()
        }
    }
    //处理增加代币点击
    const handleAdd = e => {
        e.preventDefault()
        if(openAdd) {
            openAdd(tokenType)
        }
    }
    //显示账号详情
    const showDetail = () => {
        setOpenDetail(true)
    }
    //关闭账号详情
    const hideDetail = () => {
        setOpenDetail(false)
    }
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
    ///地址复制提示关闭时重置
    const closeAddressTip = e => {
        e.preventDefault()
        if(clickTip === COPY_TO_CLIPBOARD) {
            return
        }
        setTimeout(()=>{
            setClickTip(COPY_TO_CLIPBOARD)
        },500)
    }
////////////////////////////////以下实现代币子菜单功能/////////////////////////////
    //todo 点击代币
    const clickItem = index => () => {
        if(index === tokenSelectedIndex) {
            return
        }
        updateGlobal({
            tokenSelectedIndex:index
        })
        if(onClose) {
            onClose()
        }
    }

    const click721Item = index  => async () => {
        let token = nfTokens[index]
        if(token.balance <= 0) {
            return showSnackbar("你没有该藏品")
        }
        //获取所有ID
        setCircleOpen(true)
        setSelectedToken(token)
        let allIds = []
        let contract = getErc721Token(token.address,network,wallet,provider)
        try{
            let ids_flag = await getSupportInterface(contract,_INTERFACE_ID_TOKEN_BALANCES)
            if(ids_flag) {
                allIds  = await contract.getBalances(address);
            }
        }catch(err) {
            console.log("不支持直接获取所有ID")
        }
        if(allIds.length === 0) {
            try{
                let enum_flag = await getSupportInterface(contract,_INTERFACE_ID_ERC721_ENUMERABLE)
                if(enum_flag) {
                    let allPromise = []
                    for(let i=0;i<token.balance;i++)
                        allPromise.push(contract.tokenOfOwnerByIndex(address,i))
                    Promise.all(allPromise).then(results =>{
                        setCircleOpen(false)
                        setShowIds(results)
                        setShow721List(true)
                    }).catch(err2  => setCircleOpen(false))
                }else{
                    setCircleOpen(false)
                    return showSnackbar("该藏品不支持列举")
                }
            }catch(err) {
                setCircleOpen(false)
                return showSnackbar("该藏品不支持列举")
            }
        }else{
            setCircleOpen(false)
            setShowIds(allIds)
            setShow721List(true)
        }
    }

    //
    const handleListKeyDownTokens = event => {
        if (event.key === 'Tab') {
            hideTokenMenu(event)
        }
    }
    //关闭每一个代币上的菜单
    const hideTokenMenu = e => {
        e.preventDefault()
        setTokenMenu({
            ...tokenMenu,
            anchorEl:null
        })
    }
    //显示每一个代币上的菜单
    const showTokenMenu = e => {
        let index =  + e.currentTarget.value

        setTokenMenu({
            ...tokenMenu,
            selectedIndex:index,
            anchorEl:e.currentTarget
        })
    }
    //在ETHERSCAN上显示代币信息，而不是显示地址信息
    const showTokenOnEtherscan = e => {
        let token = alltokens[tokenMenu.selectedIndex]
        let url = getEtherscanLink(network,token.address,'token')
        hideTokenMenu(e)
        window.open(url)
    }
    //显示移除对话框
    const showRemoveDialog = e => {
        e.preventDefault()
        setTokenMenu({
            ...tokenMenu,
            anchorEl:null,
            showRemove:true
        })
    }
    //隐藏移除对话框
    const hideRemoveDiaglog = () => {
        setTokenMenu({
            ...tokenMenu,
            showRemove:false
        })
    }
    const handleChange = (event, newValue) => {
        if(tokenType === newValue) {
            return;
        }
        setTokenType(newValue);
    };
////////////////////////////////代币子菜单功能实现结束/////////////////////////////

    //添加用户账号的图标
    useEffect(()=>{
        if(ref.current) {
            ref.current.appendChild(icon)
        }
    },[icon])

    // 更新ETH价格，每一分钟更新一次
    useEffect(()=>{
        if(network === MAINNET && token_type === 0){
            let stale = false
            function getPrice() {
                axios.get(CN_ETHERSCAN_QUERY_URL).then(rep => {
                    if(rep.data.status === '1'){
                        let price = rep.data.result.ethusd
                        if(!stale){
                            updateGlobal({
                                ethPrice: + price
                            })
                        }
                    }
                }).catch(() =>{})
            }
            getPrice()
            let interval = setInterval(getPrice,INTERVAL)

            //进行相关清理
            return () =>{
                stale = true
                clearInterval(interval)
            }
        }
    },[network,updateGlobal,token_type])

    //每次切换网络或者用户时，更新刷新状态
    useEffect(()=> {
        if(wallet && network){
            setIsRefresh(false)
        }
    },[wallet,network])


    //获取用户代币余额和听用户代币余额变化
    useEffect(()=>{
        if(tokens.length > 0 && token_type === 0) {
            let stale = false
            let allContracts = []
            for (let token of tokens) {
                allContracts.push(getErc20Token(token.address,network,wallet,provider))
            }
            let allPromise = []
            let len = allContracts.length;

            function getBalance(_contract) {
                getTokenBalance(_contract,wallet.address).then(_balance => {
                    if(!stale) {
                        updateTokenBalance(wallet.address,network,_contract.address,_balance)
                    }
                })
            }

            for (let i=0; i<len; i++) {
                let contract = allContracts[i]
                allPromise.push(getTokenBalance(contract,wallet.address))
                let filter1 = contract.filters.Transfer(wallet.address,null)
                let filter2 = contract.filters.Transfer(null,wallet.address)
                // eslint-disable-next-line
                contract.on(filter1,(from,to,amount,event) => {
                    getBalance(contract)
                })
                // eslint-disable-next-line
                contract.on(filter2,(from,to,amount,event) => {
                    getBalance(contract)
                })
            }
            //每次打开界面时只更新一次代币余额
            if(!isRefresh) {
                Promise.all(allPromise).then(results => {
                    //更新所有代币余额
                    for(let i=0;i<len;i++) {
                        tokens[i].balance = results[i]
                    }
                    if(!stale) {
                        setIsRefresh(true)
                        updateAllTokens(wallet.address,network,tokens)
                    }
                }).catch( () =>{})
            }

            return () => {
                stale = true
                for (let contract of allContracts) {
                    contract.removeAllListeners('Transfer')
                }
            }
        }
    },[tokens,network,wallet,updateTokenBalance,provider,updateAllTokens,isRefresh,token_type])

    function removeDiaglog() {
        const {showRemove,selectedIndex} = tokenMenu
        if(selectedIndex === 0){
            return null
        }
        const index = selectedIndex-1
        const {address,symbol} = tokens[index]
        function doRemove() {
            removeToken(wallet.address,network,index)
            if(selectedIndex === tokenSelectedIndex) {
                updateGlobal({
                    tokenSelectedIndex:0
                })
            }
            setTokenMenu(token_menu_init)
        }

        return (
            <Dialog
                fullWidth
                maxWidth='xs'
                open={showRemove}
                onClose={hideRemoveDiaglog}
                aria-labelledby="remove-dialog-title"
                aria-describedby="remove-dialog-description"
            >
                <DialogTitle align='center' className={classes.removeTitle}>
                    隐藏{token_name}？
                </DialogTitle>
                {symbol !=='ETH' && <DialogTitle align='center' className={classes.removeIcon}>
                            <TokenIcon tokenAddress={address} size={ICON_SIZE-10}/>
                          </DialogTitle>
                }
                <Typography variant='body2' align='center' className={classes.removeSymbol}>
                    {symbol}
                </Typography>
                <DialogContent>
                    <DialogContentText align='center' style={{margin:"10px",width:"80%",fontSize:"14px"}}>
                        之后你还可以通过账户选项菜单中的“添加{token_name}”来添加此{token_name}
                    </DialogContentText>
                    <div style={{width:"100%",textAlign:"center"}}>
                        <Button variant='outlined' color='inherit' onClick={hideRemoveDiaglog} style={{margin:"10px",width:"30%"}}>
                            取消
                        </Button>
                        <Button variant='outlined' color='primary' style={{margin:"10px",width:"30%"}} onClick={doRemove}>
                            隐藏
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    function show721ListDetail() {
        return(
            <List component="nav" style={{width:"100%"}}>
                {nfTokens.map( (token,index) => {
                    return (
                        <ListItem
                            disableRipple
                            button
                            key={token.address}
                            className={classes.itemPad}
                        >

                            <TokenIcon tokenAddress={token.address} />
                            <ListItemText
                                className = {classes.tokenIcon}
                                onClick={click721Item(index)}
                                primary={
                                    <Typography variant='h6' align='left'>
                                        {token.balance + " " + token.symbol}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant='h6' align='left'>
                                         {token.name}
                                    </Typography>
                                }
                            >
                            </ListItemText>
                            <IconButton
                                style={{float:"right"}}
                                aria-controls={Boolean(tokenMenu.anchorEl) ? 'customized-token-munu' : undefined}
                                color="inherit" aria-label="Menu"
                                aria-haspopup="true"
                                value={index}
                                onClick={showTokenMenu}
                            >
                                <MoreHorizIcon/>
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    function show20List() {
        return (
            <List component="nav" style={{width:"100%"}}>
                {alltokens.map( (token,index) => {
                    const isToken = token.address !== 'eth'
                    return (
                        <ListItem
                            disableRipple
                            button
                            selected={index === tokenSelectedIndex}
                            key={token.address}
                            className={classes.itemPad}
                        >
                            {!isToken && <Avatar alt="Ether Logo" src={etherIcon} className={classes.avatar} />}
                            { isToken && <TokenIcon tokenAddress={token.address} /> }
                            <ListItemText
                                className = {isToken ? classes.tokenIcon : "none"}
                                onClick={clickItem(index)}
                                primary={
                                    <Typography variant='h6' align='left'>
                                        { isToken
                                            ? convertBigNumberToFixed(utils.bigNumberify(token.balance),token.decimals).toFixed(3)
                                            : convertToEth(balance).toFixed(4) + " " +  token.symbol
                                        }
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant={isToken ? 'h6' : 'body1'} align='left'>
                                                { isToken
                                                    ? token.symbol
                                                    : network===MAINNET
                                                        ? `$${(convertToEth(balance) * ethPrice).toFixed(2)} USD`
                                                        : <>&nbsp;</> }
                                    </Typography>
                                }
                            >
                            </ListItemText>
                            {isToken && <IconButton
                                style={{float:"right"}}
                                aria-controls={Boolean(tokenMenu.anchorEl) ? 'customized-token-munu' : undefined}
                                color="inherit" aria-label="Menu"
                                aria-haspopup="true"
                                value={index}
                                onClick={showTokenMenu}
                            >
                                <MoreHorizIcon/>
                            </IconButton>}
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    function close721Dialog() {
        setShow721List(false)
        setTimeout(()=>{
            setSelectedToken(null)
            setShowIds([])
        },300)
    }

    function view721Dialog(){
        return (
            <Dialog
                fullWidth
                maxWidth='xs'
                open={show721List}
                onClose={close721Dialog}
                aria-labelledby="remove-dialog-title"
                aria-describedby="remove-dialog-description"
            >
                <DialogTitle align='center' className={classes.removeTitle}>
                    {selectedToken ? (selectedToken.symbol + "一览") : " " }
                </DialogTitle>

                <DialogContent>
                    {selectedToken && showIds.map(id => (
                        <ListItem
                            disableRipple
                            button
                            key={id.toString()}
                            className={classes.itemPadTwo}
                        >

                               <TokenIcon tokenAddress={selectedToken.address} />
                               <ListItemText
                                   className={classes.tokenIconTwo}
                                   primary={
                                       <Typography variant='body1' align='left'>
                                           藏品ID:
                                       </Typography>
                                   }
                                   secondary={
                                       <Typography  align='left' style={{fontSize:id.gt(MAX_INT) ? 10:14}}>
                                               {id.gt(MAX_INT) ? id.toHexString() : id.toString() }
                                       </Typography>
                                   }
                               >
                               </ListItemText>



                        </ListItem>
                    ))}
                </DialogContent>
            </Dialog>
        )
    }


    return(
        <div className={classes.container}>
            <div ref={ref} className={classes.iconWrapper}>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Typography variant='h5' align='center' gutterBottom>
                我的账号
            </Typography>
            <Button
                variant="outlined"
                size="small"
                aria-label="add"
                className={classes.detailBtn}
                onClick={showDetail}
            >
              详情
            </Button>
            <Tooltip title={clickTip} onClose={closeAddressTip} arrow >
                <div className={classes.address} onClick={copyAddress}>
                    {shortenAddress(address,4)}<CopyIcon fontSize='inherit' className={classes.copyBtn} />
                </div>
            </Tooltip>
            <div className={classes.tabWrapper}>
                <Tabs value={tokenType} onChange={handleChange}>
                    <Tab label="代币" />
                    <Tab label="藏品" />
                </Tabs>
            </div>
            {tokenType === 0 && show20List()}
            {tokenType === 1 && show721ListDetail()}
            <Typography variant='h5' align='center' className={classes.tipTitle}>
                无法看到你的{token_name}?
            </Typography>
            <Typography variant='body2' align='center'  className={classes.tipTitleTwo}>
                点击&nbsp;添加{token_name}&nbsp;将其加入您的个人账户
            </Typography>
            <Button className={classes.addBtn} onClick={handleAdd}>
                添加{token_name}
            </Button>
            <Menu
                id="customized-token-munu"
                anchorEl={tokenMenu.anchorEl}
                keepMounted
                open={Boolean(tokenMenu.anchorEl)}
                onClose={hideTokenMenu}
                onKeyDown={handleListKeyDownTokens}
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
                  vertical: 'center',
                  horizontal: 'right',
                }}
            >
                <MenuItem onClick={showRemoveDialog}>
                    <RemoveCircleIcon className={classes.icon} /> 隐藏{token_name}
                </MenuItem>
                <MenuItem onClick={showTokenOnEtherscan}>
                    <CallMadeIcon  className={classes.icon} /> 在Etherscan上查看
                </MenuItem>
            </Menu>
            { <AccountDetail open={openDetail} closeCallback={hideDetail} />}
            { tokens.length !== 0 && removeDiaglog()}
            {view721Dialog()}
            <Dialog
                fullWidth
                maxWidth='xs'
                open={circleOpen}
                aria-labelledby="alert-dialog-title-circle"
                aria-describedby="alert-dialog-description-circle"
            >
                <DialogContent align='center'>
                    <div>
                        正在获取中...
                    </div>
                 <br />
                    {circleOpen && <CircularProgress />}
                    <div>
                        &nbsp;
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

//专门用来显示代币图标的组件
function TokenIcon({tokenAddress,size=ICON_SIZE}) {
    const iconToken = useAddressIcon(tokenAddress,size)
    const refToken = useRef()

    useEffect(()=>{
        if(refToken.current) {
            refToken.current.appendChild(iconToken)
        }
    },[iconToken])

    return (
        <div ref={refToken} />
    )
}

export default TokenList
