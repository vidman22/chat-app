import React, { Component } from 'react';
import SoloGame from '../SoloGame/SoloGame';
import Tile from '../../components/Tile/Tile';

import Grammar from '../../Grammar.json';

const GrammarTest = Grammar.Grammar;


export default class SoloPage extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			games: [ {
				name: "Simple Present",
				id:'simple-present'
			}, {
				name: "Simple Past",
				id: 'simple-past'
			}, {
				name: "Present Continuous",
				id: 'present-continuous'
			}, {
				name: "Past Continuous",
				id: 'past-continuous'
			}, {
				name: "Present Perfect",
				id: 'present-perfect'
			}, {
				name: "Modals",
				id: 'modals'
			}, {
				name: "Past Modals",
				id: 'past-modals'
			}, {
				name: "Narrative Tenses",
				id: 'narrative-tenses'
			}, {
				name: "Gerunds and Infinitives",
				id: 'gerunds-infinitives'
				
			}, {
				name: "Conditionals",
				id: 'real-future-conditionals'
			}, {
				name: "Verbs and Prepositions",
				id: 'verbs-prepositions'
			}, {
				name: "AWL Families",
				id: 'awl-families'
			}],
			action: 'options',
			activeGame: '',
			gameSentences: [],
			gameName: ''
		}

		this.start = this.start.bind(this);
		this.back = this.back.bind(this);
	}


	

	start(id, e) {
		e.preventDefault();
		console.log("clicked");
		let gameSentences = GrammarTest[id].sentences;
		let gameName = GrammarTest[id].name;
		this.setState({
			action: null,
			activeGame: id,
			gameSentences,
			gameName
		});
	}

	back() {
		this.setState({
			action: 'options'
		});
	}

	render() {	
	
		const games = this.state.games.map((game, index) => {
			return (
				 

				 	<Tile 
						onclick={(e) => this.start(game.id, e)}
						name = {game.name}
						key = {game.id}
						
					/>
				 
			
	    	);

		});
		
		return (
			<div className="create">
				{this.state.action === 'options' ? games : <SoloGame back={this.back} gamename={this.state.gameName} game={this.state.activeGame} sentences={this.state.gameSentences} />}
				
			</div>
		);
	}
}