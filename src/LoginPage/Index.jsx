import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Row, Col, } from "react-bootstrap";
import { AuthenticationService } from '../_services/AuthenticationService';
import { LOGIN_URL, GENERATEEMAILOTP_URL } from '../_helpers/Constants';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { getAlertMessage, loggedUserDetails, FieldGroup } from '../_helpers/Functions';
import logo from '../assets/img/reactlogo.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      showOtpverify: false,
    };
    this.handleValidation = this.handleValidation.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleVerifyOtp = this.toggleVerifyOtp.bind(this);
  }

  //Toggle Verify OTP
  toggleVerifyOtp = async () => {
    let { email } = this.state;
    var formData = {
      emailorphone: email,
      type: 'Forgot Password',
      sourceType: 'Email'
    };
    if (email) {
      await Axios.put(GENERATEEMAILOTP_URL, formData)
        .then(response => {
          let { data: otpGenerateResponse = '' } = response;
          Swal.fire(getAlertMessage('success', otpGenerateResponse));
          this.setState(prevState => ({ showOtpverify: !prevState.showOtpverify }));
        })
        .catch(function (error) {
          if (error.response) {
            let { errorMessage } = error.response.data;
            Swal.fire(getAlertMessage('error', errorMessage));
          }
        });
    } else {
      Swal.fire(getAlertMessage('error', 'Enter E-mail'));
    }
  }

  //Login Validation
  handleValidation = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const formData = {
      email,
      password
    };
    Axios.post(LOGIN_URL, formData)
      .then(response => {
        const { token, user: { email, userWithTypeId } } = response.data;
        let loginData = {
          email: email,
          userWithTypeId: userWithTypeId
        };
        localStorage.setItem('authToken', token);
        localStorage.setItem('loggedUser', JSON.stringify(loginData));
        Swal.fire(getAlertMessage('success', 'Login Success'));
        this.setState({ isLoggedIn: true });
      })
      .catch(function (error) {
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
    const { email, password, showOtpverify, isLoggedIn } = this.state;
    // Redirect After Login Success
    if (isLoggedIn || loggedEmail) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    if (showOtpverify) {
      return <Redirect to={{ pathname: '/resetPassword', state: { email } }} />;
    }
    return (
      <div className='login-bg'>
        <Row>
          <Col md={7} className='login-logo'>
            <img src={logo} alt='logo_image' />
          </Col>
          <Col className='login-form-center' md={3}>
            <form className="bg-white login-form-space" onSubmit={this.handleValidation}>
              <h3 className="login-title">Login</h3>
              <FieldGroup
                id="email" name="email" type="email" label="Email" placeholder="Email" required
                onChange={this.handleFieldChange} value={email} />
              <FieldGroup
                id="password" name="password" type="password" label="Password" placeholder="Password" required
                onChange={this.handleFieldChange} value={password} />
              <Button bsStyle="link" style={{ float: 'right', fontSize: '16px !important' }} onClick={this.toggleVerifyOtp}>Forgot Password?</Button>
              <center> <Button type='submit' color="primary">Login</Button></center>
            </form>
          </Col>
          <Col className='login-form-center' md={1}></Col>
        </Row>
      </div>
    );
  }
}