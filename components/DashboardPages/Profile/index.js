import React from 'react';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';

import Page from '../../DashboardComponents/Page';
import ProfileCard from '../../../components/ProfileCard';
import { GET_SINGLE_PROFILE_QUERY } from '../../../graphql/profile/queries';
import Loader from '../../../components/Loader';
import { getDecodedToken, getToken } from '../../../helpers/jwt';

const Profile = () => {
  const router = useRouter();
  const token = getToken();
  const user = getDecodedToken(token);

  const profileId = router.query.id;
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
    <Page
      title='PROFILE'
    >
      {getSingleProfile.called && getSingleProfile.loading && <Loader />}
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ProfileCard studentProfile={getSingleProfile} currentUser={user} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Profile;
