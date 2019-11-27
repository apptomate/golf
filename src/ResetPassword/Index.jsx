import React, { Component } from 'react';
import { Jumbotron, Button, Row, Col } from 'react-bootstrap';
import { FieldGroup, getAlertMessage } from '../_helpers/Functions';
import { UPDATEPASSWORD_URL } from '../_helpers/Constants';
import { Redirect } from "react-router-dom";
import Swal from 'sweetalert2';
import Axios from 'axios';
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', matchOTP: '', newPassword: '', confirmPassword: '', otpVerified: false
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleValidateOTP = this.handleValidateOTP.bind(this);
    }
    //Validate Otp
    handleValidateOTP = (event) => {
        event.preventDefault();
        let { matchOTP, email, newPassword, confirmPassword } = this.state;
        if (newPassword === confirmPassword) {
            var formData = {
                otpValue: matchOTP,
                emailorPhone: email,
                password: newPassword,
                sourceType: 'Email'
            };
            Axios.put(UPDATEPASSWORD_URL, formData)
                .then(response => {
                    let { data: passwordUpdateResponse = '' } = response;
                    Swal.fire(getAlertMessage('success', passwordUpdateResponse));
                    this.setState(prevState => ({ otpVerified: !prevState.otpVerified }));
                })
                .catch(function (error) {
                    if (error.response) {
                        const { errorMessage } = error.response.data;
                        Swal.fire(getAlertMessage('error', errorMessage));
                    }
                });
        } else {
            Swal.fire(getAlertMessage('error', 'Password and Confirm password are not matched'));
        }
    }
    //Field Change
    handleFieldChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    componentDidMount = () => {
        const { location: { state: { email = '' } } } = this.props;
        this.setState({ email });
    }
    render() {
        const { matchOTP, newPassword, confirmPassword, otpVerified, email } = this.state;
        if (otpVerified) {
            return <Redirect to={{ pathname: '/login' }} />;
        }
        return (
            <Jumbotron>
                <center>
                    <h1>Golf</h1>
                    <p>
                        Enter OTP code received from {email}
                    </p>
                </center>
                <Row>
                    <Col md={3} />
                    <Col md={6}>
                        <form className="bg-white login-form-space" onSubmit={this.handleValidateOTP}>
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
                                <Button bsStyle="danger" href='/login'>Back to Login</Button>{'  '}
                                <Button type='submit' bsStyle="primary">{`Verify & Update`}</Button></center>
                        </form>
                    </Col>
                </Row>
            </Jumbotron>
        );
    };
}