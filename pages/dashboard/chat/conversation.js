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

firebase.app();
const firestore = firebase.firestore();
const collection = process.env.NEXT_PUBLIC_FIREBASE_COLLECTION;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginBottom: theme.spacing(-1),
    paddingRight: theme.spacing(1),
  },
}));

const ConversationPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const name = router.query?.name;
  const receiverId = router.query?.receiverId;

  const messagesRef = firestore.collection(collection);

  const queryResponse = useQuery(GET_ALL_PROFILES_QUERY);
  const { loading, error, data } = queryResponse;
  const allClassProfiles = data?.allProfilesInUniversity || [];

  React.useEffect(() => {
    if (!name || !receiverId || (!loading && !error && !data) || !messagesRef) {
      router.push('/dashboard/chat');
      return '';
    }
  }, [name, receiverId, messagesRef, router, loading, error, data]);

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
            {!!receiverId && !!messagesRef && !!data && (
              <ChatWindow
                receiverId={receiverId}
                messagesRef={messagesRef}
                allClassProfiles={allClassProfiles}
              />
            )}
          </Grid>
        </Grid>
      </PageWithSidebar>
    </>
  );
};

export default ConversationPage;
