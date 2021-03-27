import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
  },
}));

const SvgRender = ({ path }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <img src={path} className={classes.image} alt="svg" />
      </Grid>
    </Grid>
  );
};

export default SvgRender;
