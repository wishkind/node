import React from 'react';
import {Consumer} from "./App.js";
function Grandson(props) {
  return (
    <Consumer>
      {(name) => 
          <div style={{border:'1px solid green', width: "60%", margin: "50px auto", textalign: "center"}}>
            <p>孙组件。 获取传递下来的值：{name}</p>
          </div>
         }
        </Consumer>
       );
    }
export default Grandson
