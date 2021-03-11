import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import HowToReg from '@material-ui/icons/HowToReg';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from "react-router";
import {aesEncrypt,getPasswordLength} from 'utils';
import {ethers} from 'ethers';
import {useUpdateCrypt} from 'contexts/StorageProvider'
import {useUpdateGlobal} from 'contexts/GlobalProvider.js'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {Visible,Invisible} from 'components/Eyes'
import orange from '@material-ui/core/colors/orange';

const minLength = getPasswordLength();
const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    title: {
        marginTop: theme.spacing(1),
        fontSize: 20
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    submit: {
        fontSize: 18,
        width: "40%",
        background:orange[700],
        margin: theme.spacing(0.5),
        marginTop:theme.spacing(2.5),
        '&:hover':{
            backgroundColor:orange[700],
        },
        '&:active':{
            backgroundColor:orange[700],
        }
    },
    import: {
        margin: theme.spacing(2),
        color:"#f44336",
        fontSize: 18,
        textDecoration: "none"
    },
    wallet: {
        textAlign: "center",
        fontSize: 18
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(3)
    }
}));

const valuesInit = {
    password:"",
    confirmPassword:"",
    showKey:false,
    showPassword:false,
    showConfirmPassword:false,
    isPrivateKey:true,
    key:''
}

function ImportWallet({history}) {
    const classes = useStyles();
    const [values,setValues] = useState(valuesInit)
    const showSnackbar = useSimpleSnackbar()
    const updateCrypt = useUpdateCrypt()
    const updateGlobal = useUpdateGlobal()

    const changeKeyType = e => {
        e.preventDefault()
        setValues ({
            ...valuesInit,
            isPrivateKey:!values.isPrivateKey,
        })
    };
    const handleChange = name => event => {
        setValues({
            ...values,
            [name]:event.target.value
        })
    };
    const handleChangeShow = name => () => {
        setValues({
            ...values,
            [name]:!values[name]
        })
    };
    const cancelImport = e => {
        history.push('/')
    };
    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    const onSubmit = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return showSnackbar("前后两次密码不一致", "error");
        }
        if (password.length < minLength) {
            return showSnackbar("密码至少12位", "error");
        }
        let wallet;
        if(isPrivateKey) {
            try{
                wallet = new ethers.Wallet(key);
            }catch(err){
                return showSnackbar("无效的私钥", "error");
            }
        }else{
            try{
                wallet = ethers.Wallet.fromMnemonic(key);
            }catch(err){
                return showSnackbar("无效的助记词", "error");
            }
        }
        if(wallet) {
            try{
                let _crypted = aesEncrypt(wallet.privateKey,password);
                updateCrypt(wallet.address,_crypted)
                updateGlobal({
                    isLogin:true,
                    password,
                    wallet,
                })
                history.push('/detail')
            }catch(err) {
                showSnackbar("写入浏览器存储出错",'error')
            }
        }

    }
    const {password,confirmPassword,isPrivateKey,showKey,showPassword,showConfirmPassword,key} = values;
    return(
        <div className={classes.container}>
            <Avatar className={classes.avatar}>
                <HowToReg/>
            </Avatar>
            <Typography className={classes.title}>
                { isPrivateKey ? "请输入你的私钥": "请输入你的助记词" }
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                <FormControl margin="normal"  fullWidth>
                    <TextField id="key-password-input"
                        label={isPrivateKey ? "私钥" : "助记词"}
                        required
                        autoFocus
                        type={showKey ? "text" : "password"}
                        value={key}
                        onChange={handleChange('key')}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle key visibility"
                                        onClick={handleChangeShow('showKey')}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showKey ? <Visible /> : <Invisible />}
                                    </IconButton>
                                  </InputAdornment>
                             )
                        }}
                    />
                </FormControl>
                <FormControl margin="normal"  fullWidth>
                    <TextField id="standard-password-input"
                        label="设置密码"
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChange('password')}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                      color='primary'
                                      aria-label="toggle password visibility"
                                      onClick={handleChangeShow('showPassword')}
                                      onMouseDown={handleMouseDownPassword}

                                    >
                                      {showPassword ? <Visible /> : <Invisible />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>
                <FormControl margin="normal"  fullWidth>
                    <TextField id="confirm-password-input"
                        label="请确认输入密码"
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                        color='primary'
                                        aria-label="toggle confirmPassword visibility"
                                        onClick={handleChangeShow('showConfirmPassword')}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showConfirmPassword ? <Visible /> : <Invisible />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>
                <Button type='submit' variant="contained" color="primary" className={classes.submit}>
                    导入
                </Button>
            </form>
            <Button variant="contained" color="primary" onClick={cancelImport} className={classes.submit}>
                取消
            </Button>
            <Button onClick={changeKeyType} className={classes.import}>
                { isPrivateKey ? "从助记词导入" : "从私钥导入"}
            </Button>
        </div>
    )
}

export default withRouter(ImportWallet)
