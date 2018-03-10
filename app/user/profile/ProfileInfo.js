import React from 'react';
import { Button, Card, Form, Label, Segment, List, Grid, Icon, Modal, TextArea } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import ModalSkillList from './ModalSkillList';
import ProfileSkillList from './ProfileSkillList';

import _ from 'lodash';

import './styles.scss';
import UserIcon from '../../assets/user.svg';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
];

const getUnselectedSkills = () => {
  const userId = User.getId();
  return axios.get('/api/user/unselected-skills', {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
    params: {
      userId,
    },
  })
    .then(res => res);
};

const getFeaturededSkills = () => {
  const userId = User.getId();
  return axios.get('/api/user/profile/getSkills', {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
    params: {
      userId,
    },
  })
    .then(res => res);
};

const addNewSkills = (newSkills) => {
  const userId = User.getId();
  const data = { userId, skills: newSkills };
  console.log(data);
  return axios.post('/api/user/profile/addSkill', data, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then(res => res);
};

const submitPost = formData =>
  axios.post('/api/user/profile/CV', formData, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then((res) => {
      console.log('res');
      return res.data;
    });

const saveProfile = (profile, newSkills) => {
  console.log('profile to be saved is ', profile);
  const userId = User.getId();
  return axios.post('/api/user/profile', { userId, profile, newSkills }, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then(res => res);
};

export default class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      CV: null,
      profile: props.profile,
      userSkills: [],
      toDeleteSkills: [],
      modalUnselectedSkills: [],
      modalSelectedSkills: [],
    };

    this.handleAdd = () => {
      let featuredSkills = [];
      getFeaturededSkills()
        .then((res) => {
          featuredSkills = res.data;

          const temp = this.state.modalSelectedSkills;
          for (let i = 0; i < temp.length; i += 1) {
            featuredSkills.push(temp[i]);
          }

          console.log('new skills ', featuredSkills);

          addNewSkills(featuredSkills)
            .then((resp) => {
              console.log(resp);
              getUnselectedSkills()
                .then((response) => {
                  this.setState({ ...this.state, modalUnselectedSkills: response.data });
                })
                .catch(console.error());
              this.refreshSkillList();
            })
            .catch(console.error());
          this.setState({ ...this.state, modalSelectedSkills: [] });
        })
        .catch(console.error());
    };

    this.handleAdd = this.handleAdd.bind(this);

    this.close = () => {
      const tempSelected = this.state.modalSelectedSkills;
      const tempUnselected = this.state.modalUnselectedSkills;
      for (let i = 0; i < tempSelected.length; i += 1) {
        tempUnselected.push(tempSelected[i]);
      }
      this.setState({
        ...this.state,
        modalSelectedSkills: [],
        modalUnselectedSkills: tempUnselected,
      });
    };

    this.close = this.close.bind(this);


    this.removeSkill = (skill) => {
      const newUserSkills = this.state.userSkills.filter(e => e !== skill);
      const newtoDeleteSkills = this.state.toDeleteSkills;
      newtoDeleteSkills.push(skill);
      this.setState({
        ...this.state,
        userSkills: newUserSkills,
        toDeleteSkills: newtoDeleteSkills,
      });
    };

    this.removeSkill = this.removeSkill.bind(this);


    this.restoreSkill = (skill) => {
      const newtoDeleteSkills = this.state.toDeleteSkills.filter(e => e !== skill);
      const newUserSkills = this.state.userSkills;
      newUserSkills.push(skill);
      this.setState({
        ...this.state,
        userSkills: newUserSkills,
        toDeleteSkills: newtoDeleteSkills,
      });
    };

    this.restoreSkill = this.restoreSkill.bind(this);


    this.modalAddSkill = (skill) => {
      const temp = this.state.modalSelectedSkills;
      temp.push(skill);
      this.setState({ ...this.state, modalSelectedSkills: temp });
      const newSkillList = this.state.modalUnselectedSkills.filter(e => e !== skill);
      this.setState({ ...this.state, modalUnselectedSkills: newSkillList });
    };

    this.modalAddSkill = this.modalAddSkill.bind(this);


    this.modalRemoveSkill = (skill) => {
      const newSelected = this.state.modalSelectedSkills.filter(e => e !== skill);
      const newUnselected = this.state.modalUnselectedSkills;
      newUnselected.push(skill);
      this.setState({
        ...this.state,
        modalSelectedSkills: newSelected,
        modalUnselectedSkills: newUnselected,
      });
    };

    this.modalRemoveSkill = this.modalRemoveSkill.bind(this);


    this.refreshSkillList = () => {
      getFeaturededSkills()
        .then((res) => {
          console.log('featured Skills ', res.data);
          this.setState({
            ...this.state,
            userSkills: res.data,
          });
        })
        .catch(console.error());
    };

    this.refreshSkillList = this.refreshSkillList.bind(this);

    this.toggleEditability = () => {
      if (this.state.editable) {
        saveProfile(this.state.profile, this.state.userSkills)
          .then((res) => {
            console.log('response on Profile Save is', res);
            getUnselectedSkills()
              .then((resp) => {
                this.setState({
                  ...this.state,
                  modalUnselectedSkills: resp.data,
                  toDeleteSkills: [],
                });
              })
              .catch(console.error());
          })
          .catch(console.error());
      }
      console.log('edit/save ', this.state.editable);
      this.setState({ editable: !this.state.editable });
    };

    this.handleChange = (e, { name }) => {
      this.setState({ profile: { ...this.state.profile, [name]: e.target.value } });
    };

    this.handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('myFile', this.state.CV);

      console.log('state is ', formData);
      submitPost(formData)
        .then((res) => {
          console.log('response on submit is', res);
        })
        .catch(console.error());
      console.log('back here ok');
    };
  }

  componentWillMount() {
    getFeaturededSkills()
      .then((res) => {
        console.log('featured Skills ', res.data);
        getUnselectedSkills()
          .then((resp) => {
            this.setState({
              ...this.state,
              modalUnselectedSkills: resp.data,
              userSkills: res.data,
            });
          })
          .catch(console.error());
      })
      .catch(console.error());
  }

  componentWillReceiveProps(props) {
    this.setState({ profile: props.profile });
  }

  render() {
    const { editable } = this.state;
    return (

      <Grid centered>
        <Grid.Column width={10} centered className="ecell-profile-main-container">

          <Grid>
            <Grid.Row columns={1} centered className="ecp-user-image-row">
              <UserIcon height="64" width="64" />
            </Grid.Row>

            <Grid.Row columns={1} centered className="ecp-user-name-row">
              <Grid.Column textAlign="center">
                <label htmlFor="user-name">
                  {_.filter([
                    this.props.profile.firstName,
                    this.props.profile.middleName,
                    this.props.profile.lastName,
                  ]).join(' ')}
                </label>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} centered className="ecp-email-row">
              <Grid.Column textAlign="center" className="ecp-email-col">
                <label htmlFor="user-email">
                  {this.props.profile.Email}
                </label>
              </Grid.Column>
            </Grid>
            <Form>
              <ProfileSkillList removeSkill={this.removeSkill} restoreSkill={this.restoreSkill} editable={this.state.editable} skills={this.state.userSkills} toDeleteSkills={this.state.toDeleteSkills} />
            </Form>
          </Segment>
        </Card.Content>
        <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
          <Segment raised>
            <Form.Field >
              <Label style={{ marginBottom: 20, fontSize: 15, fontWeight: 'bold' }} color="blue" ribbon htmlFor="personaldetails" className="form-labels">
                Experience
              </Label>
            </Form.Field>
            <Form>
              <Form.Field>
                <label htmlFor="internships">Internships</label>
                <TextArea
                  name="internships"
                  value={this.state.profile.internships || ''}
                  onChange={this.handleChange}
                  rows="5"
                  placeholder="Enter past internship details..."
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="projects">Projects and Trainings</label>
                <TextArea
                  name="projects"
                  value={this.state.profile.projects || ''}
                  onChange={this.handleChange}
                  rows="5"
                  placeholder="Enter past project and training details."
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="POR">Positions of Responsibility</label>
                <TextArea
                  name="positionOfResponsibility"
                  value={this.state.profile.positionOfResponsibility || ''}
                  onChange={this.handleChange}
                  rows="5"
                  placeholder="Enter positions of responsibity you might have held"
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="workSamples">Work Samples</label>
                <TextArea
                  name="workSamples"
                  value={this.state.profile.workSamples || ''}
                  onChange={this.handleChange}
                  rows="5"
                  placeholder="Enter your work samples eg. links to your previous projects, github profile etc..."
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="CCA">Co-curricular Activities</label>
                <TextArea
                  name="coCurricularActivities"
                  value={this.state.profile.coCurricularActivities || ''}
                  onChange={this.handleChange}
                  rows="5"
                  placeholder="Enter your co-curricular activities..."
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="additionalDetails">Additional Details</label>
                <TextArea
                  name="additionalDetails"
                  value={this.state.profile.additionalDetails || ''}
                  onChange={this.handleChange}
                  rows="5"
                  placeholder="Enter any other additional details you might want to provide..."
                />
              </Form.Field>
            </Form>
          </Segment>
        </Card.Content>
        <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
          <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                input={{ accept: 'application/pdf' }}
                type="file"
                name="userFile"
                onChange={(e) => { this.setState({ CV: e.target.files[0] }); }}
              />
              <Button type="submit">Upload CV</Button>
            </Form.Group>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}
ProfileInfo.propTypes = {
  profile: PropTypes.shape().isRequired,
};
