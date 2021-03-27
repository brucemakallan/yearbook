import React from 'react';

import Page from '../../DashboardComponents/Page';
import Chat from '../../Chat';

const ChatPage = ({ messagesRef }) => (
  <Page
    title="Chat"
    whiteBackground={true}
  >
    <Chat messagesRef={messagesRef} />
  </Page>
);

export default ChatPage;
