import React from 'react';
import { Container, Button, TextArea, Form, Menu } from 'semantic-ui-react';
// import { Redirect } from 'react-router-dom';
import browserHistory from '../../history';

const handleSubmitEdits = (event) => {
  console.log('submitEdits :', event);
};
const handleViewApplicants = (event) => {
  console.log('View Applicants :', event);
  browserHistory.push('/dashboard/students');
};
const PostView = () => (
  <Container text className="main" textAlign="justified">
    <Form>
      <Form.Field>
        <TextArea rows={2} style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }} className="PostTitle" >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quibusdam quos vero autem
        </TextArea>
      </Form.Field>
      <Form.Field >
        <TextArea rows={20} className="PostDescription" >

            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eaque ex asperiores
            tempore at nostrum, obcaecati iure perspiciatis voluptatem temporibus cupiditate
            aperiam, molestias quos sit vel dolorum similique velit consequatur!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eaque ex asperiores
            tempore at nostrum, obcaecati iure perspiciatis voluptatem temporibus cupiditate
            aperiam, molestias quos sit vel dolorum similique velit consequatur!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eaque ex asperiores
            tempore at nostrum, obcaecati iure perspiciatis voluptatem temporibus cupiditate
            aperiam, molestias quos sit vel dolorum similique velit consequatur!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eaque ex asperiores
            tempore at nostrum, obcaecati iure perspiciatis voluptatem temporibus cupiditate
            aperiam, molestias quos sit vel dolorum similique velit consequatur!Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Iste eaque ex asperiores
            tempore at nostrum, obcaecati iure perspiciatis voluptatem temporibus cupiditate
            aperiam, molestias quos sit vel dolorum similique velit consequatur!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eaque ex asperiores
            tempore at nostrum, obcaecati iure perspiciatis voluptatem temporibus cupiditate
            aperiam, molestias quos sit vel dolorum similique velit consequatur!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eaque ex asperiores
            tempore at nostrum, obcaecati iure perspiciatis voluptatem temporibus cupiditate
            aperiam, molestias quos sit vel dolorum similique velit consequatur! 
        </TextArea>
      </Form.Field>
      <Form.Field>
        <Menu>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button onClick={handleViewApplicants} >View Applicants</Button>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={handleSubmitEdits}>Submit Edits</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Form.Field>
    </Form>
  </Container>
);

export default PostView;
