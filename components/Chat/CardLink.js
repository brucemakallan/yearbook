import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';

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
}) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <span
      className={classes.link}
      onClick={() => {
        router.push({
          pathname: '/dashboard/chat/conversation',
          query: {
            name,
            receiverId,
          },
        });
      }}
    >
      {children}
    </span>
  );
};

export default CardLink;
