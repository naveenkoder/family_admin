import { Route, Redirect } from "react-router-dom";
import React from "react";

console.log(localStorage)
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.token ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
