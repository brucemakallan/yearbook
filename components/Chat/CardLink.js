import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const CardLink = ({
  children,
  name,
  receiverId,
  allClassProfiles,
}) => {
  const classes = useStyles();

  return (
    <Link
      component={RouterLink}
      className={classes.link}
      to={{
        pathname: '/dashboard/chat-window',
        state: {
          name,
          receiverId,
          allClassProfiles,
        },
      }}
    >
      {children}
    </Link>
  );
};

export default CardLink;
