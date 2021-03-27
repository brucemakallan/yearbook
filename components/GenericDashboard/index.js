import React from 'react';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';

import useStyles from './styles';
import Sidebar from './Sidebar';

const GenericDashboard = ({
  children,
  sidebarFields,
  showSideBar,
  hideSideBar,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Sidebar
          className={clsx(showSideBar ? classes.showSideBar : classes.hideSideBar)}
          hideSideBar={hideSideBar}
          fields={sidebarFields}
        />
        {children}
      </Grid>
    </div>
  );
};

export default GenericDashboard;
