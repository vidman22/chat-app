import React, { Component } from 'react';

import io from 'socket.io-client';

import GamePlay from '../GamePlay/GamePlay';

import './JoinGame.css';

const socketUrl = "http://localhost:5000";
const socket = io(socketUrl);

export default class CreateGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name:"",
			room:"",
			error:"",
			action:'code',
			activePlayer:'',
			players: [],
			game: ""

		}
	}
	

	componentDidMount() {
		this.initSocket();
	}

	initSocket = () => {

		socket.on('JOINED', () => {
			console.log('joined room');
			
		});

		socket.on('START_GAME', ( game ) => {
			console.log("game ", game );
			this.setState({
				game,
				action:'game'
				

			})
		});
	}

	handleCodeSubmit = (e) => {
		e.preventDefault();
		const room = this.state.room;
		socket.emit('JOIN_ROOM', room, (res) => {
			// if error post error, if success change action to load new input form 
			if ( res ) {
				this.setState({
					error: res
			});
			} else {
				this.setState({
					action: 'name'		
					
				});
			}
			
		});
	}

	handleCodeChange = (e) => {

		this.setState({
			room:e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		socket.emit('NEW_PLAYER', this.state.room, this.state.name);

		this.setState({
			action: 'waiting'

		});

	}

	handleChange = (e) => {

		this.setState({ name: e.target.value });
	}

	addComponent() {
		let result;
		switch(this.state.action) {

			case 'code':
			result = (
				<div className="login">
					<form onSubmit={this.handleCodeSubmit} className="login-form" >

						<h2>Add a Join Code</h2>
						<input
							type="text"
							name="code"
							value={this.state.room}
							onChange={this.handleCodeChange}
							placeholder={''}
						/> 
					    <div className="error">{this.state.error ? this.state.error : null}</div>
					</form>
				
				
				    
				</div>

				)
			break;
			case 'name':
			  result = (
			  	<div className="login">
			  	    <form onSubmit={this.handleSubmit} className="login-form" >
				  
						<h2>Add a Name</h2>
				  
					<input
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
						placeholder={'Name'}
					/>
					
					</form>
				</div>
					)
			break;
			case 'waiting':
				result = (
					<h1>waiting...</h1>
					)
			break;
			case 'game':
				result = (
					<GamePlay game={this.state.game} /> 
					)
			break;
			default:
			result = <h1>thank you come again</h1>
		}
		return result;
	}



	render() {	
		
		return (
		  <div>
			{this.addComponent()}
		  </div>
		);
	}
}