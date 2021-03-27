import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import firebase from 'firebase/app';

import { makeStyles } from '@material-ui/core/styles';
import SmsIcon from '@material-ui/icons/Sms';
import Grid from '@material-ui/core/Grid';

import BackArrow from '../../../components/BackArrow';
import ChatWindow from '../../../components/Chat/ChatWindow';
import PageWithSidebar from '../../../components/DashboardComponents/PageWithSidebar';
import { GET_ALL_PROFILES_QUERY } from '../../../graphql/profile/queries';
import QueryAlert from '../../../components/QueryAlert';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginBottom: theme.spacing(-1),
    paddingRight: theme.spacing(1),
  },
}));

firebase.app();
const firestore = firebase.firestore();
const collection = process.env.NEXT_PUBLIC_FIREBASE_COLLECTION;

const ConversationPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const name = router.query?.name;
  const receiverId = router.query?.receiverId;

  const messagesRef = firestore.collection(collection);

  const queryResponse = useQuery(GET_ALL_PROFILES_QUERY);
  const allClassProfiles = queryResponse?.data?.allProfilesInUniversity || [];

  if (!name || !receiverId || !allClassProfiles || !messagesRef) {
    router.push('/dashboard/chat');
    return '';
  }

  return (
    <>
      <QueryAlert queryResponse={queryResponse} />
      <PageWithSidebar
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
      </PageWithSidebar>
    </>
  );
};

export default ConversationPage;
