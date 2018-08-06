import React, { Component } from 'react';


export default class Players extends Component {
	


	render() {

		let players = (
				<div>
					{this.props.players.map((player, index) => {
					return (
						<div className="Player" key={index}>
							<p>{index + 1}  {player.playerName}</p>
						</div>
					)
					})}
				</div>
		);

		
		return (
			<div className="Waiting">
				<button className="BackButton" onClick={this.props.back}>{"<"} Back</button>
				<h1>{this.props.gamename}</h1>
				<h2>Students go to: <em><strong>www.grammify.win</strong></em></h2>
				<h2>Add the code below to play!</h2>
				<h3>{this.props.room}</h3>
				
				
				{ players }
				
				
				<button disabled={this.props.buttonstate} onClick={this.props.start.bind(this)}>Start</button>
			</div>
			)
	}

}