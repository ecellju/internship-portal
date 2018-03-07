import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PostItem from '../../common/post/PostItem';

import './styles.scss';

const PostList = props => (
  <div className="post-list-container">
    <Container text >
      <Card.Group>
        {props.posts.map(post => (
          <PostItem
            key={post._id}
            isAdmin
            post={post}
            id={post._id}
          />
          ))}
      </Card.Group>
    </Container>
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })).isRequired,
};
export default PostList;
