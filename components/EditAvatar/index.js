import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const EditAvatar = ({ children, onUpload, photo }) => {
  const classes = useStyles();

  return (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      badgeContent={children}
    >
      <Avatar
        variant="rounded"
        alt="d.p"
        src={photo.url}
        className={classes.avatar}
      />
    </Badge>
  );
};

export default EditAvatar;
