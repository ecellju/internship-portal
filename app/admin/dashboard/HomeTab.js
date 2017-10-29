import React from 'react';
import { Container } from 'semantic-ui-react';
// import { Route, Switch } from 'react-router-dom';
import SubmitPost from '../post/SubmitPost';
import PostList from '../post/PostList';
// import PostItem from '../post/PostItem';
// import PostView from '../../user/post/PostView';


const HomeTab = () =>
  (
    <div className="Home" >
      <Container className="main">
        <Container text className="main">
          <SubmitPost />
        </Container>
        <PostList />
      </Container>

    </div>
  );


export default HomeTab;
