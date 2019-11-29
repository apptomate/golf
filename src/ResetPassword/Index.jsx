import React, { Component } from 'react';
import { Button, Row, Col, Alert } from 'react-bootstrap';
import { FieldGroup, getAlertMessage } from '../_helpers/Functions';
import { Redirect } from "react-router-dom";
import Swal from 'sweetalert2';
import logo from '../assets/img/reactlogo.png';
import { updatePassword, generateEmailOTP } from '../_actions/Index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', matchOTP: '', newPassword: '', confirmPassword: '',
            otpSendTo: '', phoneNumber: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
        this.generateOTP = this.generateOTP.bind(this);
    }
    //Generate OTP
    generateOTP = (event) => {
        event.preventDefault();
        let { email, otpSendTo, phoneNumber } = this.state;
        var formData = {
            emailorphone: (otpSendTo === 'email') ? email : phoneNumber,
            type: 'Forgot Password',
            sourceType: (otpSendTo === 'email') ? 'Email' : 'Phone'
        };
        this.props.generateEmailOTP(formData);
        this.setState({ matchOTP: '' })
    }
    //Validate Otp
    handleUpdatePassword = (event) => {
        event.preventDefault();
        let { matchOTP, email, newPassword, confirmPassword } = this.state;
        if (newPassword === confirmPassword) {
            var formData = {
                otpValue: matchOTP,
                emailorPhone: email,
                password: newPassword,
                sourceType: 'Email'
            };
            this.props.updatePassword(formData);
        } else {
            Swal.fire(getAlertMessage('error', 'Password and Confirm password are not matched'));
        }
    }
    //Field Change
    handleFieldChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    componentDidMount() {
        let { otpGeneratedProps: { otpSendTo, email, phoneNumber } } = this.props;
        this.setState({ otpSendTo, email, phoneNumber });
    }
    render() {
        const { matchOTP, newPassword, confirmPassword, email, otpSendTo, phoneNumber } = this.state;
        const { userToLogin } = this.props;
        if (userToLogin && !userToLogin.errorMessage) {
            return <Redirect to={{ pathname: '/login' }} />;
        }
        return (
            <div >
                <form className="bg-white login-form-space" onSubmit={this.handleUpdatePassword}>
                    <h3 className="login-title">Reset your password</h3>
                    <Alert bsStyle="warning"><p>We sent 6 digits security code to :</p>
                        <p>
                            <i className={(otpSendTo === 'email') ? 'fas fa-envelope' : 'fas fa-mobile-alt'} />
                            {' '}<b>{(otpSendTo === 'email') ? email : phoneNumber}</b>
                        </p>
                    </Alert>
                    <FieldGroup
                        id="matchOTP" name="matchOTP" type="text" label="OTP Code" placeholder="OTP Code" required
                        onChange={this.handleFieldChange} value={matchOTP} />
                    <FieldGroup
                        id="newPassword" name="newPassword" type="password" label="New Password" placeholder="New Password" required
                        onChange={this.handleFieldChange} value={newPassword} />
                    <FieldGroup
                        id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" placeholder="Confirm Password" required
                        onChange={this.handleFieldChange} value={confirmPassword} />
                    <center>
                        <Button bsStyle="default" onClick={this.generateOTP}>Resend Code</Button>{' '}
                        <Button type='submit' bsStyle="primary">Update</Button></center>
                </form>
            </div>
        );
    };
}

//Prop Types
ResetPassword.propTypes = {
    userToLogin: PropTypes.string
};
const getState = state => {
    return {
        userToLogin: state.updatePassword.data
    }
};
export default connect(
    getState, {
    updatePassword,
    generateEmailOTP
})(ResetPassword);