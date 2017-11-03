import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import _ from 'lodash';
import PostItem from '../post/PostItem';

const HomeTab = () => {
  const postItems = _.times(5, n => <PostItem key={n.toString()} />);
  return (
    <Container text>
      <Card.Group>
        {postItems}
      </Card.Group>
    </Container>
  );
};

export default HomeTab;
