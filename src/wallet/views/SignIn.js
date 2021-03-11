import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {useSimpleSnackbar} from 'contexts/SimpleSnackbar.jsx';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import {ethers} from 'ethers';
import {useDefaultAccount,useAccountCrypt} from 'contexts/StorageProvider'
import {useUpdateGlobal} from 'contexts/GlobalProvider.js'
import { withRouter } from "react-router";
import {aesDecrypt} from 'utils'
import orange from '@material-ui/core/colors/orange';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        textAlign: 'center'
    },
    submit: {
        fontSize: 18,
        width: "100%",
        color:"white",
        paddingTop:theme.spacing(2),
        paddingBottom:theme.spacing(2),
        background:orange[700],
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
        margin: theme.spacing(6),
    },
    wallet: {
        textAlign: "center",
        marginTop: theme.spacing(3),
        fontSize: 20
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(3)
    }
}));

function SignIn({history}) {
    const classes = useStyles();
    const showSnackbar = useSimpleSnackbar()
    const [password, setPassword] = useState('')
    const address = useDefaultAccount()
    const crypt = useAccountCrypt(address)
    const updateGlobal = useUpdateGlobal()

    const updatePassword = e => {
        let _password = e.target.value;
        setPassword(_password)
    };

    const onSubmit = e => {
        e.preventDefault();
        try{
            let privateKey = aesDecrypt(crypt,password)
            let wallet = new ethers.Wallet(privateKey)
            let options = {
                isLogin:true,
                password,
                wallet,
            }
            updateGlobal(options)
            history.push('/detail')
        }catch(err) {
            showSnackbar("密码错误",'error')
        }
    }

    return (
        <div className={classes.container}>
            <Avatar className={classes.avatar}>
                <LockIcon/>
            </Avatar>
            <Typography  color='secondary' className={classes.wallet}>
                KHWallet，简单安全易用的
            </Typography>
            <Typography  color='secondary' className={classes.wallet}>
                以太坊钱包
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                <FormControl margin="normal"  fullWidth>
                    <TextField id="standard-password-input"
                        label="密码"
                        required
                        autoFocus
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={updatePassword}/>
                </FormControl>
                <Button type='submit' variant="contained" disabled={!password} className={classes.submit} >
                    登录
                </Button>
            </form>
            <Link to="/import" className={classes.import}>重置密码/导入新账号</Link>
        </div>
    )
}

export default withRouter(SignIn);
