import React, { Component } from 'react';
import './Player.css';



export default class Home extends Component {
	



	render() {	
		const styles = {
 			animation: 'all 1s ease-in forward',
 			
		};
		console.log(this.props.score);
		return (
			<div className="player">
				<svg height="200" width="200">
	
  					<circle cx="100" cy="100" r="80" stroke="black" strokeWidth="3" fill="#23D5AB" style={{...styles, strokeWidth: "20px", strokeDasharray: '' + this.props.score*42 + ' 503', stroke:"grey" }} />
  					{/*<text dx="25%" dy="54%" fill="white" textLength="50%" lengthAdjust="spacingAndGlyphs" style={{font: "30px Helvetica, sans-serif"}}>{this.props.name}</text>*/}

 					 Sorry, your browser does not support inline SVG.  
				</svg> 
				<div className="text">
					<div className="name">{this.props.name}</div>
					<div className="score">{this.props.score + '/12'}</div>
 				</div>
			</div>
		);
	}
}