import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MaterialUILink from '@material-ui/core/Link';

import CustomNextLink from '../CustomNextLink';

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
      component={CustomNextLink}
      className={label && classes.label}
      variant='body1'
      href={link}
    >
      {children || text}
    </MaterialUILink>
  );
};

export default TableLink;
