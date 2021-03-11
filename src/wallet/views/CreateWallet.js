import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import TextField from '@material-ui/core/TextField';
import {ethers} from 'ethers';
import {useUpdateCrypt} from 'contexts/StorageProvider'
import {useUpdateGlobal} from 'contexts/GlobalProvider.js'
import { withRouter } from "react-router";
import {aesEncrypt,getPasswordLength} from 'utils'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import orange from '@material-ui/core/colors/orange';
import {Visible,Invisible} from 'components/Eyes'

const minLength = getPasswordLength()
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
        width: "100%",
        color:"white",
        paddingTop:theme.spacing(2),
        paddingBottom:theme.spacing(2),
        backgroundColor:orange[700],
        marginTop: theme.spacing(6),
        '&:disabled':{
            background:orange[200],
        },
        '&:hover':{
             backgroundColor:orange[700],
        },
        '&:active':{
            backgroundColor:orange[700],
        }
    },
    import: {
        fontSize: 18,
        textDecoration:"none",
        color:"#f44336",
        margin: theme.spacing(4),
        marginBottom: theme.spacing(3),
    },
    wallet: {
        textAlign: "center",
        marginTop: theme.spacing(0.5),
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
    password:'',
    confirmPassword:'',
    showPassword:false,
    showConfirmPassword:false
}

function CreateWallet({history}) {
    const classes = useStyles()
    const [values,setValues] = useState(valuesInit)
    const updateCrypt = useUpdateCrypt()
    const updateGlobal = useUpdateGlobal()
    const showSnackbar = useSimpleSnackbar()

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
    const handleMouseDownPassword = e => {
        e.preventDefault();
    };
    const onSubmit = e => {
        e.preventDefault();
        const {password,confirmPassword} = values
        if (password !== confirmPassword) {
            return showSnackbar("前后两次密码不一致", "error");
        }
        if (password.length < minLength) {
            return showSnackbar(`密码长度至少${minLength}位`, "error");
        }
        let wallet = null;
        try {
            wallet = ethers.Wallet.createRandom();
        }catch(err) {
            showSnackbar("当前浏览器不支持创建随机钱包",'error')
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

    const {password,confirmPassword,showPassword,showConfirmPassword} = values
    return (<div className={classes.container}>
        <Avatar className={classes.avatar}>
            <AddIcon/>
        </Avatar>
        <Typography className={classes.title}>
            创建一个新账号
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
            <FormControl margin="normal"  fullWidth>
                <TextField id="standard-password-input"
                    label="设置密码"
                    required
                    autoFocus
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
            <Button type='submit' variant="contained" disabled={!password || !confirmPassword} className={classes.submit}>
                创建
            </Button>
        </form>
        <Link to="/import" className={classes.import}>导入已有账号</Link>
        <Typography  color='secondary' className={classes.wallet}>
            KHWallet，简单安全易用的
        </Typography>
        <Typography  color='secondary' className={classes.wallet}>
            以太坊钱包
        </Typography>
    </div>)
}

export default withRouter(CreateWallet)
