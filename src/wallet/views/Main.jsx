import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import WalletBar from 'components/WalletBar';
import Paper from '@material-ui/core/Paper';
import { isMobile } from 'react-device-detect';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from 'layouts/Routes';
import SignTransaction from './SignTransaction'
import { getPathBase } from 'utils'

const HEIGHT = 600
const MAXWIDTH = 400

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(isMobile ? 8 :10),
        display: "flex",
        justifyContent: "center"
    },
    paper:{
        height:HEIGHT,
        maxHeight:HEIGHT,
        // minWidth:300,
        width:MAXWIDTH,
        maxWidth:MAXWIDTH
    }
}));

export default function Main() {
    const classes = useStyles();

    return (<div className={classes.root}>
        <Grid item xs={12} sm={12} md={3}>
            <Paper elevation={isMobile ? 0 : 1} className={classes.paper}>
                <Router basename={getPathBase()}>
                    <Switch>
                        <Route path='/transfer' component={SignTransaction} />
                        <Route path='/'>
                             <WalletBar />
                             <Routes />
                        </Route>
                    </Switch>
                </Router>
            </Paper>
        </Grid>
    </div>)
}
