import React from 'react';
import { Button, Card, Form, Label, Segment, List, Grid, Icon, Modal, Container } from 'semantic-ui-react';
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
            </Grid.Row>

            <Grid.Row columns={1} centered className="ecp-dept-row">
              <Grid.Column textAlign="center" className="ecp-dept-col">
                <label htmlFor="branch">
                  {` ${this.props.profile.branch} `}
                </label>
                <label htmlFor="year">
                  {this.props.profile.currentYear}
                </label>
              </Grid.Column>
            </Grid.Row>

          </Grid>

        </Grid.Column>
      </Grid>


      // <Card fluid >
      //   <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
      //     <Card.Header>
      //       {editable ? 'Edit Profile Information' : 'Profile Information'}
      //       <Button
      //         primary
      //         floated="right"
      //         content={editable ? 'Save' : 'Edit'}
      //         onClick={this.toggleEditability}
      //       />
      //     </Card.Header>
      //   </Card.Content>
      //   <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
      //     <Segment raised>
      //       <Form.Field >
      //         <Label style={{ marginBottom: 20, fontSize: 15, fontWeight: 'bold' }} color="blue" ribbon htmlFor="personaldetails" className="form-labels">
      //           Personal Details
      //         </Label>
      //       </Form.Field>
      //       <Form>
      //         <Form.Group>
      //           <Form.Input
      //             readOnly={!editable}
      //             label="First name"
      //             name="firstName"
      //             value={this.state.profile.firstName || ''}
      //             onChange={this.handleChange}
      //             // width={6}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Middle name"
      //             name="middleName"
      //             value={this.state.profile.middleName || ''}
      //             onChange={this.handleChange}
      //            // width={4}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Last name"
      //             name="lastName"
      //             value={this.state.profile.lastName || ''}
      //             onChange={this.handleChange}
      //             // width={6}
      //           />
      //         </Form.Group>
      //         <Form.Group>
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Birth date"
      //             type="date"
      //             name="DOB"
      //             value={this.state.profile.DOB || ''}
      //             onChange={this.handleChange}
      //            // width={4}
      //           />
      //           <Form.Select
      //             readOnly={!editable}
      //             label="Gender"
      //             name="gender"
      //             options={genderOptions}
      //             value={this.state.profile.gender || ''}
      //             onChange={(e, { value }) => this.setState({ profile: { ...this.state.profile, gender: value } })}
      //             // width={6}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Contact Number"
      //             name="contactNo"
      //             value={this.state.profile.contactNo || ''}
      //             onChange={this.handleChange}
      //            //  width={6}
      //           />
      //         </Form.Group>
      //         <Form.Group>
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Current Year "
      //             name="currentYear"
      //             value={this.state.profile.currentYear || ''}
      //             onChange={this.handleChange}

      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Branch"
      //             name="branch"
      //             value={this.state.profile.branch || ''}
      //             onChange={this.handleChange}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Email"
      //             name="Email"
      //             value={this.state.profile.Email || ''}
      //             onChange={this.handleChange}
      //           />
      //         </Form.Group>
      //       </Form>
      //     </Segment>
      //   </Card.Content>
      //   <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
      //     <Segment raised>
      //       <Form.Field >
      //         <Label style={{ marginBottom: 20, fontSize: 15, fontWeight: 'bold' }} color="blue" ribbon htmlFor="personaldetails" className="form-labels">
      //           Educational Details
      //         </Label>
      //       </Form.Field>
      //       <Form>
      //         <Form.Group>
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Degree"
      //             name="degree"
      //             value={this.state.profile.degree || ''}
      //             onChange={this.handleChange}
      //             // width={6}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="CGPA/Marks(%)"
      //             name="cgpa"
      //             value={this.state.profile.cgpa || ''}
      //             onChange={this.handleChange}
      //            // width={4}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Joining Year"
      //             name="joinYear"
      //             value={this.state.profile.joinYear || ''}
      //             onChange={this.handleChange}
      //             // width={6}
      //           />
      //         </Form.Group>
      //         <Form.Group>
      //           <Form.Field
      //             style={{
      //               margin: 20, fontSize: 15, color: 'red', fontWeight: 'bold',
      //               }}
      //             readOnly="true"
      //             label="Higher Secondary"
      //            // width={4}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Marks(%)"
      //             name="hsMarks"
      //             value={this.state.profile.hsMarks || ''}
      //             onChange={this.handleChange}
      //            //  width={6}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Year"
      //             name="hsYear"
      //             value={this.state.profile.hsYear || ''}
      //             onChange={this.handleChange}
      //            //  width={6}
      //           />
      //         </Form.Group>
      //         <Form.Group>
      //           <Form.Field
      //             style={{
      //               margin: 20, fontSize: 15, color: 'red', fontWeight: 'bold',
      //               }}
      //             readOnly="true"
      //             label="Secondary Exam"
      //            // width={4}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Marks(%)"
      //             name="secondaryMarks"
      //             value={this.state.profile.secondaryMarks || ''}
      //             onChange={this.handleChange}
      //            //  width={6}
      //           />
      //           <Form.Input
      //             readOnly={!editable}
      //             label="Year"
      //             name="secondaryYear"
      //             value={this.state.profile.secondaryYear || ''}
      //             onChange={this.handleChange}
      //            //  width={6}
      //           />
      //         </Form.Group>
      //       </Form>
      //     </Segment>
      //   </Card.Content>
      //   <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
      //     <Segment raised>
      //       <Grid style={{ marginTop: 0, marginBottom: 0 }} columns={2} >
      //         <Grid.Column floated="left" style={{ marginTop: 0, marginBottom: 0, paddingTop: 0 }} width={5}>
      //           <Form.Field >
      //             <Label style={{ marginBottom: 20, fontSize: 15, fontWeight: 'bold' }} color="blue" ribbon htmlFor="personaldetails" className="form-labels">
      //               Featured Skills
      //             </Label>
      //           </Form.Field>
      //         </Grid.Column>
      //         <Grid.Column style={{ marginTop: 0, marginBottom: 0, paddingTop: 0 }} floated="right" width={5}>
      //           <ModalSkillList
      //             refreshSkillList={this.refreshSkillList}
      //             unselectedSkills={this.state.modalUnselectedSkills}
      //             selectedSkills={this.state.modalSelectedSkills}
      //             addSkill={this.modalAddSkill}
      //             removeSkill={this.modalRemoveSkill}
      //             close={this.close}
      //             handleAdd={this.handleAdd}
      //           />
      //         </Grid.Column>
      //       </Grid>
      //       <Form>
      //         <ProfileSkillList removeSkill={this.removeSkill} restoreSkill={this.restoreSkill} editable={this.state.editable} skills={this.state.userSkills} toDeleteSkills={this.state.toDeleteSkills} />
      //       </Form>
      //     </Segment>
      //   </Card.Content>
      //   <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
      //     <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
      //       <Form.Group>
      //         <Form.Input
      //           input={{ accept: 'application/pdf' }}
      //           type="file"
      //           name="userFile"
      //           onChange={(e) => { this.setState({ CV: e.target.files[0] }); }}
      //         />
      //         <Button type="submit">Upload CV</Button>
      //       </Form.Group>
      //     </Form>
      //   </Card.Content>
      // </Card>
    );
  }
}
ProfileInfo.propTypes = {
  profile: PropTypes.shape().isRequired,
};
