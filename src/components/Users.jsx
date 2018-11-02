import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../api.js';

class Users extends Component {
  state = { users: [], errStatus: null };
  componentDidMount() {
    return getAllUsers().then(users => {
      this.setState({ users: users.data.users });
    });
  }
  render() {
    return (
      <div className="displayInfoArea">
        <h1 className="titleWithMarginBottom">Users</h1>
        {this.state.users.map(user => {
          return (
            <div key={user._id} className="singleUserDiv">
              <Link to={`/users/${user.username}`} className="entryTitle">
                <img
                  className="userThumbnail"
                  src={user.avatar_url}
                  alt={`${user.username} avatar`}
                />
                {user.username}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Users;
