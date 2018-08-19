import React, { Component } from 'react';

import LessonLink from '../../components/LessonLink/LessonLink';
import { Link, withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import './UserPage.css';

const USER_LESSONS = gql`
  query UserLessons( $authorID: String! ){
    userLessons( authorID: $authorID ) {
      id
      title
      author
      authorID
    }
  }
`;


class CreateGame extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}

	render() {
		let authorID = this.props.match.params.user;
    // console.log("authorID " + authorID);
		return (
				
     			<Query 
     			query={USER_LESSONS}
     			variables={{ authorID }}>

      			{({ loading, error, data}) => {

        			if (loading) return <div className="spinner spinner-1"></div>;
        			if (error) return `Error! ${error.message}`;

        			return (
          			<div className="UserLessonLinks">
            			{data.userLessons.map( (lesson, index) => (<Link key={index} to={`/lessons/${lesson.id}`}>
              			<LessonLink 
              			id={lesson.id}  
              			title={lesson.title} 
              			author={lesson.author}
              			/>
              			</Link>))}
            
            
          			</div>
          			);
      			}}
      			</Query>      


			)
	}

};

export default withRouter(CreateGame);