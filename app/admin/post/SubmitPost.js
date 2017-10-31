import React, { Component } from 'react';
import { TextArea, Form, Button, Label, Segment } from 'semantic-ui-react';
import axios from 'axios';
import Auth from '../../auth/modules/Auth';

const config = {
  headers: {
    Authorization: `bearer ${Auth.getToken()}`,
  },
};
const submitPost = post =>
  axios.post('/api/admin/posts', post, config)
    .then(res => res.data);

class SubmitPost extends Component {
  constructor() {
    super();
    this.state = { post: { title: '', description: '' } };
    this.handleChange = (e, { name, value }) =>
      this.setState({ post: { ...this.state.post, [name]: value } });
    this.handleSubmit = (event) => {
      event.preventDefault();
      console.log('state is ', this.state);
      submitPost(this.state.post)
        .then(res => console.log('response on submit is', res));
      this.setState({ post: { title: '', description: '' } });
      console.log(this.state);
    };
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Segment raised>
          <Form.Field>
            <Label color="blue" ribbon htmlFor="submitText" className="form-labels">
              Submit NEW POST :
            </Label>
          </Form.Field>
          <Form.Field>
            <TextArea
              className="postTitle"
              placeholder="Add Post Title here"
              rows={2}
              style={{ margibottom: '10px' }}
              value={this.state.post.title}
              name="title"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <TextArea
              className="postDescription"
              placeholder="Add Post Description here"
              rows={8}
              value={this.state.post.description}
              name="description"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Segment>
      </Form>
    );
  }
}

export default SubmitPost;

