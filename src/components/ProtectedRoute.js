import React from "react";
import { Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authUser = useSelector((state) => state.authUser && state.authUser.user);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Login redirectPath={location.pathname} />
        )
      }
    />
  );
};

export default ProtectedRoute;
