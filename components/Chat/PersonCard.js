import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

import CardLink from './CardLink';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.lightGrey}`,
  },
  container: {
    borderRadius: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.lightGrey,
    },
  },
  dp: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const PersonCard = ({ profile, unreadCount = 0, lastReadDate }) => {
  const classes = useStyles();

  const { id, displayPicture, user: { firstName, lastName } } = profile;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className={classes.root}>
      <CardLink name={fullName} receiverId={id}>
        <Grid container spacing={2} alignItems="center" className={classes.container}>
          <Grid item xs={3} sm={2} md={1} lg={1}>
            <Badge color="secondary" overlap="circle" badgeContent={unreadCount}>
              <Avatar alt={firstName} src={displayPicture} className={classes.dp} />
            </Badge>
          </Grid>
          <Grid item xs={9} sm={10} md={11} lg={11}>
            {/* <ChartCardDetails
              loading={loading}
              error={error}
              name={name}
              latestMessage={latestMessage}
              lastReadDate={lastReadDate}
            /> */}
          </Grid>
        </Grid>
      </CardLink>
    </div>
  );
};

export default PersonCard;
