import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Vote from './Vote';
import Post from './Post';
import { getAllArticles, postArticle, getTopics } from '../api.js';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

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
      .catch(err => {
        this.setState({ errStatus: err });
      });
    getTopics()
      .then(topics => {
        return topics.data.topics.reduce((acc, val) => {
          let newKey = val.slug;
          acc[newKey] = val.avatar;

          return acc;
        }, {});
      })
      .then(newTopics => this.setState({ topics: newTopics }))
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
              message: 'There is no such topic. '
            }
          }}
        />
      );
    return (
      <div className="displayInfoArea">
        <h1 className="title">Articles</h1>
        <Post
          slug={this.props.match.params.topic_slug}
          typeOfPost="article"
          postNew={this.postNewArticle}
        />
        <div className="allSortsDiv">
          <div className="singleSortDiv">
            <span>{'Sort by likes: '}</span>
            <div
              className="inlineButton"
              onClick={() => {
                this.sortByLikes('descending');
              }}
            >
              {'descending'}
            </div>
            <span className="inline">{' / '}</span>
            <div
              className="inlineButton"
              onClick={() => {
                this.sortByLikes('ascending');
              }}
            >
              {'ascending'}
            </div>
          </div>
          <div className="singleSortDiv">
            <span>
              {'Sort by date: '}
              <div
                className="inlineButton"
                onClick={() => {
                  this.sortByDate('descending');
                }}
              >
                {'descending'}
              </div>
              <span className="inline">{' / '}</span>
              <div
                className="inlineButton"
                onClick={() => {
                  this.sortByDate('ascending');
                }}
              >
                {'ascending'}
              </div>
            </span>
          </div>

          <div className="singleSortDiv">
            <span>{'Sort by comments: '}</span>
            <div
              className="inlineButton"
              onClick={() => {
                this.sortByComments('descending');
              }}
            >
              {'descending'}
            </div>
            <span className="inline">{' / '}</span>
            <div
              className="inlineButton"
              onClick={() => {
                this.sortByComments('ascending');
              }}
            >
              {'ascending'}
            </div>
          </div>
        </div>

        {this.state.articles.map(article => {
          return (
            <div key={article._id} className="singleArticleDiv">
              <img
                className="topicThumbnail"
                src={this.state.topics[article.belongs_to.toLowerCase()]}
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
                    ? ` ${article.created_by.name} at ${moment(
                        article.created_at
                      ).fromNow()}`
                    : `Amy Happy at ${moment(article.created_at).fromNow()}`}
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
  sortByLikes = direction => {
    let sortedArr = this.state.articles.sort((a, b) => {
      if (a.votes > b.votes) {
        return -1;
      } else if (a.votes < b.votes) {
        return 1;
      } else return 0;
    });
    if (direction === 'ascending') {
      sortedArr = sortedArr.reverse();
    } else if (direction === 'descending') {
    }

    this.setState({
      articles: sortedArr
    });
  };
  sortByDate = direction => {
    let sortedArr = this.state.articles.sort((a, b) => {
      if (a.created_at > b.created_at) {
        return -1;
      } else if (a.created_at < b.created_at) {
        return 1;
      } else return 0;
    });
    if (direction === 'ascending') {
      sortedArr = sortedArr.reverse();
    } else if (direction === 'descending') {
    }
    this.setState({
      articles: sortedArr
    });
  };
  sortByComments = direction => {
    let sortedArr = this.state.articles.sort((a, b) => {
      if (a.comment_count > b.comment_count) {
        return -1;
      } else if (a.comment_count < b.comment_count) {
        return 1;
      } else return 0;
    });
    if (direction === 'ascending') {
      sortedArr = sortedArr.reverse();
    } else if (direction === 'descending') {
    }
    this.setState({
      articles: sortedArr
    });
  };
}

Articles.proptypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      topic_slug: PropTypes.string
    })
  })
};

export default Articles;
