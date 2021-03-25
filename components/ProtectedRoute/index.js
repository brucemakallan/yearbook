import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getToken, jwtIsValid } from '../../helpers/jwt';

const ProtectedRoute = ({
  page,
  redirectTo = '/login',
  ...rest
}) => {
  const jwt = getToken();
  const isAuthenticated = jwtIsValid(jwt);

  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated
          ? page
          : <Redirect
            to={redirectTo}
            from={props.location.pathname}
          />
      )}
    />
  );
};

export default ProtectedRoute;
