import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

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
    console.log(this.state.article);
    return (
      <div className="displayInfoArea">
        <h1 className="title">Article </h1>
        {this.state.article.created_by ? (
          <h2 className="articleAuthor">
            {this.state.article.created_by.name}
          </h2>
        ) : null}
        <div className="articleBody">{this.state.article.body}</div>
        {/* <div className="articleDetails"> {} </div> */}
      </div>
    );
  }
}

export default Article;
