import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const BORDER_RADIUS = 3;

const useStyles = makeStyles((theme) => ({
  bubbleContainer: (fromMe) => ({
    marginRight: fromMe ? 0 : theme.spacing(3),
    marginLeft: fromMe ? theme.spacing(3) : 0,
    textAlign: fromMe ? 'right' : 'left',
    padding: theme.spacing(1, 0),
  }),
  bubble: (fromMe) => ({
    display: 'inline-block',
    borderRadius: theme.spacing(BORDER_RADIUS),
    padding: theme.spacing(1, 2),
    // conditional styles
    backgroundColor: fromMe ? theme.palette.primary.main : theme.palette.lightGrey,
    color: fromMe ? theme.palette.light : theme.palette.primary.dark,
    borderTopLeftRadius: fromMe ? theme.spacing(BORDER_RADIUS) : 0,
    borderTopRightRadius: fromMe ? 0 : theme.spacing(BORDER_RADIUS),
  }),
  date: (fromMe) => ({
    fontSize: theme.spacing(1.5),
    color: fromMe ? theme.palette.lightGrey : theme.palette.darkGrey,
  }),
  name: {
    fontSize: theme.spacing(1.6),
    textDecoration: 'none',
  },
}));

// { id, text, senderId, receiverId, createdAt, read }
const ChatBubble = ({ sender, message, fromMe = false }) => {
  const classes = useStyles(fromMe);

  const senderName = fromMe
    ? ''
    : `${get(sender, 'user.firstName', '')} ${get(sender, 'user.lastName', '')}`;

  const dateTimeMoment = moment.unix(message.createdAt.seconds);
  let messageSentDate = '';

  // only show date-sent if it's more than a minute ago
  if (moment().diff(dateTimeMoment, 'seconds') > 60) {
    messageSentDate = dateTimeMoment.fromNow();
  }

  return (
    <div className={classes.bubbleContainer}>
      <div className={classes.bubble}>
        <Link href={`/dashboard/students/${sender.id}`}>
          <Typography
            variant="body1"
            color="secondary"
            className={classes.name}
          >
            {senderName}
          </Typography>
        </Link>
        <Typography variant="body1" color="inherit">
          {message.text}
        </Typography>
        <Typography component="span" variant="body1" className={classes.date}>
          {messageSentDate}
        </Typography>
      </div>
    </div>
  );
};

export default ChatBubble;
