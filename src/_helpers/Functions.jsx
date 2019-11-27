import moment from 'moment';
import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import Login from '../LoginPage/Index';

//Alert Message
export const getAlertMessage = (icon, text) => ({
    icon: icon,
    text: text
});

//Custom Date Format
export function dateFormat(date, format) {
    if (moment(date).isValid()) {
        return moment(date).format(format);
    } else {
        return '';
    }
}

//Logged User Details
export function loggedUserDetails() {
    let sessionData = localStorage.getItem('loggedUser');
    sessionData = JSON.parse(sessionData) || {};
    return sessionData;
}

//Custom Form Fields
export function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

//Authenticate Admin Routes
export function AuthenticateAdminRoutes(component) {
    const { email } = loggedUserDetails();
    if (email) return component;
    else return Login;

}
