import React from 'react';
import { Modal, Button, Icon, Divider } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import AvailableSkillListItem from './AvailableSkillListItem';
import SelectedSkillListItem from './SelectedSkillListItem';

const skillList = [
  'Database Management', 'C++', 'Machine Learning', 'People Skills', 'Python', 'Full stack development',
  'C#', 'Java', 'Data Science', 'Leadership',
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

export default class ModalSkillList extends React.Component {
  constructor() {
    super();
    this.state = { unselectedSkills: [], selectedSkills: [], open: false };
    this.addSkill = (skill) => {
      const temp = this.state.selectedSkills;
      temp.push(skill);
      this.setState({ ...this.state, selectedSkills: temp });
      const newSkillList = this.state.unselectedSkills.filter(e => e !== skill);
      this.setState({ ...this.state, unselectedSkills: newSkillList });
    };
    this.addSkill = this.addSkill.bind(this);
    this.handleAdd = () => {
      let featuredSkills = [];
      getFeaturededSkills()
        .then((res) => {
          featuredSkills = res.data;
          const temp = this.state.selectedSkills;
          for (let i = 0; i < temp.length; i += 1) {
            featuredSkills.push(temp[i]);
          }
          console.log('new skills ', featuredSkills);
          addNewSkills(featuredSkills)
            .then((resp) => {
            // console.log('THIS ', this);
              console.log(resp);
              getUnselectedSkills()
                .then((response) => {
                // console.log('THIS ', this);
                  // console.log('unselected Skills ', response.data);
                  this.setState({ ...this.state, unselectedSkills: response.data });
                  // console.log('get', this.state);
                })
                .catch(console.error());
              this.props.refreshSkillList();
              // console.log('get', this.state);
            })
            .catch(console.error());
          this.setState({ ...this.state, open: false, selectedSkills: [] });
          // console.log('state now', this.state);
        })
        .catch(console.error());
    };
    this.open = () => {
      this.setState({ ...this.state, open: true });
    };
    this.close = () => {
      const tempSelected = this.state.selectedSkills;
      const tempUnselected = this.state.unselectedSkills;
      // console.log('jjj', tempSelected, tempUnselected);
      for (let i = 0; i < tempSelected.length; i += 1) {
        tempUnselected.push(tempSelected[i]);
      }
      this.setState({
        ...this.state, open: false, selectedSkills: [], unselectedSkills: tempUnselected,
      });
    };
  }

  componentWillMount() {
    // console.log('Mounting parent');
    getUnselectedSkills()
      .then((res) => {
      // console.log('THIS ', this);
        // console.log('unselected Skills ', res.data);
        this.setState({ ...this.state, unselectedSkills: res.data });
        // console.log('get', this.state);
      })
      .catch(console.error());
  }

  render() {
    const availableSkillItems = this.state.unselectedSkills.map(item => (
      <AvailableSkillListItem
        key={item}
        skill={item}
        addSkill={this.addSkill}
      />
    ));
    const selectedSkillItems = this.state.selectedSkills.map(item => (
      <SelectedSkillListItem
        key={item}
        skill={item}
        addSkill={this.addSkill}
      />
    ));
    return (
      <div>
        <Button onClick={this.open} size="small" >
          <Icon name="add" />
          Add a new skill
        </Button>
        <Modal closeIcon open={this.state.open} onClose={this.close} >
          <Modal.Header>Select a new skill</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              {selectedSkillItems}
              <Divider section />
              {availableSkillItems}
              <Divider section />
              <Button primary onClick={this.handleAdd} floated="right"> Add </Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

ModalSkillList.propTypes = {
  refreshSkillList: PropTypes.func.isRequired,
};
