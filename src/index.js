import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './TestRedux';
import TestNotistack from './TestNotistack';
import SnackbarWrapper from './SnackbarWrapper';
ReactDOM.render(
    <React.StrictMode>
        <SnackbarWrapper>
            <TestNotistack />
        </SnackbarWrapper>
        <Todo/>
    </React.StrictMode>,
    document.getElementById('root')
)
