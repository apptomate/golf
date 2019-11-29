import moment from 'moment';
import React, { Children } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import { Redirect, Route } from 'react-router-dom';

//Alert Toast
export const getAlertToast = (type = 'success', text = '', timer = 3000) => ({
    toast: true,
    position: 'top',
    titleText: text,
    type: type,
    showConfirmButton: false,
    timer: timer
});

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
//Logged Token Details
export function loggedTokenDetails() {
    let authToken = localStorage.getItem('authToken');
    return authToken;
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
        <FormGroup controlId={id} >
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
        // validationState={(!props.value) ? 'error' : 'success'}
    );
}

//Authenticate Admin Routes
export function ProtectedRoute({ component, ...rest }) {
    const authToken = loggedTokenDetails();
    if (authToken) return <Route {...rest} component={component} />
    else return <Redirect to={{ pathname: '/login' }} />
}

//Authenticate Public Routes
export function PublicRoute({ component, ...rest }) {
    const authToken = loggedTokenDetails();
    if (!authToken) return <Route {...rest} component={component} />
    else return <Redirect to={{ pathname: '/' }} />
} 