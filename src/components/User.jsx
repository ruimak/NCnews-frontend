import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class User extends Component {
  state = { user: {} };
  componentDidMount() {
    axios
      .get(
        `https://northcoders-news-ruimak.herokuapp.com/api${
          this.props.location.pathname
        }`
      )
      .then(user => {
        console.log(user);
        this.setState({ user: user.data.userInfo });
      })
      .catch(console.log);
  }
  render() {
    console.log(this.props);
    return (
      <div className="displayInfoArea">
        <h1 className="title">{this.state.user.username} </h1>
        <img
          className="userAvatar"
          src={this.state.user.avatar_url}
          alt={`${this.state.user.username} avatar`}
        />
        <div className="username">{`Username: ${
          this.state.user.username
        }`}</div>
        <div className="name">{`Name: ${this.state.user.name}`}</div>
      </div>
    );
  }
}

export default User;
