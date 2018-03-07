import React from 'react';
import { Card, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

function formatDate(date) {
  const d = new Date(date);
  const monthStr = (d.getMonth() + 1).toString();
  const dayStr = d.getDate().toString();
  const yearStr = d.getFullYear();
  return `${dayStr}/${monthStr}/${yearStr}`;
}
export default class PostItem extends React.Component {
  constructor() {
    super();

    this.favouritedState = { favourited: true, favouriteIcon: 'heart' };
    this.unfavouritedState = { favourited: false, favouriteIcon: 'empty heart' };

    this.state = this.unfavouritedState;

    this.handleFavouriteClick = () => {
      this.setState((state) => {
        if (state.favourited) {
          return this.unfavouritedState;
        }
        return this.favouritedState;
      });
    };
  }


  render() {
    const postDetailsPath =
      (this.props.isAdmin ? `/admin/posts/${this.props.id}` : `/user/posts/${this.props.id}`);
    return (
      <Card fluid >
        <Card.Content>
          <Card.Header as={Link} to={postDetailsPath} > {this.props.post.position}</Card.Header>
          <Card.Meta>{this.props.post.company}</Card.Meta>
          <Card.Meta>{`Location: ${this.props.post.location}`}</Card.Meta>
          <Card.Description>
            <div className="post-table-container">
              <Table basic="very">
                <Table.Header>
                  <Table.Row textAlign="center">
                    <Table.HeaderCell>
                      Start Date
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Duration (Months)
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Stipend (&#8377;)
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Posted On
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Apply By
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row textAlign="center">
                    <Table.Cell>
                      {formatDate(this.props.post.startDate)}
                    </Table.Cell>
                    <Table.Cell>
                      {this.props.post.duration}
                    </Table.Cell>
                    <Table.Cell>
                      {this.props.post.stipend}
                    </Table.Cell>
                    <Table.Cell>
                      {formatDate(this.props.post.postedOn)}
                    </Table.Cell>
                    <Table.Cell>
                      {formatDate(this.props.post.applyBy)}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Card.Description>
        </Card.Content>
        {/*
        <Card.Content extra>
          <Icon
            name={this.state.favouriteIcon}
            size="large"
            className="floated right link"
            onClick={this.handleFavouriteClick}
          />
        </Card.Content> */}
      </Card>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.shape({
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    stipend: PropTypes.number.isRequired,
    postedOn: PropTypes.string.isRequired,
    applyBy: PropTypes.string.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

PostItem.defaultProps = {
  isAdmin: false,
};
