import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import copy from 'copy-to-clipboard';
import {useGlobal} from 'contexts/GlobalProvider';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import QRCode from 'qrcode-react';
import {useAddressIcon} from 'hooks'
import {getEtherscanLink,getChainIdByNetwork,nodeToString} from 'utils'

const ETHEREUM_PREv = 'ethereum:';
const ICON_SIZE = 50;

const useStyles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0.5),
        color: theme.palette.grey[500],
    },
    submit: {
        width: "100%"
    },
    icon:{
        marginTop:theme.spacing(-1),
        marginBottom:theme.spacing(-2),
    },
    returnBtn:{
        position: 'absolute',
        left: theme.spacing(1),
        top: theme.spacing(0.5),
        color: theme.palette.grey[500],
    },
    confirmBtn:{
        width:"40%",
    },
    warn:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2),
        backgroundColor:"#ffebeeee",
        color:"#f44336",
        fontSize:"13px",
    },
    buttonWrap:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2),
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    buttonWrapTwo:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2),
        width:"100%",
        textAlign:"center"
    },
    titleTwo:{
        marginTop:theme.spacing(-1),
        marginBottom:theme.spacing(-4),
    }
}));

function AccountDetail({closeCallback,open}) {
    const classes = useStyles();
    const {wallet,network,password} = useGlobal();
    const {address} = wallet;
    const icon = useAddressIcon(address,ICON_SIZE)
    const [confirmPassword,setConfirmPassword] = useState('')
    const showSnackbar = useSimpleSnackbar()
    const [state,setState] = useState({
        status: 'normal', //normal validate export
        type: '' // key words  ???????????????????????????
    })


    //???????????????
    const handleCloseDetail = e => {
        e.preventDefault()
        returnBack()
        if(closeCallback) {
            closeCallback()
        }
    }
    //???????????????????????????
    const exportWords = (name) => () =>{
        setState({
            status:'validate',
            type:name
        })
    }
    //???????????????????????????
    const returnBack = () => {
        setState({
            status:'normal',
            type:""
        })
        setConfirmPassword('')
    }
    //????????????
    const handleChange = e => {
        setConfirmPassword(e.target.value)
    }
    //?????????????????????????????????
    const doExport = e => {
        if(password !== confirmPassword) {
            return showSnackbar("????????????",'error')
        }
        setState({
            ...state,
            status:'export',
        })
    }
    //??????????????????????????????
    const doCopy = event => {
        event.preventDefault();
        const key = state.type === 'key' ? wallet.privateKey : wallet.mnemonic
        const str = state.type==='key' ? "??????" : "?????????"
        if(copy(key))
            showSnackbar(str + "????????????????????????",'success')
    }
    //???etherscan?????????
    const showAccount = () => {
        let chainId = getChainIdByNetwork(network)
        let url = getEtherscanLink(chainId,address,'address')
        window.open(url)
    }

    //????????????????????????
    function showNormalPanel(classes) {
        return (<DialogContent align='center'>
            <FormControl fullWidth margin="normal" >
                  <Button variant="contained" color="primary" className={classes.submit} onClick={showAccount}>
                      ???ETHERSCAN?????????
                  </Button>
              </FormControl>
            {wallet.mnemonic &&
                   <FormControl fullWidth margin="normal" >
                       <Button variant="contained" color="primary" className={classes.submit} onClick={exportWords('words')}>
                           ???????????????
                       </Button>
                   </FormControl>
             }
             <FormControl fullWidth margin="normal" >
                  <Button variant="contained" color="primary" className={classes.submit} onClick={exportWords('key')}>
                      ????????????
                  </Button>
             </FormControl>
         </DialogContent>)
    }

    //??????????????????
    function showValidatePanel(classes) {
        const str = state.type==='key' ? "??????" : "?????????"
        return (<>
            <DialogTitle align='center' className={classes.titleTwo}>
                ??????{ str }
            </DialogTitle>
            <DialogContent align='center'>
                <FormControl margin="normal" fullWidth>
                    <DialogContentText align='left'>
                        ??????????????????
                    </DialogContentText>
                    <TextField id="outlined-password"
                        required
                        autoFocus
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </FormControl>
                <div className={classes.warn}>
                    ?????????????????????????????????{str}?????????????????????{str}???????????????????????????????????????????????????
                </div>
                <div className={classes.buttonWrap}>
                    <Button className={classes.confirmBtn} variant='outlined' onClick={handleCloseDetail}>
                        ??????
                    </Button>
                    <Button className={classes.confirmBtn} color='primary' variant='outlined' disabled={!confirmPassword} onClick={doExport}>
                        ??????
                    </Button>
                </div>
            </DialogContent>
        </>)
    }

    //??????????????????
    function showExportResultPanel(classes) {
        const str = state.type==='key' ? "??????" : "?????????"
        return (<>
            <DialogTitle align='center' className={classes.titleTwo}>
                ??????{ str }
            </DialogTitle>
            <DialogContent align='center'>
                <FormControl margin="normal" fullWidth>
                    <DialogContentText align='left'>
                        {"????????????" + str + "(????????????)"}
                    </DialogContentText>
                    <TextField
                        onClick={doCopy}
                        error
                        id="outlined-export"
                        defaultValue={state.type==='key' ? wallet.privateKey : wallet.mnemonic}
                        variant="outlined"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </FormControl>
                <div className={classes.warn}>
                    ?????????????????????????????????{str}?????????????????????{str}???????????????????????????????????????????????????
                </div>
                <div className={classes.buttonWrapTwo}>
                    <Button className={classes.confirmBtn} color='primary' variant='outlined' onClick={handleCloseDetail}>
                        ??????
                    </Button>
                </div>
            </DialogContent>
        </>)
    }

    //?????????????????????????????????
    function showCommonPanel(classes) {
        const {status} = state
        return (<>
            {/* <!-- Dialog???????????????useRef... --> */}
            <DialogTitle align='center' className={classes.icon}>
                <div dangerouslySetInnerHTML={{__html: nodeToString(icon)}}  />
            </DialogTitle>
            <DialogTitle id="customized-dialog-title" >
                {status !== 'normal' &&
                    <Button className={classes.returnBtn} onClick={returnBack}>
                        {"<??????"}
                    </Button>
                }
                <div style={{textAlign:"center"}}>
                    ????????????
                </div>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseDetail}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent align='center'>
                {status === 'normal' && <QRCode size={150} value={ETHEREUM_PREv + address}/>}
                <FormControl fullWidth margin="normal" >
                    <TextField id="outlined-read-only-input" name="address" value={address}  variant="outlined"
                        InputProps={{
                            readOnly: true
                        }} />
                </FormControl>
            </DialogContent>
        </>)
    }

    const {status} = state
    //????????????
    return (
        <Dialog
            fullWidth
            maxWidth='xs'
            open={open}
            onClose={handleCloseDetail}
            aria-labelledby="account-dialog-title"
            aria-describedby="account-dialog-description"
        >
            {showCommonPanel(classes)}
            {status === 'normal' && showNormalPanel(classes)}
            {status === 'validate' && showValidatePanel(classes)}
            {status === 'export' && showExportResultPanel(classes)}
        </Dialog>
    )
}

export default AccountDetail
