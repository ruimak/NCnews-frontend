import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments.jsx';
import Vote from './Vote.jsx';

class Article extends Component {
  state = { article: {} };
  componentDidMount() {
    axios
      .get(
        `https://northcoders-news-ruimak.herokuapp.com/api${
          this.props.location.pathname
        }`
      )
      .then(article => {
        this.setState({ article: article.data.article });
      })
      .catch(console.log);
  }
  render() {
    console.log(this.props);
    return (
      <div className="displayInfoArea">
        <h1 className="title">Article </h1>
        {this.state.article.created_by ? (
          <h2 className="articleAuthor">
            {this.state.article.created_by.name}
          </h2>
        ) : null}
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
        <Comments articleId={this.props.match.params.article_id} />
      </div>
    );
  }
}

export default Article;
