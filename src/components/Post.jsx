import React, { Component } from 'react';
import { navigate } from '@reach/router';

class PostMessage extends Component {
  state = {
    title: '',
    message: '',
    slug: '',
    loggedInUser: {
      name: 'Amy Happy',
      username: 'happyamy2016',
      id: '5b9bc4254c18302d443a6330'
    }
  };
  render() {
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
          .postNew(id, content, this.state.loggedInUser.id)
          .catch(err => {
            navigate('/error', {
              replace: true,
              state: {
                code: err.code,
                message: err.message,
                from: '/article'
              }
            });
          })
          .then(comment => {
            this.setState({
              message: ''
            });
          })
      : this.props
          .postNew(id, title, slug, content)
          .catch(err => {
            navigate('/error', {
              replace: true,
              state: {
                code: err.code,
                message: err.message,
                from: '/article'
              }
            });
          })
          .then(article => {
            this.setState({
              message: '',
              title: '',
              slug: ''
            });
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

export default PostMessage;
