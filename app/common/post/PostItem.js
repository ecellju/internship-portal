import React from 'react';
import { Card, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
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

    this.state = { favouriteIcon: 'remove bookmark' };

    this.findFavouriteState = () => {
      const userId = User.getId();
      Axios.get(`/api/user/isFavourited/${userId}/${this.props.id}`, {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      }).then(({ data }) => {
        const { isFavourited } = data;
        if (isFavourited) {
          this.setState({ favouriteIcon: 'bookmark' });
        } else {
          this.setState({ favouriteIcon: 'remove bookmark' });
        }
      }).catch(console.error);
    };

    this.handleFavouriteClick = () => {
      this.setState((state) => {
        const userId = User.getId();
        if (state.favouriteIcon === 'bookmark') {
          Axios.post(`/api/user/${userId}/removeFavourite`, { postId: this.props.id }, {
            headers: {
              Authorization: `bearer ${Auth.getToken()}`,
            },
          }).then(console.log).catch(console.error);
          return { favouriteIcon: 'remove bookmark' };
        }
        Axios.post(`/api/user/${userId}/addFavourite`, { postId: this.props.id }, {
          headers: {
            Authorization: `bearer ${Auth.getToken()}`,
          },
        }).then(console.log).catch(console.error);
        return { favouriteIcon: 'bookmark' };
      });
    };
  }

  componentWillMount() {
    this.findFavouriteState();
  }
  render() {
    const postDetailsPath =
      (this.props.isAdmin ? `/admin/posts/${this.props.id}` : `/user/posts/${this.props.id}`);
    return (
      <Card fluid >
        <Card.Content>
          <div>
            {!this.props.isAdmin &&
              <Icon
                name={this.state.favouriteIcon}
                size="large"
                className="link floated right"
                onClick={this.handleFavouriteClick}
              />
              }
          </div>
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
                      Duration
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Stipend
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
                      {`${this.props.post.duration} month(s)`}
                    </Table.Cell>
                    <Table.Cell>
                      &#8377; {this.props.post.stipend}
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
