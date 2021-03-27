import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import CurvesBackground from '../../styles/curvesBackground';
import PublicHeader from './publicHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  container: {
    width: '100%',
    height: '100vh',
  },
}));

const PublicPage = ({
  children,
  title,
  centerHorizontal = true,
  centerVertical = true,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CurvesBackground />
      <PublicHeader title={title} />
      <Grid
        container
        spacing={2}
        justify={centerHorizontal ? 'center' : 'flex-start'}
        alignItems={centerVertical ? 'center' : 'flex-start'}
        className={classes.container}
      >
        <Grid item>{children}</Grid>
      </Grid>
    </div>
  );
};

export default PublicPage;
