import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import topicsButton from './hashtag.png';
import Articles from './components/Articles.jsx';
import Article from './components/Article.jsx';
import Topics from './components/Topics.jsx';
import Users from './components/Users.jsx';
import User from './components/User.jsx';
import Comments from './components/Comments.jsx';
import NotFound from './components/NotFound.jsx';

class App extends Component {
  state = {};
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
            <Switch>
              <Route exact path="/NotFound" component={NotFound} />
              <Route exact path="/" component={Articles} />
              <Route exact path="/articles" component={Articles} />
              <Route exact path="/topics" component={Topics} />
              <Route exact path="/users" component={Users} />
              <Route
                exact
                path="/topics/:topic_slug/articles"
                component={Articles}
              />
              <Route exact path="/users/:user_id" component={User} />
              <Route exact path="/articles/:article_id" component={Article} />
              <Route
                exact
                path="/articles/:article_id/comments"
                component={Comments}
              />
              <Route exact path="/*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
