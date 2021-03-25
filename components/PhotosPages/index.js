import React from 'react';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import upperCase from 'lodash/upperCase';

import StudentGallery from './studentGallery';
import Page from '../../components/GenericDashboard/Page';
import { GET_SINGLE_PROFILE_QUERY } from '../../graphql/profile/queries';
import Loader from '../../components/Loader';
import Feedback from '../../components/Feedback';
import { getDecodedToken, getToken } from '../../helpers/jwt';

const Gallery = () => {
  const [profile, setProfile] = React.useState();
  const router = useRouter();
  const { id: profileId } = router.query;

  const user = getDecodedToken(getToken());

  const getSingleProfile = useQuery(GET_SINGLE_PROFILE_QUERY, {
    variables: {
      searchParams: {
        profileId,
      },
    },
  });

  React.useEffect(() => {
    const profileFromServer = get(getSingleProfile, 'data.singleProfile');
    setProfile(profileFromServer);
  }, [getSingleProfile]);

  return (
    <>
      {getSingleProfile.loading && <Loader />}
      {getSingleProfile.error && (
        <Feedback
          open={!!getSingleProfile.error}
          feedbackMessage={getSingleProfile.error}
          severity='error'
          type='error'
        />
      )}
      {profile && (
        <Page
          title={upperCase(`${profile.user.firstName} ${profile.user.lastName}`)}
        >
          <StudentGallery singleProfile={profile} currentUser={user} />
        </Page>
      )}
    </>
  );
};

export default Gallery;
