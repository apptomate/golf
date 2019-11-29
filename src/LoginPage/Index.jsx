import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { Button, Row, Col, } from "react-bootstrap";
import { FieldGroup } from '../_helpers/Functions';
import logo from '../assets/img/reactlogo.png';
import { connect } from 'react-redux';
import { authLogin } from '../_actions/Index';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleValidation = this.handleValidation.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }
  //Login Validation
  handleValidation = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const formData = { email, password };
    this.props.authLogin(formData);
  };
  //Field Change
  handleFieldChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { email, password } = this.state;
    let { userData } = this.props;
    if (userData && userData.token) {
      return <Redirect to={{ pathname: '/' }} />;
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
              <Link to='/generateOTP'>
                <Button bsStyle="link" style={{ float: 'right', fontSize: '16px !important' }} >
                  Forgot Password?
                  </Button>
              </Link>
              <center> <Button type='submit' color="primary">Login</Button></center>
            </form>
          </Col>
          <Col className='login-form-center' md={1}></Col>
        </Row>
      </div>
    );
  }
}
//Prop Types
Login.propTypes = {
  userData: PropTypes.object
};

const getState = state => {
  return {
    userData: state.authLogin.data
  }
};
export default connect(
  getState, {
  authLogin
})(Login);