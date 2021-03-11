import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import WalletIcon from './components/assets/wallet.jpg';
import DEFAULT_YEAR_ITEM_NUMBER from './TestDay';

import {Form, Button, Row, Col} from "react-bootstrap";
import axios from "axios";
import {debouce} from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";


//import MenuBtn from './TestMenu';

import { useState,createContext, useContext, useMemo, useRef, useCallback, useEffect } from 'react'
  
const NetworkContext = createContext()
function test() {
  return "good"
}

function useNetworkContext() {
    return useContext(NetworkContext)
}

export function Provider({ children }) {
  const [network, setNetwork] = useState("homestead")

  return (
    <NetworkContext.Provider value={useMemo(() => [network, setNetwork], [network, setNetwork])}>
      {children}
    </NetworkContext.Provider>
  )
}

export function useUpdateNetwork() {
    const [,setNetwork] = useNetworkContext()
    return setNetwork
}

export function useNetwork() {
    const [network,] = useNetworkContext()
    return network
}





const useStyles = makeStyles(theme => ({
    icon: {
        width: 50,
        height: 50
    },
    grow: {
        marginTop: theme.spacing(-0.5),
        fontSize: 15
    }
}));

export  function Logo() {
    const classes = useStyles();

    return (<div>
       <React.Fragment>
          <img src={WalletIcon} alt="KHWallet" className={classes.icon}/>
          <Typography className={classes.grow}>
            KHWallet
            {test()}
            {/*useUpdateNetwork()*/}
          </Typography>
          <Typography className={classes.grow}>
        {/*    <MenuBtn /> */}
          </Typography>
        </React.Fragment>
        
    </div>)
}



export function Index(): JSX.Element {

    const [count, setCount] = useState(1);
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <Child />
        </div>
    )
}

export function Child() {
    console.log('子组件更新了');
    return (
        <div>child 组件</div>
    )
}



const MemoChild = memo(Child1);

export  function Index1(): JSX.Element {

    const [count, setCount] = useState(1);
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <MemoChild />
        </div>
    )
}

export function Child1() {
    console.log('子组件更新了');
    alert("ggg")
    return (
        <div>child 组件</div>
    )
}



export   function App(): JSX.Element {

  const [count, setCount] = useState(1);
  const [val, setValue] = useState('');
  const expensive = () => {
    console.log('compute');
    alert("gg")
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
        sum += i;
    }
    return sum;
  }

  return <div>
    <h4>{count}-{expensive()}</h4>
    {val}
    <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input value={val} onChange={event => setValue(event.target.value)}/>
    </div>
</div>;	
}

export  function App1(): JSX.Element {

  const [count, setCount] = useState(1);
  const [val, setValue] = useState('');
  const expensive = useMemo(() => {
    console.log('compute');
    alert("gg")
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
        sum += i;
    }
    return sum;
 }, [count]);

  return <div>
    <h4>{count}-{expensive}</h4>
    {val}
    <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input value={val} onChange={event => setValue(event.target.value)}/>
    </div>
</div>;
}



const MemoTestChild = memo(TestChild);
export  function Test(): JSX.Element {
    const [count, setCount] = useState(100);
    const [name, setName] = useState('TestChild组件');
    return (
        <>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>++</button>
            {/*<MemoTestChild name={name} setName={(newName: string) => setName(newName)} />*/}
            <MemoTestChild name={name} setName={useCallback((newName: string) => setName(newName),[])} /> 
        </>
    )
}

//子组件部分
interface TestChildPropsType {
    name: string;
    setName: Function;
}
function TestChild({ name, setName }: TestChildPropsType): JSX.Element {
    console.log('子组件更新');
    alert("ggg")
    return (
        <>
            <h3>子组件:{name}</h3>
            <button onClick={() => setName(name + '改变后的name')}>改变name</button>
        </>
    );
}




export  function App2(props){
  const [count, setCount] = useState(0);

  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  const counterRef = useRef();

  useEffect(() => {
    document.title = `The value is ${count}`;
    console.log(counterRef.current);
    alert(counterRef.current);
  }, [count]);
  
  return (
    <>
      <button ref={counterRef} onClick={() => {setCount(count + 1)}}>Count: {count}, double: {doubleCount}</button>
    </>
  );
}





export default function App3(props){
  const [count, setCount] = useState(0);

  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  const timerID = useRef();
  
  useEffect(() => {
    timerID.current = setInterval(()=>{
        setCount(count => count + 1);
    }, 1000); 
  }, []);
  
  useEffect(()=>{
      if(count > 10){
          clearInterval(timerID.current);
      }
  });
  
  return (
    <>
      <button ref={timerID} onClick={() => {setCount(count + 1)}}>Count: {count}, double: {doubleCount}</button>
    </>
  );
}

const UI_PARAMS_API_URL = "/params";
const TRANSLATE_API_URL = "/translate";
const EXAMPLE_API_URL = "/examples";

const DEBOUNCE_INPUT = 250;

class App4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "",
      input: "",
      buttonText: "Submit",
      description: "Description",
      showExampleForm: false,
      examples: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }



  componentDidMount() {
    axios
      .get(UI_PARAMS_API_URL)
      .then(
        ({
          data: {placeholder, button_text, description, show_example_form}
        }) => {
          this.setState({
            input: placeholder,
            buttonText: button_text,
            description: description,
            showEcxampleForm: show_example_form
          });
         if (this.state.showExampleForm) {
           axios.get(EXAMPLE_API_URL).then(({data: examples}) => {
             this.setState({examples});
           });
         }  
       });
     }



  handleInputChange(e) {
    this.setState({input: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    let body = {
      prompt: this.state.input
    };
    axios.post(TRANSLATE_API_URL, body).then(({data: {text}}) => {
      this.setState({output: text});
    });
  }

  render() {
    const showExampleForm = this.state.showExampleForm;
    return (
      <div>
        <head />
        <body style={{alignItems: "center", justifyContent: " center"}}>
          <div
            style={{
              margin: "auto",
              marginTop: "80px",
              display: "block", 
              maxWidth: "500px", 
              minWidth: "200px",
              width: "50%"
            }}
          >
            <p> good</p>
          </div>
          </body>
        </div>
        );
    }
  }


//export default App4;
