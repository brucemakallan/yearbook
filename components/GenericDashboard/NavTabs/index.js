import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  tab: {
    '& span': {
      color: theme.palette.light,
    },
  },
}));

const a11yProps = (index) => ({
  id: `nav-tab-${index}`,
  'aria-controls': `nav-tabpanel-${index}`,
});

const LinkTab = (props) => {
  const classes = useStyles();

  return (
    <Tab
      component={Link}
      className={classes.tab}
      to={props.href}
      {...props}
    />
  );
};

const NavTabs = ({ value, handleChange, tabLinks }) => (
  <Tabs value={value} onChange={handleChange} aria-label='nav tabs'>
    {tabLinks.map(({ id, label, link }, index) => (
      <LinkTab
        key={id}
        label={label}
        href={link}
        {...a11yProps(index)} />
    ))}

  </Tabs>
);

export default NavTabs;
