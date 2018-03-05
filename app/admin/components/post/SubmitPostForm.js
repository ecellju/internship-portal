import React from 'react';
import { Form, Button, Message, Label } from 'semantic-ui-react';
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
        {_.has(errors, 'position') &&
          <Label htmlFor="submit-post-position" basic color="red" pointing>
            {errors.position}
          </Label>
        }
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
        {_.has(errors, 'company') &&
          <Label htmlFor="submit-post-company" basic color="red" pointing>
            {errors.company}
          </Label>
        }
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
        {_.has(errors, 'location') &&
          <Label htmlFor="submit-post-location" basic color="red" pointing>
            {errors.location}
          </Label>
        }
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
          {_.has(errors, 'startDate') &&
            <Label htmlFor="submit-post-start-date" basic color="red" pointing>
              {errors.startDate}
            </Label>
          }
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
          {_.has(errors, 'duration') &&
            <Label htmlFor="submit-post-duration" basic color="red" pointing>
              {errors.duration}
            </Label>
          }
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
          {_.has(errors, 'stipend') &&
            <Label htmlFor="submit-post-stipend" basic color="red" pointing>
              {errors.stipend}
            </Label>
          }
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
          {_.has(errors, 'applyBy') &&
            <Label htmlFor="submit-post-apply-by" basic color="red" pointing>
              {errors.applyBy}
            </Label>
          }
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
        {_.has(errors, 'description') &&
          <Label htmlFor="submit-post-description" basic color="red" pointing>
            {errors.description}
          </Label>
        }
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
    duration: PropTypes.string.isRequired,
    stipend: PropTypes.string.isRequired,
    applyBy: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubmitPostForm;
