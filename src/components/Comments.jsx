import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Vote from './Vote';

class Comments extends Component {
  state = { comments: [] };
  componentDidMount() {
    axios
      .get(
        `https://northcoders-news-ruimak.herokuapp.com/api${
          this.props.location.pathname
        }`
      )
      .then(comments => {
        console.log(comments);
        this.setState({ comments: comments.data.comments });
      })
      .catch(console.log);
  }
  render() {
    return (
      <div className="displayInfoArea">
        <h1 className="title">Comments</h1>
        {this.state.comments.map(comment => {
          return (
            <div key={comment._id} className="singleCommentDiv">
              <span className="commentBody">{comment.body}</span>
              <div className="commentDetails">
                <span>
                  {`By: ${comment.created_by.name} at ${moment(
                    comment.created_at
                  ).fromNow()}`}
                </span>
                <Vote
                  votes={comment.votes}
                  id={comment._id}
                  typeOfVote="comment"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Comments;
