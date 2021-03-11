import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
 
export default class MyNavLink extends Component {
	render() {
		// console.log(this.props);
		return (
			<NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
		)
	}
}
 
 
//使用方法
//<MyNavLink to="/home">Home</MyNavLink>
//<NavLink activeClassName="atguigu" className="list-group-item">{this.props.children}</NavLink>
//等同于
//<NavLink activeClassName="atguigu" className="list-group-item" children={this.props.children}/>
