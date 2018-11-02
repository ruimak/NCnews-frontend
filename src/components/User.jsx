import React, { Component } from 'react';
import { getSingleUser } from '../api.js';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

class User extends Component {
  state = { user: {}, errStatus: null };
  componentDidMount() {
    return getSingleUser(this.props.location.pathname)
      .then(user => {
        this.setState({ user: user.data.userInfo });
      })
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
              message: 'There is no such user. '
            }
          }}
        />
      );
    return (
      <div className="displayInfoArea">
        <h1 className="titleWithMarginBottom">{this.state.user.username} </h1>
        <img
          className="userAvatar"
          src={this.state.user.avatar_url}
          alt={`${this.state.user.username} avatar`}
        />
        <div className="userDescription">
          {' '}
          <div>{`Username: ${this.state.user.username}`}</div>
          <div>{`Name: ${this.state.user.name}`}</div>
        </div>
      </div>
    );
  }
}

User.proptypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default User;
