import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

function TestNotistack() {
  const { enqueueSnackbar } = useSnackbar();


  const handleClick = event => {
      event.preventDefault();
      // variant could be success, error, warning, info, or default
      let options = {
          variant:"success",
          onClose:() => console.log("close a snackbar")
      };
      enqueueSnackbar("This is a message", options);
  };

  

return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button style={{fontSize:"25px",color:"red",margin:"10px"}} onClick={handleClick}>
            Click Me
        </Button>

       <p> test</p>
      </header>
    </div>
  );
}

export default TestNotistack;
