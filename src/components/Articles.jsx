import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Vote from './Vote';

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
              <Link to={`/articles/${article._id}`} className="entryTitle">
                {article.title}
              </Link>
              <div className="articleDetails">
                <span>
                  Created by:
                  {' ' + article.created_by.name}
                </span>
                <div className="commentsAndVotes">
                  <Vote
                    votes={article.votes}
                    id={article._id}
                    typeOfVote="article"
                  />
                  <Link to={`/articles/${article._id}/comments`}>
                    <img
                      className="voteOrCommentImg"
                      src="https://image.freepik.com/free-icon/comment-ios-7-interface-symbol_318-33559.jpg"
                      alt="commentImg"
                    />
                  </Link>

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
