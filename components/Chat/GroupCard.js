import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { makeStyles } from '@material-ui/core/styles';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';

import CardLink from './CardLink';
import getAllMessagesByField, { collectionConfig } from './queries';
import ChartCardDetails from './ChartCardDetails';

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
  icon: {
    fontSize: theme.spacing(6.875),
  },
}));

// FYI:
// In the Firebase (Cloud Firestore) message receiverId for Class Groups === courseID-yearOfEntry
// e.g. 9d4e37fc0be95d66201ffc5-2020
const GroupCard = ({ allClassProfiles, messagesRef }) => {
  const classes = useStyles();

  const sampleProfile = allClassProfiles[0];
  const courseId = get(sampleProfile, 'course.id');
  const courseName = get(sampleProfile, 'course.name');
  const yearOfEntry = get(sampleProfile, 'year');

  const classGroupName = `${courseName}. Class of ${yearOfEntry}`;
  const receiverId = `${courseId}-${yearOfEntry}`;

  const query = getAllMessagesByField({
    collectionRef: messagesRef,
    field: {
      name: 'receiverId',
      value: receiverId,
    },
  });

  const [messages, loading, error] = useCollectionData(query, collectionConfig);
  const latestMessage = messages ? messages[messages.length - 1] : undefined;
  const lastReadDate = latestMessage ? moment.unix(latestMessage.createdAt.seconds).fromNow() : '';
  const unreadCount = 0; // TODO: later

  if (error) console.error(error);

  return (
    <div className={classes.root}>
      <CardLink name={classGroupName} receiverId={receiverId} allClassProfiles={allClassProfiles}>
        <Grid container spacing={2} alignItems="center" className={classes.container}>
          <Grid item xs={3} sm={2} md={1} lg={1}>
            <Badge color="secondary" overlap="circle" badgeContent={unreadCount}>
              <SupervisedUserCircleIcon className={classes.icon} />
            </Badge>
          </Grid>
          <Grid item xs={9} sm={10} md={11} lg={11}>
            <ChartCardDetails
              loading={loading}
              error={error}
              name={classGroupName}
              latestMessage={latestMessage}
              lastReadDate={lastReadDate}
            />
          </Grid>
        </Grid>
      </CardLink>
    </div>
  );
};

export default GroupCard;
