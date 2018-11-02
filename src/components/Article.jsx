import React, { Component } from 'react';
import Comments from './Comments.jsx';
import Vote from './Vote.jsx';
import { getSingleArticle } from '../api.js';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

class Article extends Component {
  state = { article: {}, errStatus: null };
  componentDidMount() {
    getSingleArticle(this.props.location.pathname)
      .then(article => {
        this.setState({ article: article.data.article });
      })
      .catch(err => {
        this.setState({ errStatus: err });
      });
  }
  render() {
    if (this.state.errStatus)
      return (
        <Redirect
          to={{
            pathname: '/NotFound',
            state: {
              message: 'There is no such article. '
            }
          }}
        />
      );
    return (
      <div className="displayInfoArea">
        <h1 className="title">Article </h1>
        <div className="articleTitleAndBody">
          {this.state.article.created_by ? (
            <h2 className="articleAuthor">
              {this.state.article.created_by.name}
            </h2>
          ) : (
            'Amy Happy'
          )}
          <div className="articleBody">{this.state.article.body}</div>
          <div className="commentsAndVotes">
            {this.state.article.votes && (
              <Vote
                votes={this.state.article.votes}
                id={this.props.match.params.article_id}
                typeOfVote="article"
              />
            )}
          </div>
        </div>
        <Comments articleId={this.props.match.params.article_id} />
      </div>
    );
  }
}

Article.proptypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      article_id: PropTypes.string
    })
  })
};

export default Article;
