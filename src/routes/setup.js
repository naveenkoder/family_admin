import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./protectedRoute";
import { ForgotPassword } from '../pages/auth/forgotPassword'
import { Login } from '../pages/auth/login'
import routeConfig from "./routeConfig";
import { ResetPassword } from "../pages/auth/resetPassword";

const Setup = () => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => (localStorage.token ? (
                    <Redirect to="/dashboard" />
                ) : (
                        <Redirect to="/login" />
                    ))}
            />

            <Route path="/login" render={() => (localStorage.token ? (
                <Redirect to="/dashboard" />
            ) : (
                    <Login />
                ))} />
            <Route path="/forgot-password" render={() => (localStorage.token ? (
                <Redirect to="/dashboard" />
            ) : (
                    <ForgotPassword />
                ))} />

            <Route path="/reset-password" render={() => (localStorage.token ? (
                <Redirect to="/dashboard" />
            ) : (
                    <ResetPassword />
                ))} />

            {routeConfig.map((route, i) => (
                <PrivateRoute exact={route.exact} key={route} path={route.path} component={route.component} />
            ))}
        </Switch>
    );
}

export default Setup