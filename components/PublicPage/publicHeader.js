import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
}));

const PublicHeader = ({ title }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <AppBar position="static" color={isSm ? 'secondary' : 'transparent'}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" href="/">Home</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PublicHeader;
