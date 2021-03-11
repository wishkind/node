import React from 'react';
import {Consumer} from "./App.js";
import Grandson from "./Grandson.js";

function Son(props) {
  return (
    <Consumer>
      {(name) => 
         <div style={{border:'1px solid blue', width: '60%', margin:'20px auto', textalign:'center'}}>
           <p>子组件。获取父组件的值：{name}</p>
           {/*孙组件内容*/}
           <Grandson />
         </div>
       }
     </Consumer>
   );
 }
export default Son;
