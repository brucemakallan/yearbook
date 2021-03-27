import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import useStyles from '../styles';
import DashboardHeader from '../DashboardHeader';
import NavTabs from '../NavTabs';

const PageHeader = ({
  icon,
  title,
  showSideBar,
  handleCollapse,
  handleChange,
  tabLinks,
  tabValue,
}) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color='primary' className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <DashboardHeader icon={icon} title={title} />
          <IconButton
            color='inherit'
            aria-label="toggle menu"
            component="span"
            onClick={handleCollapse}
            className={classes.burgerMenu}
          >
            {showSideBar ? <ArrowBackIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        {tabLinks && (
          <NavTabs
            color='primary'
            value={tabValue}
            handleChange={handleChange}
            tabLinks={tabLinks}
          />
        )}
      </AppBar>
    </div>
  );
};

export default PageHeader;
