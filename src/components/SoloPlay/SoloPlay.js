import React, { Component } from 'react';
import Sentence from '../Sentence/Sentence';


export default class SoloPlay extends Component {
	


	render() {

		const sentence = this.props.activesentence;
		console.log(sentence);
		
		return (
			<div className="GamePlay">
			  <div className="GameHeader">
				<h2>{this.props.gamename}</h2>
			  </div>
					<Sentence 
						sentence={sentence.sentence}
						correct={sentence.a}
						placeholder={sentence.b}
						value={this.props.answer}
						handlesubmit={this.props.handlesubmit}
						handlechange={this.props.handlechange}
					/>
					<div className="error">{this.props.error ? this.props.error : null}</div>
					<button onClick={this.props.back}>Exit</button>
			</div>
			)
	}

}