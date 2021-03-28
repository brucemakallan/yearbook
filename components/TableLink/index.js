import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

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
    <CustomNextLink
      className={label && classes.label}
      href={link}
    >
      {children || text}
    </CustomNextLink>
  );
};

export default TableLink;
