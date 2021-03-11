import React from 'react';
import Son from './Son';

export const {Provider, Consumer} = React.createContext("默认名称")
export default class Test extends React.Component {
  
  render() {
    let name= "小人头"
    return (
      <Provider value={name}>
        <div style={{border:'1px, solid red', width:'30%', margin:'50px auto', textalign:'center'}}>
          <p>父组件定义的值：{name}</p>
          <Son />
        </div>
      </Provider> 
    );
  } 
}
