import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from 'components/Logo'
import MenuBtn from 'components/MenuBtn'
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor:grey[200]
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default function WalletBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Toolbar className={classes.container}>
                <Logo/>
                <MenuBtn/>
            </Toolbar>
        </div>
   );
}
