import React, { Component } from 'react';
import "./UserDropdown.css";

class UserDropdown extends Component {
	state = {
		showDrop: false,
	}
	
	toggleDrop() {
		console.log(this.state);
		this.setState( prevState => {
			return { showDrop: !prevState.showDrop}
		});
	}

render() {
	const cssClasses = [
		"UserDropdown",
		this.state.showDrop ? "OpenDrop" : "CloseDrop"
	];
	return (
		<div>
			<div className="LoggedUser" onClick={() => this.toggleDrop()}> 
   				<img 
   				src={this.props.picture}
   				 width="35px"
   			 	height="35px"
   				 className="UserPicture"
   				 alt="Logged In" />
   				 <div className="LoggedUserName">{this.props.name}</div>
			</div>
			<div className={cssClasses.join(' ')}>
				<ul>
					<li onClick={this.props.logout}>Log-Out</li>
					<li>Your Lessons</li>
					<li>Settings</li>
				</ul>
			</div>
		</div>
	);
  };
};
export default UserDropdown;