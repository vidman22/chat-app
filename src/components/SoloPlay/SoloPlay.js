import React, { Component } from 'react';
// import {Transition} from 'react-transition-group';
import Sentence from '../Sentence/Sentence';


import './SoloPlay.css';


export default class SoloPlay extends Component {
	


	render() {

		const sentence = this.props.activesentence;
		
		return (
			<div className="GamePlay">
			  
				<h1>{this.props.gamename}</h1>
			
			
			  <svg className="largeSVG" height="40" width="100%">
			  <defs>
			  	<linearGradient id="e" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
			  		<stop stopColor="#23A6D5" offset="0" />
			  		<stop stopColor="#FFF800" offset="1" />
			  	</linearGradient>
			  </defs>
  				<line x1="0" y1="0" x2={this.props.index*83.33} y2="0" strokeWidth="40" stroke="url(#e)" />
			 </svg>
			
			<svg className="smallSVG" height="40" width="100%">
			  <defs>
			  	<linearGradient id="e" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
			  		<stop stopColor="#23A6D5" offset="0" />
			  		<stop stopColor="#FFF800" offset="1" />
			  	</linearGradient>
			  </defs>
  				<line x1="0" y1="0" x2={this.props.index*25} y2="0" strokeWidth="40" stroke="url(#e)" />
			</svg>
			  	
					{!this.props.completed ? <Sentence 
						sentence={sentence.sentence}
						correct={sentence.answer}
						placeholder={sentence.hint}
						value={this.props.answer}
						message={this.props.message}
						handlesubmit={this.props.handlesubmit}
						handlechange={this.props.handlechange}
					/> : <h3>{this.props.completed}</h3> }
					
					
			</div>
			)
	}

}