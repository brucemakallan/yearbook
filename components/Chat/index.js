import React from 'react';
import { useQuery } from '@apollo/react-hooks';

// import Grid from '@material-ui/core/Grid';

import { GET_ALL_PROFILES_QUERY } from '../../graphql/profile/queries';
import QueryAlert from '../QueryAlert';
import GroupCard from './GroupCard';
// import PersonCard from './PersonCard';

const Chat = ({ messagesRef }) => {
  const queryResponse = useQuery(GET_ALL_PROFILES_QUERY);
  const profiles = queryResponse?.data?.allProfilesInUniversity || [];

  return (
    <div>
      <QueryAlert queryResponse={queryResponse} />
      {profiles && profiles.length > 0 && (
        <>
          <GroupCard
            allClassProfiles={profiles}
            messagesRef={messagesRef}
          />
          {/* {profiles.map((profile) => (
            <Grid container spacing={2} key={profile.user.id}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <PersonCard
                  profile={profile}
                  unreadCount={2} // testing
                  latestMessage={latestMessage} // testing
                />
              </Grid>
            </Grid>
          ))} */}
        </>
      )}
    </div>
  );
};

export default Chat;
