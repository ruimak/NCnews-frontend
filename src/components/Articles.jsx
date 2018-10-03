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
        this.setState({ articles: articles.data.articlesWithCommentCount });
      })
      .catch(console.log);
  }
  render() {
    console.log(this.state.articles);
    return (
      <div className="displayInfoArea">
        <h1 className="title">Articles</h1>
        {this.state.articles.map(article => {
          console.log(article);
          return (
            <div key={article._id} className="singleArticleDiv">
              <Link to={`/articles/${article._id}`}>{article.title}</Link>
              <div className="articleDetails">
                <span>
                  Created by:
                  {' ' + article.created_by.name}
                </span>
                <span>{article.votes}</span>
                <span>{article.comment_count}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Articles;
