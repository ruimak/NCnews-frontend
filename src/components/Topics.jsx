import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class Topics extends Component {
  state = { topics: [] };
  componentDidMount() {
    axios
      .get('https://northcoders-news-ruimak.herokuapp.com/api/topics')
      .then(topics => {
        this.setState({ topics: topics.data.topics });
      });
  }
  render() {
    console.log(this.state.topics);
    return (
      <div className="displayInfoArea">
        <h1 className="title">Topics</h1>
        {this.state.topics.map(topic => {
          return (
            <div className="singleTopicDiv" key={topic._id}>
              <Link to={`topics/${topic.slug}/articles`}> {topic.title}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Topics;
