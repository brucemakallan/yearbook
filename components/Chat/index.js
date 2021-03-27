import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';

// import Grid from '@material-ui/core/Grid';

import { GET_ALL_PROFILES_QUERY } from '../../graphql/profile/queries';
import Loader from '../Loader';
import Feedback from '../Feedback';
import GroupCard from './GroupCard';
// import PersonCard from './PersonCard';

const Chat = ({ messagesRef }) => {
  const { data, loading, error } = useQuery(GET_ALL_PROFILES_QUERY);
  const profiles = get(data, 'allProfilesInUniversity', []);

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <Feedback
          open={!!error}
          feedbackMessage={error}
          severity='error'
          type='error'
        />
      )}
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
