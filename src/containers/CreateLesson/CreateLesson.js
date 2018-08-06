import React, { Component } from 'react';
import InputSentence from '../../components/InputSentence/InputSentence';
import InputAlt from '../../components/InputAlt/InputAlt';


import './CreateLesson.css';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


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
      alts: [{ 
        value: '',
        validation: {
          required: false,
          msg: ''
        },
        valid: false,
        touched: false
          }]
    },
    formIsValid: false,
    lessonFormNum: 5,
    lessonFormArray: []
  }
 
}

  componentDidMount() {
    const lessonFormArray = [];
      const lessonForm = {...this.state.lessonForm};

      for (let i=0; i< this.state.lessonFormNum; i++) {
        lessonFormArray.push(lessonForm);
      }
      this.setState({lessonFormArray});
      
  }

  addSentence() {
    const lessonFormArray = [...this.state.lessonFormArray]
    const lessonForm = {...this.state.lessonForm}
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

    let altForm = [
      ...lessonForm.alts
    ]

    altForm = altForm[0];

    

    const updatedLessonForms = [
      ...this.state.lessonFormArray
    ];

    const updatedForm = {
      ...updatedLessonForms[index]
    };

  
  

    const updatedAlts = [
      ...updatedForm.alts
    ];

    updatedAlts.push(altForm);

    updatedLessonForms[index] = updatedForm;
    updatedForm.alts = updatedAlts;
    

    this.setState({ lessonFormArray: updatedLessonForms});


  };

  removeAlt(formIndex, altIndex, e) {
    e.preventDefault();
    console.log('form index ' + formIndex);
    console.log('alt index ' + altIndex);
    const updatedLessonForms = [
      ...this.state.lessonFormArray
    ]

    const updatedForm = {
      ...updatedLessonForms[formIndex]
    }

    const updatedAlts = [
      ...updatedForm.alts
    ];
    // eslint-disable-next-line
    const removed = updatedAlts.splice(altIndex, 1);


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

  checkValidity(value, rules, indentifier) {
        
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    };

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
        // console.log("updated Element", updatedElement )
        

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation );

        if (inputIdentifier === 'answer') {
            const sentence = updatedForm['sentence'].value.toLowerCase();
            const answer = event.target.value.toLowerCase().trim()
      
            const index = sentence.indexOf(answer);

            const updateValidation = {
              ...updatedElement.validation
            }

            updatedValidation.msg = '';

            if (index === -1 ) {
              console.log("word not found");
              updatedValidation.msg = 'word not found in sentence';
            } else {
              updateValidation.msg = '';
            }
          // const index2 = index + event.target.value.length;

        }




        updatedElement.touched = true;
        updatedLessonForms[index] = updatedForm;
        updatedForm[inputIdentifier] = updatedElement;
        updatedElement.validation = updatedValidation;

        // console.log(updatedLessonForms[index][inputIdentifier])
        
        // let formIsValid = true;
        // for (let inputIdentifier in updatedForm) {
        //     formIsValid = updatedLessonForms[index][inputIdentifier].valid && formIsValid;
        // }
        this.setState({ lessonFormArray: updatedLessonForms });

    };

  inputChangedAltHandler = (e, formIndex, altIndex) => {

    const updatedForms = [
      ...this.state.lessonFormArray
    ];

    const updatedForm = {
      ...updatedForms[formIndex]
    };

    const updatedAlts = [
      ...updatedForm.alts
    ];

    

    const updatedAlt = {
      ...updatedAlts[altIndex]
    }



    updatedAlt.value = e.target.value;

    updatedForms[formIndex] = updatedForm;
    updatedForm['alts'] = updatedAlts;
    updatedAlts[altIndex] = updatedAlt;

    this.setState({ lessonFormArray: updatedForms });

  }

  handleTitleChange = (e) => {
    const title = {
      ...this.state.title
    };

    title.value = e.target.value;
    title.valid = this.checkValidity(title.value, title.validation);
    title.touched = true;
    this.setState({title});
  }

  render() {
      
      const formArray = [];
      console.log("lesson forms ", formArray)
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
            <svg className="DeleteSentence" onClick={(e) => this.removeSentence(formElement.id, e)} xmlns="http://www.w3.org/2000/svg" fill="#ccc" x="0px" y="0px" viewBox="0 0 510 510" width="20px" height="20px">
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
              
            <div className="AltAddWrapper">{formElement.config.alts.map( (alt, index) => (
              <div key={index}>
              
                <InputAlt 
                   onclick={(e) => this.removeAlt(formElement.id, index, e)}
                   altValue={formElement.config.alts[index].value}
                   altInvalid={!formElement.config.alts.valid}
                   altShouldValidate={formElement.config.alts.validation}
                   altTouched={formElement.config.alts.touched}
                   altChanged={(event) => this.inputChangedAltHandler(event, formElement.id, index)}
                />
                
                 
              </div>
                  ))}
              <svg className="AddAlt" fill="#ccc" onClick={(e) => this.addAlt(formElement.id, e)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 510 510" width="20px" height="20px">
                <path d="M256 0C114.844 0 0 114.844 0 256s114.844 256 256 256 256-114.844 256-256S397.156 
                  0 256 0zm149.333 266.667a10.66 10.66 0 0 1-10.667 10.667H277.333v117.333a10.66 10.66 0 0 1-10.667
                  0.667h-21.333a10.66 10.66 0 0 1-10.667-10.667V277.333H117.333a10.66 10.66 0 0 1-10.667-10.667v-21.333a10.66 10.66
                  0 0 1 10.667-10.667h117.333V117.333a10.66 10.66 0 0 1 10.667-10.667h21.333a10.66 10.66 0 0 1 10.667 10.667v117.333h117.333a10.66
                  10.66 0 0 1 10.667 10.667v21.334z"/>
              </svg>
            </div>
            
          </div>
          )
        }
          )}

            </form>

            <button className="CreateSentenceButton" disabled={false} onClick={() => this.addSentence()}>Add</button>
            
            
        </div>
        )
     

    return (
      <div>
        <div className="CreateLesson">
          <input
            className="LessonTitleInput"
            value={this.state.title.value}
            onChange={(e) => this.handleTitleChange(e)}
            type="text"
            placeholder="Title"
          />
          {form}
          <button className="CreateButton" disabled={this.state.formIsValid} onClick={() => this._createLesson()}>Create</button>
        </div>
        
      </div>
    )
  }

  _createLesson = async () => {
  const title = this.state.title.value;
  const stateSentences = [...this.state.lessonFormArray];
  const sentences = stateSentences.map( sntnc => {
    let rObj = {};
    let alts =[];
    rObj['answer'] = sntnc.answer.value;
    rObj['sentence'] = sntnc.sentence.value;
    rObj['hint'] = sntnc.hint.value;
    rObj['alts'] = alts;
    sntnc.alts.map( alt => {
     return alts.push(alt.value);
    })
    return rObj;  
  });
  console.log("sentences", sentences);
  await this.props.createLesson({

    variables: {
      title,
      author: "yous",
      sentences
      
    }
  });
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

// 3
export default graphql(ADD_LESSON, { name: 'createLesson' })(CreateLesson)