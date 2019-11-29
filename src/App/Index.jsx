import React, { Component, Suspense, lazy, } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import configureStore from '../_store/ConfigureStore';
import { Provider } from "react-redux";
import { ProtectedRoute, PublicRoute } from '../_helpers/Functions';
const store = configureStore();

//Components
const Login = React.lazy(() => import('../LoginPage/Index'));
const GenerateOTP = React.lazy(() => import('../GenerateOTP'));
const AdminLayout = React.lazy(() => import('../layouts/Admin'));

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <PublicRoute path='/login' component={Login} />
                            <PublicRoute path='/generateOTP' component={GenerateOTP} />
                            <ProtectedRoute path='/admin' component={AdminLayout} />
                            <Redirect from="/" to="/admin/users" />
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </Provider>
        );
    }
}