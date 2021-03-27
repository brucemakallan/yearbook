import React from 'react';
import { useRouter } from 'next/router';

import firebase from 'firebase/app';
import 'firebase/firestore';

import GenericDashboard from '../../components/GenericDashboard';
import { sidebarRoutes } from '../../components/DashboardPages/dashboardRoutes';
import { getToken, jwtIsValid } from '../../helpers/jwt';
import Page from '../../components/GenericDashboard/Page';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

const collection = process.env.FIREBASE_COLLECTION;

const firestore = firebase.firestore();

const DashboardPages = ({ title, icon, whiteBackground, tabs, children }) => {
  const messagesRef = firestore.collection(collection); // TODO: pass this
  const router = useRouter();
  const jwt = getToken();
  const isAuthenticated = jwtIsValid(jwt);

  React.useEffect(() => {
    if (!isAuthenticated) { // protect privileged pages
      router.push(redirectTo);
    }
  }, [jwt, isAuthenticated])

  const [showSideBar, setShowSideBar] = React.useState(false);

  const handleCollapse = () => {
    setShowSideBar(!showSideBar);
  };

  const hideSideBar = () => {
    setShowSideBar(false);
  };

  return (
    <GenericDashboard
      sidebarFields={sidebarRoutes({ router })}
      showSideBar={showSideBar}
      hideSideBar={hideSideBar}
    >
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
    </GenericDashboard>
  );
};

export default DashboardPages;
