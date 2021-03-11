/**
*  本文件用来显示用户转账（ETH）时的表单
*/
import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import blue from '@material-ui/core/colors/blue';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useGlobal} from 'contexts/GlobalProvider';
import {useErc20Tokens} from 'contexts/StorageProvider'
import {useBalance} from 'contexts/BalancesProvider'
import {convertToEth,isAddress,shortenAddress,getErc20Token,convertFixedToBigNumber,
    getNetworkName,getChainIdByNetwork,convertBigNumberToFixed} from 'utils';
import {utils} from 'ethers'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(2),
    },
    submit: {
        fontSize: 18,
        width: "40%",
        marginTop: theme.spacing(3),
        "&:disabled":{
            color:"white",
            background:blue[200]
        },
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    dialogBtn:{
        width:"30%",
        margin:theme.spacing(2),
    }
}));

const values_init = {
    recipient:'',
    amount:'',
    gasPrice:6
}

//发送ETH消耗的GAS数量，暂时固定
const GAS_LIMIT = 23000
let params = [0,0,0,0]

function SendEtherForm({cancelCallback,sendCallback}) {
    const classes = useStyles()
    const {network,wallet,tokenSelectedIndex,provider} = useGlobal()
    const {address} = wallet
    const balance = useBalance(address,network)
    const tokens = useErc20Tokens(address,network)
    const [values,setValues] = useState(values_init)
    const showSnackbar = useSimpleSnackbar()
    const [open,setOpen]= useState(false)
    const [circleOpen,setCircleOpen] = useState(false)
    const isToken = tokenSelectedIndex !== 0
    const token = tokens[tokenSelectedIndex-1] || {}
    const SYMBOL = isToken ? token.symbol : "ETH"
    const showBalace = isToken ? token.balance : balance

    const handleChange = name => e => {
        setValues({
            ...values,
            [name]:e.target.value
        })
    }
    const handleClose = () => {
        setOpen(false);
    }
    const cancelSend = e => {
        e.preventDefault()
        if(cancelCallback){
            cancelCallback()
        }
    }
    const checkSubmit = e => {
        e.preventDefault()
        const {recipient,amount,gasPrice} = values
        let _address = isAddress(recipient)
        if(!_address){
            return showSnackbar("无效的地址",'error')
        }
        if(_address === isAddress(address)){
            return showSnackbar("不能向自己发送ETH或者代币",'error')
        }
        let eth_amount = + amount
        if(Number.isNaN(eth_amount)) {
            return showSnackbar("无效的数量",'error')
        }
        let _balance = isToken
            ? convertBigNumberToFixed(utils.bigNumberify(token.balance),token.decimals)
            : convertToEth(balance)
        if(eth_amount >= _balance) {
            return showSnackbar(`${SYMBOL}数量不足`,'error')
        }
        let gas_price = + gasPrice
        if(Number.isNaN(gas_price)) {
            return showSnackbar("无效的gas价格",'error')
        }
        params = [_address,eth_amount,gas_price,network]
        setOpen(true)
    }
    const doSubmit = async () => {
        setOpen(false)
        setCircleOpen(true)
        let [_address,eth_amount,gas_price,_network] = params
        if(isToken) {
            //将钱包绑定合约直接调用方法进行
            let contract = getErc20Token(token.address,network,wallet,provider)
            if(contract) {
                let amount = convertFixedToBigNumber(eth_amount,token.decimals)
                let args = [_address,amount]
                contract.transfer(...args).then(tx => {
                    setCircleOpen(false)
                    if(sendCallback){
                        sendCallback(tx,eth_amount,SYMBOL)
                    }
                }).catch(err =>{
                    setCircleOpen(false)
                    return showSnackbar(SYMBOL + "发送失败",'error')
                })
            }else{
                setCircleOpen(false)
                return showSnackbar("合约未初始化，请稍候",'info')
            }
        }else{
            let transaction = {
                to:_address,
                value:utils.parseEther("" + eth_amount),
                gasLimit:GAS_LIMIT,
                gasPrice:utils.parseUnits("" + gas_price,'gwei'),
                chainId:getChainIdByNetwork(_network)
            }
            //签名并发送交易
            let tx_wallet = wallet.connect(provider)
            tx_wallet.sendTransaction(transaction).then(tx => {
                setCircleOpen(false)
                if(sendCallback){
                    sendCallback(tx,eth_amount,SYMBOL)
                }
            }).catch(err =>{
                console.log(err)
                setCircleOpen(false)
                return showSnackbar(SYMBOL + "发送失败",'error')
            })
        }
    }

    const {recipient,amount,gasPrice} = values

    return (
        <div className={classes.container}>
            <Typography variant="h6"  align='center' color='textPrimary'>
                {`发送${SYMBOL}`}
            </Typography>
            <form className={classes.form} onSubmit={checkSubmit}>
                <FormControl margin="normal"  fullWidth>
                    <TextField id="outlined-ether-balance"
                        label={`你的${SYMBOL}余额`}
                        variant="outlined"
                        type="text"
                        value={isToken ? convertBigNumberToFixed(utils.bigNumberify(token.balance),token.decimals).toFixed(3)
                             : convertToEth(balance).toFixed(4)}
                        InputProps={{
                            readOnly:true,
                            endAdornment:(
                                <InputAdornment position="end">
                                    {SYMBOL}
                                </InputAdornment>
                             )
                        }}
                    />
                </FormControl>
                <FormControl margin="normal"  fullWidth>
                    <TextField id="outlined-ether-recipient"
                        label='接收地址'
                        required
                        variant="outlined"
                        type="text"
                        value={recipient}
                        onChange={handleChange('recipient')}
                    />
                </FormControl>
                <FormControl margin="normal"  fullWidth>
                    <TextField id="outlined-ether-amount"
                        label='发送数量'
                        required
                        variant="outlined"
                        type="text"
                        value={amount}
                        onChange={handleChange('amount')}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    {SYMBOL}
                                </InputAdornment>
                             )
                        }}
                    />
                </FormControl>
                <FormControl margin="normal"  fullWidth>
                    <TextField id="outlined-gas-price"
                        label='gas价格'
                        required
                        variant="outlined"
                        type="number"
                        value={gasPrice}
                        onChange={handleChange('gasPrice')}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    Gwei
                                </InputAdornment>
                             )
                        }}
                    />
                </FormControl>
                <Button type='submit' disabled={showBalace===undefined} variant="contained" color="primary" className={classes.submit}>
                    {showBalace===undefined ? "余额获取中" : "发送"}
                </Button>
            </form>
            <Button variant="contained" color="primary" onClick={cancelSend} className={classes.submit}>
                取消
            </Button>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle align='center' id="alert-dialog-title">{`发送${SYMBOL}确认`}</DialogTitle>
                <DialogContent align='left'>
                  <DialogContentText id="alert-dialog-description1">
                      {"交易网络: " + (params[3] ? getNetworkName(params[3]) : '')}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description2">
                    {"接收地址: " + (params[0] ? shortenAddress(params[0],8) : "")}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description3">
                    {"发送数量: " + params[1] + " " + SYMBOL}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description4">
                    {"Gas价格: " + params[2] + " Gwei"}
                  </DialogContentText>
                </DialogContent>
                <DialogContent align='center'>
                  <Button onClick={handleClose} variant="outlined" color="inherit" className={classes.dialogBtn}>
                    取消
                  </Button>
                  <Button onClick={doSubmit} variant="outlined" color="primary" autoFocus className={classes.dialogBtn}>
                    确定
                  </Button>
                </DialogContent>
            </Dialog>
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

export default SendEtherForm
