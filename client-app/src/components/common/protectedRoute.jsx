import React from "react";
import { PropTypes } from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!getCurrentUser()) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
      return Component ? <Component {...props} /> : render(props);
    }}
  />
);

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  render: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.string)
};

export default ProtectedRoute;
