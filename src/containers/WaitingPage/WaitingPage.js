import React, { Component } from 'react';
import Players from '../../components/Players/Players';
import Teams from '../../components/Team/Team';
import GameBoard from '../GameBoard/GameBoard';

import Grammar from '../../Grammar.json';

import './WaitingPage.css'

import io from 'socket.io-client';

const GrammarTest = Grammar.Grammar;

const socket = io('http://localhost:5000');

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
			action: 'players'
		}
	}


	componentDidMount() {
		this.loadGame();
		this.initSocket();
	}

	// componentDidUpdate() {
	// 	this.loadGame();

	// }
	
	loadGame() {
				const gameSentences = GrammarTest[this.props.activegame].sentence
				this.setState({ 
						gameSentences,
						gameName: GrammarTest[this.props.activegame].name 
					});
    };

	initSocket() {
		const room = this.randomDigits();
		this.setState({
			 room
		});
	
		socket.emit('NEW_ROOM', room );

		socket.on('JOINED', () => {
			console.log('joined room');
		});

		socket.on('UPDATED_PLAYERS', (users) =>{
			let players = [...this.state.players];
			players = users;

			this.setState({
				players
			});
			console.log("players in state ", this.state.players);
			if (players.length >= 1) {
				this.setState({
					disabled: false
				});
			}
		socket.on('WINNER', (user) =>{
			console.log("our winner is " + user);
		});
		});

		socket.on('SCORE', (users) => {
			let players = [...this.state.players];
			players = users;

			this.setState({
				players
			});
			console.log("successful score ", this.state.players);
		})
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
		console.log("shuffle teams clicked");
		console.log("players in shuffle", this.state.players);
		const players = [...this.state.players];
		const room = this.state.room;

		socket.emit('SHUFFLE', room, players, (res) =>{
			this.setState({
				arrayOfTeams: res,
				button:'Start',
				action:'teams'
			});

		});

	}

	start(e) {
		e.preventDefault();
		const players = [...this.state.players];
		const room = this.state.room;
		const activeGame = this.props.activegame;
		
		socket.emit('START_GAME', room, players, activeGame);
		this.setState({
			action:'gameboard'
		});
	}

	button() {

		this.setState({
			button: null
		})
	}

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
					<GameBoard players={this.state.players} arrayofteams={this.state.arrayOfTeams} />
				)
			break;
			default:
			result = (<div>Uh oh!</div>)

		}
		return result;
	}


	render() {
		
		return(
			<div>
				
				<div>
					{this.addComponent()}
				</div>
			</div>
			)
	}
}

export default WaitingPage;