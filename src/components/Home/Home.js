import React, { Component } from 'react';
import logo from "../../assets/svg/egglogo2.svg";
export default class Home extends Component {
	
	
	render() {	
		
		return (
			<div className="login">
				<h1>Home</h1>
				<img 
                        src={logo}
                        width="110px" 
                        height="1110px"
                        alt="logo" 
                    />
			</div>
		);
	}
}