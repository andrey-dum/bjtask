
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


function AuthRoute({ component: Component, ...rest }) {
  const { token } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;