import React from 'react';
import { Button, Form, Label, Segment, Grid, Modal, TextArea, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';

import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import Add from '../../assets/add.svg';
import Edit from '../../assets/edit.svg';
import ModalSkillList from './ModalSkillList';
import ProfileSkillList from './ProfileSkillList';


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

      <Grid verticalAlign="middle" centered>
        <Grid.Column width={10} centered className="ecell-profile-main-container">

          <Grid className="general-info-section">

            <Modal
              trigger={
                <Grid.Row textAlign="right">
                  <Grid.Column floated="right" className="general-edit-icon">
                    <Edit height="16px" onClick={this.toggleEditability} />
                  </Grid.Column>
                </Grid.Row>
              }

              closeOnEscape={false}
              closeOnRootNodeClick={false}
              size="small"

              ref={(c) => { this.gen_info_modal = c; }}

              closeIcon
              onClose={this.toggleEditability}
            >
              <Modal.Header>
                <Grid verticalAlign="middle" textAlign="left">
                  <Grid.Row columns={2}>
                    <Grid.Column className="modal-header" textAlign="left">
                      General Profile Information
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <Button
                        className="ecell-modal-primary-button"
                        onClick={() => {
                          this.toggleEditability();
                          this.gen_info_modal.setState({ open: false });
                        }}
                      >
                        Save
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Header>
              <Modal.Content scrolling>

                <Grid>
                  <Form>
                    <Segment className="ecp-modal-form-segment">
                      <Form.Group widths="equal">
                        <Form.Input
                          label="First Name"
                          name="firstName"
                          value={this.state.profile.firstName || ''}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          label="Middle Name"
                          name="middleName"
                          value={this.state.profile.middleName || ''}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          label="Last Name"
                          name="lastName"
                          value={this.state.profile.lastName || ''}
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group widths="equal">
                        <Form.Input
                          label="Contact Number"
                          name="contactNo"
                          value={this.state.profile.contactNo || ''}
                          onChange={this.handleChange}
                        />

                        <Form.Input
                          label="Email"
                          name="Email"
                          value={this.state.profile.Email || ''}
                          onChange={this.handleChange}
                        />
                      </Form.Group>


                      <Form.Group widths="equal">
                        <Form.Input
                          label="Current Year "
                          name="currentYear"
                          value={this.state.profile.currentYear || ''}
                          onChange={this.handleChange}
                        />

                        <Form.Input
                          label="Branch"
                          name="branch"
                          value={this.state.profile.branch || ''}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </Segment>

                    <Segment className="ecp-modal-form-segment">
                      <Form.Group widths="equal">
                        <Form.Input
                          label="Birth date"
                          type="date"
                          name="DOB"
                          value={this.state.profile.DOB || ''}
                          onChange={this.handleChange}
                        />

                        <Form.Select
                          label="Gender"
                          name="gender"
                          options={genderOptions}
                          value={this.state.profile.gender || ''}
                          onChange={
                            (e, { value }) =>
                              this.setState({
                                profile: {
                                  ...this.state.profile,
                                  gender: value,
                                },
                              })
                          }
                        />
                      </Form.Group>
                    </Segment>

                    <Segment className="ecp-modal-form-segment">
                      <Form.Group widths="equal">
                        <Form.Input
                          readOnly={!editable}
                          label="Degree"
                          name="degree"
                          value={this.state.profile.degree || ''}
                          onChange={this.handleChange}
                        />

                        <Form.Input
                          readOnly={!editable}
                          label="CGPA/Marks(%)"
                          name="cgpa"
                          value={this.state.profile.cgpa || ''}
                          onChange={this.handleChange}
                        />

                        <Form.Input
                          readOnly={!editable}
                          label="Joining Year"
                          name="joinYear"
                          value={this.state.profile.joinYear || ''}
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group widths="equal">
                        <Form.Field
                          readOnly="true"
                          label="Higher Secondary"
                        />

                        <Form.Input
                          readOnly={!editable}
                          label="Marks(%)"
                          name="hsMarks"
                          value={this.state.profile.hsMarks || ''}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          readOnly={!editable}
                          label="Year"
                          name="hsYear"
                          value={this.state.profile.hsYear || ''}
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group widths="equal">
                        <Form.Field
                          readOnly="true"
                          label="Secondary Exam"
                        />

                        <Form.Input
                          readOnly={!editable}
                          label="Marks(%)"
                          name="secondaryMarks"
                          value={this.state.profile.secondaryMarks || ''}
                          onChange={this.handleChange}
                        />

                        <Form.Input
                          readOnly={!editable}
                          label="Year"
                          name="secondaryYear"
                          value={this.state.profile.secondaryYear || ''}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </Segment>
                  </Form>
                </Grid>
              </Modal.Content>
            </Modal>

            <Grid.Row columns={1} centered className="ecp-user-image-row">
              <UserIcon height="64" width="64" />
            </Grid.Row>

            <Grid.Row columns={1} centered className="ecp-user-name-row">
              <Grid.Column textAlign="center">
                <label htmlFor="user-name">
                  {_.filter([
                    this.state.profile.firstName,
                    this.state.profile.middleName,
                    this.state.profile.lastName,
                  ]).join(' ')}
                </label>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} centered className="ecp-contact-row">
              <Grid.Column textAlign="center" className="ecp-contact-col">
                <label htmlFor="user-email">
                  {` E-mail: ${this.state.profile.Email || ''} `}
                </label>
                <Label circular className="ecp-separator-label" htmlFor="seperator" color="black" />
                <label htmlFor="user-phone">
                  {` Phone: ${this.state.profile.contactNo || ''} `}
                </label>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} centered className="ecp-dept-row">
              <Grid.Column textAlign="center" className="ecp-dept-col">
                <label htmlFor="degree">
                  {` ${this.state.profile.degree || ''} `}
                </label>
                <Label circular className="ecp-separator-label" htmlFor="seperator" color="black" />
                <label htmlFor="branch">
                  {` ${this.state.profile.branch || ''} `}
                </label>
                <Label circular className="ecp-separator-label" htmlFor="seperator" color="black" />
                <label htmlFor="year">
                  {` Class of ${this.state.profile.joinYear || ''} `}
                </label>
                <Label circular className="ecp-separator-label" htmlFor="seperator" color="black" />
                <label htmlFor="cgpa">
                  {` CGPA: ${this.state.profile.cgpa || ''}`}
                </label>
                <Label circular className="ecp-separator-label" htmlFor="seperator" color="black" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid centered width={16} className="general-skill-section">
            <Grid.Row className="ecp-skill-row">
              <Grid.Column width={1} />
              <Grid.Column width={14} textAlign="center" className="ecp-skill-col">
                <Label.Group color="teal">
                  {this.state.userSkills.map(skill => (
                    <Label htmlFor="skill-label" as="a"key={skill} className="ecp-skill-label">
                      {skill}
                    </Label>
                  ))}
                </Label.Group>
              </Grid.Column>

              <Modal
                trigger={
                  <Grid.Column width={1} text-align="right" className="general-edit-icon">
                    <Edit height="16px" onClick={this.toggleEditability} />
                  </Grid.Column>
                }
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                size="small"
                ref={(c) => { this.skill_modal = c; }}

                closeIcon
                onClose={this.toggleEditability}
              >
                <Modal.Header>
                  <Grid verticalAlign="middle" textAlign="left">
                    <Grid.Row columns={2}>
                      <Grid.Column className="modal-header" textAlign="left">
                        Featured Skills
                      </Grid.Column>
                      <Grid.Column textAlign="right">
                        <Button
                          className="ecell-modal-primary-button"
                          onClick={() => {
                            this.toggleEditability();
                            this.skill_modal.setState({ open: false });
                          }}
                        >
                          Save
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Modal.Header>

                <Modal.Content>
                  <Form>
                    <ProfileSkillList
                      removeSkill={this.removeSkill}
                      restoreSkill={this.restoreSkill}
                      editable={this.state.editable}
                      skills={this.state.userSkills}
                      toDeleteSkills={
                        [...this.state.toDeleteSkills, ...this.state.modalUnselectedSkills]}
                    />
                  </Form>
                </Modal.Content>
              </Modal>
            </Grid.Row>
          </Grid>

          <Divider />

          {/* Internship Section */}
          <Grid className="general-info-section">
            <Grid.Row centered className="ecp-section-row">
              <Grid.Column className="ecp-section-col">
                <label htmlFor="ecp-internship-header" className="ecp-section-header-label">
                  Internships
                </label>
                <p className="ecp-section-text">
                  {this.state.profile.internships || ''}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Modal
              trigger={
                <Grid.Row centered className="ecp-section-row">
                  <Grid.Column floated="right" className="general-edit-icon" onClick={this.toggleEditability} >
                    <Add className="relative-24-d" height="16px" width="16px" />Edit Internship
                  </Grid.Column>
                </Grid.Row>
              }
              closeOnEscape={false}
              closeOnRootNodeClick={false}
              size="small"
              ref={(c) => { this.internship_modal = c; }}
              closeIcon
              onClose={this.toggleEditability}
            >
              <Modal.Header>
                <Grid verticalAlign="middle" textAlign="left">
                  <Grid.Row columns={2}>
                    <Grid.Column className="modal-header" textAlign="left">
                      Internships
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <Button
                        className="ecell-modal-primary-button"
                        onClick={() => {
                          this.toggleEditability();
                          this.internship_modal.setState({ open: false });
                        }}
                      >
                        Save
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Header>

              <Modal.Content className="textarea-only-modal">
                <Form.Field>
                  <TextArea
                    name="internships"
                    value={this.state.profile.internships || ''}
                    onChange={this.handleChange}
                    rows="5"
                    placeholder="Enter past internship details..."
                    className="modal-form-textarea"
                  />
                </Form.Field>
              </Modal.Content>
            </Modal>
          </Grid>

          <Divider />

          {/* Projects Section */}
          <Grid className="general-info-section">
            <Grid.Row centered className="ecp-section-row">
              <Grid.Column className="ecp-section-col">
                <label htmlFor="ecp-projects-header" className="ecp-section-header-label">
                  Projects &amp; Trainings
                </label>
                <p className="ecp-section-text">
                  {this.state.profile.projects || ''}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Modal
              trigger={
                <Grid.Row className="ecp-section-row">
                  <Grid.Column className="general-edit-icon" onClick={this.toggleEditability} >
                    <Add className="relative-24-d" height="16px" width="16px" />Edit Projects
                  </Grid.Column>
                </Grid.Row>
              }
              closeOnEscape={false}
              closeOnRootNodeClick={false}
              size="small"
              ref={(c) => { this.projects_modal = c; }}

              closeIcon
              onClose={this.toggleEditability}
            >
              <Modal.Header>
                <Grid verticalAlign="middle" textAlign="left">
                  <Grid.Row columns={2}>
                    <Grid.Column className="modal-header" textAlign="left">
                      Projects &amp; Trainings
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <Button
                        className="ecell-modal-primary-button"
                        onClick={() => {
                          this.toggleEditability();
                          this.projects_modal.setState({ open: false });
                        }}
                      >
                        Save
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Header>

              <Modal.Content className="textarea-only-modal">
                <Form.Field>
                  <TextArea
                    name="projects"
                    value={this.state.profile.projects || ''}
                    onChange={this.handleChange}
                    rows="5"
                    placeholder="Enter past project and training details."
                    className="modal-form-textarea"
                  />
                </Form.Field>
              </Modal.Content>
            </Modal>
          </Grid>

          <Divider />

          {/* Education Section */}
          <Grid className="general-info-section">
            <Grid.Row centered width={16} className="ecp-section-row">
              <Grid.Column className="ecp-section-col">
                <label htmlFor="ecp-education-header" className="ecp-section-header-label">
                  Education
                </label>
                <br />
                <div className="ecp-subsection">
                  <span htmlFor="ecp-subsection-header" className="ecp-subsection-header-label">
                    Higher Secondary
                  </span>
                  <br />
                  <span className="ecp-section-text">
                    {`Year of Passing: ${this.state.profile.hsYear || ''}`}
                  </span>
                  <br />
                  <span className="ecp-section-text">
                    {`Marks: ${this.state.profile.hsMarks || ''}%`}
                  </span>
                </div>
                <br />
                <div className="ecp-subsection">
                  <label htmlFor="ecp-subsection-header" className="ecp-subsection-header-label">
                    Secondary
                  </label>
                  <br />
                  <span className="ecp-section-text">
                    {`Year of Passing: ${this.state.profile.secondaryYear || ''}`}
                  </span>
                  <br />
                  <span className="ecp-section-text">
                    {`Marks: ${this.state.profile.secondaryMarks || ''}%`}
                  </span>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Modal
              trigger={
                <Grid.Row className="ecp-section-row">
                  <Grid.Column className="general-edit-icon" onClick={this.toggleEditability} >
                    <Add className="relative-24-d" height="16px" width="16px" />Edit Education
                  </Grid.Column>
                </Grid.Row>
              }
              closeOnEscape={false}
              closeOnRootNodeClick={false}
              size="small"
              ref={(c) => { this.education_modal = c; }}

              closeIcon
              onClose={this.toggleEditability}
            >
              <Modal.Header>
                <Grid verticalAlign="middle" textAlign="left">
                  <Grid.Row columns={2}>
                    <Grid.Column className="modal-header" textAlign="left">
                      Education
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <Button
                        className="ecell-modal-primary-button"
                        onClick={() => {
                          this.toggleEditability();
                          this.education_modal.setState({ open: false });
                        }}
                      >
                        Save
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Header>

              <Modal.Content>
                <Form>
                  <Segment className="ecp-modal-form-segment">
                    <Form.Group widths="equal">
                      <Form.Field
                        readOnly="true"
                        label="Higher Secondary"
                      />

                      <Form.Input
                        readOnly={!editable}
                        label="Marks(%)"
                        name="hsMarks"
                        value={this.state.profile.hsMarks || ''}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        readOnly={!editable}
                        label="Year"
                        name="hsYear"
                        value={this.state.profile.hsYear || ''}
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Field
                        readOnly="true"
                        label="Secondary Exam"
                      />

                      <Form.Input
                        readOnly={!editable}
                        label="Marks(%)"
                        name="secondaryMarks"
                        value={this.state.profile.secondaryMarks || ''}
                        onChange={this.handleChange}
                      />

                      <Form.Input
                        readOnly={!editable}
                        label="Year"
                        name="secondaryYear"
                        value={this.state.profile.secondaryYear || ''}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Segment>
                </Form>
              </Modal.Content>
            </Modal>
          </Grid>

          <Divider />

          {/* Positions of Responsibility Section */}
          <Grid className="general-info-section">
            <Grid.Row width={16} centered className="ecp-section-row">
              <Grid.Column className="ecp-section-col">
                <label htmlFor="ecp-por-header" className="ecp-section-header-label">
                  Positions of Responsibility
                </label>
                <p className="ecp-section-text">
                  {this.state.profile.positionOfResponsibility || ''}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Modal
              trigger={
                <Grid.Row className="ecp-section-row">
                  <Grid.Column className="general-edit-icon" onClick={this.toggleEditability} >
                    <Add className="relative-24-d" height="16px" width="16px" />Edit Positions
                  </Grid.Column>
                </Grid.Row>
              }
              closeOnEscape={false}
              closeOnRootNodeClick={false}
              size="small"
              ref={(c) => { this.por_modal = c; }}

              closeIcon
              onClose={this.toggleEditability}
            >
              <Modal.Header>
                <Grid verticalAlign="middle" textAlign="left">
                  <Grid.Row columns={2}>
                    <Grid.Column className="modal-header" textAlign="left">
                      Positions of Responsibility
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <Button
                        className="ecell-modal-primary-button"
                        onClick={() => {
                          this.toggleEditability();
                          this.por_modal.setState({ open: false });
                        }}
                      >
                        Save
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Header>

              <Modal.Content className="textarea-only-modal">
                <Form.Field>
                  <TextArea
                    name="positionOfResponsibility"
                    value={this.state.profile.positionOfResponsibility || ''}
                    onChange={this.handleChange}
                    rows="5"
                    placeholder="Enter positions of responsibity you might have held"
                    className="modal-form-textarea"
                  />
                </Form.Field>
              </Modal.Content>
            </Modal>
          </Grid>

          <Divider />

          {/* Work Samples */}
          <Grid className="general-info-section">
            <Grid.Row width={16} centered className="ecp-section-row">
              <Grid.Column className="ecp-section-col">
                <label htmlFor="ecp-work-header" className="ecp-section-header-label">
                  Work Samples
                </label>
                <p className="ecp-section-text">
                  {this.state.profile.workSamples || ''}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Modal
              trigger={
                <Grid.Row className="ecp-section-row">
                  <Grid.Column className="general-edit-icon" onClick={this.toggleEditability} >
                    <Add className="relative-24-d" height="16px" width="16px" />Edit Work Samples
                  </Grid.Column>
                </Grid.Row>
              }
              closeOnEscape={false}
              closeOnRootNodeClick={false}
              size="small"
              ref={(c) => { this.work_modal = c; }}

              closeIcon
              onClose={this.toggleEditability}
            >
              <Modal.Header>
                <Grid verticalAlign="middle" textAlign="left">
                  <Grid.Row columns={2}>
                    <Grid.Column className="modal-header" textAlign="left">
                      Work Samples
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <Button
                        className="ecell-modal-primary-button"
                        onClick={() => {
                          this.toggleEditability();
                          this.work_modal.setState({ open: false });
                        }}
                      >
                        Save
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Header>

              <Modal.Content className="textarea-only-modal">
                <Form.Field>
                  <TextArea
                    name="workSamples"
                    value={this.state.profile.workSamples || ''}
                    onChange={this.handleChange}
                    rows="5"
                    placeholder="Enter your work samples eg. links to your previous projects, github profile etc..."
                    className="modal-form-textarea"
                  />
                </Form.Field>
              </Modal.Content>
            </Modal>
          </Grid>

          <Divider />

          {/* Co-Curricular Activities Section */}
          <Grid className="general-info-section">


            <Grid.Row width={16} centered className="ecp-section-row">
              <Grid.Column className="ecp-section-col">
                <label htmlFor="ecp-co-curr-header" className="ecp-section-header-label">
                  Co-Curricular Activities
                </label>
                <p className="ecp-section-text">
                  {this.state.profile.coCurricularActivities || ''}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Modal
              trigger={
                <Grid.Row className="ecp-section-row">
                  <Grid.Column className="general-edit-icon" onClick={this.toggleEditability} >
                    <Add className="relative-24-d" height="16px" width="16px" />Edit Co-curricular Activities
                  </Grid.Column>
                </Grid.Row>
              }
              closeOnEscape={false}
              closeOnRootNodeClick={false}
              size="small"
              ref={(c) => { this.cca_modal = c; }}

              closeIcon
              onClose={this.toggleEditability}
            >
              <Modal.Header>
                <Grid verticalAlign="middle" textAlign="left">
                  <Grid.Row columns={2}>
                    <Grid.Column className="modal-header" textAlign="left">
                      Co-Curricular Activities
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <Button
                        className="ecell-modal-primary-button"
                        onClick={() => {
                          this.toggleEditability();
                          this.cca_modal.setState({ open: false });
                        }}
                      >
                        Save
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Header>

              <Modal.Content className="textarea-only-modal">
                <Form.Field>
                  <TextArea
                    name="coCurricularActivities"
                    value={this.state.profile.coCurricularActivities || ''}
                    onChange={this.handleChange}
                    rows="5"
                    placeholder="Enter your co-curricular activities..."
                    className="modal-form-textarea"
                  />
                </Form.Field>
              </Modal.Content>
            </Modal>
          </Grid>

          <Divider />

          {/* Additional Details Section */}
          <Grid className="general-info-section">

            <Grid.Row width={16} centered className="ecp-section-row">
              <Grid.Column className="ecp-section-col">
                <label htmlFor="ecp-additional-header" className="ecp-section-header-label">
                  Additional Details
                </label>
                <p className="ecp-section-text">
                  {this.state.profile.additionalDetails || ''}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Modal
              trigger={
                <Grid.Row className="ecp-section-row">
                  <Grid.Column className="general-edit-icon" onClick={this.toggleEditability}>
                    <Add className="relative-24-d" height="16px" width="16px" />Edit Additional Details
                  </Grid.Column>
                </Grid.Row>
              }
              closeOnEscape={false}
              closeOnRootNodeClick={false}
              size="small"
              ref={(c) => { this.additional_modal = c; }}

              closeIcon
              onClose={this.toggleEditability}
            >
              <Modal.Header>
                <Grid verticalAlign="middle" textAlign="left">
                  <Grid.Row columns={2}>
                    <Grid.Column className="modal-header" textAlign="left">
                      Additional Details
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <Button
                        className="ecell-modal-primary-button"
                        onClick={() => {
                          this.toggleEditability();
                          this.additional_modal.setState({ open: false });
                        }}
                      >
                        Save
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Header>

              <Modal.Content className="textarea-only-modal">
                <Form.Field>
                  <TextArea
                    name="additionalDetails"
                    value={this.state.profile.additionalDetails || ''}
                    onChange={this.handleChange}
                    rows="5"
                    placeholder="Enter any other additional details you might want to provide..."
                    className="modal-form-textarea"
                  />
                </Form.Field>
              </Modal.Content>
            </Modal>
          </Grid>

        </Grid.Column>
      </Grid>
    );
  }
}

ProfileInfo.propTypes = {
  profile: PropTypes.shape().isRequired,
};
