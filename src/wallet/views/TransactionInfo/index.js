/**
*  本文件用来显示用户转账（ETH）交易的简要信息
*/
import React,{useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import {utils} from 'ethers'
import {red,green,blue } from '@material-ui/core/colors';
import {getNetworkNameById,shortenAddress,getEtherscanLink} from 'utils'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2),
    },
    submit: {
        fontSize: 18,
        width:"100%",
        textAlign:"center",
        marginTop: theme.spacing(3)
    },
    title:{
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
    },
    progress:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2),
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    info:{
        marginBottom:theme.spacing(1.2),
        marginTop:theme.spacing(1.2),
        width:"100%",
    },
    infoHead:{
        position: "relative",
        width:"80px",

    },
    infoBody:{
        left:"90px",
        position: "relative",
        marginTop:theme.spacing(-2.5),
    },
    statusNormal:{
        marginLeft:theme.spacing(1),
    },
    statusPending:{
        marginBottom:theme.spacing(-0.9),
        marginLeft:theme.spacing(1),
        color:blue[500]
    },
    statusSuccess:{
        marginBottom:theme.spacing(-0.9),
        marginLeft:theme.spacing(1),
        color:green[500]
    },
    statusFailed:{
        marginBottom:theme.spacing(-0.9),
        marginLeft:theme.spacing(1),
        color:red[500]
    }
}));

function TransactionInfo({reverseCallback,tx,amount,symbol}) {
    const classes = useStyles()
    const [state,setState] = useState({pendingOver:false,td:null})
    const {hash,to,chainId,nonce,data,value} = tx
    //这里无法判断代币symbol就叫'ETH'的情况，如果想完善需要再增加一个地址属性
    const isToken = symbol && symbol !== 'ETH'
    const type = symbol ? ( isToken ? "代币转账" : "ETH转账" ) : "合约调用"
    const recipient = isToken ? utils.getAddress(data.substring(34,74)) : to

    const reverseBack = e => {
        if(reverseCallback){
            reverseCallback()
        }
    }

    function getStatus(pendingOver,_status) {
        let result = pendingOver
            ? (_status === 1
                ? {icon: CheckCircleOutline,str:"已完成",status:"success"}
                : {icon: ErrorOutline,str:"失败",status:"failed"})
            : {icon: CircularProgress,str:"pending",status:"pending"}
        return result
    }

    useEffect(()=>{
        if(tx){
            let stale = false
            tx.wait().then(td => {
                if(!stale) {
                    setState({
                        pendingOver:true,
                        td
                    })
                }
            }).catch(err => {})

            return () => {
                stale = true
            }
        }
    },[tx])

    function showInfoItem(header,body,CustomIcon,status) {
        let style_class;
        switch (status) {
            case 'pending':
                style_class = classes.statusPending
                break;
            case 'failed':
                style_class = classes.statusFailed
                break;
            case 'success':
                style_class = classes.statusSuccess
                break;
            default:
                style_class = classes.statusNormal
        }

        return (
            <div className={classes.info}>
                <div className={classes.infoHead}>
                    {header + ":"}
                </div>
                <div className={classes.infoBody}>
                    {status && <CustomIcon size={status === 'pending' ? "1.5rem" : 'normal'} className={style_class} /> }
                    <span className={style_class}>
                        {body}
                    </span>
                </div>
            </div>
        )
    }



    const {pendingOver,td} = state
    const url = getEtherscanLink(chainId,hash,'transaction')
    const component_a = <a href={url} rel="noopener noreferrer" target='_blank'>EtherScan上查看</a>
    const {icon,str,status} = getStatus(pendingOver,td ? td.status : "0")
    return (
        <div className={classes.container}>
            <Typography variant="h5" className={classes.title} align='center' color='textPrimary'>
                简要交易信息
            </Typography>
            {showInfoItem('交易网络',getNetworkNameById(chainId))}
            {showInfoItem('交易哈希',shortenAddress(hash,12))}
            {showInfoItem('nonce',nonce)}
            {showInfoItem('交易类型',type)}
            {showInfoItem(symbol ? '接收地址' : "合约地址",shortenAddress(recipient,12))}
            {showInfoItem('转账数量', (isToken ? amount : utils.formatEther(value))  + " " + (isToken ? symbol : "ETH"))}
            {showInfoItem('查看详情',component_a)}
            {showInfoItem('交易状态',str,icon,status)}
            <div className={classes.progress}>
                <LinearProgress variant={pendingOver ? "determinate":"indeterminate" } value={100}/>
                <LinearProgress variant={pendingOver ? "determinate":"indeterminate" } color="secondary" value={100} />
            </div>
            <div className={classes.submit}>
                <Button variant="contained" color="primary" style={{width:"40%"}} onClick={reverseBack} >
                    返回
                </Button>
            </div>
        </div>
    )
}

export default TransactionInfo
