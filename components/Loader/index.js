import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
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

const Loader = ({ showInline }) => {
  const classes = useStyles();

  return (
    <div className={showInline ? '' : classes.loader}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

export default Loader;
