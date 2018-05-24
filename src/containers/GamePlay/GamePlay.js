import React, { Component } from 'react';
import Sentence from '../../components/Sentence/Sentence';

import Grammar from '../../Grammar.json';

import io from 'socket.io-client';

const GrammarTest = Grammar.Grammar;

const socketUrl = "http://localhost:5000";
const socket = io(socketUrl);

export default class GamePlay extends Component {

	constructor(props) {
		super(props);

		this.state = {
			game:"",
			gameSentences:[]
		}
	}

	componentDidMount() {
		console.log(this.props.game);
		const gameSentences = GrammarTest[this.props.game];
		console.log(" game sentences ", gameSentences);
		this.initSocket();
		this.setState({
			game: this.props.game,
			gameSentences
		});
	}

	

	initSocket() {
		socket.on('NEW_ROUND', () => {
			console.log("new round");
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log("peace");

	}

	handleChange = (e) => {

		this.setState({ name: e.target.value });
	}



	render() {

		const sentences = this.state.gameSentences.map((sentence, index) =>{
			return (
					<Sentence 
						key={index}
						sentence={sentence.sentence}
						correct={sentence.a}
						handlesubmit={this.handleSubmit}
						handlechange={this.handleChange}
					/>
				)
		})


		return (
			<h1>{sentences}</h1>
			)
	}

}