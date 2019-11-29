import React, { Component } from 'react';
import { Button, Row, Col, Radio, FormGroup, ControlLabel } from 'react-bootstrap';
import { FieldGroup } from '../_helpers/Functions';
import { Redirect, Link } from "react-router-dom";
import logo from '../assets/img/reactlogo.png';
import { generateEmailOTP } from '../_actions/Index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResetPassword from '../ResetPassword/Index';
class GenerateOTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', phoneNumber: '', otpSendTo: 'email'
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
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
    }
    //Field Change
    handleFieldChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        const { email, otpSendTo, phoneNumber } = this.state;
        const { emailOTP } = this.props;
        const otpGeneratedProps = {
            otpSendTo, email, phoneNumber
        };
        return (
            <div className='login-bg'>
                <Row>
                    <Col md={7} className='login-logo'>
                        <img src={logo} alt='logo_image' />
                    </Col>
                    <Col className='login-form-center' md={3}>
                        {(!emailOTP) ?

                            (<form className="bg-white login-form-space" onSubmit={this.generateOTP}>
                                <h3 className="login-title">Find your account</h3>
                                <center>
                                    <FormGroup>
                                        <ControlLabel>Send Code To</ControlLabel><br />
                                        <Radio name="otpSendTo" value='email' inline onChange={this.handleFieldChange} checked={otpSendTo === 'email'}>
                                            Email
                                </Radio>{' '}
                                        <Radio name="otpSendTo" value='phoneNumber' inline onChange={this.handleFieldChange} checked={otpSendTo === 'phoneNumber'}>
                                            SMS
                                </Radio>{' '}
                                    </FormGroup>
                                </center>
                                {(otpSendTo === 'email') ?
                                    <FieldGroup
                                        id="email" name="email" type="email" label="Email" placeholder="Email" required
                                        onChange={this.handleFieldChange} value={email} />
                                    :
                                    <FieldGroup
                                        id="phoneNumber" name="phoneNumber" type="text" label="Phone Number" placeholder="Phone Number" required
                                        onChange={this.handleFieldChange} value={phoneNumber} />
                                }
                                <center>
                                    <Link to='/login'><Button bsStyle="default" >Cancel</Button></Link>{' '}
                                    <Button type='submit' bsStyle="primary" >Send OTP</Button></center>
                            </form>)
                            :
                            (<ResetPassword otpGeneratedProps={otpGeneratedProps} />)
                        }

                    </Col>
                    <Col className='login-form-center' md={1}></Col>
                </Row>
            </div>
        );
    };
}

//Prop Types
GenerateOTP.propTypes = {
    emailOTP: PropTypes.string
};
const getState = state => {
    return {
        emailOTP: state.generateEmailOTP.data
    }
};
export default connect(
    getState, {
    generateEmailOTP
})(GenerateOTP);