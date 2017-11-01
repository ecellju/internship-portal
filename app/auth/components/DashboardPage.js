import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
import AdminDashboardNavigate from '../../admin/components/AdminDashboardNavigate';
import Navbar from '../../admin/components/NavBar';

class DashboardPage extends React.Component {
  /**
   * Class constructor.
   */
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route path="/dashboard" component={AdminDashboardNavigate} />
            <Route render={() => <h1>Not Found 1</h1>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
