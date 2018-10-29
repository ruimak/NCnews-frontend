import React, { Component } from 'react';
import moment from 'moment';
import Vote from './Vote';
import Post from './Post';
import Delete from './Delete';
import { getCommentsForArticle, deleteComments, postComment } from '../api.js';

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
    console.log(this.props.location, 'location');
    (this.props.location
      ? getCommentsForArticle(this.props.location.pathname)
      : getCommentsForArticle(`/articles/${this.props.articleId}/comments`)
    )
      .then(comments => {
        this.setState({ comments: comments.data.comments });
      })
      .catch(console.log);
  }
  render() {
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
                  {`By: ${
                    comment.created_by && comment.created_by.name
                      ? comment.created_by.name
                      : 'Amy Happy'
                  } at ${moment(comment.created_at).fromNow()}`}
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
    return deleteComments(id).then(deletedComment => {
      this.setState({
        comments: this.state.comments.filter(comment => {
          return comment._id !== deletedComment.data.comment._id;
        })
      });
    });
  };

  postNewComment = (id, content) => {
    return postComment(id, content, this.state.loggedInUser.id).then(
      ({ data }) => {
        this.setState({ comments: [data.comment, ...this.state.comments] });
      }
    );
  };
}

export default Comments;
