import React, { Component } from 'react';
import InputSentence from '../../components/InputSentence/InputSentence';
import InputAlt from '../../components/InputAlt/InputAlt';
import {Prompt} from 'react-router';


import './CreateLesson.css';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

let showConst = null;

class CreateLesson extends Component {
  constructor(props) {
    super(props);
  this.state = {
    title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Lesson Title'
        },
        value: '',
        validation: {
          required: true,
          msg: ''
        },
        valid: false,
        touched: false
    },
    lessonForm: {
      sentence: {
        
        value: '',
        validation: {
          required: true,
          msg: ''
        },
        valid: false,
        touched: false
      },
      answer: {
        
        value: '',
        validation: {
          required: true,
           msg: ''
        },
        valid: false,
        touched: false
      },
      hint: {
        
        value: '',
        validation: {
          required: false,
          msg: ''
        },
        valid: false,
        touched: false
      },
      alts:{
        showDiv:'Hide',
        array: [{ 
        value: '',
        validation: {
          required: true,
          msg: ''
        },
        valid: false,
        touched: false
          }],
        valid: true
      } 
      
    },
    addSentenceDisabled: false,
    formIsValid: false,
    addAltDisabled: false,
    lessonFormNum: 5,
    lessonFormArray: [],
    formIsHalfFilledOut: false,
    showExAnswer: false
  }
 this.showExAnswer = this.showExAnswer.bind(this);
 this.checkFormValidity = this.checkFormValidity.bind(this);
 this.addAlt = this.addAlt.bind(this);
}

  

  componentDidMount() {
    const lessonFormArray = [];
      const lessonForm = {...this.state.lessonForm};

      for (let i=0; i< this.state.lessonFormNum; i++) {
        lessonFormArray.push(lessonForm);
      }
      this.setState({lessonFormArray});

      showConst = setInterval(this.showExAnswer, 6000);
      
  }

  componentWillUnmount() {
    clearInterval(showConst);
  }

  showExAnswer() {
    this.setState( prevState => {
      return { showExAnswer: !prevState.showExAnswer }
    })
  }


  addSentence() {

    const lessonFormArray = [...this.state.lessonFormArray]
    const lessonForm = {...this.state.lessonForm}

    if (lessonFormArray.length >= 21) {
      this.setState({
        addSentenceDisabled: true
      });
    } 
    lessonFormArray.push(lessonForm);
    this.setState({
      lessonFormArray
    });
  }

  addAlt(index, event) {
    event.preventDefault();
    
    const lessonForm = {
      ...this.state.lessonForm
    }

    let alts = {
      ...lessonForm.alts
    }

    let altForm = [
      ...alts.array
    ]

    altForm = altForm[0];

    

    const updatedLessonForms = [
      ...this.state.lessonFormArray
    ];

    const updatedForm = {
      ...updatedLessonForms[index]
    };

    const updatedAlts = {
      ...updatedForm.alts
    };

    const updatedAltArray = [
      ...updatedAlts.array
    ]

    if (updatedAltArray.length >= 4 ) {
      this.setState({addAltDisabled: true});
    }

    updatedAltArray.push(altForm);

    updatedLessonForms[index] = updatedForm;
    updatedForm.alts = updatedAlts;
    updatedAlts.array = updatedAltArray;
    

    this.setState({ lessonFormArray: updatedLessonForms});


  };

  altMouseOverEvent(index) {
     const updatedLessonForms = [
      ...this.state.lessonFormArray
    ];

    const updatedForm = {
      ...updatedLessonForms[index]
    };

    const updatedAlts = {
      ...updatedForm.alts
    }

   if (updatedAlts.showDiv === 'Hide') {
    updatedAlts.showDiv = 'Show';
   } else {
    updatedAlts.showDiv = 'Hide'; 
   }
    updatedForm.alts = updatedAlts;
    updatedLessonForms[index] = updatedForm;
    
    this.setState({ lessonFormArray: updatedLessonForms});
    
  }

  removeAlt(formIndex, altIndex, e) {
    e.preventDefault();

    const updatedLessonForms = [
      ...this.state.lessonFormArray
    ]

    const updatedForm = {
      ...updatedLessonForms[formIndex]
    }

    const updatedAlts = {
      ...updatedForm.alts
    };

    const updatedAltArray = [
      ...updatedAlts.array
    ]
    // eslint-disable-next-line
    const removed = updatedAltArray.splice(altIndex, 1);

    updatedAlts.array = updatedAltArray;
    updatedForm.alts = updatedAlts;
    updatedLessonForms[formIndex] = updatedForm;


    this.setState({
      lessonFormArray: updatedLessonForms
    });

  }

  removeSentence(formIndex, e) {
    e.preventDefault();
    const updatedLessonForms = [
      ...this.state.lessonFormArray
    ];

    const removed = updatedLessonForms.splice(formIndex, 1);

    console.log(formIndex, removed);
    this.setState({
      lessonFormArray: updatedLessonForms
    })
  }


  inputChangedHandler = (event, inputIdentifier, index) => {
    
        const updatedLessonForms = [
            ...this.state.lessonFormArray
        ];
        const updatedForm = { 
            ...updatedLessonForms[index]
        };
        
        const updatedElement = {
          ...updatedForm[inputIdentifier]
        }
        const updatedValidation = {
          ...updatedElement.validation
        }
        

         if (inputIdentifier === 'answer') {
            const sentence = updatedForm['sentence'].value.toLowerCase();
            const answer = event.target.value.toLowerCase().trim();
      
            const index = sentence.indexOf(answer);

            updatedValidation.msg = '';
            updatedElement.valid = false;

            if (answer === '') {
              updatedValidation.msg = 'add an answer';
              updatedElement.valid = false;
            } else if (index === -1 ) {
              updatedElement.valid = false;
              updatedValidation.msg = 'answer not found in sentence';
            } else {
              updatedElement.valid = true;
            }
        }

        if (inputIdentifier === 'hint') {
          const hint = event.target.value.trim();
          updatedValidation.msg = '';
          if ( hint === '' ){
            updatedValidation.msg = 'add a hint';
            updatedElement.valid = false;
          } else if ( hint.length >= 50 ) {
            console.log('value length triggered ' + hint.length)
            updatedValidation.msg = 'hint is too long';
            updatedElement.valid = false;
          } else {
            updatedElement.valid = true;
          }
        }

        if (inputIdentifier === 'sentence') {
          const sentence = event.target.value;
          updatedValidation.msg = '';
          if ( sentence.trim() === '' ){
            updatedValidation.msg = 'add a sentence';
            updatedElement.valid = false;
          } else if (sentence.length >= 140) {
            updatedValidation.msg = 'sentence is too long';
            updatedElement.valid = false;
          } else {
          updatedElement.valid = true;
        }
      }

        console.log('updated element after ', updatedElement.valid);
        updatedElement.value = event.target.value;
        
        updatedElement.touched = true;

        updatedLessonForms[index] = updatedForm;
        updatedForm[inputIdentifier] = updatedElement;
        updatedElement.validation = updatedValidation;
        
        let formIsValid = this.checkFormValidity();
          console.log('form is valid ' + formIsValid);
        if (formIsValid) {
          
          this.setState({formIsValid, lessonFormArray: updatedLessonForms, formIsHalfFilledOut:false});
        } else {
            this.setState({ 
            lessonFormArray: updatedLessonForms,
            formIsHalfFilledOut: true 
          });
        }
};


  checkFormValidity = () => {
    const lessonFormArray = this.state.lessonFormArray;
    let formIsValid = true;
    for ( let i = 0; i < lessonFormArray.length; i++) {
      for ( let property in lessonFormArray[i] ) {
        console.log('lesson form prop in for in loop ', lessonFormArray[i][property]);
        formIsValid = lessonFormArray[i][property].valid && formIsValid && this.state.title.valid;
      }
        
    }
    if (formIsValid === true ){
      return true
    } else {
      this.setState({formIsValid: false});
      return false
    }

  }


  inputChangedAltHandler = (e, formIndex, altIndex) => {

    const updatedForms = [
      ...this.state.lessonFormArray
    ];

    const updatedForm = {
      ...updatedForms[formIndex]
    };

    const updatedAlts = {
      ...updatedForm.alts
    };

    const updatedAltArray = [
      ...updatedAlts.array
    ];
        
    const updatedAlt = {
      ...updatedAltArray[altIndex]
    }

    const updatedAltValidation = {
      ...updatedAlt.validation
    }

    updatedAlt.value = e.target.value;
    updatedAlt.touched = true

    if (updatedAlt.value === '') {
      updatedAltValidation.msg = 'delete alt or add an answer';
      updatedAlt.valid = false;
    } else if (updatedAlt.value.length >= 30 ){
      updatedAltValidation.msg = 'alt is too long';
      updatedAlt.valid = false;
    } else {
      updatedAlt.valid = true;
    }

    updatedForms[formIndex] = updatedForm;
    updatedForm.alts = updatedAlts;
    updatedAlts.array = updatedAltArray;
    updatedAltArray[altIndex] = updatedAlt;
    updatedAlt.validation = updatedAltValidation;

    let formIsValid = this.checkFormValidity();

    if (formIsValid) {
      this.setState({ lessonFormArray: updatedForms, formIsValid });
    } else {
      this.setState({ lessonFormArray: updatedForms, formIsValid });
    }
    

  }

  handleTitleChange = (e) => {
    
    const updatedTitle = {
      ...this.state.title
    }

    updatedTitle.value = e.target.value;
    updatedTitle.touched = true;

    const updatedTitleValidation = {
      ...updatedTitle.validation
    }
    updatedTitleValidation.msg = '';

    if (updatedTitle.value.trim() === '') {
      updatedTitleValidation.msg = 'add a title';
      updatedTitle.valid = false;
    } else if (updatedTitle.value.length >= 40) {
      updatedTitleValidation.msg = 'title is too long';
      updatedTitle.valid = false;
    } else {
      updatedTitle.valid = true;
    }

    let formIsValid = this.checkFormValidity();

    updatedTitle.validation = updatedTitleValidation;

    this.setState({ title: updatedTitle, formIsHalfFilledOut: true, formIsValid });

    
  }

  render() {
      console.log('state', this.state);
      const formArray = [];
      for (let key in this.state.lessonFormArray) {
        formArray.push({
          id: key,
          config: this.state.lessonFormArray[key]
        });
      }

      
      let form = (
        <div>
        
         <form onSubmit={this.submitHandler}>
          {formArray.map((formElement) => {
            return (
          <div className="InputSentenceWrapper" key={formElement.id}>
            <p>{Number(formElement.id) + 1}</p>
            <svg className="DeleteSentence" onClick={(e) => this.removeSentence(formElement.id, e)} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#ccc" 
                viewBox="0 0 510 510" 
                x="0px" 
                y="0px" 
                width="20px" 
                height="20px">
              <path d="M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 
                41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 
                231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139
                 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 
                 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"/>
            </svg>

            <InputSentence 

                sentenceValue={formElement.config.sentence.value}
                sentenceInvalid={!formElement.config.sentence.valid}
                sentenceShouldValidate={formElement.config.sentence.validation}
                sentenceTouched={formElement.config.sentence.touched}
                sentenceChanged={(event) => this.inputChangedHandler(event, 'sentence', formElement.id)}

                answerValue={formElement.config.answer.value}
                answerInvalid={!formElement.config.answer.valid}
                answerShouldValidate={formElement.config.answer.validation}
                answerTouched={formElement.config.answer.touched}
                answerChanged={(event) => this.inputChangedHandler(event, 'answer', formElement.id)}

                hintValue={formElement.config.hint.value}
                hintInvalid={!formElement.config.hint.valid}
                hintShouldValidate={formElement.config.hint.validation}
                hintTouched={formElement.config.hint.touched}
                hintChanged={(event) => this.inputChangedHandler(event, 'hint', formElement.id)}

            />
              
            <div className="AltAddWrapper">{formElement.config.alts.array.map( (alt, index) => (
              <div key={index}>
              
                <InputAlt 
                   onclick={(e) => this.removeAlt(formElement.id, index, e)}
                   altValue={formElement.config.alts.array[index].value}
                   altInvalid={!formElement.config.alts.array[index].valid}
                   altShouldValidate={formElement.config.alts.array[index].validation}
                   altTouched={formElement.config.alts.array[index].touched}
                   altChanged={(event) => this.inputChangedAltHandler(event, formElement.id, index)}
                />
                
                 
              </div>
                  ))}
              <button className="AddAltButtonWrapper" disabled={this.state.addAltDisabled} onClick={(e) => this.addAlt(formElement.id, e)}>
              <svg className="AddAlt" 
              fill="#ccc" 
              onMouseOver={() => this.altMouseOverEvent(formElement.id)}
              onMouseOut={()=> this.altMouseOverEvent(formElement.id)}
               xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 510 510" width="20px" height="20px">
               
                <path d="M256 0C114.844 0 0 114.844 0 256s114.844 256 256 256 256-114.844 256-256S397.156 
                  0 256 0zm149.333 266.667a10.66 10.66 0 0 1-10.667 10.667H277.333v117.333a10.66 10.66 0 0 1-10.667
                  0.667h-21.333a10.66 10.66 0 0 1-10.667-10.667V277.333H117.333a10.66 10.66 0 0 1-10.667-10.667v-21.333a10.66 10.66
                  0 0 1 10.667-10.667h117.333V117.333a10.66 10.66 0 0 1 10.667-10.667h21.333a10.66 10.66 0 0 1 10.667 10.667v117.333h117.333a10.66
                  10.66 0 0 1 10.667 10.667v21.334z"/>
              </svg>
              </button>
              <div className={formElement.config.alts.showDiv}>Add an alternate answer</div>
            </div>
            
          </div>
          )
        }
          )}

            </form>

            <button className="ExerciseButton" disabled={this.state.addSentenceDisabled} onClick={() => this.addSentence()}>Add</button>
            
            
        </div>
        )
     

    return (
      <div>
        <div className="CreateLesson">
          <Prompt
            when={this.state.formIsHalfFilledOut}
            message="Are you sure you want to leave?"
          />
          <input
            className="LessonTitleInput"
            value={this.state.title.value}
            onChange={(e) => this.handleTitleChange(e)}
            type="text"
            placeholder="Title"
          />
          <span>{this.state.title.validation.msg}</span>
          <div className="ExampleSentence">
          <div className="ExampleSentenceHeader">Example Sentence:</div>
          
          <div className="ExampleSentenceWrapper"><div className="FirstHalfExample">The quick brown fox</div>
          {this.state.showExAnswer ?  <div className="TypedTextExample">jumps</div> : <div className="ExampleHint">jump</div> }
          <div className="SecondHalfExample">over the lazy dog.</div></div>
          <div className="ExampleKey">
            <ul>
              <li>Key</li>
              <li>Sentence: The quick brown fox jumps over the lazy dog.</li>
              <li>Answer: jumps</li>
              <li>Hint: jump</li>
              
            </ul>
          </div>
          
        </div>
          {form}
          <button className="CreateButton" disabled={!this.state.formIsValid} onClick={() => this._createLesson()}>Create</button>
        </div>
        
      </div>
    )
  }

  _createLesson = async () => {
    if (!this.props.user) {
      this.props.togglemodal();
    } else {
      const title = this.state.title.value;
      const stateSentences = [...this.state.lessonFormArray];
      const sentences = stateSentences.map( sntnc => {
        let rObj = {};
        let alts =[];
        rObj['answer'] = sntnc.answer.value;
        rObj['sentence'] = sntnc.sentence.value;
        rObj['hint'] = sntnc.hint.value;
        rObj['alts'] = alts;
        sntnc.alts.array.map( alt => {
        return alts.push(alt.value);
        })
        return rObj;  
      });
      console.log("sentences", sentences);
      await this.props.createLesson({

        variables: {
         title,
         author: this.props.user.name,
         sentences
      
        }
      });
    }
  }
}

const ADD_LESSON = gql`
  # 2
  mutation CreateLesson($title: String!, $author: String!, $sentences: [SentenceInput]) {
    createLessonSet( title: $title, author: $author, sentences: $sentences) {
      id
      title
      author
      sentences {
        sentence
        hint
        answer
        alts
      }
    }
  }
`

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const Container = graphql(ADD_LESSON, { name: 'createLesson' })(CreateLesson);
export default connect(mapStateToProps)(Container);