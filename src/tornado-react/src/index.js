import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SimpleBox from './TestBox';
ReactDOM.render(
    <React.StrictMode>
        <App />
        <SimpleBox />
    </React.StrictMode>,
     document.getElementById('root'));
