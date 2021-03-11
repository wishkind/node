import React, {useEffect,useState, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useGlobal,useUpdateGlobal} from 'contexts/GlobalProvider'
import {useErc20Tokens,useUpdateErc20Balance} from 'contexts/StorageProvider'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import {useBalance} from 'contexts/BalancesProvider';
import {convertToEth,getErc20Token,getTokenBalance,convertBigNumberToFixed} from 'utils';
import {useAddressIcon} from 'hooks'
import {utils} from 'ethers'
import etherIcon from  'components/assets/ether.png';
import { withRouter } from "react-router";
import blue from '@material-ui/core/colors/blue';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width:"100%"
    },
    avatar: {
        border: 1,
        borderStyle: "solid",
        borderColor: "#33333333",
        marginTop: theme.spacing(3),
        width: theme.spacing(7),
        height: theme.spacing(7),
   },
   balanceText:{
       marginTop: theme.spacing(3),
   },
   sendBtn:{
       width:"40%",
       marginTop:theme.spacing(2.5),
       marginBottom:theme.spacing(3.5),
       "&:disabled":{
           color:"white",
           background:blue[200]
       }
   },
   iconWrapper:{
       marginTop: theme.spacing(3),
   }
}));


//每分钟定时查询ETH价格
const INTERVAL = 60000;
const ICON_SIZE = 50;
//只有主网络才有查询并显示ETH价格的必要
const MAINNET = 'homestead'
//eth_price_query_url
const CN_ETHERSCAN_QUERY_URL = 'https://api-cn.etherscan.com/api?module=stats&action=ethprice&apikey=38UNH5HC9ENCHKGZ5HHXG2TAB4Z9W1NDT3'

function DetailBody({history}) {
    const classes = useStyles()
    const {network,wallet,ethPrice,tokenSelectedIndex,provider} = useGlobal()
    const {address} = wallet
    const balance = useBalance(address,network)
    const updateGlobal = useUpdateGlobal()
    const tokens = useErc20Tokens(address,network)
    const updateTokenBalance = useUpdateErc20Balance()
    const [isRefresh,setIsRefresh] = useState(false)
    const isToken = tokenSelectedIndex !== 0
    const token = tokens[tokenSelectedIndex-1] || {}
    const showBalace = isToken ? token.balance : balance

    const onSend = e => {
        e.preventDefault()
        history.push('/send')
    }

    //更新ETH价格，每一分钟更新一次
    useEffect(()=>{
        if(network === MAINNET && tokenSelectedIndex === 0){
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
                } ).catch(() =>{})
            }
            getPrice()
            let interval = setInterval(getPrice,INTERVAL)

            //进行相关清理
            return () =>{
                stale = true
                clearInterval(interval)
            }
        }
    },[network,updateGlobal,tokenSelectedIndex])

    //每次切换网络或者用户时，更新刷新状态
    useEffect(()=> {
        if(wallet && network){
            setIsRefresh(false)
        }

    },[wallet,network])

    //监听用户代币变化
    useEffect(()=>{
        if(tokenSelectedIndex > 0) {
            let stale = false
            let token = tokens[tokenSelectedIndex -1]
            let contract = getErc20Token(token.address,network,wallet,provider)
            function getBalance(cb) {
                getTokenBalance(contract,wallet.address).then(_balance => {
                    if(!stale) {
                        if(cb){
                            cb()
                        }
                        updateTokenBalance(wallet.address,network,contract.address,_balance)
                    }
                })
            }
            if(contract) {
                let filter1 = contract.filters.Transfer(wallet.address,null)
                let filter2 = contract.filters.Transfer(null,wallet.address)
                // eslint-disable-next-line
                contract.on(filter1,(from,to,amount,event) => {
                    getBalance()
                })
                contract.on(filter2,(from,to,amount,event) => {
                    getBalance()
                })
                if(!isRefresh) {
                    getBalance(()=> {setIsRefresh(true)})
                }
            }
            return () => {
                stale = true
                contract.removeAllListeners('Transfer')
            }
        }
    },[tokens,network,wallet,updateTokenBalance,provider,tokenSelectedIndex,isRefresh])

    function showTokenDetail(index) {
        const token = tokens[index]
        const balance_str = convertBigNumberToFixed(utils.bigNumberify(token.balance),token.decimals).toFixed(3) + " " + token.symbol
        return (
            <>
                <div className={classes.iconWrapper} >
                    <TokenIcon tokenAddress={token.address} />
                </div>

                <ListItemText className={classes.balanceText}
                    primary={<Typography variant="h6"  align='center' color='textPrimary'>
                                {balance_str}
                            </Typography>}
                    secondary = {<Typography variant="body1" align='center' color='textSecondary'>
                                    <span>&nbsp;</span>
                                </Typography>}
                />
                <Button
                    variant="contained"
                    color='primary'
                    disabled={token.balance===undefined}
                    className={classes.sendBtn}
                    onClick={onSend}
                >
                    {token.balance===undefined ? "余额获取中" : "发送"}
                </Button>
            </>
        )
    }

    function showEtherDetail() {
        return (
            <>
                <Avatar alt="Ether Logo" src={etherIcon} className={classes.avatar} />
                <ListItemText className={classes.balanceText}
                    primary={<Typography variant="h6"  align='center' color='textPrimary'>
                                {`${convertToEth(balance).toFixed(4)} ETH`}
                            </Typography>}
                    secondary = {<Typography variant="body1" align='center' color='textSecondary'>
                                    {network === MAINNET ? (`$${(convertToEth(balance) * ethPrice).toFixed(2)} USD`) : <span>&nbsp;</span>}
                                </Typography>}
                />
                <Button className={classes.sendBtn} onClick={onSend} disabled={showBalace===undefined} variant="contained" color='primary' >
                    {showBalace===undefined ? "余额获取中" : "发送"}
                </Button>
            </>
        )
    }

    return (
        <div className={classes.container}>
            {tokenSelectedIndex === 0 && showEtherDetail()}
            {tokenSelectedIndex !== 0 && showTokenDetail(tokenSelectedIndex -1)}
        </div>
    )
}

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

export default withRouter(DetailBody)
