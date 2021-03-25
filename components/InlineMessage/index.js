import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    paddingRight: theme.spacing(0.5),
  },
}));

const InlineMessage = ({ type = 'success', message = 'All good' }) => {
  const classes = useStyles();

  if (type === 'success') {
    return (
      <Typography variant="body2" color="primary" className={classes.root}>
        <InfoIcon fontSize="small" className={classes.icon} />
        {message}
      </Typography>
    );
  }

  return (
    <Typography variant="body2" color="secondary" className={classes.root}>
      <ErrorIcon fontSize="small" className={classes.icon} />
      {message}
    </Typography>
  );
};

export default InlineMessage;
