import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './styles.scss';

function formatDate(date) {
  const d = new Date(date);
  const monthStr = (d.getMonth() + 1).toString();
  const dayStr = d.getDate().toString();
  const yearStr = d.getFullYear();
  return `${dayStr}/${monthStr}/${yearStr}`;
}

const DisplayPost = ({
  internshipDetails,
}) => (
  <div className="submit-post-form-container">
    <Form >
      <Form.Field>
        <label htmlFor="submit-post-position">Position</label>
        <input
          name="position"
          value={internshipDetails.position}
          readOnly
          // onChange={onChange}
          id="submit-post-position"
          placeholder="Enter the internship position..."
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="submit-post-company">Company</label>
        <input
          name="company"
          value={internshipDetails.company}
          readOnly
         // onChange={onChange}
          id="submit-post-company"
          placeholder="Enter the company..."
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="submit-post-location">Location</label>
        <input
          name="location"
          value={internshipDetails.location}
          readOnly
          // onChange={onChange}
          id="submit-post-location"
          placeholder="Enter the location..."
        />
      </Form.Field>
      <Form.Group>
        <Form.Field>
          <label htmlFor="submit-post-start-date">Start Date</label>
          <input
            name="start-date"
            value={formatDate(internshipDetails.startDate)}
            readOnly
           //  onChange={onChange}
            id="submit-post-start-date"
            placeholder="Enter the starting date.."
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="submit-post-duration">Duration (in months)</label>
          <input
            name="duration"
            value={internshipDetails.duration}
            readOnly
            // onChange={onChange}
            id="submit-post-location"
            placeholder="Enter the number of months..."
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="submit-post-stipend">Stipend (&#8377;)</label>
          <input
            name="stipend"
            value={internshipDetails.stipend}
            readOnly
            // onChange={onChange}
            id="submit-post-stipend"
            type="number"
            placeholder="Enter the stipend..."
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="submit-post-apply-by">Apply by</label>
          <input
            name="apply-by"
            value={formatDate(internshipDetails.applyBy)}
            readOnly
           // onChange={onChange}
            id="submit-post-apply-by"
            placeholder="Enter the last date of application..."
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label htmlFor="submit-post-description-about">About</label>
        <textarea
          name="description-about"
          value={internshipDetails.description.about}
          readOnly
          // onChange={onChange}
          rows="5"
          id="submit-post-description-about"
          placeholder="Enter internship details..."
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="submit-post-description-who-can-apply">Who can apply</label>
        <textarea
          readOnly
          name="description-who-can-apply"
          value={internshipDetails.description.whoCanApply}
          // onChange={onChange}
          rows="5"
          id="submit-post-description-who-can-apply"
          placeholder="Who can apply for this internship?"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="submit-post-description-perks">Perks</label>
        <textarea
          name="description-perks"
          readOnly
          value={internshipDetails.description.perks}
         // onChange={onChange}
          rows="5"
          id="submit-post-description-perks"
          placeholder="Enter internship perks details..."
        />
      </Form.Field>
    </Form>
  </div>
);


DisplayPost.propTypes = {
  internshipDetails: PropTypes.shape({
    position: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    stipend: PropTypes.string.isRequired,
    applyBy: PropTypes.string.isRequired,
    description: PropTypes.object.isRequired,
  }).isRequired,
};

export default DisplayPost;
