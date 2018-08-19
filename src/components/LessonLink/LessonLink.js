import React, { Component } from 'react';
import './LessonLink.css';

class LessonLink extends Component {
  render() {
    return (
      <div className="LessonLinkTab">
        <div className="LessonLinkTitle">
          <h1>{this.props.title}</h1>
        </div>
        <div className="LessonLinkAuthor">
          <p>Author:</p> {this.props.author}
        </div>
      </div>
    )
  }


}

export default LessonLink;