import React from 'react';

import PageWithSidebar from '../../../components/DashboardComponents/PageWithSidebar';
import Chat from '../../../components/Chat/index';

const ChatPage = ({ messagesRef }) => (
  <PageWithSidebar title="Chat" whiteBackground>
    <Chat messagesRef={messagesRef} />
  </PageWithSidebar>
);

export default ChatPage;
