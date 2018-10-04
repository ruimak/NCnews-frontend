import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class Articles extends Component {
  state = { articles: [] };
  componentDidMount() {
    axios
      .get(
        this.props.location.pathname
          ? `https://northcoders-news-ruimak.herokuapp.com/api${
              this.props.location.pathname
            }`
          : 'https://northcoders-news-ruimak.herokuapp.com/api/articles'
      )
      .then(articles => {
        this.setState({ articles: articles.data.articles });
      })
      .catch(console.log);
  }
  render() {
    console.log(this.state);
    return (
      <div className="displayInfoArea">
        <h1 className="title">Articles</h1>
        {this.state.articles.map(article => {
          return (
            <div key={article._id} className="singleArticleDiv">
              <Link to={`/articles/${article._id}`}>{article.title}</Link>
              <div className="articleDetails">
                <span>
                  Created by:
                  {' ' + article.created_by.name}
                </span>
                <div className="commentsAndVotes">
                  <img
                    className="voteOrCommentImg"
                    src="https://cdn1.iconfinder.com/data/icons/bold-ui-functions/480/bold-30_upvote-2-512.png"
                    alt="voteImg"
                  />
                  <img
                    className="voteOrCommentImg flip"
                    src="https://cdn1.iconfinder.com/data/icons/bold-ui-functions/480/bold-30_upvote-2-512.png"
                    alt="voteImg"
                  />
                  <span>{article.votes}</span>
                  <img
                    className="voteOrCommentImg"
                    src="https://image.freepik.com/free-icon/comment-ios-7-interface-symbol_318-33559.jpg"
                    alt="commentImg"
                  />
                  <span>{article.comment_count}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Articles;
