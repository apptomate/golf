import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedUserDetails } from '../../_helpers/Functions';
export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const { email } = loggedUserDetails();
        if (!email) {
            return <Redirect to='/login' />
        }
        return <Component {...props} />
    }} />
) 