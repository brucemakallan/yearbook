import React from 'react';
import firebase from 'firebase/app';

import PageWithSidebar from '../../../components/DashboardComponents/PageWithSidebar';
import Chat from '../../../components/Chat/index';

firebase.app();
const firestore = firebase.firestore();
const collection = process.env.NEXT_PUBLIC_FIREBASE_COLLECTION;

const ChatPage = () => {
  const messagesRef = firestore.collection(collection);

  return (
    <PageWithSidebar title="Chat" whiteBackground>
      <Chat messagesRef={messagesRef} />
    </PageWithSidebar>
  );
};

export default ChatPage;
