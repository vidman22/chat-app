import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
			activeGame: null,
			room: '',
			players: [],
			disabled:true,
			arrayOfTeams: null
		}
	}


	componentDidMount() {
		this.loadGame();
		this.initSocket();
	}

	componentDidUpdate() {
		this.loadGame();

	}
	
	loadGame() {

		if ( this.props.match.params.id ) {
			// eslint-disable-next-line
			if (!this.state.activeGame || (this.state.activeGame !== this.props.match.params.id) ) {
				for ( let i = 0; i < this.props.games.length; i++ ) {
					// eslint-disable-next-line
					if (this.props.games[i].id == this.props.match.params.id ) {
						const activeGame = this.props.games[i].id;
						const gameSentences = GrammarTest[activeGame];
						this.setState({ 
										activeGame,
										gameSentences,
										gameName: this.props.games[i].name 
									 });
					}
				}
	  		}
		}
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
		
			if (players.length > 3) {
				this.setState({
					disabled: false
				});
			}
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
		const players = this.state.players;
		const room = this.state.room;

		socket.emit('SHUFFLE', room, players, (res) =>{
			this.setState({
				arrayOfTeams: res
			});

		});

	}

	start(e) {
		e.preventDefault();
		const players = this.state.players;
		const room = this.state.room;
		const activeGame = this.state.activeGame;
		console.log("start game clicked");
		socket.emit('START_GAME', room, players, activeGame);
	}



	render() {
		let players = (
				<div>
					{this.state.players.map((player, index) => {
					return (
						<div className="Player" key={index}>
							<p>{index + 1}  {player}</p>
						</div>
					)
					})}
				</div>
		);

		let teams = null;
		if ( this.state.arrayOfTeams ) {
			teams = (
			 <div>
		  		{this.state.arrayOfTeams.map((team, index) => {
		  		return (
		  			<div className="Team" key={index} >
						<p>{index + 1}</p>{ team.map((player, indx ) => {
							return (
								<div className = "Player" key={indx}>
									{player}
								</div>
								);
						})}
					</div>
				)
		  		})}
		  	 </div>	
		    );
		}

		let button = (
				<Link to={'/game-board/'}><button onClick={this.start.bind(this)}>Start</button></Link>
			)

		
		
		return(
			<div className="Waiting">
				<h1>{this.state.gameName}</h1>
				<h2>Go to <em>www.eggames.com/join-game</em></h2>
				<h2>Add the code below to play!</h2>
				<h3>{this.state.room}</h3>
				
				{ teams ? teams : players }
				<button disabled={this.state.disabled} onClick={this.shuffleTeams.bind(this)}>Shuffle</button>
				{ teams ? button : null }
			</div>
			)
	}
}

export default WaitingPage;