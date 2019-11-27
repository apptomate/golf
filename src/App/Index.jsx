import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "../layouts/Admin";
import Login from "../LoginPage/Index";
import configureStore from '../_store/ConfigureStore';
import { Provider } from "react-redux";
import ResetPassword from '../ResetPassword/Index';
import { AuthenticateAdminRoutes } from '../_helpers/Functions';

const store = configureStore();
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/resetPassword' component={ResetPassword} />
                        <Route path="/admin" component={AuthenticateAdminRoutes(AdminLayout)} />
                        <Redirect from="/" to="/admin/users" />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}