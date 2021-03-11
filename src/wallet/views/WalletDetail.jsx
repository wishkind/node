import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import DetailHeader from 'components/DetailHeader';
import DetailBody from 'components/DetailBody';
import {useGlobal} from 'contexts/GlobalProvider'
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(2),
    },
    his:{
        width:"100%",
        fontSize:"15px",
        color:theme.palette.text.secondary,
        marginTop: theme.spacing(-1),
    }
}));

function WalletDetail({history}) {
    const classes = useStyles();
    const {transaction} = useGlobal()
    if(transaction) {
        history.push('/transfer')
    }

    return (
        <div className={classes.container}>
            <DetailHeader />
            <div className={classes.divider} >
                <Divider />
            </div>
            <DetailBody />
            <div className={classes.his} >
                历史记录(开发中......)
                <Divider />
            </div>
        </div>
    )
}

export default withRouter(WalletDetail)
