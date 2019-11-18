import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "../layouts/Admin";
import Login from "../LoginPage/Index";
import configureStore from '../_store/ConfigureStore';
import { Provider } from "react-redux";

const store = configureStore();
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' render={props => <Login />} />
                        <Route path="/admin" render={props => <AdminLayout {...props} />} />
                        <Redirect from="/" to="/admin/users" />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}