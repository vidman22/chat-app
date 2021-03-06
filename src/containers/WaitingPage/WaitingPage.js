import React, { Component } from 'react';
import Players from '../../components/Players/Players';
import Teams from '../../components/Team/Team';
import GameBoard from '../GameBoard/GameBoard';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import Grammar from '../../Grammar.json';

import './WaitingPage.css'

import io from 'socket.io-client';

const GrammarTest = Grammar.Grammar;


// const socketUrl = 'http://localhost:5000/';
const socket = io();


class WaitingPage extends Component {

	constructor(props) {
		super(props);


		this.state = {
			gameName: null,
			gameSentences: null,
			room: '',
			players: [],
			disabled:true,
			arrayOfTeams: null,
			button: 'buttons',
			action: 'players',
			winner: null,
			openModal: false
		}


	}


	componentDidMount() {
		this.loadGame();
		this.initSocket();
	}

	
	loadGame() {
				let gameSentences = GrammarTest[this.props.activegame].sentences;
				gameSentences = this.shuffle(gameSentences);
				gameSentences= gameSentences.slice(0,12);
				this.setState({ 
						gameSentences,
						gameName: GrammarTest[this.props.activegame].name 
					});
    };

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
	};

	initSocket() {

		const room = this.randomDigits();
		this.setState({
			 room
			 
		});
	
		socket.emit('NEW_ROOM', room );

		

		socket.on('UPDATED_PLAYERS', (users) =>{
			let players = [...this.state.players];
			players = users;

			this.setState({
				players
			});
			
			if (players.length >= 2) {
				this.setState({
					disabled: false
				});
			}
		});

		socket.on('WINNER', (user) =>{
			
			this.setState({
				winner: user,
				openModal: true
			})
		});

		socket.on('SCORE', (users) => {
			let players = [...this.state.players];
			players = users;

			this.setState({
				players
			});
			
		});

		socket.on('PLAY_AGAIN', (users) => {
			let players = [...this.state.players];
			players = users;

			this.setState({
				players
			});
		});
	};

	randomDigits() {
		
		let code = '';
		for ( let i = 0; i < 6; i++ ) {
			let rand_num = Math.floor((Math.random() * 10 ));
			code += rand_num;
		}
		return code;
	}

	shuffleTeams() {

		const players = [...this.state.players];
		const room = this.state.room;

		socket.emit('SHUFFLE', room, players, (res) =>{
			this.setState({
				arrayOfTeams: res,
				button:'Start',
				action:'teams'
			});

		});

	};

	start(e) {
		
		e.preventDefault();
		const players = [...this.state.players];
		const room = this.state.room;
		const activeGame = this.props.activegame;
		const gameSentences = this.state.gameSentences; 
		socket.emit('START_GAME', room, players, activeGame, gameSentences);
		this.setState({
			action:'gameboard'
		});
	};

	button() {

		this.setState({
			button: null
		});
	};

	playAgain() {
		this.loadGame();
		this.setState({
			openModal: false,
			winner: null,

		});
		socket.emit('PLAY_AGAIN', this.state.room, this.state.gameSentences );
	};

	addComponent() {
		let result;
		switch(this.state.action) {
			case 'players':
			result = (
					<Players 
						players={this.state.players} 
						room={this.state.room} 
						gamename={this.state.gameName} 
						shuffleteams={this.shuffleTeams.bind(this)} 
						back={this.props.back} 
						start={this.start.bind(this)} 
						disabled={this.state.disabled} 
						buttonstate={this.state.button} 
						button={this.button.bind(this)} 
					/>
				)
			break;
			case 'teams':
			result = (
					<Teams 
						arrayofteams={this.state.arrayOfTeams} 
						room={this.state.room} 
						gamename={this.state.gameName} 
						back={this.props.back} 
						start={this.start.bind(this)} 
						disabled={this.state.disabled}
					/>
				)
			break;
			case 'gameboard':
			result = (
				<div>
					<GameBoard players={this.state.players} arrayofteams={this.state.arrayOfTeams} />
					<Modal show={this.state.openModal} playAgain={this.playAgain.bind(this)} winner={this.state.winner} sentences={this.state.gameSentences} />
					{this.state.openModal ? <Backdrop show /> : null}
				</div>
				)
			break;
			default:
			result = (<div>Uh oh!</div>)

		}
		return result;
	}


	render() {
		
		return(
			<div className="WaitingWrapper">
				
				<div>
					{this.addComponent()}
				</div>
			</div>
			)
	}
}

export default WaitingPage;