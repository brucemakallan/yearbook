import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Grid from '@material-ui/core/Grid';

import { getToken, jwtIsValid } from '../../../helpers/jwt';
import Page from '../Page';
import useStyles from '../styles';
import Sidebar from '../Sidebar';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });
} else {
  firebase.app(); // if already initialized
}

const collection = process.env.NEXT_PUBLIC_FIREBASE_COLLECTION;

const firestore = firebase.firestore();

const PageWithSidebar = ({
  title, icon, whiteBackground, tabs, children,
}) => {
  const classes = useStyles();

  const messagesRef = firestore.collection(collection); // TODO: pass this
  const router = useRouter();
  const jwt = getToken();
  const isAuthenticated = jwtIsValid(jwt);

  React.useEffect(() => {
    if (!isAuthenticated) { // protect privileged pages
      router.push('/login');
    }
  }, [jwt, isAuthenticated, router]);

  const [showSideBar, setShowSideBar] = React.useState(false);

  const handleCollapse = () => {
    setShowSideBar(!showSideBar);
  };

  const hideSideBar = () => {
    setShowSideBar(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Sidebar
          className={clsx(showSideBar ? classes.showSideBar : classes.hideSideBar)}
          hideSideBar={hideSideBar}
        />
        <Page
          icon={icon}
          title={title}
          tabLinks={tabs}
          whiteBackground={whiteBackground}
          showSideBar={showSideBar}
          handleCollapse={handleCollapse}
        >
          {children}
        </Page>
      </Grid>
    </div>
  );
};

export default PageWithSidebar;
