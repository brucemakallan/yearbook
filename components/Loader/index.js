import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  progress: {
    zIndex: 2,
  },
}));

const Loader = ({ showInline, loadingText }) => {
  const classes = useStyles();

  return (
    <div className={showInline ? '' : classes.loader}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <CircularProgress className={classes.progress} />
        </Grid>
        {!!loadingText && (
          <Grid item>
            <Typography variant="body2">{loadingText}</Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Loader;
