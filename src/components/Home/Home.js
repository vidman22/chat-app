import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import smartPhone from '../../assets/svg/smartphone-iphone.svg';
import './Home.css';
export default class Home extends Component {
	
	
	render() {	
		
		return (
			<div className="Home">
			 <div className="HomeContent">
			 
			 </div>
			<div className="HomeFlex">
				<div className="PhoneBox">
					<Link to="/host-game" style={{color: 'black', textDecoration: 'none' }}>
						<h1>Host Game</h1>
					</Link>
						<svg width="170" height="120">
  							<rect x="5" y="20" rx="20" ry="20" width="150" height="90" 
  							style={{fill:"#23A6D5", stroke:"black", strokeWidth:"5", opacity:"0.5"}}/>
  							Sorry, your browser does not support inline SVG.
							</svg>
			 		 <div className="PhoneDisplay">
						<img className="Phones Phone1"
							src={smartPhone}
							width="80px"
							height="160px"
							alt="phone"
						/>
						<img className="Phones Phone2"
							src={smartPhone}
							width="80px"
							height="160px"
							alt="phone"
						/><img className="Phones Phone3"
							src={smartPhone}
							width="80px"
							height="160px"
							alt="phone"
						/><img className="Phones Phone4"
							src={smartPhone}
							width="80px"
							height="160px"
							alt="phone"
						/>
			 		 </div>
					 </div>

					<div className="Solo"><Link to='/solo-play' style={{color: 'black', textDecoration: 'none' }}>
						<h1>Solo Play</h1>
						</Link>
							<img className="SoloPhone"
							src={smartPhone}
							width="120px"
							height="240px"
							alt="phone"
						/>
						
					</div>

					<div className="AWL">
						<Link to='/academic-word-list' style={{ color: 'black', textDecoration: 'none' }}>
						<h1>Academic Word List</h1>
						</Link>
							<div className="TypedText">TRANSFORMATION</div>
						
					</div>

					<div className="Lessons">
					<Link to='/lessons' style={{ color: 'black', textDecoration: 'none' }}>
						<h1>Lessons</h1>
					</Link>
							<svg width="300" height="180">
  							<rect x="10" y="20" rx="20" ry="20" width="280" height="140" 
  							style={{fill:"#eee", stroke:"black", strokeWidth:"5"}}/>
  							Sorry, your browser does not support inline SVG.
							</svg>
					
					</div>
				</div>
		</div>

		);
	}
}