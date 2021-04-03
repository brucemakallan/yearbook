import React from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const Separator = ({ text = 'Or' }) => (
  <Grid container spacing={2} justify="center" alignItems="center">
    <Grid item xs={5} sm={5} md={5} lg={5}>
      <Divider />
    </Grid>
    {text && (
      <Grid item>
        <Typography variant="h6" align="center">
          {text}
        </Typography>
      </Grid>
    )}
    <Grid item xs={5} sm={5} md={5} lg={5}>
      <Divider />
    </Grid>
  </Grid>
);

export default Separator;
