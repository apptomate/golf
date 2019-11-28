import React, { Component } from 'react';
import { NavItem, Nav, Dropdown, NavDropdown, MenuItem } from 'react-bootstrap';
import { AuthenticationService } from '../../_services/AuthenticationService';
import { loggedUserDetails } from '../../_helpers/Functions';
import { useHistory } from "react-router-dom";


//Signout Button
function SignoutButton() {
  let history = useHistory();
  const { email } = loggedUserDetails();
  return email ? (
    <NavItem eventKey={3} onClick={() => AuthenticationService.logout()}>
      <i className='fas fa-sign-out-alt' style={{ fontSize: '13px' }} />
    </NavItem>
  ) : (
      <p>Signin</p>
    );
}

class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { email } = loggedUserDetails();
    const notification = (
      <div>
        <i className='fa fa-globe' />
        <b className='caret' />
        <span className='notification'>5</span>
        <p className='hidden-lg hidden-md'>Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          {/* <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem> 
           <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem> */}
        </Nav>
        <Nav pullRight>
          {/* <NavItem eventKey={1} href="#">
            Account
          </NavItem>
          <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown> */}
          <NavItem className='login-name'>{email}</NavItem>
          <SignoutButton />
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
