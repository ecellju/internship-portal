import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import PostItem from './PostItem';
import PostView from '../../user/post/PostView';

const PostList = () => {
  const postItems = _.times(10, n => <PostItem key={n.toString()} />);
  return (
    <Container text className="main">
      <Card.Group>
        {postItems}
      </Card.Group>
    </Container>
  );
};

export default PostList;
