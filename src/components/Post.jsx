import React, { Component } from 'react';
import axios from 'axios';

class PostMessage extends Component {
  state = {
    title: '',
    message: '',
    slug: ''
  };
  render() {
    return (
      <form className="postBlock" onSubmit={this.handleSubmit}>
        <button>{`Post a new ${this.props.typeOfPost}`}</button>
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
              Slug:
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
      </form>
    );
  }
  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.id;
    const slug = this.props.slug;
    const content = this.state.message;
    const title = this.state.title === '' ? 'Untitled' : this.state.title;

    if (this.props.typeOfPost === 'article') {
      return axios
        .post(
          `https://northcoders-news-ruimak.herokuapp.com/api/topics/${
            slug ? slug : this.state.slug
          }/articles`,
          {
            body: content,
            title: title,
            votes: 0,
            created_by: '5b9bc4254c18302d443a6330'
          }
        )
        .then(
          this.setState({
            message: '',
            title: '',
            slug: ''
          })
        )
        .catch(console.log);
    } else if (this.props.typeOfPost === 'comment') {
      return axios
        .post(
          `https://northcoders-news-ruimak.herokuapp.com/api/articles/${id}/comments`,
          { body: content, created_by: '5b9bc4254c18302d443a6330' }
        )
        .then(comment => {
          this.setState({
            message: ''
          });
        });
    }
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
