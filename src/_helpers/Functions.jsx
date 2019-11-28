import moment from 'moment';
import React, { Children } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import { Redirect, Route } from 'react-router-dom';

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
export function ProtectedRoute({ component, ...rest }) {
    const { email } = loggedUserDetails();
    if (email) return <Route {...rest} component={component} />
    else return <Redirect to={{ pathname: '/login' }} />
}

//Authenticate Public Routes
export function PublicRoute({ component, ...rest }) {
    const { email } = loggedUserDetails();
    if (!email) return <Route {...rest} component={component} />
    else return <Redirect to={{ pathname: '/' }} />
} 