import React,{useState}  from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import {useGlobal} from 'contexts/GlobalProvider';
import {useAddErc20Token,useAddErc721Token,useErc20Tokens,useErc721Tokens} from 'contexts/StorageProvider'

import {_INTERFACE_ID_ERC721,_INTERFACE_ID_ERC721_METADATA,
            _INTERFACE_ID_TOKEN_BALANCES,_INTERFACE_ID_ERC721_ENUMERABLE} from "../../constants";

import {isAddress,convertBigNumberToFixed,getErc20Token,getErc721TokenIds,
    getErc721Token,getERC721TokenName,getERC721TokenSymbol,getERC721TokenBalance,
    getTokenSymbol,getTokenDecimals,getTokenBalance,getSupportInterface} from 'utils'


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(2),
    },
    btnWrapper:{
        width:"100%",
        textAlign:"center",
    },
    btnWrapperTwo:{
        width:"100%",
        display:"flex",
        justifyContent:"space-between",
        margin: theme.spacing(1),
    },
    submit: {
        fontSize: 18,
        width: "40%",
    },
    submitTwo: {
        fontSize: 18,
        width: "40%",
        margin: theme.spacing(1)
    },
}));

const state_init = {
    tokenAddress:'',
    tokenSymbol:'',
    tokenDecimals:0,
    tokenName:'',
    tokenBalance:-1,
    isReady:false,
    isGetting:false,
    isError:false
}

function AddToken({onClose,openList,token_type}) {
    const classes = useStyles();
    const {wallet,network,provider} = useGlobal();
    const {address} = wallet;
    const [state,setState] = useState(state_init)
    const addErc20Token = useAddErc20Token()
    const addErc721Token = useAddErc721Token()
    const tokens = useErc20Tokens(address,network)
    const nfTokens = useErc721Tokens(address,network)
    const showSnackbar = useSimpleSnackbar()
    const [hasMetadata,setHasMetadata] = useState(true)
    const handleChange = e => {
        let _address = e.target.value
        setState({
            ...state,
            tokenAddress:e.target.value,
            isError:(_address !== '' && !isAddress(_address))
        })
    }
    const queryToken = async e => {
        e.preventDefault()
        if(token_type === 0) {
            let contract = getErc20Token(state.tokenAddress,network,wallet,provider)
            setState({
                ...state,
                tokenName:'',
                tokenDecimals:0,
                tokenSymbol:"",
                tokenBalance:-1,
                isGetting:true
            })
            let allPromise = [getTokenSymbol(contract),getTokenDecimals(contract),getTokenBalance(contract,address)]
            let stale = false
            Promise.all(allPromise).catch(error=>{
                if(!stale) {
                    setState({
                        ...state,
                        isGetting:false,
                        isError:true
                    })
                    stale = true
                }
            }).then(result => {
                //??????????????????????????? -_-
                if(!result) {
                    return
                }
                let symbol = result[0]
                let decimals =  + result[1]
                let balance = result[2]
                if(!stale) {
                    stale = true
                    setState({
                        ...state,
                        tokenSymbol:symbol,
                        tokenDecimals:decimals,
                        tokenBalance:balance,
                        isGetting:false,
                        isReady:true,
                    })

                }
            })

        }else if(token_type === 1) {
            let contract = getErc721Token(state.tokenAddress,network,wallet,provider)
            setState({
                ...state,
                tokenName:'',
                tokenDecimals:0,
                tokenSymbol:"",
                tokenBalance:-1,
                isGetting:true
            })
            let stale = false
            try{
                let is721 = await getSupportInterface(contract,_INTERFACE_ID_ERC721);
                if(!is721) {
                    if(!stale){
                        showSnackbar("?????????????????????","error")
                        stale = true
                        setState({
                            ...state,
                            isGetting:false
                        })
                    }
                }else{
                    try {
                        let enum_flag = await getSupportInterface(contract,_INTERFACE_ID_ERC721_ENUMERABLE);
                        let all_flag = await getSupportInterface(contract,_INTERFACE_ID_TOKEN_BALANCES);
                        let isMetadata = await getSupportInterface(contract,_INTERFACE_ID_ERC721_METADATA);
                        if(isMetadata) {
                            let name = await getERC721TokenName(contract)
                            let symbol = await getERC721TokenSymbol(contract)
                            let balance = await getERC721TokenBalance(contract,address)
                            if(!stale) {
                                stale = true
                                setState({
                                    ...state,
                                    tokenSymbol:symbol,
                                    tokenBalance:+ balance,
                                    isGetting:false,
                                    tokenName:name,
                                    isReady:true,
                                })
                            }
                        }else{
                            //??????????????????
                            let balance = await getERC721TokenBalance(contract,address)
                            if(!stale) {
                                stale = true
                                setHasMetadata(false)
                                setState({
                                    ...state,
                                    tokenBalance:+ balance,
                                    isGetting:false,
                                    isReady:true,
                                })
                            }

                        }
                    }catch(err2){
                        //??????????????????
                        let balance = await getERC721TokenBalance(contract,address)
                        if(!stale) {
                            stale = true
                            setHasMetadata(false)
                            setState({
                                ...state,
                                tokenBalance:+ balance,
                                isGetting:false,
                                isReady:true,
                            })
                        }
                    }
                }
            }catch(err) {
                showSnackbar("???????????????????????????",'error')
                setState({
                    ...state,
                    isGetting:false
                })
            }
        }else {
            // throw "TokenTypeError"
        }

    }

    const closeAdd = e => {
        e.preventDefault()
        if(onClose){
            onClose()
        }
    }
    //address,network,tokenAddress,symbol,dcimals,balance
    const addToken = event => {
        event.preventDefault()
        const {tokenAddress,tokenName,tokenSymbol,tokenDecimals,tokenBalance} = state
        let _tokenAddress = isAddress(tokenAddress)
        if(!_tokenAddress) {
            return showSnackbar("???????????????",'error')
        }
        if(token_type === 0) {
            for (let token of tokens) {
                if(token.address === _tokenAddress) {
                    return showSnackbar("???????????????????????????",'warning')
                }
            }
            addErc20Token(address,network,_tokenAddress,tokenSymbol,tokenDecimals,tokenBalance)
            if(openList){
                openList()
            }
        }else{
            if(!tokenName) {
                return showSnackbar("?????????????????????")
            }
            if(!tokenSymbol) {
                return showSnackbar("?????????????????????")
            }
            for (let nfTokens of tokens) {
                if(nfTokens.address === _tokenAddress) {
                    return showSnackbar("???????????????????????????",'warning')
                }
            }
            //todo ????????????
            addErc721Token(address,network,_tokenAddress,tokenSymbol,tokenName,tokenBalance)
            if(openList){
                openList()
            }
        }
    }

    const {tokenAddress,tokenSymbol,tokenDecimals,tokenName,tokenBalance,isError,isGetting,isReady}  = state
    const isErc20 = token_type === 0
    return (
        <div className={classes.container}>
            <Typography align='center' variant='h6' gutterBottom>
                ??????{isErc20 ? "??????" : "??????"}
            </Typography>
            <FormControl margin="normal"  fullWidth>
                <TextField id="outlined-token-address"
                    label={"?????????" + (isErc20 ? "??????" : "??????") + "????????????" }
                    required
                    variant="outlined"
                    type="text"
                    value={tokenAddress}
                    onChange={handleChange}
                    helperText={isError ? <font color='red'>???????????????</font> : <>&nbsp;</>}
                />
            </FormControl>
            <div className={classes.btnWrapper}>
                <Button  disabled={!tokenAddress || isError || isGetting}
                    variant="outlined"
                    onClick={queryToken}
                    color="primary"
                    className={classes.submit}>
                    {isGetting ? "?????????..." :"?????????"}
                </Button>
            </div>
            <FormControl margin="normal"  fullWidth>
                <TextField id="outlined-token-symbol"
                    label={isErc20 ? "????????????" : "????????????" }
                    variant="outlined"
                    type="text"
                    value={isErc20 ? tokenSymbol : tokenName}
                    InputProps={{
                        readOnly:hasMetadata,
                    }}
                />
            </FormControl>
            <FormControl margin="normal"  fullWidth>
                <TextField id="outlined-token-decimals"
                    label={isErc20 ? "???????????????" : "????????????"}
                    variant="outlined"
                    type="text"
                    value={isErc20 ? ("" + tokenDecimals) : tokenSymbol}
                    InputProps={{
                        readOnly:hasMetadata,
                    }}
                />
            </FormControl>
            <FormControl margin="normal"  fullWidth>
                <TextField id="outlined-token-balance"
                    label='????????????'
                    variant="outlined"
                    type="text"
                    value={tokenBalance >= 0
                        ? token_type === 0
                            ? convertBigNumberToFixed(tokenBalance,tokenDecimals).toFixed(3)
                            : tokenBalance
                        : ""}
                    InputProps={{
                        readOnly:true,
                    }}
                />
            </FormControl>
            <div className={classes.btnWrapperTwo}>
                <Button  variant="outlined" color="primary" onClick={closeAdd} className={classes.submitTwo}>
                    ??????
                </Button>
                <Button  disabled={!isReady} variant="outlined" color="primary"  onClick={addToken} className={classes.submitTwo}>
                    ??????
                </Button>
            </div>

        </div>
    )
}


export default AddToken
