import React from 'react';
import startCase from 'lodash/startCase';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  header: {
    height: '80px',
    margin: 0,
    backgroundColor: theme.palette.deepBlue,
  },
  heading: {
  },
  items: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  text: {
    '& span': {
      color: theme.palette.lightGrey,
    },
  },
  icon: {
    color: theme.palette.light,
  },
  active: {
    backgroundColor: theme.palette.deepBlue,
    color: theme.palette.light,
    '&:hover': {
      backgroundColor: theme.palette.deepBlue,
    },
  },
}));

const SidebarListItem = ({
  field, component, className, handleClick, classes,
}) => (
  <ListItem
    button={!!field.link}
    component={component}
    className={className}
    onClick={handleClick}
  >
    {field.icon && (
      <ListItemIcon className={classes.icon}>
        {field.icon}
      </ListItemIcon>)
    }
    <ListItemText
      className={classes.text}
      primary={startCase(field.id)}
    />
  </ListItem>
);

const SidebarButton = ({ field, hideSideBar }) => {
  const classes = useStyles();
  const router = useRouter();
  const { pathname } = router;
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    if (field.action) field.action();
    if (isSm) hideSideBar();
  };

  let className = classes.items;
  if (field.component) className = classes.header;
  else if (field.heading) className = classes.heading;
  else if (pathname.includes(field.id)) className = classes.active;
  else if (pathname === '/dashboard' && field.id === 'stats') className = classes.active;

  const component = field?.component || 'div';

  if (field.link) {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Link href={field.link}>
            <SidebarListItem
              field={field}
              component={component}
              className={className}
              handleClick={handleClick}
              classes={classes}
            />
          </Link>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <SidebarListItem
          field={field}
          component={component}
          className={className}
          handleClick={handleClick}
          classes={classes}
        />
      </Grid>
    </Grid>
  );
};

export default SidebarButton;
