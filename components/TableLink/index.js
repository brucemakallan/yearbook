import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import MaterialUILink from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.primary.dark,
  },
}));

const TableLink = ({
  children, text, label, link,
}) => {
  const classes = useStyles();
  return (
    <MaterialUILink
      component={Link}
      className={label && classes.label}
      variant='body1'
      to={link}
    >
      {children || text}
    </MaterialUILink>
  );
};

export default TableLink;
