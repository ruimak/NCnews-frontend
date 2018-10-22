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
    console.log(this.props.id, 'id <--------');
    const id = this.props.id;
    const slug =
      this.props.slug === undefined ? this.state.slug : this.props.slug;
    const content = this.state.message;
    const title = this.state.title === '' ? 'Untitled' : this.state.title;
    console.log(this.props, 'props on handle submit');
    this.props.typeOfPost === 'comment'
      ? this.props.postNew(id, content).then(comment => {
          this.setState({
            message: ''
          });
        })
      : this.props.postNew(id, title, slug, content).then(article => {
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
