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

		let buttons = (
			<div>
				<button disabled={this.props.disabled} onClick={this.props.shuffleteams.bind(this)}>Teams</button><button disabled={this.props.disabled} onClick={this.props.button.bind(this)}>Individual</button> 
			</div>
			)
		
		return (
			<div className="Waiting">
				<button className="BackButton" onClick={this.props.back}>{"<"} Back</button>
				<h1>{this.props.gamename}</h1>
				<h2>Students go to: <em><strong>www.eggames.com/join-game</strong></em></h2>
				<h2>Add the code below to play!</h2>
				<h3>{this.props.room}</h3>
				
				
				{ players }
				
				
				{ this.props.buttonstate ? buttons : <button onClick={this.props.start.bind(this)}>Start</button> }
			</div>
			)
	}

}