import React, { Component } from 'react';
import Player from '../../components/Player/Player';

import './GameBoard.css'



class GameBoard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			players: null
		}
	}



	render() {

		const players = this.props.players.map((player, index) => {
			return (
				<Player key={index} name={player.playerName} score={player.score} /> 

				)
		});
		let teams = null;
		if (this.props.teams) {
			teams = this.props.teams.map((team, index) => {
				return (
					<Player key={index} name={index} score={2} />
					)
			});
		}


		return (
			<div className="player-board">
				{teams ? teams : players}
			</div>

			)
	}
};

export default GameBoard;