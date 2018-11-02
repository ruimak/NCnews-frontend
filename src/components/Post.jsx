import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getAllUsers } from '../api.js';
import PropTypes from 'prop-types';

class PostMessage extends Component {
  state = {
    title: '',
    message: '',
    slug: '',
    loggedInUser: null,
    errStatus: null
  };
  componentDidMount() {
    return getAllUsers()
      .then(users => {
        return users.data.users.filter(user => {
          return user.username === 'happyamy2016';
        });
      })
      .then(amyUser => {
        this.setState({ loggedInUser: amyUser[0] });
      });
  }
  render() {
    const { errStatus } = this.state;
    if (errStatus)
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
      <form className="postBlock" onSubmit={this.handleSubmit}>
        {this.props.typeOfPost === 'article' && (
          <div>
            Title:
            <input
              onChange={this.handleChangeTitle}
              type="text"
              value={this.state.title}
            />
          </div>
        )}
        {this.props.slug === undefined &&
          this.props.typeOfPost === 'article' && (
            <div>
              Topic:
              <input
                onChange={this.handleChangeSlug}
                type="text"
                value={this.state.slug}
              />
            </div>
          )}

        <div>
          Text:
          <input
            onChange={this.handleChangeMessage}
            type="text"
            value={this.state.message}
          />
        </div>
        <button>{`Post a new ${this.props.typeOfPost}`}</button>
      </form>
    );
  }
  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.id;
    const slug =
      this.props.slug === undefined ? this.state.slug : this.props.slug;
    const content = this.state.message;
    const title = this.state.title === '' ? 'Untitled' : this.state.title;

    this.props.typeOfPost === 'comment'
      ? this.props
          .postNew(id, content, this.state.loggedInUser._id)

          .then(comment => {
            this.setState({
              message: ''
            });
          })
          .catch(err => {
            this.setState({ errStatus: err });
          })
      : this.props
          .postNew(id, title, slug, content)

          .then(article => {
            this.setState({
              message: '',
              title: '',
              slug: ''
            });
          })
          .catch(err => {
            this.setState({ errStatus: err });
          });
  };
  handleChangeMessage = event => {
    this.setState({
      message: event.target.value
    });
  };
  handleChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };
  handleChangeSlug = event => {
    this.setState({
      slug: event.target.value
    });
  };
}

PostMessage.proptypes = {
  typeOfPost: PropTypes.string,
  slug: PropTypes.string,
  postNew: PropTypes.func,
  id: PropTypes.string
};

export default PostMessage;
