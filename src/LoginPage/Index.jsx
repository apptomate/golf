import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, FormGroup } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { AuthenticationService } from '../_services/AuthenticationService';
import { LOGIN_URL } from '../_helpers/Constants';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { getAlertMessage, loggedUserDetails } from '../_helpers/Functions';
import logo from '../assets/img/reactlogo.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userTypeid: 1,
      isLoggedIn: false
    };
    this.handleValidation = this.handleValidation.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }
  //Login Validation
  handleValidation = () => {
    const { email, password, userTypeid } = this.state;
    const formData = {
      email,
      password,
      userTypeid
    };
    Axios.post(LOGIN_URL, formData)
      .then(response => {
        const {
          token,
          user: { email }
        } = response.data;
        let loginData = {
          email: email
        };
        localStorage.setItem('authToken', token);
        localStorage.setItem('loggedUser', JSON.stringify(loginData));
        Swal.fire(getAlertMessage('success', 'Login Success'));
        this.setState({ isLoggedIn: true });
      })
      .catch(function(error) {
        if (error.response) {
          const { errorMessage } = error.response.data;
          Swal.fire(getAlertMessage('error', errorMessage));
        }
      });
  };
  //Field Change
  handleFieldChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { email: loggedEmail = '' } = loggedUserDetails();
    const { email, password } = this.state;
    // Redirect After Login Success
    if (this.state.isLoggedIn || loggedEmail) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div className='login-bg'>
        <Row>
          <Col md='7' className='login-logo'>
            <img src={logo} alt='logo_image' />
          </Col>
          <Col className='login-form-center' md='3'>
            <AvForm
              className='bg-white login-form-space'
              onValidSubmit={this.handleValidation}
            >
              <h3 className='login-title'>Login</h3>
              <FormGroup>
                <AvField
                  name='email'
                  label='Email'
                  type='email'
                  required
                  onChange={this.handleFieldChange}
                  value={email}
                />
              </FormGroup>
              <br />
              <FormGroup>
                <AvField
                  name='password'
                  label='Password'
                  type='password'
                  required
                  onChange={this.handleFieldChange}
                  value={password}
                />
              </FormGroup>
              <br />
              <center>
                <Button color='primary' size='md'>
                  Login
                </Button>
              </center>
            </AvForm>
          </Col>
          <Col className='login-form-center' md='1'></Col>
        </Row>
      </div>
    );
  }
}
