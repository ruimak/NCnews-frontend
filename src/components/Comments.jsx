import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Vote from './Vote';
import Post from './Post';
import Delete from './Delete';

class Comments extends Component {
  state = {
    comments: [],
    loggedInUser: {
      name: 'Amy Happy',
      username: 'happyamy2016',
      id: '5b9bc4254c18302d443a6330'
    }
  };
  componentDidMount() {
    axios
      .get(
        this.props.location
          ? `https://northcoders-news-ruimak.herokuapp.com/api${
              this.props.location.pathname
            }`
          : `https://northcoders-news-ruimak.herokuapp.com/api/articles/${
              this.props.articleId
            }/comments`
      )
      .then(comments => {
        this.setState({ comments: comments.data.comments });
      })
      .catch(console.log);
  }
  render() {
    console.log('re-rendering the comments...');
    return (
      <div className="displayInfoArea">
        {this.props.location ? (
          <h1 className="title">Comments</h1>
        ) : (
          <h4>Comments</h4>
        )}
        <Post
          id={this.props.articleId}
          typeOfPost="comment"
          postNew={this.postNewComment}
        />
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
                {comment.created_by.name === this.state.loggedInUser.name ? (
                  <Delete
                    commentId={comment._id}
                    deleteFunction={this.deleteFunction}
                  />
                ) : null}
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
  deleteFunction = id => {
    return axios
      .delete(
        `https://northcoders-news-ruimak.herokuapp.com/api/comments/${id}`
      )
      .then(deletedComment => {
        this.setState({
          comments: this.state.comments.filter(comment => {
            return comment._id !== deletedComment.data.comment._id;
          })
        });
      });
  };

  postNewComment = (id, content) => {
    return axios
      .post(
        `https://northcoders-news-ruimak.herokuapp.com/api/articles/${id}/comments`,
        { body: content, created_by: '5b9bc4254c18302d443a6330' }
      )
      .then(({ data }) => {
        console.log(data, 'data <--------------');
        console.log(this.state, 'stateeeeeeeeeee');
        this.setState({ comments: [data.comment, ...this.state.comments] });
      });
  };
}

export default Comments;
