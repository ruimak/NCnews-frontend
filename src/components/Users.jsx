import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class Articles extends Component {
  state = { users: [] };
  componentDidMount() {
    axios
      .get('https://northcoders-news-ruimak.herokuapp.com/api/users')
      .then(topics => {
        console.log(topics);
      });
  }
  render() {
    return <div>Topics</div>;
  }
}

export default Articles;
