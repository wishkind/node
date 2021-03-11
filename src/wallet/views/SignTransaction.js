import React, {useState,useEffect,useRef} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { withRouter } from "react-router";
import {useGlobal,useUpdateGlobal} from 'contexts/GlobalProvider'
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import {utils,constants} from 'ethers'
import {useAccountAmount} from 'contexts/StorageProvider';
import { purple,green,blue,red,pink,grey } from '@material-ui/core/colors';
import {convertQuery,shortenAddress,getNetworkNameById,getNetworkByChainId} from 'utils'
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from 'components/Logo'
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Avatar from '@material-ui/core/Avatar';
import {useAddressIcon} from 'hooks'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import etherIcon from  'components/assets/ether.png';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {ethers} from 'ethers'

const ICON_SIZE = 50
const ZERO_ADDRESS = constants.AddressZero

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        flexGrow: 1
    },
    containerHeader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    iconColor0:{
        marginTop:theme.spacing(1),
        color:green[500],
    },
    iconColor1:{
        marginTop:theme.spacing(1),
        color:blue[500],
    },
    iconColor2:{
        marginTop:theme.spacing(1),
        color:red[500],
    },
    iconColor3:{
        marginTop:theme.spacing(1),
        color:purple[500],
    },
    network:{
        backgroundColor:pink[50],
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2),
    },
    netText:{
        position:'relative',
        top:theme.spacing(-0.7),
    },
    address:{
        position:'relative',
        marginLeft:theme.spacing(1),
        top:theme.spacing(0.5),
    },
    address2:{
        position:'relative',
        marginLeft:theme.spacing(1),
        top:theme.spacing(0.8),
    },
    containerBody: {
        display: 'flex',
        flexDirection: 'column',
        width:"100%",
        alignItems: 'center',
        margin: theme.spacing(1)
    },
    divider:{
        width:"100%",
    },
    valueWrap:{
        display: 'flex',
        backgroundColor:theme.palette.background.default,
        flexDirection: 'column',
        width:"100%",
        alignItems: 'left',
    },
    tx_intro:{
        margin:theme.spacing(2.5),
        marginBottom:0
    },
    formWrapper:{
        margin:theme.spacing(2.5),
        marginTop:theme.spacing(1.5),
    },
    form:{
        width: '100%', // Fix IE 11 issue.
    },
    avatar: {
        border: 1,
        borderStyle: "solid",
        borderColor: "#33333333",
        backgroundColor:theme.palette.background.paper,
        marginLeft:theme.spacing(2),
        marginRight:theme.spacing(2),
        width: 30,
        height: 30,
   },
   addressWrap:{
       display:'flex',
       width:"30%",
   },
   boxStyle:{
       display:'flex',
       width:"100%",
       justifyContent:"center",
       margin: theme.spacing(0.5),
       // marginBottom: theme.spacing(0),
   },
   tip:{
       border: 1,
       borderStyle: "solid",
       position:"relative",
       top:theme.spacing(-1),
       // backgroundColor:pink[50],
       borderColor: "#33333333",
       padding:theme.spacing(0.5),
       borderRadius:5,
   },
   txValue:{
       display:'flex',
       fontWeight:20,
       fontSize:30,
       paddingTop:theme.spacing(3),
       paddingBottom:theme.spacing(3),
       // margin:theme.spacing(1),
   },
   detailWrap:{
       marginTop:theme.spacing(2.5),
       // backgroundColor:pink[50],
   },
   btn:{
       width:"40%",
       margin:theme.spacing(1),
   }

}));

const ALL_CHAINIDS = [1,3,4,42]

function SignTransaction({history,location}) {
    const classes = useStyles();
    const {isLogin,transaction,wallet,provider} = useGlobal()
    const updateGlobal = useUpdateGlobal()
    const accountAmount = useAccountAmount()
    const price_init = (transaction && transaction.gasPrice) ? transaction.gasPrice : 6
    const [price,setPrice] = useState(price_init)
    const showSnackbar = useSimpleSnackbar()
    const [circleOpen,setCircleOpen] = useState(false)

    const handleChange = e => {
        e.preventDefault()
        setPrice(e.target.value)
    }
    const doSubmit = e => {
        let trans = {
            ...transaction,
            gasPrice:utils.parseUnits("" + price,'gwei'),
            value:utils.parseEther("" + (transaction.value || 0)),
        }
        let net = getNetworkByChainId(trans.chainId)
        if(!net) {
            showSnackbar("未知网络",'error')
        }
        setCircleOpen(true)
        //签名并发送交易
        // let provider = ethers.getDefaultProvider(net)
        let tx_wallet = wallet.connect(provider)
        tx_wallet.sendTransaction(trans).then(tx => {
            setCircleOpen(false)
            //todo 跳到交易信息界面
            updateGlobal({
                txGlobal:{
                    tx,
                    symbol:(!trans.data || trans.data==='0x') ? "ETH" : '',
                    status:'pending',
                },
                transaction:null,
            })
            history.push('/send')
        }).catch(err =>{
            setCircleOpen(false)
            console.log(err)
            showSnackbar("交易发送失败",'error')
            return 
        })
    }
    const doCancel = e => {
        if(transaction) {
            updateGlobal({
                transaction:null
            })
        }
        history.push('/detail')
    }

    useEffect(()=> {
        if(!isLogin && accountAmount !== -1 ) {
            //检查是否有查询字符串
            let search = location.search
            let query = new URLSearchParams(search)
            let transaction_info = convertQuery(query)
            const {chainId,to,data} = transaction_info
            //有调用地址或者调用数据可以近似认为是一个交易，必须有交易网络ID
            //必须有账号才能签名交易
            if(chainId && ALL_CHAINIDS.indexOf(chainId) !== -1
                && (to || data) && accountAmount > 0)
            {   
                let network = getNetworkByChainId(chainId)
                updateGlobal({
                    network,
                    provider:new ethers.providers.InfuraProvider(network,"fda03bb99a764dca90b2400ecff9ef5a"),
                    transaction:transaction_info
                })
            }
            //让`layouts/Routes.jsx`来判断是登录还是创建等
            history.push('/detail')
        }
    },[accountAmount,isLogin,location.search,history,updateGlobal])

    if(accountAmount === -1 || !transaction) {
        return null
    }
    const {chainId,to,value,gasLimit,data} = transaction
    const _des = to || ZERO_ADDRESS
    const _fee = calFee(gasLimit || 0, + price)
    return (
        <div className={classes.container}>
            <div style={{width:"100%",background:grey[100]}}>
                <Toolbar className={classes.containerHeader}>
                    <Logo/>
                    <div className={classes.network}>
                        <CircleIcon className={classes['iconColor' + ALL_CHAINIDS.indexOf(chainId)]}/>
                        <span className={classes.netText}>
                           {getNetworkNameById(chainId)}
                        </span>
                    </div>
                </Toolbar>
            </div>
            <div className={classes.containerBody}>
                <Box className={classes.boxStyle}>
                    <div  className={classes.addressWrap}>
                        <TokenIcon tokenAddress={wallet.address} size={30} />
                        <span className={classes.address}>
                            我的账号
                        </span>
                    </div>
                    <Avatar alt="arrow_forward"  className={classes.avatar} >
                        <ArrowForward color="primary"/>
                    </Avatar>
                    <div className={classes.addressWrap}>
                        <TokenIcon tokenAddress={_des} size={30} />
                        <span className={classes.address2}>
                           {shortenAddress(_des)}
                        </span>
                    </div>
                </Box>
            </div>
            <div className={classes.divider} >
                <Divider />
            </div>
            <div className={classes.valueWrap}>
                <div className={classes.tx_intro}>
                    <span className={classes.tip}>
                        {(!to || to === ZERO_ADDRESS)
                            ?  "合约创建"
                            :  (!data || data === '0x')
                                ? "直接转账"
                                : "合约调用"
                        }
                    </span>
                    <div className={classes.txValue}>
                        <Avatar alt="arrow_forward" src={etherIcon} />
                        {" " + (value || 0)}
                    </div>
                    <span className={classes.detailWrap}>
                        交易细节
                    </span>
                </div>
            </div>
            <div className={classes.divider} >
                <Divider />
            </div>
            <div className={classes.formWrapper}>
                <form className={classes.form}>
                    <FormControl margin="normal" fullWidth >
                        <TextField id="outlined-gas-price"
                            label='当前gas价格'
                            required
                            variant="outlined"
                            type="number"
                            value={price}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        Gwei
                                    </InputAdornment>
                                 )
                            }}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth >
                        <TextField id="outlined-gas-fee"
                            label={gasLimit ? '当前手续费' : "当前手续费（无法计算)"}
                            required
                            variant="outlined"
                            type="number"
                            value={_fee.toFixed(6)}
                            InputProps={{
                                readOnly:true,
                                endAdornment:(
                                    <InputAdornment position="end">
                                        ETH
                                    </InputAdornment>
                                 )
                            }}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth >
                        <TextField id="outlined-all-fee"
                            label={gasLimit ? '当前总费用' : "当前总费用（不包含手续费)"}
                            required
                            variant="outlined"
                            type="number"
                            value={ ((value ? value : 0) + _fee).toFixed(6)}
                            InputProps={{
                                readOnly:true,
                                endAdornment:(
                                    <InputAdornment position="end">
                                        ETH
                                    </InputAdornment>
                                 )
                            }}
                        />
                    </FormControl>
                    <div style={{width:"100%",textAlign:"center"}}>
                        <Button variant="outlined" color="inherit" onClick={doCancel} className={classes.btn}>
                            拒绝
                        </Button>
                        <Button variant="contained" color="primary" onClick={doSubmit} className={classes.btn}>
                            确认
                        </Button>
                    </div>

                </form>
            </div>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={circleOpen}
                aria-labelledby="alert-dialog-title-circle"
                aria-describedby="alert-dialog-description-circle"
            >
                <DialogContent align='center'>
                    <div>
                        &nbsp;
                    </div>
                    <CircularProgress />
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

function calFee(gasLimit,gasPrice) {
    try{
        let _price = utils.parseUnits("" + gasPrice,'gwei')
        let _limit = utils.bigNumberify(gasLimit)
        let _result_wei = _price.mul(_limit)
        let _result_str = utils.formatEther(_result_wei)
        return  + _result_str
    }catch(err) {
        return 0
    }

}

export default withRouter(SignTransaction)
