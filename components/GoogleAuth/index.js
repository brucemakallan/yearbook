import React from 'react';
import { GoogleLogin } from 'react-google-login';

import Grid from '@material-ui/core/Grid';

const GoogleAuth = ({ responseGoogle, buttonText = 'Sign in with Google' }) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;

  if (!clientId) return '';

  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <GoogleLogin
          clientId={clientId}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          buttonText={buttonText}
          cookiePolicy={'single_host_origin'}
          // see more props here: https://www.npmjs.com/package/react-google-login
        />
      </Grid>
    </Grid>
  );
};

export default GoogleAuth;
