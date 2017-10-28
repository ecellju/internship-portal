import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import PostView from './post/PostView';

require('./globals.scss');

ReactDOM.render(
  <div className="root">
    <Navbar />
    <PostView />
  </div>,
  document.getElementById('app'),
);
