import React, { Component } from 'react';
import './LessonLink.css';

class LessonLink extends Component {
  render() {
    return (
    <div>
      <div className="LessonLinkTab">
        <div className="LessonLinkTitle">
          <h1>{this.props.title}</h1>
        </div>
        <div className="LessonLinkAuthor">
          <p>{this.props.author}</p>
        </div>
      </div>
    </div>
    )
  }


}

export default LessonLink;