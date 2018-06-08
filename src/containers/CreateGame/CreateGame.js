import React, { Component } from 'react';

import WaitingPage from '../WaitingPage/WaitingPage';
import Tile from '../../components/Tile/Tile';
import './CreateGame.css';

export default class CreateGame extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			games: [ {
				name: "Simple Present",
				id:'simple-present',
				url: '../'
			}, {
				name: "Simple Past",
				id: 'simple-past',
				url: '../'
			}, {
				name: "Present Continuous",
				id: 'present-continuous',
				url: '../'
			}, {
				name: "Past Continuous",
				id: 'past-continuous',
				url: '../'
			}, {
				name: "Present Perfect",
				id: 'present-perfect',
				url: '../'
			}, {
				name: "Modals",
				id: 'modals',
				url: '../'
			}, {
				name: "Past Modals",
				id: 'past-modals',
				url: '../'
			}, {
				name: "Narrative Tenses",
				id: 'narrative-tenses',
				url: '../'
			}, {
				name: "Gerunds and Infinitives",
				id: 'gerunds-infinitives',
				url: '../'
			}, {
				name: "Conditionals",
				id: 'conditionals',
				url: '../'
			}, {
				name: "Verbs and Prepositions",
				id: 'verbs-prepositions',
				url: '../'
			}, {
				name: "AWL Families",
				id: 'awl-families',
				url: '../'
			}],
			activeGame: null
		}

		this.back = this.back.bind(this);
	}
	

	addComponent() {
		let result;
		switch(this.state.action) {
			case 'options':
			result = (
				<h1>waiting</h1>
				)
			break;

			case 'waiting':
			result = (
				<h1>waiting</h1>
				)
			break;

			default: 
				result = <h1>Uh oh!</h1>
			break;
		}
			return result;
	}

	gameSelectedHandler = ( game, e ) => {
		e.preventDefault();
		console.log("clicked");
		this.setState({ 
			activeGame: game
			})
	}

	
	back() {
		this.setState({
			activeGame: null
		})
	}

	render() {	
	
		const games = this.state.games.map((game, index) => {
			return (
				 	<Tile 
						onclick={(e) => this.gameSelectedHandler(game.id, e)}
						name = {game.name}
						key = {game.id}
					/>
	    		);
	});
		
		return (
			<div className="create">
				{ !this.state.activeGame ? <div className="page_title"><h1>Host Game</h1></div> : null}
				
				{ !this.state.activeGame ? games : <WaitingPage activegame={this.state.activeGame} back={this.back} games={this.state.games} /> }
				
				
			</div>
		);
	}
}