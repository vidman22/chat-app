import React, {Component} from "react";
import './Carousel.css';

let index = 0;
export default class Carsl extends Component {
	constructor (props) {
		super(props);

		this.state = {
			sentences:[],
			activeSentence: '',
		}
		this.slide = this.slide.bind(this)
	}
	UNSAFE_componentWillMount() {
		const gameSentences = this.props.sentences.slice(0,12);
		const activeSentence = gameSentences[0].sentence;
		this.setState({
			sentences: gameSentences,
			activeSentence
		});

	}
	slide(n) {
			index+=n;
			let sentences = this.state.sentences;
		if ( index === 12 ) {
			index = 0;
			this.setState({
				activeSentence: sentences[index].sentence
			});
			
			
		} if (index === -1 ) {
			
			index = 11;
			this.setState({
				activeSentence: sentences[index].sentence
			});
		} else {
			this.setState({
				activeSentence: sentences[index].sentence
			});
		}
	}

	

	render() {
		

		return (
			<div className="Carousel">
				
				<div className="Content">
					<div className="carouselButtons">
						<button onClick={() => this.slide(-1)} className="Previous">◀</button>
						<button onClick={this.slide.bind(this, 1)} className="Next">▶</button>
					</div>
				<div className="Sentence">
					{this.state.activeSentence}
				</div>
					
				</div>
			</div>
			)
	}
} 
  