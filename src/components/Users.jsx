import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../defaultAvatar.png';

class Users extends Component {
  state = { users: [] };
  componentDidMount() {
    axios
      .get('https://northcoders-news-ruimak.herokuapp.com/api/users')
      .then(users => {
        this.setState({ users: users.data.users });
        console.log(users);
      });
  }
  render() {
    return (
      <div className="displayInfoArea">
        <h1 className="title">Users</h1>
        {this.state.users.map(user => {
          return (
            <div key={user._id} className="singleUserDiv">
              <img
                className="userThumbnail"
                src={user.avatar_url}
                alt={`${user.username} avatar`}
              />
              <Link to={`/users/${user.username}`}>{user.username}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Users;
