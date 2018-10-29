import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Vote from './Vote';
import Post from './Post';
import { getAllArticles, postArticle, getTopics } from '../api.js';

class Articles extends Component {
  state = {
    articles: [],
    topics: {}
  };
  componentDidMount() {
    getAllArticles(this.props.location.pathname)
      .then(articles => {
        this.setState({ articles: articles.data.articles });
      })
      .catch(console.log);
    getTopics()
      .then(topics => {
        return topics.data.topics.reduce((acc, val) => {
          let newKey = val.slug;
          acc[newKey] = val.avatar;

          return acc;
        }, {});
      })
      .then(newTopics => this.setState({ topics: newTopics }));
  }

  render() {
    return (
      <div className="displayInfoArea">
        <h1 className="title">Articles</h1>
        <Post
          slug={this.props.match.params.topic_slug}
          typeOfPost="article"
          postNew={this.postNewArticle}
        />
        {this.state.articles.map(article => {
          return (
            <div key={article._id} className="singleArticleDiv">
              <img
                className="topicThumbnail"
                src={this.state.topics[article.belongs_to]}
                alt={`${article.belongs_to} avatar`}
              />
              <div>
                <Link to={`/articles/${article._id}`} className="entryTitle">
                  {article.title}
                </Link>
              </div>

              <div className="articleDetails">
                <span>
                  Created by:
                  {article.created_by && article.created_by.name
                    ? ' ' + article.created_by.name
                    : 'Amy Happy'}
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
  postNewArticle = (id, title, slug, content) => {
    return postArticle(slug, content, title, id).then(({ data }) => {
      this.setState({ articles: [data.article, ...this.state.articles] });
    });
  };
}

export default Articles;
