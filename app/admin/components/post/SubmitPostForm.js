import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './styles.scss';

const SubmitPostForm = ({
  onSubmit, onChange, errors, internshipDetails,
}) => (
  <div className="submit-post-form-container">
    {_.has(errors, 'summary') &&
      <Message
        error
        content={errors.summary}
      />
    }
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label htmlFor="submit-post-position">Position</label>
        <input
          name="position"
          value={internshipDetails.name}
          onChange={onChange}
          id="submit-post-position"
          placeholder="Enter the internship position..."
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="submit-post-company">Company</label>
        <input
          name="company"
          value={internshipDetails.company}
          onChange={onChange}
          id="submit-post-company"
          placeholder="Enter the company..."
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="submit-post-location">Location</label>
        <input
          name="location"
          value={internshipDetails.location}
          onChange={onChange}
          id="submit-post-location"
          placeholder="Enter the location..."
        />
      </Form.Field>
      <Form.Group>
        <Form.Field>
          <label htmlFor="submit-post-start-date">Start Date</label>
          <input
            name="start-date"
            value={internshipDetails.startDate}
            onChange={onChange}
            id="submit-post-start-date"
            type="date"
            placeholder="Enter the starting date.."
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="submit-post-duration">Duration</label>
          <input
            name="duration"
            value={internshipDetails.duration}
            onChange={onChange}
            id="submit-post-location"
            type="number"
            placeholder="Enter the number of months..."
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="submit-post-stipend">Stipend</label>
          <input
            name="stipend"
            value={internshipDetails.stipend}
            onChange={onChange}
            id="submit-post-stipend"
            type="number"
            placeholder="Enter the stipend..."
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="submit-post-apply-by">Apply by</label>
          <input
            name="apply-by"
            value={internshipDetails.applyBy}
            onChange={onChange}
            id="submit-post-apply-by"
            placeholder="Enter the last date of application..."
            type="date"
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label htmlFor="submit-post-description">Description</label>
        <textarea
          name="description"
          value={internshipDetails.description}
          onChange={onChange}
          rows="5"
          id="submit-post-description"
          placeholder="Enter internship details..."
        />
      </Form.Field>
      <div className="submit-post-button">
        <Button primary type="submit">Post Internship</Button>
      </div>
    </Form>
  </div>
);


SubmitPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({

  }).isRequired,
  internshipDetails: PropTypes.shape({
    position: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    stipend: PropTypes.number.isRequired,
    applyBy: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubmitPostForm;
