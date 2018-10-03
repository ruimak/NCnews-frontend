import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import topicsButton from './hashtag.png';
import Articles from './components/Articles.jsx';
import Article from './components/Article.jsx';
import Topics from './components/Topics.jsx';
import ArticlesByTopic from './components/ArticlesByTopic.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* This is the top bar div */}
        <div id="topBar">
          <Link to="/">
            <img
              id="logo"
              title="North Coders"
              src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png"
              alt="NC Logo"
            />
          </Link>

          <Link to="/articles">
            <img
              className="topButton"
              title="Articles"
              src="https://assets.dryicons.com/uploads/icon/svg/6245/ffc1fdf3-d5b6-46cb-9a1b-4c6ec1c0b46e.svg"
              alt="articlesButton"
            />
          </Link>
          <Link to="/topics">
            {' '}
            <img
              className="topButton"
              title="Topics"
              src={topicsButton}
              alt="topicsButton"
            />
          </Link>
          <Link to="/users">
            <img
              className="topButton"
              title="Users"
              src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-group-512.png"
              alt="usersButton"
            />
          </Link>
        </div>
        {/* This is the main div */}
        <div id="mainDiv">
          <div id="displayDiv">
            <Route exact path="/articles" component={Articles} />
            <Route exact path="/topics" component={Topics} />
            <Route
              exact
              path="/topics/:topic_slug/articles"
              component={Articles}
            />
            <Route exact path="/articles/:article_id" component={Article} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;