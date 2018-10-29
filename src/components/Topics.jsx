import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../api.js';

class Topics extends Component {
  state = { topics: [] };
  componentDidMount() {
    return getTopics().then(topics => {
      this.setState({ topics: topics.data.topics });
    });
  }
  render() {
    return (
      <div className="displayInfoArea">
        <h1 className="title">Topics</h1>
        {this.state.topics.map(topic => {
          return (
            <div className="singleTopicDiv" key={topic._id}>
              <img
                className="topicThumbnail"
                src={topic.avatar}
                alt={`${topic.title} avatar`}
              />
              <Link to={`topics/${topic.slug}/articles`} className="entryTitle">
                {topic.title}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Topics;
