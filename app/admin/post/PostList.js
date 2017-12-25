import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

// const config = {
//   headers: {
//     Authorization: `bearer ${Auth.getToken()}`,
//   },
// };

const PostList = props => (
  <Container text >
    <Card.Group>
      {props.posts.map(post => (
        <PostItem
          key={post._id}
          postTitle={post.title}
          postDescription={post.description}
          id={post._id}
        />
        ))}
    </Card.Group>
  </Container>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,

  })).isRequired,
};
export default PostList;
