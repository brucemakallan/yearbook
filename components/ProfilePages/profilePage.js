import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';

import PageWithSidebar from '../DashboardComponents/PageWithSidebar';
import ProfileCard from '../ProfileCard';
import Loader from '../Loader';
import { GET_SINGLE_PROFILE_QUERY } from '../../graphql/profile/queries';
import { getDecodedToken, getToken } from '../../helpers/jwt';
import DeleteProfileCard from '../DeleteProfileCard';

const ProfilePage = ({ profileId }) => {
  const token = getToken();
  const user = getDecodedToken(token);
  const userId = get(user, '_id');

  const searchParams = profileId ? {
    profileId,
  } : {
    userId,
  };

  const getSingleProfile = useQuery(GET_SINGLE_PROFILE_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      searchParams,
    },
  });

  return (
    <PageWithSidebar title='PROFILE'>
      {getSingleProfile.called && getSingleProfile.loading && <Loader />}
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <ProfileCard studentProfile={getSingleProfile} currentUser={user} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DeleteProfileCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWithSidebar>
  );
};

export default ProfilePage;
