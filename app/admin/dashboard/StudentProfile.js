import React from 'react';
import { Button, Form, Label, Grid, Modal, TextArea, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';

import Auth from '../../auth/modules/Auth';
import Add from '../../assets/add.svg';

import './styles.scss';
import UserIcon from '../../assets/user.svg';

const fetchProfileById = profileId =>
  (axios.get(`/api/admin/get-profile/${profileId}`, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then((resp) => {
      console.log(resp.data);
      return resp.data;
    })
    .catch(console.error));


export default class StudentProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      userSkills: [],
    };
  }

  componentWillMount() {
    console.log(`/api/admin/get-profile/${this.props.match.params.id}`);
    fetchProfileById(this.props.match.params.id)
      .then((res) => {
        this.setState({ profile: res.profile, userSkills: res.featuredSkills });

      })
      .catch(console.error);
  }

  render() {
    console.log(this.state);
    if (!this.state.profile || !this.state.userSkills) {
      return (<p>Loading...</p>);
    }
    return (

      <Grid verticalAlign="middle" centered>
        <Grid.Column width={10} centered className="ecell-profile-main-container">

          <Grid className="general-info-section">
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
          </Grid>

        </Grid.Column>
      </Grid>
    );
  }
}

StudentProfile.propTypes = {
  profile: PropTypes.shape().isRequired,
};
