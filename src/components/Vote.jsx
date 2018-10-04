import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class Vote extends Component {
  state = { voteModifier: 0 };

  render() {
    return (
      <div className="voteButtons">
        <img
          onClick={() => {
            this.changeVoteMod('up');
          }}
          className="voteOrCommentImg"
          src="https://cdn1.iconfinder.com/data/icons/bold-ui-functions/480/bold-30_upvote-2-512.png"
          alt="voteImg"
        />
        <img
          onClick={() => {
            this.changeVoteMod('down');
          }}
          className="voteOrCommentImg flip"
          src="https://cdn1.iconfinder.com/data/icons/bold-ui-functions/480/bold-30_upvote-2-512.png"
          alt="voteImg"
        />
        <span>{this.props.votes + this.state.voteModifier}</span>
      </div>
    );
  }

  updateVote = (id, direction) => {
    console.log(this.props);
    console.log(id, direction);
    if (this.props.typeOfVote === 'article') {
      return axios.patch(
        `https://northcoders-news-ruimak.herokuapp.com/api/articles/${id}
          ?vote=${direction}`
      );
    } else if (this.props.typeOfVote === 'comment') {
      return axios.patch(
        `https://northcoders-news-ruimak.herokuapp.com/api/comments/${id}
          ?vote=${direction}`
      );
    }
    // .then(({ data }) => {
    // return data.article;
    // })
    // .catch(console.log);
  };
  changeVoteMod = direction => {
    const newVoteMod = direction === 'up' ? 1 : -1;
    this.setState({ voteModifier: newVoteMod });
    this.updateVote(this.props.id, direction);
  };
}

export default Vote;
