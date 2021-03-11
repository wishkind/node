//import Layout from '../components/Layout';
import React from 'react';
import { makeStyles, createStyles, useTheme, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    console.log('inside makeStyles');
    console.log(theme);
    return createStyles({
        container: {
            margin: '5px 5px 50px 5px'
        }
    })
});

export default function Index(props) {
    const classes = useStyles(props);
    const theme = useTheme();
    console.log('inside Index')
    console.log(theme);

    return(
        <React.Fragment>
            <h2>About</h2>
            <Paper className={classes.container}>
                <p>Sample test</p>
            </Paper>
            <Paper className={classes.container}>
                <p>Sample test2</p>
            </Paper>
        </React.Fragment>
    )
};
