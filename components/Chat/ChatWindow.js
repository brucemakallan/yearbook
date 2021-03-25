import React from 'react';
import get from 'lodash/get';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useSound from 'use-sound';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { getDecodedToken, getToken } from '../../helpers/jwt';
import Feedback from '../Feedback';
import MessageTextField from './MessageTextField';
import getAllMessagesByField, { collectionConfig } from './queries';
import Loader from '../Loader';
import ChatBubble from './ChatBubble';
import { sounds } from '../../styles/global-theme';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 150px)',
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.lightGrey}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messagesScroller: {
    overflow: 'scroll',
    // auto-scroll to bottom
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  messages: {
    padding: theme.spacing(1),
  },
}));

const EmptyChatIntro = () => (
  <Typography variant="body1" align="center">
    {'Send the first message to get things started 🙂'}
  </Typography>
);

const ChatWindow = ({ receiverId, messagesRef, allClassProfiles }) => {
  const classes = useStyles();

  const token = getToken();
  const currentUser = getDecodedToken(token);
  const currentUserId = get(currentUser, '_id');

  const getSender = (senderId) => allClassProfiles.find((profile) => profile.user.id === senderId);

  const query = getAllMessagesByField({
    collectionRef: messagesRef,
    field: {
      name: 'receiverId',
      value: receiverId,
    },
  });

  const [messages, loading, error] = useCollectionData(query, collectionConfig);

  const [play] = useSound(sounds.bubblePop);

  React.useEffect(() => {
    if (!loading && !error) play();
  }, [error, loading, messages, play]);

  if (loading || error) {
    if (error) console.error(error);

    return (
      <>
        {loading && <Loader />}
        <Feedback
          open={!!error}
          feedbackMessage="Could not retrieve messages"
          type="error"
        />
      </>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.messagesScroller}>
        <div className={classes.messages}>
          {(messages && messages.length > 0) ? (
            messages.map((message) => {
              const fromMe = message.senderId === currentUserId;
              const sender = getSender(message.senderId);

              return (
                <ChatBubble
                  key={message.id}
                  sender={sender}
                  message={message}
                  fromMe={fromMe}
                />
              );
            })
          ) : (
            <EmptyChatIntro />
          )}
        </div>
      </div>
      <MessageTextField
        messagesRef={messagesRef}
        senderId={currentUserId}
        receiverId={receiverId}
      />
    </div>
  );
};

export default ChatWindow;
