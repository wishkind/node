import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import WalletIcon from 'components/assets/wallet.png';
// import amber from '@material-ui/core/colors/amber';

const useStyles = makeStyles(theme => ({
    icon: {
        width: 50,
        height: 50
    },
    container:{
        display:"flex",
        justifyContent:"center",
    },
    grow: {
        marginTop: theme.spacing(1.8),
        color:"#FFc400",
        fontWeight:"bold",
        fontSize: 15,
    }
}));

export default function Logo() {
    const classes = useStyles();

    return (<div className={classes.container}>
        <img src={WalletIcon} alt="KHWallet" className={classes.icon}/>
        <Typography className={classes.grow}>
            KHWallet
        </Typography>
    </div>)
}
