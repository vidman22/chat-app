import React, { Component } from 'react';

import SoloPlay from '../../components/SoloPlay/SoloPlay';

import './SoloGame.css'



let index = 0;

class SoloGame extends Component {

	constructor(props) {
		super(props);


		this.state = {
			gameName: null,
			gameSentences: null,
			activeGame: null,
			button: 'buttons',
			activeSentence: {},
			answer:'',
			error:''
		}
	}

	UNSAFE_componentWillMount() {

		let gameSentences = this.props.sentences;
		gameSentences = this.shuffle(gameSentences);
		console.log(" game sentences ", gameSentences);

		const activeSentence = gameSentences[0];

		console.log('active sentence ', activeSentence );
		this.setState({
			gameSentences,
			activeSentence
		});

	}

	shuffle(array) {
		let currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}



	handleSubmit = (e) => {
		e.preventDefault();

		let answer = this.state.answer;
		answer = answer.toLowerCase().trim();

		
		if (answer === this.state.activeSentence.a ||answer === this.state.activeSentence.c || answer === this.state.activeSentence.d ||answer === this.state.activeSentence.e ||answer === this.state.activeSentence.f)  {
			console.log("peace");

			
			if (index < this.state.gameSentences.length - 1 ) {
				index++;
				const activeSentence = this.state.gameSentences[index];

				this.setState({
					activeSentence,
					answer:''
				});
			} else {
				
				console.log("all done");
			}
			

		} else {
			
			this.setState({
				error: 'Incorrect'
			});
			setTimeout(this.wrongAnswer.bind(this), 1000);
		}
		

	}

	wrongAnswer() {
		const gameSentences = [...this.state.gameSentences];

		const wrongSentence = gameSentences[index];

		gameSentences.push(wrongSentence);
		this.setState({
			gameSentences
		});

		index++;
		const activeSentence = this.state.gameSentences[index];

		this.setState({
			activeSentence,
			answer:'',
			error:''
		});
	}

	handleChange = (e) => {

		this.setState({ answer: e.target.value });
	}

	
	

	start(e) {
		e.preventDefault();
		console.log("start game clicked");
	}

	button() {
		console.log("clicked");
		this.setState({
			button: null
		})
	}



	render() {
		console.log(this.state);

		let buttons = (
			<div>
				<button onClick={this.props.back}>Back</button>
				<button onClick={this.button.bind(this)}>Start</button> 
			</div>
			)

		
		
		return(
			<div className="SoloWaiting">
				<h1>{this.props.gamename}</h1>
				
				
				{ this.state.button ? buttons : null }
				{ !this.state.button ? <SoloPlay activesentence={this.state.activeSentence} back={this.props.back} handlechange={this.handleChange} answer={this.state.answer} handlesubmit={this.handleSubmit} game={this.props.game} error={this.state.error}/> : null }
				
			</div>
			)
	}
}

export default SoloGame;