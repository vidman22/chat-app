import React, { Component } from 'react';

import SoloPlay from '../../components/SoloPlay/SoloPlay';
import Carousel from "../../components/Carousel/Carousel";

import './SoloGame.css'






class SoloGame extends Component {

	constructor(props) {
		super(props);


		this.state = {
			gameName: null,
			gameSentences: null,
			sentenceIndex: 0,
			scoreIndex: 0,
			activeGame: null,
			action: 'start',
			activeSentence: {},
			carousel: true,
			answer:'',
			completed: null,
			error:''
		}
	}

	UNSAFE_componentWillMount() {

		let gameSentences = this.props.sentences;
		gameSentences = this.shuffle(gameSentences);
		gameSentences = gameSentences.slice(0, 12);
		

		const activeSentence = gameSentences[0];

		
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
		let sentenceIndex = this.state.sentenceIndex;
		let scoreIndex = this.state.scoreIndex;

		answer = answer.toLowerCase().trim();

		
		if (answer === this.state.activeSentence.a ||answer === this.state.activeSentence.c || answer === this.state.activeSentence.d ||answer === this.state.activeSentence.e ||answer === this.state.activeSentence.f)  {
			

			
			if ( sentenceIndex < this.state.gameSentences.length - 1 ) {
				sentenceIndex++;
				scoreIndex++;
				const activeSentence = this.state.gameSentences[sentenceIndex];

				this.setState({
					activeSentence,
					answer:'',
					scoreIndex,
					sentenceIndex
				});
			} else {

				scoreIndex++;
				this.setState({
					scoreIndex,
					completed:'Finished!'
				});

				setTimeout(this.completed.bind(this), 2000);
				
			}
			

		} else {
			
			this.setState({
				error: 'Incorrect'
			});
			setTimeout(this.wrongAnswer.bind(this), 1000);
		}
		

	}

	completed() {
		let sentenceIndex = this.state.sentenceIndex;
		let scoreIndex = this.state.scoreIndex;
		sentenceIndex = 0;
		scoreIndex = 0;

		this.setState({
			scoreIndex,
			sentenceIndex,
			completed:null,
			action: 'answers'
		});
	}

	wrongAnswer() {
		let sentenceIndex = this.state.sentenceIndex;
		const gameSentences = [...this.state.gameSentences];

		const wrongSentence = gameSentences[sentenceIndex];

		gameSentences.push(wrongSentence);
		this.setState({
			gameSentences
		});

		sentenceIndex++;
		const activeSentence = this.state.gameSentences[sentenceIndex];

		this.setState({
			activeSentence,
			sentenceIndex,
			answer:'',
			error:''
		});
	}

	handleChange = (e) => {

		this.setState({ answer: e.target.value });
	}

	

	button() {
		
		this.setState({
			action: 'play'
		})
	}

	answers() {
		this.setState({
			action:'answers'
		});
	}

	addComponent() {
		let result;
		switch(this.state.action) {
			case 'start':
				result = (
					<div>
				{/*<button onClick={this.props.back}>Back</button>*/}
				<button className="SoloStart" onClick={this.button.bind(this)}>Start</button> 
			</div>



				)
			break;
			case 'play':
				result = (
					<SoloPlay 
					activesentence={this.state.activeSentence} 
					back={this.props.back} 
					handlechange={this.handleChange} 
					answer={this.state.answer} 
					handlesubmit={this.handleSubmit} 
					game={this.props.game} 
					error={this.state.error}
					index={this.state.scoreIndex}
					completed={this.state.completed}
					/>
					)
			break;
			case 'answers':
				result = (

					<Carousel sentences={this.state.gameSentences} />

					)
			break;
			default:
			result = <h1>somthing went wrong</h1>
		}
		return result;
	}


	render() {

		
		return(
			<div className="SoloWaiting">
				<button className="BackButton" onClick={this.props.back}>{"<"} Back</button>
				{this.state.action !=='answers' ? <button className="AnswersButton" onClick={this.answers.bind(this)}>Answ {">"}</button> : null}
				<h1>{this.props.gamename}</h1>
				{this.addComponent()}
			</div>
			)
	}
}

export default SoloGame;