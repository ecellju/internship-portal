import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import HomeNavigate from './dashboard/HomeNavigate';
import StudentList from './dashboard/StudentList';
import Navbar from './components/NavBar';
// import PostView from '../user/post/PostView';

// create routes with store and history

const createRoutes = (store, history) =>
  (
    <Router history={history}>
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/posts" />)} />
            <Route path="/posts" component={HomeNavigate} />
            <Route path="/students" component={StudentList} />
            <Route render={() => <h1>Not Found 1</h1>} />
          </Switch>
        </div>
      </div>
    </Router>
  );

export default createRoutes;
