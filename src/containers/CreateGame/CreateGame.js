import React, { Component } from 'react';
import {Route,  Link } from 'react-router-dom';
import WaitingPage from '../WaitingPage/WaitingPage';
import Tile from '../../components/Tile/Tile';


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
				id: 'present-perfect-continuous',
				url: '../'
			}, {
				name: "Past Modals",
				id: 'past-perfect',
				url: '../'
			}, {
				name: "Narrative Tenses",
				id: 'past-perfect-continuous',
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
		}
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

	gameSelectedHandler = ( game ) => {

		this.setState({ 
			activeGame: game
			})
	}

	

	render() {	
	
		const games = this.state.games.map((game, index) => {
			return (
				 <Link to={'/host-game/' + game.id} key={index}>

				 	<Tile 
						clicked={() => this.gameSelectedHandler( game.name )}
						name = {game.name}
						url = {game.url}
						key = {game.id}
						action={this.start}
					/>
				 </Link>
					

			
	    );
	});
		
		return (
			<div className="create">
				<Route path={this.props.match.url + '/:id'}  
                      exact render={(props) => <WaitingPage {...props} activegame={this.state.activeGame} games={this.state.games} />} />
				{games}
				
			</div>
		);
	}
}