import React from 'react';

import Page from '../../../components/GenericDashboard/Page';
import Chat from '../../../components/Chat';

const ChatPage = ({ messagesRef }) => (
  <Page
    title="Chat"
    whiteBackground={true}
  >
    <Chat messagesRef={messagesRef} />
  </Page>
);

export default ChatPage;
