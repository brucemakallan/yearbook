import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import SmsIcon from '@material-ui/icons/Sms';
import Grid from '@material-ui/core/Grid';

import Page from '../../DashboardComponents/Page';
import BackArrow from '../../BackArrow';
import ChatWindow from '../../Chat/ChatWindow';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginBottom: theme.spacing(-1),
    paddingRight: theme.spacing(1),
  },
}));

const ChatWindowPage = ({ messagesRef }) => {
  const classes = useStyles();
  const router = useRouter();

  const name = router.query?.name;
  const receiverId = router.query?.receiverId;
  const allClassProfiles = router.query?.allClassProfiles;

  if (!name || !receiverId || !allClassProfiles) {
    router.push('/dashboard/chat');
    return '';
  }

  return (
    <Page
      icon={<SmsIcon className={classes.icon} />}
      title={name}
      whiteBackground={true}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <BackArrow />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ChatWindow
            receiverId={receiverId}
            messagesRef={messagesRef}
            allClassProfiles={allClassProfiles}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default ChatWindowPage;
