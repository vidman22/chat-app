import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Lesson.css';
import Sentence from '../Sentence/Sentence';
import smartPhone from '../../assets/svg/smartphone-iphone.svg';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import * as actionTypes from '../../store/actionTypes';

const LESSON_SET = gql`
  query LessonSet($id: String!){
    lessonSet(id: $id ) {
      id
      title
      author
      sentences{
        alts
        answer
        hint
        sentence
      }
    }
  }
`;


class Lesson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      working: true,
      values: {},
      correctInputs: {},
      activeValue: false
    }
  }

  // componentDidMount() {
  //   console.log(this.props);
  // }

  inputChangedHandler(e, index) {
    const values = {...this.state.values};
    let value = ''

    if (values[`value${index}`] || values[`value${index}`] === "" ) {
      
      values[`value${index}`] = e.target.value;

      this.setState({
        values
      })
      // console.log("value ", this.state.values[`value${index}`]);

    } else {
        const key = `value${index}`;
        value = e.target.value;
        let obj = {[key]: value};
        const newObj = Object.assign(obj, values);
        this.setState({
          activeValue: true,
          values: newObj
    })
   }
  }

  handleCheck(index, answer, alts) {
    const values = {...this.state.values};
    const correctInputs = {...this.state.correctInputs};

    if ( values[`value${index}`] === answer ) {
     
      let property = `value${index}`;
      const newObj = Object.defineProperty(correctInputs, property, {
        value: 'correct',
        writable: true
      });
      this.setState({
        correctInputs: newObj
      });
    } if (values[`value${index}`] !== answer) {
      
      let property = `value${index}`;
      const newObj = Object.defineProperty(correctInputs, property, {
        value: 'incorrect',
        writable: true
      });
        this.setState({
        correctInputs: newObj
      }); 
   }
  } 

  handleCheckOnEnter(index, answer, alts, e) {
    e.preventDefault();

    const values = {...this.state.values};
    const correctInputs = {...this.state.correctInputs};

    if ( values[`value${index}`] === answer ) {
      
      let property = `value${index}`;
      const newObj = Object.defineProperty(correctInputs, property, {
        value: 'correct',
        writable: true
      });
      this.setState({
        correctInputs: newObj
      });
    } if (values[`value${index}`] !== answer) {
      
      let property = `value${index}`;
      const newObj = Object.defineProperty(correctInputs, property, {
        value: 'incorrect',
        writable: true
      });
        this.setState({
        correctInputs: newObj
      }); 
   }

  }



  render() {
  
    return (
       <Query 
      query={LESSON_SET}
      variables={{id: this.props.match.params.id}}>
      {({ loading, error, data}) => {
        if (loading)  return <div className="spinner spinner-1"></div>;
        if (error) return `Error!: ${error}`;
        
        return (
          <div className="LessonTab">
            
           <div className="LessonOptions">
            
                <div className="HomeFlex">
                  <div className="Solo">
                    <Link to={`/solo-play/${this.props.match.params.id}`} onClick={() => this.props.sendLesson(data.lessonSet)} style={{color: 'black', textDecoration: 'none' }}>
                     <h1>Solo Play</h1>
              
                   <img className="SoloPhone"
                      src={smartPhone}
                       width="120px"
                       height="240px"
                       alt="phone"
                     />
                   </Link>
                  </div>
                 <div className="PhoneBox">
                   <Link to={`/host-game/${this.props.match.params.id}`} onClick={() => this.props.sendLesson(data.lessonSet)} style={{color: 'black', textDecoration: 'none' }}>
                     <h1>Host Game</h1>
                   
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
                  </Link>
                  </div>
                </div>
                <div className="LessonSentencesWrapper"> 
                  <div className="LessonTitle">
                    <h1>{data.lessonSet.title}</h1>
                  </div>
                  {data.lessonSet.sentences.map((sentence, index) => (
                    <div className="LessonSentence" key={index}>
                      <p>{index + 1}</p>
                      <Sentence 
                        handlechange={(event) => this.inputChangedHandler(event, index)}
                        handlesubmit={(e) => this.handleCheckOnEnter(index, sentence.answer, sentence.alts, e)}
                        value={ this.state.values[`value${index}`] ? this.state.values[`value${index}`] : '' }
                        sentence={sentence.sentence} 
                        correct={sentence.answer}
                        message={ this.state.correctInputs[`value${index}`] ? this.state.correctInputs[`value${index}`] : ''}
                        exercise='true' 
                        placeholder={sentence.hint} />
                        <button className="ExerciseButton" onClick={()=>this.handleCheck(index, sentence.answer, sentence.alts)}>Check</button>
                    </div>))}

                </div>
           </div>
          </div>

        );
     }}
     </Query>

      )
  }
    
};


const mapDispatchToProps = dispatch => {
  return {
    sendLesson: (lesson) => dispatch({type: actionTypes.LESSON_SET, lesson:lesson })
  }
}

const mapStateToProps = state => {
  return {
    lesson: state.lessonSet
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Lesson );
