import React, {Component, createRef, useRef, useState} from 'react';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import PropTypes from 'proptypes';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {useMemo, useEffect} from 'react';
import ClassNames from './TestWithStyle'; 

function TestApp(props) {
    const {classes, className, children, ...other} = props
    const [count, setCount] = useState(0);
    const doubleCount = useMemo(() => {
        return count * count;
    }, [count]);
    const timerID = useRef();
    useEffect(() => {
        timerID.current = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);

    return (
        <>
            <button ref={timerID} onClick={ () => {setCount(count+1)}}>
                Count: {count}, double: {doubleCount}
            </button>
        </>
    );
}


export default  class SimpleBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 56,
        };
    }
    componentDidMount() {
        this.setState({age: 58});
    }



    render() {
        return (
            <div className="tt" style={{width:  "200px"}}>
                <p>good</p>
                <form className="ff" action="/" method="get">
                    <input
                        clasName="ii"
                        type="text"
                        name="1"
                   />
                    <input type="submit" value="submit"/>
                 </form>
                 <div style={{width: '100px', height:'100px',color: 'red', 'border': 10, background: 'green'}}>
                     <Box 
                         component="div" 
                         display="inline" 
                         p={1} 
                         m={1} 
                         style={{background: 'blue'}}
                     >
                         inline
                     </Box>
                </div>
                <TestApp 
                />
               <ClassNames />
             </div>
        );
    }
}                   

