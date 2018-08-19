import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./UserDropdown.css";

class UserDropdown extends Component {
	
render() {
	const cssClasses = [
		"UserDropdown",
		this.props.showdrop ? "OpenDrop" : "CloseDrop"
	];
	return (
		<div>
			<div className="LoggedUser" onClick={this.props.toggleDrop}> 
   				<img 
   				src={this.props.user.picture}
   				 width="35px"
   			 	height="35px"
   				 className="UserPicture"
   				 alt="Logged In" />
   				 <div className="LoggedUserName">{this.props.user.name}</div>
			</div>
			<div className={cssClasses.join(' ')}>
				<ul>
					<li onClick={this.props.logout}>Log-Out</li>
					<Link onClick={(e) => this.props.toggleDrop(e)} className="DropDownLink" to={`/user/${this.props.user.userID}`}><li>My Lessons</li></Link>
					<li>Settings</li>
				</ul>
			</div>
		</div>
	);
  };
};
export default withRouter(UserDropdown);