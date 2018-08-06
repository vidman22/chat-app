import React, { Component } from 'react';

import SoloPlay from '../../components/SoloPlay/SoloPlay';
import Carousel from "../../components/Carousel/Carousel";
import {withRouter} from 'react-router-dom';

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
			message:''
		}

	}

	UNSAFE_componentWillMount() {
		console.log(this.props);

		let gameSentences = this.props.lesson.sentences;

		const activeSentence = gameSentences[0];

		const gameName = this.props.lesson.title;
		
		this.setState({
			gameSentences,
			gameName,
			activeSentence
		});


	}

	// shuffle(array) {
	// 	console.log(array);
	// 	let currentIndex = array.length, temporaryValue, randomIndex;
	// 	console.log("length " + array.length );
	// 	console.log("current index " + currentIndex);

	// 	while (0 !== currentIndex) {

	// 		randomIndex = Math.floor(Math.random() * currentIndex);
	// 		currentIndex -= 1;

	// 		temporaryValue = array[currentIndex];
	// 		array[currentIndex] = array[randomIndex];
	// 		array[randomIndex] = temporaryValue;
	// 	}

	// 	return array;
	// }



	handleSubmit = (e) => {
		e.preventDefault();

		let answer = this.state.answer;
		let sentenceIndex = this.state.sentenceIndex;
		let scoreIndex = this.state.scoreIndex;

		answer = answer.toLowerCase().trim();

		//correct answer ===========================================
		if (answer === this.state.activeSentence.answer) {
			

			
			if ( sentenceIndex < this.state.gameSentences.length - 1 ) {
				sentenceIndex++;
				scoreIndex++;
				const activeSentence = this.state.gameSentences[sentenceIndex];

				this.setState({ message: 'correct'});

				setTimeout(() => {
					this.setState({
						activeSentence,
						answer:'',
						message:'',
						scoreIndex,
						sentenceIndex
					});
				}, 1000);	
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
				message: 'incorrect'
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
			message:''
		});
	}

	handleChange = (e) => {

		this.setState({ answer: e.target.value });
	}

	back() {
	
		this.props.history.push(`/lessons/${this.props.lesson.id}`);
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
						<h1>{this.state.gameName}</h1>
						<button className="SoloStart" onClick={this.button.bind(this)}>Start</button> 
					</div>



				)
			break;
			case 'play':
				result = (
					<SoloPlay 
						activesentence={this.state.activeSentence} 
						gamename={this.state.gameName}
						handlechange={this.handleChange} 
						answer={this.state.answer} 
						handlesubmit={this.handleSubmit}  
						message={this.state.message}
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
				<button className="BackButton" onClick={() => this.back()}>{"<"} Back</button>
				{this.state.action !=='answers' ? <button className="AnswersButton" onClick={this.answers.bind(this)}>Answ {">"}</button> : null}
				<h1>{this.props.gamename}</h1>
				{this.addComponent()}
			</div>
			)
	}
}

export default withRouter(SoloGame);